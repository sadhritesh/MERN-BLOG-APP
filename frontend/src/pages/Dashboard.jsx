import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DashProfile, DashSideBar } from '../components'

export default function Dashboard() {

  const location = useLocation()
  const [ tab, setTab ] = useState("")
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }

  }, [location.search])

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:min-h-screen'>
        <DashSideBar />
      </div>
      <div className='border border-white w-full'>
        <DashProfile />
      </div>
    </div>
  )
}
