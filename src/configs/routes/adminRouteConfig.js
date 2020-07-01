// @flow

type RouteConfig = {
  path: string,
  name: string,
  icon?: string,
  component: string,
  default?: boolean,
  childrens?: RouteConfig[]
}

const AdminRouteConfig: RouteConfig[] = [
  // Người dùng
  {
    path: '/users',
    name: 'Người dùng',
    icon: 'TeamOutlined',
    component: 'User',
    default: true,
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },

  // Shop
  {
    path: '/shops',
    name: 'Cửa hàng',
    icon: 'ShopOutlined',
    component:''
  },

  // Hợp đồng
  {
    path: '/contracts',
    name: 'Hợp đồng',
    icon: 'PaperClipOutlined',
    component:''
  },

  // Quyền
  {
    path: '/permissions',
    name: 'Quyền',
    icon: 'KeyOutlined',
    component:''
  },

  // Gói
  {
    path: '/plans',
    name: 'Gói sử dụng',
    icon: 'GiftOutlined',
    component:''
  },

  // Mẫu thiết kế
  {
    path: '/templates',
    name: 'Mẫu thiết kế',
    icon: 'SkinOutlined',
    component:''
  },



  // Tài khoản
  {
    path: '/account',
    name: 'Tài khoản',
    icon: 'UserOutlined',
    component: 'Account',
    childrens : [
      {
        path: '/profile',
        name: 'Hồ sơ',
        component: 'Profile',
        default: true
      }
    ]
  },
]

export default AdminRouteConfig