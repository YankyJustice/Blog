import {NavLink, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import draftToHtml from 'draftjs-to-html';

import style from './article.module.css'
import postIMG from '../../assets/post1.jpg'
import profilePhoto from '../../assets/post1.jpg';
import eyeImg from '../../assets/eye.png';

export const Article = () => {
	const [article, setArticle] = useState({id: 0, category: '', date: ''})

	const page = useParams()

	useEffect(() => {
		window.scrollTo(0, 0)
		const articles = JSON.parse(localStorage.getItem('articles'))
		const article = articles.find(el => el.id == page.id)
		setArticle(article)
	}, [])

	return <main className={style.articlePage}>
		<div>
			<NavLink to='/main'>
				<div className={style.link}>
					All articles
				</div>
			</NavLink>
		</div>
		<section className={style.post}>
			<div className={style.tag}>
				#{article.category}
			</div>
			<header className={style.header}>
				<h1>{article.title}</h1>
			</header>
			<div className={style.postImg}><img src={postIMG}/></div>
			<article
				className={style.postText}
				dangerouslySetInnerHTML={{__html: draftToHtml(article.text)}}
			>
			</article>
			<footer className={style.footer}>
				<img src={profilePhoto} className={style.photoSmall}/>
				<span className={style.author}>
					{`${article.authorFirstName}  ${article.authorLastName}`}
				</span>
				<span className={style.data}>
					{article.date.replace('T', ' ').slice(0, -8)}
				</span>
				<span className={style.views}>
							<div className={style.eyeContainer}>
								<img className={style.eye} src={eyeImg}/>
							<span>{article.views}</span>
								</div>
						</span>
			</footer>
		</section>
	</main>
}