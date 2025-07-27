import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { name, quantity, total, price, id, image } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({ id, name, price: +price, image }));
  };

  return (
    <li className={classes.item}>
      <div className={classes.itemContent}>
        {image && image.trim() !== '' && (
          <div className={classes.imageContainer}>
            <img
              src={image}
              alt={name}
              className={classes.itemImage}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className={classes.itemDetails}>
          <header>
            <h3>{name}</h3>
            <div className={classes.price}>
              ${Number(total).toFixed(2)}{' '}
              <span className={classes.itemprice}>
                (${Number(price).toFixed(2)}/item)
              </span>
            </div>
          </header>
          <div className={classes.details}>
            <div className={classes.quantity}>
              x <span>{quantity}</span>
            </div>
            <div className={classes.actions}>
              <button onClick={removeItemHandler}>-</button>
              <button onClick={addItemHandler}>+</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
