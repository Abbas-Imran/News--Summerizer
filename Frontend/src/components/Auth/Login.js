import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import jwtDecode from "jwt-decode";
import "./Login.css";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState(false);

  const onSubmitHandler = async (event) => {
    if (!policy) {
      notify();
      return false;
    }
    event.preventDefault();

    const getObj = () => {
      return {
        username: userName,
        password: password,
      };
    };

    console.log(getObj());

    const getToken = async () => {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getObj()),
      });
      return res.json();
    };

    const { token, msg } = await getToken();

    if (msg) {
      setError(msg);
      console.log("msg", msg);
      notify("error");
    }

    if (token !== undefined && token) {
      const user = await jwtDecode(token);
      console.log(error);
      AuthCtx.login(token,user);
      AuthCtx.getUser(user);
      notify("success");
      console.log("approved", user.approved);
      user.approved ? navigate("/Home") : navigate("/payment");
    }
  };
  const registerNavigation = () => {
    navigate("/Signup");
  };

  const notify = (status) => {
    if(status === "error") {
    toast.error('Invalid Email or Password!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });} else {
      toast.error('Please agree policy to continue', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  
  }

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePolicy = (e) => {
    setPolicy(e.target.checked);
  };

  return (
    <>
    <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <Stack
      sx={{
        height: "100vh",
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
     
      <Grid
        container
        className="boxShadow"
        sx={{
          height: "80vh",
          width: "80vw",
          backgroundColor: "white",
          borderRadius: "2rem",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              marginY: "2rem",
              fontWeight: "700",
              fontSize: { md: "2rem", xs: "1.2rem" },
              color: "#101727",
            }}
          >
            SIGN IN
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              marginY: "1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AccountCircle sx={{ mr: 1, my: 0.5, color: "#101727" }} />
            <TextField
              sx={{ color: "#101727", width: "55%" }}
              variant="standard"
              placeholder="Username"
              onChange={onChangeUserName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              marginY: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <AccountCircle sx={{ mr: 1, my: 0.5, color: "#101727" }} />
            <TextField
              variant="standard"
              placeholder="Password"
              type="password"
              onChange={onChangePassword}
              sx={{ width: "55%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <Checkbox sx={{ padding: "0px" }} required  onChange={onChangePolicy}/>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.2rem",
                color: "#101727",
              }}
            >
              I Agree Term & Policy
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={onSubmitHandler}
            // className="gradient"
            sx={{
              marginY: "1rem",
              width: "45%",
              borderRadius: "1.5rem",
              backgroundColor: "#101727",
              fontWeight: "700",
            }}
          >
            LOG IN
          </Button>
        </Grid>
        <Grid
          item
          md={6}
          // className="gradient"
          sx={{
            width: "100%",
            height: {sx:"50%", md:"100%"},
            backgroundColor: "#101727",
            borderRadius: "2rem",

            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: { md: "100%", xs: "auto" },
            }}
          >
            <Typography
              sx={{ fontWeight: "600", color: "white", textAlign: "center",  fontSize: {
                sx: "1rem",
                md: "3rem"
              }}}
            >
              CREATE YOUR ACCOUNT
            </Typography>
            <Typography sx={{ fontWeight: "600", color: "white" }}>
              Didnt Have An Account ?
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginY: "0.5rem",
                width: { lg: "40%", md: "50%", xs: "50%" },
                borderRadius: "2.4rem",
                backgroundColor: "#101727",
                fontWeight: "700",
                color: "white",
                borderColor: "white",
              }}
              onClick={registerNavigation}
            >
              REGISTER HERE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Stack>
    </>
  );
};

export default Login;
