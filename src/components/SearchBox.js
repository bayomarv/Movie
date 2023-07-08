const SearchBox = (props) => {
	return (
		<div className="search-box">
			<input
				className="input"
				value={props.value}
				onChange={(e) => {props.setSearchValue(e.target.value); props.setQuery(e.target.value);}}
				placeholder="Search for movie..."
			></input>
		</div>
	);
};

export default SearchBox;
