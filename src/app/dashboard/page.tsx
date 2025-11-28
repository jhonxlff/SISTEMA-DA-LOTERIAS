"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [stats, setStats] = useState<{ xp: number; level: number; progress: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!supabase) {
        console.error("Supabase não configurado.");
        return;
      }

      setLoading(true);

      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;

      if (!user) {
        console.error("Usuário não autenticado.");
        return;
      }

      const { data, error } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar stats:", error);
      } else {
        setStats(data);
      }

      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-slate-300 text-xl">
        Carregando painel...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-slate-300">
        Não foi possível carregar seus dados.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-50 mb-6">
        Seu painel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl bg-slate-800 p-4 border border-slate-700 shadow">
          <p className="text-slate-400 text-sm">XP</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.xp}</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 border border-slate-700 shadow">
          <p className="text-slate-400 text-sm">Nível</p>
          <p className="text-2xl font-bold text-blue-400">{stats.level}</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 border border-slate-700 shadow">
          <p className="text-slate-400 text-sm">Progresso</p>
          <p className="text-2xl font-bold text-purple-400">{stats.progress}%</p>
        </div>
      </div>
    </div>
  );
}
