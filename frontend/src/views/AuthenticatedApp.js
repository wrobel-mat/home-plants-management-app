import { Navigate, Routes, Route } from "react-router-dom";
import MainTemplate from "components/templates/MainTemplate";
import Timeline from "views/Timeline";
import Plants from "views/Plants";
import Plant from "views/Plant";
import MyAccount from "views/MyAccount";
import About from "views/About";
import Contact from "views/Contact";
import NotFoundPage from "views/NotFoundPage";
import ConfirmUser from "./ConfirmUser";

export default function AuthenticatedApp() {
  return (
    <MainTemplate>
      <Routes>
        <Route exact path="/" element={<Navigate to="/plants" />} />
        <Route exact path="/auth" element={<Navigate to="/plants" />} />
        <Route exact path="/timeline" element={<Timeline />} />
        <Route exact path="/plants" element={<Plants />} />
        <Route exact path="/plants/:id" element={<Plant />} />
        <Route exact path="/myaccount" element={<MyAccount />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/user/confirm" element={<ConfirmUser />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainTemplate>
  );
}
