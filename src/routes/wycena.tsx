import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/wycena")({
  head: () => ({
    meta: [
      { title: "Wycena — InvestMax | Bezpłatna wycena zarządzania" },
      { name: "description", content: "Bezpłatna wycena zarządzania Twoją nieruchomością. Wypełnij formularz, oddzwonimy." },
    ],
  }),
  component: QuotePage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(100),
  phone: z.string().trim().min(7, "Podaj numer telefonu").max(20),
  email: z.string().trim().email("Nieprawidłowy adres email").max(255),
  type: z.string().min(1, "Wybierz typ nieruchomości"),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  rooms: z.string().max(20).optional().or(z.literal("")),
  area: z.string().max(20).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

function QuotePage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch("/api/public/contact-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res.data),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || "Nie udało się wysłać formularza.");
      }
      setSent(true);
      formRef.current?.reset();
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-light min-h-[80vh]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-4">Wycena</div>
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">Bezpłatna wycena zarządzania</h1>
          <p className="mt-4 text-muted-foreground">
            Wypełnij krótki formularz — odezwiemy się z indywidualną propozycją w ciągu 24 godzin.
          </p>
        </div>

        {sent && (
          <div
            ref={successRef}
            role="status"
            aria-live="polite"
            className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5 flex items-start gap-3"
          >
            <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={22} />
            <div>
              <p className="font-semibold text-green-900">Dziękujemy! Formularz został wysłany.</p>
              <p className="text-sm text-green-800 mt-1">
                Twoje zapytanie trafiło do nas na <strong>biuro@invest-max.pl</strong>. Skontaktujemy się w ciągu 24 godzin.
              </p>
            </div>
          </div>
        )}

        {serverError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {serverError}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-border shadow-elegant p-8 lg:p-10 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Imię i nazwisko *" name="name" error={errors.name} />
            <Field label="Telefon *" name="phone" type="tel" error={errors.phone} />
          </div>
          <Field label="Email *" name="email" type="email" error={errors.email} />

          <div>
            <label className="block text-sm font-medium mb-2">Typ nieruchomości *</label>
            <select name="type" className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/40">
              <option value="">— wybierz —</option>
              <option>Mieszkanie</option>
              <option>Dom</option>
              <option>Lokal usługowy</option>
              <option>Wynajem na pokoje</option>
            </select>
            {errors.type && <p className="mt-1 text-xs text-brand-red">{errors.type}</p>}
          </div>

          <Field label="Adres nieruchomości" name="address" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Liczba pokoi" name="rooms" />
            <Field label="Metraż (m²)" name="area" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Dodatkowe informacje</label>
            <textarea
              name="message"
              rows={5}
              maxLength={1000}
              className="w-full rounded-md border border-input bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/40"
              placeholder="Stan lokalu, oczekiwania, dodatkowe pytania..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-brand-red px-6 py-3.5 text-base font-semibold text-white hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "wysyłanie..." : "Wyślij zapytanie"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Wysyłając formularz wyrażasz zgodę na kontakt w sprawie wyceny.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", error,
}: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        maxLength={255}
        className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/40"
      />
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
    </div>
  );
}
