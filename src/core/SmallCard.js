import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowThumbnail from './ShowThumbnail';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const SmallCard = ({
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
			<button 
				onClick={addToCart} 
				className="btn btn-sm btn-outline-primary mt-1 mb-1 ms-3 card-btn-1 rounded-pill" 
				disabled={product.quantity < 1}>
					{product.quantity < 1 ? "Sold Out" : "Add to Cart"}
			</button>
			)
		);
	};

	const showStock = quantity => {
		return quantity > 0 ? (
			<span className="badge rounded-pill bg-primary position-relative mb-1">
			  In Stock
			 	<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
				{quantity}
				<span className="visually-hidden">quantity</span>
				</span>
			</span>
		) : (
			<span className="badge bg-danger rounded-pill mb-1">Sold Out</span>
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
				<div className="input-group mb-2">
					<div className="input-group-prepend">
						<span className="input-group-text">Adjust Quantity</span>
					</div>
					<input 
						type="number" 
						className="form-control" 
						value={product.count} 
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
				className="btn btn-sm btn-outline-danger mt-2 mb-2 ms-3"
			>
				Remove Product
			</button>
			)
		);
	};

	return (
		<div className="shadow p-2 mb-2 bg-body rounded border border-1 border-gray d-grid">
			<Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
			<ShowThumbnail item={product} url="product" className="card-img-top"/>
			</Link>
			<div className="card-body">
				{shouldRedirect(redirect)}
				<h4 className="card-title">{product.name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">$ {product.price.toFixed(2)}</li>
				</ul>
				{showStock(product.quantity)}

				{showAddToCartBtn(showAddToCartButton)}

				{showRemoveButton(showRemoveProductButton)}

				{showCartUpdateOptions(cartUpdate)}
			</div>
		</div>
	);
};

export default SmallCard;