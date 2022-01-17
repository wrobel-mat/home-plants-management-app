import { useLocalizedStrings } from 'providers/LocalizedStringsProvider'
import PlantItem from "components/organisms/PlantList/PlantItem";
import AppLoader from 'components/atoms/Loader/AppLoader'
import "./PlantList.css";

export default function PlantList({
  plants,
  isLoading,
}) {
  const { strings } = useLocalizedStrings();
  let plantList = undefined;

  if (plants) {
    plantList = Object.keys(plants).map((id) => (
      <PlantItem
        plant={plants[id]}
        key={id}
      />
    ));
  }

  const content = isLoading
    ? <AppLoader />
    : plantList && plantList.length > 0
      ? plantList
      : (<div className="no-plants-msg">
        <div>
          {strings.plants.noPlantsMsg}
        </div>
      </div>);

  return <div className="plant-list">{content}</div>;
}
