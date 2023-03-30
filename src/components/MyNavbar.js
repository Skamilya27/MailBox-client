import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import "./MyNavbar.css";
const MyNavbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const unReadCount = useSelector(state => state.emailStore.unReadCount);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  //   const toggleHandler = () => {
  //     dispatch(modeActions.toggleMode());
  //   };

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="text-white">
          MailBox-Client
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <NavLink className="nav-link text-white" to="/profile">
                  MyProfile
                </NavLink>
                <NavLink className="nav-link text-white" to="/compose-email">
                  Compose Email
                </NavLink>
                <NavLink className="nav-link text-white" to="/sent-email">
                  Sent Emails
                </NavLink>
                <NavLink className="nav-link text-white" to="/inbox-email">
                  Inbox
                  <h7 style={{color: 'green'}}>{unReadCount}</h7>
                </NavLink>
              </>
            )}
          </Nav>

          {!isLoggedIn && (
            <NavLink className="nav-link text-white" to="/login">
              Login
            </NavLink>
          )}

          {isLoggedIn && (
            <>
              <NavLink
                className="nav-link text-white"
                to="/login"
                style={{ marginLeft: "20px" }}
              >
                <Button variant="light" onClick={logoutHandler}>
                  Logout
                </Button>
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
