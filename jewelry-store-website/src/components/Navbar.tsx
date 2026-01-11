import { Link } from 'react-router-dom';
import BrowseButton from './BrowseButton';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Jewelry Store</h1>
        <div>
          <Link to="/" className="text-white mr-4">Home</Link>
          <Link to="/login" className="text-white mr-4">Login</Link>
          <BrowseButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;