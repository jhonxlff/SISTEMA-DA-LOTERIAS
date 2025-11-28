"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage({ type: null, text: "" });

    if (!supabase) {
      setMessage({
        type: "error",
        text: "Supabase não está configurado. Verifique o arquivo .env.local.",
      });
      return;
    }

    if (!name || !email || !password) {
      setMessage({
        type: "error",
        text: "Preencha nome, email e senha.",
      });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "A senha precisa ter pelo menos 6 caracteres.",
      });
      return;
    }

    if (password !== passwordConfirm) {
      setMessage({
        type: "error",
        text: "As senhas não conferem.",
      });
      return;
    }

    setLoading(true);

    try {
      // 🔥 CRIA O USUÁRIO NO AUTH
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // impede a confirmação por email
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Não foi possível criar a conta.",
        });
        return;
      }

      const createdUser = signUpData?.user;

      if (!createdUser) {
        setMessage({
          type: "error",
          text: "Erro inesperado ao criar usuário.",
        });
        return;
      }

      // 🔥 MARCA O EMAIL COMO CONFIRMADO AUTOMATICAMENTE
      await supabase.auth.admin.updateUserById(createdUser.id, {
        email_confirm: true,
      });

      // 🔥 CRIA REGISTRO INICIAL DE XP, LEVEL E PROGRESSO
      await supabase.from("user_stats").insert({
        user_id: createdUser.id,
        xp: 0,
        level: 1,
        progress: 0,
      });

      // ✔ Mensagem final
      setMessage({
        type: "success",
        text: "Conta criada com sucesso! Agora você já pode fazer login.",
      });

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");

    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Erro inesperado ao criar conta.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 text-center">
          Criar conta
        </h1>
        <p className="text-sm text-slate-400 text-center mt-1 mb-6">
          Comece a usar o painel inteligente de loterias, salvar seus jogos e
          acumular XP.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-300">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Como devemos te chamar?"
            />
          </div>

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
              placeholder="mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Confirmar senha</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="repita a senha"
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
            {loading ? "Criando conta..." : "Criar minha conta"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-emerald-300 hover:text-emerald-200 font-medium"
          >
            Entrar
          </a>
        </p>

        <p className="text-[11px] text-slate-500 text-center mt-4">
          Este cadastro usa Supabase Auth. Os dados de acesso ficam seguros no
          backend do Supabase.
        </p>
      </div>
    </div>
  );
}
