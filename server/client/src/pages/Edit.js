import React from 'react'
import './style.css';
import { useState , useEffect } from 'react';
import axios from 'axios'
// import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Edit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState ({
        title : "",
        isCompleted: ""
      });

      useEffect(() => {
        const fetchSingleData = async () => {
           const res = await axios.get(`http://localhost:9001/api/v1/todos/${id}`)
           setInput(res.data)
        }
        fetchSingleData();
      },[id])


      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:9001/api/v1/todos/${id}`, input);
            if(res.status === 200){
                navigate("/")
            }

        } catch (error) {
            alert(error.response.data.message)
        }
      }

  return (
    <div className='container'>
    <div>
    <h1>MERN TODO APP</h1>
    <p>This app developed using MERN stack</p>
  </div>
      <form className='inputs' onSubmit={handleUpdate} >
          <label>Add task</label>
          <input type="text" 
            name = "title"
            value={input.title}
            onChange={(e) => setInput({...input, [e.target.name] : e.target.value })}
            placeholder='Enter your Task' 
            className='form-control'/>

          <div className='check'>  
          <input type="checkbox"
          className='form-control' 
          name ="isCompleted"
          onChange={(e) => setInput({...input, [e.target.name] : e.target.checked })}/>
          <label>Task Completed</label>
          </div>
          <button type= 'submit' className='add-btn'>Update Task</button>
      </form>
    
     
  </div>

)
  
}

export default Edit