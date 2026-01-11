import { useNavigate } from 'react-router-dom';

const BrowseButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/browse');
  };

  return (
    <button 
      onClick={handleClick} 
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Browse Jewel
    </button>
  );
};

export default BrowseButton;