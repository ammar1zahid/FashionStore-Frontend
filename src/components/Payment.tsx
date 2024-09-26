import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPayments,
  deletePayment,
  editPayment,
} from "../redux/apiCalls";
import { RootState } from "../redux/store";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 800px;
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
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;

const PaymentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PaymentItem = styled.li`
  background-color: white;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface IPaymentMethod {
    _id?: string;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  }
  
  const PaymentComponent: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Get currentUser and payments
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const payments = Array.isArray(currentUser?.paymentMethods) ? currentUser.paymentMethods : [];


  
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editedPayment, setEditedPayment] = useState<Partial<IPaymentMethod>>({});
  
    useEffect(() => {
      if (currentUser && currentUser._id) {
        fetchPayments(dispatch, currentUser._id);
      }
    }, [dispatch, currentUser]);
  
    const handleDelete = (paymentMethodId: string) => {
      if (currentUser && currentUser._id) {
        deletePayment(dispatch, currentUser._id, paymentMethodId);
      }
    };
  
    const handleUpdatePayment = (paymentMethodId: string) => {
      setEditMode(paymentMethodId);
      const paymentToEdit = payments.find((payment: IPaymentMethod) => payment._id === paymentMethodId);
      setEditedPayment(paymentToEdit || {});
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedPayment((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSaveChanges = (paymentMethodId: string) => {
        if (currentUser && currentUser._id) {
          const { cardNumber = '', cardName = '', expiryDate = '', cvv = '' } = editedPayment;
      
          const updatedPayment: IPaymentMethod = { cardNumber, cardName, expiryDate, cvv };
        
          editPayment(dispatch, currentUser._id, paymentMethodId, updatedPayment);
          setEditMode(null); // Exit edit mode after saving
        }
      };
      
  
    return (
      <Container>
        <Title>My Payment Methods</Title>
        <Button onClick={() => navigate("/addpayment")}>Add New Payment Method</Button>
        <PaymentList>
        {Array.isArray(payments) && payments.map((payment: IPaymentMethod) => (
            <PaymentItem key={payment._id}>
              <Label>Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                value={editMode === payment._id ? editedPayment.cardNumber : payment.cardNumber}
                disabled={editMode !== payment._id}
                onChange={handleInputChange}
              />
  
              <Label>Card Name</Label>
              <Input
                type="text"
                name="cardName"
                value={editMode === payment._id ? editedPayment.cardName : payment.cardName}
                disabled={editMode !== payment._id}
                onChange={handleInputChange}
              />
  
              <Label>Expiry Date</Label>
              <Input
                type="text"
                name="expiryDate"
                value={editMode === payment._id ? editedPayment.expiryDate : payment.expiryDate}
                disabled={editMode !== payment._id}
                onChange={handleInputChange}
              />
  
              <Label>CVV</Label>
              <Input
                type="text"
                name="cvv"
                value={editMode === payment._id ? editedPayment.cvv : payment.cvv}
                disabled={editMode !== payment._id}
                onChange={handleInputChange}
              />
  
              {editMode === payment._id ? (
                payment._id ? (
                    <Button onClick={() => handleSaveChanges(payment._id as string)}>Save Changes</Button>
                  ) : null
                ) : (
                  payment._id ? (
                    <Button onClick={() => handleUpdatePayment(payment._id as string)}>Update</Button>
                  ) : null
                )}
                
                {payment._id ? (
                  <DeleteButton onClick={() => handleDelete(payment._id as string)}>Delete</DeleteButton>
                ) : null}
            </PaymentItem>
          ))}
        </PaymentList>
      </Container>
    );
  };

export default PaymentComponent;
