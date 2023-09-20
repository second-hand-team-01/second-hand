import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as S from './PortalStyle';

interface PortalProps {
  id: string;
  children: React.ReactNode;
  slide?: 'left' | 'right' | 'up';
  isOpen?: boolean;
}

export const Portal = ({
  id,
  children,
  slide,
}: PortalProps): React.ReactPortal => {
  const modalDiv = useRef(
    document.getElementById(id) || document.createElement('div')
  );

  const dynamicDiv = !modalDiv.current.parentElement;
  slide && modalDiv.current.classList.add('slide-' + slide);

  useEffect(() => {
    if (dynamicDiv) {
      modalDiv.current.id = id;
      document.body.appendChild(modalDiv.current);
      modalDiv.current.classList.add('modal-root');
    }
    return () => {
      modalDiv.current.remove();
    };
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      modalDiv.current.classList.add('open');
    }, 0);

    return () => {
      modalDiv.current.classList.remove('open');
    };
  }, []);

  useEffect(() => {}, []);

  return createPortal(
    <S.PortalWrap>
      <S.Portal>{children}</S.Portal>
    </S.PortalWrap>,
    modalDiv.current
  );
};
