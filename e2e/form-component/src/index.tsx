import "materialize-css/dist/css/materialize.min.css"
import "./ext-validation.css"

import {st} from "../../../src/core";
import {component} from "../../../src/web/component";
import {tsx} from "../../../src/web/vdom";
import {Form, Input, Select} from "../../../src/web/form";
import {minLength, required} from "../../../src/core/validate/validate";

st.form = {
    ...st.form,
    invalidClasses: ['invalid'],
    validClasses: ['valid'],
    labelActiveClasses: ['active']
};


@component
export class Foo extends st.staticComponent {

    render() {
        return <fragment>
            <div class="container">
                <div class="row">
                    <div class="col s12 m8 offset-m1 xl7 offset-xl2">
                        <Form name="form">
                            <button type="submit">submit</button>
                            <Form name="input">
                                <button type="submit">submit</button>
                                <div class="row">
                                    <div class="input-field col s6">
                                        <Input placeholder="Placeholder" id="first_name" name="first_name"
                                               type="text" validators={[required]}/>
                                        <label for="first_name">First Name</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <Input id="last_name" name="last_name" type="text"/>
                                        <label for="last_name">Last Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <Input disabled={true} value="I m" id="disabled"
                                               validators={[required, minLength(5)]}
                                               name="disabled" type="text"
                                        />
                                        <label for="disabled">Disabled</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <Input id="password" name="password" type="password"/>
                                        <label for="password">Password</label>
                                        <span class="helper-text" data-error="wrong"
                                              data-success="right">Helper text</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <Input name="email" id="email" validators={[required, minLength(5)]}/>
                                        <label for="email">required and length</label>
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
                                            />
                                            <label for="email_inline">Email</label>
                                            <span class="helper-text" data-error="wrong" data-success="right"/>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            <Form name="other">
                                <Form name="radio">

                                    <p>
                                        <label>
                                            <Input type="radio" name="color" value="red"/>
                                            <span>Red</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <Input type="radio" name="color" value="yellow"/>
                                            <span>Yellow</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <Input class="with-gap" name="color" type="radio" value="green"
                                                   validators={[required]}/>
                                            <span>Green</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <Input type="radio" name="color" value="brown"/>
                                            <span>Brown</span>
                                        </label>
                                    </p>
                                </Form>
                                <p>
                                    <label>
                                        <Input name="checkbox-red" type="checkbox" value="red"/>
                                        <span>Red</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="checkbox-yellow" type="checkbox" value="yellow"
                                               validators={[required]}/>
                                        <span>Yellow</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="checkbox-filled-in" type="checkbox" class="filled-in"
                                               value="filled in"
                                               validators={[required]}/>
                                        <span>Filled in</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="checkbox-indeterminate-style" id="indeterminate-checkbox"
                                               type="checkbox"/>
                                        <span>Indeterminate Style</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="checkbox-disabled-green" type="checkbox" checked={true}
                                               disabled={true}/>
                                        <span>Green</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <Input name="checkbox-disabled-brown" type="checkbox" disabled={true}/>
                                        <span>Brown</span>
                                    </label>
                                </p>
                            </Form>
                            <Form name="range">
                                <p class="range-field">
                                    <input name="html5-range" type="range" id="test5" min="0" max="100"/>
                                </p>
                            </Form>
                            <Form name="switches">
                                <div class="switch">
                                    <label>
                                        Off
                                        <Input name="switch" type="checkbox" validators={[required]}/>
                                        <span class="lever"/>
                                        On
                                    </label>
                                </div>
                                <p>

                                    <div class="switch">
                                        <label>
                                            Off
                                            <Input name="switch-disabled" disabled={true} type="checkbox"/>
                                            <span class="lever"/>
                                            On
                                        </label>
                                    </div>
                                </p>
                            </Form>
                            <Form name="selects">
                                <Select name="multiple-select" multiple>
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Select>

                                <Select name="option-group-select" class="browser-default">
                                    <optgroup label="team 1">
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                    </optgroup>
                                    <optgroup label="team 2">
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </optgroup>
                                </Select>

                                <Select name="browser-default" class="browser-default">
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Select>
                            </Form>
                        </Form>
                    </div>
                </div>

            </div>


            <footer class="page-footer">
                <div class="container">
                    <div class="row">
                        <div class="col l6 s12">
                            <h5 class="white-text">Footer Content</h5>
                            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your
                                footer content.</p>
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
        //   M.AutoInit();
    }


}

st.render(<Foo/>);
