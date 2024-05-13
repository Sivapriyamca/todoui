import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from 'mdb-react-ui-kit';

function Projectadd() {
  
  const notify = () => toast.success('Data successfully saved!');
  const [formData, setFormData] = useState({
    title: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/addproject', formData);
      setFormData({
        title: '',
      });
      console.log(formData);
      
     
    } catch (error) {
      console.error('Error adding project:', error);
      
    }
  };


  return (
    <MDBContainer fluid>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' >
        <MDBCardBody className='p-5 text-center' >
          <h2 className="fw-bold mb-5">Add new Project</h2>
          <form onSubmit={handleFormSubmit}>
            <MDBRow>
              <MDBCol col='4'>
                <MDBInput wrapperClass='mb-4' label='Title' id='title' type='text' name='title' value={formData.title} onChange={handleInputChange} />
              </MDBCol>
            </MDBRow>
          <MDBContainer>
          <MDBBtn className='w-100 mb-4' size='md' onClick={notify} type='submit'>
              Add
            </MDBBtn>
            <ToastContainer />
            

          </MDBContainer>
           
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}


export default Projectadd;

