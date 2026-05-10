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
      <section className="relative bg-light overflow-hidden">
        <div className="absolute inset-0">
          <img src={bochnia} alt="Bochnia" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-light via-light/90 to-light/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand-red mb-4">O nas</div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-foreground leading-tight">
              Doświadczenie, które buduje zaufanie
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              InvestMax działa od 2009 roku i zajmuje się kompleksowym zarządzaniem nieruchomościami — mieszkaniami, lokalami usługowymi oraz domami w Bochni i okolicach.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-[4/5] w-full rounded-2xl bg-gradient-to-br from-secondary to-muted border border-border shadow-elegant overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-dark/10 flex items-center justify-center mb-4">
                    <span className="text-4xl font-semibold text-dark/60">JP</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Miejsce na zdjęcie</p>
                  <p className="text-xs text-muted-foreground mt-1">mgr inż. Joanna Przetakiewicz</p>
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
