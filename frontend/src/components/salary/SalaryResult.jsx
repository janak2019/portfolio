const npr = new Intl.NumberFormat("ne-NP", {
  style: "currency",
  currency: "NPR",
  maximumFractionDigits: 0,
});

const amount = (value) => npr.format(Number(value) || 0);

function Row({ label, value, emphasis = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 py-3 ${
        emphasis
          ? "border-t border-slate-700 text-base font-semibold text-white"
          : "text-sm text-slate-300"
      }`}
    >
      <span className="min-w-0 break-words">{label}</span>
      <span className="shrink-0 whitespace-nowrap">{amount(value)}</span>
    </div>
  );
}

function PrintRow({ label, value, emphasis = false }) {
  return (
    <div className={`print-row ${emphasis ? "print-row-emphasis" : ""}`}>
      <span>{label}</span>
      <strong>{amount(value)}</strong>
    </div>
  );
}

export default function SalaryResult({ result }) {
  const employeeType =
    result.employeeType === "permanent"
      ? "स्थायी कर्मचारी"
      : "अस्थायी / करार कर्मचारी";

  const otherAllowance =
    (Number(result.allowances) || 0) -
    (Number(result.performanceIncentive) || 0) -
    (Number(result.gradeAllowance) || 0);

  return (
    <>
      {/* ================= SCREEN VERSION ================= */}
      <div className="salary-screen">
        <aside className="h-fit min-w-0 rounded-2xl border border-cyan-400/30 bg-slate-900 p-4 shadow-xl sm:p-7">
          <p className="text-sm font-semibold tracking-wider text-cyan-400">
            अनुमानित हातमा आउने तलब
          </p>

          <p className="mt-2 text-4xl font-bold text-white">
            {amount(result.takeHome)}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {employeeType} · प्रति महिना
          </p>

          <div className="mt-6 divide-y divide-slate-800">
            <Row label="आधारभूत तलब" value={result.basicSalary} />

            <Row
              label={`ग्रेड रकम (${result.gradeNumber} ग्रेड × १ दिनको तलब)`}
              value={result.gradeAllowance}
            />

            <Row
              label="कार्यसम्पादनमा आधारित प्रोत्साहन भत्ता (आधारभूत + ग्रेडको) १०%"
              value={result.performanceIncentive}
            />

            <Row label="अन्य मासिक भत्ता" value={otherAllowance} />

            <Row
              label="कुल मासिक पारिश्रमिक"
              value={result.gross}
              emphasis
            />

            <Row
              label="EPF कट्टी (आधारभूत + ग्रेडको) १०%"
              value={result.epfEmployee}
            />

            <Row
              label="नागरिक लगानी कोष (CIT) स्वेच्छिक योगदान"
              value={result.citSelfContribution}
            />

            <Row
              label="सावधिक जीवन बीमा कट्टी"
              value={result.lifeInsuranceEmployee}
            />

            <Row
              label="अनुमानित मासिक आयकर"
              value={result.monthlyTax}
            />

            <Row
              label="कुल मासिक कट्टी"
              value={result.deductions}
              emphasis
            />

            <Row
              label="खुद मासिक तलब"
              value={result.takeHome}
              emphasis
            />
          </div>

          <div className="mt-5 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-slate-300">
            <p className="font-semibold text-cyan-400">
              कार्यालयको मासिक योगदान (तलबबाट कट्टी हुँदैन)
            </p>

            <div className="mt-2 divide-y divide-slate-700">
              <Row
                label="कार्यालयको EPF योगदान (१०%)"
                value={result.epfOffice}
              />

              <Row
                label="कार्यालयको सावधिक जीवन बीमा योगदान"
                value={result.lifeInsuranceOffice}
              />

              <Row
                label="कुल कार्यालय योगदान"
                value={result.officeContribution}
                emphasis
              />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-950 p-4 text-xs leading-5 text-slate-400">
            आधारभूत तलबमान अर्थ मन्त्रालयको २०८३ साउन १ देखि लागू सूचना
            अनुरूप राखिएको छ। अस्थायी/करार सेवाका भत्ता र कट्टी फरक हुन सक्ने
            भएकाले आफ्नो कार्यालयबाट पुष्टि गर्नुहोस्।
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            🖨️ तलब विवरण प्रिन्ट गर्नुहोस्
          </button>
        </aside>
      </div>

      {/* ================= PRINT VERSION ================= */}
      <div className="salary-print">
        <div className="print-header">
          <h1>नेपाल सरकार कर्मचारी तलब विवरण</h1>
          <p>अनुमानित मासिक पारिश्रमिक विवरण</p>
        </div>

        <div className="print-info">
          <div>
            <strong>कर्मचारीको प्रकार:</strong> {employeeType}
          </div>

          <div>
            <strong>अवधि:</strong> प्रति महिना
          </div>
        </div>

        <div className="print-takehome">
          <span>खुद मासिक तलब</span>
          <strong>{amount(result.takeHome)}</strong>
        </div>

        <section>
          <h2>मासिक तलब तथा भत्ता</h2>

          <PrintRow
            label="आधारभूत तलब"
            value={result.basicSalary}
          />

          <PrintRow
            label={`ग्रेड रकम (${result.gradeNumber} ग्रेड × १ दिनको तलब)`}
            value={result.gradeAllowance}
          />

          <PrintRow
            label="कार्यसम्पादनमा आधारित प्रोत्साहन भत्ता (१०%)"
            value={result.performanceIncentive}
          />

          <PrintRow
            label="अन्य मासिक भत्ता"
            value={otherAllowance}
          />

          <PrintRow
            label="कुल मासिक पारिश्रमिक"
            value={result.gross}
            emphasis
          />
        </section>

        <section>
          <h2>मासिक कट्टी</h2>

          <PrintRow
            label="EPF कट्टी (आधारभूत + ग्रेडको) १०%"
            value={result.epfEmployee}
          />

          <PrintRow
            label="नागरिक लगानी कोष (CIT) स्वेच्छिक योगदान"
            value={result.citSelfContribution}
          />

          <PrintRow
            label="सावधिक जीवन बीमा कट्टी"
            value={result.lifeInsuranceEmployee}
          />

          <PrintRow
            label="अनुमानित मासिक आयकर"
            value={result.monthlyTax}
          />

          <PrintRow
            label="कुल मासिक कट्टी"
            value={result.deductions}
            emphasis
          />
        </section>

        <section>
          <h2>कार्यालयको मासिक योगदान</h2>

          <PrintRow
            label="कार्यालयको EPF योगदान (१०%)"
            value={result.epfOffice}
          />

          <PrintRow
            label="कार्यालयको सावधिक जीवन बीमा योगदान"
            value={result.lifeInsuranceOffice}
          />

          <PrintRow
            label="कुल कार्यालय योगदान"
            value={result.officeContribution}
            emphasis
          />
        </section>

        <div className="print-note">
          आधारभूत तलबमान अर्थ मन्त्रालयको २०८३ साउन १ देखि लागू सूचना अनुरूप
          राखिएको छ। अस्थायी/करार सेवाका भत्ता तथा कट्टी फरक हुन सक्ने भएकाले
          सम्बन्धित कार्यालयबाट पुष्टि गर्नुहोस्।
        </div>

        <div className="print-footer">
          <span>Salary Calculator</span>
          <span>
            मुद्रण मिति: {new Date().toLocaleDateString("ne-NP")}
          </span>
        </div>
      </div>
    </>
  );
}