import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMedhods";
import { useNavigate } from 'react-router-dom';
import { reset } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();


  const data = location.state?.stripeData;
  const cart = location.state?.products;
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(
        reset({})
    );
    navigate("/");
  };
 


  console.log("data: "+ data)
  console.log("cart: " + cart)

  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [orderId, setOrderId] = useState(null);

  // console.log("product: "+cart.products.quantity)

  useEffect(() => {
    const createOrder = async () => {
      try {
        // if (data) {
          const res = await userRequest.post("/orders", {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data.billing_details?.address, // Kiểm tra và truy cập thuộc tính an toàn
            status: "completed"
            // address: "Ninh Kieu"
          });
          setOrderId(res.data._id);
        // }
      } catch {}
    };
    createOrder();
  }, [cart, data, currentUser]);

  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await userRequest.post("/orders", {
  //         userId: currentUser._id,
  //         products: cart.products.map((item) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: data.billing_details.address,
  //       });
  //       setOrderId(res.data._id);
  //     } catch {}
  //   };
  //   data && createOrder();
  // }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={handleClick} >Go to Homepage</button>
    </div>
  );
};

export default Success;