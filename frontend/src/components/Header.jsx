import React from 'react'
import { Button, Navbar, TextInput, Textarea } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {

  const path = useLocation().pathname

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

      <div className='flex items-center gap-x-2 md:order-1'>
        <Button
        className='w-12 h-9 hidden sm:inline-block'
        color="gray"
        pill
        >
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button
          outline gradientDuoTone="purpleToBlue"
          >Sign In</Button>
        </Link>
        <Navbar.Toggle />
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
