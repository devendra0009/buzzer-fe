import React, { useRef, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Avatar,
} from "@mui/material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/authSlice";
import AddIcon from "@mui/icons-material/Add";
import CustomImageComp from "../../components/reusableComp/CustomImageComp";
import { useNavigate } from "react-router-dom";
import {
  getPostsByUserId,
  getReelsByUserId,
  getUserDetailsByToken,
} from "../../slices/userSlice";
import { getAllPosts } from "../../slices/postSlice";
import { getAllReels } from "../../slices/reelSlice";
import { getAllStoryForUser } from "../../slices/storySlice";

const Register = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  // Form state variables
  const [profileImg, setProfileImg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("MALE");
  const [userName, setUserName] = useState("");

  // Error state variables
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [profileImgError, setProfileImgError] = useState("");

  // Handle login with Facebook (not implemented)
  const handleLoginWithFacebookClick = () => {};

  // Validate form inputs
  const validateInputs = () => {
    let valid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    // First name validation
    if (!firstName) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Last name validation
    if (!lastName) {
      setLastNameError("Last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    // Phone validation (basic validation)
    // const phoneRegex = /^[0-9]{10}$/; // 10 digits for phone
    // if (!phoneRegex.test(phone)) {
    //   setPhoneError("Phone number must be 10 digits");
    //   valid = false;
    // } else {
    //   setPhoneError("");
    // }

    // Gender validation
    if (!gender) {
      setGenderError("Gender is required");
      valid = false;
    } else {
      setGenderError("");
    }

    if (!profileImg) {
      setProfileImgError("Profile image is required");
      valid = false;
    } else {
      setProfileImgError("");
    }
    return valid;
  };

  // Handle register button click
  const handleRegisterClick = () => {
    // debugger
    if (validateInputs()) {
      const data = new FormData();
      if (profileImg) data.append("profileImg", profileImg);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        data.append("email", email); // Store as email
      } else {
        data.append("phone", email); // Store as phone if not an email
      }

      data.append("userName", userName);
      data.append("password", password);
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("gender", gender);

      dispatch(register(data)).then((data) => {
        console.log(data);
        if (data.payload.status === 201 || data.payload.status === 200) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="">
      <p>Sign up to see photos and videos from your friends.</p>
      <Button
        variant="contained"
        sx={{ width: "80%", margin: "1.5rem 0" }}
        onClick={handleLoginWithFacebookClick}
        className="flex justify-center items-center gap-2 hover:cursor-pointer font-semibold"
      >
        <FacebookIcon />
        Log in with Facebook
      </Button>
      <p>OR</p>
      <div className="texts flex flex-col gap-4 justify-center items-center my-6">
        <div className="flex w-[80%] justify-between">
          <div className="flex flex-col gap-4 ">
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!lastNameError}
              helperText={lastNameError}
            />
          </div>
          <div className=" flex justify-center items-center w-1/3 relative">
            <Avatar
              alt={userName}
              src={
                profileImg !== null
                  ? URL.createObjectURL(profileImg)
                  : "/static/images/avatar/1.jpg"
              }
              sx={{ width: 75, height: 75 }}
              className=" cursor-pointer border-2 border-green-500"
              onClick={() => {
                imageRef.current?.click();
              }}
            />
            <AddIcon
              className="absolute bottom-2 right-6 font-bold bg-white rounded-full"
              fontSize="small"
            />
            <input
              type="file"
              className=" hidden"
              ref={imageRef}
              accept="image/*"
              onChange={(event) => {
                const file = event?.target?.files[0];
                if (file) {
                  console.log("Selected file:", file);
                  setProfileImg(file);
                }
              }}
            />
          </div>
        </div>
        <TextField
          id="mobile-or-email"
          label="Mobile Number or Email"
          variant="outlined"
          size="small"
          sx={{ width: "80%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          id="userName"
          label="User Name"
          variant="outlined"
          size="small"
          sx={{ width: "80%" }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          // error={!!userNameError}
          // helperText={userNameError}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size="small"
          sx={{ width: "80%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
        <FormControl error={!!genderError} sx={{ width: "80%" }}>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="MALE" control={<Radio />} label="Male" />
            <FormControlLabel
              value="FEMALE"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          {genderError && <FormHelperText>{genderError}</FormHelperText>}
        </FormControl>
      </div>
      <div className="terms-and-conditions max-w-[80%] mx-auto text-[12px]">
        <p>
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <span className="hover:cursor-pointer hover:text-blue-500 text-blue-400">
            Learn More
          </span>
        </p>
        <p>
          By signing up, you agree to our{" "}
          <span className="hover:cursor-pointer hover:text-blue-500 text-blue-400">
            Terms
          </span>
          ,{" "}
          <span className="hover:cursor-pointer hover:text-blue-500 text-blue-400">
            Privacy Policy
          </span>
          , and{" "}
          <span className="hover:cursor-pointer hover:text-blue-500 text-blue-400">
            Cookies Policy
          </span>
          .
        </p>
      </div>
      <Button
        variant="contained"
        sx={{ width: "80%", margin: "1.5rem 0" }}
        onClick={handleRegisterClick}
      >
        Sign up
      </Button>
    </div>
  );
};

export default Register;
