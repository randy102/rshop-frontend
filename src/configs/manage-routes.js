import { TeamOutlined, ShopOutlined, ShoppingCartOutlined, SlidersOutlined, GiftOutlined, ShoppingOutlined } from '@ant-design/icons'
import Item1 from 'pages/manage/Dashboard/item1/Item1'
import Item2 from 'pages/manage/Dashboard/item2/Item2'

export default [
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
    component: Item1,
    name: 'Item 1',
    icon: SlidersOutlined
  },
  {
    parent: '/dashboard',
    path: '/item2',
    component: Item2,
    name: 'Item 2',
    icon: SlidersOutlined
  },

  // Product
  {
    path: '/product',
    name: 'Sản phẩm',
    icon: ShoppingOutlined,
    defaultRoute: '/item1'
  },

  // Sale
  {
    path: '/sale',
    name: 'Bán hàng',
    icon: ShoppingCartOutlined,
    defaultRoute: '/item1'
  },

  // Shop
  {
    path: '/shop',
    name: 'Cửa hàng',
    icon: ShopOutlined,
    defaultRoute: '/item1'
  },

  //Staff
  {
    path: '/staff',
    defaultRoute: '/item1',
    name: 'Nhân viên',
    icon: TeamOutlined
  },

  // Promotion
  {
    path: '/promotion',
    defaultRoute: '/item1',
    name: 'Khuyến mãi',
    icon: GiftOutlined
  }
]