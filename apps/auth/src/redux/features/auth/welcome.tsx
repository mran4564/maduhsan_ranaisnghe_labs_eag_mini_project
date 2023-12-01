import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user.userId}!` : 'Welcome!';

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>
        <Link to="/userslist">Go to the Users List</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
