import GroupIcon from '@mui/icons-material/GroupRounded'
import PersonalIcon from '@mui/icons-material/PersonRounded'
import AdminGroupIcon from '@mui/icons-material/GroupAddRounded'
import TradingIcon from '@mui/icons-material/AttachMoneyRounded'
import { CiDeliveryTruck } from 'react-icons/ci'
import { BiSolidDashboard } from 'react-icons/bi'
import { HiOutlineUsers } from 'react-icons/hi'
import { LiaProductHunt } from 'react-icons/lia'
import { TbTruckDelivery } from 'react-icons/tb'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import HistoryIcon from '@mui/icons-material/History'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SettingsIcon from '@mui/icons-material/Settings'

const oldRoutes = [
  {
    href: '/',
    icon: <GroupIcon fontSize="small" />,
    title: 'Home',
  },
  {
    href: '/Info',
    icon: <PersonalIcon fontSize="small" />,
    title: 'Delivery Info',
  },
  {
    href: '/Payment',
    icon: <AdminGroupIcon fontSize="small" />,
    title: 'Payment',
  },
  {
    href: '/DeliveryStatus',
    icon: <CiDeliveryTruck fontSize="small" />,
    title: 'Delivery Status',
  },
  {
    href: '/Confirmation',
    icon: <TradingIcon fontSize="small" />,
    title: 'Confirmation',
  },
]

const navRoutes = [
  {
    href: '/',
    icon: <HomeIcon fontSize="small" />,
    title: 'Home',
  },
  {
    href: '/Info',
    icon: <CalendarTodayIcon fontSize="small" />,
    title: 'Schedule a Pickup',
  },
  {
    href: '/pickup-history',
    icon: <HistoryIcon fontSize="small" />,
    title: 'Pickup History',
  },
  {
    href: '/wallet',
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    title: 'Wallet',
  },
  {
    href: '/settings',
    icon: <SettingsIcon fontSize="small" />,
    title: 'Settings',
  },
]

const adminRoutes = [
  {
    href: '/admin/dashboard',
    icon: <BiSolidDashboard fontSize="small" />,
    title: 'Dashboard',
  },
  {
    href: '/admin/users',
    icon: <HiOutlineUsers fontSize="small" />,
    title: 'Users',
  },
  {
    href: '/admin/products',
    icon: <LiaProductHunt fontSize="small" />,
    title: 'Products',
  },
  {
    href: '/admin/deliveries',
    icon: <TbTruckDelivery fontSize="small" />,
    title: 'Deliveries',
  },
  // {
  //   href: '/admin/orders',
  //   icon: <TradingIcon fontSize="small" />,
  //   title: 'Orders',
  // },
]
export { oldRoutes, navRoutes, adminRoutes }
