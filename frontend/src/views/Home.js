import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";

import logo from "../assets/images/logo/hope.png"

const Home = () => {
  return (
    <div className="imageHope">
      <div className="overlayHope">
        
        <div className="textHope">
          <img src={logo} alt="logo" className="logoz"/>
          <h1 className="tcolor">HOPE</h1>
        </div>

        

      </div>
    </div>
    
  );
};

export default Home;
