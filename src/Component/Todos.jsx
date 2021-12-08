import React, {useEffect, useState} from 'react';
import {doGet} from "../Service";
import Todo from "../Pages/Todo";
import SelectUser from "./SelectUser";

function Todos(props) {
    const [todos, setTodos] = useState([])
    const [data, setData] = useState([])
    const [boolean, setBoolean] = useState(false)
    const [isFiltering, setFiltering] = useState(false)
    const [currentUser, setCurrentUser] = useState('')
    const [page,setPage]=useState(1)

    async function todoService() {
        const res = await doGet('todos')
        const setRes=res.filter((item,index)=>index>=0 && index<10)
        setTodos(setRes)
        setData(res)
    }

    function filter(userId,completed,page) {
        return data.filter((item ,index)=> (item.userId == userId || userId == '') && (item.completed === completed || !isFiltering)).filter((item,index)=>{
           return  index>=(page-1)*10 && index<page*10
        })

    }

    function onchangehandle(userId) {
        let res = filter(userId , boolean,page)
        setTodos(res)
        setCurrentUser(userId)
    }

    const handleCheck = (event) => {
        let checked = event.target.checked
        setBoolean(checked)
        const res= filter(currentUser,checked,page)
        setTodos(res)
        console.log(todos)
        setFiltering(true)
    }
    const reset = () => {
        setTodos(data)
        setBoolean(false)
        setFiltering(false)
        setCurrentUser('')
    }
    useEffect(() => {
        todoService()
    }, [])
    const prev=()=>{
       if (page>1){
           setPage(page=>page-1)
       }
    }
    useEffect(()=>{
      const res= filter(currentUser,boolean,page)
        setTodos(res)
    },[page])
    const next=()=>{
        if (page<todos.length+1){
            setPage(page=>page+1)
        }
    }
    const onchangeHandler=(userId)=>{

    }
    return (
        <div className={'mt-5'}>
            <div className="row">
                <div className="col-md-3">
                    <SelectUser onChange={onchangehandle} />
                </div>
                <div className="col-md-1">
                    <button onClick={reset} className={'btn btn-dark'}>reset</button>
                </div>

                <div className="col-md-3 mt-1 pb-2">
                    <label>
                        <span className={'m-3 mt-5'}>Complete</span>
                        <input checked={boolean} onChange={handleCheck} className={'todo-check'} type="checkbox"/>
                    </label>
                </div>
            </div>
            {
                todos.map(item => <Todo item={item} key={item.id}/>)
            }
            <div className="row">
                <div className="col-md-1">
                    <button onClick={prev} className={'btn btn-block btn-dark'}>Prev</button>
                </div>
                <div className="col-md-1">
                    <h1>{page}</h1>
                </div>
                <div className="col-md-1">
                    <button onClick={next} className={'btn btn-block btn-dark'}>next</button>
                </div>
            </div>

        </div>
    );
}

export default Todos;