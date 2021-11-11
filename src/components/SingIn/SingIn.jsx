import style from './singIn.module.css'
import { Field, Form, Formik } from "formik"

export const SingIn = ()=>{
	return <div className={style.singInContainer}>
		<div className={style.singInBlock}>
		<header className={style.header}>
			<span>Create your free account</span>
		</header>
			<Formik initialValues={{login: '',password: ''}}
			        onSubmit={()=>alert('s')}>
				<Form className={style.form}>
					<span>First name</span>
					<Field id="firstName" name="firstName" />
					<span>Last name</span>
					<Field id="lastName" name="lastName" />
					<span>Email Address</span>
					<Field id="email" name="email" />
					<span>Password</span>
					<Field id="password" name="password" />
					<button type="submit">Create account</button>
				</Form>
			</Formik>
		</div>
	</div>
}