import './Banner.css'
// import bannerLogo from '../ElementComponents/food.jpg';

const Banner = ({ search, setSearch }) => {
    return <div className='banner-outer'>
        <div className='banner'></div>
        <div className='search'>
            <input type="text" className='search-recipe-input' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for a recipe...' />
        </div>
    </div>
}

export default Banner;