import {NavLink} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import draftToHtml from 'draftjs-to-html';

import {authContext} from '../../context/context';

import style from './main.module.css'
import imgPost from '../../assets/post1.jpg'
import eyeImg from '../../assets/eye.png'

export const Main = () => {
	const [allArticles, setAllArticles] = useState([])
	const [articles, setArticles] = useState([])
	const [page, setPage] = useState(1)
	const [popularArticle, setPopularArticle] = useState({})

	const auth = useContext(authContext)

	useEffect(() => {
		const end = page * 6
		const start = end - 6
		setArticles(allArticles.slice(start, end))
	}, [allArticles, page])

	const nextPage = () => {
		if (page < allArticles.length / 6) {
			setPage(page + 1)
		}
	}

	const prevPage = () => {
		if (page > 1) {
			setPage(page - 1)
		}
	}

	const addView = (id) => {
		const articles = allArticles.map(el => {
			if (id === el.id) {
				el.views += 1
				console.log(el)
				return el
			}
			return el
		})
		localStorage.setItem('articles', JSON.stringify(articles))
	}

	useEffect(() => {
		const articles = JSON.parse(localStorage.getItem('articles'))
		if (articles && articles.length) {
			setAllArticles(articles.sort((a, b) => b.views - a.views))
			setPopularArticle(articles.sort((a, b) => b.views - a.views)[0])
		}
	}, [])

	return (
		<main>
			<article className={style.topPost}>
				<div className={style.postBlock}>
					<div className={style.image}>
						<img src={imgPost}/>
					</div>
				</div>
				<div className={style.topContent}>
					<div className={style.tag}>
						#{popularArticle.category}
					</div>
					<header className={style.header}>
						{auth
							?
							(<NavLink onClick={() => addView(popularArticle.id)}
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
						<img src={imgPost} className={style.photoSmall}/>
						<span className={style.author}>
                {`${popularArticle.authorFirstName} ${popularArticle.authorLastName}`}
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
			</article>
			<section className={style.popularArticles}>
				<header>
					<h1>Popular articles</h1>
				</header>
				<div className={style.popularArticlesMap}>
					{articles.map(article => {
						return <article className={style.post}>
							<div className={style.postBlock}>
								<div className={style.image}>
									<img src={imgPost}/>
								</div>
							</div>
							<div className={style.content}>
								<div className={style.tag}>#{article.category}</div>
								<header className={style.header}>
									<NavLink onClick={() => addView(article.id)}
									         to={`article${article.id}`}>
										<h2>{article.title}</h2>
									</NavLink>
								</header>
								<article className={style.text}
								         dangerouslySetInnerHTML={{__html: draftToHtml(article.text)}}/>
								<footer className={style.footer}>
									<img src={imgPost} className={style.photoSmall}/>
									<span className={style.author}>
                        {`${article.authorFirstName}  ${article.authorLastName}`}
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
					})}
				</div>
				<div className={style.pagination}>
					<div className={style.buttons} onClick={prevPage}>
						<p>Prev</p>
					</div>
					<div className={style.buttons} onClick={nextPage}>
						<p>Next</p>
					</div>
				</div>
			</section>
		</main>
	)
}
