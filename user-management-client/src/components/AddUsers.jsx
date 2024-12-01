import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
const AddUsers = () => {
    // 
    const handleSubmit =(e)=>{
      e.preventDefault();
    //   
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const gender = form.radio1.value;
      const status = form.radio2.value;
       const userInfo ={ name , email, gender, status}
      //  
    
       fetch('https://user-management-server-six.vercel.app/users',{
        method:'POST',
        headers:{
            "content-type" : 'application/json'
        },
        body: JSON.stringify(userInfo)
       })
       .then (res=> res.json())
       .then ( data => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User SuccessFully Added",
          showConfirmButton:true,
          timer: 1500
        });
        form.reset();
       })
    }

// 
  return (
    <div className="py-20  ">
       <Link to="/"> <button className="flex justify-start items-center gap-2 text-xl text-slate-600 ml-20"><MdKeyboardDoubleArrowLeft className="text-2xl" /> <span>All Users</span></button></Link>
      <div className="space-y-4 text-center mb-16">
        <h1 className="capitalize text-slate-700 font-semibold text-3xl">
          New users
        </h1>
        <p className="text-slate-400">
          Use the below form to create a new account
        </p>
      </div>

      {/*  */}
      <form onSubmit={handleSubmit} className="w-7/12 mx-auto">
        <div className="flex flex-col justify-center gap-6 ">
          <label className="text-slate-200 ">
            {" "}
            Name
            <input
              type="text"
              name="name"
              placeholder="Type User Name"
              className="input input-bordered w-full mt-2 text-slate-500 "
            />
          </label>
          {/*  */}

          <label className="text-slate-200">
            {" "}
            Email
            <input
              type="text"
              name="email"
              placeholder="Type User Email"
              className="input input-bordered w-full mt-2 text-slate-500"
            />
          </label>

          <div className="flex justify-start items-start gap-6">
            <span className="text-slate-300">Gender : </span>
            <input
              type="radio"
              name="radio1"
              value="male"
              className="radio radio-success"
              defaultChecked
            />{" "}
            <span>Male</span>
            <input
              type="radio"
              name="radio1"
              value="female"
              className="radio radio-success ml-12"
            />
            <span>Female</span>
          </div>

          {/*  */}
          <div className="flex justify-start items-start gap-6">
            <span className="text-slate-300">Status : </span>
            <input
              type="radio"
              name="radio2"
              value="active"
              className="radio radio-success"
              defaultChecked
            />{" "}
            <span>Active</span>
            <input
              type="radio"
              name="radio2"
              value="inactive"
              className="radio radio-success ml-12"
            />
            <span>Inactive</span>
          </div>
        </div>
         <input type="submit" value="Save" className="text-xl font-semibold text-slate-600 bg-green-500 w-full rounded-md py-2 mt-8 transition-all hover:bg-slate-400" />
      </form>
    </div>
  );
};

export default AddUsers;
