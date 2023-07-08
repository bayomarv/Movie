import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import Home from './App';
import Movie from './components/Movie';

const App = () => {
	return (
		<Router basename="/movie">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:id" element={<Movie />} />			
			</Routes>			
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));