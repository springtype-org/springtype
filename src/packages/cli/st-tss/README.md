## st-tss

A command line tool to transform arbitrary CSS, SCSS, Sass and Less into TSS (Types Style Sheets).

Just call:

`npx st-tss $inputFolder $outputFolder`

E.g. you have a folder structure like this:


    assets/
        styles/
            css/
                foobar.css
                ...
            scss/
                baz.scss
                ...
        tss/
           - empty -
        
In folder `assets` you'd just call:

`npx st-tss ./styles ./tss`

`st-tss` will automatically figure the file types and recreate all stylesheets
in the TSS format:


    assets/
        styles/
            css/
                foobar.css
                ...
            scss/
                baz.scss
                ...
        tss/
           css/
               foobar.css.tss.ts
               ...
           scss/
               baz.scss.tss.ts
               ...


### Roadmap

- [x] Full CSS3 support (without CSS4 variables)
- [ ] Array notation on duplicate properties (CSS/TSS)
- [ ] Full CSS4 support (with CSS4 variables and functions)
- [ ] Full SCSS support (parser is ready)
- [ ] Full Sass support (parser is ready)
- [ ] Full Less support (parser is ready)