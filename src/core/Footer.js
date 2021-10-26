import React, {Fragment} from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
	
	return (
			<Fragment>
			<section className="site-footer">
				<div className="container">
			        <div className="row">
			          <div className="col-sm-12 col-md-9">
			            <h6>About</h6>
			            <p className="text-justify">
			            	This E-Commerce app was made using MERN stack (Mongoose, Express, React, Node.js) -
			            	React Hooks with Node API following MVC pattern.
			            	<br /><a href="mailto:jtalway@gmail.com">Contact me</a>
			            	<br />Payment is handled through Braintree (A PayPal Company).
			            	<br />It contains: new arrivals, best sellers, search products, product image, product information,
			            	in stock/sold out, view product, related products, add to cart, adjust quantity, signin to checkout,
			            	user dashboard, admin dashboard, private routes, admin routes, shopping cart, checkout with
			            	credit card and PayPal, success/error/loading messages, update profile, advance search on category
			            	and price, load more products, create category, create product, view orders. manage orders, 
			            	update/delete products, role based access, and much more...
						</p>
			          </div>

			          <div className="col-xs-6 col-md-3 text-center">
			            <h6>Quick Links</h6>
			            <ul className="footer-links">
			              <li><Link to="/shop"><a>Shop</a></Link></li>
			              <li><Link to="/cart"><a>Cart</a></Link></li>        
			            </ul>
			          </div>
			        </div>
		        <hr/>
		      </div>
		      <div className="container">
		        <div className="row text-center">
		          <div className="col-md-12 col-sm-12 col-xs-12">
		            <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by &nbsp;
		         		<a 
		         			href="https://jtalway.github.io" 
							aria-label="My Website" 
							target="_blank" 
							rel="noopener">Jason Alway
						</a>.
		            </p>
		          </div>
		        </div>
		      </div>
			</section>
		</Fragment>

	);
};

export default Footer;