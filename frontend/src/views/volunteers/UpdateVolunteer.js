import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateVolunteer = ({ volunteerId, getAllVolunteers, handleUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    image: null,
  });
  const [messages, setMessages] = useState({ success: '', error: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (volunteerId) fetchVolunteerData();
  }, [volunteerId]);

  const fetchVolunteerData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alertTypes.info('Authentication Required', 'Please log in.');
        navigate('/login');
        return;
      }
  
      const response = await axios.get(`${API_URL}/api/volunteers/${volunteerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      
      const volunteerData = response.data.data;
  
      setFormData({
        name: volunteerData.name,
        position: volunteerData.position,
        description: volunteerData.description,
        image: null, 
      });
    } catch (error) {
      console.error(error);
      setMessages({ error: 'Failed to fetch volunteer details!' });
      alertTypes.error('Error', 'Failed to fetch volunteer details.');
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
    setLoading(true);

    const data = new FormData();
    data.append('id', volunteerId);
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alertTypes.info('Authentication Required', 'Please log in.');
        navigate('/login');
        return;
      }

      await axios.post(`${API_URL}/api/volunteers/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alertTypes.success('Success', 'Volunteer updated successfully!');
      handleUpdate();
      getAllVolunteers();
      // handleModal();
    } catch (error) {
      console.error(error);
      setMessages({ ...messages, error: 'Failed to update volunteer!' });
      alertTypes.error('Error', 'Failed to update volunteer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Update Volunteer</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="name">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={formData.name}
                onChange={handleChange}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="image">
                Image
              </Label>
              <Input type="file" name="image" id="image" onChange={handleFileChange} />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="position">
                Position
              </Label>
              <Input
                type="text"
                name="position"
                id="position"
                placeholder="Enter position..."
                value={formData.position}
                onChange={handleChange}
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label className="form-label" for="description">
                Description
              </Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter description..."
                value={formData.description}
                onChange={handleChange}
              />
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button color="primary" type="submit" className="me-1">
                  Submit
                </Button>
                <Backdrop
                  sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <Button outline color="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
          {messages.error && <p className="text-danger">{messages.error}</p>}
          {messages.success && <p className="text-success">{messages.success}</p>}
        </Form>
      </CardBody>
    </Card>
  );
};

export default UpdateVolunteer;
