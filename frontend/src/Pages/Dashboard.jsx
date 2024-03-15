/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */


// import{User} from "../Components/Users"
import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { LogOut } from "../Components/LogOut";
// import { jwtDecode } from "jwt-decode";

export const Dashboard =() =>{

    const[balance, setBalance] = useState("");
    // const [user, setUser] = useState("");
    const navigate = useNavigate();


    useEffect(()=>{

      const userToken = localStorage.getItem("token");

      if(!userToken){
        navigate("/signin");
      }else{
        
        axios.get("http://localhost:3000/api/v1/account/balance",{
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then(res =>{
          setBalance(res.data.balance);
        })
        .catch((err) =>{
            navigate("/signin")
        })
      }
    },[navigate])

    return <div>
   <Appbar/>
    <div className="m-8">
      <Balance value={balance}/>
      <Users />
     
    </div>

    </div>
}

