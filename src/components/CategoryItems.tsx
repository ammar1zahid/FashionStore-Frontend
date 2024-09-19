import { Link } from "react-router-dom";
import styled from "styled-components";

interface CategoryItemProps {
  item: {
    img: string;
    title: string;
    cat: string;
  };
}

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background: linear-gradient(135deg, #ff6f61, #ff3f5d);
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(135deg, #ff3f5d, #ff6f61);
  }
`;

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  return (
    <Container>
      <Link to={`/category/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
