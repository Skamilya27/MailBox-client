import { useRef } from "react";
import {useDispatch} from 'react-redux';
import { Button, Container, Form } from "react-bootstrap";
import classes from "./Login.module.css";
import { uiActions } from "../store/ui-slice";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth-slice";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // const history = useHistory();

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBzqLRbWoUs7hfh1riQJFqBOAmSmJwkKM",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        console.log(response)
        throw new Error();
      }

      const data = await response.json();
      console.log(data)

      dispatch(authActions.login(data));

      dispatch(uiActions.showNotification({
        status: 'ok',
        message: 'Logged in succefully'
      }));

      setTimeout(() => {
        dispatch(uiActions.setIsLoading());
      }, 2000)

    } catch (error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            message: 'Something went wrong'
          }));

          setTimeout(() => {
            dispatch(uiActions.setIsLoading());
          }, 2000)
    }

    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };

  return (
    <Container>
      <Form className={classes.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitHandler}
          className={classes.submit}
        >
          Login
        </Button>
        <br/>

        <div
          className="mt-2"
          style={{ textAlign: "center", marginLeft: "-20px" }}
        >
        <Link to='/forgot-password'>Forgot password?</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
