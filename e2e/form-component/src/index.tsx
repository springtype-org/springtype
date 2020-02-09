import "materialize-css/dist/css/materialize.min.css"
import * as M from "materialize-css/dist/js/materialize.js"

import {st} from "../../../src/core";
import {component} from "../../../src/web/component";
import {tsx} from "../../../src/web/vdom";
import {From, Input, Select} from "../../../src/web/form";

const VALIDATOR_NAME = "ST_VALIDATOR_NAME";
const validatorFactory = (fun: (value: string) => Promise<boolean>, validatorName: string) => {
    fun[VALIDATOR_NAME] = validatorName;
    return fun;
};

const required = validatorFactory(async (value: string): Promise<boolean> => {
        st.debug('required', !!value);
        return !!value;
    },
    'required'
);

const length = validatorFactory(async (value: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            st.debug('length', value.length >= 5);
            resolve(value.length >= 5)
        }, 3000)
    });
}, 'length');

@component
export class Foo extends st.staticComponent {

    render() {
        console.log('validator name', required[VALIDATOR_NAME])
        return <fragment>
            <div class="parallax-container">
                <div class="parallax"><img src="../assets/images/parallax1.jpg"/></div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col s12 m8 offset-m1 xl7 offset-xl2">
                        <From>
                            <From name="input">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <Input placeholder="Placeholder" id="first_name" name="first_name"
                                               type="text" class="validate"/>
                                        <label for="first_name" class="active">First Name</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <Input id="last_name" name="last_name" type="text"/>
                                        <label for="last_name">Last Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <Input disabled={true} value="I am not editable" id="disabled"
                                               name="disabled" type="text"
                                               class="validate"/>
                                        <label for="disabled" class="active">Disabled</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <Input id="password" name="password" type="password" class="validate"/>
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <Input name="email" id="email" type="email"
                                               validators={[required, length]}/>
                                        <label for="email">Email</label>
                                        <span class="helper-text" data-error="wrong"
                                              data-success="right">Helper text</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12">
                                        This is an inline input field:
                                        <div class="input-field inline">
                                            <Input id="email_inline" name="email_inline"
                                                   type="email"
                                                   class="validate"/>
                                            <label for="email_inline">Email</label>
                                            <span class="helper-text" data-error="wrong" data-success="right"/>
                                        </div>
                                    </div>
                                </div>
                            </From>
                            <From name="radio-buttons">
                                <p>
                                    <label>
                                        <Input name="group1" type="radio" value="red" checked={true}/>
                                        <span>Red</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="group1" type="radio" value="yellow"/>
                                        <span>Yellow</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input class="with-gap" name="group1" type="radio" value="green"/>
                                        <span>Green</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="group1" type="radio" disabled={true} value="brown"/>
                                        <span>Brown</span>
                                    </label>
                                </p>
                            </From>
                            <div class="row">
                                <div class="col s12">
                                    <ul class="tabs">
                                        <li class="tab col s3"><a href="#test1">Test 1</a></li>
                                        <li class="tab col s3"><a class="active" href="#test2">Test 2</a></li>
                                        <li class="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
                                        <li class="tab col s3"><a href="#test4">Test 4</a></li>
                                    </ul>
                                </div>
                                <div id="test1" class="col s12">Test 1</div>
                                <div id="test2" class="col s12">Test 2</div>
                                <div id="test3" class="col s12">Test 3</div>
                                <div id="test4" class="col s12">Test 4</div>
                            </div>

                            <From>

                                <p>
                                    <label>
                                        <Input type="checkbox"/>
                                        <span>Red</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input type="checkbox" checked={true}/>
                                        <span>Yellow</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input type="checkbox" class="filled-in" checked={true}/>
                                        <span>Filled in</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input id="indeterminate-checkbox" type="checkbox"/>
                                        <span>Indeterminate Style</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input type="checkbox" checked={true} disabled={true}/>
                                        <span>Green</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input type="checkbox" disabled={true}/>
                                        <span>Brown</span>
                                    </label>
                                </p>
                            </From>
                            <div class="chip">
                                <img src="../assets/images/yuna.jpg" alt="Contact Person"/>
                                Jane Doe
                            </div>
                            <div class="chip">
                                Tag
                                <i class="close material-icons">close</i>
                            </div>

                            <From name="datepicker">
                                <Input name="date" type="text" class="datepicker"/>
                            </From>
                            <From name="range">
                                <p class="range-field">
                                    <input name="html5" type="range" id="test5" min="0" max="100"/>
                                </p>
                            </From>
                            <From name="switches">
                                <div class="switch">
                                    <label>
                                        Off
                                        <Input name="switch" type="checkbox"/>
                                        <span class="lever"/>
                                        On
                                    </label>
                                </div>
                                <div class="switch">
                                    <label>
                                        Off
                                        <Input name="switch-disabled" disabled={true} type="checkbox"/>
                                        <span class="lever"/>
                                        On
                                    </label>
                                </div>
                            </From>
                            <From name="selects">
                                <div class="input-field col s12">
                                    <Select name="select">
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </Select>
                                    <label>Materialize Select</label>
                                </div>

                                <div class="input-field col s12">
                                    <Select name="multiple-select" multiple>
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </Select>
                                    <label>Materialize Multiple Select</label>
                                </div>

                                <div class="input-field col s12">
                                    <Select name="option-group-select">
                                        <optgroup label="team 1">
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                        </optgroup>
                                        <optgroup label="team 2">
                                            <option value="3">Option 3</option>
                                            <option value="4">Option 4</option>
                                        </optgroup>
                                    </Select>
                                    <label>Optgroups</label>
                                </div>

                                <div class="input-field col s12 m6">
                                    <Select name="image-select-1" class="icons">
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="" data-icon="assets/images/sample-1.jpg">example 1</option>
                                        <option value="" data-icon="assets/images/office.jpg">example 2</option>
                                        <option value="" data-icon="assets/images/yuna.jpg">example 3</option>
                                    </Select>
                                    <label>Images in select</label>
                                </div>
                                <div class="input-field col s12 m6">
                                    <Select name="image-select-2" class="icons">
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="" data-icon="assets/images/sample-1.jpg" class="left">example 1
                                        </option>
                                        <option value="" data-icon="assets/images/office.jpg" class="left">example 2
                                        </option>
                                        <option value="" data-icon="assets/images/yuna.jpg" class="left">example 3
                                        </option>
                                    </Select>
                                    <label>Images in select</label>
                                </div>

                                <label>Browser Select</label>
                                <Select name="browser-default" class="browser-default">
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Select>
                            </From>
                            <div class="carousel">
                                <a class="carousel-item" href="#one!"><img src="../assets/images/ca1.jpg"/></a>
                                <a class="carousel-item" href="#two!"><img src="../assets/images/ca2.jpg"/></a>
                                <a class="carousel-item" href="#three!"><img src="../assets/images/ca3.jpg"/></a>
                                <a class="carousel-item" href="#four!"><img src="../assets/images/ca4.jpg"/></a>
                                <a class="carousel-item" href="#five!"><img src="../assets/images/ca5.png"/></a>
                                <a class="carousel-item" href="#five!"><img src="../assets/images/ca6.jpg"/></a>
                            </div>

                            <ul class="collapsible">
                                <li>
                                    <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
                                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                                <li>
                                    <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
                                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                                <li>
                                    <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
                                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                            </ul>

                            <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

                            <ul id='dropdown1' class='dropdown-content'>
                                <li><a href="#!">one</a></li>
                                <li><a href="#!">two</a></li>
                                <li class="divider" tabindex="-1"></li>
                                <li><a href="#!">three</a></li>
                                <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                                <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                            </ul>

                            <div class="card">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img class="activator" src="../assets/images/office.jpg"/>
                                </div>
                                <div class="card-content">
                                    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                                    <p><a href="#">This is a link</a></p>
                                </div>
                                <div class="card-reveal">
                                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                </div>
                            </div>
                            <ul class="pagination">
                                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                                <li class="active"><a href="#!">1</a></li>
                                <li class="waves-effect"><a href="#!">2</a></li>
                                <li class="waves-effect"><a href="#!">3</a></li>
                                <li class="waves-effect"><a href="#!">4</a></li>
                                <li class="waves-effect"><a href="#!">5</a></li>
                                <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                            </ul>
                        </From>
                    </div>
                </div>

            </div>


            <footer class="page-footer">
                <div class="container">
                    <div class="row">
                        <div class="col l6 s12">
                            <h5 class="white-text">Footer Content</h5>
                            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                        </div>
                        <div class="col l4 offset-l2 s12">
                            <h5 class="white-text">Links</h5>
                            <ul>
                                <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                                <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                                <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                                <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="container">
                        © 2014 Copyright Text
                        <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                    </div>
                </div>
            </footer>
        </fragment>
    }

    onAfterRender() {
        M.AutoInit();
    }


}

st.render(<Foo/>);
