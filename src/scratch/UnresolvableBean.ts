// explicit no @Component annotation!
export class UnresolvableBean {

    test() {

        // this should not be visible :)
        console.log('Magggiiiicc!!, I need no @Component to be found!');
    }
}