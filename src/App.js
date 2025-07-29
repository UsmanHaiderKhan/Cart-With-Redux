import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import AddProduct from './components/Admin/AddProduct';
import {useDispatch, useSelector} from 'react-redux';
import {Fragment, useEffect, useState} from 'react';
import Notification from './components/UI/Notification';
import {fetchCartData, sendCartData} from './store/cart-actions';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);
    const [showAdmin, setShowAdmin] = useState(false);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    message={notification.message}
                    title={notification.title}
                />
            )}

            <Layout>
                {showCart && <Cart/>}
                <div style={{marginBottom: '1rem'}}>
                    <button
                        onClick={() => setShowAdmin(!showAdmin)}
                        style={{
                            backgroundColor: showAdmin ? '#a50e48' : '#77002e',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        {showAdmin ? 'Hide Admin' : 'Show Admin'}
                    </button>
                </div>
                {showAdmin && <AddProduct/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;
