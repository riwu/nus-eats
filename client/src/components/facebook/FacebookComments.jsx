import React, { Component } from 'react';

class FacebookComments extends Component {
  componentDidMount() {
    this.renderXFBML();
  }

  componentDidUpdate(prevProps) {
    if (
      (!this.props.loading && prevProps.loading) ||
      this.props.href !== prevProps.href ||
      this.props.commentsCount !== prevProps.commentsCount
    ) {
      this.renderXFBML();
    }
  }

  renderXFBML() {
    if (!this.container) {
      return;
    }

    const { href, commentsCount } = this.props;

    this.container.innerHTML = `<div class="fb-comments" data-href="${href}" data-numposts="${commentsCount}"></div>`;

    window.FB.XFBML.parse(this.container);
  }

  render() {
    if (this.props.loading) {
      return <div key="loading">Loading...</div>
    } else {
      return <div key="container" ref={(c) => this.container = c} />;
    }
  }
}

FacebookComments.defaultProps = {
  commentsCount: 5
};

export default FacebookComments;
