import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css"

function UserLogin() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/login-user", { userName, password });
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                
                navigate("/");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert("Invalid username or password. Please check your credentials.");
            } else {
                alert("Log in failed. Please try again later.");
            }
        }
    }

    return (
        <div className="loginFormContainer" >
            <form onSubmit={handleLogin}  className="loginForm">
                <h2>Log in</h2><br />
                {/* <label>Username:</label> */}
                <input placeholder="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br />
                {/* <label>Password:</label> */}
                <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button type="submit">Log in</button>
                
            </form>
        </div>
    );
}

export default UserLogin;
