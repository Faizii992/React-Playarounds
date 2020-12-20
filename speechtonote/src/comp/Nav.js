import React from 'react';
import { Link } from 'react-router-dom';
function Nav() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          Home
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav mr-auto">
            {/* <li class="nav-item active">
              <Link to="/">
                <a class="nav-link" href="#">
                  Home
                  <span class="sr-only">(current)</span>
                </a>
              </Link>
            </li> */}
            <li class="nav-item active">
              <Link to="/speechtonote">
                <a class="nav-link" href="#">
                  Speech To Note
                  <span class="sr-only">(current)</span>
                </a>
              </Link>
            </li>

            <li class="nav-item active">
              <Link to="/texttospeech">
                <a class="nav-link" href="#">
                  Text to Speech
                  <span class="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/objdetect">
                <a class="nav-link" href="#">
                  Object Detection
                  <span class="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/segmentation">
                <a class="nav-link" href="#">
                  Body Segmentation
                  <span class="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="btn btn-secondary"
          title=""
          data-container="body"
          data-toggle="popover"
          data-placement="left"
          data-content="This doesn't do anything"
          data-original-title="Popover Title"
        >
          Left
        </button>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          ></input>
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Nav;
