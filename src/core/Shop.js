import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import {getCategories, getFilteredProducts} from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import {prices} from "./fixedPrices";

const Shop = () => {
	// STATE
	const [myFilters, setMyFilters] = useState({
		filters: {category: [], price: []}
	});
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [limit, setLimit] = useState(9);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(0);
	const [filteredResults, setfilteredResults] = useState([]);

	// INIT
	const init = () => {
		getCategories().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});	
	};

	const loadFilteredResults = newFilters => {
		// console.log(newFilters);
		getFilteredProducts(0, limit, newFilters).then(data => {
			if(data.error) {
				setError(data.error);
			} else {
				setfilteredResults(data.data);
				setSize(data.size);
				setSkip(0);
			}
		});
	};

	const loadMore = () => {
		let toSkip = skip + limit;
		// console.log(newFilters);
		getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
			if(data.error) {
				setError(data.error);
			} else {
				// add new data to current data
				setfilteredResults([...filteredResults, ...data.data]);
				setSize(data.size);
				setSkip(0);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 && size >= limit && (
				<button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
			)
		);
	};
	

	// USEEFFECT
	useEffect(() => {
		init();
		loadFilteredResults(skip, limit, myFilters.filters)
	}, []);


	const handleFilters = (filters, filterBy) => {
		// console.log("SHOP",filters, filterBy);
		const newFilters = {...myFilters};
		newFilters.filters[filterBy] = filters;

		if(filterBy === "price") {
			let priceValues = handlePrice(filters);
			newFilters.filters[filterBy] = priceValues;
		}
		loadFilteredResults(myFilters.filters);
		setMyFilters(newFilters);
	};


	const handlePrice = value => {
		const data = prices;
		let array = [];

		// fixed prices
		for(let key in data) {
			// if the key matches, get the data out of that
			if (data[key]._id === parseInt(value)) {
				array = data[key].array;
			}
		}
		return array;
	};


	// WEB COMPONENTS
	return (
		<Layout 
			title="Shop Page" 
			description="Search and find products of your choice" 
			className="container-fluid"
		>
			<div className="row">
				<div className="col-4">
					<h4>Filters</h4>
					<h6>Categories</h6>
					<div>
						<Checkbox 
						categories={categories}
						handleFilters={filters => handleFilters(filters, "category")} 
						/>
					</div>
					<hr />
					<h6>Price Range</h6>
					<div>
						<RadioBox 
						prices={prices}
						handleFilters={filters => handleFilters(filters, "price")} 
						/>
					</div>
				</div>
				<div className="col-8">
					<h4 className="mb-4">Products</h4>
					<div className="row">
						{filteredResults.map((product, i) => (
							<div key={i} className="col-4 mb-3">
								<Card product={product} />
							</div>
						))}
					</div>
					<hr />
					{loadMoreButton()}
				</div>
			</div>
		
		</Layout>
	);
};

export default Shop;