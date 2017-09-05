import { Component } from 'react';

class FacebookSDK extends Component {
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '127260141236030',
        xfbml: false,
        version: 'v2.10'
      });

      this.props.onReady();
    };

    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  render() {
    return null;
  }
}

export default FacebookSDK;
