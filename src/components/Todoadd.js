import React, { useState } from 'react';
import axios from 'axios';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addtodo() {
  const notify = () => toast.success('Data successfully saved!');
  const [formData, setFormData] = useState({
    project_id: '',
    description: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/addtodo', formData);
      setFormData({
        project_id: '',
        description: '',
        status: '',
      });
      notify(); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <MDBInput
        type='text'
        id='project_id'
        name='project_id'
        value={formData.project_id}
        onChange={handleInputChange}
        wrapperClass='mb-4'
        label='Project ID'
      />
      <MDBInput
        type='text'
        id='description'
        name='description'
        value={formData.description}
        onChange={handleInputChange}
        wrapperClass='mb-4'
        label='Description'
      />
      <MDBInput
        type='text'
        id='status'
        name='status'
        value={formData.status}
        onChange={handleInputChange}
        wrapperClass='mb-4'
        label='Status'
      />
      <MDBBtn type='submit' className='mb-4' block>
        Add
      </MDBBtn>
    </form>
  );
}

export default Addtodo;
