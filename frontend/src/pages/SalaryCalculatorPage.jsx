import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SalaryCalculator from "../components/salary/SalaryCalculator";

export default function SalaryCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.12em] text-cyan-400">नेपाल सरकार सेवा</p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">कर्मचारी तलब क्यालकुलेटर</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">तलब तह, भत्ता, योगदान र आयकरका आधारमा मासिक हातमा आउने तलब अनुमान गर्नुहोस्।</p>
            <a href="https://mof.gov.np/content/1789/salary-of-national-service-employees-effective-from/" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-cyan-400 hover:underline">२०८३ साउन १ देखि लागू अर्थ मन्त्रालयको तलबमान हेर्नुहोस्</a>
          </div>
          <SalaryCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
