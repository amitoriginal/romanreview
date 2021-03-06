import LoadableComponent from './../Loadable/index';

export const userRouter: any = [
  {
    path: '/user',
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('src/components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
  },

  {
    path: '/user/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('src/scenes/Login')),
    showInMenu: false,
  },
];

export const appRouters: any = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    icon: 'home',
    component: LoadableComponent(() => import('src/components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: 'home',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/Dashboard')),
  },
  {
    path: '/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: 'user',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/Users')),
  },
  {
    path: '/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: 'tags',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/Roles')),
  },
  {
    path: '/objects',
    permission: '',
    title: 'Objects',
    name: 'object',
    icon: 'tags',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/Objects'))
  },
  {
    path: '/reviews',
    permission: '',
    title: 'Reviews',
    name: 'review',
    icon: 'tags',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/Reviews'))
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: 'appstore',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/Tenants')),
  },
  {
    path: '/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: 'info-circle',
    showInMenu: true,
    component: LoadableComponent(() => import('src/scenes/About')),
  },
  {
    path: '/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('src/components/Logout')),
  },
  {
    path: '/exception',
    permission: '',
    title: 'exception',
    name: 'exception',
    icon: 'info-circle',
    showInMenu: false,
    component: LoadableComponent(() => import('src/scenes/Exception')),
  },
];

export const routers = [...userRouter, ...appRouters];
