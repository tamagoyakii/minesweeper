import 'src/App.css';
import Game from 'src/components/Game';

function App() {
  return (
    <div className='App' onContextMenu={(e) => e.preventDefault()}>
      <Game />
    </div>
  );
}

export default App;
