import Navbar from "./components/Navbar/Navbar";
import NewsAddForm from "./components/NewsAddForm/NewsAddForm";
import NewsFilter from "./components/NewsFilter/NewsFilter";
import NewsList from "./components/NewsList/NewsList";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <NewsList />
        <div className="content__page">
          <NewsAddForm />
          <NewsFilter />
        </div>
      </div>
    </div>
  );
}

export default App;
