import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
	// STATE
	const [data, setData] = useState({
		categories: [],
		category: "",
		search: "",
		results: [],
		searched: false
	});
	// Destructure
	const {categories, category, search, results, searched} = data

	const loadCategories = () => {
		getCategories().then(data => {
			if(data.error) {
				console.log(data.error);
			} else {
				setData({...data, categories: data});
			}
		});
	};

	// USE EFFECT
	useEffect(() => {
		loadCategories();
	}, []);

	const searchData = () => {
		// console.log(search, category);
		if (search) {
			list({search: search || undefined, category: category}).then(
				response => {
					if (response.error) {
						console.log(response.error)
					} else {
						setData({...data, results: response, searched: true});
					}
				}
			);
		}
	};

	const searchSubmit = e => {
		// grab event and prevent default behavior
		e.preventDefault();
		// take search and category from state to check backend for products
		searchData();
	};

	const handleChange = name => event => {
		// update the State
		setData({...data, [name]: event.target.value, searched: false});
	};

	const searchMessage = (searched, results) => {
		if (searched && results.length > 0) {
			return `Found ${results.length} products`;
		}
		if (searched && results.length < 1 ) {
			return <h6 className="alert alert-danger">No products found</h6>;
		} 
	};

	const searchedProducts = (results = []) => {
		return (
			<div>
				<h4 className="mt-2 mb-2">
					{searchMessage(searched, results)}
				</h4>
				<div className="row">
					{results.map((product, i) => (
						<Card key={i} product={product} />
					))}
				</div>
			</div>

		);
	};

	const searchForm = () => {
		return (
			<form onSubmit={searchSubmit}>
				<div className="input-group input-group-sm">
					<select 
						className="btn btn-secondary dropdown-toggle"
						data-bs-toggle="dropdown" 
						aria-expanded="false"
						onChange={handleChange("category")}>
						<option value="All">All Categories</option>
						{categories.map((c, i) => (
							<option className="dropdown-item" key={i} value={c._id}>
								{c.name}
							</option>
						))}
					</select>
					<input 
						type="search" 
						className="form-control" 
						onChange={handleChange("search")}
						placeholder="Search by product name"
					/>
					<button className="input-group-text">Search</button>
				</div>
			</form>
		)
	};


	// WEB COMPONENTS
	return (
		<div className="row">
			<div className="container mt-2 mb-0">
				{searchForm()}
			</div>
			<div className="container-fluid">
				{searchedProducts(results)}
			</div>
		</div>
	);
};

export default Search;