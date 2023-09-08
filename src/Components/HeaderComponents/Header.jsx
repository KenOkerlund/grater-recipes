import './Header.css'
import { useNavigate} from 'react-router';
import image from '../ElementComponents/logo1.png'

const Header = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleAddClick = () => {
        navigate('/add-recipe');
    };

    return <div className="header">
        <div className='logo'>
            <img src={image} alt="logo" className='company-logo' />
        </div>
                    <nav>
                        <button onClick={handleHomeClick}>Home</button>
                        <button onClick={handleAddClick}>Add Recipe</button>
                    </nav>
    </div>
}

export default Header

