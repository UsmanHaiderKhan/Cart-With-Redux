import {uiActions} from './ui-slice';
import {cartActions} from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://redux-cart-b4321-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch Cart');
            }
            const data = await response.json();
            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'Error',
                    title: 'Error',
                    message: 'Fetch Cart data failed.',
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch, getState) => {
        dispatch(
            uiActions.showNotification({
                status: 'Pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );
        const sendRequest = async () => {
            const response = await fetch(
                'https://redux-cart-b4321-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    // body: JSON.stringify(cart), it will sent the complete obj
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }), // this specific props which we want
                }
            );
            if (!response.ok) {
                throw new Error('Sending Cart data failed.');
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'Success',
                    title: 'SuccessFull',
                    message: 'Cart data has been sent.',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'Error',
                    title: 'Error',
                    message: 'Sending Cart data failed.',
                })
            );
        }
    };
};

export const clearCartData = () => {
    return async (dispatch) => {
        const clearRequest = async () => {
            const response = await fetch(
                'https://redux-cart-b4321-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: [],
                        totalQuantity: 0,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error('Clearing Cart data failed.');
            }
        };

        try {
            await clearRequest();
            dispatch(
                cartActions.replaceCart({
                    items: [],
                    totalQuantity: 0,
                })
            );
            dispatch(
                uiActions.showNotification({
                    status: 'Success',
                    title: 'Success',
                    message: 'Cart cleared successfully.',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'Error',
                    title: 'Error',
                    message: 'Failed to clear cart.',
                })
            );
        }
    };
};
