import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="app-footer">
      <Link to="/meals">
        <img src={ mealIcon } alt="drink menu icon" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="meals menu icon" data-testid="drinks-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
