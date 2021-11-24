import {Field, Form, Formik} from 'formik'
import {useContext, useEffect, useState} from 'react'

import {email, firstName, lastName, password, passwords} from '../../services/validators'
import {authAPI} from '../../api/api'
import {setUserContext} from '../../context/context'

import style from './singIn.module.css'

export const SingIn = () => {
	const [message, setMessage] = useState('')

	const setUser = useContext(setUserContext)

	useEffect(() => {
		return () => setMessage('')
	}, [])

	const auth = (values) => {
		authAPI.singUp(values).then(res => {
				if (res.responseCode === 1) {
					authAPI.login(
						{
							email: values.email,
							password: values.password
						}
					)
						.then(res => {
								localStorage.setItem('token', JSON.stringify(res.token))
								authAPI.auth()
									.then(userData => setUser(userData))
							}
						)
				}
			}
		)
	}


	return <div className={style.singInContainer}>
		<div className={style.singInBlock}>
			<header className={style.header}>
				<span>Create your free account</span>
			</header>
			<Formik initialValues={{firstName: '', lastName: '', email: '', password: ''}}
			        validate={passwords}
			        onSubmit={(values) => auth(values)}
			>
				{
					({
						 errors,
						 touched
					 }) =>
						(<Form className={style.form}>
								<span className={style.description}>First name</span>
								<div className={style.fieldBlock}>
									<Field id='firstName'
									       name='firstName'
									       validate={firstName}
									/>
									{touched.firstName && errors.firstName
										?
										<div className={style.tooltip}>{errors.firstName}</div>
										: ''}
								</div>
								<span className={style.description}>Last name</span>
								<div className={style.fieldBlock}>
									<Field id='lastName'
									       name='lastName'
									       validate={lastName}/>
									{touched.lastName && errors.lastName
										?
										<div className={style.tooltip}> {errors.lastName}</div>
										: ''}
								</div>
								<span className={style.description}>Email Address</span>
								<div className={style.fieldBlock}>
									<Field id='email'
									       name='email'
									       validate={email}/>
									{touched.email && errors.email
										?
										<div className={style.tooltip}> {errors.email}</div>
										: ''}
								</div>
								<span className={style.description}>Password</span>
								<div className={style.fieldBlock}>
									<Field id='password'
									       name='password'
									       type='password'
									       validate={password}/>
									{touched.password && errors.password
										?
										<div className={style.tooltip}> {errors.password}</div>
										: ''}
								</div>
								<span className={style.description}>Repeat password</span>
								<div className={style.fieldBlock}>
									<Field id='repeatPassword'
									       name='repeatPassword'
									       type='password'/>
									{touched.repeatPassword && errors.repeat
										?
										<div className={style.tooltip}> {errors.repeat}</div>
										: ''}
								</div>
								<button type='submit'>Create account</button>
							</Form>
						)}
			</Formik>
			<div className={style.error}>{message}</div>
		</div>
	</div>
}