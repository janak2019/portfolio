import { useMemo, useState } from "react";
import SalaryForm from "./SalaryForm";
import SalaryResult from "./SalaryResult";
import { calculateAnnualTax, DEFAULT_FORM, salaryLevels } from "./salaryData";

export default function SalaryCalculator() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const updateField = ({ target: { name, value } }) => setForm((current) => {
    if (name === "taxpayer" || name === "employeeType") return { ...current, [name]: value };
    const numericValue = Math.max(0, Number(value));
    if (name === "gradeNumber") {
      const maxGrade = salaryLevels.find((level) => level.id === current.level).maxGrade;
      return { ...current, gradeNumber: Math.min(maxGrade, Math.floor(numericValue)) };
    }
    return { ...current, [name]: numericValue };
  });
  const updateLevel = ({ target: { value } }) => {
    const level = salaryLevels.find((item) => item.id === value);
    setForm((current) => ({ ...current, level: level.id, basicSalary: level.basic, gradeNumber: Math.min(current.gradeNumber, level.maxGrade) }));
  };
  const updateCategory = ({ target: { value } }) => {
    const firstLevel = salaryLevels.find((item) => item.category === value);
    setForm((current) => ({ ...current, category: value, level: firstLevel.id, basicSalary: firstLevel.basic, gradeNumber: Math.min(current.gradeNumber, firstLevel.maxGrade) }));
  };
  const result = useMemo(() => {
    const gradeAllowance = (form.basicSalary / 30) * form.gradeNumber;
    const performanceIncentive = Math.floor((form.basicSalary + gradeAllowance) * 0.1);
    const allowances = gradeAllowance + form.dearnessAllowance + form.otherAllowance + performanceIncentive;
    const gross = form.basicSalary + allowances;
    const epfBase = form.basicSalary + gradeAllowance;
    const epfEmployee = epfBase * 0.1;
    const epfOffice = epfBase * 0.1;
    const lifeInsuranceEmployee = 400;
    const lifeInsuranceOffice = 400;
    const annualTaxableIncome = Math.max(0, gross * 12 - epfEmployee * 12 - form.citSelfContribution * 12 - form.annualOtherDeduction);
    const monthlyTax = calculateAnnualTax(annualTaxableIncome, form.taxpayer) / 12;
    const deductions = epfEmployee + form.citSelfContribution + lifeInsuranceEmployee + monthlyTax;
    const officeContribution = epfOffice + lifeInsuranceOffice;
    return { employeeType: form.employeeType, basicSalary: form.basicSalary, gradeAllowance, gradeNumber: form.gradeNumber, allowances, performanceIncentive, gross, epfEmployee, epfOffice, citSelfContribution: form.citSelfContribution, lifeInsuranceEmployee, lifeInsuranceOffice, officeContribution, monthlyTax, deductions, takeHome: gross - deductions };
  }, [form]);
  return <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-7"><SalaryForm form={form} onChange={updateField} onCategoryChange={updateCategory} onLevelChange={updateLevel} /><SalaryResult result={result} /></div>;
}
