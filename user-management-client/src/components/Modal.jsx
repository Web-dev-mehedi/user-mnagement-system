import React, { useEffect, useState } from "react";
import { GiCrossMark } from "react-icons/gi";

const Modal = ({user}) => {

   const {name , email , gender, status, _id} = user||{}
   const [gendery, setGender] = useState(gender);
   const [statuss, setStatus] = useState(status );
    // 
    const handleUpdate = (e) => { 
        // 
        e.preventDefault()
        //
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.radio1.value;
        const status = form.radio2.value;
         const updateduserInfo ={ name , email, gender, status}
    

        //  
        fetch(`http://localhost:5000/users/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateduserInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            alert("item updated");
          });
      };
// 

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box px-8 py-12 relative">
          <div className=" ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                title="click to cancle"
                className="absolute  right-1 top-1 bg-slate-400 p-2 rounded-full text-yellow-600"
              >
                <GiCrossMark />
              </button>
            </form>
          </div>
          <form onSubmit={handleUpdate} className="w-full mx-auto">
            <div className="flex flex-col justify-center gap-6 ">
              <label className="text-slate-200 ">
                {" "}
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter updated name"
                   defaultValue={name}
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
                  placeholder="Enter updated email"
                  defaultValue={email}
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
                  defaultChecked = {gendery === "male"}
                  onChange={()=>setGender('male')}
                />{" "}
                <span>Male</span>
                <input
                  type="radio"
                  name="radio1"
                  value="female"
                  className="radio radio-success ml-12"
                  defaultChecked = {gendery === "female"}
                  onChange={()=>setGender('female')}
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
                  defaultChecked ={statuss === "active"}
                  onChange={()=>setStatus('female')}
                />{" "}
                <span>Active</span>
                <input
                  type="radio"
                  name="radio2"
                  value="inactive"
                  className="radio radio-success ml-12"
                  defaultChecked ={statuss === "inactive"}
                  onChange={()=>setStatus('female')}
                />
                <span>Inactive</span>
              </div>
            </div>
            <input
              type="submit"
              value="Save"
              className="text-xl font-semibold text-slate-600 bg-green-500 w-full rounded-md py-2 mt-8 transition-all hover:bg-slate-400"
            />
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
