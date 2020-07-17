
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
  },

  // Sale
  {
    path: '/sale',
    name: 'Bán hàng',
    icon: 'ShoppingCartOutlined',
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
    
  },

  // Promotion
  {
    path: '/promotion',
    name: 'Khuyến mãi',
    icon: 'GiftOutlined',
  },

  {
    path: '/account',
    name: 'Tài khoản',
    icon: 'UserOutlined'
  }
]

export default ManageRouteConfig