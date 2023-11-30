import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import css from "./Registration.module.css"
import {  selectIsLoading } from 'redux/authentification/authentification.selectors'
import Loader from 'components/Loader/Loader'
import { registrationUser } from 'redux/authentification/services'

const Registration = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)


  const hendleSubmit= (e) => {
    e.preventDefault()
    const email = e.currentTarget.elements.email.value.trim()
    const password = e.currentTarget.elements.password.value.trim()
    const name = e.currentTarget.elements.name.value.trim()

    const formData = {
      email,
      password,
      name
    }

    dispatch(registrationUser(formData))

  }

  return (
   <>
    {isLoading && <Loader />}
    <form onSubmit={hendleSubmit} className={css.formContainer}>
      <h2 className={css.titleRegist}>Registration</h2>
    <input type="text" name="name" placeholder="Name" className={css.inputField} />
    <input type="text" name="email" placeholder="Username" className={css.inputField} />
    <input type="password" name="password" placeholder="Password" className={css.inputField} />
    <button type="submit" className={css.submitButton}>Sign Up</button>
  </form>
  </>
  )
}

export default Registration