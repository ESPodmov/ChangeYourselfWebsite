import React from "react";
import { Nav, MyNavLink, NavList }
    from "./NavbarElements";
import { Link, NavLink } from "react-router-dom";
import logo from "../../logo.svg";
// import { ReactComponent as Logo } from "../../logo.svg";

const Navbar = () => {

    return (
        <>
            <Nav>
                <NavList>
                    <NavLink className="logo-container" to="/">
                        <img src={logo} alt="logo" className="logo" />
                    </NavLink >

                    <MyNavLink to="/">
                        <span>Главная</span>
                    </MyNavLink>

                    <MyNavLink to="/about">
                        <span>О нас</span>
                    </MyNavLink>

                    <MyNavLink to="/services">
                        <span>Услуги</span>
                    </MyNavLink>

                    <MyNavLink to="/specialists">
                        <span>Специалисты</span>
                    </MyNavLink>

                    <MyNavLink to="/dashboard">
                        <span>Панель управления</span>
                    </MyNavLink>

                    <MyNavLink to="/dashboard/article_editor">
                        <span>Статьи</span>
                    </MyNavLink>

                </NavList>
            </Nav>
        </>
    );
};

export default Navbar;