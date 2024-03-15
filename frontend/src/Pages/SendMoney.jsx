/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const SendMoney = () => {
  const navigate = useNavigate();
  

  
    useEffect(() => {
      const userToken = localStorage.getItem("token");
  
      if (!userToken) {
        navigate("/signin");
      }
    }, []);



  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  // const [amount, setAmount] = useState(0);
  const [amount, setAmount] = useState(0);


  const onClickBack=()=>{
      navigate("/dashboard")
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name && name.length > 0 && name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-diabled:opacity-70">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                ></input>
              </div>
              <button
                // onClick={async () => {
                  
                //   const res = await axios.post(
                //     "http://localhost:3000/api/v1/account/transfer",
                //     {
                //       to:id,
                //       amount
                //     },
                //     {
                //       headers: {
                //         Authorization:"Bearer " + localStorage.getItem("token"),
                //       },
                //     }
                //   )
                //   navigate("/paymentstatus?message="+ res.data.message);
                  // navigate("/paymentstatus?mesage=" + res?.data.message);
                  // console.log(res.data.message);

                  //}}

                  onClick={async  ()=> {

                  // try {

                    

                    const res = await axios.post(
                      "http://localhost:3000/api/v1/account/transfer", {
                        amount : amount,
                      to: id,
                    },
                      {
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );

                    // Check if the response contains the expected data
                    console.log(res);
                    if (res.data && res.data.message) {
                      // Navigate to paymentstatus with the message as a query parameter
                      navigate("/paymentstatus?message=" + encodeURIComponent(res.data.message));
                    } else {
                      console.error("Invalid response from server");
                    }
                  // } catch (error) {
                    // console.error("Error transferring funds:", error);
                    // Handle error: show an error message or redirect to an error page
                  // }
                }}
                
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>

              <button
                onClick={onClickBack}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"
              >
                Cancel & Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
