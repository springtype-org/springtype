import {tsx} from "../../../../src/web/vdom";
import {MwcTopBar} from "./mwc-top-bar";
import {classes} from "../../functions/classes";

export default (component: MwcTopBar) => {
    const prominent = component['mwc-variant'] == 'fixed-prominent' || component['mwc-variant'] == 'prominent';
    const fixed = component['mwc-variant'] == 'fixed-prominent' || component['mwc-variant'] == 'fixed-short' || component['mwc-variant'] == 'fixed';
    const short = (component['mwc-variant'] == 'short' && !component["menu-open"])
        || (component['mwc-variant'] == 'fixed-short' && component["mwc-scrolled"] && !component["menu-open"]);

    return <div>
        <div class={classes({
            'mdc-top-app-bar': true,
            'mdc-top-app-bar--non-fixed': !fixed,
            'mdc-top-app-bar--fixed': fixed,
            'mdc-top-app-bar--fixed-scrolled': fixed,
            'mdc-top-app-bar--dense': component["mwc-dense"],
            'mdc-top-app-bar--prominent': prominent,
            'mdc-top-app-bar--short': short,
            'mdc-top-app-bar--short-collapsed': short,
            'mdc-top-app-bar--short-has-action-item': short
        })} >
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    { /* TODO: add topbar-start */}
                    <button onClick={() => component["menu-open"] = !component["menu-open"]}
                            class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
                            style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">menu
                    </button>

                    <span class="mdc-top-app-bar__title">{component["mwc-title"]}</span></section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                    {/* TODO: add topbar-end */}
                    <button
                        class={"mdc-icon-button material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded " +
                        classes({
                            'hidden': short,
                        })}
                        aria-label="Download"
                        style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">file_download
                    </button>
                    <button
                        class={" mdc-icon-button material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded " +
                        classes({
                            'hidden': short,
                        })}
                        aria-label="Print this page"
                        style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">print
                    </button>
                    <button
                        class="mdc-icon-button material-icons mdc-top-app-bar__action-item mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
                        aria-label="Bookmark this page"
                        style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">bookmark
                    </button>
                </section>
            </div>
        </div>
        <div id="fixed" class={classes({
            "mdc-top-app-bar--fixed-adjust": fixed && component['mwc-variant'] != 'fixed-prominent',
            "mdc-top-app-bar--prominent-fixed-adjust": component['mwc-variant'] == "fixed-prominent",
            "mdc-top-app-bar--dense": component["mwc-dense"]
        })}>
        </div>
    </div>

}
