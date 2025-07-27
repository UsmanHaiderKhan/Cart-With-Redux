import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { initializeProducts } from '../../store/products-actions';

const Products = (props) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(initializeProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <section className={classes.products}>
        <h2>Loading products...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.products}>
        <h2>Error loading products: {error}</h2>
      </section>
    );
  }

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
