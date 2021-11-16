import {Field, Form, Formik} from 'formik';
import {useContext, useEffect, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js'

import {authContext} from '../../context/context';
import {useProfile} from '../../hooks/useProfile';
import {addArticle} from '../../services';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from './addArticle.module.css'

export const AddArticle = () => {
	const [messageSuccess, setMessageSuccess] = useState('')
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

	const userData = useContext(authContext)
	const profile = useProfile(userData)

	useEffect(() => {
		return () => setMessageSuccess('')
	}, [])

	return <div className={style.container}>
		<div className={style.header}>
			<span>Add article</span>
		</div>
		<Formik
			initialValues={{title: '', category: ''}}
			onSubmit={(value, formikHelpers) =>
				addArticle(
					value,
					profile,
					editorState,
					setMessageSuccess,
					formikHelpers,
					setEditorState)
			}
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
					<div className={style.uploadPhoto}>Upload photo</div>
				</div>
			</Form>
		</Formik>
		<div className={style.messageSuccess}>{messageSuccess}</div>
	</div>
}