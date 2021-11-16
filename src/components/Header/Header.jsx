import {NavLink} from 'react-router-dom';

import style from './header.module.css'
import logo from '../../assets/Logo.png'

export const Header = ({userData, logout}) => {
	return (
		<header className={style.header}>
			<NavLink to='/main'>
				<div className={style.logo}>
					<img src={logo} alt='logo'/>
				</div>
			</NavLink>
			<nav>
				{userData
					?
					(<div className={style.authBlock}>
						<div className={style.nav}>
							<NavLink to='main' activeClassName={style.Active}>All articles</NavLink>
							<NavLink to='myArticles' activeClassName={style.Active}>My articles</NavLink>
							<NavLink to='addArticle' activeClassName={style.Active}>Add article</NavLink>
							<NavLink to='profile' activeClassName={style.Active}>Profile</NavLink>
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
					</div>)
				}
			</nav>
		</header>
	)
}

