import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  CardHeader,
  Modal,
  ModalHeader,
} from "reactstrap";
import { Edit, Plus, X, Trash2 } from "react-feather";
import AddNewVolunteer from "./AddNewVolunteer";
import UpdateVolunteer from "./UpdateVolunteer";
import { alertTypes } from "../../utility/alertUtils";
import { API_URL } from "../../configs/constants";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);

  // Fetch all volunteers
  const getAllVolunteers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_URL}/api/volunteers/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVolunteers(response.data.data);
    } catch (err) {
      console.error("Failed to fetch volunteers:", err);
      alertTypes.error("Failed to fetch volunteers!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  // Delete a volunteer
  const handleDelete = async (volunteerId) => {
    const result = await alertTypes.confirmText(
      "Are you sure?",
      "You won't be able to revert this!"
    );
    if (result) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.post(
          `${API_URL}/api/volunteers/delete`,
          { id: volunteerId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVolunteers(volunteers.filter((v) => v.id !== volunteerId));
        // alertTypes.success("Volunteer deleted successfully!");
      } catch (err) {
        console.error("Failed to delete volunteer:", err);
        alertTypes.error("Failed to delete volunteer!");
      }
    }
  };

  // Modal Handlers
  const handleModal = () => setModal(!modal);
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  const handleUpdate = (volunteerId) => {
    setSelectedVolunteerId(volunteerId);
    setModal2(!modal2);
  };
  const CloseBtn2 = (
    <X className="cursor-pointer" size={15} onClick={() => handleUpdate()} />
  );

  if (loading) return <div>Loading Volunteers...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start">
          <CardTitle tag="h4">Volunteers</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add New Volunteer</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Row className="match-height">
        {volunteers.map((volunteer) => (
          <Col lg="4" md="6" key={volunteer.id}>
            <Card>
              <Button.Ripple
                className="rbutton"
                color="flat-danger"
                onClick={() => handleDelete(volunteer.id)}
              >
                <Trash2 />
              </Button.Ripple>

              <Button.Ripple
                className="ebutton"
                color="flat-primary"
                onClick={() => handleUpdate(volunteer.id)}
              >
                <Edit />
              </Button.Ripple>

              <CardBody className="mt-2">
                <CardImg
                  width="200"
                  height="200"
                  style={{ objectFit: "cover" }}
                  top
                  src={volunteer.image}
                  alt={`Volunteer ${volunteer.id}`}
                />
                <CardTitle
                  style={{ maxHeight: "100px", overflow: "hidden" }}
                  tag="h4"
                >
                  {volunteer.name}
                </CardTitle>
                <CardText className="mt-1">{volunteer.position}</CardText>
                <CardText className="ml">{volunteer.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Volunteer Modal */}
      <Modal isOpen={modal} toggle={handleModal}>
        <ModalHeader toggle={handleModal} close={CloseBtn}></ModalHeader>
        <AddNewVolunteer open={modal} handleModal={handleModal} />
      </Modal>

      {/* Update Volunteer Modal */}
      <Modal isOpen={modal2} toggle={handleUpdate}>
        <ModalHeader toggle={handleUpdate} close={CloseBtn2}></ModalHeader>
        <UpdateVolunteer
          open={modal2}
          volunteerId={selectedVolunteerId}
          handleUpdate={handleUpdate}
          getAllVolunteers={getAllVolunteers}
        />
      </Modal>
    </Fragment>
  );
};

export default VolunteerList;
