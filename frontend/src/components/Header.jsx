import React from 'react'
import { Button, Navbar, TextInput, Avatar, Dropdown, } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/features/themeSlice'

export default function Header() {

  const path = useLocation().pathname
  const { currentUser } = useSelector(state => state.user)
  const { theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sadh's</span>
        Blog
      </Link>
      <form>
        <TextInput 
         type='text'
         rightIcon={AiOutlineSearch }
         color="gray"
         className='hidden lg:inline-block'
         placeholder='Search...'
        />
      </form>

      <div className='flex items-center gap-x-2 md:order-2'>
        <Button
        className='w-12 h-9 hidden sm:inline-block'
        color="gray"
        pill
        onClick={()=>dispatch(toggleTheme())}
        >
        {
          theme === "dark"? <FaSun /> : <FaMoon />
        }
        </Button>
        {
          currentUser ? 
          <div className="flex">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{ currentUser.username }</span>
              <span className="block truncate text-sm font-medium">{ currentUser.email }</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle className='mx-[1rem]' />
        </div>
        :
        <Link to="/signin">
          <Button
          outline gradientDuoTone="purpleToBlue"
          >Sign In
          </Button>
        </Link>
        }
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"} className='active:bg-violet-700'>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>

    </Navbar>
  )
}
