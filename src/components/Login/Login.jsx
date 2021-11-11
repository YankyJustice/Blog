import style from './login.module.css'
import { Field, Form, Formik } from "formik"

export const Login = ()=>{
	return <div className={style.loginContainer}>
		<div className={style.loginBlock}>
		<header className={style.header}>
			<span>Log in to your account</span>
		</header>
			<Formik initialValues={{login: '',password: ''}}
			        onSubmit={()=>alert('s')}>
				<Form className={style.form}>
					<span>Email Address</span>
					<Field id="email" name="email" />
					<span>Password</span>
					<Field id="password" name="password" />
					<button type="submit">Login account</button>
				</Form>
			</Formik>
		</div>
	</div>
}