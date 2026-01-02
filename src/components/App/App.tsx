import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import modalStyles from "../Modal/Modal.module.css";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openModal = (photo: Photo | null) => {
    if (photo) {
      setSelectedPhoto(photo);
    }
  };
  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setPhotos([]);
      const fetchPhotos = await getPhotos(query);
      if (fetchPhotos.length === 0) {
        toast.error("Not found photos");
      }
      setPhotos(fetchPhotos);
    } catch {
      toast.error("Failed to load photos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          {photos.length > 0 && (
            <PhotosGallery onSelect={openModal} photos={photos} />
          )}
          {selectedPhoto && (
            <Modal onClose={closeModal}>
              <img
                src={selectedPhoto.src.original}
                alt={selectedPhoto.alt}
                className={modalStyles.image}
              />
            </Modal>
          )}
          <Toaster position="top-right" />
        </Container>
      </Section>
    </>
  );
}
