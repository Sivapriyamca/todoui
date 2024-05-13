
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import Table from 'react-bootstrap/Table';
  import axios from 'axios';
  import { Link } from 'react-router-dom';
  import React, { useState, useEffect } from 'react';
 
  function Todolist() {

    const [todos, setTodos] = useState([]);
    useEffect(() => {
      fetchData();
      
    }, []);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/gettodolist');
        if (response.data) {
          setTodos(response.data.todos);
          console.log(response.data.todos);
        } else {
          console.log('Response data is empty');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return (
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th><Link to={`/Addtodo`} className="add-button"> <h4>Add Todo</h4></Link></th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(todos) && todos.map(todo => (
       
        <tr key={todo.id}>
         
          <td>{todo.description}</td>
          {/* <td><Link to={`/todoupdate/${todo.id}`} className="add-button"> <h4>Edit</h4></Link></td> */}
     
        </tr>
       ))}
      </tbody>
    </Table>
        </Card.Body>
      </Card>
    );
  }
  
  export default Todolist;