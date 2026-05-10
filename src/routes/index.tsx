import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Users, Wrench, TrendingUp, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InvestMax — Zarządzanie nieruchomościami w Bochni" },
      { name: "description", content: "Zarabiaj na nieruchomościach bez zaangażowania. Kompleksowa obsługa najmu od 2009 roku." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO – jasne tło */}
      <section className="bg-light relative overflow-hidden">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl animate-blob pointer-events-none" />
        <div className="absolute top-1/2 -left-40 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.7_0.12_27_/_0.12)] blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.22_27_/_0.08),_transparent_50%)] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8 shadow-soft animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              Zarządzanie nieruchomościami od 2009 roku
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] animate-fade-up delay-100">
              Administracja i zarządzanie<br />
              <span className="text-brand-red">nieruchomościami</span>
            </h1>
            <p className="mt-6 text-xl lg:text-2xl text-foreground/80 font-medium max-w-2xl animate-fade-up delay-200">
              Dochód pasywny bez wychodzenia z domu.
            </p>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed animate-fade-up delay-300">
              Od 2009 r. firma zajmuje się obsługą najmu mieszkań, lokali usługowych oraz domów.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-400">
              <Link
                to="/wycena"
                className="inline-flex items-center gap-2 rounded-md bg-brand-red px-7 py-3.5 text-base font-semibold text-white hover:opacity-90 hover:-translate-y-0.5 hover:shadow-elegant transition-all duration-300 shadow-soft"
              >
                Wycena zarządzania <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-7 py-3.5 text-base font-semibold text-foreground hover:bg-secondary hover:-translate-y-0.5 transition-all duration-300"
              >
                Kontakt
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl animate-fade-up delay-500">
              <div>
                <div className="text-3xl lg:text-4xl font-semibold text-foreground">15+</div>
                <div className="text-xs text-muted-foreground mt-1">lat doświadczenia</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-semibold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground mt-1">obsługi pod klucz</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-semibold text-foreground">10%</div>
                <div className="text-xs text-muted-foreground mt-1">prowizji od czynszu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CIEMNA sekcja */}
      <section className="bg-gradient-dark text-dark-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-4">
                Nasz proces
              </div>
              <h2 className="text-3xl lg:text-5xl font-semibold leading-tight">
                Kompleksowa obsługa najmu mieszkań, lokali usługowych i domów
              </h2>
              <p className="mt-6 text-dark-muted text-lg leading-relaxed">
                Od 2009 roku zajmujemy się obsługą najmu w Bochni i okolicach. Bierzemy na siebie cały proces — od pierwszego kontaktu z najemcą, przez bieżące rozliczenia, aż po zapewnienie ciągłości dochodu właścicielowi.
              </p>
              <Link
                to="/oferta"
                className="mt-8 inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all"
              >
                Dowiedz się więcej <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Building2, title: "Przygotowanie nieruchomości", desc: "Przygotowanie lokalu, dokumentacja i wycena pod wynajem." },
                { icon: Users, title: "Weryfikacja najemcy", desc: "Selekcja i sprawdzenie wiarygodności kandydatów." },
                { icon: Wrench, title: "Obsługa najmu", desc: "Naprawy, przeglądy i bieżący kontakt z najemcą." },
                { icon: TrendingUp, title: "Ciągłość dochodu", desc: "Rozliczenia, windykacja i pełna dokumentacja." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-brand-red/15 text-brand-red mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-base">{title}</h3>
                  <p className="mt-2 text-sm text-dark-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA jasna */}
      <section className="bg-light relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-[oklch(0.7_0.05_260_/_0.25)] blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "5s" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">
                Dlaczego właściciele wybierają InvestMax?
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Pełna obsługa od A do Z bez zaangażowania właściciela",
                  "Sprawdzeni najemcy i transparentne rozliczenia",
                  "Reagowanie na awarie 7 dni w tygodniu",
                  "Doświadczenie poparte ponad 15 latami praktyki",
                ].map((t, i) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-foreground animate-fade-up"
                    style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                  >
                    <CheckCircle2 className="text-brand-red mt-0.5 flex-shrink-0" size={20} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative bg-white rounded-2xl border border-border shadow-elegant p-8 lg:p-10 animate-fade-up delay-200 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_oklch(0.55_0.22_27_/_0.25)] transition-all duration-500">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
              <h3 className="text-2xl font-semibold">Chcesz wiedzieć ile zarobisz?</h3>
              <p className="mt-3 text-muted-foreground">
                Wypełnij krótki formularz, a my przygotujemy bezpłatną wycenę zarządzania Twoją nieruchomością.
              </p>
              <Link
                to="/wycena"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-6 py-3 text-base font-semibold text-white hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300"
              >
                Przejdź do wyceny <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
