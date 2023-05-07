
import { useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { useState } from 'react';
import YouTube from 'react-youtube';
import './App.css';
import Footer from './components/Footer';
import { LoginButton } from './components/Login';
import { LogoutButton } from "./components/Logout";
import { Profile } from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import trail from './img/trail.png'; 

function App() {
  
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const { isAuthenticated } = useAuth0();

  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  

  // funcion para realizar la peticion get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    //console.log('data',results);
    //setSelectedMovie(results[0])
    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };
  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    // const data = await fetchMovie(movie.id)
    // console.log(data);
    // setSelectedMovie(movie)
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(0, 0);
  };

  // funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  
return (
    <div>
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div className="logo-container" style={{ margin: 'auto' }}>
    <img src={trail} alt='' className="logo-img" />
  </div>
  <div className="auth-buttons-container" style={{ marginTop: '3rem' }}>
    {isAuthenticated ? (
      <>
        <Profile />
        <LogoutButton />
      </>
    ) : (
      <LoginButton />
    )}
  </div>
</div>
      {/* el buscador */}
      <form className="container mb-4" onSubmit={searchMovies}>
  <input
    type="text"
    placeholder="search"
    onChange={(e) => setSearchKey(e.target.value)}
  />
  <button className="btn btn-primary">Search</button>
</form>
      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Lo siento, trailer no disponible"
                    )}
                  <h1 style={{ color: 'gold', boxShadow: '5px 5px yellow' }}>{movie.title}</h1>
                  <p style={{ color: 'white', textShadow: '0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white, 0 0 50px white, 0 0 60px white, 0 0 70px white' }}>{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>
      {/* contenedor para mostrar los posters y las peliculas en la peticion a la api */}
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-md-4 mb-3"
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
      <header>
        {/* Contenido del encabezado */}
      </header>
      <main>
        {/* Contenido principal de la aplicación */}
      </main>
      <Footer />
    </div>
  );
}

export default App;