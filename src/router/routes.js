
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'reg', component: () => import('pages/Register') },
      { path: 'home', component: () => import('pages/Index') },
      { path: 'cam', component:() => import('pages/Cameras')} ,
      { path: 'alert_log', component:() => import('pages/AlertLog')},
      { path: 'admin', component:() => import('pages/Admin')},
      { path: 'detail', component: () => import('pages/CamDetail')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
