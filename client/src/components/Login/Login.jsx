import {Field, Form, Formik} from 'formik'
import {useContext, useState} from 'react'

import {setUserContext} from '../../context/context'
import {authAPI} from '../../api/api'

import style from './login.module.css'

export const Login = () => {

	const [message, setMessage] = useState('')

	const setUserData = useContext(setUserContext)

	const login = (values) => {
		authAPI.login(values)
			.then(res => {
				if (res.responseCode === 1) {
					localStorage.setItem('token', JSON.stringify(res.token))
				}
				setMessage(res.message)
			})
			.then(() => authAPI.auth().then(res => setUserData(res)))
	}

	return <div className={style.loginContainer}>
		<div className={style.loginBlock}>
			<header className={style.header}>
				<span>Log in to your account</span>
			</header>
			<Formik initialValues={{email: '', password: ''}}
			        onSubmit={(values) => login(values)}
			>
				<Form className={style.form}>
					<span>Email Address</span>
					<Field id='email' name='email'/>
					<span>Password</span>
					<Field id='password' name='password' type='password'/>
					<button type='submit'>Login account</button>
				</Form>
			</Formik>
			<div className={style.error}>
				<span>{message}</span>
			</div>
		</div>
	</div>
}