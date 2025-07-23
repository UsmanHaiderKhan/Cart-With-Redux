import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/products-actions';
import Card from '../UI/Card';
import classes from './AddProduct.module.css';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
    };

    dispatch(addProduct(product));

    // Reset form
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
    });
  };

  return (
    <Card>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {formData.image && (
          <div className={classes.preview}>
            <label>Image Preview:</label>
            <img
              src={formData.image}
              alt="Preview"
              className={classes.previewImage}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className={classes.actions}>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </Card>
  );
};

export default AddProduct;
