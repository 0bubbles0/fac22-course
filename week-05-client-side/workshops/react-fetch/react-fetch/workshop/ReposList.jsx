import React from "react";
import App from './App.jsx';

function ReposList(props) {
  const [repos, setRepos] = React.useState();

  React.useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, [props.url]);

  if (!repos) return <div>Loading repos...</div>;
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.url}>{repo.name}</a> | ⭐️ {repo.stargazers_count}
        </li>
      ))}
    </ul>
  );
}

export {ReposList};