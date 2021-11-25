import loading from '../assets/loading.gif'
import style from './preloader.module.css'

export const Preloader = ()=>{
	return (
		<div className={style.wrapper}>
			<img src={loading}/>
		</div>
	)
}