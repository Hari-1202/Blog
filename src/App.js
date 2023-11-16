import React, { useEffect } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import Overview from './components/Blog/Overview';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import AddBlog from './components/Blog/userBlog/AddBlog';
import { BASE_URL } from './constants/constants';
import GetBlog from './components/Blog/userBlog/GetBlog';
import { requestHandler } from './utils/requestHandler';
import ProtectedRouteHandler from './utils/protectedRouteHandler';
import { saveUserData } from './reducers/user/userReducer';
const LazyOverview = React.lazy(() => import('./components/Blog/Overview'));

function ApplicationRouter() {
  const dispatch = useDispatch()

  useEffect(() => {
    const tokenExpiryTime = Date.parse(sessionStorage.getItem('expiresIn'))
    if(Date.now() < tokenExpiryTime ){
      dispatch(saveUserData({
          isLoggedIn: true,
         token: sessionStorage.getItem('token'),
         expiresIn: sessionStorage.getItem('expiresIn')
      }))
    }
  }, [])

  const composedComponent = (Component, options = {
    headerVisibility: true,
    protectedRoute: false,
    componentName: ''
  }) => {
    return (
      <>
        {options.protectedRoute ? <ProtectedRouteHandler Component={Component} componentName={options.componentName}/> : <>
        <Header/>
        <Component/>
        </>}
      </>
    )
  }
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={composedComponent(LazyOverview, {
         componentName: 'home'
      })} loader={async() => {
          const res = await fetch(`${BASE_URL}/blog`)
          const allBlogData = res.json()
          return allBlogData
      }
      } />
      <Route path='/login' element={composedComponent(Login, {
        headerVisibility: false,
        componentName: 'login'
      })} />
      <Route path='/signup' element={composedComponent(Signup, {
        headerVisibility: false,
        componentName: 'signup'
      })} />
      <Route path='/addBlog' element={composedComponent(AddBlog, {
        protectedRoute: true,
        componentName: 'addBlog'
      })} />
      {/* <Route path='/myBlogs' element={composedComponent(GetBlog)} /> */}
      <Route path='/myBlogs' element={composedComponent(GetBlog, {
        protectedRoute: true,
        componentName: 'myBlogs'
      })} loader={async() => {
          const res = await requestHandler({url: `${BASE_URL}/blog/me`})
          return res
      }
      }/>
      <Route path='*' element={composedComponent(Signup)} />
    </>
  ))
  return (
      <RouterProvider router={router} />
  );
}

export default ApplicationRouter;
