"use client";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { interviewData, interviewSchema } from "../config/zod/interview.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { coreAPI } from "@/utils/coreAPI";
import { toast } from "react-toastify";
import { ArrowRight, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const BrainIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.96-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.96-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.6H22l-6.4 4.6 2.4 7.6L12 17.2 5.9 21.8l2.4-7.6L2 9.6h7.6z" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const roles = [
  "MERN Developer",
  "React Developer",
  "Node.js Developer",
  "Frontend Developer",
  "Full Stack Developer",
];
const experiences = ["0–1 Year", "1–2 Years", "2–3 Years", "3–5 Years"];
const difficulties = ["Easy", "Medium", "Hard"];

type Difficulty = "Easy" | "Medium" | "Hard";

const difficultyMeta: Record<
  Exclude<Difficulty, "">,
  { color: string; bg: string; dot: string }
> = {
  Easy: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Medium: {
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
    dot: "bg-amber-400",
  },
  Hard: {
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    dot: "bg-red-400",
  },
};

export default function DashboardPage() {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  useEffect(() => {
    document.title = "GROQ AI";
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<interviewData>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      role: "",
      experience: "",
      difficulty: "Easy",
      numberOfQuestions: 5,
    },
  });

  const onSubmit: SubmitHandler<interviewData> = async (data) => {
    setLoading(true);
    try {
      const res = await coreAPI.post("/api/q-groq", { data });
      if (res.status === 200) {
        toast.success("Your Question is Generated Successfully");
      }

      router.push('/dashboard/groq-ans')

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please contact rakkeshit@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] flex flex-col items-center justify-center px-4 py-12">

      {/* ── Ambient glow (fixed, decorative) ── */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full" />

      {/* ── Page wrapper: constrained to card width ── */}
      <div className="relative w-full max-w-lg flex flex-col gap-4">

        {/* ── "View My All Questions" button — top-right aligned ── */}
        <div className="flex justify-end">
          <button
          onClick={() => router.push('/dashboard/groq-ans')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative overflow-hidden inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm text-white
              bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-500
              hover:scale-105 hover:brightness-110 transition-all duration-200
              active:scale-95 shadow-lg shadow-indigo-500/30"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shimmer_2.5s_ease-in-out_infinite] pointer-events-none" />

            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>View My All Questions</span>
            <ArrowRight
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                hovered ? "translate-x-1" : ""
              }`}
            />
          </button>
        </div>

        {/* ── Card ── */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">

          {/* Top gradient bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

          <div className="px-8 pt-8 pb-9">

            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-violet-500/20">
                <BrainIcon />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight leading-tight">
                  AI Interview Coach
                </h1>
                <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                  Generate targeted questions based on your role & level.
                </p>
              </div>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">

                {/* Role */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400 tracking-wide uppercase">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      {...register("role")}
                      className="w-full appearance-none bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 text-sm text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3 pr-10 outline-none transition-all duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-[#0f1117] text-slate-400">
                        Select your role
                      </option>
                      {roles.map((r) => (
                        <option key={r} value={r} className="bg-[#0f1117] text-slate-200">
                          {r}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <ChevronIcon />
                    </div>
                  </div>
                  {errors.role && (
                    <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
                  )}
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400 tracking-wide uppercase">
                    Experience
                  </label>
                  <div className="relative">
                    <select
                      {...register("experience")}
                      className="w-full appearance-none bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 text-sm text-slate-200 rounded-xl px-4 py-3 pr-10 outline-none transition-all duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-[#0f1117] text-slate-400">
                        Select experience level
                      </option>
                      {experiences.map((e) => (
                        <option key={e} value={e} className="bg-[#0f1117] text-slate-200">
                          {e}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <ChevronIcon />
                    </div>
                  </div>
                  {errors.experience && (
                    <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>
                  )}
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400 tracking-wide uppercase">
                    Difficulty
                  </label>
                  <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 gap-2">
                        {difficulties.map((d) => {
                          const meta = difficultyMeta[d as Difficulty];
                          const active = field.value === d;
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() => field.onChange(d)}
                              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                active
                                  ? `${meta.bg} ${meta.color} border-current`
                                  : "bg-white/[0.03] border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-300"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  active ? meta.dot : "bg-slate-600"
                                }`}
                              />
                              {d}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {errors.difficulty && (
                    <p className="text-red-400 text-sm mt-1">{errors.difficulty.message}</p>
                  )}
                </div>

                {/* Number of Questions */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400 tracking-wide uppercase">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    {...register("numberOfQuestions", { valueAsNumber: true })}
                    min={1}
                    max={20}
                    placeholder="e.g. 10"
                    className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 text-sm text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3 outline-none transition-all duration-200"
                  />
                  {errors.numberOfQuestions && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.numberOfQuestions.message}
                    </p>
                  )}
                </div>

                {/* Generate button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 mt-2 ${
                    !loading
                      ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:translate-y-0"
                      : "bg-white/[0.04] text-slate-600 border border-white/[0.06] cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z"
                        />
                      </svg>
                      Generating…
                    </>
                  ) : (
                    <>
                      <SparkleIcon />
                      Generate Questions
                    </>
                  )}
                </button>

              </div>
            </form>

            {/* Footer hint */}
            <p className="text-center text-xs text-slate-600 mt-5">
              Powered by <span className="text-violet-500">Groq AI</span> · Responses in &lt;1s
            </p>
          </div>
        </div>

        {/* Subtle card glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/5 to-transparent" />
      </div>
    </div>
  );
}