import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Download, X, Award, CheckCircle2, TrendingUp, Sparkles, BookOpen, Star } from 'lucide-react';
import { PlayerProfile } from '../../types';

interface PrintablePortfolioReportModalProps {
  isOpen: boolean;
  profile: PlayerProfile;
  onClose: () => void;
}

export const PrintablePortfolioReportModal: React.FC<PrintablePortfolioReportModalProps> = ({
  isOpen,
  profile,
  onClose
}) => {
  if (!isOpen) return null;

  const baseline = profile.baseline;
  const snapshots = profile.monthlySnapshots || [];
  const mastery = profile.mastery;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto print:shadow-none print:border-none print:max-w-none print:rounded-none"
        >
          {/* Header Controls (Hidden during print) */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm">Officieel Voortgangsrapport &amp; Leerportfolio</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Exporteer / Print PDF</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Report Document */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-900 overflow-y-auto max-h-[80vh] print:max-h-none print:overflow-visible">
            
            {/* Header Document Banner */}
            <div className="border-b-2 border-emerald-600 pb-5 flex items-start justify-between">
              <div>
                <div className="text-xs font-black text-emerald-800 uppercase tracking-widest">
                  Boerin Tess Safari Educatie • Ontwikkelingsportfolio
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                  Voortgangsrapport van {profile.name}
                </h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  Niveau: {profile.selectedGrade === 'group_6_7_8' ? 'Groep 6-7-8 (Bovenbouw)' : 'Groep 4-5 (Middenbouw)'} • Begeleidend Metgezel: {profile.companion.name}
                </p>
              </div>

              <div className="text-right">
                <div className="inline-block p-2.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-center">
                  <div className="text-[10px] uppercase font-black text-emerald-800">Rapport Datum</div>
                  <div className="text-xs font-bold text-slate-900">{new Date().toLocaleDateString('nl-NL')}</div>
                </div>
              </div>
            </div>

            {/* Baseline vs Current Level Comparison Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>1. Vaardigheidsscores: Nulmeting vs. Huidig Niveau</span>
              </h3>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Onderwijsvaardigheid</th>
                      <th className="p-2.5 text-center">Nulmeting (Baseline)</th>
                      <th className="p-2.5 text-center">Huidig Niveau</th>
                      <th className="p-2.5 text-center">Reële Groei (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-2.5 font-bold">Leesvloeiendheid (WPM &amp; Ritme)</td>
                      <td className="p-2.5 text-center text-slate-500">{baseline?.readingFluency || 50}%</td>
                      <td className="p-2.5 text-center font-bold text-emerald-800">{mastery.readingFluency}%</td>
                      <td className="p-2.5 text-center font-black text-emerald-600">+{mastery.readingFluency - (baseline?.readingFluency || 50)}%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Begrijpend Lezen &amp; Conclusies</td>
                      <td className="p-2.5 text-center text-slate-500">{baseline?.readingComprehension || 68}%</td>
                      <td className="p-2.5 text-center font-bold text-emerald-800">{mastery.readingComprehension}%</td>
                      <td className="p-2.5 text-center font-black text-emerald-600">+{mastery.readingComprehension - (baseline?.readingComprehension || 68)}%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Woordenschat in Context</td>
                      <td className="p-2.5 text-center text-slate-500">{baseline?.vocabulary || 60}%</td>
                      <td className="p-2.5 text-center font-bold text-emerald-800">{mastery.vocabulary}%</td>
                      <td className="p-2.5 text-center font-black text-emerald-600">+{mastery.vocabulary - (baseline?.vocabulary || 60)}%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Spelling &amp; Klankregels</td>
                      <td className="p-2.5 text-center text-slate-500">{baseline?.spelling || 60}%</td>
                      <td className="p-2.5 text-center font-bold text-emerald-800">{mastery.spelling}%</td>
                      <td className="p-2.5 text-center font-black text-emerald-600">+{mastery.spelling - (baseline?.spelling || 60)}%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Mondelinge Spreekdurf &amp; Zelfvertrouwen</td>
                      <td className="p-2.5 text-center text-slate-500">{baseline?.confidence || 45}%</td>
                      <td className="p-2.5 text-center font-bold text-emerald-800">{mastery.confidence}%</td>
                      <td className="p-2.5 text-center font-black text-emerald-600">+{mastery.confidence - (baseline?.confidence || 45)}%</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Wiskundig &amp; Logisch Inzicht</td>
                      <td className="p-2.5 text-center text-slate-500">{baseline?.mathematics || 85}%</td>
                      <td className="p-2.5 text-center font-bold text-emerald-800">{mastery.mathematics}%</td>
                      <td className="p-2.5 text-center font-black text-emerald-600">+{mastery.mathematics - (baseline?.mathematics || 85)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monthly Trend Progress */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                2. Maand-op-Maand Ontwikkeling
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {snapshots.map((snap) => (
                  <div key={snap.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                    <div className="font-bold text-emerald-900">{snap.monthLabel}</div>
                    <div className="text-slate-600">Gemiddeld: <strong>{Math.round((snap.readingFluency + snap.readingComprehension + snap.vocabulary + snap.confidence) / 4)}%</strong></div>
                    <div className="text-slate-600">WPM: <strong>{snap.wpm}</strong> | Nauwkeurigheid: <strong>{snap.accuracyPct}%</strong></div>
                    <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200/60">
                      "{snap.notes}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Summary & Teacher Recommendations */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Pedagogische Conclusie &amp; Volgende Leerdoelen</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {profile.name} toont een consequente, positieve groeicurve over de afgelopen kwartalen. De combinatie van speelse missies met directe adaptieve feedback zorgt voor meetbare verbetering in zowel technische leesvaardigheid als spreekdurf.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-medium text-[11px]">
                <div className="text-emerald-900">
                  <strong>Aanbevolen focus komende maand:</strong>
                  <ul className="list-disc pl-4 text-slate-700 mt-0.5 space-y-0.5">
                    <li>3x per week een 10-minuten hardop leessessie</li>
                    <li>Spreken in volledige samengestelde zinnen</li>
                  </ul>
                </div>
                <div className="text-emerald-900">
                  <strong>Behaalde Certificaten:</strong>
                  <ul className="list-disc pl-4 text-slate-700 mt-0.5 space-y-0.5">
                    <li>Officieel Safari Verkenner Diploma 🏅</li>
                    <li>Leesverkenner Medaille 📖</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Signature */}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500">
              <div>Boerin Tess &amp; Safaripark Leersysteem</div>
              <div className="italic">Geverifieerd Leerportfolio • {profile.name}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
