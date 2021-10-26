import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import SmallCard from "./SmallCard";
import Search from "./Search";
import Footer from "./Footer";

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
			description="E-commerce App using MERN stack. Contact: jtalway@gmail.com" 
			className="container-fluid"
		>
		<Search />
		<div className="container-fluid">
		<div className="row">
		<div className="col-lg-12 text-center">
			<div className="d-grid">
				<h2 className="mt-1 btn btn-primary disabled">New Arrivals</h2>	
				<div className="container-fluid d-flex">
					<div className="row mx-auto">
						{productsByArrival.map((product, i) => (
						<div key={i} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
							<SmallCard product={product} />
						</div>
						))}
					</div>
				</div>
			</div>
		</div>
		</div>
		</div>
		<div className="container-fluid">
		<div className="row">
		<div className="col-md-12 text-center">
			<div className="d-grid">
				<h2 className="mt-1 btn btn-primary disabled">Best Sellers</h2>	
				<div className="container-fluid d-flex">
					<div className="row mx-auto">
						{productsBySell.map((product, i) => (
							<div key={i} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12  mb-3">
								<SmallCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
		</div>
		</div>
		<Footer />
		</Layout>
		
	);
	
};

export default Home;