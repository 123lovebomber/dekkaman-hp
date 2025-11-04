// "use client";

// import { useState } from "react";

// const USE_OPTIONS_RESIDENTIAL = ["住居", "SOHO", "店舗併用住宅", "その他"];
// const USE_OPTIONS_BUSINESS = ["オフィス", "店舗", "倉庫", "その他"];
// const MOVEIN_OPTIONS = ["すぐにでも", "1ヶ月以内", "3ヶ月以内", "未定"];

// // 選択式レンジ（下限/上限）
// const BUDGET_OPTIONS_MANEN = [
//     "5", "8", "10", "12", "15", "18", "20", "25", "30", "35", "40", "50", "60", "80", "100"
// ]; // 単位：万円

// const AREA_OPTIONS_M2 = [
//     "20", "25", "30", "35", "40", "45", "50", "60", "70", "80", "90", "100", "120", "150", "200"
// ]; // 単位：㎡

// const STATION_WALK_OPTIONS = ["5分以内", "10分以内", "15分以内", "20分以内", "20分以上"];

// type Props = {
//     category: "rent" | "other";
// };

// export default function ContactForm({ category }: Props) {
//     // デフォルトは居住用
//     const [purpose, setPurpose] = useState<"residential" | "business">("residential");

//     // 用途（プルダウン）と「その他」詳細
//     const [residentialUse, setResidentialUse] = useState("");
//     const [residentialOther, setResidentialOther] = useState("");
//     const [businessUse, setBusinessUse] = useState("");
//     const [businessOther, setBusinessOther] = useState("");

//     // 予算（下限/上限） ※単位：万円（文字列で保持）
//     const [budgetMin, setBudgetMin] = useState("");
//     const [budgetMax, setBudgetMax] = useState("");

//     // 面積（下限/上限） ※単位：㎡（文字列で保持）
//     const [areaMin, setAreaMin] = useState("");
//     const [areaMax, setAreaMax] = useState("");

//     // 駅徒歩
//     const [walk, setWalk] = useState("");

//     // ポータルリンク（任意）
//     const [urls, setUrls] = useState<string[]>([""]);
//     const MAX_URLS = 6;
//     const addUrl = () => {
//         if (urls.length < MAX_URLS) setUrls([...urls, ""]);
//     };
//     const updateUrl = (i: number, val: string) => {
//         const next = [...urls];
//         next[i] = val;
//         setUrls(next);
//     };

//     return (
//         <form className="w-full rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm bg-white">
//             {/* お名前 */}
//             <div>
//                 <label className="block text-sm font-medium mb-1">
//                     お名前 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                     type="text"
//                     required
//                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
//                 />
//             </div>

//             {/* メール */}
//             <div className="mt-4">
//                 <label className="block text-sm font-medium mb-1">
//                     メール <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                     type="email"
//                     required
//                     placeholder="email@please"
//                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
//                 />
//             </div>

//             {/* ご利用目的（賃貸のみ） */}
//             {category === "rent" && (
//                 <div className="mt-4">
//                     <label className="block text-sm font-medium mb-1">ご利用目的</label>
//                     <div className="flex gap-3 mt-2">
//                         <button
//                             type="button"
//                             onClick={() => setPurpose("residential")}
//                             className={`px-4 py-2 rounded-full border transition ${purpose === "residential"
//                                 ? "border-black bg-black text-white"
//                                 : "border-neutral-300 text-neutral-700"
//                                 }`}
//                         >
//                             居住用
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setPurpose("business")}
//                             className={`px-4 py-2 rounded-full border transition ${purpose === "business"
//                                 ? "border-black bg-black text-white"
//                                 : "border-neutral-300 text-neutral-700"
//                                 }`}
//                         >
//                             事業用
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* ▼ 居住用フォーム */}
//             {category === "rent" && purpose === "residential" && (
//                 <>
//                     {/* 希望エリア */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             希望エリア <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             required
//                             placeholder="例：大江戸線沿　月島〜門前仲町　など"
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
//                         />
//                     </div>

