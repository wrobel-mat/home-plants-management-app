import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useMessage } from "providers/MessageProvider";
import { useApi } from "providers/ApiProvider";
import useQuery from "hooks/useQuery";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from "components/atoms/PageHeader/PageHeader";
import MessageWrapper from "components/containers/MessageWrapper/MessageWrapper";
import ButtonWrapper from "components/containers/ButtonWrapper/ButtonWrapper";
import Error from "components/atoms/Error/Error";
import Success from "components/atoms/Success/Success";
import Button from "components/atoms/Button/Button";

//TODO: rework success / error message display visuals

export default function ConfirmUser() {
  const navigate = useNavigate();
  const query = useQuery();
  const queryString = query.toString();
  const { error, dispatchError, success } = useMessage();
  const { confirmUser, resendConfirmationMail } = useApi();
  const [path, setPath] = useState(null);
  const [btnText, setBtnText] = useState(null);
  const { strings } = useLocalizedStrings();

  const onClick = (path) => {
    navigate(path);
  };

  const setBtn = (query) => {
    const path = query ? query : "/";
    const text = query
      ? strings.confirmUser.btnText.resend
      : strings.confirmUser.btnText.goHome;
    setPath(path);
    setBtnText(text);
  };

  useEffect(() => {
    (async () => {
      setPath(null);
      const token = query.get("token");
      const resend = query.get("resend");
      const userId = query.get("userId");
      if (token) {
        const query = await confirmUser(token);
        setBtn(query);
      } else if (resend && userId) {
        resendConfirmationMail({ resend, userId });
        setBtn();
      } else {
        dispatchError(strings.serverResponseMessage["noConfirmationParams"]);
        setBtn();
      }
    })();
  }, [queryString]);
  return (
    <MainSectionContainer>
      <PageHeader title={strings.confirmUser.title} centered/>
      <MessageWrapper>
        {success && <Success message={success} />}
        {error && <Error message={error} />}
      </MessageWrapper>
      {path && (
        <ButtonWrapper>
          <Button type="button" onClick={() => onClick(path)} text={btnText} />
        </ButtonWrapper>
      )}
    </MainSectionContainer>
  );
}
