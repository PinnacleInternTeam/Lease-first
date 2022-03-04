import React, { Fragment, useState, useEffect } from "react";
import { Container, Navbar, Nav, NavItem, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Login from "../auth/Login";
import "react-datepicker/dist/react-datepicker.css";
import TenantSettings from "../dashboard/TenantSettings";
import AddUser from "../dashboard/AddUser";
import { getAllSettings } from "../../actions/tenants";

const Header = ({
  auth: { isAuthenticated, loading, user, allTenantSetting },
  logout,

  getAllSettings,
}) => {
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);

  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [showTenantSetting, setTenantSetting] = useState(false);
  const [showAddUserSetting, setAddUserSetting] = useState(false);
  // const handleLoginModalClose = () => setShowLogin(false);
  // const handleLoginModalShow = () => setShowLogin(true);

  const handleLogoutModalClose = () => setShowLogout(false);
  const handleLogoutModalShow = () => setShowLogout(true);
  const handleTenantSettingModalClose = () => setTenantSetting(false);
  const handleAddUserModalClose = () => setAddUserSetting(false);

  const handleTenantSettingModalShow = () => setTenantSetting(true);
  const handleUserAddModalShow = () => setAddUserSetting(true);
  const LogoutModalClose = () => {
    handleLogoutModalClose();
    logout();
  };
  const openSecondLevelMenu2 = () => {
    const menu = document.getElementById("second-level-menu2");
    if (window.innerWidth <= 992) {
      if (menu) {
        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
      } else {
        menu.style.display = "none";
      }
    }
  };

  return (
    <Fragment>
      <header>
        <Container id="header_navbar">
          <Navbar
            className="navbar_height top_menu"
            expand="lg"
            fixed="top"
            style={{ padding: "0px 1em" }}
          >
            <Navbar.Brand>
              <img
                className="log_size"
                alt="Pinnacle Media"
                src={require("../../static/images/pmLogo_wh.png")}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto navbar_Collapse_content">
                {/* <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <Link to="/tenant-add-details">Rent Details</Link>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem> */}
                <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <Link to="/add-tenant-details">Add Tenant Details</Link>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>
                <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <Link to="/add-agreement-details">
                      Add agreement Details
                    </Link>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>

                <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <Link to="/shop-Details">Shop Details</Link>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>

                <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <Link to="/all-tenant-shop-Details">
                      All Tenants Shop Details
                    </Link>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>
              </Nav>
              {!loading && isAuthenticated && user ? (
                <Nav>
                  <ul className="top-level-menu text-right">
                    <li>
                      <Link
                        to="#"
                        onClick={() => openSecondLevelMenu2()}
                        className="navbar-right"
                      >
                        {user.fullName}
                        <i className="fa fa-caret-down" />
                      </Link>

                      <ul className="dropdown-menu second-level-menu ">
                        <li>
                          <Link
                            to="#"
                            onClick={() => handleTenantSettingModalShow()}
                          >
                            Tenant Setting
                          </Link>
                        </li>
                        <li>
                          <Link to="#" onClick={() => handleUserAddModalShow()}>
                            Add User
                          </Link>
                        </li>
                        <li>
                          <Link to="/change-password">Change Password</Link>
                        </li>
                        <li>
                          <Link to="#" onClick={() => handleLogoutModalShow()}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Nav>
              ) : (
                <Fragment>
                  <Nav>
                    <NavItem>
                      {/* <Link to="#" onClick={() => handleLoginModalShow()}>
                        LOGIN
                      </Link> */}
                    </NavItem>

                    <Modal
                      show={showLogin}
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header></Modal.Header>
                      <Modal.Body>
                        {/* <button
                          onClick={() => handleLoginModalClose()}
                          className="close"
                        >
                          <img
                            src={require("../../static/images/close.png")}
                            alt="X"
                          />
                        </button> */}
                        <Login />
                      </Modal.Body>
                    </Modal>
                  </Nav>
                </Fragment>
              )}
            </Navbar.Collapse>
          </Navbar>
        </Container>

        {/*Tenant Settings Modal */}
        <Modal
          show={showTenantSetting}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Tenant Setting</h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleTenantSettingModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <TenantSettings />
          </Modal.Body>
        </Modal>
        <Modal
          show={showAddUserSetting}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add User</h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleAddUserModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddUser />
          </Modal.Body>
        </Modal>

        {/* Logout Modal */}
        <Modal
          show={showLogout}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Confirmation</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Are you sure you want to logout?</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              onClick={() => LogoutModalClose()}
            >
              YES
            </button>
            <button
              className="btn btn_green_bg"
              onClick={() => handleLogoutModalClose()}
            >
              NO
            </button>
          </Modal.Footer>
        </Modal>
      </header>
    </Fragment>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getAllSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, getAllSettings })(Header);
