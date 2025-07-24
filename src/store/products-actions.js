import { productsActions } from './products-slice';
import { uiActions } from './ui-slice';
import { productsService } from '../services/products-service';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(productsActions.setLoading(true));

    try {
      const products = await productsService.fetchProducts();
      dispatch(productsActions.setProducts(products));
    } catch (error) {
      dispatch(productsActions.setError(error.message));
      dispatch(
        uiActions.showNotification({
          status: 'Error',
          title: 'Error',
          message: 'Failed to fetch products.',
        })
      );
    }
  };
};

export const initializeProducts = () => {
  return async (dispatch) => {
    dispatch(productsActions.setLoading(true));

    try {
      const products = await productsService.initializeProducts();
      dispatch(productsActions.setProducts(products));
    } catch (error) {
      dispatch(productsActions.setError(error.message));
      dispatch(
        uiActions.showNotification({
          status: 'Error',
          title: 'Error',
          message: 'Failed to initialize products.',
        })
      );
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    dispatch(productsActions.setLoading(true));

    try {
      const newProduct = await productsService.addProduct(product);
      dispatch(productsActions.addProduct(newProduct));
      dispatch(productsActions.setLoading(false));
      dispatch(
        uiActions.showNotification({
          status: 'Success',
          title: 'Success',
          message: 'Product added successfully.',
        })
      );
    } catch (error) {
      dispatch(productsActions.setError(error.message));
      dispatch(
        uiActions.showNotification({
          status: 'Error',
          title: 'Error',
          message: 'Failed to add product.',
        })
      );
    }
  };
};

export const updateProduct = (id, product) => {
  return async (dispatch) => {
    dispatch(productsActions.setLoading(true));

    try {
      const updatedProduct = await productsService.updateProduct(id, product);
      dispatch(productsActions.updateProduct(updatedProduct));
      dispatch(productsActions.setLoading(false));
      dispatch(
        uiActions.showNotification({
          status: 'Success',
          title: 'Success',
          message: 'Product updated successfully.',
        })
      );
    } catch (error) {
      dispatch(productsActions.setError(error.message));
      dispatch(
        uiActions.showNotification({
          status: 'Error',
          title: 'Error',
          message: 'Failed to update product.',
        })
      );
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(productsActions.setLoading(true));

    try {
      await productsService.deleteProduct(id);
      dispatch(productsActions.deleteProduct(id));
      dispatch(productsActions.setLoading(false));
      dispatch(
        uiActions.showNotification({
          status: 'Success',
          title: 'Success',
          message: 'Product deleted successfully.',
        })
      );
    } catch (error) {
      dispatch(productsActions.setError(error.message));
      dispatch(
        uiActions.showNotification({
          status: 'Error',
          title: 'Error',
          message: 'Failed to delete product.',
        })
      );
    }
  };
};
