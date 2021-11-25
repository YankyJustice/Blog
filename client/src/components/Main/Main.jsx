import {NavLink, Route} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import draftToHtml from 'draftjs-to-html';
import {NumberParam, useQueryParam} from 'use-query-params';

import {authContext} from '../../context/context';
import {Preloader} from '../../Preloader';

import style from './main.module.css'
import defaultPhoto from '../../assets/post1.jpg'
import eyeImg from '../../assets/eye.png'
import {articlesAPI} from '../../api/api';

export const Main = () => {
	const [articles, setArticles] = useState([])
	const [popularArticle, setPopularArticle] = useState({user: {firstName: '', lastName: ''}})
	const [maxPage, setMaxPage] = useState()
	const [queryPage, setQueryPage] = useQueryParam('page', NumberParam)
	const [isFetching, setIsFetching] = useState(true)
	const auth = useContext(authContext)

	useEffect(async () => {
		const currentPage = queryPage || 1
		const response = await articlesAPI.getAllArticles(currentPage)
		const article = await articlesAPI.getPopularArticle()
		setPopularArticle(article)
		setArticles(response.items)
		setQueryPage(currentPage)
		setMaxPage(Math.ceil(response.countArticles / 6))
		setIsFetching(false)
	}, [])


	const Next = async () => {
		if (queryPage + 1 <= maxPage) {
			const response = await articlesAPI.getAllArticles(queryPage + 1)
			setArticles(response.items)
			setQueryPage(queryPage + 1)
		}
	}
	const Prev = async () => {
		if (queryPage - 1 > 0) {
			const response = await articlesAPI.getAllArticles(queryPage - 1)
			setArticles(response.items)
			setQueryPage(queryPage - 1)
		}
	}

	const popularArticlePhoto = popularArticle.user.photo ? 'http://localhost:4000/' + popularArticle.user.photo : defaultPhoto

	if (isFetching) {
		return <Preloader/>
	}

	return (
		<main>
			{popularArticle ? <article className={style.topPost}>
				<div className={style.postBlock}>
					<div className={style.image}>
						<img src={'http://localhost:4000/' + popularArticle.image}/>
					</div>
				</div>
				<div className={style.topContent}>
					<div className={style.tag}>
						#{popularArticle.category}
					</div>
					<header className={style.header}>
						{auth
							?
							(<NavLink onClick={() => articlesAPI.addView(popularArticle.id)}
							          to={`article${popularArticle.id}`}
							>
								<h2>{popularArticle.title}</h2>
							</NavLink>)
							:
							<h2>{popularArticle.title}</h2>}
					</header>
					<article className={style.text}
					         dangerouslySetInnerHTML={{__html: draftToHtml(popularArticle.text)}}
					/>
					<footer className={style.footer}>
						<img src={popularArticlePhoto} className={style.photoSmall}/>
						<span className={style.author}>
                {`${popularArticle.user.firstName} ${popularArticle.user.lastName}`}
            </span>
						<span className={style.data}>
                {popularArticle.date
	                ?
	                popularArticle.date.replace('T', ' ').slice(0, -8)
	                :
	                ''}
            </span>
						<span className={style.views}>
                <div className={style.eyeContainer}>
                    <img className={style.eye} src={eyeImg}/>
                    <span>{popularArticle.views}</span>
                </div>
            </span>
					</footer>
				</div>
			</article> : ''}
			<section className={style.popularArticles}>
				<header>
					<h1>Popular articles</h1>
				</header>
				<div className={style.popularArticlesMap}>
					{articles.length > 0 ? articles.map(article => {
						return <article className={style.post}>
							<div className={style.postBlock}>
								<div className={style.image}>
									<img src={'http://localhost:4000/' + article.image}/>
								</div>
							</div>
							<div className={style.content}>
								<div className={style.tag}>#{article.category}</div>
								<header className={style.header}>
									<NavLink onClick={() => articlesAPI.addView(article.id)}
									         to={`article${article.id}`}>
										<h2>{article.title}</h2>
									</NavLink>
								</header>
								<article className={style.text}
								         dangerouslySetInnerHTML={{__html: draftToHtml(article.text)}}/>
								<footer className={style.footer}>
									<img src={article.user.photo ? 'http://localhost:4000/' + article.user.photo : defaultPhoto}
									     className={style.photoSmall}/>
									<span className={style.author}>
                        {`${article.user.firstName}  ${article.user.lastName}`}
                    </span>
									<span className={style.data}>
                        {article.date.replace('T', ' ').slice(0, -8)}
                    </span>
									<span className={style.views}>
                      <div className={style.eyeContainer}>
                          <img className={style.eye} src={eyeImg}></img>
                          <span>{article.views}</span>
                      </div>
                  </span>
								</footer>
							</div>
						</article>
					}) : <div>No articles</div>}
				</div>
				<div className={style.pagination}>
					<div className={style.buttons} onClick={Prev}>
						<p>Prev</p>
					</div>
					<div className={style.buttons} onClick={Next}>
						<p>Next</p>
					</div>
				</div>
			</section>
		</main>
	)
}
