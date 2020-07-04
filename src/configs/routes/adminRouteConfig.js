const AdminRouteConfig = [
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
    component:'Shop',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },

  // Hợp đồng
  {
    path: '/contracts',
    name: 'Hợp đồng',
    icon: 'PaperClipOutlined',
    component:'Contract',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },

  // Quyền
  {
    path: '/permissions',
    name: 'Quyền',
    icon: 'KeyOutlined',
    component:'Permission',
    childrens: [
      {
        path: '/general',
        name: 'Tổng quan',
        component: 'General',
        default: true
      }
    ]
  },

  // Gói
  {
    path: '/plans',
    name: 'Gói sử dụng',
    icon: 'GiftOutlined',
    component:'Plan',
    childrens: [
      {
        path: '/general',
        name: 'Tổng quan',
        component: 'General',
        default: true
      }
    ]
  },

  // Mẫu thiết kế
  {
    path: '/templates',
    name: 'Mẫu thiết kế',
    icon: 'SkinOutlined',
    component:'Template',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
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
      },
      {
        path: '/password',
        name: 'Đổi mật khẩu',
        component: 'Password'
      },
      {
        path: '/logout',
        name: 'Đăng xuất',
        component: 'Logout'
      }
    ]
  },
]

export default AdminRouteConfig