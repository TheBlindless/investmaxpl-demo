import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const OFFICE_EMAIL = 'biuro@invest-max.pl'
const RESEND_API_URL = 'https://api.resend.com/emails'

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

type QuotePayload = z.infer<typeof schema>

function redactEmail(email: string): string {
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart.slice(0, 1)}***@${domain}`
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildEmailContent(data: QuotePayload) {
  const fields = [
    ['Imię i nazwisko', data.name],
    ['Telefon', data.phone],
    ['Email', data.email],
    ['Typ nieruchomości', data.type],
    ['Adres nieruchomości', data.address || '—'],
    ['Liczba pokoi', data.rooms || '—'],
    ['Metraż', data.area ? `${data.area} m²` : '—'],
    ['Dodatkowe informacje', data.message || '—'],
  ]

  const htmlRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;width:220px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('')

  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n')

  return {
    subject: `Nowe zapytanie o wycenę — ${data.name}`,
    text: `Nowe zapytanie o wycenę:\n\n${text}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f9;padding:24px;color:#111827;">
        <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
          <div style="padding:24px 28px;background:#111827;color:#ffffff;">
            <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.7;">InvestMax</div>
            <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">Nowe zapytanie o wycenę</h1>
          </div>
          <div style="padding:28px;">
            <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">Formularz został wysłany ze strony internetowej. Poniżej znajdziesz komplet danych kontaktowych i szczegóły nieruchomości.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">${htmlRows}</table>
          </div>
        </div>
      </div>`,
  }
}

async function sendViaResend(data: QuotePayload) {
  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  if (!resendApiKey) {
    return { ok: false as const, reason: 'missing_resend_key' }
  }

  const content = buildEmailContent(data)
  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'InvestMax <formularz@invest-max.pl>',
      to: [OFFICE_EMAIL],
      reply_to: data.email,
      subject: content.subject,
      html: content.html,
      text: content.text,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('Resend email send failed', {
      status: response.status,
      recipient_redacted: redactEmail(OFFICE_EMAIL),
      reply_to_redacted: redactEmail(data.email),
      error: errorText.slice(0, 1000),
    })
    return { ok: false as const, reason: 'resend_failed', status: response.status }
  }

  const result = await response.json().catch(() => null)
  if (!result?.id) {
    console.error('Resend email send returned no id', {
      recipient_redacted: redactEmail(OFFICE_EMAIL),
      reply_to_redacted: redactEmail(data.email),
      result,
    })
    return { ok: false as const, reason: 'resend_invalid_response' }
  }

  return { ok: true as const, provider: 'resend', id: result.id }
}

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

        const resendResult = await sendViaResend(parsed.data)
        if (resendResult.ok) {
          return Response.json({ success: true, provider: resendResult.provider })
        }

        console.error('Contact quote delivery unavailable', {
          resend_reason: resendResult.reason,
          reply_to_redacted: redactEmail(parsed.data.email),
        })

        return Response.json(
          { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
          { status: 502 },
        )
      },
    },
  },
})
