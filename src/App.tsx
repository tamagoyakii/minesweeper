import { Provider } from 'react-redux';

import 'src/App.css';
import { store } from 'src/app/store';
import Game from 'src/features/Game';

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
