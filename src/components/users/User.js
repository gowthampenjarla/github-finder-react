import React, { Fragment, useEffect, useContext } from "react";
import Loader from "react-loader-spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    html_url,
    login,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return (
      <Loader
        className='spinner'
        type='TailSpin'
        color='#073b4c'
        height={100}
        width={100}
      />
    );
  } else {
    return (
      <div>
        <div className='card card-body mt-5'>
          <div className='row '>
            <div className='col-sm-6 text-center'>
              <img
                src={avatar_url}
                alt={login}
                className='rounded-circle'
                style={{ width: "250px" }}
              />
              <h2>{name}</h2>
              <p>{location}</p>
            </div>
            <div className='col-sm-6'>
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <ul className='user'>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: </strong> {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: </strong> {company}
                    </Fragment>
                  )}
                </li>
              </ul>
              <a href={html_url} class='my-2 btn' target='_blank'>
                Visit Github Profile
              </a>
            </div>
          </div>
        </div>
        <Repos repos={repos} />
      </div>
    );
  }
};

export default User;
