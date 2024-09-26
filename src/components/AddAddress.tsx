import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../redux/apiCalls";
import styled from "styled-components";
import { RootState } from "../redux/store";

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const AddAddress: React.FC = () => {
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser._id) {
      addAddress(dispatch, currentUser._id, newAddress);
      navigate("/address"); // Navigate back to the address page after successful addition
    }
  };

  return (
    <Container>
      <Title>Add New Address</Title>
      <form onSubmit={handleSubmit}>
        <Label>Street</Label>
        <Input
          type="text"
          name="street"
          value={newAddress.street}
          onChange={handleInputChange}
          required
        />

        <Label>City</Label>
        <Input
          type="text"
          name="city"
          value={newAddress.city}
          onChange={handleInputChange}
          required
        />

        <Label>State</Label>
        <Input
          type="text"
          name="state"
          value={newAddress.state}
          onChange={handleInputChange}
          required
        />

        <Label>Postal Code</Label>
        <Input
          type="text"
          name="postalCode"
          value={newAddress.postalCode}
          onChange={handleInputChange}
          required
        />

        <Label>Country</Label>
        <Input
          type="text"
          name="country"
          value={newAddress.country}
          onChange={handleInputChange}
          required
        />

        <Button type="submit">Save Address</Button>
      </form>
    </Container>
  );
};

export default AddAddress;
