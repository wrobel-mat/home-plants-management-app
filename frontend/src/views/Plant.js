import { useParams } from "react-router-dom";
import { useGetPlantQuery } from "store/api/plantsApi";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from "components/atoms/PageHeader/PageHeader";
import PlantManagementPanel from "components/organisms/PlantManagementPanel/PlantManagementPanel";
import AppLoader from 'components/atoms/Loader/AppLoader'

export default function Plant() {
  const { strings } = useLocalizedStrings();
  const { authFallback } = useAuth();
  const { id } = useParams();
  const { data: plant, error, refetch, isLoading } = useGetPlantQuery(id);
  if (error && error === "Access JWT Invalid") {
    authFallback({ callbackFn: refetch });
  }

  return (
    <MainSectionContainer>
      <PageHeader
        title={strings.plant.title}
        description={strings.plant.pageDescription}
      />
      {isLoading && <AppLoader/>}
      {plant && <PlantManagementPanel plant={plant} />}
    </MainSectionContainer>
  );
}
