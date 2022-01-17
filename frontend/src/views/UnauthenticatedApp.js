import { Navigate, Route, Routes } from "react-router-dom";
import MainTemplate from "components/templates/MainTemplate";
import AuthPage from "views/AuthPage";
import About from "views/About";
import Contact from "views/Contact";
import ConfirmUser from "views/ConfirmUser";
import NotFoundPage from "views/NotFoundPage";

export default function UnauthenticatedApp() {
  return (
    <MainTemplate>
      <Routes>
        <Route exact path="/" element={<AuthPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/user/confirm" element={<ConfirmUser />} />
        <Route exact path="/myaccount" element={<Navigate to="/" />} />
        <Route exact path="/plants" element={<Navigate to="/" />} />
        <Route exact path="/plants/:id" element={<Navigate to="/" />} />
        <Route exact path="/timeline" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainTemplate>
  );
}
