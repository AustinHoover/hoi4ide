import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index/Index';
import React from 'react';
import { appStateReducer } from './state/mainState.reducer';
import { AppState, initialAppState, initialContext } from './state/mainState.interface';
import Home from './pages/home/Home';
import Countries from './pages/countries/Countries';
import States from './pages/states/States';
import CreateProject from './pages/createproject/createproject';
import Characters from './pages/characters/Characters';
import CreateCharacter from './pages/createcharacter/createcharacter';
import CreateUnit from './pages/createunit/createunit';
import CreateCountry from './pages/createcountry/createcountry';
import Maps from './pages/maps/maps';
import Debug from './pages/debug/debug';
import { AppConfig } from './AppConfig';
import Project from './pages/project/project';
import MassEdit from './pages/massedit/massedit';

export const AppContext = React.createContext(initialContext);

export interface AppProperties {
  appConfig?: AppConfig,
}

function App(props: AppProperties) {
  let initialReducerState: AppState = {
    ...initialAppState,
    appDetails: {
      ...initialAppState.appDetails,
      debug: props.appConfig ? props.appConfig.debug : false,
    }
  }
  const [state, dispatch] = React.useReducer(appStateReducer, initialReducerState);
  const context = React.useContext(AppContext);
  context.state = state;
  context.dispatch = dispatch;
  return (
    <div className="App">
      <AppContext.Provider value={context}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/countries" element={<Countries/>}/>
            <Route path="/states" element={<States/>}/>
            <Route path="/characters" element={<Characters/>}/>
            <Route path="/createproject" element={<CreateProject/>}/>
            <Route path="/createcountry" element={<CreateCountry/>}/>
            <Route path="/createcharacter" element={<CreateCharacter/>}/>
            <Route path="/createunit" element={<CreateUnit/>}/>
            <Route path="/project" element={<Project/>}/>
            <Route path="/massedit" element={<MassEdit/>}/>
            <Route path="/map" element={<Maps/>}/>
            <Route path="/debug" element={<Debug/>}/>
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
