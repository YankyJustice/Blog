import style from './article.module.css'
import postIMG from '../../assets/post1.jpg'
import profilePhoto from "../../assets/post1.jpg";
import eyeImg from "../../assets/eye.png";
import eyeCenterImg from "../../assets/eyeCenter.png";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const Article = () =>{
	const page = useParams()
	const [article,setArticle]=useState({id:0,category:'',date:''})

	useEffect(()=>{
		const articles = JSON.parse(localStorage.getItem('articles'))
		const article = articles.find(el=>el.id == page.id)
		setArticle(article)
	},[])

	console.log(article)

return<main className={style.articlePage}>
	<div>
		<div className={style.link}>
		<NavLink to='/main'>All articles</NavLink>
	</div>
	</div>
	<section className={style.post}>
		<div className={style.tag}>{`# ${article.category}`}</div>
		<header className={style.header}><h1>{article.title}</h1></header>
		<div className={style.postImg}><img src={postIMG}/></div>
		<article className={style.postText}><p>An Essay on Typography by Eric Gill takes the reader back to the year 1930.
			The year when a conflict between two worlds came to its term.
			The machines of the industrial world finally took over the handicrafts.</p>
		</article>
		<footer className={style.footer}>
			<img src={profilePhoto} className={style.photoSmall}></img>
			<span className={style.author}>{`${article.authorFirstName}  ${article.authorLastName}`}</span>
			<span className={style.data}>{article.date.replace('T',' ').slice(0,-8)}</span>
			<span className={style.views}>
							<div className={style.eyeContainer}>
								<img className={style.eye} src={eyeImg}></img>
								<img className={style.eyeCenter} src={eyeCenterImg}></img>
							</div>
							<span>{article.views}</span>
						</span>
		</footer>
	</section>
</main>
}