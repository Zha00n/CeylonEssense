import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import axios from "axios";
import { alertTypes } from "../../utility/alertUtils";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../configs/constants";
import Select from "react-select";

import "@styles/react/libs/flatpickr/flatpickr.scss";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { selectThemeColors } from "@utils";

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const response = await axios.post(`${API_URL}/token`, {
      refreshToken,
    });

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return true;
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    return false;
  }
  return false;
};

const AddNewProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: [],
    category: "",
    description: "",
    sellerName: "",
    sellerCall: "",
    sellerWa: "",
    certiImages: [],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false); //spinner
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "certiImages") {
      setFormData({
        ...formData,
        certiImages: [...files],
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  // submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.image);
    Array.from(formData.certiImages).forEach((file) => {
      data.append(`certiImages`, file);
    });
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("sellerName", formData.sellerName);
    data.append("sellerCall", formData.sellerCall);
    data.append("sellerWa", formData.sellerWa);

    try {
      let token = localStorage.getItem("accessToken");

      const response = await axios.post(`${API_URL}/p/add-product`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Past-product added successfully!");
        setErrorMessage("");
        alertTypes.success("Past-product added successfully!");

        navigate("/past-projects");
      }
    } catch (error) {
      setOpen(false);

      console.error(error);

      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem("accessToken");

          try {
            const retryResponse = await axios.post(
              `${API_URL}/p/add-product`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (retryResponse.status === 200) {
              alertTypes.success("Poject added successfully!");
            }
          } catch (retryError) {
            console.error(retryError);
            alertTypes.error("Failed to add product!");
          }
        } else {
          alertTypes.info("Access Denied !", "Please log in again.");
        }
      } else {
        alertTypes.warning("Warning!", "Fields can not be empty!");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add New Product</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="title">
                Product Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="add name.."
                value={formData.title}
                onChange={handleChange}
              />
            </Col>

            <Col md="6" className="mb-2">
              <Label className="form-label" for="blog-edit-category">
                Category
              </Label>
              <Select
                id="blog-edit-category"
                isClearable={false}
                theme={selectThemeColors}
                name="category"
                options={[
                  { value: "Spice", label: "Spice" },
                  { value: "Herb", label: "Herb" },
                  { value: "Handcraft", label: "Handcraft" },
                  { value: "Food", label: "Food & Beverage" },
                ]}
                className="react-select"
                classNamePrefix="select"
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    category: selectedOption ? selectedOption.value : "", // Store only the selected category value
                  })
                }
              />
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="image">
                Product Image
              </Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
              />
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="certiImages">
                Certifications Images
              </Label>
              <Input
                type="file"
                name="certiImages"
                id="certiImages"
                multiple
                onChange={handleFileChange}
              />
            </Col>

            <Col sm="12" className="mb-1">
              <Label className="form-label" for="description">
                Description
              </Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="add description.."
                value={formData.description}
                onChange={handleChange}
                style={{ minHeight: "100px" }}
              />
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="sellerName">
                Seller Name
              </Label>
              <Input
                type="text"
                name="sellerName"
                id="sellerName"
                placeholder="add name.."
                value={formData.sellerName}
                onChange={handleChange}
              />
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="sellerCall">
                Contact Number
              </Label>
              <Input
                type="text"
                name="sellerCall"
                id="sellerCall"
                placeholder="add name.."
                value={formData.sellerCall}
                onChange={handleChange}
              />
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="sellerWa">
                Whatsapp
              </Label>
              <Input
                type="text"
                name="sellerWa"
                id="sellerWa"
                placeholder="add name.."
                value={formData.sellerWa}
                onChange={handleChange}
              />
            </Col>

            <Col sm="12">
              <div className="d-flex">
                <Button
                  onClick={handleOpen}
                  className="me-1"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Backdrop
                  sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                  })}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Button outline color="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddNewProject;
