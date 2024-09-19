import styled from "styled-components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";
import { RootState } from "../../redux/store";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("../../../public/pics/background2.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: teal;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Input = styled.input`
  flex: 1;
  min-width: 45%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    border-color: teal;
    box-shadow: 0 0 6px rgba(0, 128, 128, 0.5);
  }
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0;
  color: gray;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    background-color: #006d6d;
  }
`;

const LinkWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: teal;
`;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: teal;
  transition: color 0.3s;

  &:hover {
    color: #004d40;
  }
`;

const Error = styled.div`
  color: red;
  margin: 10px 0;
`;

const Register: React.FC = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setPasswordMismatch(false);
  };

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (inputs.password !== inputs.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    // Prepare user data
    const user = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      phone:inputs.phone,
    };

    // Register user
    register(dispatch, user);
    if (!error) {
      navigate("/login"); // Redirect to login page after successful registration
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input name="firstName" placeholder="First Name" onChange={handleChange} />
          <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <Input name="username" placeholder="Username" onChange={handleChange} />
          <Input name="email" placeholder="Email" onChange={handleChange} />
          <Input name="phone" placeholder="Phone no." onChange={handleChange} />
          <Input name="password" placeholder="Password" type="password" onChange={handleChange} />
          <Input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the{" "}
            <b>Privacy Policy</b>.
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            CREATE
          </Button>
        </Form>
        {passwordMismatch && <Error>Passwords do not match.</Error>}
        {error && <Error>Something went wrong. Please try again.</Error>}
        <LinkWrapper>
          <StyledLink to="/">Continue Browsing</StyledLink>
          <StyledLink to="/login">Already have an account? Sign In</StyledLink>
        </LinkWrapper>
      </Wrapper>
    </Container>
  );
};

export default Register;
