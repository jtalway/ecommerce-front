import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

// props.match get productId from route parameter
const UpdateProduct = ({match}) => {

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		photo: "",
		loading: false,
		error: "",
		createdProduct: "",
		redirectToProfile: false,
		formData: ""
	});

	const {user, token} = isAuthenticated();
	// deconstruct for ease of use
	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		loading,
		error,
		createdProduct,
		redirectToProfile,
		formData
	} = values;

	const init = (productId) => {
		getProduct(productId).then(data => {
			if (data.error) {
				setValues({...values, error: data.error});
			} else {
				// populate the state
				setValues({
					...values, 
					name: data.name, 
					description: data.description,
					price: data.price,
					category: data.category._id,
					shipping: data.shipping,
					quantity: data.quantity,
					formData: new FormData()
				});
				// load categories
				initCategories();
			}
		});
	};

	// load categories and set form data
	const initCategories = () => {
		getCategories().then(data => {
			if (data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({categories: data, formData: new FormData()});
			}
		});	
	};

	// this method runs when component mounts and any time the values change
	useEffect(() => {
		init(match.params.productId);
	}, []);


	const handleChange = name => event => {
		// if photo grab the file otherwise grab entered value
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		// set State
		formData.set(name, value);
		setValues({...values, [name]: value});
	};

	const clickSubmit = event => {
		event.preventDefault();
		setValues({...values, error: "", loading: true});

		updateProduct(match.params.productId, user._id, token, formData).then(data => {
			if (data.error) {
				setValues({...values, error: data.error});
			} else {
				setValues({
					...values, 
					name: "",
					description: "",
					photo: "",
					price: "",
					quantity: "",
					loading: false,
					error: false,
					redirectToProfile: true,
					createdProduct: data.name
				});
			}
		});
	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<h4>Post Photo</h4>
			<div className="form-group">
				<label className="btn btn-outline-secondary">
				<input onChange={ handleChange("photo") }type="file" name="photo" accept="image/*" />
				</label>
			</div>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input 
					onChange={ handleChange("name") } 
					type="text" 
					className="form-control" 
					value={ name } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Description</label>
				<textarea 
					onChange={ handleChange("description") } 
					className="form-control" 
					value={ description } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Price</label>
				<input 
					onChange={ handleChange("price") } 
					type="number" 
					className="form-control" 
					value={ price } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Category</label>
				<select 
					onChange={ handleChange("category") } 
					className="form-control" 
				>
					<option>Please select</option>
						{categories && categories.map((c, i) => (
							<option key={i} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<label className="text-muted">Quantity</label>
				<input 
					onChange={ handleChange("quantity") } 
					type="number" 
					className="form-control" 
					value={ quantity } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Shipping</label>
				<select 
					onChange={ handleChange("shipping") } 
					className="form-control" 
				>
					<option>Please select</option>
						<option value="1">Yes</option>
						<option value="0">No</option>						
				</select>
			</div>
			<button className="btn btn-outline-primary mt-2">Update Product</button>
		</form>
	);


	const showError = () => (
		<div className="alert alert-danger" style={{display: error ? "" : "none"}}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{display: createdProduct ? "" : "none"}}>
			<h2>{`${createdProduct}`} is updated.</h2>
		</div>
	);

	const showLoading = () => 
		loading && (
			<div className="alert alert-success">
			<h2>Loading...</h2>
		</div>
	);

	const redirectUser = () => {
		if (redirectToProfile) {
			if (!error) {
				return <Redirect to="/admin/products" />
			}
		}
	};

	const goBack = () => (
		<div className="mt-5">
			<Link to="/admin/dashboard" className="btn btn-outline-warning">
				Back to Dashboard
			</Link>
		</div>
	);

	return (
		<Layout 
			title="Add a new product" 
			description={ `Welcome ${ user.name }! Ready to add a new product?`} 
		>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{showSuccess()}
					{showError()}
					{newPostForm()}
					{redirectUser()}
					{goBack()}
				</div>
			</div>
		</Layout>
	);

};

export default UpdateProduct;