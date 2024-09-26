import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddresses, deleteAddress, updateAddress } from "../redux/apiCalls";
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

const AddressList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AddressItem = styled.li`
  background-color: white;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AddressComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses } = useSelector((state: RootState) => state.address);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [editMode, setEditMode] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editedAddress, setEditedAddress] = useState<any>({});

  useEffect(() => {
    if (currentUser && currentUser._id) {
      getAddresses(dispatch, currentUser._id);
    }
  }, [dispatch, currentUser]);

  const handleDelete = (addressId: string) => {
    if (currentUser && currentUser._id) {
      deleteAddress(dispatch, currentUser._id, addressId);
    }
  };

  const handleUpdateAddress = (addressId: string) => {
    setEditMode(addressId); // Enable edit mode for this address
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addressToEdit = addresses.find((address: any) => address._id === addressId);
    setEditedAddress(addressToEdit); // Set the editable data in state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setEditedAddress((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = (addressId: string) => {
    if (currentUser && currentUser._id) {
      const { street, city, state, postalCode, country } = editedAddress;

      const updatedAddress = { street, city, state, postalCode, country };

      updateAddress(dispatch, currentUser._id, addressId, updatedAddress);
      setEditMode(null); // Exit edit mode after saving
    }
  };

  return (
    <Container>
      <Title>My Addresses</Title>
      <Button onClick={() => navigate("/addaddress")}>Add New Address</Button>
      <AddressList>
        {addresses.map((address) => (
          <AddressItem key={address._id}>
            <Label>Street</Label>
            <Input
              type="text"
              name="street"
              value={editMode === address._id ? editedAddress.street : address.street}
              disabled={editMode !== address._id}
              onChange={handleInputChange}
            />

            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={editMode === address._id ? editedAddress.city : address.city}
              disabled={editMode !== address._id}
              onChange={handleInputChange}
            />

            <Label>State</Label>
            <Input
              type="text"
              name="state"
              value={editMode === address._id ? editedAddress.state : address.state}
              disabled={editMode !== address._id}
              onChange={handleInputChange}
            />

            <Label>Postal Code</Label>
            <Input
              type="text"
              name="postalCode"
              value={editMode === address._id ? editedAddress.postalCode : address.postalCode}
              disabled={editMode !== address._id}
              onChange={handleInputChange}
            />

            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={editMode === address._id ? editedAddress.country : address.country}
              disabled={editMode !== address._id}
              onChange={handleInputChange}
            />

            {editMode === address._id ? (
              <Button onClick={() => handleSaveChanges(address._id)}>Save Changes</Button>
            ) : (
              <Button onClick={() => handleUpdateAddress(address._id)}>Update</Button>
            )}

            <DeleteButton onClick={() => handleDelete(address._id)}>Delete</DeleteButton>
          </AddressItem>
        ))}
      </AddressList>
    </Container>
  );
};

export default AddressComponent;
