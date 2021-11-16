import {NavLink} from 'react-router-dom';

import style from './footer.module.css'
import Logo from '../../assets/LogoFooter.png'


export const Footer = ({userData, logout}) => {
	return (
		<footer className={style.footer}>
			<div className={style.wrapper}>
				<div className={style.topFooter}>
					<div className={style.logo}>
						<img src={Logo}/>
					</div>
					{userData
						?
						(<div className={style.authBlock}>
							<div className={style.nav}>
								<NavLink to='main'>All articles</NavLink>
								<NavLink to='myArticles'>My articles</NavLink>
								<NavLink to='addArticle'>Add article</NavLink>
								<NavLink to='profile'>Profile</NavLink>
							</div>
							<div onClick={logout} className={style.logout}>
								<span>Logout</span>
							</div>
						</div>)
						:
						(<div className={style.noAuthBlock}>
							<div className={style.login}>
								<NavLink to='/login'>Log in</NavLink>
							</div>
							<div className={style.singIn}>
								<NavLink to='/singin'>Sing Up</NavLink>
							</div>
						</div>)}
				</div>
				<div className={style.bottomFooter}>
					<p>© 2021 Justice-it. All rights reserved.</p>
					<p>© 2021 Justice-it. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}