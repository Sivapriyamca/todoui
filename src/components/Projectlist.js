import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody,MDBCardFooter,MDBBtn,MDBCardText,MDBCardBody,MDBCardTitle,MDBCardHeader,MDBCard } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Projectdetails from './Projectdetails';
export default function Projectlist() {
  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getprojectlist');
      if (response.data) {
        setProjects(response.data.projects);
        console.log(response.data.projects)
      } else {
        console.log('Response data is empty');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/deleteproject/${id}`);
      
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="listtable" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#75F6F8' }}>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'><h2>Project Lists</h2> </th>
          </tr>
          <tr>
          
          <Link to={`/Projectadd`} className="add-button"> <h4>Add Project</h4></Link>
       
          </tr>

        </MDBTableHead>
        <MDBTableBody>
          {projects.map(project => (
           
            <tr key={project.id}>
           
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3 align-items-center'>
                    <p className='fw-bold mb-1 align-items-center'>
                      <Link to={`/Projectdetails/${project.id}`} className="add-button"> <h4>{project.title}</h4></Link>
                    </p>
                  </div>
                </div>
              </td>
              {/* <td>
            <Link to={`/Update/${project.id}`} className="edchroit-button"> Edit</Link>

            </td> */}
              <td>
              <button className="delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
            </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
     
    

   
      
    </div>
    
  );
}
