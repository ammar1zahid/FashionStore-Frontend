import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../redux/store"; // Import your store types
import { updateUser as updateUserApi } from "../redux/apiCalls"; // Import the update user API call
import { updateUserSuccess } from "../redux/userRedux"; // Import the updateUser reducer

const UpdateUser: React.FC = () => {
  const dispatch = useDispatch();

  // Fetch the current user from Redux state
  const { currentUser } = useSelector((state: RootState) => state.user);

  // Form state for user inputs
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Populate form fields with user data when component loads
  useEffect(() => {
    if (currentUser) {
      setFormData({
        email: currentUser.email || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update user info
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser._id) {
      try {
        // Dispatch API call to update user
        await updateUserApi(dispatch, currentUser._id, formData);
        // Dispatch success action
        dispatch(updateUserSuccess(formData));
        alert("User info updated successfully!");
      } catch (err) {
        console.error("Error updating user:", err);
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>Update User Information</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>Email</FormLabel>
          <StyledInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel>First Name</FormLabel>
          <StyledInput
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel>Last Name</FormLabel>
          <StyledInput
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel>Phone</FormLabel>
          <StyledInput
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormField>
        <SubmitButton type="submit">Update</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default UpdateUser;

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
