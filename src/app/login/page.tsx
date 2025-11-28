"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setMessage({ type: null, text: "" });

    if (!supabase) {
      setMessage({
        type: "error",
        text: "Supabase não está configurado. Verifique o arquivo .env.local.",
      });
      return;
    }

    if (!email || !password) {
      setMessage({
        type: "error",
        text: "Preencha email e senha.",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({
          type: "error",
          text:
            error.message ||
            "Email ou senha incorretos. Tente novamente.",
        });
        return;
      }

      // Sucesso → redirecionar para o dashboard
      setMessage({
        type: "success",
        text: "Login realizado com sucesso! Redirecionando...",
      });

      // Aguarda 0.8s para o usuário ver a mensagem
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Erro inesperado ao fazer login.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 text-center">
          Acesse sua conta
        </h1>
        <p className="text-sm text-slate-400 text-center mt-1 mb-6">
          Entre para acessar seu painel de loterias, XP e jogos salvos.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="seuemail@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="••••••••"
            />
          </div>

          {message.type && (
            <p
              className={`text-sm mt-2 ${
                message.type === "success"
                  ? "text-emerald-300"
                  : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition text-slate-950 font-semibold py-2 mt-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-emerald-300 hover:text-emerald-200 font-medium"
          >
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}
