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
  animation: ${pulseAnimation} 5s infinite; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  border-bottom: 2px solid #004d40; 

  @media (max-width: 768px) {
    height: 40px; 
    font-size: 14px; 
  }

  @media (max-width: 480px) {
    height: 35px; 
    font-size: 12px; 
  }
`;

const AnnouncementText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    margin-left: 8px; 
  }

  @media (max-width: 480px) {
    margin-left: 5px; 
  }
`;

const AnnouncementIconStyled = styled(AnnouncementIcon)`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 8px; 
    font-size: 18px; 
  }

  @media (max-width: 480px) {
    margin-right: 5px; 
    font-size: 16px; 
  }
`;

const Announcement: React.FC = () => {
  return (
    <Container>
      <AnnouncementIconStyled />
      <AnnouncementText>Super Deal! Free Shipping on Orders Over $50</AnnouncementText>
    </Container>
  );
};

export default Announcement;
