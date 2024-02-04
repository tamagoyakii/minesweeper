import { Provider } from 'react-redux';

import 'src/App.css';
import { store } from 'src/store/store';
import Game from 'src/components/Game';

function App() {
  return (
    <Provider store={store}>
      <div className='App' onContextMenu={(e) => e.preventDefault()}>
        <Game />
      </div>
    </Provider>
  );
}

export default App;
