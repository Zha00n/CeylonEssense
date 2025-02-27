import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import { alertTypes } from '../../utility/alertUtils';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../configs/constants';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AddNewVolunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    image: null,
  });
  const [messages, setMessages] = useState({ success: '', error: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('description', formData.description);
    data.append('image', formData.image);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setMessages({ success: '', error: 'Authentication required. Please log in.' });
        alertTypes.info('Authentication Required', 'Please log in.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(`${API_URL}/api/volunteers/create`, data, config);
      if (response.status === 200) {
        setMessages({ success: 'Volunteer added successfully!', error: '' });
        alertTypes.success('Volunteer added successfully!');
        navigate('/volunteers');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alertTypes.error('Unauthorized', 'Session expired or invalid. Please log in again.');
        setMessages({ success: '', error: 'Session expired. Please log in again.' });
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        alertTypes.warning('Error', 'Unable to add volunteer. Check your input and try again.');
        setMessages({ success: '', error: 'Failed to add volunteer. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add New Volunteer</CardTitle>
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
                placeholder="Add name..."
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
                placeholder="Add position..."
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
                placeholder="Add description..."
                value={formData.description}
                onChange={handleChange}
              />
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
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

export default AddNewVolunteer;
