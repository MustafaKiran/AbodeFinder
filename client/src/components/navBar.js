import { Link, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();


    return ( 
        <div>
            <Link to="/" className="link">Home</Link>
        </div>

     );
}

export default NavBar;