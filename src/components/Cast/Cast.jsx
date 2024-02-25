import { useContext, useEffect, useState } from "react";
import API from "../../API/Api";
import { movieContext } from "../../Context/moviesContext";
import { Link, Route, Routes, useParams } from "react-router-dom";
import {
  Container,
  DivColElement,
  DivRowElement,
  ImgElement,
  ListElement,
  RateELement,
  SingleDiv,
  SingleDivInner,
  TextElement,
  TitleElement,
  TitleItem,
} from "../../styles/components.style";
import { Card } from "../Card/Card";

export const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await API.getSortMovies(`movie/${id}/credits`);
        setCast(data.data.cast);
      } catch (error) {
        console.error("Error fetching single movie:", error);
      }
    };

    getCast();
  }, [id, setCast]);

  console.log(cast);

  const [rec, setRec] = useState([]);
  useEffect(() => {
    const getRec = async () => {
      try {
        const data = await API.getSortMovies(`movie/${id}/recommendations`);
        setRec(data.data);
      } catch (error) {
        console.error("Error fetching single movie:", error);
      }
    };

    getRec();
  }, [id, setRec]);
  //   console.log(rec);

  //   console.log(idPerson);
  const [person, setPerson] = useState();
  const getPerson = async () => {
    const data = await API.getSortMovies(`person/${id}`);

    console.log(data.data);
    setPerson(data.data);
  };
  useEffect(() => {
    getPerson();
  }, [id]);
  console.log(person);

  return (
    <Container>
      <TitleElement style={{ marginTop: "30px", marginBottom: "30px" }}>
        Movie Cast
      </TitleElement>
      <ListElement style={{ gap: "8px", justifyContent: "flex-start" }}>
        {cast?.length &&
          cast?.slice(0, 9).map((item) => (
            <DivColElement as={"li"} key={item.id} style={{ width: "150px" }}>
              <Link to={`/person/${item.id}`}>
                <ImgElement
                  style={{
                    width: "150px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.profile_path}`}
                  alt={item.original_name}
                />
              </Link>
              <DivColElement>
                <DivRowElement
                  style={{ justifyContent: "space-between" }}
                  as={"ul"}
                >
                  <TextElement as={"li"}>{item.character}</TextElement>
                </DivRowElement>
                <TitleItem key={item.id}>{item.name}</TitleItem>
              </DivColElement>
            </DivColElement>
          ))}
      </ListElement>

      <TitleElement
        style={{
          fontSize: "36px",
          marginBottom: "35px",
          marginTop: "25px",
        }}
      >
        Recommendation movies
      </TitleElement>
      <ListElement style={{ rowGap: "25px" }}>
        {rec.results?.length &&
          rec.results.map((item) => (
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
