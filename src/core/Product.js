import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import SmallCard from "./SmallCard";


const Product = props => {
	// STATE
	const [product, setProduct] = useState({});
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [error, setError] = useState(false);

	const loadSingleProduct = productId => {
		read(productId).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProduct(data);
				// fetch related products
				listRelated(data._id).then(data => {
					if (data.error) {
						setError(data.error);
					} else {
						setRelatedProduct(data);
					}
				});
			}
		});
	};

	// grab productID when mount
	// props passed so related product links work
	useEffect(() => {
		window.scrollTo(0,0);
		const productId = props.match.params.productId;
		loadSingleProduct(productId);
	}, [props]);

	return (
		<Layout 
			title={product && product.name} 
			description={
				product &&
				product.description && 
				product.description.substring(0, 100)
			}
			className="container-fluid"
		>
		<div className="container">
		<div className="row">
		<div className="col-lg-12">
			
			<div className="row">
				{product &&	product.description && (
					<Card product={product} showViewProductButton={false}/>
				)}
			</div>
			<div className="row">
				<h4 className="mt-2 text-center btn btn-primary disabled">Related Products</h4>
				{relatedProduct.map((p, i) => (
					<div className="col-md-4 text-center">
						<SmallCard key={i} product={p} />
					</div>
				))}
			</div>

		</div>
		</div>
		</div>
		</Layout>
	);
};

export default Product;