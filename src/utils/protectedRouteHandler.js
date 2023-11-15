import React from 'react'
import useSessionHandler from '../custom-hooks/sessionHandler'
import Header from '../components/Header/Header'
import IdleTimeout from './idleTimeout'

const ProtectedRouteHandler = ({Component, componentName}) => {
  useSessionHandler()
  return (
    <IdleTimeout Component={Component} componentName={componentName}/>
  ) 
}

export default ProtectedRouteHandler