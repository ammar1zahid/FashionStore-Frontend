import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Announcement from "../../components//Annoucement";
import Products from "../../components/Products";
import Newsletter from "../../components/NewLetter";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: center; /* Center title on all screens */
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow filters to wrap */
  justify-content: space-between;
  padding: 20px; /* Add padding for better spacing */
  background-color: #f9f9f9; /* Light background for filters */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin: 20px; /* Margin around filter container */
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 10px; /* Adjust margin for mobile */
  flex: 1; /* Allow filters to grow equally */
  min-width: 200px; /* Minimum width for filters */
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  color: #555;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  flex: 1; /* Allow select to grow */
  min-width: 100px; /* Minimum width for selects */
  border: 1px solid #ddd; /* Border for select */
  border-radius: 5px; /* Rounded corners */
  background-color: #fff; /* White background */
  color: #333; /* Text color */
  transition: border-color 0.3s;

  &:hover {
    border-color: teal; /* Change border color on hover */
  }

  &:focus {
    outline: none; /* Remove default focus outline */
    border-color: teal; /* Highlight border on focus */
  }
`;

const Option = styled.option``;

const ResetButton = styled.button`
  padding: 10px 15px;
  margin-left: 20px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ProductList: React.FC = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [sort, setSort] = useState("newest");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });

    if (e.target.name === "color") {
      setColor(value);
    } else if (e.target.name === "size") {
      setSize(value);
    }
  };

  const handleResetFilters = () => {
    setFilters({});
    setColor("");
    setSize("");
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" value={color} onChange={handleFilters}>
            <Option disabled value="">Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" value={size} onChange={handleFilters}>
            <Option disabled value="">Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
          <ResetButton onClick={handleResetFilters}>Reset</ResetButton>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)} value={sort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
