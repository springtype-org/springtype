// explicit no @Bean annotation!
export class UnresolvableBean {

    test() {

        // this should not be visible :)
        console.log('Magggiiiicc!!, I need no @Bean to be found!');
    }
}