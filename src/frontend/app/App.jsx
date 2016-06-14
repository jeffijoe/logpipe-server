import React from 'react';
import './App.styl';
import Header from './components/Header';
import Footer from './components/Footer';
import LogsView from './components/LogsView';
import logStore from './stores/LogStore';
import { observer } from 'mobx-react';

/**
 * App component. Nice.
 */
@observer
class App extends React.Component {
  render() {
    return (
      <div>
        <Header
          onClickClearLogs={() => logStore.clearLogs()}
          onClickToggleBuffer={() => logStore.toggleBuffering()}
          isBuffering={logStore.isBuffering}
        />
        <LogsView store={logStore} />

        <Footer />
      </div>
    );
  }
}

export default App;