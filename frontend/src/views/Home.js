import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";

import logo from "../assets/images/logo/ce.png"
import vid from "../../public/about.mp4"

const Home = () => {
  return (
    <div className="imageEssence">
      <video src={vid} autoPlay ></video>
      <div className="overlayH">
      
        <div className="textH">
          
        <img style={{  height:'150px', width:'150px' }} src={logo} alt="ceylon essence" />
          <h1 className="tcolor">Ceylon Essence</h1>
        </div>

        

      </div>
    </div>
    
  );
};

export default Home;
