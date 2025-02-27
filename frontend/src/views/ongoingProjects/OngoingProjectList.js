//This refers to new news update list


import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Edit, Plus } from 'react-feather';
import AddNewProject from './AddNewProject';
import { X , Trash2} from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import apiRequest from '../../utility/apiRequest';
import { API_URL } from '../../configs/constants';
import UpdateOngoing from './UpdateOngoingProject'


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedoProjectId, setSelectedoProjectId] = useState(null);

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

      const response = await axios.get(`${API_URL}/op/getAll`, {
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
          const response = await axios.get(`${API_URL}/op/getAll`, {
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

  const refreshEvents = getAllProjects();

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  const handleDelete = async (oProjectId) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    

    if (result) {
        try {
            const response = await apiRequest(`${API_URL}/op/delete/${oProjectId}`, {
                method: 'DELETE'
            });
            
            console.log(response.message); 
            setProjects(projects.filter(project => project.oProjectId !== oProjectId));

            
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


    const handleUpdate = (oProjectId) => {
      setSelectedoProjectId(oProjectId);
      setModal2(!modal2)};

    const CloseBtn2 = <X className='cursor-pointer' size={15} onClick={ () => handleUpdate()} />

  

  return (
    <Fragment>
    <Card>
    <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start '>
          <CardTitle tag='h4'>News Updates</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add New News</span>
            </Button>
          </div>
        </CardHeader>
    </Card>
    
    <Row className='match-height'>
      {projects.map((project) => (
        <Col lg='4' md='6' key={project.oProjectId}>
          <Card>
          <Button.Ripple className ='rbutton' color='flat-danger' onClick={() => handleDelete(project.oProjectId)}> <Trash2 />  </Button.Ripple>

          <Button.Ripple
                className="ebutton"
                color="flat-primary"
                onClick={() => handleUpdate(project.oProjectId)}
              >
                {" "}
                <Edit />{" "}
          </Button.Ripple>


            <CardImg width="200" height="200" style={{ objectFit: 'cover' }} top src={`${API_URL}/${project.image}`} alt={`Project ${project.oProjectId}`} />
            <CardBody>
              <CardTitle style={{ maxHeight: '100px', overflow: 'hidden' }} tag='h4'>{`${project.topic}`}</CardTitle>
              <CardText style={{ maxHeight: '85px', overflow: 'hidden' }}>
                {project.description}
              </CardText>
              {/* <Link to={`/projects/${project.pProjectId}`}>
                <Button color='primary' outline>
                  View Details
                </Button>
              </Link> */}
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


      <Modal size='lg' isOpen={modal2} toggle={handleUpdate}>
        <ModalHeader
          toggle={handleUpdate}
          close={CloseBtn2}
          tag="div"
        ></ModalHeader>
        <UpdateOngoing open={modal2} oProjectId={selectedoProjectId}  handleUpdate={handleUpdate} />
      </Modal>
      
    </Fragment>
  );
};

export default ProjectList;

