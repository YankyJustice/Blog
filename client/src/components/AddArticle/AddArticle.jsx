import {Field, Form, Formik} from 'formik'
import {useContext, useEffect, useState} from 'react'
import {Editor} from 'react-draft-wysiwyg'
import {convertToRaw, EditorState} from 'draft-js'

import {ModalWindow} from '../ModalWindow'
import {authContext} from '../../context/context'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import style from './addArticle.module.css'
import {articlesAPI} from '../../api/api'


export const AddArticle = () => {
	const [messageSuccess, setMessageSuccess] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [modal, setModal] = useState(false)
	const [image, setImage] = useState()

	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const userData = useContext(authContext)

	const addArticle = async (dataFromForm, formik) => {
		const formData = new FormData()
		formData.append('image', image)
		const values = {
			...dataFromForm,
			user: userData.email,
			date: new Date(),
			text: convertToRaw(editorState.getCurrentContent())
		}
		formData.append('data', JSON.stringify(values))
		const response = await articlesAPI.add(formData)
		if (response.status === 201) {
			formik.resetForm()
			setMessageSuccess(response.data.message)
			setErrorMessage('')
		}
		if (response.status === 200) {
			setErrorMessage(response.data.message)
		}
	}

	useEffect(() => {
		return () => setMessageSuccess('')
	}, [])

	return <div className={style.container}>
		<div className={style.header}>
			<span>Add article</span>
		</div>
		<Formik
			initialValues={{title: '', category: ''}}
			onSubmit={(values, formikHelpers) => addArticle(values, formikHelpers)}
		>
			<Form className={style.form}>
				<Field
					className={style.input}
					id='title'
					name='title'
					placeholder='Enter a title'
				/>
				<Field
					className={style.input}
					id='category'
					name='category'
					placeholder='Enter the category name...'
				/>
				<div className={style.textEditor}>
					<Editor
						editorStyle={{Width: '100%'}}
						editorState={editorState}
						onEditorStateChange={setEditorState}
						toolbarClassName='toolbarClassName'
						wrapperClassName='wrapperClassName'
						editorClassName='editorClassName'
					>
					</Editor>
				</div>
				<div className={style.buttons}>
					<button className={style.publish} type='submit'>Publish an article</button>
					<div
						onClick={() => setModal(true)}
						className={style.uploadPhoto}
					>
						Upload image
					</div>
				</div>
			</Form>
		</Formik>
		<div className={style.messageSuccess}>{messageSuccess}</div>
		<div className={style.errorMessage}>{errorMessage}</div>
		<ModalWindow title='Upload image' modal={modal} setModal={setModal} setImage={setImage}/>
	</div>
}