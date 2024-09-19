import React from "react";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined, // Import the filled icon
  SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { addToWishlist, removeFromWishlist } from "../redux/apiCalls"; // Import the API call functions
import { RootState } from "../redux/store"; // Import your root state if you're using TypeScript

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  cursor: pointer;
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

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
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

interface ProductProps {
  item: {
    _id: string;
    img: string;
  };
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.currentUser?._id);
  
  
  // Fetch wishlist from Redux store
  const wishlist = useSelector((state: RootState) => state.wishlist.products);
  console.log("wishlist from page ",wishlist)

  // Check if the current item is in the wishlist
   const isInWishlist = wishlist.some((wishlistItem) =>wishlistItem.productId === item._id);
  //  const isInWishlist = wishlist.some((wishlistItem) => console.log("wishlist id: ",wishlistItem._id ));
   //const isInWishlist = wishlist.some((wishlistItem) => console.log("wishlist product id: ",wishlistItem.productId ));

  const handleToggleWishlist = () => {
    console.log("wishlist in toggle ",wishlist)
    
    if (userId) {

      if (isInWishlist) {
        // If the item is already in the wishlist, remove it
        removeFromWishlist(dispatch, userId, item._id);
      } else {
        // If the item is not in the wishlist, add it
        addToWishlist(dispatch, userId, item._id);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <StyledLink to={`/product/${item._id}`}>
            <SearchOutlined />
          </StyledLink>
        </Icon>
        <Icon onClick={handleToggleWishlist}>
          {/* Toggle between filled and unfilled favorite icon */}
          {isInWishlist ? (
            <FavoriteOutlined /> // Show filled icon if in wishlist
          ) : (
            <FavoriteBorderOutlined /> // Show border icon if not in wishlist
          )}
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
