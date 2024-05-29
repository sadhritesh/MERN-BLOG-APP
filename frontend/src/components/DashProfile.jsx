import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextInput, Button, FileInput } from "flowbite-react";
import { updateCurrentUser } from "../redux/features/userSlice";
import { useToast } from "../hooks/useToast";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const { successToast, errorToast } = useToast()
  const [ formData, setFormData ] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
    console.log(id, value, files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await fetch("/api/v1/user/update-profile",{
        method : "POST",
        body : data
      })
      const result = await response.json()
      console.log(result.data);
      dispatch(updateCurrentUser(result.data))
    } catch (error) {
      console.log(error.message);
    }
  }

const handleDelete = async (e) => {
  try {
    const res = await fetch("/api/v1/user/delete-user",{
      method: "DELETE"
    })
    const result = await res.json()

    if (!result.success) {
      throw new Error(result.message)
    }
    successToast(result.message)
    navigate("/signin")
    dispatch(updateCurrentUser({}))

  } catch (error) {
    errorToast(error.message)
}
}
  return (
    <div className="md:max-w-[50%] md:mx-auto mx-5">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={(e)=>(handleSubmit(e))}>
        <div className="w-32 h-32 mx-auto border-8 border-[lightgray] rounded-full cursor-pointer">
          <img
            src={currentUser.profilePicture}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <FileInput id="profilePicture" onChange={(e)=>(handleChange(e))} />
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={(e)=>(handleChange(e))}
          readOnly
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={(e)=>(handleChange(e))}
        />
        <TextInput 
        id="password" 
        type="password" 
        placeholder="new password" 
        onChange={(e)=>(handleChange(e))}
        />
        <Button
        outline 
        gradientDuoTone="purpleToBlue"
        className="w-full"
        type="submit"
        >
          update
        </Button>
      </form>
      <div className="flex flex-row justify-between my-5 text-red-600 ">
        <span className="cursor-pointer" onClick={ (e)=>{handleDelete(e)} }>Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
