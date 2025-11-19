import 'dotenv/config';
import app from './app';
import { config } from './config/env';

const PORT = config.PORT;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}/api`);
});

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});
