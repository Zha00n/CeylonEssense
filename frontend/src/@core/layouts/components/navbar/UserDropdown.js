// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { LogOut, LogIn } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/defaultadmin.svg";

// ** Axios Import
import axios from "axios";
import { API_URL } from "../../../../configs/constants";
import { alertTypes } from "../../../../utility/alertUtils";

const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alertTypes.warning("No token found.");
      return;
    }

    await axios.post(
      `${API_URL}/api/admin/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    // alertTypes.success("Logged out successfully!");
    window.location.href = "/login";
    
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    alertTypes.error("Logout failed. Please try again.");
  }
};

const UserDropdown = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">Hello</span>
          <span className="user-status">{username || "Guest"}</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        {username ? (
          <DropdownItem onClick={logout}>
            <LogOut size={14} className="me-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        ) : (
          <DropdownItem tag={Link} to="/login">
            <LogIn size={14} className="me-75" />
            <span className="align-middle">Login</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
