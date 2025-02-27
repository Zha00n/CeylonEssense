import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import AddNewProject from './AddNewProject';
import { X } from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants';

const ProjectList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

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

  const getAllProjects = async () => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/p/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.slice().reverse());
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/p/getAll`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setProducts(response.data.slice().reverse());
        } else {
          alertTypes.warning('Access Denied!', 'Please log in.');
        }
  
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  const CloseBtn = <X className="cursor-pointer" size={15} onClick={handleModal} />;

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start">
          <CardTitle tag="h4">Products</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add New Product</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* If no products available, show a message */}
      {products.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No products available.</h4>
        </div>
      ) : (
        <Row className="match-height">
          {products.map((product) => (
            <Col lg="4" md="6" key={product.productId}>
              <Card>
                <CardImg
                  width="200"
                  height="250"
                  style={{ objectFit: 'cover' }}
                  top
                  src={`${API_URL}/${product.image}`}
                  alt={`Project ${product.productId}`}
                />
                <CardBody>
                  <CardTitle
                    style={{
                      maxHeight: '50px',
                      overflow: 'hidden',
                      fontSize: '25px',
                    }}
                    tag="h4"
                  >
                    {`${product.title}`}
                  </CardTitle>
                  <CardText className="absolute">Category: {`${product.category}`}</CardText>
                  <Link to={`/products/${product.productId}`}>
                    <Button color="primary" outline>
                      View Product
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal size="lg" isOpen={modal} toggle={handleModal}>
        <ModalHeader toggle={handleModal} close={CloseBtn} tag="div"></ModalHeader>
        <AddNewProject open={modal} handleModal={handleModal} />
      </Modal>
    </Fragment>
  );
};

export default ProjectList;
