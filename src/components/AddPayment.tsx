import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPayment } from "../redux/apiCalls"; 
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

const AddPayment: React.FC = () => {
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPayment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser._id) {
      addPayment(dispatch, currentUser._id, newPayment);
      navigate("/payment"); // Navigate back to the payment methods page after successful addition
    }
  };

  return (
    <Container>
      <Title>Add New Payment Method</Title>
      <form onSubmit={handleSubmit}>
        <Label>Card Number</Label>
        <Input
          type="text"
          name="cardNumber"
          value={newPayment.cardNumber}
          onChange={handleInputChange}
          required
        />

        <Label>Card Name</Label>
        <Input
          type="text"
          name="cardName"
          value={newPayment.cardName}
          onChange={handleInputChange}
          required
        />

        <Label>Expiry Date</Label>
        <Input
          type="text"
          name="expiryDate"
          value={newPayment.expiryDate}
          onChange={handleInputChange}
          required
        />

        <Label>CVV</Label>
        <Input
          type="text"
          name="cvv"
          value={newPayment.cvv}
          onChange={handleInputChange}
          required
        />

        <Button type="submit">Save Payment Method</Button>
      </form>
    </Container>
  );
};

export default AddPayment;
