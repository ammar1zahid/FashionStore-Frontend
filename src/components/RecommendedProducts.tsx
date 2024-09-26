import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { makeRequest } from '../axios';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: #f0fcfa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row; /* Keep items in a single row */
  overflow-x: auto; /* Enable horizontal scrolling */
  gap: 20px;
  padding: 10px 0;
  width: 100%;
  scroll-behavior: smooth; /* Smooth scrolling */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const ProductItemWrapper = styled.div`
  flex: 0 0 200px; /* Ensure items are of fixed width */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  cursor: pointer; /* Makes the product appear clickable */
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px; /* Reduced height for better visibility in the row */
  object-fit: cover;
`;

const Info = styled.div`
  padding: 10px;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const Price = styled.p`
  font-size: 1rem;
  color: #888;
`;

interface RecommendedProductsProps {
  productId: string; // Accept productId as a prop
}

// RecommendedProducts Component
const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ productId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(`/products/recommended/${productId}`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to load recommended products:", err);
        setError('Failed to load recommended products');
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [productId]);

  if (loading) return <p>Loading recommended products...</p>;
  if (error) return <p>{error}</p>;

  // Function to handle product click and navigate
  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <Container>
      <Title>Recommended Products</Title>
      <ProductWrapper>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItemWrapper key={product._id} onClick={() => handleProductClick(product._id)}>
              <Image src={product.img} alt={product.title} />
              <Info>
                <ProductTitle>{product.title}</ProductTitle>
                <Price>${product.price}</Price>
              </Info>
            </ProductItemWrapper>
          ))
        ) : (
          <p>No recommended products available</p> // Handle empty product list
        )}
      </ProductWrapper>
    </Container>
  );
};

export default RecommendedProducts;
