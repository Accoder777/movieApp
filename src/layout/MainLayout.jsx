import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'

const navList = [
  {
      href: '/movies',
      title: 'Movies'
  },
  {
      href: '/tvShows',
      title: 'Tv Shows'
  },
  {
      href: '/suggestMe',
      title: 'Suggest me',
      icon: 
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.61987 3.95331L13.6665 7.99997L9.61987 12.0466" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.33325 8H13.5533" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  }
]

const MainLayout = () => {
  
  return (
    <>
        <Header navList={navList}/>
        <div className='outlet'>
            <Outlet/>
        </div>
    </>
  )
}

export default MainLayout