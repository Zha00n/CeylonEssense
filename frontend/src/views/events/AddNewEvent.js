import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import axios from 'axios'
import { alertTypes } from '../../utility/alertUtils';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../configs/constants';
import Flatpickr from 'react-flatpickr';

import '@styles/react/libs/flatpickr/flatpickr.scss'

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const AddNewEvent = () => {
  const [formData, setFormData] = useState({
    topic: '',
    desc: '',
    date: '',
    image: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [picker, setPicker] = useState(new Date());
  const [open, setOpen] = React.useState(false); // spinner

  const navigate = useNavigate();

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('topic', formData.topic);
    data.append('desc', formData.desc);

    if (picker && picker.length > 0) {
      data.append("date", picker[0].toLocaleDateString("en-CA"));
    }

    data.append('image', formData.image);


    try {
      let token = localStorage.getItem('accessToken');
      
      const response = await axios.post(`${API_URL}/api/event/create`, data, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Event added successfully!');
        setErrorMessage('');
        alertTypes.success('Event added successfully!');
        
        
        navigate("/events");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);

      if (error.response && error.response.status === 401) {
        alertTypes.info('Access Denied!', 'Please log in again.');
      } else {
        alertTypes.warning('Warning!', 'Fields cannot be empty!');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add New Event</CardTitle>
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
                placeholder='add name..'
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
            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label' for='desc'>
                Description
              </Label>
              <Input
                type='textarea'
                name='desc'
                id='desc'
                placeholder='add desc..'
                value={formData.desc}
                onChange={handleChange}
                className=''
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

export default AddNewEvent;
