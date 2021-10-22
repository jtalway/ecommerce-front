import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
	const [ name, setName ] = useState("");
	const [ error, setError ] = useState(false);
	const [ success, setSuccess ] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange = e => {
		setError("");
		setName(e.target.value);
	};

	const clickSubmit = e => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		// make request to api to create category
		createCategory(user._id, token, { name })
		.then(data => {
			if(data.error) {
				setError(true)
			} else {
				setError("");
				setSuccess(true);
			}
		});
	};

	const newCategoryForm = () => (
		<form onSubmit={ clickSubmit }>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input 
					type="text" 
					className="form-control" 
					onChange={ handleChange } 
					value= { name } 
					autoFocus 
					required
				/>
				
			</div>
				<button className="btn btn-outline-primary mt-2">
					Create Category
				</button>
		</form>
	);


	const showSuccess = () => {
		if(success) {
			return <h6 className="alert alert-success">Category: '{ name }' has been created.</h6>
		};
	};

	const showError = () => {
		if(error) {
			return <h6 className="alert alert-danger">'{ name }' all ready exists. Category should be unique.</h6>
		};
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
			title="Add a new category" 
			description={ `Welcome ${ user.name }! Ready to add a new category?`} 
		>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{ showError() }	
					{ showSuccess() }
					{ newCategoryForm() }
					{ goBack() }

				</div>
			</div>		
		</Layout>
	);

};

export default AddCategory;