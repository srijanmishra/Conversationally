import { Sun, Settings } from "react-feather";
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
              <Settings />
            </div>
          </div>
        </div>
      </nav>
      {children}
      <footer></footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
