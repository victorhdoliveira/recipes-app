import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareSvg from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes({ location }) {
  const [doneList, setdoneList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const doneFilterList = doneList.filter(({ type }) => (filter === type
      || filter === 'all'));
    setFilteredList(doneFilterList);
  }, [filter, doneList]);

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setdoneList(getDoneRecipes);
  }, []);

  return (
    <>
      <Header
        renderProfileIcon
        renderSearchIcon={ false }
        location={ location }
      />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      {filteredList.map((recipes, index) => (
        <div key={ recipes.id }>
          <Link
            to={ `/${recipes.type}s/${recipes.id}` }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipes.name}</p>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipes.image }
              alt={ recipes.name }
              width="125px"
              height="125px"
              // Tamanho da imagem alterada para passar no cypress //
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipes.type === 'drink'
              ? ('Alcoholic') : (`${recipes.nationality} - ${recipes.category}`)}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipes.doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareSvg }
            onClick={ () => copy(`http://localhost:3000/meals/${recipes.id}`) && setIsCopied(true) }
          >
            <img src={ shareSvg } alt="compartilhar" />
          </button>
          {isCopied && <p>Link copied!</p>}
          <div>
            {recipes.tags.map((tag) => (
              <p
                key={ `${tag}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { `${tag}` }
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

DoneRecipes.propTypes = {}.isRequired;

export default DoneRecipes;
