import style from './main.module.css'
import imgPost from './../../Assets/post1.jpg'
import eyeImg from './../../Assets/eye.png'
import eyeCenterImg from './../../Assets/eyeCenter.png'
import {Link, NavLink} from "react-router-dom";

const init = [1,2,3,4,5,6]

export const Main = ()=>{
    return(
        <main>
            <article className={style.topPost}>
                <div className={style.postBlock}>
                <div className={style.image}><img src={imgPost}></img> </div>
                </div>
                <div className={style.topContent}>
                    <div className={style.tag}> #Typography</div>
                    <header className={style.header}><h2>Humane Typography in the Digital Age</h2></header>
                    <article className={style.text}><p>Human beings aren’t perfect. Perfection is something that will always elude us.
                        There will always be a small part of humanity in everything we do.
                        No matter how small that part, we should make sure that it transcends the limits of the medium.
                        We have to think about the message first.
                        What typeface should we use and why?
                        Does the typeface match the message and what?</p></article>
                    <footer className={style.footer}>
                        <img src={imgPost} className={style.photoSmall}></img>
                        <span className={style.author}>Janay Wright</span>
                        <span className={style.data}>Jun 13 · 5 min read</span>

                        <span className={style.views}>
                            <div className={style.eyeContainer}>
                             <img className={style.eye} src={eyeImg}></img>
                            <img className={style.eyeCenter} src={eyeCenterImg}></img>
                                </div>
                            1690
                        </span>
                    </footer>
                </div>
            </article>
            <section className={style.popularArticles}>
                <header>
                    <h1>Popular articles</h1>
                </header>
                <div className={style.popularArticlesMap}>
                {init.map(()=>{
                   return <article className={style.post}>
                           <div className={style.postBlock}>
                               <div className={style.image}><img src={imgPost}></img> </div>
                           </div>
                           <div className={style.content}>
                               <div className={style.tag}> #Typography</div>
                               <header><NavLink to='article1'><h2>Humane Typography in the Digitaldsadsads Age</h2></NavLink></header>
                               <article className={style.text}><p>Human beings aren’t perfect. Perfection is something that will always elude us.
                                   There will always be a small part of humanity in everything we do.
                                   No matter how small that part, we should make sure that it transcends the limits of the medium</p></article>
                               <footer className={style.footer}>
                                   <img src={imgPost} className={style.photoSmall}></img>
                                   <span className={style.author}>Janay Wright</span>
                                   <span className={style.data}>Jun 13 · 5 min read</span>

                                   <span className={style.views}>
                            <div className={style.eyeContainer}>
                             <img className={style.eye} src={eyeImg}></img>
                            <img className={style.eyeCenter} src={eyeCenterImg}></img>
                                </div>
                            1690
                        </span>
                               </footer>
                           </div>
                       </article>

                })}
                </div>
                <div className={style.pagination}>
                    <div className={style.buttons}><p>Prev</p></div>
                    <div className={style.buttons}><p>Next</p></div>
                </div>
            </section>
        </main>
    )
}
