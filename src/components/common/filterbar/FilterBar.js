import React from "react";
import "./FilterBar.css";

const FilterBar = (props) => {
  const { categories, handleClick, activeTab } = props;
  return (
    categories.length > 0 && (
      <div className="d-flex flex-column filterBarContainer">
        {categories.map(
          (item) =>
            item.order > 0 && (
              <a
                key={item.key}
                href={window.location.href}
                className={
                  activeTab === item.id ? "active subContainer" : "subContainer"
                }
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </a>
            )
        )}
      </div>
    )
  );
};

export default FilterBar;
