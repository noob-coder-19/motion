import "./App.css";
import About from "./components/about";
import GamesSurvived from "./components/games-survived";
import Mouse from "./components/mouse";
import SquidGame from "./components/squid-game";

function App() {
  return (
    <>
      <Mouse />
      <SquidGame />
      <About />
      <GamesSurvived />
    </>
  );
}

export default App;
