import {Main} from "../components/Main";
import {MyArticles} from "../components/MyArticles";
import {Login} from "../components/Login";
import {SingIn} from "../components/SingIn";
import {Profile} from "../components/Profile";
import {AddArticle} from "../components/AddArticle";


export const PublicRoutes = [
    {
        path:'/main',
        component:Main,
        exact: true,
    },
    {
        path:'/login',
        component:Login,
        exact: true,
    },
    {
        path:'/singin',
        component:SingIn,
        exact: true,
    }
]
export const PrivateRoutes = [
    {
        path:'/main',
        component:Main,
        exact: true,
    },
    {
        path:'/myArticles',
        component:MyArticles,
        exact: true,
    },
    {
        path:'/profile',
        component:Profile,
        exact: true,
    },
    {
        path:'/addArticle',
        component:AddArticle,
        exact: true,
    },
    {
        path:'/article:id',
        component:AddArticle,
        exact: true,
    },
]
