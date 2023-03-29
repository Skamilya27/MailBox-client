import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import "./MyNavbar.css";
const MyNavbar = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

//   const toggleHandler = () => {
//     dispatch(modeActions.toggleMode());
//   };

  return (
    <Navbar bg='dark' expand="lg">
      <Container>
        <Navbar.Brand
          href="#home"
          className="text-white"
        >
          MailBox-Client
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link text-white" to="/profile"
            >
              MyProfile
            </NavLink>
            <NavLink className="nav-link text-white" to="/myEmail"
            >
              My Emails
            </NavLink>
          </Nav>
          
            {!isLoggedIn && <NavLink className="nav-link text-white" to="/login">
              Login
            </NavLink>}
         
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;