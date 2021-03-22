import { css } from '@emotion/react';

//TO UPDATE WITH FINAL GLOBAL STYLES
const GlobalStyles = css`
  @import url("https://fonts.googleapis.com/css?family=Dancing+Script&display=swap");

  @font-face {
    font-family: "Local Font";
    src: url("fonts/DancingScript-Regular.ttf");
  }

  * {
    text-align: center;
    color: pink !important;
  }
`;

export default GlobalStyles;