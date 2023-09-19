import React, { useState } from 'react';
import axios from 'axios';
import './search.css';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, Pagination} from 'antd';
import { Link } from 'react-router-dom';



function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);
    const API_KEY = '17797770';
    const ITEMS_PER_PAGE = 8;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowAlert(false);
        setNoResults(false);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) {
            setShowAlert(true);
            return;
        }
        setHasSearched(true);

        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${currentPage}`);
            if (response.data.Search && response.data.Search.length > 0) {
                setMovies(response.data.Search);
                setTotalResults(parseInt(response.data.totalResults));
                setNoResults(false);
            } else {
                setMovies([]);
                setTotalResults(0);
                setNoResults(true);
            }
        } catch (error) {
            console.error("Erro ao buscar os dados dos filmes:", error);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        
        if (!searchTerm.trim()) {
            setShowAlert(true);
            return;
        }
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`);
            if (response.data.Search && response.data.Search.length > 0) {
                setMovies(response.data.Search);
                setTotalResults(parseInt(response.data.totalResults));
                setNoResults(false);
            } else {
                setMovies([]);
                setTotalResults(0);
                setNoResults(true);
            }
        } catch (error) {
            console.error("Erro ao buscar os dados dos filmes:", error);
        }
    };

    return (
        <div className="Home">
            <div className="search-bar">
                <div className="input-wrapper">
                    <SearchOutlined className="search-icon" />
                    <form onSubmit={handleSearchSubmit}>
                        <input 
                            type="text" 
                            placeholder="Pesquisar" 
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
            </div>
            {!hasSearched && (
                <h1 level={2} className="fade-in">Seja bem-vindo! Faça uma pesquisa.</h1>
            )}
            {showAlert && <Alert message="Por favor, insira um termo de pesquisa." type="error" showIcon />}
            {noResults && <Alert message={`Nenhum resultado encontrado para "${searchTerm}".`} type="info" showIcon />}

            <section className='cards'>
                {movies.map((movie, index) => (
                    <Link to={`/movie/${movie.imdbID}`} key={index}>
                        <article className='card'>
                            <figure>
                                <img className='img-card' src={movie.Poster} alt={movie.Title} />
                            </figure>
                            <div className="card-content">
                                <h3 className='card-titulo'>{movie.Title}</h3>
                                <p className='card-ano'>{movie.Year}</p>
                                <p className='card-estrela'>{movie.Rated}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </section>

            <Pagination 
                current={currentPage}
                total={totalResults}
                pageSize={ITEMS_PER_PAGE}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default Search;
