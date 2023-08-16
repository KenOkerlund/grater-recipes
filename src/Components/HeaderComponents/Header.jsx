import './Header.css'
import { useNavigate } from 'react-router';

const Header = () => {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/')
    }
    return <div className="header">
        <div className='logo'>LOGO</div>
        <div className='nav'>
            <div className='home' onClick={handleHomeClick}>Home</div>
            <div className='add-recipe'>Add Recipe</div>
            <div className='copy-recipe'>Copy Recipe</div>
        </div>
    </div>
}

export default Header

