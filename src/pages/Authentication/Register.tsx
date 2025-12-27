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
import { MdError } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { validateUsername } from "../../apis/user/userApi";
import { showError, showSuccess } from "../../utils/toast";

const Register = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const ppRef = useRef(null);
  const [preview, setPreview] = useState(null);

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
  const [profileImgError, setProfileImgError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderError, setGenderError] = useState("");

  // Handle login with Facebook (not implemented)
  const handleLoginWithFacebookClick = () => {};

  const handleVerifyUserName = (userName) => {
    if (!userName) {
      setUserNameError("User name cannot be empty");
      return;
    }

    const res = validateUsername(userName);

    if (res.success) {
      setUserNameError(res.message + "Please choose another one.");
      showError("User name is already taken");
    } else {
      setUserNameError("");
      showSuccess("User name is available");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview instant image
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setProfileImg(file);

    // Optional: upload to backend later
    // setFormData({ ...formData, profilePic: file });
  };

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

    // User img validation
    if (!profileImg) {
      setProfileImgError("Profile image is required");
      valid = false;
    } else {
      setProfileImgError("");
    }

    // User name validation
    if (!userName) {
      setUserNameError("User name is required");
      valid = false;
    } else {
      setUserNameError("");
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
    const phoneRegex = /^[0-9]{10}$/; // 10 digits for phone
    if (!phoneRegex.test(phone)) {
      setPhoneError("Phone number must be 10 digits");
      valid = false;
    } else {
      setPhoneError("");
    }

    // Gender validation
    if (!gender) {
      setGenderError("Gender is required");
      valid = false;
    } else {
      setGenderError("");
    }

    return valid;
  };

  // Handle register button click
  const handleRegisterClick = () => {
    if (validateInputs()) {
      // const data = {
      //   profileImg,
      //   email,
      //   userName,
      //   password,
      //   firstName,
      //   lastName,
      //   phone,
      //   gender,
      // };

      const data = new FormData();
      data.append("profileImg", profileImg);
      data.append("email", email);
      data.append("userName", userName);
      data.append("password", password);
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("phone", phone);
      data.append("gender", gender);

      dispatch(register(data));
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
        <div className=" flex gap-6  w-[80%]">
          <div className="flex justify-center mt-4 w-1/3">
            <div
              onClick={() => ppRef.current.click()}
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Avatar
                alt={userName}
                src={preview || "/static/images/avatar/1.jpg"}
                sx={{ width: 75, height: 75 }}
              />
              {profileImgError && (
                <div className=" flex items-center gap-1 text-red-500 text-sm mt-1">
                  <MdError /> {profileImgError}
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={ppRef}
              onChange={handleProfilePicChange}
            />
          </div>
          <div className=" flex flex-col justify-center items-center gap-4 w-2/3">
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
        </div>

        <TextField
          id="mobile-or-email"
          label="Email"
          variant="outlined"
          size="small"
          sx={{ width: "80%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <div className=" w-[80%] flex justify-center gap-4  items-center">
          <TextField
            id="userName"
            label="User Name"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!!userNameError}
            helperText={userNameError}
          />

          <button
            type="button"
            onClick={() => handleVerifyUserName(userName)}
            className="cursor-pointer hover:scale-110"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <SiTicktick color="blue" />
          </button>
        </div>
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          size="small"
          sx={{ width: "80%" }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!phoneError}
          helperText={phoneError}
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
