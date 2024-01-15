import React ,{useState,useRef,useEffect} from 'react'
import './Todo.css'

import { IoMdDoneAll } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
 
const Todo = () => {
  const [input,setInput] = useState('')

  const [ToDo,setTodo] = useState([])

  const [editId,setEditId] = useState(0)


  const handleSubmit =((e)=>{
    e.preventDefault();

  })


  const addTodo =(() =>{
   if(input !== ''){
    setTodo([...ToDo,{list:input,id:Date.now(),status : false}])
    console.log(ToDo)
    setInput('')
    }
    
    if(editId){
      const editzzz = ToDo.find((k)=>k.id == editId)
      const updateTodo = ToDo.map((v)=> v.id === editzzz.id
      ? (v = {id : v.id, list:input })
      :(v = {id: v.id, list:v.list}))

      setTodo(updateTodo)
      setEditId(0)
      setInput('')
    }

  })

  const inputRef = useRef('null')

  useEffect(()=>{
    inputRef.current.focus();

  })  // Dependancy:means an empty array

  const onDelete =((id) =>{
    setTodo(ToDo.filter((i) => i.id !== id))

  })

  const onComplete = ((id) =>{
   let complete = ToDo.map((list)=>{
    if(list.id === id){
      return ({...list,status: !list.status})
    }
    return list
     
   })
   setTodo(complete)
  })
 
  const onEdit = ((id) =>{
    const editTodo = ToDo.find((i)=> i.id === id)
    console.log('edit id '+editTodo.list)
    setInput(editTodo.list)
    setEditId(editTodo.id)
    console.log(editTodo)

  })

  return (
    <div className='container ' style={{marginInline: 'auto'}}>
      <h1>ToDo</h1>
      <form className='form-group' onSubmit={handleSubmit}> 
        <input type="text" value = {input} ref ={inputRef} placeholder='Enter your TODO'  onChange={(e)=>setInput(e.target.value)}/> 
        <button onClick = {addTodo}> {editId ? 'EDIT':'ADD'}</button>
      </form>
      <div className='list'>
        <ul>
          {ToDo.map((i)=>(
            <li className='list-items'>
              <div className='list-item-list' id= {i.status ? 'list-item' :'' }>{i.list}</div>  
            <span>
              <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(i.id)}/>
              <FaEdit className='list-item-icons' id='edit' title ="Edit" onClick ={()=>onEdit(i.id)}/>
              <MdDelete className='list-item-icons' id='delete' title = "Delete" onClick={()=>onDelete(i.id)}/>



            </span>
            
            
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo