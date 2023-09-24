import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as S from './PortalStyle';

interface PortalProps {
  id: string;
  children: React.ReactNode;
  slide?: 'left' | 'right' | 'up';
  isOpen?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  beforeUnmountFlag?: boolean;
  setBeforeUnmountFlag?: any;
}

export const Portal = ({
  id,
  children,
  slide,
  setOpen,
  beforeUnmountFlag,
  setBeforeUnmountFlag,
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
      modalDiv.current.remove();
    };
  }, [id]);

  useEffect(() => {
    slide && modalDiv.current.classList.add('slide-' + slide);
    setTimeout(() => {
      modalDiv.current.classList.add('open');
    }, 0);
  }, []);

  useEffect(() => {
    if (!beforeUnmountFlag) return;
    modalDiv.current.classList.remove('open');
    modalDiv.current.addEventListener('transitionend', () => {
      setOpen && setOpen(false);
      setBeforeUnmountFlag && setBeforeUnmountFlag(false);
    });
  }, [beforeUnmountFlag]);

  return createPortal(
    <S.PortalWrap>
      <S.Portal>{children}</S.Portal>
    </S.PortalWrap>,
    modalDiv.current
  );
};
