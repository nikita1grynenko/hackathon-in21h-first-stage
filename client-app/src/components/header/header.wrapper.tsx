import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Header from './header.reactive';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HeaderWrapper: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    console.log('Checking authentication');
    if (isAuthenticated) {
      console.log('Authenticated');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return <Header />;
};

export default HeaderWrapper;
