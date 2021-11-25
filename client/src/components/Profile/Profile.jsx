import {Field, Form, Formik} from 'formik'
import {useContext, useEffect, useState} from 'react'

import {authContext, setUserContext} from '../../context/context'
import {ModalWindow} from "../ModalWindow"
import {profileApi} from "../../api/api"

import style from './profile.module.css'
import defaultPhoto from '../../assets/post1.jpg'

export const Profile = () => {

	const [messageSuccess, setMessageSuccess] = useState('')
	const [modal, setModal] = useState(false)
	const [image, setImage] = useState()

	const profile = useContext(authContext)
	const setProfile = useContext(setUserContext)

	useEffect(() => {
		return () => setMessageSuccess('')
	}, [])

	useEffect(async () => {
		if (image) {
			const formData = new FormData()
			formData.append('image', image)
			formData.append('email', profile.email)
			const response = await profileApi.updPhoto(formData)
			if (response) {
				setProfile({...profile, photo: response})
			}
		}
	}, [image])

	const deletePhoto = async ()=>{
		const response = await profileApi.deletePhoto(profile.email)
		if (response.message){
			setProfile({...profile, photo:''})
		}
	}

	const updateProfile = async (values)=>{
		const profile = await profileApi.updateProfile(values)
		if (profile){
			setProfile(profile)
			setMessageSuccess('Profile updated')
		}
	}

	return (
		<div className={style.container}>
			<div className={style.header}>
				<span>Profile</span>
			</div>
			<div className={style.profile}>
				{profile.photo
					?	<div className={style.photoProfile}>

						<img src={'http://localhost:4000/' + profile.photo}/>
					<div className={style.changePhoto} onClick={() => setModal(true)}>Change photo</div>
					<span className={style.deletePhoto} onClick={deletePhoto}>Delete photo</span>

				</div>:
					<div className={style.photoProfile}>
					<img src={defaultPhoto}/>
					<div className={style.changePhoto} onClick={() => setModal(true)}>Update photo</div>
					</div>}
				<Formik
					enableReinitialize={true}
					initialValues={profile}
					onSubmit={(values) => updateProfile(values)}
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
			<ModalWindow modal={modal}
			             setModal={setModal}
			             title='Update photo profile'
			             setImage={setImage}/>
		</div>
	)
}
