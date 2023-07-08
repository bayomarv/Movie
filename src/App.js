import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import Footer from './components/Footer';
import { Link} from 'react-router-dom';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('man');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('');

	const getMovieRequest = async (searchValue) => {
		try {
			setQuery(localStorage.getItem('query'));
			if(query != null) {
				setSearchValue(query);
			}
			const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=myApiKey`;
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search) {
				setLoading(false);
				setMovies(responseJson.Search);
				localStorage.setItem('query', searchValue);
			}
		} catch (err) {
    		setLoading(false);
    		setError("Oops! Something went wrong")
    	}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue, query]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className="app">
			<div className="heading">
				<Link to="/">
					<img src={logo} alt="" />
				</Link>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} setQuery={setQuery}/>
			</div>

			{loading &&
				<div className="spinner-container">
					<div className="loading-spinner">
					</div>
				</div>
			}

			{!loading &&
				<div className="movies">
					<MovieListHeading heading="Movies" />
					<div className="row">
						<MovieList
							movies={movies}
							handleFavouritesClick={addFavouriteMovie}
							favouriteComponent={AddFavourites}
						/>
					</div>
				</div>
			}

			{favourites.length > 0 &&
				<div className="favourites">	
					<MovieListHeading heading="Favourites" />
					<div className="row">
						<MovieList
							movies={favourites}
							handleFavouritesClick={removeFavouriteMovie}
							favouriteComponent={RemoveFavourites}
						/>
					</div>
				</div>
			}
			{error &&
				<p className="error">{error}</p>
			}
			<Footer />
		</div>
	);
};

export default Home;