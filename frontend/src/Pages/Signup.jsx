
import {Heading} from "../Components/Heading"
import {SubHeading} from "../Components/SubHeading"
import {InputBox} from "../Components/InputBox"
import {Button} from "../Components/Button"
import {BottomWarning} from "../Components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Signup =() =>{

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const hUsername = (event)=>{
    setUsername(event.target.value);
  }

  const hPassword = (event)=>{
    setPassword(event.target.value);
  }

  const hFirstName = (event)=>{
    setFirstName(event.target.value);
  }

  const hLastName = (event)=>{
    setLastName(event.target.value);
  }


    return <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Heading label={"Sign Up"}/>
              <SubHeading label={"Enter your information to create an account"}/>
              <InputBox onChange={hFirstName} placeholder="eg: Peter " label={"First Name"}/>
              <InputBox onChange={hLastName} placeholder="eg: Parker " label={"Last Name"}/>
              <InputBox onChange={hUsername} placeholder="eg: example@gmail.com" label={"Email"} />
              <InputBox onChange={hPassword} placeholder="eg: 1234 or xyz@" label={"Password"}/>
              
              <div className="pt-4">
              <Button onClick={async () => {

                const userData = {
                  username,
                  firstName,
                  lastName,
                  password
                };

                try{

                  const response = await axios.post("http://localhost:3000/api/v1/user/signup", userData);
                  localStorage.setItem("token", response.data.token)
                  navigate("/dashboard")
                }catch(error){
                  console.log("Error siginin up :" , error);
                }
              }} label={"Sign up"} />
              </div>
              <BottomWarning label={"Already have account?"} buttonText={"Sign in"} to={"/signin"}/>
         </div>
      
      </div>
    </div>
}