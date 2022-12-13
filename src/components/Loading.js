import ReactLoading from 'react-loading';
import './Loading.css';

function Loading() {
  return (
    <span className="loading">
      <ReactLoading
        type="spin"
        className="loadingIcon"
      />
    </span>
  );
}

export default Loading;
