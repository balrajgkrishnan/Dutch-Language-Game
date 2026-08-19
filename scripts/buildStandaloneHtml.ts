import fs from 'fs';
import path from 'path';
import { BIOMES, ALL_BIOME_ANIMALS } from '../src/data/biomeAnimals';
import { BIOME_LEVELS_GROEP_4_5 } from '../src/data/biomeLevels45';
import { BIOME_LEVELS_GROEP_6_8 } from '../src/data/biomeLevels68';
import { WERKWOORDEN_DATA } from '../src/data/werkwoorden';
import { INITIAL_BADGES } from '../src/data/gameData';

const biomesJson = JSON.stringify(BIOMES);
const animalsJson = JSON.stringify(ALL_BIOME_ANIMALS);
const levels45Json = JSON.stringify(BIOME_LEVELS_GROEP_4_5);
const levels68Json = JSON.stringify(BIOME_LEVELS_GROEP_6_8);
const werkwoordenJson = JSON.stringify(WERKWOORDEN_DATA);
const badgesJson = JSON.stringify(INITIAL_BADGES);

const htmlContent = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Boerin Tess & Het Safaripark • Nederlands Leren</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
    body {
      background-color: #f1f5f9;
      background-image: radial-gradient(#10b98115 1.5px, transparent 1.5px);
      background-size: 20px 20px;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 10px 40px;
      -webkit-tap-highlight-color: transparent;
    }
    @media (min-width: 640px) { body { padding: 16px 16px 48px; } }
    .app-container { width: 100%; max-width: 1024px; display: flex; flex-direction: column; gap: 12px; }
    
    /* Top Bar Card */
    .topbar-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid #d1fae5;
      border-radius: 24px;
      padding: 14px 20px;
      box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .avatar-btn {
      width: 48px; height: 48px; border-radius: 18px;
      background: linear-gradient(135deg, #10b981, #059669);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; border: 2px solid #fff; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
      cursor: pointer; transition: transform 0.15s; flex-shrink: 0;
    }
    .avatar-btn:hover { transform: scale(1.05); }
    .player-switch-btn {
      background: #ecfdf5; border: 1.5px solid #6ee7b7; color: #064e3b;
      padding: 4px 10px; border-radius: 12px; font-weight: 900; font-size: 13px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s;
    }
    .player-switch-btn:hover { background: #d1fae5; transform: translateY(-1px); }
    .wissel-tag { background: #059669; color: white; font-size: 9px; font-weight: 900; text-transform: uppercase; padding: 2px 6px; border-radius: 6px; }
    .grade-tag {
      background: #fef3c7; border: 1.5px solid #fcd34d; color: #92400e;
      font-size: 10px; font-weight: 900; text-transform: uppercase; padding: 3px 8px; border-radius: 10px;
    }
    .topbar-center { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .btn-scoreboard {
      background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none;
      padding: 8px 16px; border-radius: 14px; font-weight: 900; font-size: 12px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
      transition: all 0.15s;
    }
    .btn-scoreboard:hover { transform: translateY(-1px); filter: brightness(1.05); }
    .sound-btn {
      width: 36px; height: 36px; border-radius: 12px; border: 1.5px solid #a7f3d0;
      background: #ecfdf5; color: #065f46; font-size: 16px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.15s;
    }
    .sound-btn:hover { background: #d1fae5; }
    .topbar-stats { display: flex; align-items: center; gap: 14px; }
    .stat-item { display: flex; flex-direction: column; align-items: center; text-align: center; }
    .stat-item .lbl { font-size: 9px; font-weight: 900; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .stat-item .val { font-size: 16px; font-weight: 900; line-height: 1.2; display: flex; align-items: center; gap: 3px; }
    .val-score { color: #d97706; }
    .val-coins { color: #059669; }
    .val-streak { color: #ea580c; }

    /* Navigation Row */
    .nav-row {
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;
    }
    .nav-pills { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; }
    .nav-pill-btn {
      padding: 9px 16px; border-radius: 16px; border: 1.5px solid #e2e8f0; background: white;
      font-weight: 900; font-size: 13px; color: #475569; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .nav-pill-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
    .nav-pill-btn.active {
      background: #059669; color: white; border-color: #047857; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
    }
    .progress-pill {
      background: white; border: 1.5px solid #e2e8f0; padding: 6px 14px; border-radius: 14px;
      font-size: 11px; font-weight: 800; color: #475569; display: flex; align-items: center; gap: 8px;
    }
    .progress-bar-track {
      width: 70px; height: 7px; background: #e2e8f0; border-radius: 99px; overflow: hidden; display: inline-block;
    }
    .progress-bar-fill {
      height: 100%; background: linear-gradient(90deg, #10b981, #059669); border-radius: 99px; width: 2%; transition: width 0.3s;
    }

    /* Grade Switcher Bar */
    .grade-bar-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #d1fae5;
      border-radius: 22px;
      padding: 10px 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    }
    .grade-btn {
      padding: 8px 16px; border-radius: 16px; border: 1.5px solid #e2e8f0; background: #f8fafc;
      font-size: 12px; font-weight: 900; color: #475569; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.15s; text-align: left;
    }
    .grade-btn:hover { background: #f1f5f9; }
    .grade-btn.active-g45 {
      background: #059669; color: white; border-color: #047857; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
    }
    .grade-btn.active-g68 {
      background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border-color: #b45309; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
    }

    /* Biome Selector Deck */
    .biome-section {
      display: flex; flex-direction: column; gap: 6px;
    }
    .biome-deck {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    @media (min-width: 500px) { .biome-deck { grid-template-columns: repeat(4, 1fr); } }
    @media (min-width: 860px) { .biome-deck { grid-template-columns: repeat(7, 1fr); } }
    .biome-card-btn {
      background: rgba(255, 255, 255, 0.9);
      border: 1.5px solid #e2e8f0;
      border-radius: 18px;
      padding: 10px;
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: all 0.15s;
      position: relative;
      overflow: hidden;
    }
    .biome-card-btn:hover { background: white; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .biome-card-btn.active {
      background: white;
      border: 2px solid #10b981;
      box-shadow: 0 6px 16px -2px rgba(16, 185, 129, 0.2);
      transform: translateY(-2px);
    }
    .biome-card-btn.active::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #059669;
    }
    .biome-card-top { display: flex; justify-content: space-between; align-items: center; }
    .biome-card-emoji { font-size: 22px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.08)); }
    .biome-card-count { font-size: 9px; font-weight: 900; color: #475569; background: #f1f5f9; padding: 1px 5px; border-radius: 6px; }
    .biome-card-title { font-size: 11px; font-weight: 900; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
    .biome-card-sub { font-size: 8.5px; color: #64748b; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .biome-card-active-tag { font-size: 8.5px; color: #059669; font-weight: 900; margin-top: 2px; }

    /* Groep 6-7-8 Mode Switcher */
    .mode-bar-card {
      background: white; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 6px 12px;
      display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;
    }
    .mode-btn {
      padding: 6px 12px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc;
      font-size: 11px; font-weight: 900; text-transform: uppercase; cursor: pointer; transition: all 0.15s;
    }
    .mode-btn.active-exp { background: #059669; color: white; border-color: #047857; }
    .mode-btn.active-arena { background: #d97706; color: white; border-color: #b45309; }

    /* Story Dialogue Card */
    .story-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #d1fae5;
      border-radius: 24px;
      padding: 16px 20px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .story-card-hdr { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
    .story-card-body { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
    .story-chars { display: flex; align-items: center; gap: 8px; }
    .char-avatar-box {
      width: 54px; height: 54px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
      font-size: 28px; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); flex-shrink: 0;
    }
    .char-tess { background: linear-gradient(135deg, #a7f3d0, #6ee7b7); }
    .char-animal { background: linear-gradient(135deg, #fef3c7, #fde68a); cursor: pointer; transition: transform 0.15s; }
    .char-animal:hover { transform: scale(1.08); }
    .story-speech-bubble {
      flex: 1; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 12px 16px;
      font-size: 13.5px; color: #1e293b; line-height: 1.5; font-weight: 700;
    }
    .story-funfact {
      margin-top: 6px; font-size: 11.5px; color: #b45309; font-weight: 700; display: flex; align-items: center; gap: 4px;
    }

    /* Question Card */
    .question-card {
      background: white;
      border: 1.5px solid #e2e8f0;
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 8px 24px -4px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .q-top-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; }
    .q-badge {
      display: inline-flex; align-items: center; gap: 6px; background: #ecfdf5; color: #065f46;
      border: 1px solid #a7f3d0; font-size: 11px; font-weight: 900; text-transform: uppercase; padding: 4px 10px; border-radius: 10px;
    }
    .q-passage {
      background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 16px; padding: 12px 14px;
      font-size: 13px; color: #78350f; line-height: 1.5;
    }
    .q-text { font-size: 17px; font-weight: 800; color: #0f172a; line-height: 1.4; }
    .options-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    @media (min-width: 560px) { .options-grid { grid-template-columns: 1fr 1fr; } }
    .opt-btn {
      padding: 14px 16px; border-radius: 16px; border: 2px solid #e2e8f0; background: #f8fafc;
      font-size: 14.5px; font-weight: 800; color: #1e293b; cursor: pointer; text-align: left;
      transition: all 0.15s; display: flex; justify-content: space-between; align-items: center;
    }
    .opt-btn:hover:not(:disabled) { background: #f1f5f9; border-color: #cbd5e1; transform: translateY(-1px); }
    .opt-btn.correct { background: #ecfdf5; border-color: #10b981; color: #065f46; box-shadow: 0 4px 12px rgba(16,185,129,0.2); }
    .opt-btn.wrong { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
    
    .feedback-box {
      padding: 14px; border-radius: 16px; font-size: 13px; font-weight: 700; line-height: 1.5; display: none;
    }
    .feedback-box.correct { display: block; background: #ecfdf5; border: 1.5px solid #10b981; color: #065f46; }
    .feedback-box.wrong { display: block; background: #fef2f2; border: 1.5px solid #ef4444; color: #991b1b; }
    
    .btn-next-action {
      background: #059669; color: white; border: none; padding: 14px 24px; border-radius: 16px;
      font-size: 14px; font-weight: 900; text-transform: uppercase; cursor: pointer; transition: all 0.15s;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3); display: none; margin-top: 4px; text-align: center;
    }
    .btn-next-action:hover { background: #047857; }

    /* Sanctuary */
    .animals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
    .animal-card {
      background: white; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 14px; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }
    .animal-card.locked { opacity: 0.45; filter: grayscale(0.85); }
    .animal-emoji { font-size: 38px; }
    .animal-name { font-size: 12px; font-weight: 900; color: #0f172a; }
    .animal-hearts { color: #ef4444; font-size: 11px; font-weight: 900; }
    .btn-feed {
      margin-top: 4px; padding: 5px 12px; border-radius: 10px; font-size: 10.5px; font-weight: 900;
      background: #fef3c7; border: 1px solid #fcd34d; color: #92400e; cursor: pointer;
    }
    .btn-feed:hover { background: #fde68a; }

    /* Modals */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
      display: none; align-items: center; justify-content: center; z-index: 1000; padding: 16px;
    }
    .modal-box {
      background: white; border-radius: 28px; width: 100%; max-width: 480px; padding: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25); text-align: center; max-height: 90vh; overflow-y: auto;
    }
    .user-select-card {
      padding: 14px; border-radius: 18px; border: 2px solid #e2e8f0; background: #f8fafc;
      display: flex; align-items: center; justify-content: space-between; cursor: pointer; margin-bottom: 10px;
    }
    .user-select-card.active { border-color: #059669; background: #ecfdf5; }
    .input-field {
      width: 100%; padding: 12px 14px; border: 1.5px solid #cbd5e1; border-radius: 14px;
      font-size: 14px; font-weight: 700; margin-top: 6px; margin-bottom: 12px;
    }
    .btn-primary {
      width: 100%; padding: 12px; background: #059669; color: white; border: none;
      border-radius: 16px; font-size: 14px; font-weight: 900; cursor: pointer; text-transform: uppercase;
    }
    .btn-primary:hover { background: #047857; }
  </style>
</head>
<body>

  <div class="app-container">
    
    <!-- 1. TOP NAVBAR -->
    <header class="topbar-card">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div id="avatarBtn" class="avatar-btn" onclick="openLoginModal()" title="Wissel van speler">👧</div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button id="playerSwitchBtn" class="player-switch-btn" onclick="openLoginModal()">
              <span>👤 <span id="playerNameDisplay">Hemali</span></span>
              <span class="wissel-tag">Wissel</span>
            </button>
            <span class="grade-tag" id="gradeBadgeDisplay">Groep 6-7-8</span>
          </div>
          <div style="font-size: 11px; color: #64748b; font-weight: 700; margin-top: 3px;" id="playerSubDisplay">
            De Dierenredder • <span id="unlockedCountDisplay">1</span>/42 Dieren vrijgespeeld
          </div>
        </div>
      </div>

      <div class="topbar-center">
        <button class="btn-scoreboard" onclick="openScoreboardModal()">
          <span>📊</span>
          <span>Ouder Scorebord</span>
        </button>
        <button class="sound-btn" id="soundBtn" onclick="toggleSound()" title="Geluid Aan/Uit">
          🔊
        </button>
      </div>

      <div class="topbar-stats">
        <div class="stat-item">
          <span class="lbl">Score</span>
          <span class="val val-score" id="scoreDisplay">0 🌟</span>
        </div>
        <div class="stat-item">
          <span class="lbl">Munten</span>
          <span class="val val-coins" id="coinsDisplay">50 🪙</span>
        </div>
        <div class="stat-item">
          <span class="lbl">Reeks</span>
          <span class="val val-streak" id="streakDisplay">0 🔥</span>
        </div>
      </div>
    </header>

    <!-- 2. MAIN TABS & PROGRESS -->
    <div class="nav-row">
      <div class="nav-pills">
        <button class="nav-pill-btn active" id="tabAdventure" onclick="switchTab('adventure')">
          🧭 Taal Avontuur
        </button>
        <button class="nav-pill-btn" id="tabSanctuary" onclick="switchTab('sanctuary')">
          🏡 Dierenpark (<span id="sanctuaryTabCount">1</span>/42)
        </button>
        <button class="nav-pill-btn" id="tabBadges" onclick="switchTab('badges')">
          🏆 Medailles
        </button>
      </div>

      <div class="progress-pill">
        <span>Wereldcollectie:</span>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="progressBarFill"></div>
        </div>
        <span id="progressPercentDisplay">2%</span>
      </div>
    </div>

    <!-- 3. GRADE SELECTOR BAR -->
    <div class="grade-bar-card">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 32px; height: 32px; border-radius: 10px; background: #fef3c7; color: #92400e; display: flex; align-items: center; justify-content: center; font-size: 16px;">
          🎓
        </div>
        <div>
          <div style="font-size: 11.5px; font-weight: 900; text-transform: uppercase; color: #1e293b;">
            Kies Je Leerjaar / Niveau:
          </div>
          <div style="font-size: 10px; color: #64748b; font-weight: 600;">
            Beide niveaus bevatten alle 7 werelden &amp; 42 dieren!
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 8px;">
        <button id="btnGrade45" class="grade-btn" onclick="selectGrade('group_4_5')">
          <span>📖</span>
          <div>
            <div>Groep 4 - 5</div>
            <div style="font-size: 8.5px; opacity: 0.85; font-weight: 600;">Basis Spelling &amp; Begrip</div>
          </div>
        </button>
        <button id="btnGrade68" class="grade-btn active-g68" onclick="selectGrade('group_6_7_8')">
          <span>⚡</span>
          <div>
            <div>Groep 6 - 7 - 8</div>
            <div style="font-size: 8.5px; opacity: 0.85; font-weight: 600;">Werkwoorden &amp; Moeilijke Spelling</div>
          </div>
        </button>
      </div>
    </div>

    <!-- 4. 7 BIOMES SELECTOR -->
    <div class="biome-section">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 4px;">
        <span style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #065f46;">
          🌍 Reis Rond De Wereld:
        </span>
        <span style="font-size: 10.5px; font-weight: 800; color: #065f46; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 99px;">
          7 Wereldlocaties (42 Dieren) 🌍
        </span>
      </div>
      <div class="biome-deck" id="biomesDeck"></div>
    </div>

    <!-- 5. GROEP 6-7-8 SUB-MODE BAR -->
    <div id="groep68ModeBar" class="mode-bar-card" style="display: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 14px;">⚡</span>
        <span style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #1e293b;">
          Groep 6-7-8 Modus:
        </span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button id="btnExpMode" class="mode-btn active-exp" onclick="selectGroep68Mode('expedition')">
          🍃 Expeditie
        </button>
        <button id="btnArenaMode" class="mode-btn" onclick="selectGroep68Mode('arena')">
          ⚡ Sterke Werkwoorden Arena (100+)
        </button>
      </div>
    </div>

    <!-- 6. ADVENTURE VIEW -->
    <div id="adventureView" style="display: flex; flex-direction: column; gap: 12px;">
      
      <!-- Story & Dialogue Card -->
      <div class="story-card">
        <div class="story-card-hdr">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span id="storyBiomeBadge" style="font-size: 11px; font-weight: 900; text-transform: uppercase; padding: 4px 10px; border-radius: 99px; color: white; background: #059669;">
              🚜 Boerderij
            </span>
            <span id="storyLevelBadge" style="font-size: 11px; font-weight: 800; color: #475569; background: #f1f5f9; padding: 4px 10px; border-radius: 99px; border: 1px solid #e2e8f0;">
              Level 1: Bella de Koe
            </span>
          </div>
          <button onclick="readStoryAloud()" style="display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; font-weight: 900; color: #065f46; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 99px; cursor: pointer;">
            <span>🔊</span>
            <span>Lees Voor</span>
          </button>
        </div>

        <div class="story-card-body">
          <div class="story-chars">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div class="char-avatar-box char-tess">👩‍🌾</div>
              <span style="font-size: 9px; font-weight: 900; color: #065f46; text-transform: uppercase; margin-top: 2px;">Boerin Tess</span>
            </div>
            <span style="color: #cbd5e1; font-weight: 900;">❤️</span>
            <div style="display: flex; flex-direction: column; align-items: center;" onclick="petAnimal()" title="Klik om te aaien!">
              <div class="char-avatar-box char-animal" id="targetAnimalAvatar">🐮</div>
              <span style="font-size: 9px; font-weight: 900; color: #b45309; text-transform: uppercase; margin-top: 2px;" id="targetAnimalShortName">Bella ✨</span>
            </div>
          </div>

          <div class="story-speech-bubble">
            <div id="storyDialogueText">"Welkom op de boerderij! Laten we samen leuke taalvragen oplossen!"</div>
            <div class="story-funfact" id="storyFunFactText">💡 <b>Wist je dat:</b> Koeien hebben vier magen en kunnen vers gras van 10 kilometer ver ruiken!</div>
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="question-card" id="questionCard">
        <div class="q-top-row">
          <span class="q-badge" id="qCategoryBadge">🐮 Klinkers & Klanken</span>
          <span style="font-size: 11px; font-weight: 800; color: #64748b;" id="qIndexBadge">Vraag 1 van 3</span>
        </div>

        <div class="q-passage" id="qPassageBox" style="display: none;"></div>

        <div class="q-text" id="qQuestionText"></div>

        <div class="options-grid" id="optionsGrid"></div>

        <div class="feedback-box" id="feedbackBox"></div>

        <button class="btn-next-action" id="btnNext" onclick="nextQuestion()">Volgende Vraag ➔</button>
      </div>

    </div>

    <!-- 7. SANCTUARY VIEW -->
    <div id="sanctuaryView" class="question-card" style="display: none;">
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 18px; font-weight: 900; color: #0f172a;">🏡 Het Grote Dierenpark (42 Dieren)</h3>
        <p style="font-size: 12px; color: #64748b;">Voer je geredde dieren met munten (🪙) om hartjes (❤️) te verdienen!</p>
      </div>
      <div class="animals-grid" id="sanctuaryGrid"></div>
    </div>

    <!-- 8. BADGES VIEW -->
    <div id="badgesView" class="question-card" style="display: none;">
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 18px; font-weight: 900; color: #0f172a;">🏆 Taal Medailles &amp; Trofeeën</h3>
        <p style="font-size: 12px; color: #64748b;">Verdien speciale medailles door vragen goed te beantwoorden en dieren te voeren!</p>
      </div>
      <div class="animals-grid" id="badgesGrid"></div>
    </div>

  </div>

  <!-- LOGIN / SWITCH USER MODAL -->
  <div class="modal-overlay" id="loginModal">
    <div class="modal-box">
      <div style="font-size: 38px; margin-bottom: 6px;">👑</div>
      <h3 style="font-size: 20px; font-weight: 900; color: #0f172a;">Wie Gaat Er Spelen?</h3>
      <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Kies je eigen profiel zodat je voortgang netjes bewaard blijft:</p>

      <div class="user-select-card" id="userCardHemali" onclick="selectLoginUser('hemali')">
        <div style="display: flex; align-items: center; gap: 10px; text-align: left;">
          <div style="font-size: 28px;">👧</div>
          <div>
            <div style="font-size: 14px; font-weight: 900;">Hemali</div>
            <div style="font-size: 10px; color: #d97706; font-weight: 700;">Groep 6-7-8</div>
          </div>
        </div>
        <span style="font-size: 12px; font-weight: 900; color: #059669;">Big2014!</span>
      </div>

      <div class="user-select-card" id="userCardRidheya" onclick="selectLoginUser('ridheya')">
        <div style="display: flex; align-items: center; gap: 10px; text-align: left;">
          <div style="font-size: 28px;">👩‍🌾</div>
          <div>
            <div style="font-size: 14px; font-weight: 900;">Ridheya</div>
            <div style="font-size: 10px; color: #059669; font-weight: 700;">Groep 4-5</div>
          </div>
        </div>
        <span style="font-size: 12px; font-weight: 900; color: #059669;">Small2018!</span>
      </div>

      <div style="text-align: left; margin-top: 10px;">
        <label style="font-size: 11px; font-weight: 800; color: #475569;" id="passLabel">Wachtwoord:</label>
        <input type="password" id="loginPasswordInput" class="input-field" placeholder="Voer wachtwoord in..." />
      </div>

      <div id="loginError" style="font-size: 11px; color: #dc2626; font-weight: 800; margin-bottom: 10px; display: none;"></div>

      <button class="btn-primary" onclick="submitLogin()">Inloggen ➔</button>
      <button onclick="closeLoginModal()" style="margin-top: 10px; background: none; border: none; color: #94a3b8; font-size: 12px; font-weight: 700; cursor: pointer;">Sluiten</button>
    </div>
  </div>

  <!-- SCOREBOARD MODAL -->
  <div class="modal-overlay" id="scoreboardModal">
    <div class="modal-box" style="max-width: 580px; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 28px;">📊</div>
          <div>
            <h3 style="font-size: 18px; font-weight: 900; color: #0f172a;">Ouder Scorebord</h3>
            <p style="font-size: 11px; color: #64748b;">Voortgang van Hemali &amp; Ridheya</p>
          </div>
        </div>
        <button onclick="closeScoreboardModal()" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #64748b;">✖</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
        <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 16px; padding: 12px;">
          <div style="font-size: 14px; font-weight: 900; color: #92400e;">👧 Hemali (Gr 6-8)</div>
          <div style="font-size: 12px; font-weight: 700; color: #78350f; margin-top: 4px;" id="sbHemaliScore">Sterren: 0 • Dieren: 1/42</div>
          <div style="font-size: 11px; color: #b45309;" id="sbHemaliAccuracy">Nauwkeurigheid: 0%</div>
        </div>
        <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 16px; padding: 12px;">
          <div style="font-size: 14px; font-weight: 900; color: #065f46;">👩‍🌾 Ridheya (Gr 4-5)</div>
          <div style="font-size: 12px; font-weight: 700; color: #047857; margin-top: 4px;" id="sbRidheyaScore">Sterren: 0 • Dieren: 1/42</div>
          <div style="font-size: 11px; color: #059669;" id="sbRidheyaAccuracy">Nauwkeurigheid: 0%</div>
        </div>
      </div>

      <div style="font-size: 12px; font-weight: 900; color: #1e293b; margin-bottom: 8px;">Recente Vragen Activiteitenlogboek:</div>
      <div id="activityLogsList" style="max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;"></div>
    </div>
  </div>

  <!-- EMBEDDED COMPLETE DATA BANKS -->
  <script>
    const BIOMES = ${biomesJson};
    const ALL_ANIMALS = ${animalsJson};
    const LEVELS_45 = ${levels45Json};
    const LEVELS_68 = ${levels68Json};
    const WERKWOORDEN = ${werkwoordenJson};
    const BADGES = ${badgesJson};

    const USERS = {
      hemali: {
        username: 'Hemali',
        avatarEmoji: '👧',
        title: 'De Dierenredder',
        defaultGrade: 'group_6_7_8',
        password: 'Big2014!',
        score: 0,
        coins: 50,
        streak: 0,
        unlocked: ['bella-koe'],
        hearts: { 'bella-koe': 1 },
        biomeProgress: { farm: 0, safari: 0, sea: 0, snow: 0, jungle: 0, outback: 0, mountain: 0 },
        totalAnswered: 0,
        totalCorrect: 0
      },
      ridheya: {
        username: 'Ridheya',
        avatarEmoji: '👩‍🌾',
        title: 'De Boerderijheld',
        defaultGrade: 'group_4_5',
        password: 'Small2018!',
        score: 0,
        coins: 50,
        streak: 0,
        unlocked: ['bella-koe'],
        hearts: { 'bella-koe': 1 },
        biomeProgress: { farm: 0, safari: 0, sea: 0, snow: 0, jungle: 0, outback: 0, mountain: 0 },
        totalAnswered: 0,
        totalCorrect: 0
      }
    };

    let currentUserKey = 'hemali';
    let selectedLoginKey = 'hemali';
    let selectedBiome = 'farm';
    let selectedGrade = 'group_6_7_8';
    let currentGroep68Mode = 'expedition';
    let currentQIndex = 0;
    let currentVerbIndex = 0;
    let isAnswered = false;
    let isSoundOn = true;
    let activityLogs = [];

    function toggleSound() {
      isSoundOn = !isSoundOn;
      document.getElementById('soundBtn').textContent = isSoundOn ? '🔊' : '🔇';
    }

    function playAudio(type) {
      if (!isSoundOn) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'correct') {
          osc.frequency.setValueAtTime(523.25, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'wrong') {
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else {
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        }
      } catch(e) {}
    }

    function readStoryAloud() {
      if (!isSoundOn) return;
      const text = document.getElementById('storyDialogueText').textContent;
      const funFact = document.getElementById('storyFunFactText').textContent;
      speakDutch(text + '. ' + funFact);
    }

    function speakDutch(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'nl-NL';
        window.speechSynthesis.speak(u);
      }
    }

    function init() {
      try {
        const saved = localStorage.getItem('boerin_tess_offline_v4');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.users) Object.assign(USERS, parsed.users);
          if (parsed.currentUserKey) currentUserKey = parsed.currentUserKey;
          if (parsed.activityLogs) activityLogs = parsed.activityLogs;
        }
      } catch(e) {}

      applyUser(currentUserKey);
      renderBiomesDeck();
      renderCurrentLevel();
    }

    function saveState() {
      try {
        localStorage.setItem('boerin_tess_offline_v4', JSON.stringify({
          users: USERS,
          currentUserKey,
          activityLogs
        }));
      } catch(e) {}
    }

    function applyUser(key) {
      currentUserKey = key;
      const u = USERS[key];
      selectedGrade = u.defaultGrade || 'group_6_7_8';
      document.getElementById('playerNameDisplay').textContent = u.username;
      document.getElementById('avatarBtn').textContent = u.avatarEmoji;
      document.getElementById('scoreDisplay').textContent = u.score + ' 🌟';
      document.getElementById('coinsDisplay').textContent = u.coins + ' 🪙';
      document.getElementById('streakDisplay').textContent = u.streak + ' 🔥';
      document.getElementById('unlockedCountDisplay').textContent = u.unlocked.length;
      document.getElementById('sanctuaryTabCount').textContent = u.unlocked.length;
      document.getElementById('gradeBadgeDisplay').textContent = selectedGrade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8';
      
      const pct = Math.min(100, Math.round((u.unlocked.length / ALL_ANIMALS.length) * 100));
      document.getElementById('progressPercentDisplay').textContent = pct + '%';
      document.getElementById('progressBarFill').style.width = pct + '%';

      document.getElementById('btnGrade45').className = 'grade-btn ' + (selectedGrade === 'group_4_5' ? 'active-g45' : '');
      document.getElementById('btnGrade68').className = 'grade-btn ' + (selectedGrade === 'group_6_7_8' ? 'active-g68' : '');
      document.getElementById('groep68ModeBar').style.display = selectedGrade === 'group_6_7_8' ? 'flex' : 'none';

      currentQIndex = 0;
      isAnswered = false;
      renderBiomesDeck();
      renderCurrentLevel();
      renderSanctuary();
      renderBadges();
    }

    function selectGrade(grade) {
      selectedGrade = grade;
      USERS[currentUserKey].defaultGrade = grade;
      document.getElementById('btnGrade45').className = 'grade-btn ' + (selectedGrade === 'group_4_5' ? 'active-g45' : '');
      document.getElementById('btnGrade68').className = 'grade-btn ' + (selectedGrade === 'group_6_7_8' ? 'active-g68' : '');
      document.getElementById('gradeBadgeDisplay').textContent = selectedGrade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8';
      document.getElementById('groep68ModeBar').style.display = selectedGrade === 'group_6_7_8' ? 'flex' : 'none';
      currentQIndex = 0;
      isAnswered = false;
      renderCurrentLevel();
      saveState();
    }

    function selectGroep68Mode(mode) {
      currentGroep68Mode = mode;
      document.getElementById('btnExpMode').className = 'mode-btn ' + (mode === 'expedition' ? 'active-exp' : '');
      document.getElementById('btnArenaMode').className = 'mode-btn ' + (mode === 'arena' ? 'active-arena' : '');
      currentQIndex = 0;
      isAnswered = false;
      renderCurrentLevel();
    }

    function renderBiomesDeck() {
      const container = document.getElementById('biomesDeck');
      container.innerHTML = '';
      const u = USERS[currentUserKey];
      BIOMES.forEach(b => {
        const isSel = b.id === selectedBiome;
        const count = ALL_ANIMALS.filter(a => a.biome === b.id && u.unlocked.includes(a.id)).length;
        const total = ALL_ANIMALS.filter(a => a.biome === b.id).length;
        
        const btn = document.createElement('button');
        btn.className = 'biome-card-btn ' + (isSel ? 'active' : '');
        btn.onclick = () => {
          selectedBiome = b.id;
          currentQIndex = 0;
          isAnswered = false;
          playAudio('pop');
          renderBiomesDeck();
          renderCurrentLevel();
        };
        btn.innerHTML = \`
          <div class="biome-card-top">
            <span class="biome-card-emoji">\${b.emoji}</span>
            <span class="biome-card-count">\${count}/\${total}</span>
          </div>
          <div class="biome-card-title">\${b.name}</div>
          <div class="biome-card-sub">\${b.subtitle.split(',')[0]}</div>
          \${isSel ? '<div class="biome-card-active-tag">● Actief</div>' : ''}
        \`;
        container.appendChild(btn);
      });
    }

    function getCurrentLevels() {
      return selectedGrade === 'group_4_5' ? LEVELS_45[selectedBiome] : LEVELS_68[selectedBiome];
    }

    function renderCurrentLevel() {
      const bInfo = BIOMES.find(b => b.id === selectedBiome) || BIOMES[0];
      const levels = getCurrentLevels() || LEVELS_45.farm;
      const u = USERS[currentUserKey];
      if (!u.biomeProgress) u.biomeProgress = { farm: 0, safari: 0, sea: 0, snow: 0, jungle: 0, outback: 0, mountain: 0 };
      const levelIdx = (u.biomeProgress[selectedBiome] || 0) % levels.length;
      const level = levels[levelIdx];
      const animal = level.animalReward;

      // Update story dialogue card
      document.getElementById('storyBiomeBadge').textContent = bInfo.emoji + ' ' + bInfo.name;
      document.getElementById('storyBiomeBadge').style.background = bInfo.accentColor || '#059669';
      document.getElementById('storyLevelBadge').textContent = 'Level ' + (levelIdx + 1) + ': ' + animal.name;
      document.getElementById('targetAnimalAvatar').textContent = animal.emoji;
      document.getElementById('targetAnimalShortName').textContent = animal.name.split(' ')[0] + ' ✨';

      if (level.introStory) {
        document.getElementById('storyDialogueText').textContent = '"' + level.introStory + '"';
      } else {
        document.getElementById('storyDialogueText').textContent = '"In ' + bInfo.name + ' gaan we aan de slag met ' + level.theme + '! Help jij mee?"';
      }
      document.getElementById('storyFunFactText').innerHTML = '💡 <b>Wist je dat:</b> ' + (animal.funFact || 'Dieren zijn dol op taalavonturen!');

      // If Arena mode in Gr 6-8
      if (selectedGrade === 'group_6_7_8' && currentGroep68Mode === 'arena') {
        renderArenaQuestion();
        return;
      }

      // Normal expedition questions
      const questions = level.questions;
      const q = questions[currentQIndex % questions.length];

      document.getElementById('qCategoryBadge').textContent = animal.emoji + ' ' + q.category;
      document.getElementById('qIndexBadge').textContent = 'Vraag ' + (currentQIndex + 1) + ' van ' + questions.length;

      const passageBox = document.getElementById('qPassageBox');
      if (q.passage) {
        passageBox.style.display = 'block';
        passageBox.textContent = q.passage;
      } else {
        passageBox.style.display = 'none';
      }

      document.getElementById('qQuestionText').textContent = q.question;

      const optionsGrid = document.getElementById('optionsGrid');
      optionsGrid.innerHTML = '';
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(idx, q);
        optionsGrid.appendChild(btn);
      });

      document.getElementById('feedbackBox').style.display = 'none';
      document.getElementById('btnNext').style.display = 'none';
      isAnswered = false;
    }

    function renderArenaQuestion() {
      const verb = WERKWOORDEN[currentVerbIndex % WERKWOORDEN.length] || WERKWOORDEN[0];
      document.getElementById('qCategoryBadge').textContent = '⚡ Sterke Werkwoorden Arena';
      document.getElementById('qIndexBadge').textContent = 'Werkwoord ' + (currentVerbIndex + 1) + ' van ' + WERKWOORDEN.length;
      document.getElementById('qPassageBox').style.display = 'block';
      document.getElementById('qPassageBox').innerHTML = '<b>Hele werkwoord:</b> <i>' + verb.infinitive + '</i> (' + verb.ruleExplanation + ')';
      
      const qData = {
        question: 'Vul de juiste vorm in: "' + verb.sampleSentence.replace(verb.pastSingular, '___') + '"',
        options: [verb.pastSingular, verb.pastPlural, verb.presentSingular, verb.pastParticiple].filter((v, i, a) => a.indexOf(v) === i),
        correctOptionIndex: 0,
        hint: verb.ruleExplanation
      };

      document.getElementById('qQuestionText').textContent = qData.question;
      const optionsGrid = document.getElementById('optionsGrid');
      optionsGrid.innerHTML = '';
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(idx, qData);
        optionsGrid.appendChild(btn);
      });

      document.getElementById('feedbackBox').style.display = 'none';
      document.getElementById('btnNext').style.display = 'none';
      isAnswered = false;
    }

    function handleAnswer(selectedIdx, q) {
      if (isAnswered) return;
      isAnswered = true;
      const isCorrect = selectedIdx === q.correctOptionIndex;
      const optionsGrid = document.getElementById('optionsGrid');
      const buttons = optionsGrid.querySelectorAll('.opt-btn');
      const feedbackBox = document.getElementById('feedbackBox');
      const u = USERS[currentUserKey];

      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correctOptionIndex) btn.classList.add('correct');
        else if (idx === selectedIdx) btn.classList.add('wrong');
      });

      u.totalAnswered += 1;

      if (isCorrect) {
        playAudio('correct');
        u.streak += 1;
        u.score += 15;
        u.coins += 10;
        u.totalCorrect += 1;
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.innerHTML = '🎉 <b>Fantastisch gedaan!</b> ' + (q.hint || q.explanation || 'Helemaal juist beantwoord!');
        if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 70 });
      } else {
        playAudio('wrong');
        u.streak = 0;
        feedbackBox.className = 'feedback-box wrong';
        feedbackBox.innerHTML = '💡 <b>Bijna!</b> ' + (q.hint || q.explanation || 'Let goed op de spellingregel.');
      }

      activityLogs.unshift({
        time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
        user: u.username,
        question: q.question,
        correct: isCorrect,
        biome: selectedBiome
      });
      if (activityLogs.length > 50) activityLogs.pop();

      document.getElementById('scoreDisplay').textContent = u.score + ' 🌟';
      document.getElementById('coinsDisplay').textContent = u.coins + ' 🪙';
      document.getElementById('streakDisplay').textContent = u.streak + ' 🔥';
      document.getElementById('btnNext').style.display = 'block';

      saveState();
    }

    function nextQuestion() {
      if (selectedGrade === 'group_6_7_8' && currentGroep68Mode === 'arena') {
        currentVerbIndex += 1;
        isAnswered = false;
        renderCurrentLevel();
        return;
      }

      const levels = getCurrentLevels() || LEVELS_45.farm;
      const u = USERS[currentUserKey];
      const levelIdx = (u.biomeProgress[selectedBiome] || 0) % levels.length;
      const level = levels[levelIdx];
      const questions = level.questions;

      if (currentQIndex >= questions.length - 1) {
        const animal = level.animalReward;
        if (!u.unlocked.includes(animal.id)) {
          u.unlocked.push(animal.id);
          u.coins += 50;
          u.score += 50;
          playAudio('correct');
          if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
          alert('🌟 GEFELICITEERD! Je hebt ' + animal.name + ' (' + animal.emoji + ') ontgrendeld voor je Dierenpark!');
        }
        u.biomeProgress[selectedBiome] = (levelIdx + 1) % levels.length;
        currentQIndex = 0;
        renderBiomesDeck();
        renderSanctuary();
      } else {
        currentQIndex += 1;
      }
      isAnswered = false;
      renderCurrentLevel();
      saveState();
    }

    function petAnimal() {
      const u = USERS[currentUserKey];
      u.score += 5;
      playAudio('correct');
      document.getElementById('scoreDisplay').textContent = u.score + ' 🌟';
      if (typeof confetti === 'function') confetti({ particleCount: 20, spread: 40 });
      saveState();
    }

    function switchTab(tab) {
      document.getElementById('tabAdventure').className = 'nav-pill-btn ' + (tab === 'adventure' ? 'active' : '');
      document.getElementById('tabSanctuary').className = 'nav-pill-btn ' + (tab === 'sanctuary' ? 'active' : '');
      document.getElementById('tabBadges').className = 'nav-pill-btn ' + (tab === 'badges' ? 'active' : '');

      document.getElementById('adventureView').style.display = tab === 'adventure' ? 'flex' : 'none';
      document.getElementById('sanctuaryView').style.display = tab === 'sanctuary' ? 'block' : 'none';
      document.getElementById('badgesView').style.display = tab === 'badges' ? 'block' : 'none';
    }

    function renderSanctuary() {
      const grid = document.getElementById('sanctuaryGrid');
      grid.innerHTML = '';
      const u = USERS[currentUserKey];
      ALL_ANIMALS.forEach(a => {
        const isUnlocked = u.unlocked.includes(a.id);
        const hearts = u.hearts[a.id] || 0;
        const card = document.createElement('div');
        card.className = 'animal-card ' + (isUnlocked ? '' : 'locked');
        card.innerHTML = \`
          <div class="animal-emoji">\${a.emoji}</div>
          <div class="animal-name">\${a.name}</div>
          <div class="animal-hearts">\${'❤️'.repeat(Math.max(1, hearts))}</div>
          \${isUnlocked ? \`<button class="btn-feed" onclick="feedAnimal('\${a.id}')">Voeren (20🪙)</button>\` : '<span style="font-size:10px; color:#94a3b8;">Nog opsluiten</span>'}
        \`;
        grid.appendChild(card);
      });
      document.getElementById('unlockedCountDisplay').textContent = u.unlocked.length;
      document.getElementById('sanctuaryTabCount').textContent = u.unlocked.length;
    }

    function feedAnimal(id) {
      const u = USERS[currentUserKey];
      if (u.coins < 20) {
        alert('Niet genoeg munten! Beantwoord vragen om munten te verdienen.');
        return;
      }
      u.coins -= 20;
      u.score += 10;
      u.hearts[id] = Math.min(5, (u.hearts[id] || 1) + 1);
      playAudio('correct');
      document.getElementById('coinsDisplay').textContent = u.coins + ' 🪙';
      document.getElementById('scoreDisplay').textContent = u.score + ' 🌟';
      renderSanctuary();
      saveState();
    }

    function renderBadges() {
      const grid = document.getElementById('badgesGrid');
      grid.innerHTML = '';
      BADGES.forEach(b => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.innerHTML = \`
          <div class="animal-emoji">\${b.emoji}</div>
          <div class="animal-name">\${b.name}</div>
          <div style="font-size:10px; color:#64748b;">\${b.description}</div>
        \`;
        grid.appendChild(card);
      });
    }

    /* Modal controls */
    function openLoginModal() {
      document.getElementById('loginModal').style.display = 'flex';
      selectLoginUser(currentUserKey);
    }
    function closeLoginModal() {
      document.getElementById('loginModal').style.display = 'none';
    }
    function selectLoginUser(key) {
      selectedLoginKey = key;
      document.getElementById('userCardHemali').className = 'user-select-card ' + (key === 'hemali' ? 'active' : '');
      document.getElementById('userCardRidheya').className = 'user-select-card ' + (key === 'ridheya' ? 'active' : '');
      document.getElementById('passLabel').textContent = 'Wachtwoord voor ' + USERS[key].username + ' (Hint: ' + USERS[key].password + '):';
      document.getElementById('loginPasswordInput').value = '';
      document.getElementById('loginError').style.display = 'none';
    }
    function submitLogin() {
      const entered = document.getElementById('loginPasswordInput').value;
      const target = USERS[selectedLoginKey];
      if (entered.trim() === target.password || entered.trim() === target.password.toLowerCase()) {
        closeLoginModal();
        applyUser(selectedLoginKey);
        saveState();
        playAudio('correct');
      } else {
        document.getElementById('loginError').textContent = 'Onjuist wachtwoord voor ' + target.username;
        document.getElementById('loginError').style.display = 'block';
        playAudio('wrong');
      }
    }

    function openScoreboardModal() {
      document.getElementById('scoreboardModal').style.display = 'flex';
      const h = USERS.hemali;
      const r = USERS.ridheya;
      document.getElementById('sbHemaliScore').textContent = 'Sterren: ' + h.score + ' • Dieren: ' + h.unlocked.length + '/42';
      document.getElementById('sbHemaliAccuracy').textContent = 'Nauwkeurigheid: ' + (h.totalAnswered > 0 ? Math.round((h.totalCorrect/h.totalAnswered)*100) : 0) + '% (' + h.totalCorrect + '/' + h.totalAnswered + ')';
      document.getElementById('sbRidheyaScore').textContent = 'Sterren: ' + r.score + ' • Dieren: ' + r.unlocked.length + '/42';
      document.getElementById('sbRidheyaAccuracy').textContent = 'Nauwkeurigheid: ' + (r.totalAnswered > 0 ? Math.round((r.totalCorrect/r.totalAnswered)*100) : 0) + '% (' + r.totalCorrect + '/' + r.totalAnswered + ')';

      const logsList = document.getElementById('activityLogsList');
      logsList.innerHTML = '';
      if (activityLogs.length === 0) {
        logsList.innerHTML = '<div style="font-size:11px; color:#94a3b8;">Nog geen vragen beantwoord.</div>';
      } else {
        activityLogs.slice(0, 15).forEach(l => {
          const item = document.createElement('div');
          item.style.cssText = 'font-size:11px; padding:6px 10px; border-radius:8px; display:flex; justify-content:space-between; background:' + (l.correct ? '#ecfdf5' : '#fef2f2');
          item.innerHTML = '<span><b>' + l.user + '</b> (' + l.time + '): ' + l.question.substring(0, 35) + '...</span><span style="font-weight:900;">' + (l.correct ? '✅ Goed' : '❌ Fout') + '</span>';
          logsList.appendChild(item);
        });
      }
    }
    function closeScoreboardModal() {
      document.getElementById('scoreboardModal').style.display = 'none';
    }

    // Launch
    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>`;

const outputPath = path.join(process.cwd(), 'public', 'boerin_tess_safari.html');
fs.writeFileSync(outputPath, htmlContent, 'utf-8');
console.log('Successfully generated pixel-perfect public/boerin_tess_safari.html!');
