import React, {useContext} from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "../platform/components/Navbars/AdminNavbar.js"
import Sidebar from "../platform/components/Sidebar/Sidebar";

import routes from "./router/platform-page-router-constant.js";
import userRoutes from "./router/platform-page-router-constant-user";
import AuthentificationContext from '../../context/authentification-context'

import sidebarImage from "assets/img/sideedm.png";
export default function Platform() {
  const authentificationContext = useContext(AuthentificationContext);

  const role = authentificationContext.profile.authority;
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const location = useLocation();
    const mainPanel = React.useRef(null);
    const getRoutes = (routes,role) => {

      return routes.childrenRoutes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={"/admin" + prop.path}
              render={(props) => <prop.component {...props} />}
              key={key}
            />
          );
        } else {
          return null;
        }
      });
    };
    React.useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
      if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
      ) {
        document.documentElement.classList.toggle("nav-open");
        var element = document.getElementById("bodyClick");
        element.parentNode.removeChild(element);
      }
    }, [location]);
    return (
        <>
        <div className="wrapper">
          <Sidebar color={color} image={hasImage ? image : ""} routes={routes.childrenRoutes} />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="content">
            {role ==="ADMIN"?<Switch>{getRoutes(routes,role)}</Switch>:<Switch>{getRoutes(userRoutes,role)}</Switch>}  
           </div>
          </div>
        </div>
      </>
    )
}
