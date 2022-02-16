import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../utils/AuthContext';

const Header = () => {
  const {loggedIn, logout, userData } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate('/');
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Project Name</h1>
          </Link>
          <p className="m-0">This is a sub-title</p>
        </div>
        <div>
          {loggedIn ? (
            <>
              <span>Hey there, {userData?.data?.username || ""}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
