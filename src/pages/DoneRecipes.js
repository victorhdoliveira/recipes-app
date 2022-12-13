import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareSvg from '../images/shareIcon.svg';
import './DoneRecipes.css';

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
      <div className="-btn">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('all') }
          className="all-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter('meal') }
          className="meal-btn"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
          className="drink-btn"
        >
          Drinks
        </button>
      </div>
      {filteredList.map((recipes, index) => (
        <div key={ recipes.id } className="recipes">
          <Link
            to={ `/${recipes.type}s/${recipes.id}` }
            className="recipe-name-link"
          >
            <p
              data-testid={ `${index}-horizontal-name` }
              className="recipes-name"
            >
              {recipes.name}
            </p>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipes.image }
              alt={ recipes.name }
              className="recipes-img"
              // Tamanho da imagem alterada para passar no cypress //
            />
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipes.doneDate}
          </p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipes.type === 'drink'
              ? ('Alcoholic') : (`${recipes.nationality} - ${recipes.category}`)}
          </p>
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
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            className="share-btn"
            src={ shareSvg }
            onClick={ () => copy(`http://localhost:3000/meals/${recipes.id}`) && setIsCopied(true) }
          >
            <img src={ shareSvg } alt="compartilhar" />
          </button>
          {isCopied && <p className="linkCopied">Link copied!</p>}
        </div>
      ))}
    </>
  );
}

DoneRecipes.propTypes = {}.isRequired;

export default DoneRecipes;
