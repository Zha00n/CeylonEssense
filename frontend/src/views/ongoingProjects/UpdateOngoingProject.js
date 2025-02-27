import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateProject = ({ id, getAllProjects, handleUpdate }) => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    image: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = React.useState(false); // Spinner

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (id) {
      fetchProjectData();
    }
  }, [id,]);

  const fetchProjectData = async () => {
    if (!id) {
      console.error('Project ID is required');
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/news/${id}`);
      const projectData = response.data.data;

      setFormData({
        topic: projectData.topic,
        description: projectData.description,
        image: null, 
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch news details!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleOpen();
  
    const data = new FormData();
    data.append('id', id); 
    data.append('topic', formData.topic);
    data.append('description', formData.description);
  
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      let token = localStorage.getItem('accessToken');
      const response = await axios.post(`${API_URL}/api/news/update`, data, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      const updatedProject = response.data;
      setFormData({
        topic: updatedProject.topic,
        description: updatedProject.description,
        image: null,  
      });
  
      setSuccessMessage('News updated successfully!');
      alertTypes.success('News updated successfully!');
      handleUpdate(); 
      getAllProjects();
    } catch (error) {
      setOpen(false);
      console.error(error);
      setErrorMessage(error.response?.data?.msg || 'Failed to update news!');
      alertTypes.error(error.response?.data?.msg || 'Failed to update news!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update News</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='topic'>
                Title
              </Label>
              <Input
                type='text'
                name='topic'
                id='topic'
                placeholder='Add title..'
                value={formData.topic}
                onChange={handleChange}
              />
            </Col>

            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='image'>
                Image
              </Label>
              <Input
                type='file'
                name='image'
                id='image'
                onChange={handleFileChange}
              />
            </Col>

            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='description'>
                Description
              </Label>
              <Input
                type='textarea'
                name='description'
                id='description'
                placeholder='Add description..'
                value={formData.description}
                onChange={handleChange}
                style={{ minHeight: '200px' }}
              />
            </Col>

            <Col sm='12'>
              <div className='d-flex'>
                <Button onClick={handleOpen} className='me-1' color='primary' type='submit'>
                  Submit
                </Button>
                <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open} onClick={handleClose}>
                  <CircularProgress color="inherit" />
                </Backdrop>
                <Button outline color='secondary' type='reset'>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>

          {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          {successMessage && <p className='text-success'>{successMessage}</p>}
        </Form>
      </CardBody>
    </Card>
  );
};

export default UpdateProject;
