import { useEffect, useState } from "react";
import { format, toDate } from "date-fns";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useMessage } from 'providers/MessageProvider'
import { useAuth } from "providers/AuthProvider";
import localeMap from "util/locale-map";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from "components/atoms/PageHeader/PageHeader";
import MyAccountDataSection from "components/molecules/MyAccount/MyAccountDataSection";
import MyAccountDataSectionIcon from "components/molecules/MyAccount/MyAccountDataSectionIcon";
import MyAccountDataSectionList from "components/molecules/MyAccount/MyAccountDataSectionList";
import MyAccountDataSectionListItem from "components/molecules/MyAccount/MyAccountDataSectionListItem";
import MyAccountDataSectionButton from "components/molecules/MyAccount/MyAccountDataSectionButton";
import Bar from "components/atoms/Bar/Bar";

import { avatarIcon, envelopeIcon, keyIcon, deleteIcon, pencilIcon } from "assets/icons";
import EditNameModal from "components/organisms/EditNameModal/EditNameModal";
import EditEmailModal from "components/organisms/EditEmailModal/EditEmailModal";
import EditPasswordModal from "components/organisms/EditPasswordModal/EditPasswordModal";
import Success from 'components/atoms/Success/Success'
import Button from "components/atoms/Button/Button";
import DeleteAccountModal from "components/organisms/DeleteAccountModal/DeleteAccountModal";

export default function MyAccount() {
  const { strings, getLanguage } = useLocalizedStrings();
  const { success } = useMessage();
  const { user } = useAuth();
  const [isEditNameModalOpen, setEditNameModalOpen] = useState(false);
  const [isEditEmailModalOpen, setEditEmailModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setEditPasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const [myData, setMyData] = useState(user);

  const toggleEditNameModal = () => {
    setEditNameModalOpen(!isEditNameModalOpen);
  };

  const toggleEditEmailModal = () => {
    if (myData.email === 'home@jungle.com') {
      return;
    }
    setEditEmailModalOpen(!isEditEmailModalOpen);
  };

  const toggleEditPasswordModal = () => {
    if (myData.email === 'home@jungle.com') {
      return;
    }
    setEditPasswordModalOpen(!isEditPasswordModalOpen);
  };

  const toggleDeleteAccountModal = () => {
    setDeleteAccountModalOpen(!isDeleteAccountModalOpen);
  }

  useEffect(() => {
    setMyData(user);
  }, [user]);

  return (
    <MainSectionContainer>
      <PageHeader
        title={strings.myaccount.title}
        description={strings.myaccount.description}
      />
      {success && <Success message={success} />}
      <MyAccountDataSection>
        <MyAccountDataSectionIcon icon={avatarIcon} />
        <MyAccountDataSectionList>
          <MyAccountDataSectionListItem name={strings.myaccount.dataLabel.name} value={myData.name} />
          <MyAccountDataSectionListItem 
            name={strings.myaccount.dataLabel.dateCreated}
            value={format(toDate(myData.dateCreated), "PPP", {
              locale: localeMap[getLanguage()],
            })}
          />
          <MyAccountDataSectionListItem name={strings.myaccount.dataLabel.plantsQty} value={myData.plantsCount} />
        </MyAccountDataSectionList>
        <MyAccountDataSectionButton>
          <Button
            text={strings.myaccount.editBtn}
            type="button"
            onClick={toggleEditNameModal}
            icon={pencilIcon}
          />
        </MyAccountDataSectionButton>
      </MyAccountDataSection>
      <Bar />
      <MyAccountDataSection>
        <MyAccountDataSectionIcon icon={envelopeIcon} />
        <MyAccountDataSectionList>
          <MyAccountDataSectionListItem name={strings.myaccount.dataLabel.email} value={myData.email} />
        </MyAccountDataSectionList>
        <MyAccountDataSectionButton>
        <Button
            text={strings.myaccount.editBtn}
            type="button"
            onClick={toggleEditEmailModal}
            icon={pencilIcon}
          />
        </MyAccountDataSectionButton>
      </MyAccountDataSection>
      <Bar />
      <MyAccountDataSection>
        <MyAccountDataSectionIcon icon={keyIcon} />
        <MyAccountDataSectionList>
          <MyAccountDataSectionListItem name={strings.myaccount.dataLabel.password} value="********" />
        </MyAccountDataSectionList>
        <MyAccountDataSectionButton>
        <Button
            text={strings.myaccount.editBtn}
            type="button"
            onClick={toggleEditPasswordModal}
            icon={pencilIcon}
          />
        </MyAccountDataSectionButton>
      </MyAccountDataSection>
      <Bar />
      <MyAccountDataSection>
        <MyAccountDataSectionIcon icon={deleteIcon} />
        <MyAccountDataSectionList>
          <MyAccountDataSectionListItem name={strings.myaccount.dataLabel.deleteAccount} />
        </MyAccountDataSectionList>
        <MyAccountDataSectionButton>
          <Button 
            text={strings.myaccount.dataLabel.deleteAccount}
            type="button"
            onClick={toggleDeleteAccountModal}
            icon={deleteIcon}
            danger
          />
        </MyAccountDataSectionButton>
      </MyAccountDataSection>
      <Bar />
      <EditNameModal
        isOpen={isEditNameModalOpen}
        toggleIsOpen={toggleEditNameModal}
        user={myData}
      />
      <EditEmailModal
        isOpen={isEditEmailModalOpen}
        toggleIsOpen={toggleEditEmailModal}
        user={myData}
      />
      <EditPasswordModal
        isOpen={isEditPasswordModalOpen}
        toggleIsOpen={toggleEditPasswordModal}
        user={myData}
      />
      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        toggleIsOpen={toggleDeleteAccountModal}
        user={myData}
      />
    </MainSectionContainer>
  );
}
