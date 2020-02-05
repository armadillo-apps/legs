const helmet = require("helmet");
const frameguard = require("frameguard");

const configureSecurityMiddleware = app => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        formAction: ["'none'"]
      }
    })
  );
  // Strict-Transport-Security header
  const aYearInSeconds = 365 * 24 * 60 * 60;
  app.use(
    helmet.hsts({
      maxAge: aYearInSeconds,
      includeSubDomains: true,
      preload: true
    })
  );
  // Referrer-Policy header
  app.use(helmet.referrerPolicy());
  // X-Content-Type-Options header
  app.use(helmet.noSniff());
  // X-Download-Options header
  app.use(helmet.ieNoOpen());
  // X-Frame-Options header
  app.use(frameguard({ action: "deny" }));
  // X-XSS-Protection header
  app.use(helmet.xssFilter());

  // removes Server header
  app.use(helmet.hidePoweredBy());

  // removes X-Powered-By header
  app.disable("x-powered-by");

  // helmet headers must be set before redirection happens
  //   app.use(sslRedirect());
};

module.exports = configureSecurityMiddleware;
