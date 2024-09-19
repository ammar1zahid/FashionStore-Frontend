import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  FavoriteBorderOutlined, // Icon for Wishlist
  LocationOnOutlined,     // Icon for Address
  PaymentOutlined          // Icon for Payment
} from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { logout } from "../redux/userRedux";

// Navbar Container
const Container = styled.div`
  height: 60px;
  background: teal;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  overflow: hidden; /* Prevents overflow caused by sidebar */
`;

// Wrapper for positioning elements
const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

// Left section of the navbar
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

// Language Selector
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: #555;
  transition: color 0.3s;

  &:hover {
    color: #009688;
  }
`;

// Search container
const SearchContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px 15px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`;

// Search input
const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 5px;
  font-size: 14px;
`;

// Center section of the navbar
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

// Logo
const Logo = styled.h1`
  font-weight: bold;
  color: #333;
  font-size: 24px;
  letter-spacing: 2px;
`;

// Right section of the navbar
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// Menu items
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: #555;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #004d40;
    transform: scale(1.1);
  }
`;

// Sidebar Container (Collapsible)
const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')}; /* Sidebar is hidden by default */
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Smooth transition */
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto; /* Prevent sidebar overflow */
`;

// Sidebar Menu Items
const SidebarItem = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 1px solid #ddd;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: teal;
    transform: translateX(5px);
  }
`;

// Sidebar Item Text
const SidebarText = styled.span`
  margin-left: 10px;
`;

// Close Icon in Sidebar
const CloseIcon = styled(CloseOutlined)`
  cursor: pointer;
  align-self: flex-end;
  color: #333;
  font-size: 24px;
`;

// Navbar component
const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('persist:root');
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <HomeOutlined />
            </Link>
          </MenuItem>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 18 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>Fashion Store.</Logo>
          </Link>
        </Center>
        <Right>
          {!currentUser && (
            <>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          {currentUser && (
            <>
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined style={{ fontSize: 24 }} />
                  </Badge>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                <LogoutOutlined />
              </MenuItem>
              {/* Sidebar Toggle Menu */}
              <MenuItem onClick={toggleSidebar}>
                <MenuOutlined />
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>

      {/* Collapsible Sidebar */}
      <SidebarContainer isOpen={isSidebarOpen}>
        <CloseIcon onClick={toggleSidebar} />
        <SidebarItem to="/wishlist">
          <FavoriteBorderOutlined />
          <SidebarText>Wishlist</SidebarText>
        </SidebarItem>
        <SidebarItem to="/address">
          <LocationOnOutlined />
          <SidebarText>Address</SidebarText>
        </SidebarItem>
        <SidebarItem to="/payment">
          <PaymentOutlined />
          <SidebarText>Payment</SidebarText>
        </SidebarItem>
      </SidebarContainer>
    </Container>
  );
};

export default Navbar;
