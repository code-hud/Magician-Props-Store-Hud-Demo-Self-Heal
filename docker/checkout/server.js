const express = require('express');
const app = express();

app.use(express.json());

// Rate limiting: 1 request per 30 seconds per session
const sessionLimits = new Map();

const checkRateLimit = (req, res, next) => {
  const sessionId = req.body.sessionId || req.query.sessionId;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  const now = Date.now();
  const lastRequestTime = sessionLimits.get(sessionId) || 0;
  const timeSinceLastRequest = now - lastRequestTime;
  const throttleWindowMs = 30 * 1000; // 30 seconds

  if (timeSinceLastRequest < throttleWindowMs) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Only 1 request allowed per ${throttleWindowMs / 1000} seconds per session.`,
      retryAfter: Math.ceil((throttleWindowMs - timeSinceLastRequest) / 1000),
    });
  }

  sessionLimits.set(sessionId, now);
  next();
};

// Checkout endpoint
app.post('/checkout', checkRateLimit, (req, res) => {
  const { sessionId, totalAmount, items } = req.body;

  // Simulate processing
  res.json({
    success: true,
    transactionId: `TXN-${sessionId}-${Date.now()}`,
    amount: totalAmount,
    itemsCount: items ? items.length : 0,
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'checkout' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Checkout service running on port ${PORT}`);
});
