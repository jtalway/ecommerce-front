import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listUsers } from "./apiAdmin";

const UserList = () => {
	
	const [users, setUsers] = useState([]);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();
	// get request to server to get all users
	// get all orders from backend
	console.log(users);
	console.log(user._id);
	const loadUsers = () => {
		// find order by user id
		listUsers(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				// update state
				setUsers(data);
				console.log(data);
			}
		});
	};

	// // after render
	// useEffect(() => {
	// 	loadUsers();
	// }, [])

	// show message for zero orders
	const showUsersLength = () => {
		if (users.length > 0) {
			return (
				<div className="d-grid">
					<button className="btn btn-danger mt-2" disabled>
						Total Users &nbsp;
						<span className="badge rounded-pill bg-primary">
							{users.length}
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className="d-grid">
					<button className="btn btn-danger" disabled>
						No users found (check DB)
					</button>
				</div>
			);
		}
	};

	// render on screen
	return (
		<Layout 
			title="Users" 
			description={ `User List`} 
		>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showUsersLength()}	
					{users.map((u, uIndex) => {
						return (
							<div 
								className="mt-3" 
								key={uIndex} 
								style={{ borderBottom: "5px solid indigo"}}
							>
								<div className="d-grid">
									<button className="btn btn-primary mt-2" disabled>
										User ID &nbsp;
										<span className="badge rounded-pill bg-dark">
											{u._id}
										</span>
									</button>
								</div>
								<ul className="list-group mb-2">
									<li className="list-group-item">
										Name: ${u.name}
									</li>
									<li className="list-group-item">
										Email: {u.email}
									</li>
									<li className="list-group-item">
										About: ${u.about}
									</li>
									<li className="list-group-item">
										Role: ${u.role}
									</li>
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default UserList;