import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./SignUp.module.css";
import { uiActions } from "../store/ui-slice";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2 = confirmpasswordInputRef.current.value;

    try {
      if (!enteredEmail || !enteredPassword || !enteredPassword2) {
        return dispatch(
          uiActions.showNotification({
            status: "error",
            message: "Please fill in all fields",
          })
        );
      }

      if (enteredPassword !== enteredPassword2) {
        return dispatch(
          uiActions.showNotification({
            status: "error",
            message: "Passwords do not match",
          })
        );
      }

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBzqLRbWoUs7hfh1riQJFqBOAmSmJwkKM",
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
        throw new Error(response.error);
      }

      const data = await response.json();
      console.log(data);

      dispatch(
        uiActions.showNotification({
          status: "ok",
          message: "SignedUp succefully",
        })
      );
    } catch (error) {
      console.log(error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Something went wrong. Please try  again later",
        })
      );
    }

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmpasswordInputRef.current.value = "";
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

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={confirmpasswordInputRef}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitHandler}
          className={classes.submit}
        >
          Create Account
        </Button>
        <br />
        <div
          className="mt-2"
          style={{ textAlign: "center", marginLeft: "35px" }}
        >
          <Link to="/login">Sign in here</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
