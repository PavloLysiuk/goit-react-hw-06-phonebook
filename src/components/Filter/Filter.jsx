import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/filterSlice';

import { SearchInput } from './Filter.styled';
export const Filter = () => {
  const filterValue = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  return (
    <label>
      <SearchInput
        type="text"
        name="filter"
        placeholder="Search contact by Name..."
        value={filterValue}
        onChange={event => dispatch(filterContacts(event.target.value))}
      />
    </label>
  );
};
