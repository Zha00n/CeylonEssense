import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import AddNewResource from './AddNewResource';
import { X } from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';


const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

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

  const getAllResources = async () => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/r/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      setResources(response.data.slice().reverse());
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
       
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/r/getAll`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setResources(response.data.slice().reverse());
        } else {
          // setError('Failed to refresh token. Please log in again.');
          alertTypes.warning( 'Access Denied !' , 'Please log in.');
        }
      } 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllResources();
  }, []);

  if (loading) {
    return <div>Loading resources...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


  

  return (
    <Fragment>
    <Card>
    <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start '>
          <CardTitle tag='h4'>Prouduct Resources</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add New Product</span>
            </Button>
          </div>
        </CardHeader>
    </Card>



    {resources.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No resources available.</h4>
        </div>
      ) : (
    <Row className='match-height'>
      {resources.map((resource) => (
        <Col lg='4' md='6' key={resource.resourceId}>
          <Card>
            <CardImg width="200" height="200" style={{ objectFit: 'cover' }} top src={`${API_URL}/${resource.image}`} alt={`Product ${resource.resourceId}`} />
            <CardBody>
              <CardTitle style={{ maxHeight: '100px', overflow: 'hidden' }} tag='h4'>{`${resource.title}`}</CardTitle>
              {/* <CardText style={{ maxHeight: '85px', overflow: 'hidden',}}>
                {resource.description}
              </CardText> */}
              <Link to={`/resources/${resource.resourceId}`}>
                <Button color='primary' outline>
                  View Details
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
    )}

    <Modal size='lg' isOpen={modal} toggle={handleModal}>
    <ModalHeader toggle={handleModal} close={CloseBtn} tag='div'>
      </ModalHeader>
        <AddNewResource open={modal} handleModal={handleModal} />
      </Modal>
    </Fragment>
  );
};

export default ResourceList;