//                     {/* 予算（選択式 下限/上限） 単位：万円 */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             ご予算（下限／上限）<span className="text-red-500">*</span>
//                         </label>
//                         <div className="mt-1 grid grid-cols-2 gap-3 items-center">
//                             <select
//                                 required
//                                 value={budgetMin}
//                                 onChange={(e) => setBudgetMin(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">下限</option>
//                                 {BUDGET_OPTIONS_MANEN.map(v => (
//                                     <option key={v} value={v}>{v} 万円</option>
//                                 ))}
//                             </select>
//                             <select
//                                 required
//                                 value={budgetMax}
//                                 onChange={(e) => setBudgetMax(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">上限</option>
//                                 {BUDGET_OPTIONS_MANEN.map(v => (
//                                     <option key={v} value={v}>{v} 万円</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* 用途（その他で追加入力必須） */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             用途 <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             value={residentialUse}
//                             onChange={(e) => setResidentialUse(e.target.value)}
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                         >
//                             <option value="">選択してください</option>
//                             {USE_OPTIONS_RESIDENTIAL.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                         {residentialUse === "その他" && (
//                             <input
//                                 type="text"
//                                 required
//                                 placeholder="用途を具体的にご記入ください"
//                                 value={residentialOther}
//                                 onChange={(e) => setResidentialOther(e.target.value)}
//                                 className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
//                             />
//                         )}
//                     </div>

//                     {/* 専有面積（選択式 下限/上限） 単位：㎡ */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             専有面積（下限／上限）<span className="text-red-500">*</span>
//                         </label>
//                         <div className="mt-1 grid grid-cols-2 gap-3 items-center">
//                             <select
//                                 required
//                                 value={areaMin}
//                                 onChange={(e) => setAreaMin(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">下限</option>
//                                 {AREA_OPTIONS_M2.map(v => (
//                                     <option key={v} value={v}>{v} ㎡</option>
//                                 ))}
//                             </select>
//                             <select
//                                 required
//                                 value={areaMax}
//                                 onChange={(e) => setAreaMax(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">上限</option>
//                                 {AREA_OPTIONS_M2.map(v => (
//                                     <option key={v} value={v}>{v} ㎡</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* 駅徒歩（選択式） */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             駅徒歩 <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             value={walk}
//                             onChange={(e) => setWalk(e.target.value)}
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                         >
//                             <option value="">選択してください</option>
//                             {STATION_WALK_OPTIONS.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* 入居時期（選択式） */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             入居時期 <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                         >
//                             <option value="">選択してください</option>
//                             {MOVEIN_OPTIONS.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </>
//             )}

//             {/* ▼ 事業用フォーム */}
//             {category === "rent" && purpose === "business" && (
//                 <>
//                     {/* 希望エリア */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             希望エリア <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             required
//                             placeholder="例：渋谷・表参道・銀座など"
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
//                         />
//                     </div>

//                     {/* 予算（選択式 下限/上限） 単位：万円 */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             ご予算（下限／上限）<span className="text-red-500">*</span>
//                         </label>
//                         <div className="mt-1 grid grid-cols-2 gap-3 items-center">
//                             <select
//                                 required
//                                 value={budgetMin}
//                                 onChange={(e) => setBudgetMin(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">下限</option>
//                                 {BUDGET_OPTIONS_MANEN.map(v => (
//                                     <option key={v} value={v}>{v} 万円</option>
//                                 ))}
//                             </select>
//                             <select
//                                 required
//                                 value={budgetMax}
//                                 onChange={(e) => setBudgetMax(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">上限</option>
//                                 {BUDGET_OPTIONS_MANEN.map(v => (
//                                     <option key={v} value={v}>{v} 万円</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* 用途（その他で追加入力必須） */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             用途 <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             value={businessUse}
//                             onChange={(e) => setBusinessUse(e.target.value)}
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                         >
//                             <option value="">選択してください</option>
//                             {USE_OPTIONS_BUSINESS.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                         {businessUse === "その他" && (
//                             <input
//                                 type="text"
//                                 required
//                                 placeholder="用途を具体的にご記入ください"
//                                 value={businessOther}
//                                 onChange={(e) => setBusinessOther(e.target.value)}
//                                 className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
//                             />
//                         )}
//                     </div>

