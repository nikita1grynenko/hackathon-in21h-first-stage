import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './profile.style.css';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store/store';

export interface ProfileComponentProps {
  avatar?: string;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
  avatar,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.auth.user?.userName);
  const userAvatar =
    useSelector((state: RootState) => state.auth.user?.avatarUrl) || avatar;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={userAvatar} alt={username} />
      </div>
      <div className="profile-menu">
        <li>
          <Link to="/profile" className="profile-link">
            Мій профіль
          </Link>
        </li>
        <li>
          <Link to="/" className="profile-link">
            Мої квізи
          </Link>
        </li>
        <button className="logout-btn" onClick={handleLogout}>
          Вийти
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
