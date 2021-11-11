import style from './addArticle.module.css'
import underline from './../../Assets/Underline.png'
import group60 from './../../Assets/Group 60.png'
import group61 from './../../Assets/Group 61.png'
import group62 from './../../Assets/Group 62.png'
import group63 from './../../Assets/Group 63.png'
import group64 from './../../Assets/Group 64.png'
import group65 from './../../Assets/Group 65.png'
import group66 from './../../Assets/Group 66.png'
import group67 from './../../Assets/Group 67.png'
import s from './../../Assets/S.png'
import x2lower from './../../Assets/X-2.png'
import x2upper from './../../Assets/X2.png'
import staples from './../../Assets/{}.png'
import B from './../../Assets/B.png'
import I from './../../Assets/I.png'
import {Field, Form, Formik} from "formik";

export const AddArticle = () => {
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
		<Formik initialValues={{login: '',password: ''}}
		        onSubmit={()=>alert('s')}>
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