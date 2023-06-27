import { Button, Layout, NavbarBtn, Portal, Error } from '@commons/index';
import * as S from './CategoryPopupStyle';
import { useEffect } from 'react';
import { CategoryElement } from './CategoryElement/CategoryElement';
import { Category } from '@type-store/services/category';

interface CategoryPopupProps {
  categoryState: { data: Category[] | null; error: Error | null };
  categoryFetch: () => Promise<void>;
  categoryPopupOpenState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  selectCategoryIdx: (categoryIdx: number | undefined) => void;
}

export const CategoryPopup = ({
  categoryState,
  categoryFetch,
  categoryPopupOpenState,
  selectCategoryIdx,
}: CategoryPopupProps) => {
  const [isOpen, setOpen] = categoryPopupOpenState;
  const { data, error } = categoryState;

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
            {error ? (
              <Error>{error.message}</Error>
            ) : (
              data?.map((category) => (
                <CategoryElement
                  key={String(category.idx)}
                  text={category.text}
                  imgUrl={category.imgUrl}
                  idx={String(category.idx)}
                  onClick={({ currentTarget }) => {
                    const target = currentTarget as HTMLLIElement;
                    const categoryIdx = parseInt(target.id);
                    !isNaN(categoryIdx) && selectCategoryIdx(categoryIdx);
                    setOpen(false);
                  }}
                ></CategoryElement>
              ))
            )}
          </S.CategoryContainer>
        </S.CategoryPopup>
      </Layout>
    </Portal>
  );
};
