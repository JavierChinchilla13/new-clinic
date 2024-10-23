import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'

import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import Products from './pages/Products.jsx'
import Services from './pages/Services.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        {/* Home route */}
        <Route
          exact
          path='/'
          element={
            <>
              <Header />
              <Home />
            </>
          }></Route>


        {/* About Us route */}
        <Route
          exact
          path='/aboutUs'
          element={
            <>
              <Header />
              <AboutUs />
            </>
          }></Route>

        {/* Contact route */}
        <Route
          exact
          path='/contact'
          element={
            <>
              <Header />
              <Contact />
            </>
          }></Route>


        {/* Products route */}
        <Route
          exact
          path='/products'
          element={
            <>
              <Header />
              <Products />
            </>
          }></Route>

        {/* Services route */}
        <Route
          exact
          path='/services'
          element={
            <>
              <Header />
              <Services />
            </>
          }></Route>

        {/* Login route */}
        <Route
          exact
          path='/login'
          element={
            <>
              <Login />
            </>
          }></Route>

        {/* SignIn route */}
        <Route
          exact
          path='/signUp'
          element={
            <>
              <SignUp />
            </>
          }></Route>

      </Routes>

    </BrowserRouter>

  </StrictMode>,
)
