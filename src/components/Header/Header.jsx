import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import "./header.css";

import {
  Container,
  DivColElement,
  DivRowElement,
  FormElement,
  ImgElement,
  InputELement,
  ListElement,
  RateELement,
  TextElement,
  TitleElement,
} from "../../styles/components.style";
import axios from "axios";
import API from "../../API/Api";
import { useContext, useEffect, useState } from "react";
import { Search } from "../Search/Search";
import { movieContext } from "../../Context/moviesContext";

export function Header() {
  const [searchValue, setSearchValue] = useState("");
  const id = 1;

  const navigate = useNavigate();
  const context = useContext(movieContext);
  useEffect(() => {
    if (searchValue.trim().length) {
      navigate(`/search/${searchValue}`);
    } else {
      navigate("/");
    }
  }, [searchValue]);

  return (
    <Container>
      <movieContext.Provider value={{ searchValue, setSearchValue }}>
        <header>
          <DivRowElement
            style={{
              justifyContent: "center",
              gap: "60px",
              marginBottom: "50px",
            }}
          >
            <TitleElement
              fs="42px"
              scale="1.2"
              as={NavLink}
              to={"/"}
              className="nav-link"
              activeclass="active"
            >
              Trending
            </TitleElement>
            <TitleElement
              hoverColor="white"
              scale="1.2"
              fs="42px"
              as={NavLink}
              to={"/upcoming"}
              className="nav-link"
              activeclass="active"
            >
              Upcoming
            </TitleElement>
            <TitleElement
              scale="1.2"
              fs="42px"
              as={NavLink}
              to={"/nowplaying"}
              className="nav-link"
              activeclass="active"
            >
              Now Playing
            </TitleElement>
          </DivRowElement>
          <FormElement>
            <InputELement
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              type="text"
              placeholder="Search for movies or TV series"
            />
          </FormElement>
        </header>
      </movieContext.Provider>
    </Container>
  );
}
