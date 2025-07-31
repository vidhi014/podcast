// authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'No authorization header provided',
        solution: 'Please include a valid Bearer token'
      });
    }

    // 2. Verify token format
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ 
        message: 'Malformed token',
        solution: 'Token should be in format: Bearer <token>'
      });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    req.user = {
      _id: decoded._id,

    };
    
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired',
        solution: 'Please log in again'
      });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token',
        solution: 'Please provide a valid token'
      });
    }

    res.status(401).json({ 
      message: 'Authentication failed',
      details: err.message 
    });
  }
};
export default authMiddleware;