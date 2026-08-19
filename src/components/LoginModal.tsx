import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, Lock, Sparkles, Key, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { verifyLogin, USER_ACCOUNTS } from '../services/authService';
import { sound } from '../services/soundService';
import { TocaAvatar } from './TocaAvatar';
import { TOCA_PRESETS } from '../data/tocaAvatarData';

interface LoginModalProps {
  isOpen: boolean;
  currentUsername: string;
  onLoginSuccess: (username: string) => void;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  currentUsername,
  onLoginSuccess,
  onClose
}) => {
  const [selectedUser, setSelectedUser] = useState<string>(currentUsername || 'Ridheya');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectQuick = (username: string) => {
    setSelectedUser(username);
    setPassword('');
    setErrorMessage('');
    sound.playPop();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = verifyLogin(selectedUser, password);
    if (result.success && result.username) {
      sound.playStar();
      onLoginSuccess(result.username);
    } else {
      sound.playWrong();
      setErrorMessage(result.error || 'Onjuist wachtwoord');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-100 text-center relative"
        >
          {/* Header Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-3xl shadow-sm mb-3">
            👑
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
            Wie Gaat Er Spelen?
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Kies je eigen profiel zodat al je dieren en sterren veilig bewaard blijven!
          </p>

          {/* Quick Select Profile Cards */}
          <div className="grid grid-cols-2 gap-3 mt-5 text-left">
            {/* Hemali */}
            <button
              type="button"
              onClick={() => handleSelectQuick('Hemali')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative ${
                selectedUser.toLowerCase() === 'hemali'
                  ? 'bg-cyan-50 border-2 border-cyan-500 shadow-md ring-2 ring-cyan-400/20'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="p-1 rounded-xl bg-white shadow-2xs mb-1">
                <TocaAvatar customization={TOCA_PRESETS[1].customization} size={48} />
              </div>
              <div className="font-black text-sm text-slate-800">Hemali</div>
              <div className="text-[10px] text-cyan-800 font-bold bg-cyan-100 px-2 py-0.5 rounded-full mt-1">
                Groep 6-7-8
              </div>
            </button>

            {/* Ridheya */}
            <button
              type="button"
              onClick={() => handleSelectQuick('Ridheya')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative ${
                selectedUser.toLowerCase() === 'ridheya'
                  ? 'bg-teal-50 border-2 border-teal-500 shadow-md ring-2 ring-teal-400/20'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="p-1 rounded-xl bg-white shadow-2xs mb-1">
                <TocaAvatar customization={TOCA_PRESETS[0].customization} size={48} />
              </div>
              <div className="font-black text-sm text-slate-800">Ridheya</div>
              <div className="text-[10px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-full mt-1">
                Groep 4-5
              </div>
            </button>
          </div>

          {/* Password Form */}
          <form onSubmit={handleLogin} className="mt-5 space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Wachtwoord voor {selectedUser}:</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {selectedUser === 'Hemali' ? 'Hint: Big2014!' : 'Hint: Small2018!'}
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Voer wachtwoord in..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  autoFocus
                />
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm uppercase tracking-wider shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>Inloggen als {selectedUser}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Close button if optional */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider cursor-pointer"
            >
              Annuleren
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
