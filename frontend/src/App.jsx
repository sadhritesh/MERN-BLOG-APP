import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, SignIn, SignUp, Projects, Dashboard, About, Error } from "./pages"
import Header from "./components/Header"

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
