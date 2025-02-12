import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Header from './header.reactive';

const HeaderWrapper: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Не показуємо хедер, якщо користувач не авторизований
  if (!isAuthenticated) {
    return null;
  }

  return <Header />;
};

export default HeaderWrapper;
