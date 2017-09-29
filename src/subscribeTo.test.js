/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import subscribeTo from './subscribeTo';

describe('subscribeTo', () => {
  test('subscribes component to updates from given store', () => {
    const jf = jest.fn();
    const Component = props => {
      jf(props.store.data);
      return <span>Data: {props.store.data}</span>;
    };

    const SubscribedComponent = subscribeTo(props => props.store)(Component);

    const store = (() => {
      let listener;
      const store = {
        data: 0,
      };
      store.subscribe = callback => {
        listener = callback;
      };
      store.unsubscribe = () => {
        listener = null;
      };
      store.update = () => {
        store.data++;
        listener();
      };
      return store;
    })();

    const component = renderer.create(<SubscribedComponent store={store} />);
    expect(component.toJSON()).toMatchSnapshot();
    expect(jf).toHaveBeenCalledWith(0);
    store.update();
    expect(component.toJSON()).toMatchSnapshot();
    expect(jf).toHaveBeenCalledWith(1);
  });
});
