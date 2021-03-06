import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import SmallCard from "./SmallCard";
import {getCategories, getFilteredProducts} from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import {prices} from "./fixedPrices";
import Footer from "./Footer";

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
				<button onClick={loadMore} className="btn btn-info mb-5">Load more</button>
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
		<div className="container-fluid">
		<div className="row">
		<div className="col-xl-12 col-lg-12">
			<div className="row">
				<h4 className="mt-2 text-center btn btn-dark disabled">Filters</h4>
				<div className="col-md-6 d-grid">
					
					<h6 className="text-center btn btn-sm btn-outline-secondary disabled">Categories</h6>
					<div>
						<Checkbox 
						categories={categories}
						handleFilters={filters => handleFilters(filters, "category")} 
						/>
					</div>
				</div>
				<div className="col-md-6 d-grid">
					<h6 className="text-center btn btn-sm btn-outline-secondary disabled">Price Range</h6>
					<div>
						<RadioBox 
						prices={prices}
						handleFilters={filters => handleFilters(filters, "price")} 
						/>
					</div>
				</div>
			</div>
			<div className="row d-grid">
				<h2 className="mt-1 text-center btn btn-primary disabled">Filtered Products</h2>
				<div className="row">
					{filteredResults.map((product, i) => (
						<div key={i} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
							<SmallCard product={product} />
						</div>
					))}
				</div>
				{loadMoreButton()}
			</div>
		</div>
		</div>
		</div>
		<Footer className="container-fluid"/>
		</Layout>
	);
};

export default Shop;