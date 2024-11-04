import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'

const navList = [
    {
        href: '/',
        title: 'Dashboard'
    },
    {
        href: '/dashboard/suggestions',
        title: 'Suggestions'
    },
    {
        href: '/dashboard/add',
        title: 'Add'
    },
    {
        beforeIcon: 
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6265 9.74658L13.3331 8.03992L11.6265 6.33325" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.50684 8.04004H13.2868" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.84017 13.3334C4.8935 13.3334 2.50684 11.3334 2.50684 8.00008C2.50684 4.66675 4.8935 2.66675 7.84017 2.66675" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
,
        href: '/dashboard/logout',
        title: 'Logout',

    }
]

const DashboardLayout = () => {
  return (
    <>
        <Header navList={navList}/>
        <div className='outlet'>
            <Outlet/>
        </div>
    </>
  )
}

export default DashboardLayout