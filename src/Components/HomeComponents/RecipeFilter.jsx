import './RecipeFilter.css'

const RecipeFilter = ({ search, setSearch }) => {
    return (
        <div className="search">
            <div className='search-function'>
                <h3>Search Your Recipes</h3>
                <input type="text" className='search-recipe-input' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
            </div>
        </div>
    );
};

export default RecipeFilter;