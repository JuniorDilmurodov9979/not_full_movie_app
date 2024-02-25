import axios from "axios";
import { useEffect, useState } from "react";
import API from "./API/Api";
import { Container, TextElement } from "./styles/components.style";
import GlobalStyle from "./styles/Global.style";
import { Home } from "./pages/Home";
import { movieContext } from "./Context/moviesContext";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import { UpComing } from "./pages/Upcoming";
import { NowPlaying } from "./pages/Nowplaying";
import { SinglePage } from "./singlePage/singlePage";
import { Search } from "./components/Search/Search";
import { Header } from "./components/Header/Header";
import { Person } from "./components/Person/Person";
// import NotFound from "./components/Err/Error";
let id = 1;

export default function App() {
  const [upComing, setUpComing] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trend, setTrend] = useState([]);

  function SearchResults() {
    const { name } = useParams();
    // Fetch data based on the search query 'name' using API calls
    // Display the search results
    return (
      // Your JSX for displaying search results
      <Search query={name} />
    );
  }

  const getNowPlayingMovies = async () => {
    const data = await API.getSortMovies(
      `movie/now_playing?language=en-US&page=1`
    );

    // console.log(data.data);
    setNowPlaying(data.data);
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const getUpComingMovies = async () => {
    const data = await API.getSortMovies(`movie/upcoming?language=en-US`);

    // console.log(data.data);
    setUpComing(data.data);
  };
  useEffect(() => {
    getUpComingMovies();
  }, []);

  const getMovies = async () => {
    const data = await API.getSortMovies(
      `trending/movie/day?language=en-US&page=1`
    );

    // console.log(data.data);
    setTrend(data.data);
  };
  useEffect(() => {
    getMovies();
  }, []);

  const location = useLocation();
  const showHeader = !location.pathname.startsWith("/movie, /person"); // Hide header on single page view, thats shit, be careful !!!
  return (
    <>
      {showHeader && <Header />}
      <movieContext.Provider
        value={{
          trend,
          setTrend,
          upComing,
          setUpComing,
          nowPlaying,
          setNowPlaying,
        }}
      >
        <Routes>
          <Route path="/" element={<Home key={id++} />} />
          <Route path="/upcoming" element={<UpComing key={id++} />} />
          <Route path="/nowplaying" element={<NowPlaying />} />
          <Route path="/movie/:id/" element={<SinglePage />} />
          <Route path="/search/:name" element={<SearchResults />} />
          <Route path="/person/:personId" element={<Person />} />
        </Routes>
      </movieContext.Provider>
      <GlobalStyle />
    </>
  );
}
