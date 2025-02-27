import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import AddNewProject from './AddNewProject';
import { X } from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
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

  const getAllProjects = async () => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/kp/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      setProjects(response.data.slice().reverse());
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
       
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/kp/getAll`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setProjects(response.data.slice().reverse());
        } else {
          // setError('Failed to refresh token. Please log in again.');
          alertTypes.warning( 'Access Denied !' , 'Please log in.');
        }
      } else {
        // setError('Failed to fetch projects');
        alertTypes.error('Failed to fetch projects!')
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
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
          <CardTitle tag='h4'>Kidz Projects</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add New Project</span>
            </Button>
          </div>
        </CardHeader>
    </Card>
    
    <Row className='match-height'>
      {projects.map((project) => (
        <Col lg='4' md='6' key={project.kProjectId}>
          <Card>
            <CardImg width="200" height="200" style={{ objectFit: 'cover' }} top src={`${API_URL}/${project.image}`} alt={`Project ${project.kProjectId}`} />
            <CardBody>
              <CardTitle style={{ maxHeight: '100px', overflow: 'hidden' }} tag='h4'>{`${project.topic}`}</CardTitle>
              <CardText style={{ maxHeight: '85px', overflow: 'hidden' }}>
                {project.description}
              </CardText>
              <CardText className='absolute'>Date : {`${project.date}`}</CardText>
              <Link to={`/kidz-projects/${project.kProjectId}`}>
                <Button color='primary' outline>
                  View Details
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
    <Modal size='lg' isOpen={modal} toggle={handleModal}>
    <ModalHeader toggle={handleModal} close={CloseBtn} tag='div'>
      </ModalHeader>
        <AddNewProject open={modal} handleModal={handleModal} />
      </Modal>
    </Fragment>
  );
};

export default ProjectList;

