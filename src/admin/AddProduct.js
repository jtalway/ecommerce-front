import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {

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
		rediredToProfile: false,
		formData: "",
		condition: "",
		rarity: "",
		expansion: "",
		maker: "",
		released: ""
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
		rediredToProfile,
		formData,
		condition,
		rarity,
		expansion,
		maker,
		released
	} = values;

	// load categories and set form data
	const init = () => {
		getCategories().then(data => {
			if (data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({...values, categories: data, formData: new FormData()});
			}
		});	
	};

	// this method runs when component mounts and any time the values change
	useEffect(() => {
		init();
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

		createProduct(user._id, token, formData).then(data => {
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
					createdProduct: data.name,
					condition: "",
					rarity: "",
					expansion: "",
					maker: "",
					released: ""
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
				<label className="text-muted">Condition</label>
				<input 
					onChange={ handleChange("condition") } 
					type="text" 
					className="form-control" 
					value={ condition } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Rarity</label>
				<input 
					onChange={ handleChange("rarity") } 
					type="text" 
					className="form-control" 
					value={ rarity } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Set/Expansion</label>
				<input 
					onChange={ handleChange("expansion") } 
					type="text" 
					className="form-control" 
					value={ expansion } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Maker</label>
				<input 
					onChange={ handleChange("maker") } 
					type="text" 
					className="form-control" 
					value={ maker } 
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Released on</label>
				<input 
					onChange={ handleChange("released") } 
					type="text" 
					className="form-control" 
					value={ released } 
				/>
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
			<button className="btn btn-outline-primary mt-2">Create Product</button>
		</form>
	);


	const showError = () => (
		<div className="alert alert-danger" style={{display: error ? "" : "none"}}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{display: createdProduct ? "" : "none"}}>
			<h2>{`${createdProduct}`} is created.</h2>
		</div>
	);

	const showLoading = () => 
		loading && (
			<div className="alert alert-success">
			<h2>Loading...</h2>
		</div>
	);

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
					{goBack()}
				</div>
			</div>
		</Layout>
	);

};

export default AddProduct;