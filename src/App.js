import logo from './logo.svg';
import './App.css';
import Projectlist from './components/Projectlist';
import Projectdetails from './components/Projectdetails';
import Projectadd from './components/projectadd';
import Todolist from './components/todolist';
import Addtodo from './components/Todoadd';

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
   
       <BrowserRouter>
      <Routes>
      <Route path="/" element={<Projectlist />}></Route>
      <Route path="Projectlist" element={<Projectlist />} />
      <Route path="Projectdetails/:id" element={<Projectdetails />} />
      <Route path="Projectadd" element={<Projectadd />} />
      <Route path="Todolist" element={<Todolist />} />
      <Route path="Addtodo" element={<Addtodo />} />
      </Routes>
    </BrowserRouter>
    
    </div>
   
  );
}

export default App;
