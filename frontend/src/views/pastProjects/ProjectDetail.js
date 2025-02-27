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


  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post(`${API_URL}/token`, {
        refreshToken,
      });

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        return true;
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      return false;
    }
    return false;
  };

  const getProjectById = async (pProjectId) => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/pp/get/${pProjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setProject(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/pp/get/${pProjectId}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setProject(response.data);
        } else {
          setError('Failed to refresh token. Please log in again.');
        }
      } else {
        setError('Failed to fetch project details');
      }
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

  const image = `${API_URL}/${project.image}`;
  const galleryImages = project.galleryImages.map(image => `${API_URL}/${image}`);

  // const handleEdit = () => {
  //   // Logic to handle edit (e.g., redirect to edit page)
  //   console.log('Edit button clicked');
  // };
  

  const handleDelete = async () => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    

    if (result) {
        try {
            const response = await apiRequest(`${API_URL}/pp/delete/${pProjectId}`, {
                method: 'DELETE'
            });
            
            console.log(response.message); 
            
            
            
            navigate('/past-projects'); 
        } catch (error) {
            console.error(error);
            alertTypes.error('Failed to delete project!'); 
        }
        console.log('Deletion confirmed!');
    }
};



      // ** Function to handle Modal toggle
      const handleModal = () => setModal(!modal)
      const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

      const handleUpdate = () => {
        setRefresh(prev => !prev);
        handleModal();

      }


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
                    alt={`Gallery Images ${index + 1}`}
                    style={{ width: "18%", marginRight: "5px" , objectFit: 'cover', gap: "20px" }}
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
                {/* <strong>Topic:</strong>
                <ul>
                  {project.topic.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
                
                <strong>Description:</strong>
                <ul>
                  {project.description.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul> */}
                <strong>Description:</strong> {project.description} <br/><br/>
                <strong >Date:</strong> {project.date}
                
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal size='lg' isOpen={modal} toggle={handleModal}>
        <ModalHeader
          toggle={handleModal}
          close={CloseBtn}
          tag="div"
        ></ModalHeader>
        <UpdateProject pProjectId={pProjectId} handleUpdate={handleUpdate} />
      </Modal>
    </Card>
  );
};

export default ProjectDetail;
