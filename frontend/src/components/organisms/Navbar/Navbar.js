import { useAuth } from "providers/AuthProvider";
import LogoWrapper from "components/molecules/Navbar/Wrappers/LogoWrapper";
import Logo from "components/molecules/Navbar/Logo";
import NavWrapper from "components/molecules/Navbar/Wrappers/NavWrapper";
import Navigation from "components/molecules/Navbar/Navigation/Navigation";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className="navbar">
        <header className="navbar-content">
          <LogoWrapper />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <NavWrapper>{isAuthenticated && <Navigation />}</NavWrapper>
        </header>
      </div>
      <div className="navbar-space"></div>
    </>
  );
}
