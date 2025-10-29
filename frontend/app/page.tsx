// import Business from "@/components/sections/Business";
// import Hero from "@/components/sections/Hero";
// import Savings from "@/components/sections/Savings";
// import SavingsChart from "@/components/sections/SavingsChart";
// import Vision from "@/components/sections/Vision";

// export default function Page() {
//   return (
//     <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
//       {/* ヒーローセクション */}
//       <section className="snap-start h-screen">
//         <Hero />
//       </section>
//       <section className="snap-start min-h-screen bg-white">
//         <Vision />
//       </section>
//       {/* サービス紹介（強みセクション） */}
//       <section className="snap-start min-h-screen bg-white">
//         <Business />
//       </section>

//       {/* 初期費用比較（グラフセクション） */}
//       <section className="snap-start min-h-screen bg-white">
//         <SavingsChart />
//       </section>
//     </main>
//   );
// }


// import Business from "@/components/sections/Business";
// import Hero from "@/components/sections/Hero";
// import Vision from "@/components/sections/Vision";
// import SavingsChart from "@/components/sections/SavingsChart";

// export default function Page() {
//   return (
//     // 👇 snap系クラスを全削除
//     <main className="min-h-screen overflow-y-auto">
//       {/* ヒーローセクション */}
//       <section className="min-h-screen">
//         <Hero />
//       </section>

//       {/* Vision */}
//       <section className="min-h-screen bg-white">
//         <Vision />
//       </section>

//       {/* 事業内容 */}
//       <section className="min-h-[90v] bg-white">
//         <Business />
//       </section>

//       {/* グラフ（あとで差し替え予定） */}
//       <section className="min-h-screen bg-white">
//         <SavingsChart />
//       </section>
//     </main>
//   );
// }

import Hero from "@/components/sections/Hero";
import Vision from "@/components/sections/Vision";
import Business from "@/components/sections/Business";
import SavingsChart from "@/components/sections/SavingsChart";
import ContactButton from "@/components/ui/ContactButton";
import CompanyInfo from "@/components/sections/CompanyInfo";
import Footer from "@/components/layout/Footer";
export default function Page() {
  return (
    <main
      className={`
        h-auto overflow-y-auto
        /* セクションの上マージン（区切り） */
        [&>section+section]:mt-[clamp(48px,8vw,96px)]
        /* Hero の後だけ広め */
        [&>section[data-hero]+section]:mt-[clamp(72px,12vw,128px)]
        /* 👇 各セクションの内部に軽い上パディングを追加 */
        [&>section]:pt-[clamp(59px,3vw,32px)]
        [&>section]:pb-[clamp(59px,3vw,32px)]

      `}
    >
      <section data-hero className="bg-white">
        <Hero />
      </section>

      <section className="bg-gray-50">
        <Vision />
      </section>

      <section className="bg-white">
        <Business />
      </section>



      <section className="bg-white flex justify-center">
        <ContactButton />
      </section>


      <section className="bg-gray-100">
        <CompanyInfo />
      </section>

    </main>
  );
}
