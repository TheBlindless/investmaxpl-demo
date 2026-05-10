import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Layout } from "../components/Layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Strona nie została znaleziona</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Strona się nie załadowała</h1>
        <p className="mt-2 text-sm text-muted-foreground">Spróbuj odświeżyć lub wróć na stronę główną.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Spróbuj ponownie
          </button>
          <a href="/" className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent/10">
            Strona główna
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "InvestMax — Zarządzanie nieruchomościami w Bochni" },
      { name: "description", content: "InvestMax — profesjonalna administracja i zarządzanie nieruchomościami od 2009 roku. Bochnia i okolice." },
      { property: "og:title", content: "InvestMax — Zarządzanie nieruchomościami w Bochni" },
      { property: "og:description", content: "InvestMax — profesjonalna administracja i zarządzanie nieruchomościami od 2009 roku. Bochnia i okolice." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "InvestMax — Zarządzanie nieruchomościami w Bochni" },
      { name: "twitter:description", content: "InvestMax — profesjonalna administracja i zarządzanie nieruchomościami od 2009 roku. Bochnia i okolice." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cf6fb3bb-2470-4ee2-a96f-7bf2031f0360/id-preview-a9147d86--0e8922b2-be3e-4e91-b201-150757f01f1d.lovable.app-1778428091337.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cf6fb3bb-2470-4ee2-a96f-7bf2031f0360/id-preview-a9147d86--0e8922b2-be3e-4e91-b201-150757f01f1d.lovable.app-1778428091337.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}
