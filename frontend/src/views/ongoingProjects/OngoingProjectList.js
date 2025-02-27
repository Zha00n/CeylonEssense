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
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedid, setSelectedid] = useState(null);

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/news/all`);
      
      setProjects(response.data.data);
    } catch (err) {
      console.error('Error fetching news:', err);
      alertTypes.error('Failed to fetch news!');
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


  const handleDelete = async (id) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    
    if (result) {
      try {
        let token = localStorage.getItem('accessToken');
        
       
        const response = await axios.post(
          `${API_URL}/api/news/delete`, 
          { id: id },  
          {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          }
        );
  
        
        if (response.data.status === 'success') {
          // alertTypes.success(response.data.msg || 'Project deleted successfully.');
          
          
          setProjects(projects.filter(project => project.id !== id));
        } else {
          alertTypes.error(response.data.msg || 'Failed to delete news!');
        }
      } catch (error) {
        console.error('Error deleting news:', error);
        alertTypes.error('Failed to delete news!');
      }
    }
  };
  



   
    const handleModal = () => setModal(!modal)

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


    const handleUpdate = (id) => {
      setSelectedid(id);
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
      {projects.map((project, index) => (
        <Col lg='4' md='6' key={project.id ||index}>
          <Card>
          <Button.Ripple className ='rbutton' color='flat-danger' onClick={() => handleDelete(project.id)}> <Trash2 />  </Button.Ripple>

          <Button.Ripple
                className="ebutton"
                color="flat-primary"
                onClick={() => handleUpdate(project.id)}
              >
                {" "}
                <Edit />{" "}
          </Button.Ripple>


            <CardImg width="200" height="200" style={{ objectFit: 'cover' }} top src={`${project.image}`} alt={`Project ${project.id || index}`} />
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
        <UpdateOngoing open={modal2} id={selectedid}  handleUpdate={handleUpdate} getAllProjects={getAllProjects} />
      </Modal>
      
    </Fragment>
  );
};

export default ProjectList;

