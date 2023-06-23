 import Dashboard from "../views/Dashboard.js";
 import UserProfile from "../views/UserProfile.js";
 import Typography from "../views/Typography.js";
 import ClientStatistic from "../components/statistic/ClientStatistic";
 import FilesUsers from "../views/FilesUsers";
 import Corbeille from "../views/Corbeille";
 import Home from "../views/Home";
 import Orders from "../views/Orders";
 import BuyOrders from "../views/BuyOrders";

 import Tutorial from "../views/Tutorial";
 import ClientSearchStatistics from "../components/statistic/SearchStatistics/ClientSearchStatistics";
 import History from "../views/History";
 import Icons from "../views/Icons";
 const UserRoutes = {

    parentPath: '',
  
      childrenRoutes: [
     
  /*{
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },*/
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/buyorders",
    name: "Buy Crypto",
    icon: "nc-icon nc-cart-simple",
    component: BuyOrders,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "My Orders",
    icon: "nc-icon nc-money-coins",
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    icon: "nc-icon nc-atom",
    component: Tutorial,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/management",
    name: "User management",
    icon: "nc-icon nc-settings-90",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/tutorialManagemnt",
    name: "Tutorial Management",
    icon: "nc-icon nc-settings-gear-64",
    component: Icons,
    layout: "/admin",
  },
  /*{
    path: "/typography",
    name: "Users List",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
  },*/
  {
    path: "/statistic",
    name: "Statistic",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
},

//////////////////added by Houssem


{
  path: "/files",
  name: "files",
  icon: "nc-icon nc-single-copy-04",
  component: Icons,
  layout: "/admin",
},

{
  path: "/corbeille",
  name: "Recycle Bin",
  icon: "fa fa-trash",
  component: Icons,
  layout: "/admin",
},


{
  path: "/clientSearchStatistics",
  name: "SearchStatistics",
  icon: " nc-icon nc-chart-bar-32",
  component: Icons,
  layout: "/admin",
},
{
  path: "/history",
  name: "History",
  icon: "fa fa-business-time",
  component: Icons,
  layout: "/admin",
},




]};

export default UserRoutes;

