import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItems";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

`;

const Categories: React.FC = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
