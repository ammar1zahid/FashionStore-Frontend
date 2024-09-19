import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItems";

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
  color: #333; // Dark grey color for the title
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; // Spacing between items
`;

const CategoryItemWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: #fff; // White background for category items
  border: 1px solid #ddd; // Light border for category items
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Categories: React.FC = () => {
  return (
    <Container>
      <Title>Browse Our Categories</Title>
      <CategoryWrapper>
        {categories.map((item) => (
          <CategoryItemWrapper key={item.id}>
            <CategoryItem item={item} />
          </CategoryItemWrapper>
        ))}
      </CategoryWrapper>
    </Container>
  );
};

export default Categories;
