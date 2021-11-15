import style from './MyArticles.module.css'
import profilePhoto from '../../assets/post1.jpg'
import eyeImg from "../../assets/eye.png";
import eyeCenterImg from "../../assets/eyeCenter.png";
import {useContext, useEffect, useState} from "react";
import {authContext} from "../../context/context";
import {useProfile} from "../../hooks/useProfile";
import {NavLink} from "react-router-dom";


export const MyArticles = ()=>{


	const userData = useContext(authContext)
	const profile = useProfile(userData)
	const [myArticles, setMyArticles] = useState([])
	const [allArticles, setAllArticles] = useState([])
	const [articles, setArticles] = useState([])
	const [page, setPage] = useState(1)

	useEffect(()=>{
		const end = page*6
		const start = end-6
		setArticles(myArticles.slice(start,end))
	},[myArticles, page])

	const nextPage = ()=>{
		if (page<myArticles.length/6){
			setPage(page+1)
		}
	}

	const addView = (id)=>{
		const articles = allArticles.map(el=>{
			if (id === el.id){
				el.views +=1
				console.log(el)
				return el
			}
			return el
		})
		localStorage.setItem('articles', JSON.stringify(articles))
	}

	const prevPage = ()=>{
		if (page>1){
			setPage(page-1)
		}
	}


	useEffect(()=>{
		const articles = JSON.parse(localStorage.getItem('articles'))
		setAllArticles(articles)
			setMyArticles(articles
			.filter((el)=>el.email === profile.email)
			.sort((a,b)=>b.id-a.id))
	},[profile])


	return <main className={style.myArticles}>
		<div className={style.profile}>
				<img src={profilePhoto}/>
				<div className={style.profileName}>
					<span>{`${profile.firstName} ${profile.lastName}`}</span>
				</div>
				<div className={style.profileDescription}>
					<p>{profile.description}</p>
				</div>
		</div>
		{articles.length>0 ? <section className={style.posts}>
			{articles.map(article=>{
				return <div className={style.post}>
				<div className={style.postPhoto}>
					<img src={profilePhoto}/>
				</div>
				<div className={style.tag}>
					<span>{`# ${article.category}`}</span>
				</div>
				<header className={style.header}>
				<NavLink onClick={()=>addView(article.id)} to={`article${article.id}`}><h2>{article.title}</h2></NavLink>
				</header>
					<div className={style.text}>
						<p>
							An Essay on Typography by Eric Gill takes the reader back to the year 1930.
							The year when a conflict between two worlds came to its term.
							The machines of the industrial world finally took over the handicrafts.
						</p>
					</div>
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
				</div>
			})}
			<div className={style.pagination}>
				<div className={style.buttons} onClick={prevPage}><p>Prev</p></div>
				<div className={style.buttons} onClick={nextPage}><p>Next</p></div>
			</div>
		</section>:<div className={style.emptyArticles}><span>No articles</span></div>}
	</main>
}