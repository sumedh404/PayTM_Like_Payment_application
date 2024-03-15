import { LogOut } from "./LogOut"
// import { Users } from "./Users"



export const Appbar = () =>{


    return <div className="shadow h-14 flex justify-between">
       <div className="flex flex-col justify-center h-full ml-4">
         PayTM App
       </div>
        <div className="flex">
             <div className="flex flex-col justify-center h-full mr-4">
              Hello 
             </div>
             <div className="">
                <div className="flex flex-col justify-center h-full text-xl">
                <LogOut label={"logOut"}/>
                </div>
             </div>
        </div>
    </div>
}