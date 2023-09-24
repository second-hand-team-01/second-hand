import { createGlobalStyle } from 'styled-components';
import { MAX_WIDTH } from '@constants/style';

export const GlobalStyle = createGlobalStyle`
  /* reset-css */
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    input:focus {
      outline: none;
    }
    a {
      list-style: none;
      text-decoration: none;
      color: inherit;
    }
    * {
      box-sizing: border-box;
    }

    input[type="number"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* end of reset-css*/

    body {
      font-family: sans-serif;
      overflow: hidden;
    }

    .modal-root {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      max-width: ${MAX_WIDTH}px;
      z-index: 1;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    .modal-root.slide-left {
      transition: transform .5s ease-in-out, opacity .2s;
      opacity: 0;
      transform: translateX(${MAX_WIDTH / 2}px);
    }

    .modal-root.slide-left.open {
      transform: translateX(-50%);
      opacity: 1;
    }
    
    .modal-root.slide-right {
      transition: transform .5s ease-in-out, opacity .2s;
      opacity: 0;
      transform: translateX(-${MAX_WIDTH * 2}px);
    }

    .modal-root.slide-right.open {
      transform: translateX(-50%);
      opacity: 1;
    }
    
    .modal-root.slide-up {
      transition: transform .5s ease-in-out, opacity .2s;
      opacity: 0;
      transform: translate(-50%, 100dvh);
    }

    .modal-root.slide-up.open {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    
`;
