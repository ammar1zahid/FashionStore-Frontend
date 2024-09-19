import styled, { keyframes } from "styled-components";
import { Announcement as AnnouncementIcon } from "@mui/icons-material";

// Keyframes for the animation
const pulseAnimation = keyframes`
  0% {
    background-color: #f0fcfa;
  }
  50% {
    background-color: #00796b;
  }
  100% {
    background-color: #f0fcfa;
  }
`;

const Container = styled.div`
  height: 50px; 
  
   background-color: #f0fcfa; 
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  animation: ${pulseAnimation} 5s infinite; /* Animation for attention */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  border-bottom: 2px solid #004d40; /* Border to enhance separation */
`;

const AnnouncementText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Announcement: React.FC = () => {
  return (
    <Container>
      <AnnouncementIcon style={{ marginRight: "10px" }} />
      <AnnouncementText>Super Deal! Free Shipping on Orders Over $50</AnnouncementText>
    </Container>
  );
};

export default Announcement;
