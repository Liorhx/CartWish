import React from "react";

import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";

const LinkWithIcon = ({ emoji, title, sidebar, link }) => {
  return (
    <NavLink
      to={link}
      className={
        sidebar ? "link_effect sidebar_links" : "link_effect align_center"
      }
    >
      {title} <img src={emoji} alt="emoji" className="links_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
