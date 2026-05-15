import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — InvestMax | Bochnia" },
      { name: "description", content: "Skontaktuj się z InvestMax: ul. Trudna 2, Bochnia, tel. 792 790 263, biuro@invest-max.pl." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-4">Kontakt</div>
          <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">Porozmawiajmy</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Najszybciej skontaktujesz się z nami telefonicznie lub mailowo. Odpowiadamy zwykle tego samego dnia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="tel:792790263"
            className="group rounded-2xl border border-border bg-white p-8 hover:shadow-elegant transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-brand-red/10 text-brand-red mb-5">
              <Phone size={22} />
            </div>
            <div className="text-sm font-medium text-muted-foreground">Telefon</div>
            <div className="mt-1 text-2xl font-semibold group-hover:text-brand-red transition-colors">792 790 263</div>
          </a>

          <a
            href="mailto:biuro@invest-max.pl"
            className="group rounded-2xl border border-border bg-white p-8 hover:shadow-elegant transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-brand-red/10 text-brand-red mb-5">
              <Mail size={22} />
            </div>
            <div className="text-sm font-medium text-muted-foreground">Email</div>
            <div className="mt-1 text-2xl font-semibold group-hover:text-brand-red transition-colors break-all">biuro@invest-max.pl</div>
          </a>

          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-brand-red/10 text-brand-red mb-5">
              <MapPin size={22} />
            </div>
            <div className="text-sm font-medium text-muted-foreground">Adres</div>
            <div className="mt-1 text-xl font-semibold">InvestMax</div>
            <div className="text-muted-foreground">ul. Trudna 2, Bochnia</div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-brand-red/10 text-brand-red mb-5">
              <Clock size={22} />
            </div>
            <div className="text-sm font-medium text-muted-foreground">Godziny kontaktu</div>
            <div className="mt-1 text-xl font-semibold">Pon — Pt: 9:00 — 18:00</div>
            <div className="text-muted-foreground">Sob: po wcześniejszym ustaleniu</div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl overflow-hidden border border-border shadow-elegant">
          <iframe
            title="Mapa — InvestMax"
            src="https://www.openstreetmap.org/export/embed.html?bbox=20.4225%2C49.9660%2C20.4425%2C49.9760&layer=mapnik&marker=49.9710%2C20.4325"
            className="w-full h-80 border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
