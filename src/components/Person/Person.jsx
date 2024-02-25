import React, { useEffect, useState } from "react";
import API from "../../API/Api";
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

export function Person() {
  const [personDetails, setPersonDetails] = useState(null);
  const [personMovies, setPersonMovies] = useState([]);
  const { personId } = useParams();
  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await API.getSortMovies(`/person/${personId}`);
        setPersonDetails(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPersonDetails();
  }, [personId]);
  console.log(personDetails);

  useEffect(() => {
    const fetchPersonMovies = async () => {
      try {
        const response = await API.getSortMovies(
          `/person/${personId}/movie_credits`
        );
        setPersonMovies(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPersonMovies();
  }, [personId]);
  console.log(personMovies);

  function formatDateOfBirth(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dob.toLocaleDateString("en-US", options);

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const isBirthdayPassed =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    const ageString = isBirthdayPassed
      ? `${age} years old`
      : `${age - 1} years old`;

    return `${formattedDate} (${ageString})`;
  }

  return (
    <Container>
      <DivRowElement style={{ marginTop: "50px", alignItems: "center" }}>
        {personDetails && (
          <>
            <DivColElement>
              <ImgElement
                style={{ width: "400px", height: "550px" }}
                src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
                alt={personDetails.name}
              />
            </DivColElement>
            <DivColElement
              style={{
                width: "500px",
                padding: "30px",
                border: "1px solid #333",
                boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "10px",
              }}
            >
              <TitleElement fs="42px">{personDetails.name}</TitleElement>
              <TextElement>{personDetails.biography}</TextElement>
              <DivRowElement style={{ gap: "15px" }} as={"ul"}>
                <DivColElement style={{ width: "95px" }} as={"li"}>
                  <TitleElement fs="20px">Known For</TitleElement>
                  <TitleElement fs="20px">
                    {personDetails.known_for_department}
                  </TitleElement>
                </DivColElement>
                <DivColElement as={"li"}>
                  <TitleElement fs="20px">Birthday</TitleElement>
                  <TitleElement fs="20px">
                    {formatDateOfBirth(personDetails.birthday)}
                  </TitleElement>
                </DivColElement>
                <DivColElement as={"li"}>
                  <TitleElement fs="20px">
                    {personDetails.also_known_as?.[1]}
                  </TitleElement>
                </DivColElement>
              </DivRowElement>
            </DivColElement>
          </>
        )}
      </DivRowElement>
      <TitleElement style={{ marginTop: "30px" }}>Known For</TitleElement>
      <ListElement
        style={{
          rowGap: "25px",
          justifyContent: "flex-start",
          marginTop: "50px",
        }}
      >
        {personMovies.cast?.length &&
          personMovies.cast.map((item) => (
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
}
