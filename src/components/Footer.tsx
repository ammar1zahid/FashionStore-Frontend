import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #333; 
  color: #f5f5f5; 
  padding: 40px 20px; 
  flex-wrap: wrap; /* Allow wrapping for smaller screens */

  @media (max-width: 768px) {
    padding: 20px; /* Reduce padding on smaller screens */
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    flex: 1 0 100%; /* Stack vertically on smaller screens */
    padding: 10px; /* Reduce padding */
  }
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f5f5f5; 
`;

const Desc = styled.p`
  margin: 20px 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #ddd;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Smaller description font size */
  }
`;

const SocialContainer = styled.div`
  display: flex;
`;

interface SocialIconProps {
  color: string;
}

const SocialIcon = styled.div<SocialIconProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #${(props) => props.color}CC; 
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    flex: 1 0 100%; /* Stack vertically on smaller screens */
    padding: 10px; /* Reduce padding */
  }
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5f5f5;

  @media (max-width: 768px) {
    font-size: 1.25rem; /* Smaller title font size */
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  color: #ddd;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size: 1rem;

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    flex: 1 0 100%; /* Stack vertically on smaller screens */
    padding: 10px; /* Reduce padding */
  }
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #ddd;

  svg {
    margin-right: 10px;
    color: #e0e0e0; 
  }
`;

const Payment = styled.img`
  width: 60%;
  margin-top: 20px;
  border-radius: 8px; 

  @media (max-width: 768px) {
    width: 80%; /* Increase width on smaller screens */
  }
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <Left>
        <Logo>Fashion Store.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room /> 622 Dixie Path, South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone /> +92 3456789120
        </ContactItem>
        <ContactItem>
          <MailOutline /> contact@Ammar.dev
        </ContactItem>
        <Payment src="../../public/pics/payment2.png" />
      </Right>
    </Container>
  );
};

export default Footer;
