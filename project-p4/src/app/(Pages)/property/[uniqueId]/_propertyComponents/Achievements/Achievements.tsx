"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface achievements {
  achievements: string[];
}

interface AchievementsProps {
  achievements: achievements | null;
}
export default function Achievements({ achievements }: AchievementsProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const filteredImages =
    achievements?.achievements
      ?.filter((img) => img.toLowerCase().endsWith(".webp"))
      ?.map((img) => ({
        src: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
      })) || [];

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="subs-title">Achievements</h5>
          <div className="row">
            {filteredImages?.map((img, index) => (
              <div className="col-md-3" key={index}>
                <img
                  src={img.src}
                  alt="img"
                  className="img-fluid"
                  style={{ aspectRatio: "4/4", objectFit: "cover" }}
                  onClick={() => {
                    setIndex(index);
                    setOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
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
