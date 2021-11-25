import {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import {NumberParam, useQueryParam} from "use-query-params";

import {Preloader} from "../../Preloader";
import {authContext} from '../../context/context';
import {articlesAPI} from "../../api/api";

import style from './MyArticles.module.css'
import defaultPhoto from '../../assets/post1.jpg'
import eyeImg from '../../assets/eye.png';

export const MyArticles = () => {
	const [articles, setArticles] = useState([])
	const [maxPage, setMaxPage] = useState()
	const [queryPage, setQueryPage] = useQueryParam('page', NumberParam)
	const [isFetching, setIsFetching] = useState(true)

	const profile = useContext(authContext)
	const profilePhoto = profile.photo ? 'http://localhost:4000/' + profile.photo : defaultPhoto

	useEffect(async () => {
		const currentPage = queryPage || 1
		const response = await articlesAPI.getMyArticles(currentPage, profile.email)
		setArticles(response.items)
		setQueryPage(currentPage)
		setMaxPage(Math.ceil(response.countArticles / 6))
		setIsFetching(false)
	}, [])

	const nextPage = async () => {
		if (queryPage + 1 <= maxPage) {
			const response = await articlesAPI.getMyArticles(queryPage + 1, profile.email)
			setArticles(response.items)
			setQueryPage(queryPage + 1)
		}
	}
	const prevPage = async () => {
		if (queryPage - 1 > 0) {
			const response = await articlesAPI.getMyArticles(queryPage - 1, profile.email)
			setArticles(response.items)
			setQueryPage(queryPage - 1)
		}
	}


	if (isFetching) {
		return <Preloader/>
	}

	return <main className={style.myArticles}>
		<div className={style.profile}>
			<img src={profilePhoto}/>
			<div className={style.profileName}>
				<span>{`${profile.firstName} ${profile.lastName}`}</span>
			</div>
			<div className={style.profileDescription}>
				{profile.description
					?
					<p>{profile.description}</p>
					:
					<p>No description</p>}
			</div>
		</div>
		{articles.length > 0
			?
			(<section className={style.posts}>
				{articles.map(article => {
					return <div className={style.post}>
						<div className={style.postPhoto}>
							<img src={'http://localhost:4000/' + article.image}/>
						</div>
						<div className={style.tag}>
							<span>#{article.category}</span>
						</div>
						<header className={style.header}>
							<NavLink onClick={() => console.log(1)} to={`article${article.id}`}>
								<h2>{article.title}</h2>
							</NavLink>
						</header>
						<div className={style.text}
						     dangerouslySetInnerHTML={{__html: draftToHtml(article.text)}}
						>
						</div>
						<footer className={style.footer}>
							<img src={profilePhoto} className={style.photoSmall}/>
							<span className={style.author}>
							{`${article.user.firstName}  ${article.user.lastName}`}
						</span>
							<span className={style.data}>{article.date.replace('T', ' ').slice(0, -8)}</span>
							<span className={style.views}>
							<div className={style.eyeContainer}>
								<img className={style.eye} src={eyeImg}/>
							<span>{article.views}</span>
								</div>
						</span>
						</footer>
					</div>
				})}
				<div className={style.pagination}>
					<div className={style.buttons} onClick={prevPage}>
						<p>Prev</p>
					</div>
					<div className={style.buttons} onClick={nextPage}>
						<p>Next</p>
					</div>
				</div>
			</section>)
			:
			<div className={style.emptyArticles}>
				<span>No articles</span>
			</div>
		}
	</main>
}