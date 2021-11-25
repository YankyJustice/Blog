import {Redirect, Route, Switch} from 'react-router-dom'
import {useEffect, useState} from 'react'

import {Header} from './components/Header'
import {Footer} from './components/Footer'
import {PrivateRoutes, PublicRoutes} from './routes/routes'
import {authContext, setUserContext} from './context/context'
import {authAPI} from './api/api'

import './App.css'


function App() {

	const [userData, setUserData] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [appInit, setAppInit] = useState(false)


	useEffect(() => {

		authAPI.auth()
			.then(res => {
				setUserData(res)
			})
			.finally(()=>{
				setRedirect(true)
				setAppInit(true)})

	}, [])


	const logout = () => {
		localStorage.removeItem('token')
		setUserData(null)
	}
	if (!appInit) {
		return <></>
	}
	return (
		<div>
			<div className='layout'>
				<Header userData={userData} logout={logout}/>
				<setUserContext.Provider value={setUserData}>
					<authContext.Provider value={userData}>
						<Switch>
							{userData ?
								PrivateRoutes.map((item, index) => {
									return (<Route
										path={item.path}
										component={item.component}
										key={item.index}
										exact={item.exact}
									/>)
								})
								:
								PublicRoutes.map((item, index) => {
									return (
										<Route
											path={item.path}
											component={item.component}
											key={item.index}
										/>)
								})
							}
							{redirect
								?
								<Redirect path='/' to='/main'/>
								: ''
							}
						</Switch>
					</authContext.Provider>
				</setUserContext.Provider>
			</div>
			<Footer userData={userData} logout={logout}/>
		</div>
	);
}

export default App;
