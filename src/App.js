import React, { useState } from "react";
import { Switch, Route } from "react-router-dom"
import FeedPage from "./pages/feed"
import ExplorePage from "./pages/explore"
import ProfilePage from "./pages/profile"
import PostPage from "./pages/post"
import EditProfilePage from "./pages/edit-profile";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import NotFoundPage from "./pages/not-found";
import { useHistory, useLocation } from "react-router-dom";
import PostModal from "./components/post/PostModal";
import userReducer from "./reducer";
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsmobile);

const user = localStorage.getItem('currentUser') || {
  id: null,
  username: null,
  name: null,
  profileImage: null,
}

export const UserContext = React.createContext({
  user: user
})

function App({ signOut, signIn, signUp }) {
  const initialUserState = React.useContext(UserContext);
  const [state, dispatch] = React.useReducer(userReducer, initialUserState);
  // const [user, setUser] = React.useState({
  //   username: '',
  //   profileImage: '',
  // });
  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    if (!history.action !== 'POP' && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== location;

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" render={() => <ProfilePage signOut={signOut} />} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" render={() => <LoginPage signIn={signIn} />} />
        <Route path="/accounts/emailsignup" render={() => <SignUpPage signUp={signUp} />} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
    </UserContext.Provider>
  )
}

export default App;
