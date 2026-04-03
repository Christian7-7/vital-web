import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const RESEND_KEY = process.env.RESEND_API_KEY;
// En producción, el remitente debe ser un dominio verificado en Resend (ej. "ventas@vitalpro.com")
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

const resend = new Resend(RESEND_KEY || 're_dummy');

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. Validación de Método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. This endpoint requires a POST request.' });
  }

  try {
    const { to, subject, body } = req.body;
    
    // 2. Validación de Entrada Estricta
    if (!to || typeof to !== 'string' || !to.includes('@')) {
      return res.status(400).json({ error: 'Missing or invalid "to" email address parameter' });
    }
    if (!subject || typeof subject !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "subject" parameter' });
    }
    if (!body || typeof body !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "body" parameter' });
    }

    // 3. Validación Estricta de Producción (Sin Mocks)
    if (!RESEND_KEY || !FROM_EMAIL) {
      console.error('Falta configuración crítica: RESEND_API_KEY o RESEND_FROM_EMAIL no están definidos en Vercel.');
      return res.status(500).json({ 
        error: 'El servicio de correos no está configurado correctamente en el servidor. Configura RESEND_API_KEY y RESEND_FROM_EMAIL en las variables de entorno de Vercel.' 
      });
    }

    // 4. Envío Real a Resend
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to], // Resend expects an array or string, array is safer for multiples
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000; text-transform: uppercase;">Notificación de Vital Pro</h2>
          <div style="color: #333; line-height: 1.6;">
            ${body}
          </div>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin-top: 30px; margin-bottom: 20px;" />
          <p style="color: #888; font-size: 12px; text-align: center;">
            Este es un correo automático generado por tu plataforma Vital Pro.
          </p>
        </div>
      `,
    });

    if (data.error) {
      console.error('Resend API returned an error:', data.error);
      return res.status(400).json({ error: data.error.message || 'Error from Resend provider' });
    }

    // 5. Respuesta Exitosa
    return res.status(200).json({ success: true, id: data.data?.id });

  } catch (error) {
    // 6. Manejo de Excepciones del Servidor (Caches de red, fallos Vercel Node, etc.)
    console.error('Unhandled Server Error in Email API:', error);
    return res.status(500).json({ error: 'Internal Server Error while processing mail request.' });
  }
}
