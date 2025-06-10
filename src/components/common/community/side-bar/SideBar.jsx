import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FiMenu, FiChevronLeft } from "react-icons/fi";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import PropTypes from "prop-types";

import { useToast } from "../../../../hooks/useToast";
import "./styles.css";
import { useSelector } from "react-redux";

export default function SideBar({ communityTypes = [], onSelectCommunity }) {
  const [show, setShow] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { showSuccess, showError } = useToast();
  const { token } = useSelector((state) => state.auth);
  function handleJoinLeave(community, action) {
    const url = `https://localhost:7159/api/Community/${community.id}/${action}`;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to ${action}`);
        if (action === "join") showSuccess(`You joined ${community.name}`);
        else showSuccess(`You left ${community.name}`);
        if (typeof onSelectCommunity === "function") {
          onSelectCommunity({ id: community.id, action });
        }
      })
      .catch((error) => {
        showError(`Failed to ${action} community.`);
        console.error(error);
      });
  }

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      <button
        className="mobile-menu-btn d-lg-none"
        onClick={() => setShow(true)}
        aria-label="Toggle menu"
      >
        <FiMenu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`pt-3 bg-white shadow-lg desktop-sidebar d-none d-lg-flex flex-column vh-100 position-fixed ${
          isCollapsed ? "collapsed" : ""
        }`}
        style={{ width: isCollapsed ? 70 : 240, transition: "width 0.3s" }}
      >
        <div className="px-3 mb-3 d-flex justify-content-end">
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FiChevronLeft
              className={`${isCollapsed ? "rotate-180" : ""}`}
              style={{ transition: "transform 0.3s" }}
            />
          </button>
        </div>
        {/* Communities as filteration */}
        <div className="px-3 sidebar-communities">
          <ul className="list-unstyled">
            <li className="mb-2">
              <button
                className="px-0 btn btn-link text-start w-100 d-flex align-items-center"
                style={{
                  color: "#5d4037",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
                onClick={() => onSelectCommunity && onSelectCommunity(null)}
              >
                <span className={isCollapsed ? "d-none" : ""}>
                  All Communities
                </span>
              </button>
            </li>
            {communityTypes.length === 0 && (
              <li className="text-muted">
                <span className={isCollapsed ? "d-none" : ""}>
                  No communities
                </span>
              </li>
            )}
            {communityTypes.map((community) => (
              <li className="mb-2" key={community.id}>
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    className="px-0 btn btn-link text-start w-100 d-flex align-items-center"
                    style={{
                      color: "#5d4037",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                    onClick={() =>
                      onSelectCommunity && onSelectCommunity(community.id)
                    }
                  >
                    <span className={isCollapsed ? "d-none" : ""}>
                      {community.name}
                    </span>
                  </button>
                  {/* Hide Join/Leave Icon when collapsed */}
                  {!isCollapsed &&
                    (community.isMember ? (
                      <button
                        className="w-auto px-2 py-1 btn btn-link ms-2"
                        title="Leave"
                        onClick={() => handleJoinLeave(community, "leave")}
                        style={{ color: "#b71c1c" }}
                      >
                        <FaUserMinus size={18} />
                      </button>
                    ) : (
                      <button
                        className="w-auto px-2 py-1 btn btn-link ms-2"
                        title="Join"
                        onClick={() => handleJoinLeave(community, "join")}
                        style={{ color: "#1976d2" }}
                      >
                        <FaUserPlus size={18} />
                      </button>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        {/* Mobile Sidebar */}
        <Offcanvas
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          className="mobile-sidebar"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Communities</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="list-unstyled">
              <li>
                <button
                  className="px-0 btn btn-link text-start w-100"
                  style={{
                    color: "#5d4037",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    setShow(false);
                    onSelectCommunity && onSelectCommunity(null);
                  }}
                >
                  All Communities
                </button>
              </li>
              {communityTypes.length === 0 && (
                <li className="text-muted">No communities</li>
              )}
              {communityTypes.map((community) => (
                <li key={community.id}>
                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      className="px-0 btn btn-link text-start w-100"
                      style={{
                        color: "#5d4037",
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                      onClick={() => {
                        setShow(false);
                        onSelectCommunity && onSelectCommunity(community.id);
                      }}
                    >
                      {community.name}
                    </button>
                    {/* Join/Leave Button */}
                    {community.isMember ? (
                      <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        style={{ minWidth: 60 }}
                        onClick={() =>
                          onSelectCommunity &&
                          onSelectCommunity({
                            id: community.id,
                            action: "leave",
                          })
                        }
                      >
                        Leave
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary btn-sm ms-2"
                        style={{ minWidth: 60 }}
                        onClick={() =>
                          onSelectCommunity &&
                          onSelectCommunity({
                            id: community.id,
                            action: "join",
                          })
                        }
                      >
                        Join
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  communityTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onSelectCommunity: PropTypes.func,
};
