import { useEffect, useState } from "react";
import { format, toDate } from "date-fns";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from "components/atoms/PageHeader/PageHeader";
import DataSection from "components/molecules/DataSection/DataSection";
import DataItem from "components/molecules/DataSection/DataItem";
import Bar from "components/atoms/Bar/Bar";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useMessage } from 'providers/MessageProvider'
import { useAuth } from "providers/AuthProvider";
import localeMap from "util/locale-map";
import { avatarIcon, envelopeIcon, keyIcon } from "assets/icons";
import EditNameModal from "components/organisms/EditNameModal/EditNameModal";
import EditEmailModal from "components/organisms/EditEmailModal/EditEmailModal";
import EditPasswordModal from "components/organisms/EditPasswordModal/EditPasswordModal";
import Success from 'components/atoms/Success/Success'

export default function MyAccount() {
  const { strings, getLanguage } = useLocalizedStrings();
  const { success } = useMessage();
  const { user } = useAuth();
  const [isEditNameModalOpen, setEditNameModalOpen] = useState(false);
  const [isEditEmailModalOpen, setEditEmailModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setEditPasswordModalOpen] = useState(false);

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
      <DataSection icon={avatarIcon} onEditBtnClick={toggleEditNameModal}>
        <DataItem name={strings.myaccount.dataLabel.name} value={myData.name} />
        <DataItem
          name={strings.myaccount.dataLabel.dateCreated}
          value={format(toDate(myData.dateCreated), "PPP", {
            locale: localeMap[getLanguage()],
          })}
        />
        <DataItem
          name={strings.myaccount.dataLabel.plantsQty}
          value={myData.plants.length}
        />
      </DataSection>
      <Bar />
      <DataSection icon={envelopeIcon} onEditBtnClick={toggleEditEmailModal} disabled={myData.email === 'home@jungle.com'}>
        <DataItem
          name={strings.myaccount.dataLabel.email}
          value={myData.email}
        />
      </DataSection>
      <Bar />
      <DataSection icon={keyIcon} onEditBtnClick={toggleEditPasswordModal} disabled={myData.email === 'home@jungle.com'}>
        <DataItem
          name={strings.myaccount.dataLabel.password}
          value="********"
        />
      </DataSection>
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
    </MainSectionContainer>
  );
}
