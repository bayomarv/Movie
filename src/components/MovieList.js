import { Link } from 'react-router-dom';
import noimage from '../noimage.jpg';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className="movies" key={movie.imdbID} >
					<div className="img-container">
						<Link to={`/${movie.imdbID}`} >						
							<img src={movie.Poster !== "N/A" ? movie.Poster : noimage} alt="" />
						</Link>
					</div>
					<div className="link">	
						<Link to={`/${movie.imdbID}`}>{movie.Title && movie.Title }</Link>
						<span onClick={() => props.handleFavouritesClick(movie)}>
							<FavouriteComponent />
						</span>						
					</div>	
				</div>				
			))}
		</>
	);
};

export default MovieList;