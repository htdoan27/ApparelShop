import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Languague = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const LogoutButton = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  padding: 8px 16px; /* Thêm padding để tăng kích thước của nút */
  border: 1px solid transparent; /* Bỏ viền */
  border-radius: 4px; /* Bo tròn góc */
  background-color: #f44336; /* Màu nền */
  color: white; /* Màu chữ */
  transition: background-color 0.3s, color 0.3s; /* Hiệu ứng chuyển đổi màu nền và màu chữ */

  &:hover {
    background-color: #d32f2f; /* Màu nền hover */
  }
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    // Xóa token từ local storage
    localStorage.removeItem("token");
    // Tiến hành đăng xuất trong Redux hoặc bất kỳ hành động nào khác cần thiết
    logout(dispatch);

    // Load lại trang sau khi đăng xuất
    window.location.reload();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Languague>EN</Languague>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><Logo>DOAN.</Logo></Link>
          
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>

          <div>
            {/* Kiểm tra xem user có tồn tại hay không */}
            {user ? (
              <LogoutButton onClick={handleClick}>LOG OUT</LogoutButton>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            )}
          </div>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
