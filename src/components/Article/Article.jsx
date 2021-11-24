import {NavLink, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import draftToHtml from 'draftjs-to-html'

import {articlesAPI} from '../../api/api'
import {Preloader} from '../../Preloader'

import style from './article.module.css'
import defaultPhoto from '../../assets/post1.jpg'
import eyeImg from '../../assets/eye.png'

export const Article = () => {
	const [article, setArticle] = useState({user: {firstName: '', lastName: ''}, date: ''})
	const [isFetching, setIsFetching] = useState(true)
	const {id} = useParams()

	useEffect(async () => {
		window.scrollTo(0, 0)
		const article = await articlesAPI.getArticle(id)
		setArticle(article)
		setIsFetching(false)
	}, [])

	const photo = article.user.photo ? 'http://localhost:4000/' + article.user.photo : defaultPhoto

	if (isFetching) {
		return <Preloader/>
	}

	return <main className={style.articlePage}>
		<div>
			<NavLink to='/main'>
				<div className={style.link}>
					All articles
				</div>
			</NavLink>
		</div>
		{article ? <section className={style.post}>
			<div className={style.tag}>
				#{article.category}
			</div>
			<header className={style.header}>
				<h1>{article.title}</h1>
			</header>
			<div className={style.postImg}>
				<img src={'http://localhost:4000/' + article.image}/>
			</div>
			<article
				className={style.postText}
				dangerouslySetInnerHTML={{__html: draftToHtml(article.text)}}
			>
			</article>
			<footer className={style.footer}>
				<img src={photo} className={style.photoSmall}/>
				<span className={style.author}>
					{`${article.user.firstName}  ${article.user.lastName}`}
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
		</section> : ''}
	</main>
}