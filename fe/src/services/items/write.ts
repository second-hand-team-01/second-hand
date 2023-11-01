import { ERROR_MESSAGE } from '@constants/error';
import { useEffect, useState } from 'react';
import { WriteItemDetails, PostItemRes } from '@type-store/services/items';
import { useParams } from 'react-router-dom';
import { useFetch } from '@hooks/useFetch/useFetch';
import {
  getItemDetailAPI,
  convertAPIItemsDetailsToWriteItemsDetails,
  postItemsAPI,
  convertDataToBody,
  editItemsAPI,
} from '@services/items/items';
import { getType, Type } from '@utils/common/common';
import { Response } from '@hooks/useFetch/useFetch';

export const getDialogMessage = (
  type: 'write' | 'edit',
  { uploadState, editState }
) => {
  if (type === 'write') {
    if (!uploadState.data && uploadState.error) {
      return ERROR_MESSAGE.FILE_UPLOAD_ERROR;
    }
    return '상품이 등록 되었어요.';
  }
  if (editState.error) {
    return ERROR_MESSAGE.FILE_UPLOAD_ERROR;
  }
  return '상품 정보가 수정 되었어요.';
};

export const useDetails = (type: 'write' | 'edit') => {
  const [details, setDetails] = useState<WriteItemDetails | null>(null);
  if (type === 'write') return { details: null };
  const { itemIdx } = useParams();
  const [state] = useFetch(
    getItemDetailAPI.bind(null, Number(itemIdx)),
    [],
    true
  );
  useEffect(() => {
    if (state.data) {
      setDetails(convertAPIItemsDetailsToWriteItemsDetails(state.data));
    }
  }, [state.data]);
  return { details };
};

export const checkAllFilled = (values: unknown[]) => {
  return values.every((value) => {
    const type = getType(value);
    if (type === Type.String) {
      return Boolean(value) === false ? false : true;
    }
    if (type === Type.Number) {
      return value === -1 ? false : true;
    }
    if (type === Type.LiteralObject) {
      return Object.keys(value as object) ? false : true;
    }
    if (type === Type.Array) {
      const arr = value as unknown[];
      return arr.length === 0 ? false : true;
    }
    return false;
  }, false);
};

export const uploadPostItems = async ({
  title,
  description,
  images,
  price,
  categoryIdx,
  locationIdx,
}) => {
  const body = convertDataToBody(
    title,
    description,
    images,
    price,
    categoryIdx as number,
    locationIdx
  );
  const result = await postItemsAPI(body);
  return result as Response<PostItemRes>;
};

export const requiresImageConversion = (images) => {
  images.some((image) => (image?.file === null ? true : false));
};

const fetchImageAsData = async (imageUrl) => {
  const imageData = await fetch(imageUrl);

  if (!imageData.ok) {
    throw new Error('이미지를 불러오는데 실패했습니다.');
  }

  const blob = await imageData.blob();
  return blob;
};

export const uploadEditItems = async (
  itemIdx: number,
  { title, description, images, price, categoryIdx, locationIdx }
) => {
  try {
    const convertedImages = await Promise.all(
      images.map(async (image) => {
        if (!image.file) {
          const blob = await fetchImageAsData(image.fileString);
          const urlParts = image.fileString.split('/');
          const fileName = urlParts[urlParts.length - 1].split('?')[0];
          const fileReader = new FileReader();
          fileReader.readAsDataURL(blob);
          const fileString = await new Promise((resolve) => {
            fileReader.onloadend = () => {
              resolve(fileReader.result);
            };
          });
          const file = {
            file: new File([blob], fileName, { type: blob.type }),
            fileString: fileString,
            name: fileName,
            size: blob.size,
          };

          return file;
        }
        return image;
      })
    );

    const body = convertDataToBody(
      title,
      description,
      convertedImages,
      price,
      categoryIdx as number,
      locationIdx
    );

    const result = await editItemsAPI(itemIdx, body);
    return result as Response<null>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
