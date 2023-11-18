import { Link, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();


    return ( 
        <div>
            <Link to="/" className="link">Home</Link>
            <Link to="/new-property-form" className="link">Add a New Ad</Link>
        </div>

     );
}

export default NavBar;