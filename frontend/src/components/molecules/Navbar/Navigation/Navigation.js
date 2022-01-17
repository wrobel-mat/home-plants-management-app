import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import NavItem from "components/molecules/Navbar/Navigation/NavItem";
import Dropdown from "components/molecules/Navbar/Navigation/Dropdown";
import DropdownList from "components/molecules/Navbar/Navigation/DropdownList";
import DropdownListItem from "components/molecules/Navbar/Navigation/DropdownListItem";
import DropdownLogoutLink from "components/molecules/Navbar/Navigation/DropdownLogoutLink";
import { avatarNavIcon, exploreIcon } from "assets/icons";

export default function Navigation() {
  const { strings } = useLocalizedStrings();
  return (
    <div className="navbar-nav-content">
      <NavItem path="/plants" icon={exploreIcon} />
      <NavItem path="/myaccount" icon={avatarNavIcon} hasDropdown>
        <Dropdown>
          <DropdownList>
            <DropdownListItem
              path="/myaccount"
              text={strings.navigation.myaccount}
            />
            <DropdownListItem path="/plants" text={strings.navigation.plants} />
            <DropdownListItem
              path="/timeline"
              text={strings.navigation.timeline}
            />
          </DropdownList>
          <DropdownLogoutLink />
        </Dropdown>
      </NavItem>
    </div>
  );
}
