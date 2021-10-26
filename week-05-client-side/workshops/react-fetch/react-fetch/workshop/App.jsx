import React from "react";
import {Profile} from './Profile.jsx';
import {ReposList} from './ReposList';

function App() {
  const [nameGit, setName] = React.useState('0bubbles0');

  return (
    <main>
      <div>User input goes here</div>
      <form 
        onSubmit={event => {
          event.preventDefault();
          setName(event.target.username.value);
        }}
      >
        <label htmlFor="findProfile">Find GitHub user:</label>
        <input 
          type="text" 
          id="findProfile" 
          name="username"
        />
        <button>Find</button>
      </form>
      <div>GitHub user profile goes here</div>
      <Profile name={nameGit}/>
    </main>
  );
}

export default App;
