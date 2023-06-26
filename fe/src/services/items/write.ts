import { ERROR_MESSAGE } from '@constants/error';
import { useEffect, useState, useCallback, MouseEvent } from 'react';
import {
  WriteItemDetails,
  Image,
  PostItemRes,
} from '@type-store/services/items';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useFetch } from '@hooks/useFetch/useFetch';
import {
  getItemDetailAPI,
  convertAPIItemsDetailsToWriteItemsDetails,
  postItemsAPI,
  convertDataToBody,
  getRandomCategories,
  editItemsAPI,
} from '@services/items/items';
import {
  convertNumToPrice,
  convertPriceToNum,
  getType,
  Type,
} from '@utils/common/common';
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

export const uploadEditItems = async ({
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
  const result = await editItemsAPI(body);
  return result as Response<null>;
};
