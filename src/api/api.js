import axios from "axios";

const instance = axios.create({baseURL:'http://localhost:4000/'})


export const authAPI = {
	login: (values)=> instance.post('auth/login', values).then(res=>res.data),
	singUp: (values)=> instance.post('auth/singUp', values).then(res=>res.data),
	auth: ()=>instance.post('auth/isAuth', {token:JSON.parse(localStorage.getItem('token'))}).then(res=>res.data),
}

export const articlesAPI = {
	add: (values)=> instance.post('/articles/add', values, {headers:{
		'content-type':'multipart/form-data'
		}}),
	getAllArticles: (num)=>instance.get(`/articles/allArticles?page=${num}`).then(res=>res.data),
	getPopularArticle: ()=>instance.get('/articles/popularArticle').then(res=>res.data),
	getArticle: (id)=>instance.get(`/articles/article?id=${id}`).then(res=>res.data),
	getMyArticles: (num,user)=>instance.get(`/articles/myArticles?page=${num}&&email=${user}`).then(res=>res.data),
	addView:(id)=>instance.put('/articles/addView', {id}).then(res=>res.data)
}

export const profileApi = {
	updPhoto: (payload)=> instance.put('profile/photo', payload).then(res=>res.data),
	deletePhoto: (user)=> instance.delete(`profile/photo?email=${user}`).then(res=>res.data),
	updateProfile: (payload)=> instance.put('profile/update', payload).then(res=>res.data)
}