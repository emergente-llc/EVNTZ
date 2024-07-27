import { Request, Response, NextFunction } from 'express';
import IPCIDR from 'ip-cidr';

const whitelist = [
  '127.0.0.1', // IPv4 localhost
  'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000/',
  'http://$(dfx canister id backend).localhost:8000'
];

export const ipWhitelistMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestIP = req.ip || req.socket.remoteAddress;

  if (!requestIP) {
    return res.status(400).json({ message: 'Unable to determine client IP' });
  }

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
