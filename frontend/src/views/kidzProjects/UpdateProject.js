import { useState, useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import apiRequest from '../../utility/apiRequest'
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';
import Flatpickr from 'react-flatpickr';

import '@styles/react/libs/flatpickr/flatpickr.scss'

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




const UpdateProject = ({ kProjectId, handleModal , handleUpdate }) => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    date: '',
    image: null,
    galleryImages: [],
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [picker, setPicker] = useState(new Date());
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (kProjectId) fetchProjectData();
  }, [kProjectId]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/kids-projects/${kProjectId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      const projectData = response.data.data;

      
      const galleryImages = JSON.parse(projectData.gallery_images);

      
      const parsedDate = projectData.date ? new Date(projectData.date) : new Date();

      setFormData({
        topic: projectData.topic,
        description: projectData.description,
        date: projectData.date,
        image: projectData.image, 
        galleryImages: galleryImages,
      });

      setPicker(parsedDate); 

    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch project details!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'galleryImages') {
      setFormData({ ...formData, galleryImages: [...files] });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    
    data.append('id', kProjectId);
    if (formData.topic) data.append('topic', formData.topic);
    if (formData.description) data.append('description', formData.description);
    
    if (picker) {
      const formattedDate = new Date(picker).toLocaleDateString("en-CA").split('T')[0];
      data.append('date', formattedDate);
    }

    
    if (formData.image && formData.image instanceof File) {
      data.append('image', formData.image);
    }

    
    if (formData.galleryImages.length) {
      Array.from(formData.galleryImages).forEach((file) => {
        if (file instanceof File) {
          data.append('galleryImages[]', file);
        }
      });
    }

    try {
      let token = localStorage.getItem('accessToken');
      
      handleOpen();
      const response = await axios.post(`${API_URL}/api/kids-projects/update`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alertTypes.success('Project updated successfully!');
        handleUpdate();
        
      }
    } catch (error) {
      console.error(error);
      alertTypes.error(error.response?.data?.message || 'Failed to update project!');
    } finally {
      handleClose();
    }
  };



  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Project</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='topic'>
                Project Name
              </Label>
              <Input
                type='text'
                name='topic'
                id='topic'
                placeholder='add name..'
                value={formData.topic}
                onChange={handleChange}
              />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='image'>
                Full Image
              </Label>
              <Input
                type='file'
                name='image'
                id='image'
                onChange={handleFileChange}
              />
            </Col>

            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='galleryImages'>
              Gallery Images
              </Label>
              <Input
                type='file'
                name='galleryImages'
                id='galleryImages'
                multiple
                onChange={handleFileChange}
              />
            </Col>

            <Col md='6' sm='12' className='mb-1'>
            <Label for="hf-picker">Date</Label>
                    <Flatpickr
                      value={picker}
                      id="hf-picker"
                      className="form-control"
                      onChange={(date) => {
                        setPicker(date);
                        
                        setFormData({
                          ...formData,
                          date: date[0].toISOString().split("T")[0], 
                        });
                      }}
                      options={{
                        altInput: true,
                        altFormat: "J F, Y",
                        dateFormat: "d-m-y",
                      }}
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
                placeholder='add description..'
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

export default UpdateProject;