//                     {/* 専有面積（選択式 下限/上限） 単位：㎡ */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             専有面積（下限／上限）<span className="text-red-500">*</span>
//                         </label>
//                         <div className="mt-1 grid grid-cols-2 gap-3 items-center">
//                             <select
//                                 required
//                                 value={areaMin}
//                                 onChange={(e) => setAreaMin(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">下限</option>
//                                 {AREA_OPTIONS_M2.map(v => (
//                                     <option key={v} value={v}>{v} ㎡</option>
//                                 ))}
//                             </select>
//                             <select
//                                 required
//                                 value={areaMax}
//                                 onChange={(e) => setAreaMax(e.target.value)}
//                                 className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                             >
//                                 <option value="">上限</option>
//                                 {AREA_OPTIONS_M2.map(v => (
//                                     <option key={v} value={v}>{v} ㎡</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* 駅徒歩（選択式） */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             駅徒歩 <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             value={walk}
//                             onChange={(e) => setWalk(e.target.value)}
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                         >
//                             <option value="">選択してください</option>
//                             {STATION_WALK_OPTIONS.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* 入居時期（選択式） */}
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium mb-1">
//                             入居時期 <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10"
//                         >
//                             <option value="">選択してください</option>
//                             {MOVEIN_OPTIONS.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </>
//             )}

//             {/* ▼ 共通：ポータルサイト（任意） */}
//             {category === "rent" && (
//                 <div className="mt-4">
//                     <label className="block text-sm font-medium">
//                         ポータルサイトで気になる物件があればリンクを送ってください（任意）
//                     </label>

//                     {urls.map((u, i) => (
//                         <input
//                             key={i}
//                             type="url"
//                             inputMode="url"
//                             placeholder="https://example.com/..."
//                             value={u}
//                             onChange={(e) => updateUrl(i, e.target.value)}
//                             className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
//                         />
//                     ))}

//                     {urls.length < MAX_URLS && (
//                         <button
//                             type="button"
//                             onClick={addUrl}
//                             className="mt-2 text-sm text-blue-600 hover:underline"
//                         >
//                             + リンクを追加する
//                         </button>
//                     )}
//                 </div>
//             )}

//             {/* ▼ 共通：相談内容 */}
//             <div className="mt-4">
//                 <label className="block text-sm font-medium mb-1">
//                     こだわり条件をご記入ください <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     required
//                     rows={5}
//                     placeholder="例：ペット可　築浅　エレベーター有　同棲するために借りようと思っています。"
//                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
//                 />
//             </div>

//             {/* ▼ 送信ボタン */}
//             <div className="mt-6">
//                 <button
//                     type="submit"
//                     className="w-full sm:w-auto rounded-xl bg-black text-white px-6 py-3 font-medium hover:bg-neutral-800 transition"
//                 >
//                     送信する
//                 </button>
//             </div>
//         </form>
//     );
// }


// frontend/components/forms/ContactForm.tsx
"use client";

import { useMemo, useState } from "react";

type Props = {
    category: "rent" | "other";
};

const USE_OPTIONS_RESIDENTIAL = ["住居", "SOHO", "店舗併用住宅", "その他"] as const;
const USE_OPTIONS_BUSINESS = ["オフィス", "店舗", "倉庫", "その他"] as const;
const MOVEIN_OPTIONS = ["すぐにでも", "1ヶ月以内", "3ヶ月以内", "未定"] as const;

// 選択式レンジ（下限/上限）
const BUDGET_OPTIONS_MANEN = ["5", "8", "10", "12", "15", "18", "20", "25", "30", "35", "40", "50", "60", "80", "100"] as const; // 単位：万円
const AREA_OPTIONS_M2 = ["20", "25", "30", "35", "40", "45", "50", "60", "70", "80", "90", "100", "120", "150", "200"] as const; // 単位：㎡
const STATION_WALK_OPTIONS = ["5分以内", "10分以内", "15分以内", "20分以内", "20分以上"] as const;

