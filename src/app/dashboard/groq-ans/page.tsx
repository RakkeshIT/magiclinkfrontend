
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Clock,
    Target,
    Award,
    Loader2,
    RefreshCw,
    Hash,
    AlertCircle,
    Trash2,
} from "lucide-react";
import { coreAPI } from "@/utils/coreAPI";
import { toast } from "react-toastify";

// ── Types ──────────────────────────────────────────────────────────────────

type Difficulty = "Easy" | "Medium" | "Hard";

interface ApiQuestion {
    id: number;
    question: string;
    _id: string;
}

interface ApiQuestionSet {
    user_query: {
        role: string;
        experience: string;
        difficulty: string;
        numberOfQuestions: number;
    };
    _id: string;
    userId: string;
    questions: ApiQuestion[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ApiResponse {
    success: boolean;
    data: {
        questions: ApiQuestionSet[];
        records: {
            totalRecords: number;
            latestUserQuery: {
                role: string;
                experience: string;
                difficulty: string;
                numberOfQuestions: number;
            };
            totalQueationsCount: number;
        };
    };
}

interface DisplayQuestion {
    id: number;
    question: string;
    difficulty: Difficulty;
    role: string;
    experience: string;
    createdAt: string;
}

// ── Difficulty config ──────────────────────────────────────────────────────

const difficultyConfig: Record<
    Difficulty,
    { badge: string; label: string; icon: string; dot: string }
> = {
    Easy: {
        badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        label: "Easy",
        icon: "🟢",
        dot: "bg-emerald-500",
    },
    Medium: {
        badge: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        label: "Medium",
        icon: "🟡",
        dot: "bg-amber-500",
    },
    Hard: {
        badge: "bg-red-500/10 border-red-500/30 text-red-400",
        label: "Hard",
        icon: "🔴",
        dot: "bg-red-500",
    },
};

// ── Components ─────────────────────────────────────────────────────────────

function StatCard({
    label,
    value,
    accent = false,
    icon: Icon,
}: {
    label: string;
    value: string;
    accent?: boolean;
    icon?: React.ElementType;
}) {
    return (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-200">
            <div className="flex items-center gap-2 mb-1.5">
                {Icon && <Icon className="w-3.5 h-3.5 text-slate-600" />}
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                    {label}
                </p>
            </div>
            <p className={`text-lg font-semibold ${accent ? "text-violet-400" : "text-slate-200"}`}>
                {value}
            </p>
        </div>
    );
}

function QuestionCard({
    item,
    index,
}: {
    item: DisplayQuestion;
    index: number;
}) {
    const diff = difficultyConfig[item.difficulty];

    return (
        <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-violet-500/25 hover:bg-white/[0.05] transition-all duration-300 p-5">
            {/* Top row: Number + Difficulty */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-[12px] font-bold text-violet-400">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                        #{item.id}
                    </span>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${diff.badge}`}>
                    {diff.icon} {diff.label}
                </span>
            </div>

            {/* Question text */}
            <p className="text-[14px] font-medium text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                {item.question}
            </p>

            {/* Bottom metadata */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.05]">
                <span className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {item.role}
                </span>
                <span className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.experience}
                </span>
                <span className="text-[11px] text-slate-700 ml-auto">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
        </div>
    );
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 text-sm hover:border-white/20 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-4 h-4" />
                Prev
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                        <span key={`dots-${i}`} className="text-slate-600 px-2">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                                    ? "bg-violet-500/15 border border-violet-500/30 text-violet-400"
                                    : "border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 text-sm hover:border-white/20 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

function LoadingSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="h-32 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse"
                />
            ))}
        </div>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function QuestionsPage() {
    const router = useRouter();
    const [allQuestions, setAllQuestions] = useState<DisplayQuestion[]>([]);
    const [meta, setMeta] = useState<{
        role: string;
        experience: string;
        difficulty: Difficulty;
        totalRecords: number;
        totalQueationsCount: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    // Fetch all questions from API
    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await coreAPI.post("/api/getquestions", {});
            const response = result.data as ApiResponse;

            if (result.status === 200 && response.data.questions.length > 0) {
                // Flatten all questions from all sets
                const flattened: DisplayQuestion[] = response.data.questions.flatMap((set) =>
                    set.questions.map((q) => ({
                        id: q.id,
                        question: q.question,
                        difficulty: (set.user_query.difficulty as Difficulty) || "Easy",
                        role: set.user_query.role,
                        experience: set.user_query.experience,
                        createdAt: set.createdAt,
                    }))
                );

                setAllQuestions(flattened);

                // Use latest set for meta
                const latest = response.data.questions[0];
                setMeta({
                    role: latest.user_query.role,
                    experience: latest.user_query.experience,
                    difficulty: latest.user_query.difficulty as Difficulty,
                    totalRecords: response.data.records.totalRecords,
                    totalQueationsCount: response.data.records.totalQueationsCount,
                });
            } else {
                throw new Error("No questions found");
            }
        } catch (err) {
            console.error("Failed to fetch:", err);
            setError("Failed to load questions. Please try again or No Question Found.");
        } finally {
            setLoading(false);
        }
    }, []);
    
    const handleBultDelete = async () => {
        setDeleteLoading(true)
        try {
            const res = await coreAPI.delete('/api/bulkDelete-questions')
            if(res.status === 200){
                toast.success("All Recors Deleted")
                await fetchQuestions()
            }
        } catch (error) {
            toast.error("Something error")
        }finally{
            setDeleteLoading(false)
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // Pagination logic
    const totalPages = Math.ceil(allQuestions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedQuestions = allQuestions.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const diffMeta = meta ? difficultyConfig[meta.difficulty] : difficultyConfig["Easy"];

    return (
        <div className="min-h-screen bg-[#080a0f] px-4 py-8 md:px-8">
            {/* Ambient glow */}
            <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/8 blur-[120px] rounded-full" />

            <div className="relative w-full max-w-5xl mx-auto flex flex-col gap-6">

                {/* ── Top bar ── */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/[0.09] bg-white/[0.03] text-slate-400 text-sm hover:border-white/20 hover:text-slate-200 hover:bg-white/[0.05] transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                        <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-[12px] text-violet-400 font-semibold">
                            Interview Questions
                        </span>
                    </div>
                </div>

                {/* ── Hero ── */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* Left Content */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-violet-500/20">
                        <Hash className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                            All Questions
                        </h1>

                        <h1 className="text-xl font-bold text-slate-100 tracking-tight">
                            {meta && `Recent Search - ${meta.role} Questions`}
                        </h1>

                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                            {meta && (
                                <>
                                    <span className="inline-flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {meta.experience}
                                    </span>

                                    <span className="text-slate-700">·</span>

                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${diffMeta.badge}`}
                                    >
                                        <Target className="w-3 h-3" />
                                        {meta.difficulty}
                                    </span>

                                    <span className="text-slate-700">·</span>

                                    <span className="inline-flex items-center gap-1">
                                        <BookOpen className="w-3 h-3" />
                                        {allQuestions.length} total
                                    </span>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-start md:justify-end">
  <button
    onClick={handleBultDelete}
    disabled={deleteLoading}
    className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-lg
      bg-red-600
      hover:bg-red-700
      disabled:bg-red-400
      disabled:cursor-not-allowed
      text-white
      font-medium
      transition-all
      duration-200
    "
  >
    {deleteLoading ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin" />
        Deleting...
      </>
    ) : (
      <>
        <Trash2 className="w-4 h-4" />
        Delete All
      </>
    )}
  </button>
</div>
                </div>

                {/* ── Stats ── */}
                {meta && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <StatCard label="Total Questions" value={String(allQuestions.length)} accent icon={BookOpen} />
                        <StatCard label="Difficulty" value={meta.difficulty} icon={Target} />
                        <StatCard label="Role" value={meta.role} icon={Award} />
                        <StatCard label="Records" value={String(meta.totalRecords)} icon={Hash} />
                    </div>
                )}

                {/* ── Questions Grid ── */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                            Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, allQuestions.length)} of {allQuestions.length}
                        </p>
                        <span className="text-[11px] text-slate-600">
                            Page {currentPage} of {totalPages || 1}
                        </span>
                    </div>

                    {loading ? (
                        <LoadingSkeleton />
                    ) : error && allQuestions.length === 0 ? (
                        <div className="text-center py-16">
                            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                            <p className="text-slate-400 mb-4">{error}</p>
                            <button
                                onClick={fetchQuestions}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm hover:bg-violet-500/20 transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {paginatedQuestions.map((item, i) => (
                                    <QuestionCard
                                        key={`${item.id}-${item.createdAt}-${i}`}
                                        item={item}
                                        index={startIndex + i}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>

                {/* ── Footer ── */}
                <div className="text-center pt-6 pb-8">
                    <p className="text-xs text-slate-700">
                        Powered by{" "}
                        <span className="text-violet-500 font-semibold">Groq AI</span>
                        {" "}· Built by{" "}
                        <span className="text-slate-600">Rakkesh IT</span>
                    </p>
                </div>
            </div>
        </div>
    );
}