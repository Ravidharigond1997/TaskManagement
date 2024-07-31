import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../Api/server";
import "../css/Login.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // handle successful login (e.g., navigate to another page)
    },
    onError: (error) => {
      console.error("Login error:", error);
      // handle login error (e.g., show error message)
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login success:", response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login error:", error);
  };

  return (
    <Box className="formContainer">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submitButton"
          sx={{ width: "100%", mb: 2 }}
        >
          Login
        </Button>
        <GoogleLogin
          clientId="923h8232038290"
          buttonText="Google SignIn"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant="contained"
              className="GoogleButton"
              sx={{
                backgroundColor: "white",
                color: "orange !important",
                width: "100%",
                borderColor: "none",
                "&:hover": {
                  backgroundColor: "white !important",
                  borderColor: "none !important",
                },
              }}
            >
              <FaGoogle /> &nbsp; Google SignIn
            </Button>
          )}
        />

        <Typography>
          If you don't have an account,{" "}
          <Link to="/signup" underline="always">
            Register
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
