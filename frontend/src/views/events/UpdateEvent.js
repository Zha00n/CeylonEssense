import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';
import Flatpickr from 'react-flatpickr';

import '@styles/react/libs/flatpickr/flatpickr.scss';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateEvent = ({ id, getAllEvents, handleUpdate }) => {
  const [formData, setFormData] = useState({
    topic: '',
    desc: '',
    date: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [picker, setPicker] = useState(new Date());
  const [open, setOpen] = React.useState(false); // Spinner
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (id) {
      fetchEventData();
    }
  }, [id]);  
  

  const fetchEventData = async () => {
    if (!id) {
      console.error('Event ID is required');
      return; 
    }
  
    try {
      const response = await axios.get(`${API_URL}/api/event/${id}`);
      const eventData = response.data.data;  
      const parsedDate = eventData.date ? new Date(eventData.date) : new Date();
  
      
      setFormData({
        topic: eventData.topic,
        desc: eventData.description,
        date: eventData.date,
        image: eventData.image, 
      });

      setPicker(parsedDate);

      
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch event details!');
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
    data.append('desc', formData.desc);
    const selectedDate = picker[0] ? picker[0].toLocaleDateString("en-CA") : formData.date;

    data.append('date', selectedDate);

    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let token = localStorage.getItem('accessToken');
      const response = await axios.post(`${API_URL}/api/event/update`, data, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      const updatedEvent = response.data.data; 
      setFormData({
        topic: updatedEvent.topic,
        desc: updatedEvent.desc,
        date: updatedEvent.date,
        image: null,  
      });

      setSuccessMessage('Event updated successfully!');
      alertTypes.success('Event updated successfully!');
      handleUpdate();
      getAllEvents();
      

    } catch (error) {
      setOpen(false);
      console.error(error);
      setErrorMessage('Failed to update event!');
      alertTypes.error(error.response?.data?.msg || 'Failed to update event!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Event</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='topic'>
                Event Name
              </Label>
              <Input
                type='text'
                name='topic'
                id='topic'
                placeholder='Add name..'
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

            <Col md='6' sm='12' className='mb-1'>
              <Label for="hf-picker">Date</Label>
              <Flatpickr
                value={picker}
                id="hf-picker"
                className="form-control"
                onChange={(date) => {
                  setPicker(date);
                  setFormData({ ...formData, date: date[0].toISOString().split("T")[0] });
                }}
                options={{
                  altInput: true,
                  altFormat: "J F, Y",
                  dateFormat: "d-m-y",
                }}
              />
            </Col>

            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='desc'>
                Description
              </Label>
              <Input
                type='textarea'
                name='desc'
                id='desc'
                placeholder='Add description..'
                value={formData.desc}
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

export default UpdateEvent;
