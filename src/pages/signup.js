import {
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/shared/Seo";
import { useSignUpPageStyles } from "../styles";
import { LoginWithFacebook } from "./login";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { UserContext } from "../App";
import signUp from "../components/authentication/signUp";
import { useHistory } from "react-router-dom"


function SignUpPage() {
  const { state, dispatch } = React.useContext(UserContext);
  const history = useHistory()
  const classes = useSignUpPageStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword)
  }

  const handleUserSignUp = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp({ username, password, email, phone_number: phoneNumber });
      console.log('user', user);
      dispatch({
        type: "SIGN_UP",
        payload: {
          user: user
        }
      });
      history.push({
        pathname: '/',
      })
    } catch (e) {
      console.error(e);
    }


  }

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook color="primary" iconColor="white" variant="contained" />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                fullWidth
                variant="filled"
                label="phoneNumber"
                margin="dense"
                className={classes.textField}
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <TextField
                fullWidth
                variant="filled"
                label="username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                fullWidth
                variant="filled"
                label="password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
                onClick={handleUserSignUp}
              >
                Sign Up
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>

            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgor Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log In
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export default SignUpPage;
