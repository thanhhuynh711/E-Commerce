import React, { useEffect, useState, useCallback } from "react";
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "apis/user";
import { roles, blockStatus } from "ultils/contants";
import moment from "moment";
import icons from "ultils/icons";
import { InputField, Pagination, InputForm, Select, Button } from "components";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import clsx from "clsx";

const { AiOutlineEdit, RiDeleteBin6Line, BsReverseBackspaceReverse } = icons;

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    phone: "",
    isBlocked: "",
  });
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setUsers(response);
  };
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editElm._id);
    if (response.success) {
      setEditElm(null);
      render();
      toast.success(response.mes);
    } else toast.error(response.mes);
  };

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else toast.error(response.mes);
      }
    });
  };

  return (
    <div className={clsx("w-full", editElm && "pl-16")}>
      <h1 className="h-[75px] flex px-4 justify-between text-3xl font-bold items-center">
        <span>Manage user</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style={"w500"}
            placeholder="Search name or mail user..."
            isHideLabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElm && <Button type="submit">Update</Button>}
          <table className="w-full table-auto mb-6 text-left">
            <thead className="font-bold text-white bg-gray-700 text-[13px] ">
              <tr className="border border-gray-500">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">Firsname</th>
                <th className="px-4 py-2">Lastname</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((el, index) => (
                <tr key={el.id} className="border border-gray-500">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"email"}
                        validate={{
                          required: "Required fill.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        }}
                        defaultValue={editElm?.email}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"firstname"}
                        validate={{ required: "Required fill." }}
                        defaultValue={editElm?.firstname}
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"lastname"}
                        validate={{ required: "Required fill." }}
                        defaultValue={editElm?.lastname}
                      />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <Select
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"role"}
                        validate={{ required: "Required fill." }}
                        defaultValue={el.role}
                        options={roles}
                      />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +el.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"mobile"}
                        validate={{
                          required: "Required fill.",
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: "invalid phone number",
                          },
                        }}
                        defaultValue={editElm?.mobile}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <Select
                        fullWidth
                        register={register}
                        errors={errors}
                        id={"isBlocked"}
                        validate={{ required: "Required fill." }}
                        defaultValue={el.isBlocked}
                        options={blockStatus}
                      />
                    ) : (
                      <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-2 py-2 flex">
                    {editElm?._id === el._id ? (
                      <span
                        onClick={() => setEditElm(null)}
                        className="mx-2 text-green-600 hover:underline cursor-pointer"
                      >
                        <BsReverseBackspaceReverse />
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditElm(el)}
                        className="mx-2 text-green-600 hover:underline cursor-pointer"
                      >
                        <AiOutlineEdit />
                      </span>
                    )}
                    <span
                      onClick={() => handleDeleteUser(el._id)}
                      className="mx-2 text-red-500 hover:underline cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className="w-full flex justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
