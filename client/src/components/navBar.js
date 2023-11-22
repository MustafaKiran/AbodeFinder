import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  let isUser = false;
  let isAgency = false;
  let token;
  let decoded;

  try {
    token = localStorage.getItem("token");
    if (token) {
      decoded = jwtDecode(token);
    }
  } catch (err) {
    console.log(err);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/")
      window.location.reload()
    } else{
      return;
    }
      
    
  }

  if (decoded) {
    isUser = decoded && decoded.type === "user";
    console.log(isUser);
    isAgency = decoded && decoded.type === "agent";
    console.log(isAgency);
  }

  return (
    <>
      {(!token && (
        <div className="navbar">
          {currentPath === "/" && (
            <Link to="/user-register" className="link">
              Sign up
            </Link>
          )}
          {currentPath === "/" && (
            <Link to="/user-login" className="link">
              Log in
            </Link>
          )}
          {currentPath !== "/" && <Link to="/" className="link">
            Home
          </Link>}
          {currentPath !== "/agency-dashboard" && (
            <Link to="/agency-dashboard" className="link">
              Agency portal
            </Link>
          )}
          {currentPath === "/agency-dashboard" && (
            <Link to="/agent-login" className="link">
              Log in
            </Link>
          )}
          {currentPath === "/agency-dashboard" && (
            <Link to="/agent-register" className="link">
              Sign up
            </Link>
          )}
        </div>
      )) ||
        (token && isUser && (
          <div className="navbar">
            <Link className="link">{decoded.userName}</Link>
            <Link onClick={handleLogout} className="link">
              Log Out
            </Link>
            <Link to="/" className="link">
              Home
            </Link>
            
          </div>
        )) ||
        (token && isAgency && (
          <div>
            <Link to="/agency-dashboard" className="link">{decoded.companyName}</Link>
            <Link to="/new-property-form" className="link">
              Add a New Ad
            </Link>
            <Link onClick={handleLogout} className="link">
              Log Out
            </Link>
          </div>
          
          
        ))}
    </>
  );
}

export default NavBar;
