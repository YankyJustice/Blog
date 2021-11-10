import style from './footer.module.css'
import {NavLink} from "react-router-dom";
import Logo from './../../Assets/LogoFooter.png'

const auth = false

export const Footer = () =>{
    return(
      <footer className={style.footer}>
        <div className={style.wrapper}>
      <div className={style.topFooter}>
        <div className={style.logo}><img src={Logo}/></div>
        {auth?'':<div className={style.authBlock}>
          <div className={style.login}><NavLink to='/login'>Log in</NavLink></div>
          <div className={style.singIn}><NavLink to='/singin'>Sing in</NavLink></div>
        </div>}
      </div>
      <div className={style.bottomFooter}>dsadsa</div>
        </div>
        </footer>
    )
}