import React from 'react';
import './App.styl';
import Header from './components/Header/Header.jsx';
import LogsView from './components/LogsView/LogsView.jsx';
import logsStore from './stores/LogsStore';

/**
 * App component. Nice.
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <Header onClickClearLogs={() => logsStore.clearLogs()}/>
        <LogsView store={logsStore} />
      </div>
    );
  }
}

export default App;