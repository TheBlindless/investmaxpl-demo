import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(255),
  type: z.string().trim().min(1).max(50),
  address: z.string().trim().max(200).optional().default(''),
  rooms: z.string().trim().max(20).optional().default(''),
  area: z.string().trim().max(20).optional().default(''),
  message: z.string().trim().max(1000).optional().default(''),
})

export const Route = createFileRoute('/api/public/contact-quote')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown
        try {
          payload = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = schema.safeParse(payload)
        if (!parsed.success) {
          return Response.json(
            { error: 'Validation failed', issues: parsed.error.flatten() },
            { status: 400 },
          )
        }

        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!serviceKey) {
          console.error('SUPABASE_SERVICE_ROLE_KEY missing')
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        // Build absolute URL to internal send route from incoming request
        const origin = new URL(request.url).origin
        const sendUrl = `${origin}/lovable/email/transactional/send`

        const idempotencyKey = `quote-${crypto.randomUUID()}`

        const res = await fetch(sendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({
            templateName: 'quote-request',
            recipientEmail: 'biuro@invest-max.pl',
            idempotencyKey,
            templateData: parsed.data,
          }),
        })

        if (!res.ok) {
          const errText = await res.text().catch(() => '')
          console.error('Internal send route failed', { status: res.status, errText })
          return Response.json(
            { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
            { status: 502 },
          )
        }

        return Response.json({ success: true })
      },
    },
  },
})
