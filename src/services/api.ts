export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}