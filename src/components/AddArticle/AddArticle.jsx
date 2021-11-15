import style from './addArticle.module.css'
import underline from '../../assets/Underline.png'
import group60 from '../../assets/Group 60.png'
import group61 from '../../assets/Group 61.png'
import group62 from '../../assets/Group 62.png'
import group63 from '../../assets/Group 63.png'
import group64 from '../../assets/Group 64.png'
import group65 from '../../assets/Group 65.png'
import group66 from '../../assets/Group 66.png'
import group67 from '../../assets/Group 67.png'
import s from '../../assets/S.png'
import x2lower from '../../assets/X-2.png'
import x2upper from '../../assets/X2.png'
import staples from '../../assets/{}.png'
import B from '../../assets/B.png'
import I from '../../assets/I.png'
import {Field, Form, Formik} from "formik";
import {useContext} from "react";
import {authContext} from "../../context/context";
import {useProfile} from "../../hooks/useProfile";
import {addArticle} from "../../services";


export const AddArticle = () => {

	const userData = useContext(authContext)

	const profile = useProfile(userData)



	return <div className={style.container}>
	<div className={style.header}>
		<span>Add article</span>
	</div>
		<div className={style.icons}>
			<div>
			<img src={B}/>
			<img src={I}/>
			<img src={underline}/>
			<img src={s}/>
			<img src={staples}/>
			<img src={x2lower}/>
			<img src={x2upper}/>
			<img src={group60}/>
			<img src={group61}/>
			<img src={group62}/>
			<img src={group63}/>
			</div>
			<div>
			<img src={group64}/>
			<img src={group65}/>
			<img src={group66}/>
			<img src={group67}/>
			</div>
		</div>
		<Formik initialValues={{title: '',category: ''}}
		        onSubmit={(value)=>addArticle(value, profile)}>
			<Form className={style.form}>
				<Field id="title" name="title" placeholder="Enter a title"/>
				<Field id="category" name="category" placeholder="Enter the category name..."/>
				<div className={style.buttons}>
					<button className={style.publish} type="submit">Publish an article</button>
					<div className={style.uploadPhoto}>Upload photo</div>
				</div>
			</Form>
		</Formik>
	</div>
}