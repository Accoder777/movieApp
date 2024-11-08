import React  from 'react'
import './styles/App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Movies from './pages/movies/Movies'
import TvShows from './pages/tvShows/TvShows'
import NotFound404 from './pages/error/NotFound404'
import Home from './pages/home/Home'
import MainLayout from './layout/MainLayout'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import AuthRequired from './components/authRequired/AuthRequired'
import SuggestMe from './pages/SuggestMe'
import MovieDetail from './pages/moviesDetail/MovieDetail'
import TvShowsDetail from './pages/tvShowsDetail/TvShowsDetail'

function Logout (){
  const {REACT_APP_SESSION_ID} = process.env
  const navigator = useNavigate();
  
  localStorage.removeItem(REACT_APP_SESSION_ID)
  navigator('/login')
  
  return (
      <Navigate to='/login'/>
  )
}

const App = () => {
  return (
    <>
      <Routes>
        {/* main layout */}
        <Route path="/" element={<MainLayout/>}>  
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/tvShows" element={<TvShows/>}/>
          <Route path="/movies/:id" element={<MovieDetail />}/>
          <Route path="/tvShows/:id" element={<TvShowsDetail/>}/>
          <Route path="/suggestMe" element={<SuggestMe/>}/>
          <Route path="/login" element={<Login/>}/>
          {/* Error pages */}
          <Route path="*" element={<NotFound404/>}/>
        </Route>

        {/* dashboard layout */}

        <Route element={<AuthRequired/>}>
            <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/dashboard/logout' element={<Logout/>}/>
          </Route>

          {/* Error pages */}
          <Route path="*" element={<NotFound404/>}/>
        </Route>

          
      </Routes>
    </>
  )
}

export default App