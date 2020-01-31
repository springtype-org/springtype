import { st } from "springtype/core";
import { ref } from "springtype/core/ref";
import { attr, component } from "springtype/web/component";
import { ILifecycle } from "springtype/web/component/interface";
import { tsx } from "springtype/web/vdom";

import "../node_modules/materialize-css/dist/js/materialize.min.js";

import "../assets/materialize.scss";
import "../assets/global-styles.scss";

@component
export class MaterializeDemo extends st.staticComponent implements ILifecycle {

  @ref
  sideNav: HTMLElement;

  render() {
    return (
      <fragment>
        <nav class="white" role="navigation">
          <div class="nav-wrapper container">
            <a id="logo-container" href="#" class="brand-logo">st.Materialize</a>
            <ul class="right hide-on-med-and-down">
              <li><a href="#">Navbar Link</a></li>
            </ul>

            <ul id="nav-mobile" class="sidenav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          </div>
        </nav>

        <div id="index-banner" class="parallax-container">
          <div class="section no-pad-bot">
            <div class="container">
              <br /><br />
              <h1 class="header center white-text">Parallax Template</h1>
              <div class="row center">
                <h5 class="header col s12 light white-text">A modern responsive front-end framework based on Material Design</h5>
              </div>
              <div class="row center">
                <a href="http://materializecss.com/getting-started.html" target="_blank" id="download-button" class="btn-large waves-effect waves-light white darken-2 black-text">Get Started</a>
              </div>
              <br /><br />

            </div>
          </div>
          <div class="parallax"><img src={require("../assets/images/background1.jpg")} alt="Unsplashed background img 1" /></div>
        </div>


        <div class="container">
          <div class="section">

            <div class="row">
              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center blue-text"><i class="material-icons">flash_on</i></h2>
                  <h5 class="center">Speeds up development</h5>

                  <p class="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center blue-text"><i class="material-icons">group</i></h2>
                  <h5 class="center">User Experience Focused</h5>

                  <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center blue-text"><i class="material-icons">settings</i></h2>
                  <h5 class="center">Easy to work with</h5>

                  <p class="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div class="parallax-container valign-wrapper">
          <div class="section no-pad-bot">
            <div class="container">
              <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
              </div>
            </div>
          </div>
          <div class="parallax"><img src={require("../assets/images/background2.jpg")} alt="Unsplashed background img 2" /></div>
        </div>

        <div class="container">
          <div class="section">

            <div class="row">
              <div class="col s12 center">
                <h3><i class="mdi-content-send brown-text"></i></h3>
                <h4>Contact Us</h4>
                <p class="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
              </div>
            </div>

          </div>
        </div>


        <div class="parallax-container valign-wrapper">
          <div class="section no-pad-bot">
            <div class="container">
              <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
              </div>
            </div>
          </div>
          <div class="parallax"><img src={require("../assets/images/background3.jpg")} alt="Unsplashed background img 3" /></div>
        </div>

        <footer class="page-footer blue">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Company Bio</h5>
                <p class="grey-text text-lighten-4">

                  SpringType Materialize is brought to you by Aron Homberg &amp; Michael Mannseicher together with the Materialize.com team.
                </p>


              </div>
              <div class="col l3 s12">
                <h5 class="white-text">Settings</h5>
                <ul>
                  <li><a class="white-text" href="#!">Link 1</a></li>
                  <li><a class="white-text" href="#!">Link 2</a></li>
                  <li><a class="white-text" href="#!">Link 3</a></li>
                  <li><a class="white-text" href="#!">Link 4</a></li>
                </ul>
              </div>
              <div class="col l3 s12">
                <h5 class="white-text">Connect</h5>
                <ul>
                  <li><a class="white-text" href="#!">Link 1</a></li>
                  <li><a class="white-text" href="#!">Link 2</a></li>
                  <li><a class="white-text" href="#!">Link 3</a></li>
                  <li><a class="white-text" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              Made with <a class="white-text text-lighten-3" target="_blank" href="http://springtype.org">SpringType</a> &amp;&nbsp;
              <a target="_blank" class="white-text text-lighten-3" href="http://materialize.com">Materialize</a>
            </div>
          </div>
        </footer>
      </fragment>
    );
  }

  onAfterInitialRender() {

    // see https://materializecss.com/sidenav.html JavaScript API etc.
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    M.Parallax.init(document.querySelectorAll('.parallax'), {});
  }
}

st.render(<MaterializeDemo />);
