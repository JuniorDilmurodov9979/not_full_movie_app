import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    font-family: Outfit;
    background-color: rgb(16, 20, 30);
}
ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
a {
    text-decoration-line: none;
}

`;
export default GlobalStyle;
