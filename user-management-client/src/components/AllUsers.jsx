import React, { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "./Modal";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.init";
//
const AllUsers = () => {
  const { user , setUser , Toast  } = useContext(AuthContext);

  //
  const users = useLoaderData();
  const [newUsers, setNewUsers] = useState(users) || [];

  const [userInfo, setUserInfo] = useState();

  //
  const handlePopUp = (id) => {
    setUserInfo(newUsers.find((item) => item._id === id));
    //
    document.getElementById("my_modal_5").showModal();
    //
  };

  //  delete
  const handleDelete = (id) => {
    //
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //
        fetch(`https://user-management-server-six.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            //
            setNewUsers(newUsers.filter((user) => user._id !== id));
          });
      }
    });
  };


  // signout from firebase
   const handleSignOut=()=>{
    //  
    signOut(auth)
    .then(()=>{
      Toast.fire({
        position: "top",
        icon: "info",
        title: "🔔⚡SignOut Successfully 🎉 ",
      });
      setUser("")
    }).catch( err=>{

    })
   }


  //
  return (
    <div className="p-20 ">
      {/*  */}
      <div className="flex justify-between gap-4 flex-wrap">
        <Link to="/addUsers">
          {" "}
          <button className="btn text-xl mb-8">
            <span>Add New User</span> <FaRegUser />
          </button>
        </Link>

        <div className="flex gap-6">
           <button type="button" className="btn text-xl ">Total Users : {newUsers.length}</button>
          {!user ? (
            <Link to="/login">
              <button className="btn btn-warning text-white text-xl">
                <FaRegUser className="rounded-full w-10 h-10 p-2 mx-auto bg-slate-200 text-yellow-500 mr-2" />{" "}
                Log In
              </button>
            </Link>
          ) : (
            <>
              <button title={user?.email} className="btn capitalize text-lg">
                {" "}
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                />{" "}
                {user?.displayName}
              </button>
             <Link to="/"> <button onClick={handleSignOut} className="btn btn-warning text-white">Sign Out</button></Link>
            </>
          )}
        </div>
      </div>
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
          {newUsers?.map((user, index) => (
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
                    onClick={() => handlePopUp(user._id)}
                    className="bg-white shadow-md w-10 h-8 p-1 hover:bg-slate-300 rounded-md transition-all"
                  />{" "}
                  <MdDeleteForever
                    onClick={() => handleDelete(user._id)}
                    className="bg-white shadow-md w-10 h-8 p-1 hover:bg-slate-300 rounded-md transition-all"
                  />
                </td>
              </tr>
              {/*  */}
              <Modal user={userInfo} />
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
