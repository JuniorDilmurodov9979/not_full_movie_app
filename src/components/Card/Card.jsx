import { useContext } from "react";
import {
  Container,
  DivColElement,
  DivRowElement,
  ImgElement,
  ListElement,
  RateELement,
  TextElement,
  TitleElement,
  TitleItem,
} from "../../styles/components.style";
import { SearchContext, movieContext } from "../../Context/moviesContext";
import { Link } from "react-router-dom";

export const Card = ({ select, title }) => {
  const data = useContext(movieContext);
  const SearchedData = useContext(SearchContext);

  return (
    <Container>
      <TitleElement
        style={{
          fontSize: "32px",
          marginBottom: "25px",
          marginTop: "25px",
        }}
      >
        {title}
      </TitleElement>
      <ListElement>
        {data[select]?.results?.length &&
          data[select]?.results.map((item) => (
            <DivColElement
              scale="1.05"
              as={"li"}
              key={item.id}
              style={{ width: "250px" }}
            >
              <Link to={`/movie/${item.id}`}>
                <ImgElement
                  style={{
                    width: "250px",
                    height: "330px",
                    borderRadius: "10px",
                  }}
                  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                  alt={item.title}
                />
              </Link>
              <DivColElement>
                <DivRowElement
                  style={{ justifyContent: "space-between" }}
                  as={"ul"}
                >
                  <TextElement as={"li"}>{item.media_type}</TextElement>
                  <RateELement as={"li"}>
                    {item.vote_average.toFixed(1)}
                  </RateELement>
                  <TextElement as={"li"}>
                    {item.release_date.split("-")[0]}
                  </TextElement>
                </DivRowElement>
                <TitleItem key={item.id}>{item.title}</TitleItem>
              </DivColElement>
            </DivColElement>
          ))}
      </ListElement>
    </Container>
  );
};
