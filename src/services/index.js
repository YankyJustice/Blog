import {email} from "../validators";

export const Registration = (value, setMessageSuccess) => {
	const user = {firstName:value.firstName,
		            lastName:value.lastName,
					      email:value.email,
					      password:value.password}
	if (localStorage.getItem('users')){
		const users = JSON.parse(localStorage.getItem('users'))
			const candidate = users.find(el=>el.email === user.email)
			console.log(candidate)
			if (candidate)
			{
				setMessageSuccess('Такой пользователь уже существует')

			}
			else {
				users.push(user)
				localStorage.setItem('users', JSON.stringify(users))
				setMessageSuccess('Пользователь создан')
				return user
			}
	}
	else {
		localStorage.setItem('users', JSON.stringify([user]))
		setMessageSuccess('Пользователь создан')
		return user
	}
}

export const addArticle = (value, profile)=>{
	const now = new Date()
	const articles = JSON.parse(localStorage.getItem('articles'))
	if (articles) {
		const id = articles.sort((a,b)=>b.id - a.id)[0].id+1

		articles.push({id,date:now,views:0,authorFirstName:profile.firstName,
			authorLastName:profile.lastName,email:profile.email,...value})
		localStorage.setItem('articles',JSON.stringify(articles))
	}
	else {
		localStorage.setItem('articles', JSON.stringify([{id:1,
			date:now,
			email:profile.email,
			views:0,
			authorFirstName:profile.firstName,
			authorLastName:profile.lastName,
			...value}]))
	}
}