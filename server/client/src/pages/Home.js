import React from 'react'
import './style.css';
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete } from 'react-icons/ai'
import { useState , useEffect } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'



const Home = () => {

  const [todos, setTodos] = useState  ([]);
  const [render, setRender] = useState  ();
  const [input, setInput] = useState ({
    title : "",
    isCompleted: ""
  });

  useEffect (() => {
    const fetchAllTodos = async () => {
      const res = await axios.get("http://localhost:9001/api/v1/todos");
      setTodos(res.data);
      
    };
    fetchAllTodos()
  }, [render])


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:9001/api/v1/todos", input);
      setRender(true);
    }catch(error){
      alert(error.response.data.message);
    }
  };

  const handleDelete = async(id) => {
    await axios.delete(`http://localhost:9001/api/v1/todos/${id}`)
    const remainingItems = todos.filter((item) =>{
      return item._id !== id;
    });
    setTodos(remainingItems);
  }


  return (
    
    <div className='container'>
      <div>
      <h1>MERN TODO APP</h1>
      
      <p>This app developed using MERN stack</p>
    </div>
        <form className='inputs' onSubmit={handleSubmit}>
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
            <label>is in progress</label>
            </div>
            <button type='submit' className='add-btn'>Add Todo</button>
        </form>

        <div>
          <table className='content-table'>
            <thead>
              <tr>
                {/* <th>id</th> */}
                <th>Title</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                todos && todos.length > 0 ?
                ( todos.map((item) => {
                  return(
                  <tr key={item._id}>
                    {/* <td>{item._id}</td> */}
                    <td>{item.title}</td>
                    <td>{item.isCompleted === "true" ? 
                    (<span className='completed'>Completed</span>):
                    (<span className='progress'>Progress</span>)}
                    </td>
                    <td>
                      <Link to={`/edit/${item._id}`}>
                      <button className='edit'><FiEdit className='fitedit' />Edit</button>   
                      </Link>
                      </td>
                    <td>

                      <button onClick={() => handleDelete(item._id)} className='delete'><AiOutlineDelete className='aidelete' size={20} />Delete</button>
                      
                      </td>
                  </tr>
                  )
                })) : 
                
                (
                <tr>
                  <td>No Todos Found</td>
                </tr>
                )

              }

             

              {/* <tr>
                <td>1</td>
                <td>wakeup and then preactice</td>
                <td>Demo</td>
                <td><button className='edit'><FiEdit  className='fitedit'/>Edit</button></td>
                <td><button className='delete'><AiOutlineDelete className='aidelete'size={20} />Delete</button></td>
              </tr>

              <tr>
                <td>1</td>
                <td>Coding</td>
                <td>Demo</td>
                <td><button className='edit'><FiEdit className='fitedit' />Edit</button></td>
                <td><button className='delete'><AiOutlineDelete className='aidelete'size={20} />Delete</button></td>
              </tr> */}

              
            </tbody>
          </table>
        </div>
    </div>

  )
}

export default Home