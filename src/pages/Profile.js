import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile({ location }) {
  const history = useHistory();
  const getEmail = localStorage.getItem('user');
  const startEmailPosition = 10;
  const finishEmailPosition = getEmail.length - 2;
  const userEmail = getEmail.slice(startEmailPosition, finishEmailPosition);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
    <Header
      renderProfileIcon
      renderSearchIcon={ false }
      location={ location }
    />
      <p data-testid="profile-email">{userEmail}</p>
      <button
        type="button"
        onClick={ () => history.push('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
Profile.propTypes = {}.isRequired;
