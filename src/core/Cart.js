import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import SmallCard from './SmallCard';
import Checkout from './Checkout';
import Footer from "./Footer";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h4 className="mt-3">Your cart has {`${items.length}`} items</h4>
                <hr />
                {items.map((product, i) => (
                    <SmallCard
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <div>
            <h4 className="mt-3">Your cart is empty</h4>
            <br />
            <Link to="/shop">Continue Shopping</Link>
        </div>
    );

    return (
        <Layout
            title="Your Cart"
            description="Manage your cart items. Add items, remove items, adjust quantities, or checkout."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 mt-2">
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
                <div className="col-md-4 mb-5">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
            </div>
        <Footer />
        </Layout>
    );
};

export default Cart;