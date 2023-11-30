import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import css from "./Login.module.css"
import { selectIsLoading } from 'redux/authentification/authentification.selectors'
import Loader from 'components/Loader/Loader'
import { fetchUser } from 'redux/authentification/services'


const Login = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  

  const hendleSubmit= (e) => {
    e.preventDefault()
    const email = e.currentTarget.elements.email.value.trim()
    const password = e.currentTarget.elements.password.value.trim()

    const formData = {
      email,
      password
    }
   
    dispatch(fetchUser(formData))
  }

  return (
   <> 
   {isLoading && <Loader />}
    <form onSubmit={hendleSubmit} className={css.formLogIn}>
      <h2 className={css.titleLogIn}>Log in</h2>
      <input type="text" name='email' placeholder="Username" className={css.inputLogIn}/>
      <input type="password" name='password' placeholder="Password" className={css.inputLogIn}/>
      <button type="submit" className={css.btnLogIN}>Login</button>
    </form>
   </>
   
  )
}

export default Login