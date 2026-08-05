"use client";

import { MatrixIcon } from "@/components/Icons";

interface SpecMatrixProps {
  specMatrix: {
    features: string[];
    stores: string[];
    rows: { featureName: string; values: Record<string, string> }[];
  };
}

export default function SpecMatrix({ specMatrix }: SpecMatrixProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
          <MatrixIcon className="w-5 h-5 text-[#0099ff]" />
          <span>Feature & Spec Matrix Comparison</span>
        </h2>
        <span className="text-xs text-[#a6a6a6]">
          Auto-generated side-by-side spec comparison
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#090909]">
        <table className="w-full text-left text-sm text-[#a6a6a6]">
          <thead className="bg-[#000000] text-xs uppercase text-[#a6a6a6] font-semibold tracking-wider border-b border-white/10">
            <tr>
              <th scope="col" className="py-3.5 px-4 font-semibold text-white">
                Specification / Feature
              </th>
              {specMatrix.stores.map((store, i) => (
                <th key={i} scope="col" className="py-3.5 px-4 font-semibold text-[#0099ff]">
                  {store}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {specMatrix.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white bg-[#000000]/40 whitespace-nowrap text-xs">
                  {row.featureName}
                </td>
                {specMatrix.stores.map((store, i) => (
                  <td key={i} className="py-3.5 px-4 text-[#a6a6a6] text-xs">
                    {row.values[store] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
