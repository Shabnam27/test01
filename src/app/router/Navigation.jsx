import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/home/Home'
import Content from '../../components/content/Content'

export default function Navigation() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/content' element={<Content />} />
      </Routes>
    </>
  )
}
