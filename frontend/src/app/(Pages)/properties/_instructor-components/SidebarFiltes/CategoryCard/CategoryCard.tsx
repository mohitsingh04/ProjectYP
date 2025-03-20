import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Property {
  category: string;
}

interface CategoryCardProps {
  filteredProperty: Property[];
  property: Property[];
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  filteredProperty,
  property,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categoryMap: Record<string, string> = property.reduce((acc, item) => {
    acc[item.category.toLowerCase()] = item.category;
    return acc;
  }, {} as Record<string, string>);

  const categoryCounts: Record<string, number> = filteredProperty.reduce(
    (acc, item) => {
      const categoryLower = item.category.toLowerCase();
      acc[categoryLower] = (acc[categoryLower] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedCategories = Object.keys(categoryCounts)
    .filter((category) => categoryCounts[category] > 0) // Exclude categories with count 0
    .sort((a, b) => categoryCounts[b] - categoryCounts[a]);

  const filteredCategories = sortedCategories.filter((category) =>
    category.includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedCategory((prev) =>
      checked
        ? [...prev, value.toLowerCase()]
        : prev.filter((category) => category !== value.toLowerCase())
    );
  };

  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>Categories</h4>
            <FaAngleDown className="icon" />
          </div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Category"
            style={{ minHeight: "20px" }}
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith(" ")) return;
              setSearchQuery(value);
            }}
          />

          <div
            className="overflow-auto"
            style={{ maxHeight: "300px", scrollbarWidth: "thin" }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, idx) => (
                <div key={idx}>
                  <label className="custom_check">
                    <input
                      type="checkbox"
                      name="category_filter"
                      value={category}
                      checked={selectedCategory?.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <span className="checkmark"></span> {categoryMap[category]}{" "}
                    ({categoryCounts[category]})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted">No categories found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
