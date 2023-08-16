import RecipeContainer from "./Components/HomeComponents/RecipeContainer";

import "./App.css";
import Header from "./Components/HeaderComponents/Header";

import {Route, Routes } from 'react-router-dom'
import HomeScreen from "./Components/HomeComponents/HomeScreen";
import DetailScreen from './Components/RecipeDetailComponents/DetailScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="/recipe/:id" element={<DetailScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
