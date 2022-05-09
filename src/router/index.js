// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import home from '../components/home'
import login from '../components/login'
import register from '../components/register'
import welcome from '../components/welcome'
import detail from '../components/detail'


//创建并暴露一个路由器
const router= new VueRouter({
	routes:[
        {
            path:'/register',
            name:register,
            component:register
        },
		{
			path:'/login',
            name:login,
			component:login
		},
        {
            path:'/home',
            name:home,
            component:home,
            meta:{isAuth:true},
            beforeEnter(to,from,next){
                if(to.meta.isAuth){
                    console.log('beforeEnter',to,from)
                    if(sessionStorage.getItem('token')){
                        next();
                    }
                    else{
                        alert('你无权查看!!');
                        this.$router.push('/register');
                    }
                }else{
                    next();
                }
            },
            children:[{
                path:'/',
                component:welcome,
                meta:{isAuth:true},
            },
            {
                path:'detail',
                component:detail,
                meta:{isAuth:true},
            }
        ]
        }
	]
})

export default router
