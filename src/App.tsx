import { Link } from "react-router-dom";
import Gameboy from "./components/gameboy";
import Keyboard from "./components/keyboard";
import Rubiks from "./components/rubiks";
import Disney from "./components/disney";

function App() {
  return (
    <div className="grid">
      <Link to="/keyboard">
        <Keyboard />
      </Link>
      <Link to="/gameboy">
        <Gameboy />
      </Link>
      <Link to="/rubiks">
        <Rubiks />
      </Link>
      <Link to="/disney">
        <Disney />
      </Link>
    </div>
  );
}

export default App;
