import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    const subject = encodeURIComponent("Wycena — InvestMax");
    const body = encodeURIComponent(
      `Imię i nazwisko: ${res.data.name}\nTelefon: ${res.data.phone}\nEmail: ${res.data.email}\nTyp nieruchomości: ${res.data.type}\nAdres: ${res.data.address || "-"}\nLiczba pokoi: ${res.data.rooms || "-"}\nMetraż: ${res.data.area || "-"}\n\nDodatkowe informacje:\n${res.data.message || "-"}`
    );
    window.location.href = `mailto:biuro@invest-max.pl?subject=${subject}&body=${body}`;
    setSent(true);
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
          <div className="mb-8 rounded-xl border border-brand-red/30 bg-brand-red/5 p-5 flex items-start gap-3">
            <CheckCircle2 className="text-brand-red mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-foreground">Dziękujemy!</p>
              <p className="text-sm text-muted-foreground">Otworzyliśmy Twój klient pocztowy. Skontaktujemy się wkrótce.</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-border shadow-elegant p-8 lg:p-10 space-y-6">
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
            className="w-full rounded-md bg-brand-red px-6 py-3.5 text-base font-semibold text-white hover:opacity-90 transition"
          >
            Wyślij zapytanie
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
