import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Edit, Plus } from 'react-feather';
import AddNewVolunteer from './AddNewVolunteer';
import { X , Trash2 } from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import apiRequest from '../../utility/apiRequest';
import UpdateVolunteer from './UpdateVolunteer';
import { API_URL } from '../../configs/constants';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);

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

  const getAllVolanteers = async () => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/vol/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      setVolunteers(response.data.slice().reverse());
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
       
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/vol/getAll`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setVolunteers(response.data.slice().reverse());
        } else {
          
          alertTypes.warning( 'Access Denied !' , 'Please log in.');
        }
      } else {
       
        alertTypes.error('Failed to fetch volunteers!')
      }
    } finally {
      setLoading(false);
    }
  };



  const refreshVolunteers = getAllVolanteers();

  useEffect(() => {
    getAllVolanteers();
  }, []);

  if (loading) {
    return <div>Loading Volanteers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  
  const handleDelete = async (volunteerId) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    

    if (result) {
        try {
            const response = await apiRequest(`${API_URL}/vol/delete/${volunteerId}`, {
                method: 'DELETE'
            });
            
            console.log(response.message); 
            setVolunteers(volunteers.filter(volunteer => volunteer.volunteerId !== volunteerId));

            
        } catch (error) {
            console.error(error);
            alertTypes.error('Failed to delete volunteer!'); 
        }
        console.log('Deletion confirmed!');
    }
};




    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


    const handleUpdate = (volunteerId) => {
      setSelectedVolunteerId(volunteerId);
      setModal2(!modal2)};

    const CloseBtn2 = <X className='cursor-pointer' size={15} onClick={ () => handleUpdate()} />
    


  

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start ">
          <CardTitle tag="h4">Volunteers</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add New Volunteer</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Row className="match-height">
        {volunteers.map((volunteer) => (
          <Col lg="4" md="6" key={volunteer.volunteerId}>
            <Card>
              <Button.Ripple
                className="rbutton"
                color="flat-danger"
                onClick={() => handleDelete(volunteer.volunteerId)}
              >
                {" "}
                <Trash2 />{" "}
              </Button.Ripple>

              <Button.Ripple
                className="ebutton"
                color="flat-primary"
                onClick={() => handleUpdate(volunteer.volunteerId)}
              >
                {" "}
                <Edit />{" "}
              </Button.Ripple>
              
              <CardBody className='mt-2'>
                
                
                <CardImg
                  width="200" height="200" style={{ objectFit: 'cover' }}
                  top
                  src={`${API_URL}/${volunteer.image}`}
                  alt={`Volunteer ${volunteer.volunteerId}`}
                />
                
                <CardTitle style={{ maxHeight: '100px', overflow: 'hidden' }} tag="h4">{`${volunteer.name}`}</CardTitle>
                <CardText className='mt-' > {`${volunteer.position}`} </CardText>
                <CardText  className='ml'> {`${volunteer.description}`}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal isOpen={modal} toggle={handleModal}>
        <ModalHeader
          toggle={handleModal}
          close={CloseBtn}
          tag="div"
        ></ModalHeader>
        <AddNewVolunteer open={modal} handleModal={handleModal} />
      </Modal>

      <Modal isOpen={modal2} toggle={handleUpdate}>
        <ModalHeader
          toggle={handleUpdate}
          close={CloseBtn2}
          tag="div"
        ></ModalHeader>
        <UpdateVolunteer open={modal2} volunteerId={selectedVolunteerId}  handleUpdate={handleUpdate} />
      </Modal>
    </Fragment>
  );
};

export default VolunteerList;

