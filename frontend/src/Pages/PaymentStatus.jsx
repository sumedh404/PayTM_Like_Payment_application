
import {useState, useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentStatus =()=>{

    const[searchParams] = useSearchParams();
    const message = searchParams.get("message");
    const navigate = useNavigate();

    const [count, setCount] = useState(5);

    for(let i = count ; i>=0; i--){
        setCount(count);
    }
    
    useEffect(()=>{

        const userToken = localStorage.getItem("token");


        if(!userToken){
            navigate("/signin")
        }else{
            const t = setTimeout(()=>{
                navigate("/dashboard")
            },5000)

            return ()=> clearTimeout(t)
        }
    },[])

    return(
        <div className="flex justify-center items-center w-screen h-screen">
             <div className="bg-green-300 md:w-1/4 text-center py-10 px-5 m-4 text-green-900 font-bold text-3xl">
                {message}
               <div className="text-center text-black text-sm font-semibold py-4">
                        Redirecting to Dashboard in {count} second...
                </div>
             </div>
        </div>
    )
}