import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Content extends Component {
  render() {
    return (
      <ReactMarkdown source={this.props.input} />
    )
  }
}

Content.propTypes = {
  input: React.PropTypes.string.isRequired,
};

export default Content
