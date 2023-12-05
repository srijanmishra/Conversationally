import { Sun, Settings, User } from "react-feather";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Sun />
            </div>
            <div className="col-6 text-right">
              <User className="mr-2" />
              <Settings />
            </div>
          </div>
        </div>
      </nav>
      <main className="py-5">{children}</main>
      <footer></footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
