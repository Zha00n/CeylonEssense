import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Plus } from 'react-feather';
import AddNewHero from './AddNewHero.js';
import { X , Trash2 } from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import apiRequest from '../../utility/apiRequest';
import { API_URL } from '../../configs/constants.js';



const HeroList = () => {
  const [heros, setHeros] = useState([]);
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

  const getAllHeros = async () => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/hr/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      setHeros(response.data.slice().reverse());
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
       
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/hr/getAll`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setHeros(response.data.slice().reverse());
        } else {
          
          alertTypes.warning( 'Access Denied !' , 'Please log in.');
        }
      } else {
       
        alertTypes.error('Failed to fetch hero images!')
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllHeros();
  }, []);

  if (loading) {
    return <div>Loading Heros Images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  
  const handleDelete = async (heroId) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    

    if (result) {
        try {
            const response = await apiRequest(`${API_URL}/hr/delete/${heroId}`, {
                method: 'DELETE'
            });
            
            console.log(response.message); 
            setHeros(heros.filter(hero => hero.heroId !== heroId));

            
        } catch (error) {
            console.error(error);
            alertTypes.error('Failed to delete hero image!'); 
        }
        console.log('Deletion confirmed!');
    }
};




    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


  

  return (
    <Fragment>
    <Card>
    <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start '>
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
        <Col lg='4' md='6' key={hero.heroId}>
          <Card>

          <Button.Ripple className ='rbutton' color='flat-danger' onClick={() => handleDelete(hero.heroId)}> <Trash2 />  </Button.Ripple>

            <CardImg width="200" height="200" style={{ objectFit: 'cover' }} top src={`${API_URL}/${hero.image}`} alt={`Hero ${hero.heroId}`} />
            <CardBody>
              <CardTitle tag='h4'>Hero Image: {`${hero.heroId}`}</CardTitle>
            </CardBody>
          </Card> 
        </Col>
      ))}
    </Row>
    <Modal isOpen={modal} toggle={handleModal}>
    <ModalHeader toggle={handleModal} close={CloseBtn} tag='div'>
      </ModalHeader>
        <AddNewHero open={modal} handleModal={handleModal} />
      </Modal>
    </Fragment>
  );
};

export default HeroList;

