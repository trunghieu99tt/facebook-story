import React, { memo, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import Dropdown from '../dropdown/dropdown';
import './selector.css';

type TOptions<T> = {
  id: string | number;
  value: T;
  label: string;
  icon?: React.ReactNode;
};

type Props<T> = {
  value?: T;
  options: TOptions<T>[];
  onChange: (input: T) => void;
  renderValue?: (value: T) => React.ReactNode;
};

const Selector = <T,>({ value, onChange, options, renderValue }: Props<T>) => {
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

  const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

  useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

  const selections = useMemo(() => {
    return options.map((option) => {
      return (
        <li
          className="fs-selector-selectionItem"
          onClick={() => onChange(option.value)}
          key={option.id}
        >
          {option?.icon}
          <span>{option?.label}</span>
        </li>
      );
    });
  }, [options]);

  const SelectedItem = options.find((option) => option.value === value);

  const selectedItem = useMemo(() => {
    if (renderValue && typeof renderValue === 'function' && value) {
      return renderValue(value);
    }

    return (
      <React.Fragment>
        <div>{SelectedItem?.icon}</div>
        <p>{SelectedItem?.label}</p>
      </React.Fragment>
    );
  }, [renderValue, value]);

  return (
    <div className="fs-selector-wrapper" ref={dropdownRef}>
      <div className="fs-selector-selectionItem" onClick={toggleDropdown}>
        {selectedItem}
      </div>
      <Dropdown isVisible={visibleDropdown} items={selections} />
    </div>
  );
};

const MemorizedSelector = memo(Selector) as typeof Selector;

export default MemorizedSelector;
