"use client";
import API from "@/service/API/API";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface AchievementsData {
  achievements: string[];
}

interface AchievementsProps {
  property: { uniqueId: string } | null;
}

export default function Achievements({ property }: AchievementsProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [achievements, setAchievements] = useState<AchievementsData | null>(
    null
  );

  const getAchievements = async () => {
    try {
      const response = await API.get(`/achievements/${property?.uniqueId}`);
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    if (property) {
      getAchievements();
    }
  }, [property]);

  const filteredImages =
    achievements?.achievements
      ?.filter((img: string) => img.toLowerCase().endsWith(".webp"))
      ?.map((img: string) => ({
        src: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
      })) || [];

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="subs-title">Achievements</h5>
          <div className="row">
            {filteredImages.map((img, idx) => (
              <div className="col-md-3" key={idx}>
                <img
                  src={img.src}
                  alt="Achievement"
                  className="img-fluid"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
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
