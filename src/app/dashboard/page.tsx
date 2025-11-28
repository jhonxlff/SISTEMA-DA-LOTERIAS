"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserStats {
  xp: number;
  level: number;
  progress: number; // 0–100%
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    xp: 0,
    level: 1,
    progress: 0,
  });

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUserEmail(user.email || "");

      // Buscar stats do usuário
      const { data: profile } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setStats({
          xp: profile.xp,
          level: profile.level,
          progress: profile.progress,
        });
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-300">
        Carregando seu painel...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-50">
        Bem-vindo, <span className="text-emerald-400">{userEmail}</span>
      </h1>

      <p className="text-slate-400 mt-1">
        Este é seu painel de estratégias, jogos salvos e evolução.
      </p>

      {/* CARD DE XP */}
      <div className="mt-6 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-slate-100">Seu nível</h2>
          <span className="text-emerald-400 text-lg font-bold">
            Nível {stats.level}
          </span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-400 h-3 transition-all"
            style={{ width: `${stats.progress}%` }}
          ></div>
        </div>

        <p className="text-slate-400 text-sm mt-2">
          XP atual: <span className="text-emerald-300">{stats.xp} XP</span>
        </p>
      </div>

      {/* EM BREVE: LISTA DE JOGOS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-slate-100 mb-3">
          Seus Jogos
        </h2>

        <p className="text-slate-400">
          Aqui aparecerão todos os jogos que você gerar e salvar.
        </p>

        <button className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold transition">
          Criar novo jogo
        </button>
      </div>
    </div>
  );
}
