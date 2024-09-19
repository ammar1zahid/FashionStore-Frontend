import styled from "styled-components";
import Product from "./ProductItems";
import { useEffect, useState } from "react";
import { makeRequest } from "../axios";

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

interface ProductsProps {
  cat: string;
  filters: { [key: string]: string };
  sort: string;
}

const Products: React.FC<ProductsProps> = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await makeRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            const itemValue = item[key as keyof Product];
            if (typeof itemValue === "string" || Array.isArray(itemValue)) {
              return itemValue.includes(value);
            } else if (typeof itemValue === "number") {
              return itemValue === Number(value);
            }
            return false;
          })
        )
      );
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <TitleContainer>
        <Title>{cat ? `Products in ${cat}` : 'Our Products'}</Title>
        <Subtitle>Explore our range of products tailored just for you.</Subtitle>
      </TitleContainer>
      <Container>
        {cat
          ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
          : products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)}
      </Container>
    </>
  );
};

export default Products;
