import {convertToRaw, EditorState} from 'draft-js';

export const Registration = (value, setMessageSuccess) => {
	const user = {
		firstName: value.firstName,
		lastName: value.lastName,
		email: value.email,
		password: value.password
	}
	if (localStorage.getItem('users')) {
		const users = JSON.parse(localStorage.getItem('users'))
		const candidate = users.find(el => el.email === user.email)
		console.log(candidate)
		if (candidate) {
			setMessageSuccess('Такой пользователь уже существует')

		} else {
			users.push(user)
			localStorage.setItem('users', JSON.stringify(users))
			setMessageSuccess('Пользователь создан')
			return user
		}
	} else {
		localStorage.setItem('users', JSON.stringify([user]))
		setMessageSuccess('Пользователь создан')
		return user
	}
}
