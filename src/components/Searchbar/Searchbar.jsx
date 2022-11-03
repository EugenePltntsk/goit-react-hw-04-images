import { Loader } from 'components/Loader';
import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ saveDataToState, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const submitForm = e => {
    e.preventDefault();

    saveDataToState(query);
  };

  return (
    <header className={css.Searchbar}>
      {isLoading && <Loader />}
      <form onSubmit={submitForm} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <FcSearch style={{ width: '36px', height: '36px' }} />
        </button>

        <input
          name="input"
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  saveDataToState: PropTypes.func.isRequired,
};
