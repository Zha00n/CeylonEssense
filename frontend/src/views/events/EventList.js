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
  const [selectedid, setSelectedid] = useState(null);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/event/all`);
      
      setEvents(response.data.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      alertTypes.error('Failed to fetch events!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const handleDelete = async (id) => {
    const result = await alertTypes.confirmText('Are you sure?', "You won't be able to revert this!");
    
    if (result) {
      try {
        let token = localStorage.getItem('accessToken');
        
      
        const response = await axios.post(
          `${API_URL}/api/event/delete`, 
          { id: id },  
          {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          }
        );
  
        
        if (response.data.status === 'success') {
          // alertTypes.success(response.data.msg || 'event deleted successfully.');
          
          
          setEvents(events.filter(event => event.id !== id));
        } else {
          alertTypes.error(response.data.msg || 'Failed to delete event!');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alertTypes.error('Failed to delete event!');
      }
    }
  };
  




    
    const handleModal = () => setModal(!modal)
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />


    const handleUpdate = (id) => {
      setSelectedid(id);
      setModal2(!modal2);
          
    };

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
        {events.map((event , index) => (
          <Col lg="4" md="6" key={event.id || index}>
            <Card>
              <Button.Ripple
                className="rbutton"
                color="flat-danger"
                onClick={() => handleDelete(event.id)}
              >
                {" "}
                <Trash2 />{" "}
              </Button.Ripple>

              <Button.Ripple
                className="ebutton"
                color="flat-primary"
                onClick={() => handleUpdate(event.id)}
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
                  src={`${event.image}`}
                  alt={`Event ${event.id}` || index}
                />
                
                <CardText style={{ maxHeight: '85px', overflow: 'hidden' }} className='mt-2' > {`${event.description}`} </CardText>
                <CardText className='ml'>Date : {`${event.date.split(' ')[0]}`}</CardText>
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
        <UpdateEvent open={modal2} id={selectedid}  handleUpdate={handleUpdate} getAllEvents={getAllEvents} handleModal={handleModal}/>
      </Modal>
    </Fragment>
  );
};

export default EventList;

