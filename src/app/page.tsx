export default function Home() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            Painel de Estratégias da Loteria
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Acompanhe seu nível, XP e desempenho dos seus jogos. Este painel
            simula o comportamento do motor inteligente que vamos conectar aos
            seus dados reais.
          </p>
        </div>
        <div className="text-xs text-right text-slate-400 space-y-1">
          <p>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Versão beta • Motor estatístico v1.0
            </span>
          </p>
          <p className="text-[11px] text-slate-500">
            Dados demonstrativos – em breve conectados ao Supabase para cada
            usuário.
          </p>
        </div>
      </section>

      {/* Linha 1: Nível / XP + Índice de confiança */}
      <section className="grid gap-4 md:grid-cols-[1.4fr,1fr]">
        {/* Card Nível / XP */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 shadow-[0_0_40px_rgba(15,23,42,0.7)]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Progresso do jogador
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                Lenda das Loterias (nível 7)
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">XP atual</p>
              <p className="text-xl font-semibold text-emerald-300">
                4.320 <span className="text-xs text-slate-500">/ 5.000</span>
              </p>
            </div>
          </div>

          {/* Barra de XP */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
              <span>Próximo nível em 680 XP</span>
              <span>86% concluído</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-[86%] bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-300 shadow-[0_0_20px_rgba(45,212,191,0.7)]" />
            </div>
          </div>

          {/* Missão do dia */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <span className="text-base">🎯</span> Missão do dia
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Gerar <span className="font-semibold text-emerald-300">3</span>{" "}
                jogos da Mega-Sena e{" "}
                <span className="font-semibold text-emerald-300">2</span> da
                Lotofácil.
              </p>
              <p className="mt-2 text-[11px] text-emerald-300">
                +250 XP se completar hoje.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <span className="text-base">🔥</span> Série de dias ativos
                </p>
                <p className="mt-1 text-xl font-semibold text-emerald-300">
                  5<span className="text-xs text-slate-500 ml-1">dias</span>
                </p>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Se chegar a <span className="font-semibold">7 dias</span>,
                libera o modo{" "}
                <span className="font-semibold text-emerald-300">
                  Estratégia Avançada
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Card índice de confiança */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Índice de performance percebida
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Com base nos jogos cadastrados pelo próprio usuário.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-emerald-300">
                  78%
                </span>
                <span className="text-xs text-slate-500">
                  jogos com pelo menos 2 acertos
                </span>
              </div>

              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mega-Sena</span>
                  <span className="text-slate-300">64% com 3+ pontos</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[64%] bg-emerald-400" />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-400">Lotofácil</span>
                  <span className="text-slate-300">81% com 11+ pontos</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[81%] bg-emerald-300" />
                </div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-center justify-center rounded-2xl border border-emerald-500/40 bg-slate-950/70 px-4 py-3 text-center">
              <p className="text-[11px] text-slate-400">Média de acertos</p>
              <p className="mt-1 text-3xl font-semibold text-emerald-300">3,4</p>
              <p className="mt-1 text-[11px] text-slate-500">
                por jogo cadastrado
              </p>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Esses números são apenas um exemplo visual. Em breve, serão
            alimentados automaticamente pelos seus jogos reais salvos no
            sistema.
          </p>
        </div>
      </section>

      {/* Linha 2: Geração de jogo demonstrativo */}
      <section className="grid gap-4 lg:grid-cols-[1.3fr,1fr]">
        {/* Card de geração de jogo */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Simulador de jogo
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Visual de como será a experiência para o usuário ao gerar um
                novo jogo.
              </p>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-400">
              Modo demonstração
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Mega-Sena
            </button>
            <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Lotofácil
            </button>
            <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Quina
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 mb-4">
            <p className="text-[11px] text-slate-400 mb-2">
              Jogo sugerido (exemplo visual):
            </p>
            <div className="flex flex-wrap gap-2">
              {["06", "12", "25", "33", "47", "58"].map((n) => (
                <span
                  key={n}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-emerald-500/40 text-sm font-semibold text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Aqui depois vamos ligar o algoritmo que mistura distribuição
              pseudoaleatória, pares/ímpares equilibrados e filtros simples.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
              Criar conta e gerar meus jogos
            </button>
            <p className="text-[11px] text-slate-500 max-w-xs">
              Esse botão em breve leva para o fluxo real de cadastro / login via
              Supabase e começa a registrar o progresso da pessoa.
            </p>
          </div>
        </div>

        {/* Card de próximos passos */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Próximos passos do desenvolvimento
            </p>
            <ul className="mt-3 space-y-2 text-[13px] text-slate-300">
              <li>• Conectar autenticação com Supabase (login e cadastro).</li>
              <li>
                • Criar tabela de <span className="font-semibold">games</span>{" "}
                para salvar cada jogo gerado.
              </li>
              <li>
                • Registrar XP a cada ação usando tabela{" "}
                <span className="font-semibold">xp_events</span>.
              </li>
              <li>
                • Tela para o usuário informar quantos pontos o jogo teria feito
                e atualizar os gráficos.
              </li>
            </ul>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Vamos implementar cada etapa juntos, sempre arquivo por arquivo, até
            se transformar em um painel completo de loteria gamificada.
          </p>
        </div>
      </section>
    </div>
  );
}
