import Gameboy from "./components/gameboy";
import Keyboard from "./components/keyboard";
import Rubicks from "./components/rubicks";

function App() {
  return (
    <div className="grid">
      <Keyboard />
      <Gameboy />
      <Rubicks />
    </div>
  );
}

export default App;
