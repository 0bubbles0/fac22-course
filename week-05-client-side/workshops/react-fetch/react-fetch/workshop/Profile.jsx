import React, { useReducer } from "react";
import App from './App.jsx';
import { ReposList } from "./ReposList.jsx";

const USER_URL = "https://api.github.com/users/"

function Profile(props) {
  console.log('Huhuuu');
  const [gitter, setGitter] = React.useState()
  // fetch profile-url
  React.useEffect(() => {
    fetch(USER_URL + props.name)
    .then(res => res.json())
    .then(data => setGitter(data))
  }, [props.name])

  if(!gitter){
    // loading message
    return <div>Loadiiiiiing...</div>
  } else {
    console.log(gitter)
    return (
      <div>
        <h1>{gitter.name}</h1>
        <img src={gitter.avatar_url} alt="User Avatar" width="200" height="200"/>
        <h2>Repos</h2>
        <ReposList url={gitter.repos_url}/>
      </div>
      )
  }
  // show my name, avatar-img
}


export {Profile};