import {Field, Form, Formik} from 'formik'
import {useContext, useState} from 'react';

import {loginFuncContext} from '../../context/context';

import style from './login.module.css'

export const Login = () => {

	const [message, setMessage] = useState('')

	const login = useContext(loginFuncContext)

	return <div className={style.loginContainer}>
		<div className={style.loginBlock}>
			<header className={style.header}>
				<span>Log in to your account</span>
			</header>
			<Formik initialValues={{email: '', password: ''}}
			        onSubmit={(value) => login(value, setMessage)}
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