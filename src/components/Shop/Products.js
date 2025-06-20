import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    {id:'p1',price:5, name: 'Books-1', description: 'Books are every where.'},
    {id:'p2',price:8, name: 'Books-2', description: 'Books are every where.'},
    {id:'p3',price:7, name: 'Books-3', description: 'Books are every where.'},
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
          {DUMMY_PRODUCTS.map(product => (
              <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
              />
          ))}

      </ul>
    </section>
  );
};

export default Products;
