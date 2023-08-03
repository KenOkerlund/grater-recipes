import RecipeContainer from "./Components/HomeComponents/RecipeContainer";

import "./App.css";
import Header from "./Components/HeaderComponents/Header";
import Banner from "./Components/HomeComponents/Banner";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Banner />
        <RecipeContainer />
      </main>
    </div>
  );
}

export default App;
