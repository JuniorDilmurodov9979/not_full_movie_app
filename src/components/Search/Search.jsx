import { Link, useParams } from "react-router-dom";
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
import API from "../../API/Api";
import { useContext, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { SearchContext } from "../../Context/moviesContext";

export const Search = () => {
  const { name } = useParams();

  const [getSearched, setGetSearched] = useState([]);
  const search = async (name) => {
    const data = await API.getSortMovies(
      `search/movie?query=${name}&include_adult=false&language=en-US&page=1`
    );
    setGetSearched(data.data);
    // console.log(data.data);
  };
  useEffect(() => {
    if (name && name.trim() !== "") {
      search(name);
    } else {
      setGetSearched([]);
    }
  }, [name]);
  console.log(getSearched);
  const SearchedData = useContext(SearchContext);
  //   Search("the");
  return (
    <>
      <Container>
        <TitleElement
          style={{
            fontSize: "32px",
            marginBottom: "25px",
            marginTop: "25px",
          }}
        ></TitleElement>
        <ListElement>
          {getSearched.results?.length &&
            getSearched.results.map((item) => (
              <DivColElement
                scale="1.1"
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
    </>
  );
};
