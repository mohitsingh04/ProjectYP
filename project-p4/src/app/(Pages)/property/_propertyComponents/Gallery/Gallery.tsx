"use client";
import API from "@/service/API/API";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface Property {
  uniqueId: string;
}

interface GalleryItem {
  title: string;
  gallery: string[];
}

interface GalleryProps {
  property: Property | null;
}

export default function Gallery({ property }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const getGallery = async () => {
      if (!property) return;
      try {
        const response = await API.get<GalleryItem[]>(
          `/property/gallery/${property.uniqueId}`
        );
        setGallery(response.data);
      } catch (error) {
        console.error((error as any)?.message);
      }
    };

    getGallery();
  }, [property]);

  return (
    <>
      {gallery.map((galleryItem, galleryIndex) => {
        const filteredImages =
          galleryItem?.gallery
            ?.filter((img: string) => img.toLowerCase().endsWith(".webp"))
            ?.map((img: string) => ({
              src: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
            })) || [];

        return (
          <div className="card" key={galleryIndex}>
            <div className="card-body">
              <h5 className="subs-title">{galleryItem?.title}</h5>
              <div className="row">
                {filteredImages.map((image, imgIndex) => (
                  <div className="col-md-3" key={imgIndex}>
                    <img
                      src={image.src}
                      alt="Gallery Image"
                      className="img-fluid"
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIndex(imgIndex);
                        setOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={gallery
          .flatMap((galleryItem) =>
            galleryItem?.gallery
              ?.filter((img: string) => img.toLowerCase().endsWith(".webp"))
              ?.map((img: string) => ({
                src: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
              }))
          )
          .filter(Boolean)}
        zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        thumbnails={{ position: "bottom" }}
        styles={{ container: { zIndex: 1050 } }}
      />
    </>
  );
}
