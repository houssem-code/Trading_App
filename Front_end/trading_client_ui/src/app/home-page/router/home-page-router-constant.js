import Login from '../login-page/Login'
import Register from '../register-page/Register'

export const routes = {

    parentPath: '',

    childrenRoutes: [
   
    {
        id:1 ,
        path: '/login',
        component: Login,
        name: 'login',
     
    },   
     {
        id:2 ,
        path: '/register',
        component: Register ,
        name: 'registration',
      
    }
  
]

}