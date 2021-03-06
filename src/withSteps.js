import React from "react";
import Model from "./model";

const withSteps = Component => {
  class StepsWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        model: this._getModelFromProps(props)
      };

      // Bindings
      [
        "setModel",
        "next",
        "advance",
        "previous",
        "back",
        "setCurrent",
        "jumpTo",
        "setStepState",
        "done",
        "skip",
        "invalidate"
      ].forEach(method => {
        this[method] = this[method].bind(this);
      });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        model: this._getModelFromProps(nextProps)
      });
    }

    _getModelFromProps(props) {
      let model;

      if (props.model instanceof Model) {
        model = props.model;
      } else {
        model = new Model(props.model);
      }

      return model;
    }

    render() {
      return (
        <Component
          {...this.props}
          model={this.state.model}
          setModel={this.setModel}
          next={this.next}
          advance={this.next}
          previous={this.previous}
          setCurrent={this.setCurrent}
          jumpTo={this.jump}
          jumpToFirst={this.jumpToFirst}
          jumpToLast={this.jumpToLast}
          back={this.previous}
          done={this.done}
          skip={this.skip}
          invalidate={this.invalidate}
        />
      );
    }

    setModel(model) {
      if (this.state.model !== model) {
        this.setState({
          model
        });
      }
    }

    next() {
      this.setModel(this.state.model.next());
    }

    advance() {
      this.next();
    }

    previous() {
      this.setModel(this.state.model.previous());
    }

    back() {
      this.previous();
    }

    setCurrent(stepIndex) {
      this.setModel(this.state.model.setCurrent(stepIndex));
    }

    jumpTo(stepIndex) {
      this.setCurrent(stepIndex);
    }

    jumpToFirst() {
      this.jumpTo(0);
    }

    jumpToLast() {
      this.jumpTo(this.satte.model.size - 1);
    }

    setStepState(stepIndex, state) {
      this.setModel(this.state.model.setStepState(stepIndex, state));
    }

    done(stepIndex) {
      this.setModel(this.state.model.done(stepIndex));
    }

    skip(stepIndex) {
      this.setModel(this.state.model.skip(stepIndex));
    }

    invalidate(stepIndex) {
      this.setModel(this.state.model.invalidate(stepIndex));
    }
  }

  return StepsWrapper;
};

export default withSteps;
