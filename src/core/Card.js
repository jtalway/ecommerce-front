import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
	product,
	showViewProductButton = true,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = f => f,
	run = undefined
	// changeCartSize
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const showViewButton = showViewProductButton => {
		return (
			showViewProductButton && (
			<Link to={`/product/${product._id}`} className="mr-2">
				<button className="btn btn-sm btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
			</Link>
			)
		);
	};
	const addToCart = () => {
		// console.log('added');
		addItem(product, setRedirect(true));
	};

	const shouldRedirect = redirect => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCartBtn = showAddToCartButton => {
		return (
			showAddToCartButton && product.quantity > 0 && (
			<button onClick={addToCart} className="btn btn-sm btn-outline-warning mt-2 mb-2 card-btn-1"  disabled={product.quantity < 1}>
				{product.quantity < 1 ? "Out of stock" : "Add to Cart"}
			</button>
			)
		);
	};

	const showStock = quantity => {
		return quantity > 0 ? (
			<span className="badge rounded-pill bg-primary position-relative mb-2 me-3">
			  In Stock
			 	<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
				{quantity}
				<span className="visually-hidden">quantity</span>
				</span>
			</span>
		) : (
			<span className="badge bg-danger rounded-pill mb-2 me-3">Out of Stock</span>
		);
	};

	const handleChange = productId => event => {
		setRun(!run); // run useEffect in parent Cart
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};

	const showCartUpdateOptions = cartUpdate => {
		return (
			cartUpdate && (
			<div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text">Adjust Quantity</span>
					</div>
					<input 
						type="number" 
						className="form-control" 
						value={count} 
						onChange={handleChange(product._id)} 
					/>
				</div>
			</div>
			)
		);
	};

	const showRemoveButton = showRemoveProductButton => {
		return (
			showRemoveProductButton && (
			<button
				onClick={() => {
				removeItem(product._id);
				setRun(!run); // run useEffect in parent Cart
				}}
				className="btn btn-sm btn-outline-danger mt-2 mb-2 me-3"
			>
				Remove Product
			</button>
			)
		);
	};

	return (
		<div className="card border border-1 border-dark">
			<ShowImage item={product} url="product" className="card-img-top"/>
			<div className="card-body">
				{shouldRedirect(redirect)}
				<h5 className="card-title">{product.name}</h5>
				<h6 className="card-subtitle mb-2 text-muted">
					{product.category && product.category.name}
				</h6>			
				<p className="card-text">{product.description.substring(0, 100)} </p>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">$ {product.price}</li>
					
					<li className="list-group-item">Added {moment(product.createdAt).fromNow()}</li>
				</ul>
				{showStock(product.quantity)}

				{showViewButton(showViewProductButton)}

				{showAddToCartBtn(showAddToCartButton)}

				{showRemoveButton(showRemoveProductButton)}

				{showCartUpdateOptions(cartUpdate)}
			</div>
		</div>
	);
};

export default Card;