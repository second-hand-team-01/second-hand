import { Button, Layout, NavbarBtn, Portal } from '@commons/index';
import * as S from './CategoryPopupStyle';
import { useEffect } from 'react';
import { CategoryElement } from './CategoryElement/CategoryElement';
import { Category } from '@type-store/services/category';
import { useFetch } from '@hooks/useFetch/useFetch';
import { getCategoryAPI } from '@services/categories/categories';

interface CategoryPopupProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoryPopup = ({ isOpen, setOpen }: CategoryPopupProps) => {
  const [categoryState, fetch] = useFetch(getCategoryAPI, [], true);
  const { data } = categoryState;

  return (
    <Portal id="modal-root" slide="left" isOpen={isOpen}>
      <Layout
        headerOption={{
          type: 'nav',
          navbarOptions: {
            title: '카테고리',
            leftBtn: (
              <Button
                title="뒤로"
                isWidthFitContent={true}
                shape="ghost"
                color="neutralText"
                icon="arrowLeft"
                onClick={() => setOpen(false)}
              ></Button>
            ),
          },
        }}
      >
        <S.CategoryPopup>
          <S.CategoryContainer>
            {data?.map((category) => (
              <CategoryElement
                key={String(category.idx)}
                text={category.text}
                imgUrl={category.imgUrl}
                idx={String(category.idx)}
              ></CategoryElement>
            ))}
          </S.CategoryContainer>
        </S.CategoryPopup>
      </Layout>
    </Portal>
  );
};
