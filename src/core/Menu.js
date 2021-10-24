import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal} from "./cartHelpers";
import Search from "./Search";
import cartImage from "../assets/images/shopping-cart-24.png";
import userImage from "../assets/images/user-24.png";

const isActive = (history, path) => {
	if(history.location.pathname === path) {
		return { color: "#FDFD00" };
	} else {
		return { color: "#ffffff" };
	}
};
// destructure history from props
const Menu = ({ history }) => (
	<div>
		<ul className="nav nav-tabs gray-dark">
			<li className="nav-item">
				<Link 
					className="nav-link" 
					style={isActive(history, "/")} 
					to="/">Home</Link>
			</li>
			<li className="nav-item">
				<Link 
					className="nav-link" 
					style={isActive(history, "/shop")} 
					to="/shop">Shop</Link>
			</li>

			<li className="nav-item">
				<Link 
					className="nav-link" 
					style={isActive(history, "/cart")} 
					to="/cart">
					<img 
						src={cartImage} 
						width="24" 
						height="24"
						className="d-inline-block align-text-top" />
					{" "}
						<sup>
							<small className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
								{itemTotal()}
							</small>
						</sup>
				</Link>
			</li>

			{/*<li className="nav-item w-50">
				<Search />
			</li>*/}
			
			{ isAuthenticated() && isAuthenticated().user.role === 0 && (
				<li className="nav-item ms-auto">
					<Link 
						className="nav-link" 
						style={isActive(history, "/user/dashboard")} 
						to="/user/dashboard">
							<img 
								src={userImage} 
								width="24" 
								height="24"
								className="d-inline-block align-text-top" />
					</Link>
				</li>
			)}

			{ isAuthenticated() && isAuthenticated().user.role === 1 && (
				<li className="nav-item ms-auto">
					<Link 
						className="nav-link" 
						style={isActive(history, "/admin/dashboard")} 
						to="/admin/dashboard">
							<img 
								src={userImage} 
								width="24" 
								height="24"
								className="d-inline-block align-text-top" />
					</Link>
				</li>
			)}

			{ !isAuthenticated() && (
				<Fragment>
					<li className="nav-item ms-auto">
						<Link 
							className="nav-link" 
							style={isActive(history, "/signin")} 
							to="/signin">
								<img 
									src={userImage} 
									width="24" 
									height="24"
									className="d-inline-block align-text-top" />
						</Link>
					</li>
				</Fragment>
			)}
{/*			
			{ isAuthenticated() && (
				<li className="nav-item ms-auto">
					<span 
						className="nav-link" 
						style={{cursor: "pointer", color: "#ffffff"}} 
						onClick={() => 
							signout(() => {
								history.push("/");
							})
						}
					>Signout
					</span>
				</li>
			)}*/}

			

		</ul>
	</div>
);

export default withRouter(Menu);