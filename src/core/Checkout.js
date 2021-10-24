import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
 
// when component mounts this checkout is used in the card component
const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });
    
    // get the client token from the backend
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    // set the state, update the clientToken
    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };
    useEffect(() => {
        getToken(userId, token);
    }, []);
 

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };
 

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
 

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-lg btn-danger">Please sign in to checkout</button>
            </Link>
        );
    };
 
    let deliveryAddress = data.address;
 
    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
 
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order
 
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };
 
                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };
 
    const showDropIn = () => (
        // get the token
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div className="shadow p-3 mb-5 bg-body rounded border border-1 border-gray d-grid">
                    <div className="form-group mb-3 d-grid">
                        <h2 className="mt-1 text-center btn btn-primary disabled">Delivery Address</h2>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
 
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <div className="d-grid">
                        <button onClick={buy} className="btn btn-success btn-block">
                            Pay
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
 
    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
 
    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thank you! Your payment was successful!
        </div>
    );
 
    const showLoading = loading => loading && (
        <div className="d-grid">
            <button className="btn btn-primary" type="button" disabled>
                <span 
                    className="spinner-border spinner-border-sm" 
                    role="status" 
                    aria-hidden="true">
                </span>
                &nbsp;Loading...
            </button>
        </div>
    );

    function financial(x) {return Number.parseFloat(x).toFixed(2);}
 
    return (
        <div>
            <div className="shadow p-3 mb-5 bg-body rounded border border-1 border-gray d-grid">
                <h2 className="mt-1 text-center btn btn-primary disabled">Cart Summary</h2>
                <div className="d-flex justify-content-center">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className="text-center">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => 
                                <tr key={i}>
                                    <td>{p.name}</td>
                                    <td className="text-center">{p.count}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h4>Total: ${financial(getTotal())}</h4>
            </div>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};
 
export default Checkout;