import API from "@/service/API/API";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});

interface Teacher {
  teacher_name: string;
  designation: string;
  experience?: string;
  profile?: string[];
}

interface Property {
  uniqueId: string;
}

interface TeachersProps {
  property: Property | null;
}

const options: Record<string, unknown> = {
  margin: 10,
  nav: false,
  dots: true,
  lazyLoad: false,
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: { items: 1 },
    768: { items: 2 },
    1170: { items: 3 },
  },
};

export default function Teachers({ property }: TeachersProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const getTeachers = async () => {
    try {
      const response = await API.get<Teacher[]>(
        `/property/teacher/${property?.uniqueId}`
      );
      setTeachers(response.data);
    } catch (error) {
      console.error((error as any)?.message);
    }
  };

  useEffect(() => {
    if (property) {
      getTeachers();
    }
  }, [property]);

  return (
    <div className="owl-theme">
      <h5>Teachers</h5>
      <OwlCarousel {...(options as any)}>
        {teachers.map((teacher, index) => (
          <div key={index} className="instructors-widget">
            <div className="instructors-img">
              <a href="instructor-list.html">
                <img
                  className="img-fluid"
                  alt="Img"
                  style={{ aspectRatio: "3/3", objectFit: "cover" }}
                  src={
                    teacher.profile?.[0]
                      ? `${process.env.NEXT_PUBLIC_API_URL}${teacher.profile[0]}`
                      : "/img/user/user1.jpg"
                  }
                />
              </a>
            </div>
            <div className="instructors-content text-center">
              <h5>{teacher.teacher_name}</h5>
              <p>{teacher.designation}</p>
              <div className="student-count d-flex justify-content-center">
                <span>{teacher.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
