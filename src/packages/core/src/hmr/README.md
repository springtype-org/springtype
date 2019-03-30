## Hot Module Replacement

This module contains code to influence the behaviour of certain
build systems using the `module.hot` API.

If `module.hot` is available and the build system notifies the 
module (runtime loaded JS code of an ES6 module) that there is a
more recent revision of the code and it's gonna be replaced
on the fly, we hook into this process 
(via the `module.hot.accept` interceptor callback) and trigger 
a hard site reload.

This might seem counter-intuitive at first-sight, because we're 
loosing a chance to only reload certain parts of the application 
code, *BUT*:

- Experience told us that most build systems (including parcel) 
fail at code cache invalidation in more advanced situations.

- When cache invalidation goes wrong (sometimes) then it 
leads to utterly hard to find "Heisenbugs".

- So we decided to prioritize the developer experience and a 
guaranteed stable (deterministic) on-the-fly code update 
and accept the full page refresh behaviour.