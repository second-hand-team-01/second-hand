import styled from 'styled-components';
import { colors } from '@styles/Color';

const bubblePointerRight = `"data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg width="17" height="21" viewBox="0 0 17 21" fill="${colors.accentBackgroundPrimary}" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16.8873 20.1846C11.6873 20.9846 6.554 18.1212 4.88734 16.2879C6.60521 12.1914 -4.00058 2.24186 2.99942 2.24148C4.61803 2.24148 6.00049 -1.9986 11.8873 1.1846C11.9086 2.47144 11.8873 6.92582 11.8873 7.6842C11.8873 18.1842 17.8873 19.5813 16.8873 20.1846Z" /></svg>`
)}"`;

const bubblePointerLeft = `"data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg width="17" height="21" viewBox="0 0 17 21" fill="#E8E8EA" xmlns="http://www.w3.org/2000/svg"><path d="M0.112426 20.1846C5.31243 20.9846 10.4458 18.1212 12.1124 16.2879C10.3946 12.1914 21.0003 2.24186 14.0003 2.24148C12.3817 2.24148 10.9993 -1.9986 5.11242 1.1846C5.09121 2.47144 5.11242 6.92582 5.11242 7.6842C5.11242 18.1842 -0.887574 19.5813 0.112426 20.1846Z" /></svg>`
)}"
`;

export interface BubbleStyleProps {
  type: 'mine' | 'opponent';
}

export const BubbleWrap = styled.div<BubbleStyleProps>`
  display: grid;
  ${({ type }) =>
    type === 'mine'
      ? `
        justify-items: end;`
      : ``}
`;

export const Bubble = styled.div<BubbleStyleProps>`
  width: fit-content;
  max-width: calc(100% - 40px);
  padding: 6px 12px;
  display: grid;

  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  font-size: ${({ theme }) => theme.typography.body.size};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};

  padding: 6px 12px;
  border-radius: 18px;
  position: relative;
  ${({ type, theme }) =>
    type === 'mine'
      ? `
        
        background-color: ${theme.colors.accentBackgroundPrimary};
        color: ${theme.colors.accentText};
        `
      : `
        background-color: #E8E8EA;
        color: ${theme.colors.neutralText};`}

  &::after {
    position: absolute;
    bottom: -6px;
    ${({ type }) =>
      type === 'mine'
        ? `
        content: url(${bubblePointerRight});
        right: -5px;
        `
        : `
        content: url(${bubblePointerLeft});
        left: -5px;
        `}
  }
`;
