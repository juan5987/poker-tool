import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//components
import Home from 'components/Home';
import Cgu from 'components/Cgu';
import Faq from 'components/Faq';
import About from 'components/About';
import Chips from 'components/Chips';
import Distributor from 'components/Distributor';
import Contact from 'components/Contact';
import ConfirmationCheck from 'components/Confirmation/ConfirmationCheck';
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import ResetPassword from 'components/ResetPassword';
import Profile from 'components/Profile';
import Tournaments from 'components/Tournaments';
import CreateTournament from 'components/Tournaments/CreateTournament';
import TournamentDetails from 'components/Tournaments/TournamentDetails';
import ModifyTournament from 'components/Tournaments/ModifyTournament';

//style
import './App.scss';


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch({ type: "LOG_IN_SUCCESS" })
  });

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cgu">
          <Cgu />
        </Route>
        <Route exact path="/faq">
          <Faq />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/chip">
          <Chips />
        </Route>
        <Route exact path="/distributor">
          <Distributor />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/tournaments">
          <Tournaments />
        </Route>
        <Route exact path="/tournaments/create">
          <CreateTournament />
        </Route>
        <Route exact path="/tournament/:id">
          <TournamentDetails />
        </Route>
        <Route exact path="/tournament/modify/:id">
          <ModifyTournament />
        </Route>
        <Route exact path="/confirmation/:confirmationCode">
          <ConfirmationCheck />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordForm />
        </Route>
        <Route exact path="/forgot-password/:forgotPasswordCode">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default  App;
