import './search-box.styles.css';
import { ChangeEventHandler } from 'react';

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};


const SearchBox = ({
  onChangeHandler,
  placeholder,
  className
}: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type='search'
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
