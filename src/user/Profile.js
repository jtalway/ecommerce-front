import React, {useState, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

// pass props as arg but destructure to match
const Profile = ({match}) => {
	// state
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false
	});
	
	// destructure
	const {token} = isAuthenticated();
	const  {name, email, password, error, success} = values;


	const init = (userId) => {
		console.log(userId)
		read(userId, token).then(data => {
			if (data.error) {
				setValues({...values, error: true})
			} else {
				setValues({...values, name: data.name, email: data.email})
			}
		})
	};

	useEffect(() => {
		init(match.params.userId);
	}, []);

	// handle change on user input
	const handleChange = name => e => {
		setValues({...values, error: false, [name]: e.target.value});
	};

	// update backend and localstorage on user submit
	const clickSubmit = (e) => {
		e.preventDefault();
		update(match.params.userId, token, {name, password}).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				updateUser(data, () => {
					setValues({...values, name: data.name, success: true});
				});
			}
		})
	};

	const redirectUser = (success) => {
		if (success) {
			return <Redirect to="/cart" />
		}
	};

	// read from backend
	const profileUpdate = (name, email, password) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input 
					type="text" 
					onChange={handleChange("name")}
					className="form-control"
					value={name} 
				/>				
			</div>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input 
					type="email" 
					onChange={handleChange("email")}
					className="form-control"
					value={email} 
					disabled
				/>				
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input 
					type="text" 
					onChange={handleChange("password")}
					className="form-control"
					value={password} 
				/>				
			</div>
			<button onClick={clickSubmit} className="btn btn-primary">Submit</button>
		</form>
	);
	// update to backend

	// render to screen
	return (
		<Layout 
			title="Profile" 
			description="Update your profile" 
			className="container-fluid"
		>
			<div className="shadow p-3 mb-5 bg-body rounded border border-1 border-gray">
			<div className="hr-theme-slash-2 mb-4">
			  <div className="hr-line"></div>
			  <div className="hr-icon"><i className="material-icons">Profile Update</i></div>
			  <div className="hr-line"></div>
			</div>
				{profileUpdate(name, email, password)}
				{redirectUser(success)}
			</div>
		</Layout>
	);

};

export default Profile;