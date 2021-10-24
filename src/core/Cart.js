import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import SmallCard from './SmallCard';
import Checkout from './Checkout';

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
            title="Shopping Cart"
            description="Manage your cart items. Add/remove items, checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 mt-2">
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
                <div className="col-md-4">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;