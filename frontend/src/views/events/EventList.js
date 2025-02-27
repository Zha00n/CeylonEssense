import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col, CardHeader, Modal, ModalHeader } from 'reactstrap';
import { Edit, Plus } from 'react-feather';
import AddNewEvent from './AddNewEvent';
import { X , Trash2 } from 'react-feather';
import { alertTypes } from '../../utility/alertUtils';
import apiRequest from '../../utility/apiRequest';
import UpdateEvent from './UpdateEvent';
import { API_URL } from '../../configs/constants';


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

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

  const getAllEvents = async () => {
    try {
      let token = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/ev/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      setEvents(response.data.slice().reverse());
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
       
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          
          const newToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${API_URL}/ev/getAll`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setEvents(response.data.slice().reverse());
        } else {
          
          alertTypes.warning( 'Access Denied !' , 'Please log in.');
        }
      } else {
       
        alertTypes.error('Failed to fetch events!')
      }
    } finally {
      setLoading(false);
    }
  };



  const refreshEvents = getAllEvents();

  useEffect(() => {
    getAllEvents();
  }, []);

  if (loading) {
    return <div>Loading Events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  
  const handleDelete = async (eventId) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    

    if (result) {
        try {
            const response = await apiRequest(`${API_URL}/ev/delete/${eventId}`, {
                method: 'DELETE'
            });
            
            console.log(response.message); 
            setEvents(events.filter(event => event.eventId !== eventId));

            
        } catch (error) {
            console.error(error);
            alertTypes.error('Failed to delete event!'); 
        }
        console.log('Deletion confirmed!');
    }
};




    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


    const handleUpdate = (eventId) => {
      setSelectedEventId(eventId);
      setModal2(!modal2)};

    const CloseBtn2 = <X className='cursor-pointer' size={15} onClick={ () => handleUpdate()} />
    


  

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start ">
          <CardTitle tag="h4">Events</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add New Event</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Row className="match-height">
        {events.map((event) => (
          <Col lg="4" md="6" key={event.eventId}>
            <Card>
              <Button.Ripple
                className="rbutton"
                color="flat-danger"
                onClick={() => handleDelete(event.eventId)}
              >
                {" "}
                <Trash2 />{" "}
              </Button.Ripple>

              <Button.Ripple
                className="ebutton"
                color="flat-primary"
                onClick={() => handleUpdate(event.eventId)}
              >
                {" "}
                <Edit />{" "}
              </Button.Ripple>
              
              <CardBody className='mt-2'>
                <CardTitle style={{ maxHeight: '100px', overflow: 'hidden' }} tag="h4">{`${event.topic}`}</CardTitle>
                
                <CardImg 
                  width="200" 
                  height="200" 
                  style={{ objectFit: 'cover' }}
                  top
                  src={`${API_URL}/${event.image}`}
                  alt={`Event ${event.eventId}`}
                />
                
                <CardText style={{ maxHeight: '85px', overflow: 'hidden' }} className='mt-2' > {`${event.desc}`} </CardText>
                <CardText className='ml'>Date : {`${event.date}`}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal size='lg' isOpen={modal} toggle={handleModal}>
        <ModalHeader
          toggle={handleModal}
          close={CloseBtn}
          tag="div"
        ></ModalHeader>
        <AddNewEvent open={modal} handleModal={handleModal} />
      </Modal>

      <Modal size='lg' isOpen={modal2} toggle={handleUpdate}>
        <ModalHeader
          toggle={handleUpdate}
          close={CloseBtn2}
          tag="div"
        ></ModalHeader>
        <UpdateEvent open={modal2} eventId={selectedEventId}  handleUpdate={handleUpdate} />
      </Modal>
    </Fragment>
  );
};

export default EventList;

