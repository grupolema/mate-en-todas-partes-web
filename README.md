# Mathematics is Everywhere website

A mini website for the "Mathematics is Everywhere" theme of IDM 2020. It presents various human activities
in a grid and explains their relationship with mathematics via short texts.

## Compilation

This website is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files. 

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **yarn**
- **gulp** (install globally)

Afterwards run the following in the command line:

```
cd src
yarn
```

After it runs succesfuly you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```
  
- **scripts (ES6)**
    ```
    gulp scripts
    ```

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    yarn run build
    ```

## HTML generation

The HTML content is built dynamically by pug out of data files in different languages.

Each of the main pug files selects the language it'll be in with in its `init` block:

```
block init
  - lang = 'en';
```

The building scripts in `src/pug/lib.js` read the data files from the `data` directory.

To add a new language simply create or modify a pug file to initialize the right language code,
add the translation file to the data directory and then run `gulp html` to build the HTML.

### Item ordering

The `src/pug/config.json` file defines an "order" property which is used to sort the applications in the
home grid. 
