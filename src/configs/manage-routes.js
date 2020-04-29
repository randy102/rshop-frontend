import Shop from 'pages/shop/Shop'
import User from 'pages/manage/User'
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


export default [
  {
    path: '/shop',
    component: Shop,
    name: 'Cửa hàng',
    icon: StorefrontIcon
  },
  {
    path: '/user',
    component: User,
    name: 'Người dùng',
    icon: PeopleAltIcon
  }
]