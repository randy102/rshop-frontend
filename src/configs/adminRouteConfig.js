const AdminRouteConfig = [
  // Quản trị viên
  {
    path: '/staff',
    name: 'Quản trị viên',
    icon: 'ControlOutlined',
    component: 'Staff',
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
  },

  // Người dùng
  {
    path: '/users',
    name: 'Người dùng',
    icon: 'TeamOutlined',
  },

  // Hợp đồng
  {
    path: '/contracts',
    name: 'Hợp đồng',
    icon: 'PaperClipOutlined',
  },

  // Quyền
  {
    path: '/permissions',
    name: 'Quyền',
    icon: 'KeyOutlined',
  },

  // Gói
  {
    path: '/plans',
    name: 'Gói sử dụng',
    icon: 'GiftOutlined',
  },

  // Mẫu thiết kế
  {
    path: '/templates',
    name: 'Mẫu thiết kế',
    icon: 'SkinOutlined',
  },

  

  // Tài khoản
  {
    path: '/account',
    name: 'Tài khoản',
    icon: 'UserOutlined',
  },
]

export default AdminRouteConfig