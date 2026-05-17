import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'InvestMax'

interface QuoteRequestProps {
  name?: string
  phone?: string
  email?: string
  type?: string
  address?: string
  rooms?: string
  area?: string
  message?: string
}

const QuoteRequestEmail = ({
  name = '-',
  phone = '-',
  email = '-',
  type = '-',
  address = '-',
  rooms = '-',
  area = '-',
  message = '-',
}: QuoteRequestProps) => (
  <Html lang="pl" dir="ltr">
    <Head />
    <Preview>Nowe zapytanie o wycenę od {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nowe zapytanie o wycenę</Heading>
        <Text style={text}>
          Z formularza na stronie {SITE_NAME} wpłynęło nowe zapytanie:
        </Text>

        <Section style={card}>
          <Row label="Imię i nazwisko" value={name} />
          <Row label="Telefon" value={phone} />
          <Row label="Email" value={email} />
          <Row label="Typ nieruchomości" value={type} />
          <Row label="Adres" value={address} />
          <Row label="Liczba pokoi" value={rooms} />
          <Row label="Metraż (m²)" value={area} />
        </Section>

        <Hr style={hr} />
        <Text style={label}>Dodatkowe informacje</Text>
        <Text style={messageText}>{message}</Text>

        <Hr style={hr} />
        <Text style={footer}>
          Wiadomość wygenerowana automatycznie ze strony {SITE_NAME}.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label: l, value }: { label: string; value: string }) => (
  <Text style={rowText}>
    <strong style={rowLabel}>{l}:</strong> {value || '-'}
  </Text>
)

export const template = {
  component: QuoteRequestEmail,
  subject: (data: Record<string, any>) =>
    `Nowe zapytanie o wycenę — ${data?.name || 'InvestMax'}`,
  displayName: 'Zapytanie o wycenę',
  to: 'biuro@invest-max.pl',
  previewData: {
    name: 'Jan Kowalski',
    phone: '600 000 000',
    email: 'jan@example.com',
    type: 'Mieszkanie',
    address: 'ul. Trudna 2, Bochnia',
    rooms: '2',
    area: '48',
    message: 'Proszę o kontakt w sprawie zarządzania mieszkaniem.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#111111', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444444', lineHeight: '1.5', margin: '0 0 20px' }
const card = { backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '16px 20px' }
const rowText = { fontSize: '14px', color: '#222222', margin: '6px 0', lineHeight: '1.5' }
const rowLabel = { color: '#666666', fontWeight: 600 as const, marginRight: '6px' }
const label = { fontSize: '12px', color: '#888888', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '12px 0 4px' }
const messageText = { fontSize: '14px', color: '#222222', whiteSpace: 'pre-wrap' as const, lineHeight: '1.5', margin: '0 0 16px' }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '20px 0 0' }
