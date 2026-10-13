import { products, getProductBySlug, getMainProduct } from '../data/products';

export const productService = {
  getProducts: async () => {
    // Simulates an API call with potential future backend
    return Promise.resolve(products);
  },

  getProductBySlug: async (slug) => {
    const product = getProductBySlug(slug);
    return Promise.resolve(product);
  },

  getMainProduct: async () => {
    return Promise.resolve(getMainProduct());
  },

  searchProducts: async (query) => {
    if (!query || !query.trim()) return Promise.resolve(products);
    const q = query.toLowerCase().trim();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.format.toLowerCase().includes(q)
    );
    return Promise.resolve(filtered);
  }
};
