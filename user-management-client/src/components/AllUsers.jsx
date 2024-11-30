import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
const AllUsers = () => {
  const users = useLoaderData();

  //
  return (
    <div className="p-20">
        <Link to='/addUsers'> <button className="btn text-xl mb-8"><span>New User</span> <FaRegUser /></button></Link>
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
            {users.map((user , index) => (
              <tbody key={index}>
                {/* row 1 */}
                <tr className="hover:bg-slate-100 transition-all">
                  <th>{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user.email}</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td className="flex gap-2 text-xl">
                    <CiEdit className="bg-white shadow-md w-10 h-8 p-1 hover:bg-slate-300 rounded-md transition-all" />{" "}
                    <MdDeleteForever className="bg-white shadow-md w-10 h-8 p-1 hover:bg-slate-300 rounded-md transition-all" />
                  </td>
                </tr>
                {/*  */}
              </tbody>
            ))}
          </table>
      </div>
    </div>
  );
};

export default AllUsers;
