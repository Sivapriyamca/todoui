import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Projectdetails() {
  const { id } = useParams();
  const [projectdetails, setProjectdetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projectwisetasks/${id}`);
      if (response.data) {
        setProjectdetails(response.data);
      } else {
        console.log('Response data is empty');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCheckboxChange = async (taskIndex, status) => {
    try {
      const updatedTasks = [...projectdetails.tasks];
      updatedTasks[taskIndex].status = status;
      setProjectdetails({ ...projectdetails, tasks: updatedTasks });
      await axios.put(`http://127.0.0.1:8000/api/tasks/${updatedTasks[taskIndex].id}`, { status });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="listtable" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
      <MDBTable align='middle' style={{ width: '80%' }} >
        <MDBTableHead>
          <tr>
            <th scope='col' style={{ width: '80%' }}><h2>{projectdetails.project_title}</h2></th>
          </tr>
          <tr><h5>Summary : {projectdetails.completed_task}/{projectdetails.total_task}</h5></tr>
        </MDBTableHead>
        <MDBTableBody>
          <h4>Pending</h4>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                {projectdetails && projectdetails.tasks ? (
                  projectdetails.tasks
                    .filter(task => task.status === 0)
                    .map((task, index) => (
                      <div key={index} className='ms-3 align-items-center'>
                        <MDBCheckbox
                          name={`flexCheck${index}`}
                          checked={false}
                          id={`flexCheckDefault${index}`}
                          label={task.description}
                          onChange={() => handleCheckboxChange(index, 1)}
                        />
                      </div>
                    ))
                ) : (
                    <p>No tasks available</p>
                  )}
              </div>
            </td>
          </tr>
          <h4>Completed</h4>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                {projectdetails && projectdetails.tasks ? (
                  projectdetails.tasks
                    .filter(task => task.status === 1)
                    .map((task, index) => (
                      <div key={index} className='ms-3 align-items-center'>
                        <MDBCheckbox
                          name={`flexCheck${index}`}
                          checked={true}
                          id={`flexCheckDefault${index}`}
                          label={task.description}
                          onChange={() => handleCheckboxChange(index, 0)}
                        />
                      </div>
                    ))
                ) : (
                    <p>No tasks available</p>
                  )}
              </div>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
