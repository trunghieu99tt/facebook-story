import React, { memo } from 'react';
import './dropdown.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: JSX.Element[];
  isVisible?: boolean;
}

const Dropdown = ({ isVisible, items, children }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="fs-dropdown-wrapper">
      <ul className="fs-dropdown-list">
        {items?.map((item: any, idx: number) => {
          return (
            <div
              className="fs-dropdown-listItem"
              key={item.id || `dropdown-item-${idx}`}
            >
              {item}
            </div>
          );
        })}
        {children}
      </ul>
    </div>
  );
};

export default memo(Dropdown);
