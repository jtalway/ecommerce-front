import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import SmallCard from "./SmallCard";
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
			<div className="shadow p-2 mb-2 bg-body rounded border border-1 border-gray d-grid">
				<h2 className="mt-1 text-center btn btn-primary disabled">New Arrivals</h2>
				<div className="d-flex justify-content-center">
					<div className="row">
						{productsByArrival.map((product, i) => (
							<div key={i} className="col-4 mb-2">
								<SmallCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="shadow p-2 mb-2 bg-body rounded border border-1 border-gray d-grid">
				<h2 className="mt-1 text-center btn btn-primary disabled">Best Sellers</h2>
				<div className="d-flex justify-content-center">
					<div className="row">
						{productsBySell.map((product, i) => (
							<div key={i} className="col-4 mb-2">
								<SmallCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
	
};

export default Home;