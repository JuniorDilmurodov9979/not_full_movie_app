import { useContext, useEffect, useState } from "react";
import API from "../API/Api";
import { movieContext } from "../Context/moviesContext";
import { Link, Route, Routes, useParams } from "react-router-dom";
import {
  Container,
  DivColElement,
  DivRowElement,
  ImgElement,
  SingleDiv,
  SingleDivInner,
  TextElement,
  TitleElement,
} from "../styles/components.style";
import { Cast } from "../components/Cast/Cast";

export function SinglePage() {
  const { id } = useParams();
  //   console.log(id);
  const [single, setSingle] = useState([]);
  useEffect(() => {
    const getSinglePage = async () => {
      try {
        const data = await API.getSortMovies(`movie/${id}`);
        setSingle(data.data);
      } catch (error) {
        console.error("Error fetching single movie:", error);
      }
    };

    getSinglePage();
  }, [id, setSingle]);

  console.log(single);
  return (
    <>
      <SingleDiv
        style={{ marginTop: "50px" }}
        url={`"https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces${single.backdrop_path}"`}
      >
        <SingleDivInner>
          <Container>
            {single && (
              <>
                <DivRowElement style={{ alignItems: "center" }}>
                  <ImgElement
                    src={`https://media.themoviedb.org/t/p/w400${single.poster_path}`}
                    style={{
                      width: "400px",
                      height: "450px",
                      objectFit: "",
                    }}
                  ></ImgElement>
                  <DivColElement style={{ width: "700px", gap: "20px" }}>
                    <TitleElement fs="44px" style={{ fontWeight: "400" }}>
                      {single.title}
                    </TitleElement>
                    <TextElement style={{ color: "orange", fontSize: "24px" }}>
                      Rate:{" "}
                      {single.vote_average !== 0 &&
                      single.vote_average?.toFixed(1)
                        ? single.vote_average?.toFixed(1)
                        : "Not rated yet"}
                    </TextElement>
                    <DivRowElement style={{ gap: "10px" }}>
                      <TitleElement
                        fs="23px"
                        style={{ fontWeight: "bold", lineHeight: "26px" }}
                      >
                        Time :
                      </TitleElement>
                      <TitleElement fs="22px">
                        {Math.floor(single.runtime / 60)} hours{""}
                        {single.runtime % 60} minutes
                      </TitleElement>
                    </DivRowElement>
                    <DivRowElement
                      style={{ alignItems: "center", gap: "15px" }}
                    >
                      <TextElement
                        as={Link}
                        to={"videos"}
                        style={{
                          fontSize: "22px",
                          opacity: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Trailer :
                        <ImgElement
                          src="https://static.vecteezy.com/system/resources/thumbnails/023/986/704/small/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginLeft: "5px",
                          }}
                        ></ImgElement>
                      </TextElement>
                    </DivRowElement>
                    <TextElement
                      style={{
                        fontSize: "22px",
                        fontWeight: "500",
                        opacity: "1",
                      }}
                    >
                      Budget:{" "}
                      {single.budget !== 0 &&
                      single.budget?.toLocaleString("uz")
                        ? single.budget?.toLocaleString("uz") + "$"
                        : "Not Found"}
                    </TextElement>
                    <DivColElement>
                      <TextElement
                        style={{
                          fontSize: "20px",
                          fontWeight: "200",
                          letterSpacing: "1px",
                        }}
                      >
                        Overview : {single.overview}
                      </TextElement>
                      <DivRowElement>
                        <TextElement style={{ fontSize: "19px", opacity: 1 }}>
                          Genres:
                        </TextElement>
                        <TextElement style={{ fontSize: "18px", opacity: 1 }}>
                          {single?.genres?.[0]?.name}
                        </TextElement>
                        <TextElement style={{ fontSize: "18px", opacity: 1 }}>
                          {single?.genres?.[1]?.name}
                        </TextElement>
                        <TextElement style={{ fontSize: "18px", opacity: 1 }}>
                          {single?.genres?.[2]?.name}
                        </TextElement>
                      </DivRowElement>
                    </DivColElement>
                  </DivColElement>
                </DivRowElement>
              </>
            )}
          </Container>
        </SingleDivInner>
      </SingleDiv>
      <Cast />
      {/* <Routes>
        <Route path="videos" element={<h1>Trailer</h1>} />
      </Routes> */}
    </>
  );
}
