import { Link} from "react-router-dom";
import "./intro.css"
import network from "../assets/network.webp"
import simple from "../assets/simple.png"
import analytics from "../assets/analytics.png"
import demand from "../assets/demand.png"




function Intro() {
    return (  
        <div  className="introContainer">
          <h1>Maximize Your Property Exposure!</h1>
          <h2>Join our platform and showcase your properties to a vast audience. Increase your chances of finding the perfect tenants quickly.</h2>
          <div className="linkDiv">
          <Link to="/agent-register" className="link">
              Sign up
            </Link>
          <h3>  Now and Start Posting Your Property Ads!</h3>
            </div>  
          
          <div className="info-graphics" >
            <img src={network} />
          <h4>Reach a Wide Audience: Gain exposure to potential tenants across our extensive network.</h4>
          </div>
          <div className="info-graphics">
          <h4>Quick and Easy Posting: Effortlessly upload and manage your property listings.</h4>
          <img src={simple} />
          </div>
          <div className="info-graphics">
          <img src={demand} />
          <h4>Fast Rentals: Our platform is designed to connect you with tenants efficiently.</h4>
          </div>
          <div className="info-graphics">
          <h4>Detailed Analytics: Track the performance of your listings and optimize for better results.</h4>
          <img src={analytics} />
          </div>
          <div className="infoContact">
          <h4>Have questions? Contact our support team at support@abodefinder.com or call us at 0800000.</h4>
          </div>
          

          
        </div>
    );
}

export default Intro;