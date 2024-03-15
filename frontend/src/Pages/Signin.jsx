

import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { Button } from "../Components/Button"
import { BottomWarning } from "../Components/BottomWarning"
import { SubHeading } from "../Components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export const Signin =() =>{


      const[username, setUsername] = useState("");
      const[password, setPassword] = useState("");

      const navigate = useNavigate();


      useEffect (()=>{

        const userToken = localStorage.getItem("token");

        if(userToken){
          navigate("/dashboard");
        }
      },[navigate]);


   const hUsername = (event)=>{
        setUsername(event.target.value);
   }
   const hPassword = (event)=>{
    setPassword(event.target.value);
   }

    return <div className="bg-slate-300 h-screen flex justify-center">
       <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Heading label={"Sign in"}/>
              <SubHeading label={"Enter your credentials to access your account"}/>
              <InputBox onChange={hUsername} placeholder="Email" lable={"Email"}/>
              <InputBox onChange={hPassword} placeholder="Password" lable={"Password"}/>

              <div className="pt-4">
                 <Button label={"Sign In"} onClick={async ()=>{
                        const userData = {
                            username: username,
                            password: password
                        }
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", userData)
                        localStorage.setItem("token",res.data.token);
                          navigate("/dashboard")
                 }}/>
              </div>
               <BottomWarning label={"Don't have account"} buttonText={"Sign Up"} to={"/signup"}/>
          </div>
       </div>
    </div>
}