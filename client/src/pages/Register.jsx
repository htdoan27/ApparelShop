import styled from "styled-components";
import { publicRequest } from "../requestMedhods";
import { useState, useEffect   } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  useEffect(() => {
    // Cập nhật fullName khi inputs thay đổi
    if (inputs.name && inputs.lastName) {
      setFullName(inputs.name + " " + inputs.lastName);
    }
  }, [inputs]);

  const handleClick = async (e) => {
    e.preventDefault();
    const user = { ...inputs, name: fullName };
    try {
      // Assume addUser returns a Promise
      await publicRequest.post("/auth/register", user);
      setUpdateMessage("Update successful");
      navigate("/login");
    } catch (error) {
      setUpdateMessage("Register failed. Please try again.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            name="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
          />
          <Input
            name="lastName"
            type="text"
            placeholder="last name"
            onChange={handleChange}
          />
          <Input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Input type="password" placeholder="confirm password" />
          {updateMessage && (
            <p style={{ padding: "10px" }} className="updateMessage">
              {updateMessage}
            </p>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
