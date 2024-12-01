import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading , setLoading] = useState(true);
   useEffect(()=>{
       setTimeout(() => {
        setLoading(false)
       },1000 );
   },[])

  return (
    <div className="container w-11/12 mx-auto">
      {
        loading ? <div className="min-h-dvh flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div> : <div className="border-8 border-green-600 min-h-dvh pb-20">
        <h1 className="capitalize text-3xl text-center font-semibold text-[#111111] p-8 bg-green-200">user management systems</h1>
           <Outlet/>
    </div>
      }
         
    </div>
  );
};

export default App;