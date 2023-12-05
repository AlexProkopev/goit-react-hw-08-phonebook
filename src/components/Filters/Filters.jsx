import React from 'react';
import css from "./Filters.module.css"
import { useDispatch} from 'react-redux';
import { filterContacts } from 'redux/filter/filter.deducer';


const Filters = ({value}) => {

  const dispatch = useDispatch();

  const handleFilterContact = evt => {
    dispatch(filterContacts(evt.target.value))
    
  }

  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      value={value}
      onChange={handleFilterContact} 
      placeholder="Search by name, start writing something..."
    />
  );
};

export default Filters;