import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import { useUpdatePlantImgMutation } from "store/api/plantsApi";
import imageCompression from "browser-image-compression";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

const imgIsValid = (img) => {
  return !(img && img.size > 1048576);
};

export default function EditPlantImgModal({ isOpen, toggleIsOpen, plantId }) {
  const [updatePlantImg] = useUpdatePlantImgMutation();
  const { strings } = useLocalizedStrings();
  const { authFallback } = useAuth();

  const submitEditPlantImg = async ({ plantImg, setError }) => {
    let newImage;
    if (!imgIsValid(plantImg[0])) {
      const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      try {
        newImage = await imageCompression(plantImg[0], compressionOptions);
      } catch (e) {
        console.log("unable to compress plant image");
        setError("plantImg", {
          type: "manual",
          message: strings.plant.formMessages.imgSize,
        });
      }
    } else {
      newImage = plantImg[0];
      const data = new FormData();
      data.append("plant_img", newImage);
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
      headerText={strings.plant.editImgForm.header}
    >
      <Form onSubmit={submitEditPlantImg}>
        <Input
          type="file"
          name="plantImg"
          id={nanoid()}
          label={strings.plant.editImgForm.plantImg}
          registerOpt={{
            required: strings.plant.formMessages.imgRequired,
          }}
          accept="image/jpeg, image/png"
        />
        <Button type="submit" text={strings.form.saveBtn} />
      </Form>
    </Modal>
  );
}
