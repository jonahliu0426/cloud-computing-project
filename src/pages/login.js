import {
  Button,
  Card,
  CardHeader,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/shared/Seo";
import { useLoginPageStyles } from "../styles";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";
import signIn from "../components/authentication/signIn";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";


const LoginPage = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const classes = useLoginPageStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const history = useHistory();

  const handleClickShowPassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleUserSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(username, password);
      console.log('user', user.username);
      dispatch({
        type: "SIGN_IN",
        payload: {
          user: user,
        }
      });
      history.push({
        pathname: `/`,
      })
    } catch (e) {
      console.error(e)
    }

  }

  // const handleMouseDownPassword = () => setShowPassword(!showPassword)

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <TextField
                fullWidth
                variant="filled"
                label="password"
                type={showPassword ? "text" : "password"}
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        fullWidth
                        fullHeight
                        className={classes.adornedEndButton}
                        onClick={handleClickShowPassword}
                        type="submit"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>

                    </InputAdornment>
                  ),
                  classes: {
                    adornedEnd: classes.adornedEnd
                  }
                }}
              />
              <Button
                style={{ backgroundColor: "#764bbb" }}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
                onClick={handleUserSignIn}
              >
                Log In
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
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgor Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button style={{ color: "#764bbb" }} className={classes.button}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export const LoginWithFacebook = ({ color, iconColor, variant }) => {
  const classes = useLoginPageStyles();
  const facebookIcon = iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;

  return (
    <Button fullWidth color={color} variant={variant}>
      <img
        src={facebookIcon}
        alt="facebook icon"
        className={classes.facebookIcon}
      />
      Log In With Facebook
    </Button>
  )
}

export default LoginPage;

