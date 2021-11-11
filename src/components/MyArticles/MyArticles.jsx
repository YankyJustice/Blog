import style from './MyArticles.module.css'
import profilePhoto from './../../Assets/post1.jpg'
import eyeImg from "../../Assets/eye.png";
import eyeCenterImg from "../../Assets/eyeCenter.png";

const items = [1,2,3,4]

export const MyArticles = ()=>{
	return <main className={style.myArticles}>
		<div className={style.profile}>
				<img src={profilePhoto}/>
				<div className={style.profileName}>
					<span>Janay Wright</span>
				</div>
				<div className={style.profileDescription}>
					<p>Pellentesque odio nisi, euismod in,
						pharetra a, ultricies in, diam. Sed arcu.</p>
				</div>
		</div>
		<section className={style.posts}>
			{items.map((item,index)=>{
				return <div className={style.post}>
				<div className={style.postPhoto}>
					<img src={profilePhoto}/>
				</div>
				<div className={style.tag}>
					<span>#Typography</span>
				</div>
				<header className={style.header}>
				<h2>Humane Typography in the Digital Age</h2>
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
						<span className={style.author}>Janay Wright</span>
						<span className={style.data}>Jun 13 · 5 min read</span>
						<span className={style.views}>
							<div className={style.eyeContainer}>
								<img className={style.eye} src={eyeImg}></img>
								<img className={style.eyeCenter} src={eyeCenterImg}></img>
							</div>
							<span>1690</span>
						</span>
					</footer>
				</div>
			})}
			<div className={style.pagination}>
				<div className={style.buttons}><p>Prev</p></div>
				<div className={style.buttons}><p>Next</p></div>
			</div>
		</section>
	</main>
}