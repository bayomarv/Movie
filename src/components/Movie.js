import { useEffect, useState } from 'react';
import logo from '../logo.png';
import { Link, useParams } from 'react-router-dom';
import MovieListHeading from './MovieListHeading';
import Footer from './Footer';
import noimage from '../noimage.jpg';

const Movie = () => {
	const [movie, setMovie] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const { id } = useParams();

    const fetchMovie = async ()=> {
    	try {
	        const url = `http://www.omdbapi.com/?i=${id}&apikey=myApiKey`;
			const response = await fetch(url);
			const responseJson = await response.json();
			setLoading(false);
			setMovie(responseJson);
    	} catch (err) {
    		setLoading(false);
    		setError("Oops! Something went wrong")
    	}
    }

    useEffect(() => {
        fetchMovie();
    })


	return(
		<div className="movie">
			<div className="heading">
				<Link to="/">
					<img src={logo} alt="" />
				</Link>
				<div className="home-link">
					<Link to="/">Home</Link>
				</div>
			</div>
			{loading &&
			<div className="spinner-container">
				<div className="loading-spinner">
				</div>
			</div>
			}
			{ movie &&	
				<div className="row">
					<div className="img">
						<img src={ movie.Poster !== "N/A" ? movie.Poster : noimage} alt="" />
					</div>
					<div className="desc">
						{ movie.Title &&
							<h2 className="title">{ movie.Tittle }</h2>
						}

						<div className="info">
							{ movie.Title && 
								<p>Title - <span className="inner-text">{ movie.Title }</span></p>
							}
							{ movie.Year &&
								<p>Year - <span className="inner-text">{ movie.Year }</span></p>
							}
							{ movie.Released &&
								<p>Released - <span className="inner-text">{ movie.Released }</span></p>
							}
							{ movie.Runtime &&
								<p>Runtime - <span className="inner-text">{ movie.Runtime }</span></p>
							}
							{ movie.Genre &&
								<p>Genre - <span className="inner-text">{ movie.Genre }</span></p>
							}
							{ movie.Director &&
								<p>Director - <span className="inner-text">{ movie.Director }</span></p>
							}
							{ movie.Writer &&
								<p>Writer - <span className="inner-text">{ movie.Writer }</span></p>
							}
							{ movie.Actors &&
								<p>Actors - <span className="inner-text">{ movie.Actors }</span></p>
							}
							{ movie.Language &&
								<p>Language - <span className="inner-text">{ movie.Language }</span></p>
							}
							{ movie.Country &&
								<p>Country - <span className="inner-text">{ movie.Country }</span></p>
							}
							{ movie.Rated &&
								<p>Rated - <span className="inner-text">{ movie.Rated }</span></p>
							}
						</div>
						{ movie.Plot &&
							<p className="plot">
								{ movie.Plot }
							</p>
						}
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

export default Movie;