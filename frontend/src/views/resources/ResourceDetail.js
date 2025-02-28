import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Button, Modal, ModalHeader } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom'; 
import { X } from 'react-feather';
import UpdateResource from './UpdateResource';
import { alertTypes } from '../../utility/alertUtils';
import apiRequest from '../../utility/apiRequest';
import { API_URL } from '../../configs/constants';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResourceDetail = () => {
  const { resourceId } = useParams(); 
  const [resource, setResource] = useState(null);
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

  const getResourceById = async (resourceId) => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/r/get/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setResource(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/r/get/${resourceId}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setResource(response.data);
        } else {
          setError('Failed to refresh token. Please log in again.');
        }
      } else {
        setError('Failed to fetch resource details');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResourceById(resourceId); 
  }, [resourceId, refresh]);

  if (loading) {
    return <div>Loading resource details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const image = `${API_URL}/${resource.image}`;

  // const handleEdit = () => {
  //   // Logic to handle edit (e.g., redirect to edit page)
  //   console.log('Edit button clicked');
  // };
  

  const handleDelete = async () => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    

    if (result) {
        try {
            const response = await apiRequest(`${API_URL}/r/delete/${resourceId}`, {
                method: 'DELETE'
            });
            
            console.log(response.message); 
            
            
            
            navigate('/resources'); 
        } catch (error) {
            console.error(error);
            alertTypes.error('Failed to delete resource!'); 
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
        <Card style={{ height: "100%", position: "relative" }}>

            
            <CardBody style={{top: "25px", width:'400px' }}>
              <div style={{marginTop:'30px' }}>
              <CardImg width="200" height="200" style={{ objectFit: 'cover', marginBottom:'50px'}} top src={`${API_URL}/${resource.image}`} alt={`Product ${resource.resourceId}`} />
              </div>

              <CardTitle tag="h4">{`Product: ${resource.title}`}</CardTitle>
              <div>
                <strong>Description:</strong> 
                <div
                  style={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    marginBottom: '10px'
                  }}
                >
                  {resource.description}
                </div> <br/><br/>
                
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" md="6" style={{ padding: "10px" }}>
        <Card className="d-flex flex-row">
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

            <div style={{ width: "100%", padding: "10px", flex:'colomn', marginTop:'40px'}}>
            {/* <video className="w-[100%] rounded-lg" style={{ width: '100%', borderRadius: '0.5rem' }} autoPlay controls>
              <source src={resource.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <iframe 
              style={{borderRadius:'0.5rem' }}
              width="426" 
              height="240" 
              src={`https://www.youtube.com/embed/${resource.video}`} 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title="Video"
            ></iframe>

            {/* <iframe width="100%" height="250" src={resource.video} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}


            </div>
          </Card>

        </Col>
      </Row>

      <Modal size='lg' isOpen={modal} toggle={handleModal}>
        <ModalHeader
          toggle={handleModal}
          close={CloseBtn}
          tag="div"
        ></ModalHeader>
        <UpdateResource resourceId={resourceId} handleUpdate={handleUpdate} />
      </Modal>
    </Card>
  );
};

export default ResourceDetail;
