import React from "react";
import { FaX } from "react-icons/fa6";

interface FilterTagsProps {
  selectedCategory: string[];
  selectedCity: string[];
  selectedState: string[];
  selectedCourses: Set<string>;
  selectedLevel: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedState: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCourses: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  selectedCategory,
  selectedCity,
  selectedState,
  selectedCourses,
  selectedLevel,
  setSelectedCategory,
  setSelectedCity,
  setSelectedState,
  setSelectedCourses,
  setSelectedLevel,
}) => {
  const tagStyle =
    "d-flex align-items-center bg-white text-dark rounded px-3 py-1 border";
  const closeBtnStyle =
    "btn btn-sm border-0 btn-light ms-2 me-0 d-flex align-items-center justify-content-center";

  return (
    <div
      className="d-flex w-100 gap-2 overflow-auto flex-nowrap pb-2 flex-grow"
      style={{ scrollbarWidth: "thin", paddingBottom: "8px" }}
    >
      {selectedCategory.map((item, index) => (
        <div key={index} className={tagStyle}>
          <span className="text-truncate">{item}</span>
          <button
            className={closeBtnStyle}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev.filter((category) => category !== item)
              )
            }
          >
            <FaX />
          </button>
        </div>
      ))}
      {selectedCity.map((item, index) => (
        <div key={index} className={tagStyle}>
          <span className="text-truncate">{item}</span>
          <button
            className={closeBtnStyle}
            onClick={() =>
              setSelectedCity((prev) => prev.filter((city) => city !== item))
            }
          >
            <FaX />
          </button>
        </div>
      ))}
      {selectedState.map((item, index) => (
        <div key={index} className={tagStyle}>
          <span className="text-truncate">{item}</span>
          <button
            className={closeBtnStyle}
            onClick={() =>
              setSelectedState((prev) => prev.filter((state) => state !== item))
            }
          >
            <FaX />
          </button>
        </div>
      ))}
      {[...selectedCourses].map((item, index) => (
        <div key={index} className={tagStyle}>
          <span className="text-truncate">{item}</span>
          <button
            className={closeBtnStyle}
            onClick={() =>
              setSelectedCourses((prev) => {
                const updatedSet = new Set(prev);
                updatedSet.delete(item);
                return new Set(updatedSet);
              })
            }
          >
            <FaX />
          </button>
        </div>
      ))}
      {selectedLevel.map((item, index) => (
        <div key={index} className={tagStyle}>
          <span className="text-truncate">{item}</span>
          <button
            className={closeBtnStyle}
            onClick={() =>
              setSelectedLevel((prev) => prev.filter((level) => level !== item))
            }
          >
            <FaX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterTags;
