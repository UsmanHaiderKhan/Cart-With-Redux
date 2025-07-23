const FIREBASE_URL =
  'https://redux-cart-b4321-default-rtdb.europe-west1.firebasedatabase.app';

export const productsService = {
  // Fetch all products from Firebase
  async fetchProducts() {
    try {
      const response = await fetch(`${FIREBASE_URL}/products.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return fallback products if Firebase is not accessible
      return [
        {
          id: 'fallback-1',
          name: 'Books-1',
          price: 5,
          description: 'Books are every where.',
          image:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'fallback-2',
          name: 'Books-2',
          price: 8,
          description: 'Books are every where.',
          image:
            'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'fallback-3',
          name: 'Books-3',
          price: 7,
          description: 'Books are every where.',
          image:
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        },
      ];
    }
  },

  // Add a new product to Firebase
  async addProduct(product) {
    try {
      const response = await fetch(`${FIREBASE_URL}/products.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const data = await response.json();
      return { id: data.name, ...product };
    } catch (error) {
      console.error('Error adding product:', error);
      // Return a mock product if Firebase is not accessible
      return {
        id: `mock-${Date.now()}`,
        ...product,
      };
    }
  },

  // Update an existing product
  async updateProduct(id, product) {
    try {
      const response = await fetch(`${FIREBASE_URL}/products/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return { id, ...product };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(id) {
    try {
      const response = await fetch(`${FIREBASE_URL}/products/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      return id;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Initialize products with dummy data if none exist
  async initializeProducts() {
    try {
      const existingProducts = await this.fetchProducts();
      if (existingProducts.length === 0) {
        const dummyProducts = [
          {
            name: 'Books-1',
            price: 5,
            description: 'Books are every where.',
            image:
              'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
          },
          {
            name: 'Books-2',
            price: 8,
            description: 'Books are every where.',
            image:
              'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80',
          },
          {
            name: 'Books-3',
            price: 7,
            description: 'Books are every where.',
            image:
              'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
          },
        ];

        for (const product of dummyProducts) {
          await this.addProduct(product);
        }

        return await this.fetchProducts();
      }
      return existingProducts;
    } catch (error) {
      console.error('Error initializing products:', error);
      // Return fallback products if Firebase is not accessible
      return [
        {
          id: 'fallback-1',
          name: 'Books-1',
          price: 5,
          description: 'Books are every where.',
          image:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'fallback-2',
          name: 'Books-2',
          price: 8,
          description: 'Books are every where.',
          image:
            'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'fallback-3',
          name: 'Books-3',
          price: 7,
          description: 'Books are every where.',
          image:
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        },
      ];
    }
  },
};
