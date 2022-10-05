import React from "react";
import "./Dropdown.css";

const Dropdown = ({
  show,
  value,
  handleToggle,
  handleChange,
  DropdownList,
}) => {
  return (
    <div className="dropdownContainer">
      <label className={!show ? "arrow" : "arrow active"}>
        <input
          type="button"
          value={value}
          className="dropdown-btn"
          onClick={handleToggle}
        />
        <span className="carrot" />
      </label>

      <ul className="dropdownList" hidden={!show}>
        {DropdownList.map((selectedValue) => {
          const { order, id, name } = selectedValue || {};
          return (
            order > 0 && (
              <li
                key={id}
                className="option"
                onClick={() => handleChange(id, name)}
              >
                {name}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;