import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import SongCreate from './components/song-create/song-create.component';
import SongList from './components/song-list/song-list.component';

import './App.css';
import SongDetail from './components/song-detail/song-detail.component';

function App() {
  useEffect(() => {
    const callApi = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };

    callApi();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>My Song App</h1>
        <Switch>
          <Route path="/songs/new" component={SongCreate} />
          <Route path="/songs/:id" component={SongDetail} />
          <Route path="/">
            <SongList />
            <Button color="primary" component={Link} to="/songs/new">
              <AddCircleIcon />
              Song
            </Button>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
