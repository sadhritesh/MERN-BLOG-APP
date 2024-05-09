import React from "react";
import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="md:max-w-[50%] md:mx-auto mx-5">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5">
        <div className="w-32 h-32 mx-auto border-8 border-[lightgray] rounded-full cursor-pointer">
          <img
            src={currentUser.profilePicture}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput 
        id="password" 
        type="password" 
        placeholder="password" 
        />
        <Button
        outline 
        gradientDuoTone="purpleToBlue"
        className="w-full"
        >
          update
        </Button>
      </form>
      <div className="flex flex-row justify-between my-5 text-red-600 ">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
