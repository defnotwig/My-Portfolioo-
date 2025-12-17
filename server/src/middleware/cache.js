// Cache middleware for static API responses
export const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Set Cache-Control headers
    res.set('Cache-Control', `public, max-age=${duration}`);
    
    next();
  };
};

// Aggressive caching for rarely-changing content
export const longCache = cacheMiddleware(3600); // 1 hour

// Moderate caching for dynamic content
export const mediumCache = cacheMiddleware(300); // 5 minutes

// Short caching for frequently-changing content
export const shortCache = cacheMiddleware(60); // 1 minute
