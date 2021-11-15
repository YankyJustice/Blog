import {useEffect, useState} from "react";

export const useProfile = (user)=>{
	const [profile, setProfile] = useState({})

	useEffect(()=>{
		const users = JSON.parse(localStorage.getItem('users'))
		const owner = users.find(el=>el.email === user)
		if (owner){
			setProfile(owner)
		}
	},[])

	return profile
}