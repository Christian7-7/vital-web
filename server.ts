import express from 'express';
import cors from 'cors';
import productsHandler from './api/products.js';
import emailsSendHandler from './api/emails/send.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mocking Vercel Request/Response for our handlers
const wrapHandler = (handler: (req: VercelRequest, res: VercelResponse) => Promise<unknown> | void) => {
  return async (req: express.Request, res: express.Response) => {
    // Basic mock of Vercel Request/Response mapping to Express Request/Response
    try {
      await handler(req as unknown as VercelRequest, res as unknown as VercelResponse);
    } catch (error) {
       console.error(error);
       if (!res.headersSent) {
         res.status(500).json({ error: 'Internal Server Error wrapper' });
       }
    }
  };
};

app.get('/api/products', wrapHandler(productsHandler));
app.post('/api/emails/send', wrapHandler(emailsSendHandler));

app.listen(port, () => {
  console.log(`Local API server running at http://localhost:${port}`);
});
