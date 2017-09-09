import React from 'react';
import NavigationBar from '../main/NavigationBarContainer';
import Footer from '../main/Footer';
import './About.css';

const TermsOfService = () => (
  <div className="About">
    <NavigationBar />
    <div className="content">
      <h1>About</h1>
      <h2>What is NUS Eats</h2>
      <p>NUS Eats is a mobile friendly app that allows you to create meal meetings and broadcast them to your Facebook friends. Your friends will then be able to join the meeting through the app.</p>
      <p>Real-time information on canteens around NUS are also provided, including distance from your location and crowdedness of the canteen (estimated from on-site CCTV snapshots).</p>
      <p>You are also able to upload photos of the stalls and dishes, as well as giving ratings and reviews on the stalls through Facebook comments.</p>
      <h2>Background</h2>
      <p>
        {'This app is created by '}
        {Object.entries({
          Riwu: 'https://github.com/riwu',
          Charlton: 'https://github.com/cadmusthefounder',
          Yihang: 'https://github.com/yihangho',
          Jovin: 'https://github.com/liewyyjovin',
        }).map(([name, url], index) => (
          <span key={name}>
            <a target="_blank" rel="noreferrer noopener" href={url}>{name}</a>
            {index === 3 ? '' : ', '}
          </span>
        ))}
        {' between 18 Aug 2017 to 8 Aug 2017 for '}
        <a target="_blank" rel="noreferrer noopener" href="http://www.cs3216.com/coursework/facebook/">CS3216 assignment 1</a>
        .
      </p>
    </div>
    <Footer />
  </div>
);

export default TermsOfService;
