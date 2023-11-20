import { useState } from "react";
import axios from "axios";

function UserRegister() {
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

  async function addNewUser(e) {
    e.preventDefault();
    
    // Basic form validation
    if (!newUser.userName.trim() || !newUser.email.trim() || !newUser.password.trim()) {
        alert("Please fill in all required fields.");
        return;
      }

    try {
      setIsLoading(true);

      let res = await axios.post("http://localhost:8000/register-user", newUser);
      alert(res.data.msg);
    } catch (error) {
      console.log("Error adding new user", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={addNewUser} className="newUserForm">
        <label>Username:</label>
        <input
          type="text"
          value={newUser.userName}
          onChange={handleInputChange}
          name="userName"
        />
        <label>Email:</label>
        <input
          type="text"
          value={newUser.email}
          onChange={handleInputChange}
          name="email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={newUser.password}
          onChange={handleInputChange}
          name="password"
        />
        <label>Phone number:</label>
        <input
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

