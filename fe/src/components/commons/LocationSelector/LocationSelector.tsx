import { useState, useEffect } from 'react';
import * as S from './LocationSelectorStyle';
import { Button, Layout, Portal, Error } from '@commons/index';
import { API_URL } from '@constants/apis';

interface LocationSelectorProps {
  locationData: { mainLocation: string; subLocation: string };
  locationState: { data: Location[] | null; error: Error | null };
  locationSelectorOpenState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
}

export const LocationSelector = ({
  locationState,
  locationData,
  locationSelectorOpenState,
}: LocationSelectorProps) => {
  const [isOpen, setOpen] = locationSelectorOpenState;

  const { mainLocation, subLocation } = locationData;

  return (
    <Portal id="modal-root" slide="left" isOpen={isOpen}>
      <Layout
        headerOption={{
          type: 'nav',
          navbarOptions: {
            leftBtn: (
              <Button
                title="닫기"
                isWidthFitContent={true}
                shape="ghost"
                color="neutralText"
                onClick={() => setOpen(false)}
              />
            ),
          },
        }}
      ></Layout>
    </Portal>
  );
};

// 일치하는 애들은 체크 표시 나오게

// interface CategoryPopupProps {
//   categoryState: { data: Category[] | null; error: Error | null };
//   categoryPopupOpenState: [
//     boolean,
//     React.Dispatch<React.SetStateAction<boolean>>
//   ];
//   selectCategoryIdx: (categoryIdx: number | undefined) => void;
// }

// export const CategoryPopup = ({
//   categoryState,
//   categoryPopupOpenState,
//   selectCategoryIdx,
// }: CategoryPopupProps) => {
//   const [isOpen, setOpen] = categoryPopupOpenState;
//   const { data, error } = categoryState;

//   return (
//     <Portal id="modal-root" slide="left" isOpen={isOpen}>
//       <Layout
//         headerOption={{
//           type: 'nav',
//           navbarOptions: {
//             title: '카테고리',
//             leftBtn: (
//               <Button
//                 title="뒤로"
//                 isWidthFitContent={true}
//                 shape="ghost"
//                 color="neutralText"
//                 icon="arrowLeft"
//                 onClick={() => setOpen(false)}
//               ></Button>
//             ),
//           },
//         }}
//       >
//         <S.CategoryPopup>
//           <S.CategoryContainer>
//             {error ? (
//               <Error>{error.message}</Error>
//             ) : (
//               data?.map((category) => (
//                 <CategoryElement
//                   key={String(category.idx)}
//                   text={category.text}
//                   imgUrl={category.imgUrl}
//                   idx={String(category.idx)}
//                   onClick={({ currentTarget }) => {
//                     const target = currentTarget as HTMLLIElement;
//                     const categoryIdx = parseInt(target.id);
//                     !isNaN(categoryIdx) && selectCategoryIdx(categoryIdx);
//                     setOpen(false);
//                   }}
//                 ></CategoryElement>
//               ))
//             )}
//           </S.CategoryContainer>
//         </S.CategoryPopup>
//       </Layout>
//     </Portal>
//   );
// };
