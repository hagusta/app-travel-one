import { css } from 'lit-element';

export const mainStyle = css`
  * {
    --search-block-theme-primary: #04c5f5;
    --search-block-theme-on-primary: #fff;
    --search-block-theme-secondary: #04c5f5;
    --search-block-theme-on-secondary: #fff;
  }

  :host {
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    height: 1.5;
  }

  body {
    position: static;
  }
`;
