/* eslint-disable react/prop-types */


import { useNavigate } from "react-router-dom";

export const LogOut=({label})=>{

    const navigate = useNavigate();
    
    const onClickBtn=() => {
        localStorage.removeItem('token');
        navigate("/signin");
    }
    return <button onClick={onClickBtn} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm ox-5 py-2.5 me-2 mb-2">
      
      {label}
      </button>
}