import { useState } from "react";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useMessage } from "providers/MessageProvider";
import AuthSection from "components/organisms/AuthSection/AuthSection";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import RegisterForm from "components/organisms/RegisterForm/RegisterForm";
import Bar from "components/atoms/Bar/Bar";

export default function AuthPage() {
  const [loginSectionIsOpened, setLoginSectionIsOpened] = useState(true);
  const { strings } = useLocalizedStrings();
  const { clearError, clearSuccess } = useMessage();

  const clearMessages = () => {
    clearError();
    clearSuccess();
  };

  return (
    <>
      <AuthSection
        isOpened={loginSectionIsOpened}
        toggleIsOpened={() => {
          clearMessages();
          setLoginSectionIsOpened(!loginSectionIsOpened);
        }}
        ariaLabel={strings.authPage.login.label}
        headerText={strings.authPage.login.header}
        toggleBtnText={strings.authPage.login.label}
      >
        <LoginForm />
      </AuthSection>
      <Bar />
      <AuthSection
        isOpened={!loginSectionIsOpened}
        toggleIsOpened={() => {
          clearMessages();
          setLoginSectionIsOpened(!loginSectionIsOpened);
        }}
        ariaLabel={strings.authPage.register.label}
        headerText={strings.authPage.register.header}
        toggleBtnText={strings.authPage.register.label}
      >
        <RegisterForm />
      </AuthSection>
    </>
  );
}
