import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Plus, X } from 'react-feather';
import AddNewProject from './AddNewProject';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/past-projects/all`);
     
      setProjects(response.data.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      alertTypes.error('Failed to fetch projects!');
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

  const handleModal = () => setModal(!modal);

  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />;

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start'>
          <CardTitle tag='h4'>Past Projects</CardTitle>
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
          <Col lg='4' md='6' key={project.id}>
            <Card>
              <CardImg
                width="200"
                height="200"
                style={{ objectFit: 'cover' }}
                top
                src={`${project.image}`}
                alt={`Project ${project.id}`}
              />
              <CardBody>
                <CardTitle style={{ maxHeight: '100px', overflow: 'hidden' }} tag='h4'>
                  {project.topic}
                </CardTitle>
                <CardText style={{ maxHeight: '85px', overflow: 'hidden' }}>
                  {project.description}
                </CardText>
                <CardText>Date: {project.date}</CardText>
                <Link to={`/projects/${project.id}`}>
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
        <ModalHeader toggle={handleModal} close={CloseBtn} tag='div' />
        <AddNewProject open={modal} handleModal={handleModal} />
      </Modal>
    </Fragment>
  );
};

export default ProjectList;
