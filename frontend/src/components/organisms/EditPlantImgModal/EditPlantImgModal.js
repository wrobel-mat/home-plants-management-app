import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import { useUpdatePlantImgMutation } from "store/api/plantsApi";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

export default function EditPlantImgModal({ isOpen, toggleIsOpen, plantId }) {
  const [updatePlantImg] = useUpdatePlantImgMutation();
  const { strings } = useLocalizedStrings();
  const { authFallback } = useAuth();

  const imgIsValid = (img) => {
    return !(img && img.size > 1048576);
  };

  const submitEditPlantImg = async ({ plantImg, setError }) => {
    if (!imgIsValid(plantImg[0])) {
      setError("plantImg", {
        type: "manual",
        message: strings.plant.editImgModal.plantImgMessage,
      });
    } else {
      const data = new FormData();
      data.append("plant_img", plantImg[0]);
      try {
        await updatePlantImg({
          id: plantId,
          data,
        }).unwrap();
        toggleIsOpen();
      } catch (e) {
        if (e === "Access JWT Invalid") {
          authFallback({
            callbackFn: (args) => {
              updatePlantImg(args);
              toggleIsOpen();
            },
            args: {
              id: plantId,
              data,
            },
          });
        }
      }
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleIsOpen}
      headerText={strings.plant.editImgModal.title}
    >
      <Form onSubmit={submitEditPlantImg}>
        <Input
          type="file"
          name="plantImg"
          id={nanoid()}
          label={strings.plant.editImgModal.plantImg}
          registerOpt={{
            required: strings.plant.editImgModal.plantImgRequiredMsg,
          }}
          accept="image/bmp, image/jpeg, image/png, image/gif"
        />
        <Button type="submit" text={strings.plant.editImgModal.submitBtn} />
      </Form>
    </Modal>
  );
}
