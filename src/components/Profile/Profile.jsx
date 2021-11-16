import {Field, Form, Formik} from 'formik';
import {useContext, useEffect, useState} from 'react';

import {useProfile} from '../../hooks/useProfile';
import {authContext} from '../../context/context';

import style from './profile.module.css'
import photo from '../../assets/post1.jpg'

export const Profile = () => {

	const [messageSuccess, setMessageSuccess] = useState('')

	const userData = useContext(authContext)
	const profile = useProfile(userData)

	useEffect(() => {
		return () => setMessageSuccess('')
	}, [])

	const changeProfile = (value) => {
		const users = JSON.parse(localStorage.getItem('users'))
		users.forEach((el, index) => {
			if (el.email === userData) {
				users[index].description = value.description
				users[index].firstName = value.firstName
				users[index].lastName = value.lastName
				localStorage.setItem('users', JSON.stringify(users))
				setMessageSuccess('Profile updated')
			}
		})
	}

	return (
		<div className={style.container}>
			<div className={style.header}>
				<span>Profile</span>
			</div>
			<div className={style.profile}>
				<div className={style.photoProfile}>
					<img src={photo}/>
					<div className={style.changePhoto}>Change photo</div>
					<span className={style.deletePhoto}>Delete photo</span>
				</div>
				<Formik
					enableReinitialize={true}
					initialValues={profile}
					onSubmit={(values) => changeProfile(values)}
				>
					<Form className={style.form}>
						<div className={style.formData}>
							<div className={style.firstName}>
								<span>First name</span>
								<Field id='firstName' name='firstName'/>
							</div>
							<div className={style.lastName}>
								<span>Last name</span>
								<Field id='lastName' name='lastName'/>
							</div>
						</div>
						<div className={style.description}>
							<div>Description</div>
							<Field id='description'
							       name='description'
							       as='textarea'
							/>
						</div>
						<button type='submit'>Save changes</button>
					</Form>
				</Formik>
			</div>
			<div className={style.messageSuccess}>{messageSuccess}</div>
		</div>
	)
}
