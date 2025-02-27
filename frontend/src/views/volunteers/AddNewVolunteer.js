import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import axios from 'axios'
import { alertTypes } from '../../utility/alertUtils';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../configs/constants';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


// Function to refresh the access token
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

const AddNewVolunteer = () => {
  const [formData, setFormData] = useState({
    
    name: '',
    position: '',
    description: '',
    image: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false); //spinner
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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

  // submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const data = new FormData();
    
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('description', formData.description);
    data.append('image', formData.image);

    try {
      let token = localStorage.getItem('accessToken');
      
      
      const response = await axios.post(`${API_URL}/vol/add-volunteer`, data, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Volunteer added successfully!');
        setErrorMessage('');
        alertTypes.success('Volunteer added successfully!');

        navigate("/volunteers");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);

      
      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          
          const newToken = localStorage.getItem('accessToken');

          try {
            const retryResponse = await axios.post(`${API_URL}/vol/add-volunteer`, data, {
              headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data'
              }
            });

            if (retryResponse.status === 200) {
              alertTypes.success('Poject added successfully!');
            
            }
          } catch (retryError) {
            console.error(retryError);
            alertTypes.error('Failed to add volunteer!');
            
          }
        } else {
          alertTypes.info('Access Denied !' , 'Please log in again.');
          
        }
      } else {
        alertTypes.warning('Warning!' ,'Fields can not be empty!');
        
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add New Volunteer</CardTitle>
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

export default AddNewVolunteer;
