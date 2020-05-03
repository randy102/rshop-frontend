import Shop from 'pages/shop/Shop'
import Staff from 'pages/manage/Staff'
import { TeamOutlined, ShopOutlined, ShoppingCartOutlined, SlidersOutlined, GiftOutlined, ShoppingOutlined } from '@ant-design/icons'
import Product from 'pages/manage/Product'
import Dashboard from 'pages/manage/Dashboard'
import Sale from 'pages/manage/Sale'
import Promotion from 'pages/manage/Promotion'

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Bảng điều khiển',
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
  },

]