const MAX_URLS = 6;

export default function ContactForm({ category }: Props) {
    // 共通
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // 送信状態
    const [sending, setSending] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    // 賃貸のみ：目的（デフォルト居住用を選択状態に）
    const [purpose, setPurpose] = useState<"residential" | "business">("residential");

    // 居住用
    const [residentialArea, setResidentialArea] = useState("");
    const [budgetMin, setBudgetMin] = useState("");
    const [budgetMax, setBudgetMax] = useState("");
    const [residentialUse, setResidentialUse] = useState("");
    const [residentialOther, setResidentialOther] = useState("");
    const [areaMin, setAreaMin] = useState("");
    const [areaMax, setAreaMax] = useState("");
    const [walk, setWalk] = useState("");
    const [moveIn, setMoveIn] = useState("");

    // 事業用
    const [businessArea, setBusinessArea] = useState("");
    const [bizUse, setBizUse] = useState("");
    const [bizOther, setBizOther] = useState("");

    // 用途に応じてメッセージ例文を切り替え
    const messagePlaceholder = useMemo(() => {
        if (category === "rent" && purpose === "business") {
            return "例：バー希望　できれば居抜き　深夜営業可能物件 など";
        }
        if (category === "rent" && purpose === "residential") {
            return "例：ペット可／築浅／1LDK以上／専有面積40〜55㎡／駅徒歩10分以内／同棲で入居予定 など";
        }
        return "例：取材のご相談／提携のご提案／採用に関するお問い合わせ など";
    }, [category, purpose]);


    // 共通：ポータルURL（賃貸のときだけ表示・任意）
    const [urls, setUrls] = useState<string[]>([""]);
    const addUrl = () => urls.length < MAX_URLS && setUrls([...urls, ""]);
    const updateUrl = (i: number, v: string) => {
        const next = [...urls];
        next[i] = v;
        setUrls(next);
    };

    // 共通：こだわり条件（本文）
    const [message, setMessage] = useState("");

    // ハニーポット（ボット対策）
    const [website, setWebsite] = useState("");

    // 用途その他の入力が必要か
    const needsResidentialOther = useMemo(() => residentialUse === "その他", [residentialUse]);
    const needsBizOther = useMemo(() => bizUse === "その他", [bizUse]);

    // 送信
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setOk(null);
        setErr(null);

        // 必須チェック（categoryごと）
        if (!name.trim() || !email.trim() || !message.trim()) {
            setErr("必須項目が未入力です");
            return;
        }

        if (category === "rent") {
            // 目的別チェック
            if (purpose === "residential") {
                if (
                    !residentialArea.trim() ||
                    !budgetMin || !budgetMax ||
                    !residentialUse ||
                    !areaMin || !areaMax ||
                    !walk || !moveIn
                ) {
                    setErr("必須項目が未入力です（居住用）");
                    return;
                }
                if (needsResidentialOther && !residentialOther.trim()) {
                    setErr("用途の詳細を入力してください");
                    return;
                }
            } else {
                if (
                    !businessArea.trim() ||
                    !budgetMin || !budgetMax ||
                    !bizUse ||
                    !areaMin || !areaMax ||
                    !walk || !moveIn
                ) {
                    setErr("必須項目が未入力です（事業用）");
                    return;
                }
                if (needsBizOther && !bizOther.trim()) {
                    setErr("用途の詳細を入力してください");
                    return;
                }
            }
        }

        // ハニーポット
        if (website.trim().length > 0) {
            setOk("送信しました。ありがとうございます！");
            return;
        }

        // payload作成
        const payload: any = {
            category, // "rent" | "other"
            name,
            email,
            message,
            meta: {
                ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
            },
        };

        if (category === "rent") {
            payload.purpose = purpose; // "residential" | "business"
            payload.urls = urls.map(u => u.trim()).filter(Boolean);

            // 共有（居住/事業）
            payload.shared = {
                budget: { min_manen: budgetMin || null, max_manen: budgetMax || null },
                area_m2: { min: areaMin || null, max: areaMax || null },
                walk,
                moveIn,
            };

            if (purpose === "residential") {
                payload.residential = {
                    area_text: residentialArea,
                    use: residentialUse,
                    use_other: needsResidentialOther ? residentialOther : undefined,
                };
            } else {
                payload.business = {
                    area_text: businessArea,
                    use: bizUse,
                    use_other: needsBizOther ? bizOther : undefined,
                };
            }
        }

        try {
            setSending(true);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = await res.json().catch(() => ({}));

            if (!res.ok || !json?.ok) {
                throw new Error(json?.error || "送信に失敗しました");
            }

            setOk("送信しました。ありがとうございます！");
            // 軽いリセット（目的は維持）
            setMessage("");
            setUrls([""]);
            if (category === "rent") {
                setBudgetMin("");
                setBudgetMax("");
                setAreaMin("");
                setAreaMax("");
                setWalk("");
                setMoveIn("");
                if (purpose === "residential") {
                    setResidentialArea("");
                    setResidentialUse("");
                    setResidentialOther("");
                } else {
                    setBusinessArea("");
                    setBizUse("");
                    setBizOther("");
                }
            }
        } catch (e: any) {
            setErr(e?.message ?? "送信に失敗しました");
        } finally {
            setSending(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm bg-white">
            {/* お名前 */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    お名前 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                />
            </div>

            {/* メール */}
            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    メール <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    required
                    placeholder="email@please"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
                />
            </div>

            {/* ご利用目的（賃貸のみ、デフォルトで居住用が選択状態） */}
            {category === "rent" && (
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">ご利用目的</label>
                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => setPurpose("residential")}
                            className={`px-4 py-2 rounded-full border transition ${purpose === "residential" ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-700"}`}
                        >
                            居住用
                        </button>
                        <button
                            type="button"
                            onClick={() => setPurpose("business")}
                            className={`px-4 py-2 rounded-full border transition ${purpose === "business" ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-700"}`}
                        >
                            事業用
                        </button>
                    </div>
                </div>
            )}

            {/* 居住用フォーム */}
            {category === "rent" && purpose === "residential" && (
                <>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            希望エリア <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="例：大江戸線沿　月島〜門前仲町　など"
                            value={residentialArea}
                            onChange={(e) => setResidentialArea(e.target.value)}
                            className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            ご予算（下限／上限）<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-3 items-center">
                            <select required value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">下限</option>
                                {BUDGET_OPTIONS_MANEN.map(v => <option key={v} value={v}>{v} 万円</option>)}
                            </select>
                            <select required value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">上限</option>
                                {BUDGET_OPTIONS_MANEN.map(v => <option key={v} value={v}>{v} 万円</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            用途 <span className="text-red-500">*</span>
                        </label>
                        <select required value={residentialUse} onChange={(e) => setResidentialUse(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                            <option value="">選択してください</option>
                            {USE_OPTIONS_RESIDENTIAL.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        {needsResidentialOther && (
                            <input
                                type="text"
                                required
                                placeholder="用途を具体的にご記入ください"
                                value={residentialOther}
                                onChange={(e) => setResidentialOther(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            専有面積（下限／上限）<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-3 items-center">
                            <select required value={areaMin} onChange={(e) => setAreaMin(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">下限</option>
                                {AREA_OPTIONS_M2.map(v => <option key={v} value={v}>{v} ㎡</option>)}
                            </select>
                            <select required value={areaMax} onChange={(e) => setAreaMax(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">上限</option>
                                {AREA_OPTIONS_M2.map(v => <option key={v} value={v}>{v} ㎡</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            駅徒歩 <span className="text-red-500">*</span>
                        </label>
                        <select required value={walk} onChange={(e) => setWalk(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                            <option value="">選択してください</option>
                            {STATION_WALK_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            入居時期 <span className="text-red-500">*</span>
                        </label>
                        <select required value={moveIn} onChange={(e) => setMoveIn(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                            <option value="">選択してください</option>
                            {MOVEIN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </>
            )}

            {/* 事業用フォーム */}
            {category === "rent" && purpose === "business" && (
                <>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            希望エリア <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="例：渋谷・表参道・銀座など"
                            value={businessArea}
                            onChange={(e) => setBusinessArea(e.target.value)}
                            className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            ご予算（下限／上限）<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-3 items-center">
                            <select required value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">下限</option>
                                {BUDGET_OPTIONS_MANEN.map(v => <option key={v} value={v}>{v} 万円</option>)}
                            </select>
                            <select required value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">上限</option>
                                {BUDGET_OPTIONS_MANEN.map(v => <option key={v} value={v}>{v} 万円</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            用途 <span className="text-red-500">*</span>
                        </label>
                        <select required value={bizUse} onChange={(e) => setBizUse(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                            <option value="">選択してください</option>
                            {USE_OPTIONS_BUSINESS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        {needsBizOther && (
                            <input
                                type="text"
                                required
                                placeholder="用途を具体的にご記入ください"
                                value={bizOther}
                                onChange={(e) => setBizOther(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            専有面積（下限／上限）<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-3 items-center">
                            <select required value={areaMin} onChange={(e) => setAreaMin(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">下限</option>
                                {AREA_OPTIONS_M2.map(v => <option key={v} value={v}>{v} ㎡</option>)}
                            </select>
                            <select required value={areaMax} onChange={(e) => setAreaMax(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                                <option value="">上限</option>
                                {AREA_OPTIONS_M2.map(v => <option key={v} value={v}>{v} ㎡</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            駅徒歩 <span className="text-red-500">*</span>
                        </label>
                        <select required value={walk} onChange={(e) => setWalk(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                            <option value="">選択してください</option>
                            {STATION_WALK_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                            入居時期 <span className="text-red-500">*</span>
                        </label>
                        <select required value={moveIn} onChange={(e) => setMoveIn(e.target.value)} className="w-full rounded-xl border border-neutral-300 px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-black/10">
                            <option value="">選択してください</option>
                            {MOVEIN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </>
            )}

            {/* 賃貸のみ：ポータル（任意） */}
            {category === "rent" && (
                <div className="mt-4">
                    <label className="block text-sm font-medium">
                        ポータルサイトで気になる物件があればリンクを送ってください（任意）
                    </label>
                    {urls.map((u, i) => (
                        <input
                            key={i}
                            type="url"
                            inputMode="url"
                            placeholder="https://example.com/..."
                            value={u}
                            onChange={(e) => updateUrl(i, e.target.value)}
                            className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                        />
                    ))}
                    {urls.length < MAX_URLS && (
                        <button type="button" onClick={addUrl} className="mt-2 text-sm text-blue-600 hover:underline">
                            + リンクを追加する
                        </button>
                    )}
                </div>
            )}

            {/* 共通：本文 */}
            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    こだわり条件をご記入ください <span className="text-red-500">*</span>
                </label>
                <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={messagePlaceholder}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-neutral-400"
                />

            </div>

            {/* ハニーポット（隠し） */}
            <div aria-hidden="true" className="hidden">
                <label htmlFor="website">ウェブサイト</label>
                <input id="website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {/* 送信 */}
            <div className="mt-6">
                <button
                    type="submit"
                    disabled={sending}
                    className={`w-full sm:w-auto rounded-xl px-6 py-3 font-medium transition ${sending ? "bg-neutral-300 text-neutral-600 cursor-not-allowed" : "bg-black text-white hover:bg-neutral-800"}`}
                >
                    {sending ? "送信中…" : "送信する"}
                </button>
            </div>

            {ok && <p className="mt-3 text-sm text-emerald-600">{ok}</p>}
            {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        </form>
    );
}
