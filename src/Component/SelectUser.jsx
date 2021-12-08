import React, {useEffect, useState} from "react"
import {doGet} from "../Service";

function SelectUser({onChange,name}){
    const [users,setUsers]=useState([])
    const [currentUser,setCurrentUser]=useState('')
    async function userService(){
        const res=await doGet('users')
        setUsers(res)
    }
    const onChangeHandler=(event)=>{
        const id=event.target.value
        const id2=id===''?'':parseInt(id)
        setCurrentUser(id2)
        if (onChange){
            onChange(id2)
        }

    }

    useEffect(()=>{
        userService()
    },[])
    return <select name={name} className={'form-control'} value={currentUser} onChange={onChangeHandler}>
        {
            users.map((item,index)=>{
                return <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            })
        }
    </select>
}
export default SelectUser