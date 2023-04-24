import React from 'react'
import { useLocation } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'

function LogIn() {
  const location = useLocation()
  return <div>{location.pathname == '/sign_in' ? <SignUp /> : <SignIn />}</div>
}
export default LogIn
