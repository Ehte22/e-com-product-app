import React from 'react'

import './index.scss'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import ProductListing from './components/ProductListing'

const App = () => {

  return <>
    <Routes>
      <Route path='/' element={<><Outlet /></>}>
        <Route index element={<Home />} />
        <Route path='details/:id' element={<ProductDetails />} />
        <Route path='products' element={<ProductListing />} />
      </Route>
    </Routes>
  </>
}

export default App