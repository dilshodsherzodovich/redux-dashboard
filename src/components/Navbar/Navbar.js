import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <header className="p-3 text-white ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 text-white">
                  Redux
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 text-white">
                  Redux Thunk
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 text-white">
                  Redux ToolKit
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link px-2 text-white">
                  Middlewares
                </Link>
              </li>
            </ul>

            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
