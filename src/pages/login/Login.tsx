import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
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
  width: 30%;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9); /* Add some transparency */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  text-align: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: teal;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: teal;
    box-shadow: 0 0 8px rgba(0, 128, 128, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;

  &:hover {
    background-color: #006d6d; /* Darker teal on hover */
  }

  &:disabled {
    background-color: lightgray;
    color: gray;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(RouterLink)`
  margin: 10px 0;
  font-size: 14px;
  text-decoration: none;
  color: teal;
  transition: color 0.3s;

  &:hover {
    color: #004d40; /* Darker teal on hover */
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state: RootState) => state.user);

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(dispatch, { username, password });
    
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
          <StyledLink to="/register">Create a New Account</StyledLink>
          <StyledLink to="/">Continue Browsing</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
