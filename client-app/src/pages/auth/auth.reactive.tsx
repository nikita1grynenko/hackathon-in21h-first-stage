import { type FormEvent, useCallback, useState } from 'react';
import './auth.style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { fetchSignIn, fetchSignUp, type SignInData, type SignUpData } from '../../middleware/auth.fetching';
import decodeJWT from '../../utils/decode-jwt';

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // TODO show error on the form
      return;
    }

    const signUpData: SignUpData = { userName: userName, email: email, password: password };
    const response = await fetchSignUp(signUpData);

    if (response) {
      localStorage.setItem('jwt', response.token);
      const decodedToken = decodeJWT(response.token);

      dispatch(
        login({
          userName: decodedToken.userName, 
          email: decodedToken.email,
          avatarUrl: null // * TODO add avatarUrl
        })
      );
      navigate('/');
    } else {
      // TODO show error on the form
    }
  }, [confirmPassword, dispatch, email, navigate, password, userName]);

  const handleSignIn = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const signInData: SignInData = { email: email, password: password };
    const response = await fetchSignIn(signInData);

    if (response) {
      localStorage.setItem('jwt', response.token);
      const decodedToken = decodeJWT(response.token);

      dispatch(
        login({
          userName: decodedToken.userName, 
          email: decodedToken.email,
          avatarUrl: null // * TODO add avatarUrl
        })
      );
      navigate('/');
    } else {
      // TODO show error on the form
    }
  }, [dispatch, email, navigate, password]);

  const toggle = useCallback(() => {
    setIsSignIn(!isSignIn);
  }, [isSignIn]);

  const blockActions = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     navigate('/');
  //   }
  // }, [navigate]); // ! TODO this is commented out because it causes an infinite loop

  return (
    <div
      id="container"
      className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}
    >
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <form className="form sign-up" onSubmit={handleSignUp}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onCopy={blockActions} 
                  onPaste={blockActions} 
                  onCut={blockActions} 
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onCopy={blockActions} 
                  onPaste={blockActions} 
                  onCut={blockActions} 
                />
              </div>
              <button>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </form>
          </div>
        </div>
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <form className="form sign-in" onSubmit={handleSignIn}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onCopy={blockActions} 
                  onPaste={blockActions} 
                  onCut={blockActions} 
                />
              </div>
              <button type="submit">Sign in</button>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* CONTENT SECTION */}
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
