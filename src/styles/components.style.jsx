import styled from "styled-components";
export const Container = styled.div`
  position: relative;
  max-width: 1420px;
  width: 100%;
  padding: 0 20px;
  padding-top: 32px;
  margin: 0 auto;
`;

export const DivColElement = styled.div.withConfig({
  shouldForwardProp: (prop) => !["scale", "bg"].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: ${(props) => `${`scale(${props.scale})`}` || "scale(1.0)"};
  }
`;
export const DivRowElement = styled(DivColElement)`
  position: relative;
  flex-direction: row;
  gap: 35px;
  /* justify-content: center; */
  list-style-type: circle;
  margin-top: 5px;
  margin-bottom: 5px;
`;
export const TextElement = styled.p`
  margin: 0;
  padding: 0;
  /* Body (S) */
  color: rgb(255, 255, 255);
  font-family: Outfit;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0px;
  text-align: left;
  /* Pure White */
  opacity: 0.75;
  list-style: none;
`;
export const ListElement = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  row-gap: 45px;

  column-gap: 35px;
  justify-content: space-between;
  padding-bottom: 40px;
`;
export const InputELement = styled.input`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0px;
  border: none;
  border-bottom: 1px solid #5a698f;
  color: #fff;
  background-color: transparent;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
export const FormElement = styled.form`
  display: flex;
  align-items: center;
  gap: 24px;
  &::before {
    display: block;
    width: 32px;
    height: 32px;
    content: "";
    background-image: url("https://icons.veryicon.com/png/o/application/full-of-interest/search-555.png");
    background-repeat: no-repeat;
    background-color: transparent;
  }
`;
export const TitleElement = styled.h2.withConfig({
  shouldForwardProp: (prop) =>
    !["hovered", "fs", "hoverColor", "scale"].includes(prop),
})`
  margin-top: 0;
  margin-bottom: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: -0.5px;
  font-size: ${(props) => props.fs || "32px"};
  color: ${(props) => (props.hovered ? "blue" : "#fff")};
  transition: transform 0.2s ease;

  &:hover {
    color: ${(props) => props.hoverColor || "#fff"};
    transform: ${(props) => `${`scale(${props.scale})`}` || "scale(1.0)"};
  }
`;
export const TitleItem = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: left;
`;

export const ImgElement = styled.img.withConfig({
  shouldForwardProp: (prop) => !["scale", "url"].includes(prop),
})`
  width: 250px;
  height: 330px;
  border-radius: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: ${(props) => `${`scale(${props.scale})`}` || "scale(1.0)"};
  }
  background-image: ${(props) => `${`url(${props.url})`}`};
`;
export const RateELement = styled.span`
  font-size: 22px;
  position: absolute;
  top: -345px;
  right: 0;
  padding: 10px 15px;
  border-radius: 10px;
  /* width: 50px; */
  height: 20px;
  background-color: orange;
  list-style: none;
  text-align: center;
  color: white;
  z-index: 5;
  cursor: pointer;
`;
export const SingleDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => !["url"].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
export const SingleDivInner = styled(SingleDiv)`
  width: 100%;
  background: linear-gradient(
    to right,
    rgb(9, 26, 42),
    calc(-510px + 50vw),
    rgba(3, 17, 31, 0.84) 50%,
    rgba(1, 15, 27, 0.84) 100%
  );
`;
export const BackBtn = styled.button`
  cursor: pointer;
  border: none;
  color: white;
  background-color: dark;
`;
