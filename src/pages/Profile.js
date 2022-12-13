import { CiLogout } from 'react-icons/ci';
import { FiHeart } from 'react-icons/fi';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

export default function Profile({ location }) {
  const history = useHistory();
  const getEmail = JSON.parse(localStorage.getItem('user')) || { email: '' };
  // const startEmailPosition = 10;
  // const finishEmailPosition = getEmail.length - 2;
  const userEmail = getEmail.email;

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
      <p data-testid="profile-email" className="profile-email">{userEmail}</p>
      <div className="done-btn">
        <button
          type="button"
          onClick={ () => history.push('/done-recipes') }
          data-testid="profile-done-btn"
          className="profile-btn"
        >
          <MdOutlineFileDownloadDone />
        </button>
        <p>Done Recipes</p>
      </div>
      <div className="fav-btn">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="profile-btn"
        >
          <FiHeart />
        </button>
        <p>Favorite Recipes</p>
      </div>
      <div className="logout-btn">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
          className="profile-btn"
        >
          <CiLogout />
        </button>
        <p>Logout</p>
      </div>

      <Footer />
    </>
  );
}
Profile.propTypes = {}.isRequired;
