import styled from "styled-components";
import Product from "./ProductItems";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { makeRequest } from "../axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  background-color: #004d40; 
  border-radius: 8px;
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #e2e2e2, #ffffff);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  color: #555;
  margin-top: 5px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledSearchBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s;
  width: 300px;
  
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: 14px;
  width: 100%;
  margin-left: 10px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await makeRequest.get(
          cat ? `/products?category=${cat}&page=${page}&limit=8` : `/products?page=${page}&limit=8`
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, page]);

  useEffect(() => {
    // Combine filters and search term for filtering
    const result = products.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        const itemValue = item[key as keyof Product];
        if (typeof itemValue === "string" || Array.isArray(itemValue)) {
          return itemValue.includes(value);
        } else if (typeof itemValue === "number") {
          return itemValue === Number(value);
        }
        return false;
      });
      return matchesSearch && matchesFilters; // Return true only if both conditions match
    });

    setFilteredProducts(result);
  }, [products, searchTerm, filters]); // Add filters to dependencies

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts(prev =>
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
      <SearchContainer>
        <StyledSearchBox>
          <SearchIcon style={{ color: "gray", fontSize: 20 }} />
          <Input 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </StyledSearchBox>
      </SearchContainer>
      <Container>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => <Product item={item} key={item._id} />)
        ) : (
          <p style={{ textAlign: "center", width: "100%", color: "#fff" }}>
            No products found.
          </p>
        )}
      </Container>

      {/* Pagination */}
      <PaginationContainer>
        <PaginationButton 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={page === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </>
  );
};

export default Products;
