import { createFileRoute } from "@tanstack/react-router";
import { Award, Calendar, MapPin } from "lucide-react";
import signature from "@/assets/signature.png";
import bochnia from "@/assets/bochnia-city.jpg";
import interiorLiving from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nas — InvestMax | mgr inż. Joanna Przetakiewicz" },
      { name: "description", content: "InvestMax to firma działająca od 2009 roku, prowadzona przez mgr inż. Joannę Przetakiewicz. Kompleksowe zarządzanie nieruchomościami." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0">
          <img src={bochnia} alt="Bochnia" className="h-full w-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-light via-light/85 to-transparent" />
        </div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[oklch(0.7_0.08_250_/_0.2)] blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-red mb-6 shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              O nas
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-foreground leading-tight">
              Doświadczenie, które buduje zaufanie
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              InvestMax działa od 2009 roku i zajmuje się kompleksowym zarządzaniem nieruchomościami — mieszkaniami, lokalami usługowymi oraz domami w Bochni i okolicach.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft relative overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-red/10 blur-3xl animate-blob pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.7_0.08_250_/_0.18)] blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "5s" }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-[4/5] w-full rounded-2xl border border-border shadow-elegant overflow-hidden relative">
                <img
                  src={interiorLiving}
                  alt="Wnętrze nieruchomości pod opieką InvestMax"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-white/80">InvestMax</div>
                  <div className="text-lg font-semibold mt-1">Zarządzane przez nas wnętrza</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">
                mgr inż. Joanna Przetakiewicz
              </h2>
              <p className="mt-2 text-brand-red font-semibold">Założycielka i właścicielka InvestMax</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Za firmą stoi mgr inż. Joanna Przetakiewicz. Od ponad piętnastu lat zajmuje się obsługą rynku najmu w Bochni i okolicach, dbając o to, by zarządzanie nieruchomością było dla właściciela całkowicie bezobsługowe.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Każda współpraca opiera się na transparentności, rzetelnym kontakcie i indywidualnym podejściu — niezależnie od tego, czy chodzi o pojedyncze mieszkanie, lokal usługowy, czy całą kamienicę.
              </p>

              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-secondary/50 p-5">
                  <Calendar className="text-brand-red mb-2" size={20} />
                  <div className="text-2xl font-semibold">2009</div>
                  <div className="text-xs text-muted-foreground">Rok założenia</div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/50 p-5">
                  <Award className="text-brand-red mb-2" size={20} />
                  <div className="text-2xl font-semibold">15+</div>
                  <div className="text-xs text-muted-foreground">Lat doświadczenia</div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/50 p-5">
                  <MapPin className="text-brand-red mb-2" size={20} />
                  <div className="text-2xl font-semibold">Bochnia</div>
                  <div className="text-xs text-muted-foreground">i okolice</div>
                </div>
              </div>

              {/* PODPIS — jasne tło, dużo przestrzeni */}
              <div className="mt-12 pt-10 border-t border-border">
                <p className="text-sm text-muted-foreground mb-6">Z poważaniem,</p>
                <div className="bg-white p-8 rounded-xl">
                  <img
                    src={signature}
                    alt="Podpis Joanny Przetakiewicz"
                    className="h-20 w-auto"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-foreground">mgr inż. Joanna Przetakiewicz</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
