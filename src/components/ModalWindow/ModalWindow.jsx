import cn from 'classnames'
import {useRef} from 'react'

import style from './modalWindow.module.css'

export const ModalWindow = ({title, modal, setModal, setImage}) => {

	const file = useRef(null)

	const saveToState = () => {
		if (file.current.files) {
			setImage(file.current.files[0])
			setModal(false)
		}
	}

	return (
		<div className={cn(style.wrapper, {[style.visible]: modal})}>
			<div className={style.content}>
				<div className={style.title}>
					<h3>{title}</h3>
					<input type='file' ref={file}/>
					<div className={style.buttons}>
						<div className={style.save} onClick={saveToState}>Save</div>
						<div className={style.close}
						     onClick={() => setModal(false)}
						>
							Close
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}