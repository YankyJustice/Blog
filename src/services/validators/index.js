export const email = (value)=>{
	const regEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let error
	if (!value){
		error = 'Required'
	}
	if (value && !regEXP.test(String(value).toLowerCase())) {
		error = 'Invalid email'
	}
	return error
}

export const lastName = (value) => {
	const regEXP = /^[a-zA-Z0-9 ]+$/
	let error
	if (!value){
		error = 'Required'
	}
	if (value && !regEXP.test(value)) {
	 error = 'Only english'
	}

	return error
}


export const firstName = (value) => {
	const regEXP = /^[a-zA-Z0-9 ]+$/
	let error
	if (!value){
		error = 'Required'
	}
	if (value && !regEXP.test(value)) {
		error = 'Only english'
	}
	return error
}

export const passwords = (values) => {
	const errors = {};
	if (values.password !== values.repeatPassword) {
		errors.repeat = 'Passwords not match'
	}
	return errors;
};

export const password = (value) => {
	const regExp = /[!@#$%^&*]/
	const eng = /[A-Za-z]/
	let error
	if (!value)
	{
		error = 'Required'
	}
	if (value && value.length<6)
	{
		error = 'Min length 6 symbols'
	}
	if (value && !regExp.test(value)){
		error = 'any symbol !@#$%^&*'
	}
	if (value && !eng.test(value)){
		error = 'any english letter'
	}
	return error;
};
