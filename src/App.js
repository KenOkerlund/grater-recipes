import "./App.css";
import Header from "./Components/HeaderComponents/Header";

import { Route, Routes } from 'react-router-dom'
import HomeScreen from "./Components/HomeComponents/HomeScreen";
import DetailScreen from './Components/RecipeDetailComponents/DetailScreen';
import AddRecipe from "./Components/NewRecipeComponents/AddRecipe";



function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/recipe/:id" element={<DetailScreen />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path='*' element={<HomeScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
