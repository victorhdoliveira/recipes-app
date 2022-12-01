import { useHistory } from 'react-router-dom';

export default function Profile() {
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
    </>
  );
}
