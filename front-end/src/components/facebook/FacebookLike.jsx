import React, { Component } from 'react';

class FacebookLike extends Component {
  componentDidMount() {
    this.renderXFBML();
  }

  componentDidUpdate(prevProps) {
    if (
      (!this.props.loading && prevProps.loading) ||
      this.props.href !== prevProps.href
    ) {
      this.renderXFBML();
    }
  }

  renderXFBML() {
    if (!this.container) {
      return;
    }

    const { href } = this.props;

    this.container.innerHTML = `
      <div
        class="fb-like"
        data-href="${href}"
        data-layout="button_count"
        data-action="like"
        data-size="small"
        data-show-faces="false"
        data-share="false"></div>
    `;

    window.FB.XFBML.parse(this.container);
  }

  render() {
    console.log('href', this.props.href);
    if (this.props.loading) {
      return null;
    }

    return <div ref={c => this.container = c} />;
  }
}

export default FacebookLike;
