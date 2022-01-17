import { useState } from "react";
import { useGetAllPlantsQuery } from "store/api/plantsApi";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import Button from "components/atoms/Button/Button";
import ButtonWrapper from "components/containers/ButtonWrapper/ButtonWrapper";
import PlantList from "components/organisms/PlantList/PlantList";
import AddPlantModal from "components/organisms/AddPlantModal/AddPlantModal";

export default function Plants() {
  const [isAddPlantModalOpen, setIsAddPlantModalOpen] = useState(false);
  const { strings } = useLocalizedStrings();
  const { authFallback } = useAuth();

  const { data: plants, error, refetch, isLoading, isFetching } = useGetAllPlantsQuery();
  if (error && error === "Access JWT Invalid") {
    authFallback({ callbackFn: refetch });
  }

  const toggleAddPlantModal = () => {
    setIsAddPlantModalOpen(!isAddPlantModalOpen);
  };

  return (
    <MainSectionContainer>
      <PageHeader title={strings.plants.title} centered>
        <ButtonWrapper>
          <Button
            type="button"
            text={strings.plants.addPlantBtn}
            onClick={toggleAddPlantModal}
          />
        </ButtonWrapper>
      </PageHeader>
      <PlantList plants={plants} isLoading={isLoading} isFetching={isFetching} />
      <AddPlantModal
        isOpen={isAddPlantModalOpen}
        toggleIsOpen={toggleAddPlantModal}
      />
    </MainSectionContainer>
  );
}
