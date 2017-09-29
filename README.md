# subscribeTo

The subscribeTo React HoC wraps a component and listen for changes on a subscribable prop. When the subscription fires, the HoC forces a new render of the wrapped component. Designed to work with [samsch/subscribe-store](https://github.com/samsch/subscribe-store).

## Installation
Install into your project with `npm i @samsch/subscribe-to` (for Node.js), or `npm i -D @samsch/subscribe-to` (for Webpack/Browserify or other bundled projects).

## Use

The `@samsch/subscribe-to` module has a single default export, which is the `subscribeTo` function.

To use subscribeTo, you pass it a function for retrieving a subscribable from props, returning a function, and then pass the component you want to wrap, returning a new component. 

- `subscribeTo: <(props => store)> => <Component: react-component> => Component: react-component`

subscribeTo expects that the subscribable has two methods: `store.subscribe(<listener: Function>)` and `store.unsubscribe(<listener: Function>)`. Anytime the `listener` function which subscribeTo passes is called by the store, the component will re-render.

The stores created by [samsch/subscribe-store](https://github.com/samsch/subscribe-store) follow this pattern correctly, and the source of the project can be used as an example of a valid store implementation.

### Basic example
```jsx
// createStore from '@samsch/susbcribe-store'
const store = createStore({ data: 0 });

const SomeComponent = props => (
  <span>Data: {props.store.state.data}</span>
);

const SubscribedComponent =
  subscribeTo(props => props.store)(SomeComponent);

ReactDOM.render(<SubscribedComponent store={store} />, rootElement);
```

## ES support
This library is compiled with Babel to support IE11 and last 2 Chrome, Edge, Firefox, and Safari. Publically, it expects ES6 methods/objects to exist (natively or polyfilled). Realistically, you could test it and find that it might work in a pure ES5 environment.

If a case is found which doesn't work in pure ES5 environments, and it doesn't require drastic changes or much uglier code, I'll pull those changes in.

## Getting help
You can frequently find me (samsch) hanging out in ##javascript, #Node.js, and #reactjs on Freenode, especially during US working hours. This is a small library, so it's likely someone else could help you as well if you point them at the source file and your code.

## Contributing
Code is formatted to the local prettier/eslint config.

Run tests once with `npm test`, or continuously with `npm test -- --watch`.

The projects builds with `npm run build`, which is also called on pre-publish.
