This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stacks

1. Redux for state management
2. Redux Saga for middleware
3. Redux persist
4. TypeScript
5. Poke API. Due to the `Fair Use Policy` of the poke API, I had to save the API responses locally using browser local storage
6. Custom components - `Image Carousel Slider` and `TreeView` on the `pokemon-card` component.
7. Dark Mode support - These days, more and more webapps and websites support dark mode, so I decided to implement the dark mode.

## Structure

Following feature driven development, added 3 different features - `Pokemon`, `History` and `Settings`
Each feature has its own redux folder underneath.

1. `Pokemon` is the main feature(page)
2. `History` saves the search history
3. `Settings` handles dark/light mode switch

## Future Considerations

1. Mobile support - Right now, only supports Desktop/Tablet views.
2. Toast notifications - I only added loading spinner, but need to add toast notifications. I can build it as well, but we can use awesome 3rd party npm packages.
3. Search improvement - Right now, the search feature only works if the entered name/ID is existing. Probably, we need to build a backend server(or database) to save the Poke API responses rather than in the local storage and then support pagination and filtering feature(wildcard filtering by name, type, abilities, etc)
4. TreeView improvement.
   To show the evolution details, I built a tree view component with proper margins to show the inheritance. This can be updated or we can use other libraries as well.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
