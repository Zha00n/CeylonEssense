// ** React Imports
import React, { useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import vik from "../assets/images/logo/ce.png";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub, PhoneCall } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/herb.png";
import illustrationsDark from "@src/assets/images/pages/herb.png";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { API_URL } from "../configs/constants";

const Login = () => {
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("username", username);

        window.location.href = "/home";
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="m-0 auth-inner">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={vik} className="viklogo" style={{ height:'80px', width:'80px' }}/>
          <h1 style={{ marginTop:'20px', color: '#1D9325', marginLeft:'20px', fontSize:'50px'}}>Ceylon Essence</h1>
        </Link>
        
        <Col className="p-5 d-none d-lg-flex align-items-center" lg="8" sm="12">
          <div className="px-5 w-100 d-lg-flex align-items-center justify-content-center">
            <img className="img-cover" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="px-2 d-flex align-items-center auth-bg p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="mx-auto px-xl-2" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="mb-1 fw-bold">
              Welcome to Admin Dashboard!
            </CardTitle>
            <CardText className="mb-2">
            Where passion for flavor meets precision in every detail.
            </CardText>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form className="mt-2 auth-login-form" onSubmit={handleLogin}>
              <div className="mb-1">
                <Label className="form-label" for="username">
                  Email
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="john@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-1 form-check">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button color="primary" block type="submit">
                Sign in
              </Button>
            </Form>

            <div className="my-2 divider"></div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook" onClick={() => window.open ('https://www.facebook.com/', '_blank')}>
                <Facebook size={14} />
              </Button>
              <Button onClick={() => window.location.href = 'tel:+9476111111'} color="google">
                <PhoneCall size={13} />
              </Button>
              <Button color="github" onClick={() => window.open ('mailto:info@gmail.com', '_blank')}>
                <Mail size={14} />
              </Button>
            </div>
            
          </Col>
          <div className="credit">Crafted with kindness by <a href="https://www.residuesolution.com/" target="_blank">Residue Solutions</a></div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
