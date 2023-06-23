 import Dashboard from "../views/Dashboard.js";
 import Admin from "../views/admin/Admin.js"
 import Typography from "../views/Typography.js";
 import Statistic from "../components/statistic/Statistic";
 import Icons from "../views/Icons";
import Auditdossier from "../views/Auditdossier.js";
import Audit from "../views/Audit.js"
import Adminfiles from "../views/admin/AdminFiles";
import Home from "../views/Home";
import AdminTutorial from "../views/AdminTutorial";
import AdminNotifications from "../views/AdminNotifications";
import { icons } from "antd/lib/image/PreviewGroup.js";
import UserProfile from "../views/UserProfile.js";

import BuyOrders from "../views/BuyOrders";

 const routes = {

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
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "My Orders",
    icon: "nc-icon nc-money-coins", 
    component: Icons,
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
    path: "/management",
    name: "User management",
    icon: "nc-icon nc-single-02",
    component: Adminfiles,
    layout: "/admin",
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  
  {
    path: "/tutorialManagemnt",
    name: "Tutorial Management",
    icon: "nc-icon nc-settings-gear-64",
    component: AdminTutorial,
    layout: "/admin",
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-notification-70",
    component: AdminNotifications,
    layout: "/admin",
  },
  {
    
    path: "/audit",
    name: "Audit",
    icon: "nc-icon nc-paper-2",
    component: Icons,
    layout: "/admin",
    
    
    
     
  },
  /*
  {
    
    path: "/typography",
    name: "Audit",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
    
     
  },
  /*
  {
    
    path: "/auditdossier",
    name: "Dossier Parent",
    icon: "nc-icon nc-paper-2",
    component: Auditdossier,
    layout: "/admin",
    
     
  },
  */
  {
              path: "/statistic",
              name: "Statistic",
              icon: "nc-icon nc-atom",
              component: Icons,
              layout: "/admin",
  },
  /*{
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },*/
  
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
//////////////////added by Houssem
{/*
  path: "/files",
  name: "files",
  icon: "nc-icon nc-single-copy-04",
  component: Adminfiles,
  layout: "/admin",
*/},
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

export default routes;

