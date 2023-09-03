import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../store/auth-context";
import { Token } from "@mui/icons-material";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

function StripePayment() {

  const AuthCtx = React.useContext(AuthContext);
  const navigate = useNavigate();
  const publishableKey =
    "pk_test_51NLu4YFyTuYBetoDbtjHG83WMqWR82zOIKAHKWhCo1DoGOoHhLe1ymZc2jKk7u2i8QNJVCa4RWfJBr7q4xFFXNtM00me5ssvQM";
  const [product, setProduct] = useState({
    name: "Zenkoders Test",
    price: 10,
  });
  const priceForStripe = 1000;

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    }).then((result) => {
        navigate("/Home");
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:4000/create-checkout-session",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
          username: AuthCtx.currentUser.username,
        },
      });
      if (response.status === 200) {
        const responseData = response.data;
        const { userToken } = responseData;
        const user = await jwtDecode(userToken);
        // AuthCtx.stripePayment(userToken, user);
        navigate("/Home");
        window.location.reload();
        // handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };
  const logOutHandle = () => {
    AuthCtx.logout();
  }

  return (
    <div className="container">
      <h2>Zenkoders Test</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
      <button onClick={logOutHandle}>LogOut</button>
    </div>
  );
}

export default StripePayment;
