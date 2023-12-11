import {
  Sun as SunIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  MessageCircle as MessageCircleIcon,
} from "react-feather";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';



const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      {/* <nav>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <SunIcon />
            </div>
            <div className="col-4 text-center">
              <Link to="/">
                <MessageCircleIcon />
              </Link>
            </div>
            <div className="col-4 text-right">
              <UserIcon className="mr-2" />
              <Link to="/settings">
                <SettingsIcon />
              </Link>
            </div>
          </div>
        </div>
      </nav> */}
      <main style={{backgroundColor: theme.palette.secondary}}>
        {children}
      </main>
      <footer></footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
