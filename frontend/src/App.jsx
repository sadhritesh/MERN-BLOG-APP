import { BrowserRouter, Routes, Route } from "react-router-dom"
import { 
  Home, 
  SignIn, 
  SignUp, 
  Projects, 
  Dashboard, 
  About, 
  Error, 
  AdminProtectedRoute,
  CreatePost
} from "./pages"
import { FooterComp, Header, ProtectedRoute } from "./components";
import { ToastContainer } from 'react-toastify';
function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
      <FooterComp />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
