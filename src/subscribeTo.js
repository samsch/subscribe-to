import React from 'react';

const subscribeTo = getSubscribable => Component => {
  class SubscribedTo extends React.Component {
    constructor(props) {
      super(props);
      this.onModelUpdate = () => {
        this.forceUpdate();
      };
    }
    componentDidMount() {
      this.subscribables = [].concat(getSubscribable(this.props));
      this.subscribables.forEach(subscribable => {
        subscribable.subscribe(this.onModelUpdate);
      });
    }
    componentWillUnmount() {
      this.subscribables.forEach(subscribable => {
        subscribable.unsubscribe(this.onModelUpdate);
      });
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  return SubscribedTo;
};

export default subscribeTo;
