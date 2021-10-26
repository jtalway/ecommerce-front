import React, {useState, useEffect, Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import Layout from "../core/Layout";
import { signout, isAuthenticated } from "../auth";
import {getPurchaseHistory} from "./apiUser";
import moment from "moment";
import userImage from "../assets/images/user-24.png";
import Footer from "../core/Footer";

const Dashboard = () => {

	const [history, setHistory] = useState([]);

	const {user: { _id, name, email, role }} = isAuthenticated();
	const token = isAuthenticated().token;

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
	}, [])

	const userLinks = () => {
		return (
			<div className="card mt-5">
				<h4 className="card-header">User Links</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/cart">My Cart</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
					</li>
					<li className="list-group-item">
						{ isAuthenticated() && (
						<Link 
							className="nav-link" 
							style={{color: "red"}}
							to={"/signin"}
							onClick={() => 
								signout(() => {
									history.push("/signin");
								})
							}
						>
							Signout 
						</Link>
						)}
					</li>
				</ul>
			</div>
		)
	};

	const userInfo = () => {
		return (
			<div className="card mt-5">
				<h3 className="card-header">User Information</h3>
				<ul className="list-group">
					<li className="list-group-item">{ name }</li>
					<li className="list-group-item">{ email }</li>
					<li className="list-group-item">{ role === 1 ? "Admin" : "Registered User"}</li>
				</ul>
			</div>
		)
	};

	    const purchaseHistory = history => {
        return (
            <div className="card mt-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, hIndex) => {
                            return (
                                <div key={hIndex}>
                                	<hr />
                                	<h6>Order ID: {h._id}</h6>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>

                                                <h6>Product name: {p.name}</h6>
                                                <h6>Quantity: {p.count}</h6>
                                                <h6>Price: ${p.price}</h6>
                                                <h6>
                                                    Purchased:{" "}
                                                    {moment(h.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

	return (
		<Layout title="Dashboard" description={ `Welcome ${ name }!`} className="container-fluid">
			<div className="row">
				<div className="col-md-4 mb-5">
					{ userLinks() }
				</div>
				<div className="col-md-4 mb-5">
					{ userInfo() }
				</div>
				<div className="col-md-4 mb-5">
					{ purchaseHistory(history) }
				</div>
			</div>
		<Footer />
		</Layout>
	)
};

export default withRouter(Dashboard);