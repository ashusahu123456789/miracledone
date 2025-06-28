import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="index.html" className="logo d-flex align-items-center" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <span className="sitename" style={{ display: 'block', width: '100%' }}>Miracle Infosoft</span>
            </a>
            <div className="footer-contact pt-3" style={{ textAlign: 'center', margin: '0 auto' }}>
              <p>Plot No.80, 3rd Floor, Aakriti Complex, Zone-II, M.P. Nagar</p>
              <p>Bhopal - 462011</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+91-7880003161</span></p>
              <p><strong>Email:</strong> <span>info@miracleinfoserv.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#!"><i className="bi bi-twitter-x" /></a>
              <a href="https://www.facebook.com/MiracleInfoserv/" target='blank'><i className="bi bi-facebook" /></a>
              <a href="https://www.instagram.com/miracleinfoservofficial/#" target='blank'><i className="bi bi-instagram" /></a>
              <a href="https://in.linkedin.com/company/miracle-infotech-services-pvt-ltd" target='blank'><i className="bi bi-linkedin" /></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 footer-links">
            <h4 className="text-center">Useful Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#features">Services</a></li>
              <li><a href="#!">Terms of service</a></li>
              <li><a href="#!">Privacy policy</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 footer-links">
            <h4 className="text-center">Our Subsudries</h4>
            <ul>
              <li><a className="" href="https://miracleinfoserv.com " target='blank'>Miracle Infoserv</a></li>
              <li><a aria-current="page" href="https://www.miracleinfosoft.com/" target='blank'>Miracle Infosoft</a></li>
              <li><a className="" href="https://miracleitindia.com" target='blank'>Miracle IT Career</a></li>
              <li><a aria-current="page" className="active" href="https://miraclefoundationindia.in/" target='blank'>Miracle IT Foundation (CSR)</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <form action="forms/newsletter.php" method="post" className="php-email-form">
              <div className="newsletter-form"><input type="email" name="email" /><input type="submit" defaultValue="Subscribe" /></div>
              <div className="loading">Loading</div>
              <div className="error-message" />
              <div className="sent-message">Your subscription request has been sent. Thank you!</div>
            </form>
          </div>
        </div>
      </div>
      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">Miracle Infoserv</strong> <span>All Rights Reserved</span></p>
      </div>
    </footer>
  );
};

export default Footer;
