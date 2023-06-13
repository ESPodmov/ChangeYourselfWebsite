// import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--nav-height);
  width: 100%;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  z-index: 2;

  @media (max-width: 768px) {
    display: none;
  }
  `;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  `

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  margin: 0;
`;

export const MyNavLink = styled(NavLink)`
  color: #f1ff;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 1rem;
  &:hover {
    color: #000;
  }
  &.active{
    color: #000;
    font-weight: bold;
    transition: all 0.3s;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// export const Bars = styled(FaBars)`
//   display: none;
//   color: #fff;
//   cursor: pointer;
//   @media (max-width: 768px) {
//     display: block;
//     position: absolute;
//     top: 0;
//     right: 0;
//     transform: translate(-100%, 75%);
//     font-size: 30px;
//     cursor: pointer;
//     color: #fff;
//     transition: all 0.3s;

//     &:hover {
//       color: #000;
//     }

//     @media (max-width: 480px) {
//       display: none;
//     }
// `;


