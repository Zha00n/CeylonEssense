import { useState, useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import apiRequest from '../../utility/apiRequest'
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




const UpdateVolunteer = ({ volunteerId, handleModal , handleUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    image: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [open, setOpen] = React.useState(false); //spinner
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (volunteerId) {
      fetchVolunteerData();
    }
  }, [volunteerId]);

  const fetchVolunteerData = async () => {
    if (!volunteerId) {
      console.error('Volunteer ID is required');
      return; 
    }
    
    try {
      const response = await apiRequest(`${API_URL}/vol/get/${volunteerId}`,);
      const volunteerData = response;

      setFormData({
        name: volunteerData.name,
        position: volunteerData.position,
        description: volunteerData.description,
        image: null, 
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch event details!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
      setFormData({
        ...formData,
        [name]: files[0]
      });
   
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('name', formData.name);
  data.append('position', formData.position);
  data.append('description', formData.description);
  data.append('image', formData.image);

  try {
    const response = await apiRequest(`${API_URL}/vol/update-volunteer/${volunteerId}`, {
      method: 'PUT',
      body: data,
    });

    
    
    alertTypes.success('Event updated successfully!');
    handleUpdate();
    

    
  } catch (error) {
    setOpen(false);
    console.error(error);
    alertTypes.error(error.message || 'Failed to update event!'); 
  }
};


  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Volunteer</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='name'>
                Name
              </Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='add name..'
                value={formData.name}
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

            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='position'>
                Position
              </Label>
              <Input
                type='text'
                name='position'
                id='position'
                placeholder='add position..'
                value={formData.position}
                onChange={handleChange}
              />
            </Col>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='description'>
                Description
              </Label>
              <Input
                type='textarea'
                name='description'
                id='description'
                placeholder='add desc..'
                value={formData.description}
                onChange={handleChange}
                className=''
              />
            </Col>

            <Col sm='12'>
              <div className='d-flex'>
                <Button onClick={handleOpen} className='me-1' color='primary' type='submit'>
                  Submit
                </Button>
                <Backdrop
                  sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                  open={open}
                  onClick={handleClose}
                >
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

export default UpdateVolunteer;
