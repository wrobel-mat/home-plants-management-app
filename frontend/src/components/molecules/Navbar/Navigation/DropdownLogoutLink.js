import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import { resetApiState } from "store/api/plantsApi";

export default function DropdownLogoutLink() {
  const { strings } = useLocalizedStrings();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="navbar-nav-item-dropdown-logout">
      <button
        onClick={() => {
          logout();
          dispatch(resetApiState());
          navigate("/");
        }}
        className="navbar-nav-item-dropdown-logout-btn"
      >
        {strings.navigation.logout}
      </button>
    </div>
  );
}
