import { nanoid } from "nanoid";
import { useAuth } from "providers/AuthProvider";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { envelopeIcon, keyIcon } from "assets/icons";
import emailRegexPattern from "util/emailRegexPattern";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

export default function LoginForm() {
  const { login } = useAuth();
  const { strings } = useLocalizedStrings();

  const handleLogin = async ({ loginEmail, loginPassword }) => {
    login({ username: loginEmail, password: loginPassword });
  };

  return (
    <Form onSubmit={handleLogin}>
      <Input
        name="loginEmail"
        type="text"
        id={nanoid()}
        label={strings.authPage.email.label}
        placeholder={strings.authPage.email.placeholder}
        icon={envelopeIcon}
        registerOpt={{
          required: strings.authPage.email.message.required,
          pattern: {
            value: emailRegexPattern,
            message: strings.authPage.email.message.pattern,
          },
        }}
      />
      <Input
        name="loginPassword"
        type="password"
        id={nanoid()}
        label={strings.authPage.password.label}
        placeholder={strings.authPage.password.placeholder}
        icon={keyIcon}
        registerOpt={{
          required: strings.authPage.password.message.required,
        }}
      />
      <Button text={strings.authPage.login.label} type="submit" filled />
    </Form>
  );
}
