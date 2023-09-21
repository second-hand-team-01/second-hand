import { Button, Layout, Portal } from '@commons/index';
import * as S from './CategoryPopupStyle';
import { CategoryElement } from './CategoryElement/CategoryElement';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategoryAPI } from '@services/categories/categories';
import { ReactQuerySuspense } from '@components/commons/ReactQuerySuspense/ReactQuerySuspense';
import { Category } from '@type-store/services/category';

interface CategoryPopupProps {
  categoryPopupOpenState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
}

export const CategoryPopup = ({
  categoryPopupOpenState,
  setSelectedCategory,
}: CategoryPopupProps) => {
  const [isOpen, setOpen] = categoryPopupOpenState;
  const [beforeUnmountFlag, setBeforeUnmountFlag] = useState(false);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal
      id="test-root"
      slide="left"
      setOpen={setOpen}
      beforeUnmountFlag={beforeUnmountFlag}
      setBeforeUnmountFlag={setBeforeUnmountFlag}
    >
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
                onClick={() => {
                  setBeforeUnmountFlag(true);
                }}
              ></Button>
            ),
          },
        }}
      >
        <ReactQuerySuspense>
          <S.CategoryPopup>
            <S.CategoryContainer>
              <Container
                setSelectedCategory={setSelectedCategory}
                setOpen={setOpen}
              />
            </S.CategoryContainer>
          </S.CategoryPopup>
        </ReactQuerySuspense>
      </Layout>
    </Portal>
  );
};

export const Container = ({ setSelectedCategory, setOpen }) => {
  const { data: categories } = useQuery({
    queryKey: ['category-list'],
    queryFn: getCategoryAPI,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      {categories?.data?.map((category) => (
        <CategoryElement
          key={String(category.idx)}
          text={category.text}
          imgUrl={category.imgUrl}
          idx={String(category.idx)}
          onClick={({ currentTarget }) => {
            const target = currentTarget as HTMLLIElement;
            const categoryIdx = parseInt(target.id);
            const selectedCategory = categories.data.find(
              (category) => category.idx === categoryIdx
            );
            !isNaN(categoryIdx) && setSelectedCategory(selectedCategory);
            setOpen(false);
          }}
        ></CategoryElement>
      ))}
    </>
  );
};
