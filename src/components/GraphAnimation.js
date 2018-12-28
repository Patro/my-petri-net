import { PureComponent } from 'react';
import CytoscapeContext from '../contexts/CytoscapeContext';

class GraphAnimation extends PureComponent {
  static contextType = CytoscapeContext;

  async play() {
    const element = this.context.elements(`#${this.props.elementId}`).first();
    this.animation = new this.props.animation(element);

    await this.animation.play();
    if (this.props.onEnd !== undefined) {
      this.props.onEnd();
    }
  }

  cancel() {
    this.animation.cancel();
  }

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.cancel();
  }

  render() {
    return null;
  }
}

export default GraphAnimation;
