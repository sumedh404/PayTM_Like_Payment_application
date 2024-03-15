/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button} from "./Button";

export const Users = () =>{

    const[users, setUsers] = useState([]);
    const[filter, setFilter] = useState("")

    useEffect(()=>{
           axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
              .then((res) => {
                setUsers(res.data.user)
              })
    },[filter])

    
    return <div>
    <div className="font-bold mt-6 text-lg">
      Users
    </div>
    <div className="my-2">
       <input onChange={(event) =>{
        setFilter(event.target.value)
    }} type="text" placeholder="Search users...." className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
    <div>
      {users.map((user)=> <User key={user._id} user={user}/>)}
    </div>
    </div>
}

function User({user}){

    const navigate = useNavigate();

    const handleClick = ()=>{
     
    }

    return<div className="flex justify-between">
       <div className="flex">
         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
             {user.firstName[0].toUpperCase()}
             </div>
         </div>   
       <div className="flex flex-col justify-center h-full">
         <div>
            {user.firstName}{user.lastName}
         </div>
       </div>
       </div>
       <div className="flex flex-col justify-center h-full">
         <Button onClick={ ()=>{
          navigate("/send?id= " + user._id +" &name= " + user.firstName )
          // navigate(`/send?id=${user._id} "  " &name=${user.firstName}`)
       }} label={"Send Money"} /> 
       </div>
    </div>
    
}

