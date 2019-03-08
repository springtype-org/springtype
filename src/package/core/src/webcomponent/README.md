## Web Component User Interface

Web components and shadow DOM is the next generation of web frontend
technology. We want to focus on having an easy, smart, low-footprint
way to develop your next web application and we want to get around 
any vendor or framework lock-in. What does this mean? 

Well, the idea is to have an agnostic web component compiler instead
of another framework. 

- To use standard HTML for markup
- To use standard CSS, SCSS and TSS for styling
- To use standard ECMAScript / TypeScript for the view's logic

And to encourage developers to only put view logic into views, 
not business logic. 

The outcome would be simple to read and manage code that would
just define custom HTML elements with a custom behaviour:

- Easy to understand
- Easy to debug
- Easy to use

This is how elegant code should look like.

Because of that, we've chosen the simplest approach we could
find, because we are not here to reinvent the wheel, if we are
not forced to (because there is no existing open source solution).