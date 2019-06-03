/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home custom">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="200 "
                height="77"
              />
            )}
          </a>
          <div>
            <h5>Docs:</h5>
            <a
              href={`
                ${this.props.config.baseUrl}docs/quickstart`}
            >
              Quick start
            </a>
            <a
              href={`
                ${this.props.config.baseUrl}docs/configuration`}
            >
              Configuration
            </a>
            <a
              href={`
                ${this.props.config.baseUrl}docs/extending`}
            >
              Extending
            </a>
          </div>
          <div>
            <h5>Features:</h5>
            <a
              href={`
                ${this.props.config.baseUrl}docs/cross-browser`}
            >
              Cross-browser testing
            </a>
            <a
              href={`
                ${this.props.config.baseUrl}docs/parallel-testing`}
            >
              Parallel testing
            </a>
            <a
              href={`
                ${this.props.config.baseUrl}docs/performance-testing`}
            >
              Performance testing
            </a>
            <a
              href={`
                ${this.props.config.baseUrl}docs/docker`}
            >
              Docker
            </a>
          </div>
          <div>
            <h5>Support:</h5>
            <div className="footer-row">
              <a href="https://github.com/TheSoftwareHouse/Kakunin">GitHub</a>
              <a href="https://kakunin.io">Contact us</a>
            </div>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
