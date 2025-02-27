import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Plus, X, Trash2 } from 'react-feather';
import AddNewHero from './AddNewHero.js';
import { alertTypes } from '../../utility/alertUtils';
import { API_URL } from '../../configs/constants.js';

const HeroList = () => {
  const [heros, setHeros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  const fetchHeros = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/hero-image/all`);
      setHeros(response.data.data);
    } catch (error) {
      console.error(error);
      alertTypes.error('Failed to fetch hero images!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (heroId) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");

    if (result) {
      try {
        const response = await axios.post(
          `${API_URL}/api/hero-image/delete`,
          { id: heroId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        if (response.data.status === 'success') {
          // alertTypes.success('Hero image deleted successfully!');
          setHeros(heros.filter((hero) => hero.id !== heroId));
        } else {
          alertTypes.error(response.data.msg || 'Failed to delete hero image!');
        }
      } catch (error) {
        console.error(error);
        alertTypes.error('Failed to delete hero image!');
      }
    }
  };

  useEffect(() => {
    fetchHeros();
  }, []);

  const handleModal = () => setModal(!modal);
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />;

  if (loading) {
    return <div>Loading Hero Images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start'>
          <CardTitle tag='h4'>Hero Images</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add New Hero Image</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Row className='match-height'>
        {heros.map((hero) => (
          <Col lg='4' md='6' key={hero.id}>
            <Card>
              <Button.Ripple className='rbutton' color='flat-danger' onClick={() => handleDelete(hero.id)}>
                <Trash2 />
              </Button.Ripple>
              <CardImg
                width='200'
                height='200'
                style={{ objectFit: 'cover' }}
                top
                src={hero.image}
                alt={`Hero ${hero.id}`}
              />
              <CardBody>
                <CardTitle tag='h4'>Hero Image</CardTitle>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal isOpen={modal} toggle={handleModal}>
        <ModalHeader toggle={handleModal} close={CloseBtn} tag='div'></ModalHeader>
        <AddNewHero open={modal} handleModal={handleModal} />
      </Modal>
    </Fragment>
  );
};

export default HeroList;
