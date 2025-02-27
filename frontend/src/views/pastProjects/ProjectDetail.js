import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Button, Modal, ModalHeader } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom'; 
import { X } from 'react-feather';
import UpdateProject from './UpdateProject';
import { alertTypes } from '../../utility/alertUtils';
import apiRequest from '../../utility/apiRequest';
import { API_URL } from '../../configs/constants';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectDetail = () => {
  const { pProjectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  // get project by ID
  const getProjectById = async (pProjectId) => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/api/past-projects/${pProjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setProject(response.data.data); 
    } catch (err) {
      setError('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectById(pProjectId); 
  }, [pProjectId, refresh]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const image = `${project.image}`;
  const galleryImages = JSON.parse(project.gallery_images).map(image => `${image}`);

  
  const handleDelete = async () => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
  
    if (result) {
      try {
        let token = localStorage.getItem('accessToken');
  
       
        const response = await axios.post(
          `${API_URL}/api/past-projects/delete`, 
          { id: pProjectId },  
          {
            headers: {
              Authorization: `Bearer ${token}`,  
            }
          }
        );
  
        if (response.data.status === 'success') {
          navigate('/past-projects');
          
        } else {
          alertTypes.error(response.data.msg || 'Failed to delete project!');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alertTypes.error('Failed to delete project!');
      }
    }
  };
  
  
  


  const handleModal = () => setModal(!modal);
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />;

  const handleUpdate = () => {
    setRefresh(prev => !prev);
    handleModal();
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrow: false,
  };

  return (
    <Card>
      <Row className="match-height" style={{ margin: "20px" }}>
        <Col lg="6" md="6" style={{ padding: "10px" }}>
          <Card className="d-flex flex-row">
            <div style={{ width: "100%", padding: "10px" }}>
              <CardImg
                top
                src={image}
                alt={`Project ${project.pProjectId}`}
                style={{ width: "100%" }}
              />
              <div className="slider-container mt-2">
                <Slider {...settings}>
                  {galleryImages.map((image, index) => (
                    <CardImg
                      key={index}
                      src={image}
                      alt={`Gallery Image ${index + 1}`}
                      style={{ width: "18%", marginRight: "5px", objectFit: 'cover' }}
                      width="100" 
                      height="100"
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </Card>
        </Col>

        <Col lg="6" md="6" style={{ padding: "10px" }}>
          <Card style={{ height: "100%", position: "relative" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px" }}>
              <Button.Ripple
                color="flat-primary"
                onClick={handleModal}
                style={{ marginRight: "5px" }}
              >
                Edit
              </Button.Ripple>
              <Button.Ripple color="flat-danger" onClick={handleDelete}>
                Delete
              </Button.Ripple>
            </div>
            <CardBody style={{ position: "absolute", top: "25px" }}>
              <CardTitle tag="h4">{`Project: ${project.topic}`}</CardTitle>
              <div>
                <strong>Description:</strong> {project.description} <br/><br/>
                <strong>Date:</strong> {project.date}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal size='lg' isOpen={modal} toggle={handleModal}>
        <ModalHeader toggle={handleModal} close={CloseBtn} tag="div"></ModalHeader>
        <UpdateProject pProjectId={pProjectId} handleUpdate={handleUpdate} />
      </Modal>
    </Card>
  );
};

export default ProjectDetail;
