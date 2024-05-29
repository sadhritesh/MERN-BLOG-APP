import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { signOutSuccess } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useToast } from '../hooks/useToast';

export default function DashSideBar() {

  const location = useLocation()
  const [ tab, setTab ] = useState()
  const dispatch = useDispatch()
  const { successToast, errorToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/v1/auth/signout", {
        method : "POST"
      })
      const result = await response.json()
      
      if (!result.success) {
        throw new Error("Error occured, please try again !")
      }
  
      successToast(result.message)
      dispatch(signOutSuccess())
      navigate("/signin")
      
    } catch (error) {
      errorToast(error.message)
    }
  }

  return (
    <Sidebar className='w-screen md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiUser} label={"user"} labelColor="dark" active={tab === "profile"}>
                User
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight} onClick={ (e)=>{handleSignOut()} } className="cursor-pointer">
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
