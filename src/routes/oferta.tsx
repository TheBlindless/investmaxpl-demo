import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, FileText, Phone, Wrench, ClipboardList, ShieldAlert, RefreshCw, FolderCheck, ArrowRight } from "lucide-react";
import interiorKitchen from "@/assets/interior-kitchen.jpg";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Oferta — InvestMax | Zarządzanie najmem" },
      { name: "description", content: "Zakres usług InvestMax: rozliczenia, kontakt z najemcą, naprawy, przeglądy, windykacja, dokumentacja. Od 10% czynszu." },
    ],
  }),
  component: OfferPage,
});

const services = [
  { icon: Calculator, title: "Rozliczenia", desc: "Pełne rozliczenia z najemcami, mediami i administracją." },
  { icon: Phone, title: "Kontakt z najemcą", desc: "Bieżąca komunikacja, reagowanie na zgłoszenia." },
  { icon: Wrench, title: "Naprawy", desc: "Organizacja i nadzór nad pracami serwisowymi." },
  { icon: ClipboardList, title: "Przeglądy", desc: "Regularne kontrole stanu lokalu." },
  { icon: ShieldAlert, title: "Windykacja", desc: "Odzyskiwanie należności i działania prawne." },
  { icon: FolderCheck, title: "Dokumentacja", desc: "Prowadzenie pełnej dokumentacji najmu." },
  { icon: RefreshCw, title: "Zarządzanie rotacją", desc: "Wymiana najemców bez przestojów." },
  { icon: FileText, title: "Umowy", desc: "Profesjonalne umowy chroniące właściciela." },
];

function OfferPage() {
  return (
    <>
      <section className="bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-4">Oferta</div>
              <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">
                Pełna obsługa Twojej nieruchomości
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Bierzemy na siebie wszystko, co wiąże się z najmem — od formalności po techniczną obsługę lokalu.
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border shadow-elegant aspect-[4/3]">
                <img
                  src={interiorKitchen}
                  alt="Nowoczesne wnętrze pod zarządem InvestMax"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing – ciemna */}
      <section className="bg-gradient-dark text-dark-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-5xl font-semibold">Cennik</h2>
            <p className="mt-4 text-dark-muted">Przejrzyste i uczciwe stawki — bez ukrytych kosztów.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition">
              <div className="text-sm font-semibold text-brand-red uppercase tracking-wider">Najem standardowy</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-semibold">10%</span>
                <span className="text-dark-muted">czynszu</span>
              </div>
              <p className="mt-4 text-sm text-dark-muted">Mieszkania i domy wynajmowane w całości.</p>
            </div>

            <div className="rounded-2xl border border-brand-red bg-brand-red/10 p-8 relative">
              <span className="absolute -top-3 left-8 bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">Najczęściej wybierane</span>
              <div className="text-sm font-semibold text-brand-red uppercase tracking-wider">Wynajem na pokoje</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-semibold">15%</span>
                <span className="text-dark-muted">czynszu</span>
              </div>
              <p className="mt-4 text-sm text-dark-muted">Większe zaangażowanie — większy zysk dla właściciela.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition">
              <div className="text-sm font-semibold text-brand-red uppercase tracking-wider">Opłata przygotowawcza</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-semibold">1×</span>
                <span className="text-dark-muted">czynsz</span>
              </div>
              <p className="mt-4 text-sm text-dark-muted">Jednorazowa opłata przy uruchomieniu współpracy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zakres – jasna */}
      <section className="bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-3">Zakres</div>
            <h2 className="text-3xl lg:text-5xl font-semibold">Co dokładnie robimy</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-white p-6 hover:shadow-elegant transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-brand-red/10 text-brand-red mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/wycena"
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-7 py-3.5 text-base font-semibold text-white hover:opacity-90 transition"
            >
              Otrzymaj bezpłatną wycenę <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
