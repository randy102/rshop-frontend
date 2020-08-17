
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

  // Shop
  {
    path: '/shop',
    name: 'Cửa hàng',
    icon: 'ShopOutlined',
    component: 'Shop',
    require: 'SHOP',
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

  // Product
  {
    path: '/product',
    name: 'Sản phẩm',
    icon: 'ShoppingOutlined',
    component: 'Product',
    require: 'PRODUCT',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      },
      {
        path: '/category',
        name: 'Thể loại',
        component: 'Category'
      },
      {
        path: '/brand',
        name: 'Thương hiệu',
        component: 'Brand'
      }
    ]
  },

  // Store
  {
    path: '/store',
    name: 'Kho hàng',
    icon: 'CodeSandboxOutlined',
    component: 'Store',
    require: 'STORE',
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
    icon: 'DollarCircleOutlined',
    component: 'Sale',
    require: 'SALE',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },

  // Activities
  {
    path: '/promotion',
    name: 'Khuyến mãi',
    icon: 'ShoppingCartOutlined',
    component: 'Promotion',
    require: 'PROMOTION',
    childrens: [
      {
        default: true,
        path: '/general',
        name: 'Tổng quan',
        component: 'General'
      }
    ]
  },


  //Staff
  {
    path: '/staff',
    name: 'Thành viên',
    icon: 'TeamOutlined',
    component: 'Staff',
    require: 'STAFF',
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
  }
]

export default ManageRouteConfig