# src

This holds all source files to build the site:

* `css` - Custom CSS
* `handlebars` - The bulk of the content - each pages is an `.hbs` file, but this also contains partials and code samples
* `images` - images.  These should be full-size images.  The build process will scale them down to thumbnails
* `js/client` - contains any JS needed on the client side, which is currently nothing but a shim for Webpack to deal with CSS
* `js/server` - Most of the code that powers the build of this site
* `timeline` - Timeline source used in building the site.
