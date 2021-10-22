import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {

	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setproductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		getProducts("sold").then(data => {
			if (data.error) {
				setError(data.error)
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getProducts("createdAt").then(data => {
			if (data.error) {
				setError(data.error)
			} else {
				setproductsByArrival(data);
			}
		});
	};

	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, [])

	return (
		<Layout 
			title="Home Page" 
			description="E-commerce App using MERN stack" 
			className="container-fluid"
		>
		<Search />
			<div className="shadow p-3 mb-5 bg-body rounded border border-1 border-gray">
			<div className="hr-theme-slash-2 mb-4">
			  <div className="hr-line"></div>
			  <div className="hr-icon"><i className="material-icons">New Arrivals</i></div>
			  <div className="hr-line"></div>
			</div>
			<div className="d-flex justify-content-center">
				<div className="row">
					{productsByArrival.map((product, i) => (
						<div key={i} className="col-4 mb-3">
							<Card product={product} />
						</div>
				))}
				</div>
			</div>
			</div>

			<h2 className="mt-3 text-center">Best Sellers</h2>
			<div className="row">
				{productsBySell.map((product, i) => (
					<div key={i} className="col-4 mb-3">
						<Card product={product} />
					</div>
				))}
			</div>
		</Layout>
	);
	
};

export default Home;