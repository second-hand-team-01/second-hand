import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as S from './PortalStyle';

interface PortalProps {
  id: string;
  children: React.ReactNode;
}

export const Portal = ({ id, children }: PortalProps): React.ReactPortal => {
  const modalDiv = useRef(
    document.getElementById(id) || document.createElement('div')
  );

  const dynamicDiv = !modalDiv.current.parentElement;

  useEffect(() => {
    if (dynamicDiv) {
      modalDiv.current.id = id;
      document.body.appendChild(modalDiv.current);
      modalDiv.current.classList.add('modal-root');
    }

    return () => {
      if (dynamicDiv) document.body.removeChild(modalDiv.current);
    };
  }, [id]);

  return createPortal(
    <S.PortalWrap>
      <S.Portal>{children}</S.Portal>
    </S.PortalWrap>,
    modalDiv.current
  );
};
