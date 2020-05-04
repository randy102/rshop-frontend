import Shop from 'pages/shop/Shop'
import Staff from 'pages/manage/Staff'
import { TeamOutlined, ShopOutlined, ShoppingCartOutlined, SlidersOutlined, GiftOutlined, ShoppingOutlined } from '@ant-design/icons'
import Product from 'pages/manage/Product'
import Dashboard from 'pages/manage/Dashboard'
import Sale from 'pages/manage/Sale'
import Promotion from 'pages/manage/Promotion'
import Item1 from 'pages/manage/Dashboard/item1/Item1'
import Item2 from 'pages/manage/Dashboard/item2/Item2'

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Bảng điều khiển',
    icon: SlidersOutlined
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


  {
    path: '/product',
    component: Product,
    name: 'Sản phẩm',
    icon: ShoppingOutlined
  },
  {
    path: '/sale',
    component: Sale,
    name: 'Bán hàng',
    icon: ShoppingCartOutlined
  },
  {
    path: '/shop',
    component: Shop,
    name: 'Cửa hàng',
    icon: ShopOutlined
  },
  {
    path: '/staff',
    component: Staff,
    name: 'Nhân viên',
    icon: TeamOutlined
  },
  {
    path: '/promotion',
    component: Promotion,
    name: 'Khuyến mãi',
    icon: GiftOutlined
  }
]