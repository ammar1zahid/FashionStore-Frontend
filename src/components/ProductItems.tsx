import React from "react";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/apiCalls";
import { RootState } from "../redux/store";

// Styled Components
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); /* Slightly darker background */
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center everything vertically */
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const TitlePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  color: white;
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  transition: transform 0.3s ease;
  z-index: 1;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover ${Info} {
    opacity: 1;
  }

  &:hover ${Circle} {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  height: 75%;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Space between the icons */
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.2);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Component
interface ProductProps {
  item: {
    _id: string;
    img: string;
    title: string;
    price: number;
  };
}


const Product: React.FC<ProductProps> = ({ item }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.currentUser?._id);

  // Fetch wishlist from Redux store
  const wishlist = useSelector((state: RootState) => state.wishlist.products);

  // Check if the current item is in the wishlist
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInWishlist = wishlist.some((wishlistItem : any) => wishlistItem.productId === item._id);

  const handleToggleWishlist = () => {
    if (userId) {
      if (isInWishlist) {
        removeFromWishlist(dispatch, userId, item._id);
      } else {
        addToWishlist(dispatch, userId, item._id);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} alt={item.title} />
      <Info>
        {/* Title and Price in the middle */}
        <TitlePriceContainer>
          <Title>{item.title}</Title>
          <Price>${item.price.toFixed(2)}</Price>
        </TitlePriceContainer>

        {/* Icons in the third row */}
        <IconContainer>
          <Icon>
            <StyledLink to={`/product/${item._id}`}>
              <SearchOutlined />
            </StyledLink>
          </Icon>
          <Icon onClick={handleToggleWishlist}>
            {isInWishlist ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
          </Icon>
        </IconContainer>
      </Info>
    </Container>
  );
};

export default Product;
