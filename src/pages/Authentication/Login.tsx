import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { login, register } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import {
  getPostsByUserId,
  getReelsByUserId,
  getUserDetailsByToken,
} from "../../slices/userSlice";
import { getAllPosts } from "../../slices/postSlice";
import { getAllReels } from "../../slices/reelSlice";
import { getAllStoryForUser } from "../../slices/storySlice";

const Login = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Validate email and password
  const validateInputs = () => {
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLoginClick = (e: SubmitEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log("Logging in with", { email, password });

      const data = {
        email,
        password,
      };
      // Add API call here for authentication
      dispatch(login(data)).then((data) => {
        console.log(data);
        if (data.payload.status === 201) {
          navigate("/");
          dispatch(getUserDetailsByToken(data.payload.data.token)).then(
            (data2) => {
              console.log(data2);
              dispatch(getPostsByUserId(data2.payload.data.id));
              dispatch(getReelsByUserId(data2.payload.data.id));
              dispatch(getAllPosts());
              dispatch(getAllReels());
              dispatch(getAllStoryForUser());
            }
          );
        }
      });
    }
  };

  const handleLoginWithFacebookClick = () => {
    console.log("Logging in with Facebook");
    // Integrate Facebook login API here
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        size="medium"
        sx={{ width: "80%" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      <FormControl
        sx={{ m: 1, width: "80%" }}
        variant="outlined"
        error={!!passwordError}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText>{passwordError}</FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        sx={{ width: "80%" }}
        onClick={handleLoginClick}
      >
        Log in
      </Button>

      <p className=" py-5">OR</p>

      <p
        onClick={handleLoginWithFacebookClick}
        className=" flex justify-center items-center gap-2 text-red-600 hover:text-red-400  hover:cursor-pointer  font-semibold"
      >
        {/* <FacebookIcon color="primary" />
        Log in with Facebook */}
        <GoogleIcon color="error"/>
        Sign in with Google
      </p>
      <p className=" py-5   hover:cursor-pointer  font-semibold">
        Forgot password?
      </p>
    </div>
  );
};

export default Login;
