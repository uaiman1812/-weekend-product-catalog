import { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com/products';

// Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Fetch single product by ID
export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}