import style from './profile.module.css'
import photo from './../../Assets/post1.jpg'
import {Field, Form, Formik} from "formik";
import {useState} from "react";

export const Profile = () => {
	return<div className={style.container}>
	<div className={style.header}><span>Profile</span></div>
		<div className={style.profile}>
			<div className={style.photoProfile}>
				<img src={photo}/>
				<div className={style.changePhoto}>Change photo</div>
				<span className={style.deletePhoto}>Delete photo</span>
			</div>
			<Formik initialValues={{login: '',password: ''}}
			        onSubmit={(values)=>console.log(values.description)}>
				<Form className={style.form}>
					<div className={style.formData}>
						<div className={style.firstName}>
						<span>First name</span>
						<Field id="firstName" name="firstName" />
						</div>
						<div className={style.lastName}>
							<span>Last name</span>
							<Field id="lastName" name="lastName" />
						</div>
					</div>
					<div className={style.description}>
					<div>Description</div>
					<Field id="description" name="description" as='textarea' />
					</div>
					<button type="submit">Save changes</button>
				</Form>
			</Formik>
		</div>
	</div>
}
