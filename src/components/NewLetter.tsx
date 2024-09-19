import { Send } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  height: 60vh;
  background: linear-gradient(135deg, #f9f9f9 0%, #fcf5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem; /* Adjusted for better readability */
  font-weight: 700;
  margin-bottom: 20px;
  color: #333; /* Darker color for better contrast */
  text-align: center;
`;

const Desc = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 80%;
  max-width: 600px; /* Max width for responsiveness */
  height: 50px; /* Increased height for better usability */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd; /* Lighter border */
  border-radius: 25px; /* Rounded corners */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding: 0 20px;
  height: 100%;
  border-radius: 25px; /* Match the container corners */
  font-size: 1rem;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #007bff; /* A vibrant blue for the button */
  color: white;
  height: 100%;
  border-radius: 25px; /* Match the container corners */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const Newsletter: React.FC = () => {
  return (
    <Container>
      <Title>Subscribe to Our Newsletter</Title>
      <Desc>Stay updated with our latest news and special offers.</Desc>
      <InputContainer>
        <Input placeholder="Enter your email address" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
