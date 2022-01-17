import { Link } from "react-router-dom";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from 'components/atoms/PageHeader/PageHeader'
import MessageWrapper from "components/containers/MessageWrapper/MessageWrapper";
import ButtonWrapper from "components/containers/ButtonWrapper/ButtonWrapper";

export default function NotFoundPage() {
  const { strings } = useLocalizedStrings();
  return (
    <MainSectionContainer>
      <PageHeader title={strings.notFoundPage.title} centered />
      <MessageWrapper>
        <span>{strings.notFoundPage.content}</span>
      </MessageWrapper>
      <ButtonWrapper>
        <span>
          <Link to="/" className="navbar-nav-item-dropdown-link">
            {strings.notFoundPage.goHome}
          </Link>
        </span>
      </ButtonWrapper>
    </MainSectionContainer>
  );
}
