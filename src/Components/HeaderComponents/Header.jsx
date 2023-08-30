import './Header.css'
import { useNavigate } from 'react-router';

const Header = () => {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleAddClick = () => {
        navigate('/add-recipe');
    }

    return <div className="header">
        <div className='logo'>LOGO</div>
        <div className='nav'>
            <div onClick={handleHomeClick}>Home</div>
            <div onClick={handleAddClick}>Add Recipe</div>
        </div>
    </div>
}

export default Header

