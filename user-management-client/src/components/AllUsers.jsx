import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "./Modal";
//
const AllUsers = () => {
  const users = useLoaderData();
  const [newUsers, setNewUsers] = useState(users) || [];

  const [userInfo , setUserInfo] = useState();
  const [gender , setGender] = useState()

  // 
  const handlePopUp = (id) => {
    setUserInfo( newUsers.find( item => item._id === id))
    //
    setTimeout(() => {
      document.getElementById("my_modal_5").showModal();
    }, 500);
    // 
   
  };

  //  delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("item-delete from database");
        setNewUsers(newUsers.filter((user) => user._id !== id));
      });
  };

  //
  return (
    <div className="p-20 ">
      <Link to="/addUsers">
        {" "}
        <button className="btn text-xl mb-8">
          <span>New User</span> <FaRegUser />
        </button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-black text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>@Email</th>
              <th>@Gender</th>
              <th>@Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {newUsers.map((user, index) => (
            <tbody key={index}>
              {/* row 1 */}
              <tr className="hover:bg-slate-100 transition-all">
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.gender}</td>
                <td>{user?.status}</td>
                <td className="flex gap-2 text-xl">
                  <CiEdit
                    onClick={()=>handlePopUp(user._id)}
                    className="bg-white shadow-md w-10 h-8 p-1 hover:bg-slate-300 rounded-md transition-all"
                  />{" "}
                  <MdDeleteForever
                    onClick={() => handleDelete(user._id)}
                    className="bg-white shadow-md w-10 h-8 p-1 hover:bg-slate-300 rounded-md transition-all"
                  />
                </td>
              </tr>
              {/*  */}
              <Modal user={userInfo } />
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
