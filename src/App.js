import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {PrivateRoutes, PublicRoutes} from "./routes/routes";
import {Redirect, Route, Switch} from "react-router-dom";
import {useEffect, useState} from "react";
import {authContext, loginFuncContext} from "./context/context";


function App() {

  const [userData, setUserData] = useState('')
  const [redirect, setRedirect] = useState(false)


  useEffect(()=>{
    if (localStorage.getItem('token')) {
      const candidate = JSON.parse(localStorage.getItem('token'))
      console.log(candidate)
      setUserData(candidate)
    }
    setRedirect(true)
  },[])

  const login = (value, setMessage) => {
    const users = JSON.parse(localStorage.getItem('users'))
    const candidate = users.filter(el=>el.email === value.email)[0]
    if (candidate)
    {
      if (candidate.password === value.password) {
        localStorage.setItem('token', JSON.stringify(candidate.email))
        setUserData(candidate.email)
      }
      else {
        setMessage('Неправильный логин или пароль')
      }
    }
    else {
      setMessage('Неправильный логин или пароль')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUserData(null)
  }


  return (
    <div>
    <div className='layout'>
    <Header userData={userData} logout={logout}/>
      <loginFuncContext.Provider value={login}>
      <authContext.Provider value={userData}>
    <Switch>
      {userData ?
        PrivateRoutes.map((item,index)=> {
          return <Route path={item.path}
                        component={item.component}
                        key={item.index}
                        exact={item.exact}
          />
        })
        :
        PublicRoutes.map((item,index)=>{
          return <Route path={item.path}
                        component={item.component}
                        key={item.index}
        />
      })
      }
      {redirect ? <Redirect path='/' to='/main'/>:''}
    </Switch>
      </authContext.Provider>
      </loginFuncContext.Provider>
    </div>
    <Footer userData={userData} logout={logout}/>
    </div>
  );
}



export default App;
