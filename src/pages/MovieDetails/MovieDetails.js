import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import './MovieDetails.css';

const API_KEY = '17797770';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [seasonsDetails, setSeasonsDetails] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}&i=${id}`);
                const { data } = response;
                if (data.Error) {
                    setError("Não foi possível obter detalhes do filme. Tente novamente.");
                } else {
                    setMovie(data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar detalhes do filme:", err);
                setError("Não foi possível obter detalhes do filme. Tente novamente.");
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        const fetchSeasonsDetails = async (seasonNumber) => {
            if (movie?.Type === "series" && movie.totalSeasons) {
                const response = await axios.get(`${BASE_URL}&i=${id}&Season=${seasonNumber}`);
                setSeasonsDetails(prevDetails => [...prevDetails, response.data]);
            }
        };

        if (selectedSeason) {
            fetchSeasonsDetails(selectedSeason);
        }
    }, [movie, id, selectedSeason]);

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='main-container'>
            {movie && (
                <div className="details-container">
                    <div className="image-and-seasons">
                        <img className='img-movie' src={movie.Poster} alt={movie.Title} />
                        {movie.Type === "series" && (
                            <div className="seasons-dropdown">
                                <select onChange={handleSeasonChange}>
                                    <option value="">Selecione uma temporada</option>
                                    {[...Array(Number(movie.totalSeasons))].map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            Temporada {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="movie-info">
                      
                      <div className='title-movie'>
                      <h1 className='h1-movie'>{movie.Title}</h1>
                      <div className="dates">
                          <span>{movie.Year}</span>
                          {movie.EndYear && <span>- {movie.EndYear}</span>}
                      </div>
                      <div className="rating">
                          <StarFilled className="fa fa-star" /> {movie.imdbRating}
                      </div>
                      </div>
                      <div className='coutry-movie'>
                      <p className='p-country'>{movie.Country}</p>
                      </div>
                      <div className='runtime-movie'>
                      <p className='p-runtime'>{movie.Runtime}</p>
                      </div>
                      <p className='p-movie'>{movie.Plot}</p>
                      <div className="actors">
                          Actors: {movie.Actors}
                      </div>
                      <div className="writers">
                          Diretores: {movie.Writer}
                      </div>
                    </div>
                </div>
            )}
            {movie && movie.Type === "series" && selectedSeason && (
                <div className="seasons-content">
                    {seasonsDetails.filter(season => season.Season === selectedSeason).map((season, index) => (
                        <div key={index}>
                            <h3 className='temporada'>Temporada {season.Season}</h3>
                            <hr />
                            {season.Episodes.map(episode => (
                                <div key={episode.Episode} className="episode-container">
                                    <img className="episode-poster" src={movie.Poster} alt={`${movie.Title} - Episódio ${episode.Episode}`} />
                                    <div className="episode-details">
                                        <div>
                                            <h1 className='h1-ep'>Episódio {episode.Episode}:</h1>
                                            <p className='title-ep'>{episode.Title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
