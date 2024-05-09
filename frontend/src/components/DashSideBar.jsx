import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";

export default function DashSideBar() {

  const location = useLocation()
  const [ tab, setTab ] = useState()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <Sidebar className='w-screen md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiUser} label={"user"} labelColor="dark" active={tab === "profile"}>
                User
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight}>
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
