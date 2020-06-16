import { TeamOutlined, ShopOutlined, ShoppingCartOutlined, SlidersOutlined, GiftOutlined, ShoppingOutlined } from '@ant-design/icons'


const ManageRouteConfig = [
  // Dashboard
  {
    path: '/dashboard',
    name: 'Bảng điều khiển',
    icon: SlidersOutlined,
    defaultRoute: '/item1'
  },
  {
    parent: '/dashboard',
    path: '/item1',
    
    name: 'Item 1',
    icon: SlidersOutlined
  },
  {
    parent: '/dashboard',
    path: '/item2',
    
    name: 'Item 2',
    icon: SlidersOutlined
  },

  // Product
  {
    path: '/product',
    name: 'Sản phẩm',
    icon: ShoppingOutlined,
    defaultRoute: '/'
  },

  // Sale
  {
    path: '/sale',
    name: 'Bán hàng',
    icon: ShoppingCartOutlined,
    defaultRoute: '/'
  },

  // Shop
  {
    path: '/shop',
    name: 'Cửa hàng',
    icon: ShopOutlined,
    defaultRoute: '/'
  },

  //Staff
  {
    path: '/staff',
    name: 'Nhân viên',
    icon: TeamOutlined,
    defaultRoute: '/',
  },

  // Promotion
  {
    path: '/promotion',
    name: 'Khuyến mãi',
    icon: GiftOutlined,
    defaultRoute: '/',
  }
]

export default ManageRouteConfig