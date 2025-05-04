import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Optional: if using Bootstrap

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '70vh', textAlign: 'center' }}>
      <h1 className="display-4 text-danger">404</h1>
      <p className="lead">Oops! The page you are looking for doesn’t exist.</p>
      <p className="text-muted mb-4">It might have been moved or deleted.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
