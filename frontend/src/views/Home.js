import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";

import logo from "../assets/images/logo/ce.png"

const Home = () => {
  return (
    <div className="imageEssence">
      <video src="/././src/assets/videos/about.mp4" autoPlay ></video>
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
