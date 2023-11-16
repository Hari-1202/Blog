import React from 'react'
import useSessionHandler from '../custom-hooks/sessionHandler'
import IdleTimeout from './idleTimeout'
import IstokenExpiryhandler from './tokenExpiryhandler'

const ProtectedRouteHandler = ({Component, componentName}) => {
  useSessionHandler()
  const isTokenExpired =  IstokenExpiryhandler()
  console.log("isTokenExpired", isTokenExpired)
  return !isTokenExpired ?  (
    <IdleTimeout Component={Component} componentName={componentName}/>
  ) : <div>session expired</div>
}

export default ProtectedRouteHandler