import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {clearCartData} from '../../store/cart-actions';

const Cart = (props) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // Debug: Log cart items to see their structure
    console.log('Cart items:', cartItems);

    const clearCartHandler = () => {
        dispatch(clearCartData());
    };

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length > 0 && (
                <div style={{marginBottom: '1rem', textAlign: 'right'}}>
                    <button
                        onClick={clearCartHandler}
                        style={{
                            backgroundColor: '#d32f2f',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        Clear Cart
                    </button>
                </div>
            )}
            <ul>
                {cartItems &&
                    cartItems.map((item) => {
                        console.log('Cart item:', item); // Debug each item
                        return (
                            <CartItem
                                key={item.id}
                                item={{
                                    id: item.id,
                                    name: item.name,
                                    quantity: item.quantity,
                                    total: item.totalPrice,
                                    price: item.price,
                                    image: item.image,
                                }}
                            />
                        );
                    })}
            </ul>
        </Card>
    );
};

export default Cart;
