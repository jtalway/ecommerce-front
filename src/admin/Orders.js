import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
	// State
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);

	// destructure isAuth for ease of use
	const { user, token } = isAuthenticated();

	// get all orders from backend
	const loadOrders = () => {
		// find order by user id
		listOrders(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				// update state
				setOrders(data);
			}
		});
	};

	// get all status values (for order disposition) from backend
	const loadStatusValues = () => {
		getStatusValues(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				// update state
				setStatusValues(data);
			}
		});
	};

	// after render
	useEffect(() => {
		loadOrders();
		loadStatusValues();
	}, [])

	// show message for zero orders
	const showOrdersLength = () => {
		if (orders.length > 0) {
			return (
				<div className="d-grid">
					<button className="btn btn-danger mt-2" disabled>
						Total Orders &nbsp;
						<span className="badge rounded-pill bg-primary">
							{orders.length}
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className="d-grid">
					<button className="btn btn-danger" disabled>
						No orders found (check DB)
					</button>
				</div>
			);
		}
	};

	// show each product
	const showInput = (key, value) => (
		<div className="input-group mb-2">
			<div className="input-group-prepend">
				<div className="input-group-text">{key}</div>
			</div>
			<input 
				type="text" 
				value={value} 
				className="form-control" 
				readOnly 
			/>
		</div>
	);


	const handleStatusChange = (e, orderId) => {
		// make request to backend
		updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
			if (data.error) {
				console.log("Status update failed.")
			} else {
				// get updated status orders
				loadOrders();
			}
		});
	};

	// status of Order
	const showStatus = o => (
		<div className="form-group">
			<h5 className="mark mb-2">Status: {o.status}</h5>
			<select 
				className="form-control" 
				onChange={(e) => handleStatusChange(e, o._id)}
			>
				<option>Update Status</option>
				{statusValues.map((status, index) => (
					<option key={index} value={status}>
						{status}
					</option>
				))}
			</select>
		</div>
	);

	// return the orders
	return (
		<Layout 
			title="Orders" 
			description={ `Welcome ${ user.name }! You can manage all the orders here...`} 
		>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showOrdersLength()}	
					{orders.map((o, oIndex) => {
						return (
							<div 
								className="mt-3" 
								key={oIndex} 
								style={{ borderBottom: "5px solid indigo"}}
							>
								<div className="d-grid">
									<button className="btn btn-primary mt-2" disabled>
										Order ID &nbsp;
										<span className="badge rounded-pill bg-dark">
											{o._id}
										</span>
									</button>
								</div>
								<ul className="list-group mb-2">
									<li className="list-group-item">
										{showStatus(o)}
									</li>
									<li className="list-group-item">
										Transaction ID: {o.transaction_id}
									</li>
									<li className="list-group-item">
										Amount: ${o.amount}
									</li>
									<li className="list-group-item">
										Ordered by: {o.user.name}
									</li>
									<li className="list-group-item">
										Ordered: {moment(o.createdAt).fromNow()}
									</li>
									<li className="list-group-item">
										Delivery Address: {o.address}
									</li>
								</ul>
								<h5 className="mt-2 mb-2 font-italic">
									Total products in order: {o.products.length}
								</h5>

								{o.products.map((p, pIndex) => (
									<div 
										className="mb-2" 
										key={pIndex} 
										style={{padding: "20px", border: "1px solid indigo"}}
									>
										{showInput("Product Name", p.name)}
										{showInput("Product Price", p.price)}
										{showInput("Quantity Ordered", p.count)}
										{showInput("Product Id", p._id)}
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);

};

export default Orders;