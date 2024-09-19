import styled from "styled-components";
import Product from "./ProductItems"; // Reuse Product component for displaying individual products
import { useEffect, useState } from "react";
import { makeRequest } from "../axios"; // Axios instance
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // RootState from Redux store

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px; // Add space between items
  background-color: #004d40; 
  border-radius: 8px; // Rounded corners
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #e2e2e2, #ffffff); // Gradient background
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff; // Change color on hover
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  color: #555;
  margin-top: 5px; // Space between title and subtitle
`;

interface Product {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories?: string[];
  size?: string[];
  color?: string[];
  price: number;
  inventory: number;
  inStock: boolean;
  createdAt: string;
}

interface WishlistItem {
  _id: string;
  userId: string;
  productId: Product; 
  createdAt: string;
  updatedAt: string;
}

const Wishlist: React.FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const userId = useSelector((state: RootState) => state.user.currentUser?._id); // Get user ID from Redux

  useEffect(() => {
    const getWishlistProducts = async () => {
      try {
        
        const res = await makeRequest.get(`/wishlist/${userId}`);
        
        // Map the response to extract productId (product details)
        const products = res.data.map((item: WishlistItem) => item.productId);
        
        setWishlistProducts(products); // Store the product objects in state
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      getWishlistProducts(); // Fetch wishlist products only if userId is available
    }
  }, [userId]);

  return (
    <>
      <TitleContainer>
        <Title>Your Wishlist</Title>
        <Subtitle>Explore the items you’ve added to your wishlist.</Subtitle>
      </TitleContainer>
      <Container>
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((item) => (
            <Product item={item} key={item._id} /> 
          ))
        ) : (
          <p>Your wishlist is currently empty.</p>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
