import React, { useEffect, useRef } from 'react';
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
  isOpen = true,
}: PortalProps): React.ReactPortal => {
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
      if (dynamicDiv && !slide) document.body.removeChild(modalDiv.current);
    };
  }, [id]);

  useEffect(() => {
    if (!slide) return;
    const slideClassName = 'slide-' + slide;
    modalDiv.current.classList.add(slideClassName);
    if (isOpen) {
      modalDiv.current.classList.add('open');
    } else {
      modalDiv.current.classList.remove('open');
    }
  }, [isOpen]);

  return createPortal(
    <S.PortalWrap>
      <S.Portal>{children}</S.Portal>
    </S.PortalWrap>,
    modalDiv.current
  );
};
