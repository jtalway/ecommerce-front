import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct} from "./apiAdmin";


const ManageProducts = () => {

	const [products, setProducts] = useState([]);

	const {user, token} = isAuthenticated();

	const loadProducts = () => {
		getProducts().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	const destroy = productId => {
		deleteProduct(productId, user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				loadProducts();
			}
		});
	};

	useEffect(() => {
		loadProducts();
	}, [])

	return (
		<Layout 
			title="Manage Products" 
			description="Perform CRUD on products" 
			className="container-fluid"
		>
			<div className="row">
				<div className="col-12">
				<h4 className="text-center">Total {products.length} products</h4>
				<hr />
					<ul className="list-group">
						{products.map((p, i) => (
							<li key={i}
								className="
									list-group-item 
									d-flex
									justify-content-between
									align-items-center"
							>
								{p.name}
								<Link to={`/admin/product/update/${p._id}`}>
									<span className="badge rounded-pill bg-warning">
										Update
									</span>
								</Link>
								<span 
									onClick={() => destroy(p._id)} 
									className="badge rounded-pill bg-danger"
								>
										Delete
								</span>
							</li>
						))}
					</ul>
					<br />
				</div>
			</div>
		</Layout>
	);
	
};

export default ManageProducts;