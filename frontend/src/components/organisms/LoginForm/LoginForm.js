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
        label={strings.user.email}
        placeholder={strings.user.email}
        icon={envelopeIcon}
        registerOpt={{
          required: strings.user.formMessages.emailRequired,
          pattern: {
            value: emailRegexPattern,
            message: strings.user.formMessages.emailPattern,
          },
        }}
      />
      <Input
        name="loginPassword"
        type="password"
        id={nanoid()}
        label={strings.user.password}
        placeholder={strings.user.password}
        icon={keyIcon}
        registerOpt={{
          required: strings.user.formMessages.passwordRequired,
        }}
      />
      <Button text={strings.form.loginBtn} type="submit" filled />
    </Form>
  );
}
