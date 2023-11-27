import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import orange from "../../assets/orange.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewUser({ ...newUser, [e.target.name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function addNewUser(e) {
    e.preventDefault();

    // Basic form validation
    if (
      !newUser.userName.trim() ||
      !newUser.email.trim() ||
      !newUser.password.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);

      let res = await axios.post(
        "http://localhost:8000/register-user",
        newUser
      );
      navigate("/user-login")
      alert(res.data.msg);
    } catch (error) {
      alert(error.response.data.msg)
      console.log("Error adding new user", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="loginFormContainer" >
      <div className="loginPhoto">
        <img src={orange} className="orange" />
      </div>
      <form onSubmit={addNewUser} className="newUserForm">
      <h2>Join the Home Hunt!</h2>
        <input
        placeholder="Username"
          type="text"
          value={newUser.userName}
          onChange={handleInputChange}
          name="userName"
        />
        
        <input
        placeholder="Email"
          type="text"
          value={newUser.email}
          onChange={handleInputChange}
          name="email"
        />
        
        <div className="passContainer">
          <input
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={newUser.password}
            onChange={handleInputChange}
            name="password"
          />
          <span onMouseDown={togglePasswordVisibility}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        
        
        <input
        placeholder="Phone number"
          type="text"
          value={newUser.phoneNumber}
          onChange={handleInputChange}
          name="phoneNumber"
        />

        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
