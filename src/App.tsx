import Gameboy from "./components/gameboy";
import Keyboard from "./components/keyboard";

function App() {
  return (
    <div className="grid">
      <Keyboard />
      <Gameboy />
    </div>
  );
}

export default App;
