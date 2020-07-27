
const ManageRouteConfig = [
  // Dashboard
  {
    default: true,
    path: '/dashboard',
    name: 'Bảng điều khiển',
    icon: 'DashboardOutlined',
    component: 'Dashboard',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },
  // Product
  {
    path: '/product',
    name: 'Sản phẩm',
    icon: 'ShoppingOutlined',
    component: 'Product',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },

  // Sale
  {
    path: '/sale',
    name: 'Bán hàng',
    icon: 'ShoppingCartOutlined',
    component: 'Sale',
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
    path: '/shop',
    name: 'Cửa hàng',
    icon: 'ShopOutlined',
    component: 'Shop',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      },
      {
        path: '/create',
        name: 'Tạo mới',
        component: 'Create'
      }
    ]
  },

  //Staff
  {
    path: '/staff',
    name: 'Nhân viên',
    icon: 'TeamOutlined',
    component: 'Staff',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
    
  },

  // Promotion
  {
    path: '/promotion',
    name: 'Khuyến mãi',
    icon: 'GiftOutlined',
    component: 'Promotion',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },

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
  }
]

export default ManageRouteConfig