# abacus-material-filter-panel

## [Full Documntation with examples](https://stash.corp.netflix.com/pages/ABACUS/abacus-material-filter-panel/master/browse/index.html)


## Getting Started

Install and save the component to your project. Make sure you are installing within the Netflix package manager because this is a private Netflix repo.

```
npm i -SE abacus-material-filter-panel
```

Import the css file into your project.

```
import "abacus-material-filter-panel/lib/styles.css"
```

Set up your project to use [material-ui](http://www.material-ui.com/#/).
- Make sure you are only using 1 version of react. Run the following command to see if you have mupltiple versions installed:
    ```
    npm ls react
    ```

- If you are using [Abacus](https://github.com/Netflix/abacus-editor-app), you will also want to add the flag internalizeReact: true in the top level module.exports object in the [config.js](https://github.com/Netflix/abacus-editor-app/blob/master/config.js#L8) file.
Add the [theme provider](http://www.material-ui.com/#/get-started/usage). You can reference how we used themeing in Algodash:
    - [Theme file](https://stash.corp.netflix.com/projects/ALDA/repos/algodash/browse/client/js/theme/algodashTheme.js)
    - [Theme implementation](https://stash.corp.netflix.com/projects/ALDA/repos/algodash/browse/client/js/components/App.js#9-11,138,180)
    - Install [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin) and [add it to your project](http://www.material-ui.com/#/get-started/installation)
