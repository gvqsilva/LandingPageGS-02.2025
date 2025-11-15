import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Dosis', sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: #000000ff;
    color: #ffffff;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #fff;
    font-weight: 600;
  }

  p {
    color: #bbb;
    font-weight: 300;
  }
`;

export default GlobalStyle;
