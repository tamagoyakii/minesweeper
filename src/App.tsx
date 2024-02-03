import { Provider } from 'react-redux';
import 'src/App.css';
import Game from 'src/features/Game';
import { store } from 'src/app/store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Game />
      </div>
    </Provider>
  );
}

export default App;
