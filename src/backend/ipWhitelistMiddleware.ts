import { Request, Response, NextFunction } from 'express';

const IPCIDR = require('ip-cidr');

const whitelist = [
  //'123.456.789.000', // Single IP address
  //'123.456.789.0/24', // CIDR block
  //'::1', // IPv6 localhost
  '127.0.0.1', // IPv4 localhost
];

const ipWhitelistMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestIP = req.ip;

  const isWhitelisted = whitelist.some((range) => {
    if (range.includes('/')) {
      // CIDR range
      const cidr = new IPCIDR(range);
      return cidr.contains(requestIP);
    } else {
      // Single IP address
      return requestIP === range;
    }
  });

  if (isWhitelisted) {
    return next(); // IP is in the whitelist, proceed to the next middleware or route handler
  }

  // IP is not in the whitelist, return a 403 Forbidden response
  res.status(403).json({ message: 'Forbidden: Your IP address is not allowed to access this resource' });
};

module.exports = ipWhitelistMiddleware;
