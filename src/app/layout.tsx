import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LottoGenius Pro",
  description:
    "Painel inteligente de jogos e estratégias para loterias, com gamificação e histórico por usuário.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Cabeçalho fixo do app */}
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-xl">
                  🎰
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-300 tracking-wide uppercase">
                    LottoGenius Pro
                  </p>
                  <p className="text-xs text-slate-400">
                    Laboratório de estratégias e jogos com gamificação
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sistema ativo • modo análise</span>
              </div>
            </header>

            {/* Conteúdo das páginas */}
            <main className="pb-10">{children}</main>

            {/* Rodapé */}
            <footer className="border-t border-slate-800 pt-4 mt-4 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>© {new Date().getFullYear()} LottoGenius Pro</span>
              <span>
                Ferramenta de apoio e entretenimento • não garante prêmios reais
              </span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
