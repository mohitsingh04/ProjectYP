"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface GalleryProps {
  gallery?: {
    title?: string;
    gallery?: string[];
  };
}

export default function Gallery({ gallery }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const filteredImages =
    gallery?.gallery
      ?.filter((img) => img.toLowerCase().endsWith(".webp"))
      ?.map((img) => ({
        src: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
      })) || [];

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="subs-title">{gallery?.title}</h5>
          <div className="row">
            {filteredImages.map((image, idx) => (
              <div className="col-md-3" key={idx}>
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
                    setIndex(idx);
                    setOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={filteredImages}
        zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        thumbnails={{ position: "bottom" }}
        styles={{ container: { zIndex: 1050 } }}
      />
    </>
  );
}
