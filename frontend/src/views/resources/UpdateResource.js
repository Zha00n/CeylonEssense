import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import axios from 'axios';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateProduct = () => {
  const { resourceId } = useParams(); // Assuming you use params to get the product ID
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    video: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = React.useState(false); // Spinner

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (resourceId) {
      fetchProductData();
    }
  }, [resourceId]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${API_URL}/r/get/${resourceId}`);
      const productData = response.data;
      setFormData({
        title: productData.title,
        description: productData.description,
        video: productData.video,
        image: null, // image will be handled as file
      });
    } catch (error) {
      setErrorMessage('Failed to fetch product details!');
      console.error(error);
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
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('video', formData.video);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let token = localStorage.getItem('accessToken');
      const response = await axios.put(`${API_URL}/r/update-resource/${resourceId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Product updated successfully!');
        alertTypes.success('Product updated successfully!');
        navigate("/resources");
      }
    } catch (error) {
      setOpen(false);
      console.error(error);

      if (error.response && error.response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem('accessToken');
          try {
            const retryResponse = await axios.put(`${API_URL}/r/update-resource/${resourceId}`, data, {
              headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data',
              }
            });

            if (retryResponse.status === 200) {
              alertTypes.success('Product updated successfully!');
            }
          } catch (retryError) {
            console.error(retryError);
            alertTypes.error('Failed to update product!');
          }
        } else {
          alertTypes.info('Access Denied! Please log in again.');
        }
      } else {
        alertTypes.warning('Warning!', 'Fields cannot be empty!');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Product</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='title'>
                Product Name
              </Label>
              <Input
                type='text'
                name='title'
                id='title'
                placeholder='Enter product name...'
                value={formData.title}
                onChange={handleChange}
              />
            </Col>

            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='image'>
                Product Image
              </Label>
              <Input
                type='file'
                name='image'
                id='image'
                onChange={handleFileChange}
              />
            </Col>

            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='video'>
                Resource Video Link
              </Label>
              <Input
                type='text'
                name='video'
                id='video'
                placeholder='Enter video link...'
                value={formData.video}
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
                placeholder='Enter product description...'
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

export default UpdateProduct;
