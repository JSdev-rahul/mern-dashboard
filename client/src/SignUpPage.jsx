// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// export const SignUpPage=()=> {
//   const navigate = useNavigate();
//   const auth = localStorage.getItem("user");
//   useEffect(()=>{
//     if(auth){
//       navigate('/')
//     }
//   },[])
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = () => {
//     axios.post(`/signUp`, { data: userInfo }).then((res) => {
//       navigate("/");

//       localStorage.setItem("user", JSON.stringify(res.data));
//       localStorage.setItem("token", JSON.stringify(res.data.access_token));
//     });
//   };
//   return (
//     <>
//       <div>
//         <h1>Register page</h1>
//         <input
//           value={userInfo.name}
//           type="text"
//           placeholder="name"
//           onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
//         ></input>
//         <input
//           value={userInfo.email}
//           type="email"
//           placeholder="email"
//           onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
//         ></input>
//         <input
//           value={userInfo.password}
//           type="password"
//           placeholder="password"
//           onChange={(e) =>
//             setUserInfo({ ...userInfo, password: e.target.value })
//           }
//         ></input>
//         <button onClick={() => handleSubmit()}>signup</button>
//       </div>
//     </>
//   );
// }

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export const SignUpPage = () => {
  const navigate=useNavigate()
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    console.log("userInfo", userInfo);
    axios.post(`/signUp`, { data: userInfo }).then((res) => {
      navigate("/");

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.access_token));
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  value={userInfo?.fname}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, fname: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={userInfo?.lname}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lname: e.target.value })
                  }
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={userInfo?.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={userInfo?.password}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
