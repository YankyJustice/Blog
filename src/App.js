import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {PrivateRoutes, PublicRoutes} from "./routes/routes";
import {Redirect, Route, Switch} from "react-router-dom";
import {Main} from "./components/Main";
import {useState} from "react";



function App() {
  const isAuth = true
  return (
    <div>
    <div className='layout'>
    <Header/>
    <Switch>
      {isAuth ?
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
      <Redirect path='/' to='/main'/>
    </Switch>
    </div>
    <Footer/>
    </div>
  );
}



export default App;
