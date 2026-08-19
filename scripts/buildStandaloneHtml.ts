import fs from 'fs';
import path from 'path';
import { BIOMES, ALL_BIOME_ANIMALS } from '../src/data/biomeData';
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
  <title>Boerin Tess & Wereld Safari • Nederlands Leren (Hemali & Ridheya)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
    :root {
      --bg-cream: #F0FDF4;
      --charcoal: #0F172A;
      --primary-green: #059669;
      --primary-green-dark: #047857;
      --accent-orange: #D97706;
      --indigo: #4F46E5;
      --light-green: #ECFDF5;
      --border-subtle: #E2E8F0;
    }
    body {
      background-color: #F8FAFC;
      background-image: radial-gradient(#10B98118 1.5px, transparent 1.5px);
      background-size: 24px 24px;
      color: var(--charcoal);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px;
      -webkit-tap-highlight-color: transparent;
    }
    @media (min-width: 640px) { body { padding: 20px; } }
    .app-container { width: 100%; max-width: 980px; display: flex; flex-direction: column; gap: 14px; }
    .glass-card {
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 24px;
      box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      padding: 16px 20px;
    }
    .top-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; }
    .brand-section { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .avatar-btn {
      width: 48px; height: 48px; border-radius: 16px;
      background: linear-gradient(135deg, #10B981, #059669);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
      cursor: pointer; border: 2px solid #fff; transition: transform 0.2s;
    }
    .avatar-btn:hover { transform: scale(1.05); }
    .player-switch-pill {
      background: #ECFDF5; border: 1.5px solid #6EE7B7; color: #064E3B;
      padding: 6px 12px; border-radius: 14px; font-weight: 900; font-size: 14px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;
    }
    .player-switch-pill:hover { background: #D1FAE5; transform: translateY(-1px); }
    .wissel-badge { background: #059669; color: white; font-size: 9px; font-weight: 900; text-transform: uppercase; padding: 2px 6px; border-radius: 6px; }
    .grade-pill-tag {
      background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E;
      font-size: 10px; font-weight: 900; text-transform: uppercase; padding: 4px 8px; border-radius: 10px;
    }
    .header-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .btn-scoreboard-hdr {
      background: #4F46E5; color: white; border: 1.5px solid #818CF8;
      padding: 6px 12px; border-radius: 14px; font-weight: 900; font-size: 12px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.25);
    }
    .btn-scoreboard-hdr:hover { background: #4338CA; }
    .stat-pill {
      background: #F1F5F9; border: 1px solid #E2E8F0; padding: 6px 12px; border-radius: 14px;
      display: flex; flex-direction: column; align-items: center; min-width: 62px;
    }
    .stat-pill .label { font-size: 9px; font-weight: 900; text-transform: uppercase; color: #64748B; }
    .stat-pill .value { font-size: 14px; font-weight: 900; color: #0F172A; }
    .stat-pill.stars .value { color: #D97706; }
    .stat-pill.streak .value { color: #EA580C; }
    .nav-tabs { display: flex; gap: 8px; width: 100%; overflow-x: auto; padding-bottom: 4px; }
    .nav-tab-btn {
      flex: 1; min-width: 130px; padding: 10px 14px; border-radius: 16px; border: 1px solid #E2E8F0;
      background: white; font-weight: 900; font-size: 13px; color: #475569; cursor: pointer; text-align: center;
      transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .nav-tab-btn.active {
      background: #059669; color: white; border-color: #047857; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
    }
    .grade-bar {
      display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px;
      border: 2px solid #10B98133; background: linear-gradient(to right, #ECFDF5, #FFFBEB);
    }
    .grade-toggle-btn {
      padding: 8px 14px; border-radius: 14px; border: 1.5px solid #CBD5E1; background: white;
      font-weight: 900; font-size: 12px; color: #475569; cursor: pointer; transition: all 0.2s;
    }
    .grade-toggle-btn.active-g45 { background: #059669; color: white; border-color: #047857; }
    .grade-toggle-btn.active-g68 { background: #D97706; color: white; border-color: #B45309; }
    .biomes-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; }
    .biome-btn {
      padding: 10px 8px; border-radius: 16px; border: 1.5px solid #E2E8F0; background: white;
      cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px;
      transition: all 0.2s;
    }
    .biome-btn.active {
      border-color: #059669; background: #ECFDF5; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15); transform: translateY(-2px);
    }
    .biome-emoji { font-size: 22px; }
    .biome-name { font-size: 11px; font-weight: 900; color: #0F172A; }
    .biome-tag { font-size: 9px; font-weight: 800; color: #059669; background: #D1FAE5; padding: 2px 6px; border-radius: 6px; }

    /* Level Banner */
    .level-banner {
      background: #FFFFFF; border: 2px solid #E2E8F0; border-radius: 24px; padding: 18px 22px;
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    }
    .level-target-animal {
      display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 8px 14px;
      border-radius: 16px; border: 1px solid #E2E8F0;
    }

    /* Question Card */
    .question-card {
      background: white; border-radius: 28px; border: 1.5px solid #E2E8F0; padding: 24px;
      box-shadow: 0 12px 30px -10px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 18px;
    }
    .q-badge {
      display: inline-flex; align-items: center; gap: 6px; background: #ECFDF5; color: #065F46;
      border: 1px solid #A7F3D0; font-size: 11px; font-weight: 900; text-transform: uppercase; padding: 4px 10px; border-radius: 10px;
    }
    .q-story {
      background: #F0FDF4; border-left: 4px solid #059669; padding: 12px 14px; border-radius: 0 14px 14px 0;
      font-size: 13px; color: #166534; font-style: italic; line-height: 1.5;
    }
    .q-passage {
      background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 16px;
      font-size: 13px; color: #78350F; line-height: 1.6;
    }
    .q-text { font-size: 17px; font-weight: 800; color: #0F172A; line-height: 1.4; }
    .options-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    @media (min-width: 540px) { .options-grid { grid-template-columns: 1fr 1fr; } }
    .option-btn {
      padding: 14px 16px; border-radius: 18px; border: 2px solid #E2E8F0; background: #F8FAFC;
      font-size: 14px; font-weight: 800; color: #1E293B; cursor: pointer; text-align: left;
      transition: all 0.15s; display: flex; align-items: center; justify-content: space-between;
    }
    .option-btn:hover:not(:disabled) { background: #F1F5F9; border-color: #CBD5E1; transform: translateY(-1px); }
    .option-btn.correct { background: #ECFDF5; border-color: #10B981; color: #065F46; }
    .option-btn.wrong { background: #FEF2F2; border-color: #EF4444; color: #991B1B; }
    .feedback-box {
      padding: 14px; border-radius: 16px; font-size: 13px; font-weight: 700; display: none; line-height: 1.5;
    }
    .feedback-box.correct { display: block; background: #ECFDF5; border: 1.5px solid #10B981; color: #065F46; }
    .feedback-box.wrong { display: block; background: #FEF2F2; border: 1.5px solid #EF4444; color: #991B1B; }
    .btn-next {
      background: #059669; color: white; border: none; padding: 14px 24px; border-radius: 18px;
      font-size: 14px; font-weight: 900; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3); display: none; margin-top: 10px; text-align: center;
    }
    .btn-next:hover { background: #047857; }

    /* Sanctuary */
    .animals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(135px, 1fr)); gap: 12px; }
    .animal-card {
      background: white; border: 1.5px solid #E2E8F0; border-radius: 20px; padding: 14px; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative;
    }
    .animal-card.locked { opacity: 0.45; filter: grayscale(0.8); }
    .animal-emoji { font-size: 38px; }
    .animal-name { font-size: 12px; font-weight: 900; color: #0F172A; }
    .animal-hearts { color: #EF4444; font-size: 11px; font-weight: 900; }
    .btn-feed {
      margin-top: 4px; padding: 4px 10px; border-radius: 10px; font-size: 10px; font-weight: 900;
      background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E; cursor: pointer;
    }
    .btn-feed:hover { background: #FDE68A; }

    /* Modal */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
      display: none; align-items: center; justify-content: center; z-index: 1000; padding: 16px;
    }
    .modal-box {
      background: white; border-radius: 28px; width: 100%; max-width: 480px; padding: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2); text-align: center; max-height: 90vh; overflow-y: auto;
    }
    .user-select-btn {
      padding: 14px; border-radius: 18px; border: 2px solid #E2E8F0; background: #F8FAFC;
      display: flex; align-items: center; justify-content: space-between; cursor: pointer; margin-bottom: 10px;
    }
    .user-select-btn.active { border-color: #059669; background: #ECFDF5; }
    .input-field {
      width: 100%; padding: 12px 14px; border: 1.5px solid #CBD5E1; border-radius: 14px;
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
    
    <!-- Top Header -->
    <header class="glass-card top-header">
      <div class="brand-section">
        <div id="avatarBtn" class="avatar-btn" onclick="openLoginModal()" title="Klik om van speler te wisselen">👧</div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button id="playerSwitchBtn" class="player-switch-pill" onclick="openLoginModal()">
              <span>👤 <span id="playerNameDisplay">Hemali</span></span>
              <span class="wissel-badge">Wissel</span>
            </button>
            <span class="grade-pill-tag" id="gradeBadgeDisplay">Groep 6-7-8</span>
          </div>
          <div style="font-size: 11px; color: #64748B; font-weight: 700; margin-top: 3px;" id="playerSubDisplay">
            De Taalontdekker • <span id="unlockedCountDisplay">1</span>/42 Dieren Vrijgespeeld
          </div>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn-scoreboard-hdr" onclick="openScoreboardModal()">
          <span>📊</span>
          <span>Ouder Scorebord</span>
        </button>
        <div style="display: flex; gap: 10px;">
          <div class="stat-pill stars">
            <span class="label">Sterren</span>
            <span class="value" id="starsDisplay">0 🌟</span>
          </div>
          <div class="stat-pill">
            <span class="label">Munten</span>
            <span class="value" id="coinsDisplay">50 🪙</span>
          </div>
          <div class="stat-pill streak">
            <span class="label">Reeks</span>
            <span class="value" id="streakDisplay">0 🔥</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="nav-tabs">
      <button class="nav-tab-btn active" id="tabAdventure" onclick="switchTab('adventure')">🧭 Taal Avontuur</button>
      <button class="nav-tab-btn" id="tabSanctuary" onclick="switchTab('sanctuary')">🏡 Dierenpark (42)</button>
      <button class="nav-tab-btn" id="tabBadges" onclick="switchTab('badges')">🏆 Medailles</button>
    </nav>

    <!-- Grade Switcher -->
    <div class="glass-card grade-bar">
      <div>
        <div style="font-size: 12px; font-weight: 900; text-transform: uppercase; color: #1E293B;">🎓 Kies Leerjaar / Niveau:</div>
        <div style="font-size: 10px; color: #64748B;">Ridheya (Groep 4-5) & Hemali (Groep 6-7-8) hebben 42 unieke levels!</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button id="btnGrade45" class="grade-toggle-btn" onclick="selectGrade('group_4_5')">
          📖 Groep 4 - 5
        </button>
        <button id="btnGrade68" class="grade-toggle-btn active-g68" onclick="selectGrade('group_6_7_8')">
          ⚡ Groep 6 - 7 - 8
        </button>
      </div>
    </div>

    <!-- 7 Biomes Grid -->
    <section class="glass-card" id="biomeSection">
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #065F46; margin-bottom: 8px;">
        🌍 Kies een Wereldlocatie (7 Werelden):
      </div>
      <div class="biomes-bar" id="biomesBar"></div>
    </section>

    <!-- ADVENTURE VIEW -->
    <div id="adventureView" style="display: flex; flex-direction: column; gap: 14px;">
      <!-- Level Target Banner -->
      <div class="level-banner">
        <div>
          <span style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #059669; background: #ECFDF5; padding: 4px 8px; border-radius: 8px;" id="levelNumBadge">Level 1 van 6</span>
          <h3 style="font-size: 18px; font-weight: 900; color: #0F172A; margin-top: 4px;" id="levelTitleDisplay">Bella's Weilanden</h3>
          <p style="font-size: 12px; color: #64748B; font-weight: 600;" id="levelThemeDisplay">Korte en Lange Klanken</p>
        </div>
        <div class="level-target-animal">
          <div style="font-size: 32px;" id="targetAnimalEmoji">🐮</div>
          <div>
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #D97706;">Ontgrendel Beloning:</div>
            <div style="font-size: 13px; font-weight: 900; color: #0F172A;" id="targetAnimalName">Bella de Koe</div>
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="question-card" id="questionCard">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="q-badge" id="qCategoryBadge">🐮 Klinkers & Klanken</span>
          <span style="font-size: 11px; font-weight: 800; color: #64748B;" id="qIndexBadge">Vraag 1/3</span>
        </div>

        <div class="q-story" id="qStoryBox"></div>
        <div class="q-passage" id="qPassageBox" style="display: none;"></div>
        <div class="q-text" id="qQuestionText"></div>

        <div class="options-grid" id="optionsGrid"></div>

        <div class="feedback-box" id="feedbackBox"></div>

        <button class="btn-next" id="btnNext" onclick="nextQuestion()">Volgende Vraag ➔</button>
      </div>
    </div>

    <!-- SANCTUARY VIEW -->
    <div id="sanctuaryView" class="glass-card" style="display: none;">
      <h3 style="font-size: 18px; font-weight: 900; color: #0F172A; margin-bottom: 6px;">🏡 Het Grote Dierenpark (42 Dieren)</h3>
      <p style="font-size: 12px; color: #64748B; margin-bottom: 16px;">Voer je geredde dieren met munten (🪙) om hartjes (❤️) te verdienen!</p>
      <div class="animals-grid" id="sanctuaryGrid"></div>
    </div>

    <!-- BADGES VIEW -->
    <div id="badgesView" class="glass-card" style="display: none;">
      <h3 style="font-size: 18px; font-weight: 900; color: #0F172A; margin-bottom: 6px;">🏆 Taal Medailles & Trofeeën</h3>
      <div class="animals-grid" id="badgesGrid"></div>
    </div>

  </div>

  <!-- LOGIN MODAL -->
  <div class="modal-overlay" id="loginModal">
    <div class="modal-box">
      <div style="font-size: 40px; margin-bottom: 8px;">👑</div>
      <h3 style="font-size: 20px; font-weight: 900; color: #0F172A;">Wie Gaat Er Spelen?</h3>
      <p style="font-size: 12px; color: #64748B; margin-bottom: 16px;">Kies je eigen profiel zodat al je dieren bewaard blijven:</p>

      <div class="user-select-btn" id="userBtnHemali" onclick="selectLoginUser('hemali')">
        <div style="display: flex; align-items: center; gap: 10px; text-align: left;">
          <div style="font-size: 28px;">👧</div>
          <div>
            <div style="font-size: 14px; font-weight: 900;">Hemali</div>
            <div style="font-size: 10px; color: #D97706; font-weight: 700;">Groep 6-7-8</div>
          </div>
        </div>
      </div>

      <div class="user-select-btn" id="userBtnRidheya" onclick="selectLoginUser('ridheya')">
        <div style="display: flex; align-items: center; gap: 10px; text-align: left;">
          <div style="font-size: 28px;">👩‍🌾</div>
          <div>
            <div style="font-size: 14px; font-weight: 900;">Ridheya</div>
            <div style="font-size: 10px; color: #059669; font-weight: 700;">Groep 4-5</div>
          </div>
        </div>
      </div>

      <div style="text-align: left; margin-top: 10px;">
        <label style="font-size: 11px; font-weight: 800; color: #475569;" id="passLabel">Wachtwoord voor Hemali:</label>
        <input type="password" id="loginPasswordInput" class="input-field" placeholder="Voer wachtwoord in..." />
      </div>

      <div id="loginError" style="font-size: 11px; color: #DC2626; font-weight: 800; margin-bottom: 10px; display: none;"></div>

      <button class="btn-primary" onclick="submitLogin()">Inloggen ➔</button>
      <button onclick="closeLoginModal()" style="margin-top: 10px; background: none; border: none; color: #94A3B8; font-size: 12px; font-weight: 700; cursor: pointer;">Sluiten</button>
    </div>
  </div>

  <!-- SCOREBOARD MODAL -->
  <div class="modal-overlay" id="scoreboardModal">
    <div class="modal-box" style="max-width: 600px; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 28px;">📊</div>
          <div>
            <h3 style="font-size: 18px; font-weight: 900; color: #0F172A;">Ouder Scorebord</h3>
            <p style="font-size: 11px; color: #64748B;">Leervoortgang van Hemali & Ridheya</p>
          </div>
        </div>
        <button onclick="closeScoreboardModal()" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #64748B;">✖</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
        <div style="background: #FFFBEB; border: 1.5px solid #FDE68A; border-radius: 16px; padding: 12px;">
          <div style="font-size: 14px; font-weight: 900; color: #92400E;">👧 Hemali (Gr 6-8)</div>
          <div style="font-size: 12px; font-weight: 700; color: #78350F; margin-top: 4px;" id="sbHemaliScore">Sterren: 0 • Dieren: 1/42</div>
          <div style="font-size: 11px; color: #B45309;" id="sbHemaliAccuracy">Nauwkeurigheid: 0%</div>
        </div>
        <div style="background: #ECFDF5; border: 1.5px solid #A7F3D0; border-radius: 16px; padding: 12px;">
          <div style="font-size: 14px; font-weight: 900; color: #065F46;">👩‍🌾 Ridheya (Gr 4-5)</div>
          <div style="font-size: 12px; font-weight: 700; color: #047857; margin-top: 4px;" id="sbRidheyaScore">Sterren: 0 • Dieren: 1/42</div>
          <div style="font-size: 11px; color: #059669;" id="sbRidheyaAccuracy">Nauwkeurigheid: 0%</div>
        </div>
      </div>

      <div style="font-size: 12px; font-weight: 900; color: #1E293B; margin-bottom: 8px;">Recente Activiteitenlogboek:</div>
      <div id="activityLogsList" style="max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;"></div>
    </div>
  </div>

  <!-- EMBEDDED COMPLETE DATA BANKS -->
  <script>
    const BIOMES = ${biomesJson};
    const ALL_ANIMALS = ${animalsJson};
    const LEVELS_45 = ${levels45Json};
    const LEVELS_68 = ${levels68Json};
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
    let currentQIndex = 0;
    let isAnswered = false;
    let activityLogs = [];

    function playSound(type) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'correct') {
          osc.frequency.setValueAtTime(523.25, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'wrong') {
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
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

    function speakDutch(text) {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'nl-NL';
        window.speechSynthesis.speak(u);
      }
    }

    function init() {
      try {
        const saved = localStorage.getItem('boerin_tess_offline_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.users) Object.assign(USERS, parsed.users);
          if (parsed.currentUserKey) currentUserKey = parsed.currentUserKey;
          if (parsed.activityLogs) activityLogs = parsed.activityLogs;
        }
      } catch(e) {}

      applyUser(currentUserKey);
      renderBiomes();
      renderCurrentLevel();
    }

    function saveState() {
      try {
        localStorage.setItem('boerin_tess_offline_v3', JSON.stringify({
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
      document.getElementById('starsDisplay').textContent = u.score + ' 🌟';
      document.getElementById('coinsDisplay').textContent = u.coins + ' 🪙';
      document.getElementById('streakDisplay').textContent = u.streak + ' 🔥';
      document.getElementById('unlockedCountDisplay').textContent = u.unlocked.length;
      document.getElementById('gradeBadgeDisplay').textContent = selectedGrade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8';
      
      document.getElementById('btnGrade45').className = 'grade-toggle-btn ' + (selectedGrade === 'group_4_5' ? 'active-g45' : '');
      document.getElementById('btnGrade68').className = 'grade-toggle-btn ' + (selectedGrade === 'group_6_7_8' ? 'active-g68' : '');
      
      currentQIndex = 0;
      isAnswered = false;
      renderCurrentLevel();
      renderSanctuary();
      renderBadges();
    }

    function selectGrade(grade) {
      selectedGrade = grade;
      USERS[currentUserKey].defaultGrade = grade;
      document.getElementById('btnGrade45').className = 'grade-toggle-btn ' + (selectedGrade === 'group_4_5' ? 'active-g45' : '');
      document.getElementById('btnGrade68').className = 'grade-toggle-btn ' + (selectedGrade === 'group_6_7_8' ? 'active-g68' : '');
      document.getElementById('gradeBadgeDisplay').textContent = selectedGrade === 'group_4_5' ? 'Groep 4-5' : 'Groep 6-7-8';
      currentQIndex = 0;
      isAnswered = false;
      renderCurrentLevel();
      saveState();
    }

    function renderBiomes() {
      const container = document.getElementById('biomesBar');
      container.innerHTML = '';
      BIOMES.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'biome-btn ' + (b.id === selectedBiome ? 'active' : '');
        btn.onclick = () => {
          selectedBiome = b.id;
          currentQIndex = 0;
          isAnswered = false;
          renderBiomes();
          renderCurrentLevel();
        };
        btn.innerHTML = \`
          <span class="biome-emoji">\${b.emoji}</span>
          <span class="biome-name">\${b.name}</span>
          <span class="biome-tag">Level \${(USERS[currentUserKey].biomeProgress[b.id] || 0) + 1}/6</span>
        \`;
        container.appendChild(btn);
      });
    }

    function getCurrentLevels() {
      return selectedGrade === 'group_4_5' ? LEVELS_45[selectedBiome] : LEVELS_68[selectedBiome];
    }

    function renderCurrentLevel() {
      const levels = getCurrentLevels() || LEVELS_45.farm;
      const u = USERS[currentUserKey];
      if (!u.biomeProgress) u.biomeProgress = { farm: 0, safari: 0, sea: 0, snow: 0, jungle: 0, outback: 0, mountain: 0 };
      const levelIdx = (u.biomeProgress[selectedBiome] || 0) % levels.length;
      const level = levels[levelIdx];
      const questions = level.questions;
      const q = questions[currentQIndex % questions.length];

      document.getElementById('levelNumBadge').textContent = 'Level ' + (levelIdx + 1) + ' van ' + levels.length;
      document.getElementById('levelTitleDisplay').textContent = level.name;
      document.getElementById('levelThemeDisplay').textContent = level.theme;
      document.getElementById('targetAnimalEmoji').textContent = level.animalReward.emoji;
      document.getElementById('targetAnimalName').textContent = level.animalReward.name;

      document.getElementById('qCategoryBadge').textContent = level.animalReward.emoji + ' ' + q.category;
      document.getElementById('qIndexBadge').textContent = 'Vraag ' + (currentQIndex + 1) + '/' + questions.length;

      const storyBox = document.getElementById('qStoryBox');
      if (level.introStory && currentQIndex === 0) {
        storyBox.style.display = 'block';
        storyBox.textContent = level.introStory;
      } else {
        storyBox.style.display = 'none';
      }

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
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(idx, q);
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
      const buttons = optionsGrid.querySelectorAll('.option-btn');
      const feedbackBox = document.getElementById('feedbackBox');
      const u = USERS[currentUserKey];

      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correctOptionIndex) btn.classList.add('correct');
        else if (idx === selectedIdx) btn.classList.add('wrong');
      });

      u.totalAnswered += 1;

      if (isCorrect) {
        playSound('correct');
        u.streak += 1;
        u.score += 10;
        u.coins += 5;
        u.totalCorrect += 1;
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.innerHTML = '🎉 <b>Fantastisch gedaan!</b> ' + (q.hint || q.explanation || 'Helemaal goed beantwoord!');
        if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
      } else {
        playSound('wrong');
        u.streak = 0;
        feedbackBox.className = 'feedback-box wrong';
        feedbackBox.innerHTML = '💡 <b>Bijna!</b> ' + (q.hint || q.explanation || 'Kijk goed naar de regel en probeer het de volgende keer opnieuw.');
      }

      // Log activity
      activityLogs.unshift({
        time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
        user: u.username,
        question: q.question,
        correct: isCorrect,
        biome: selectedBiome
      });
      if (activityLogs.length > 50) activityLogs.pop();

      document.getElementById('starsDisplay').textContent = u.score + ' 🌟';
      document.getElementById('coinsDisplay').textContent = u.coins + ' 🪙';
      document.getElementById('streakDisplay').textContent = u.streak + ' 🔥';
      document.getElementById('btnNext').style.display = 'block';

      saveState();
    }

    function nextQuestion() {
      const levels = getCurrentLevels() || LEVELS_45.farm;
      const u = USERS[currentUserKey];
      const levelIdx = (u.biomeProgress[selectedBiome] || 0) % levels.length;
      const level = levels[levelIdx];
      const questions = level.questions;

      if (currentQIndex >= questions.length - 1) {
        // Level complete! Unlock animal!
        const animal = level.animalReward;
        if (!u.unlocked.includes(animal.id)) {
          u.unlocked.push(animal.id);
          u.coins += 50;
          u.score += 50;
          playSound('correct');
          if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 80 });
          alert('🌟 GEFELICITEERD! Je hebt ' + animal.name + ' (' + animal.emoji + ') ontgrendeld voor je Dierenpark!');
        }
        u.biomeProgress[selectedBiome] = Math.min(levelIdx + 1, levels.length - 1);
        currentQIndex = 0;
        renderBiomes();
        renderSanctuary();
      } else {
        currentQIndex += 1;
      }
      isAnswered = false;
      renderCurrentLevel();
      saveState();
    }

    function switchTab(tab) {
      document.getElementById('tabAdventure').className = 'nav-tab-btn ' + (tab === 'adventure' ? 'active' : '');
      document.getElementById('tabSanctuary').className = 'nav-tab-btn ' + (tab === 'sanctuary' ? 'active' : '');
      document.getElementById('tabBadges').className = 'nav-tab-btn ' + (tab === 'badges' ? 'active' : '');

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
          \${isUnlocked ? \`<button class="btn-feed" onclick="feedAnimal('\${a.id}')">Voeren (20🪙)</button>\` : '<span style="font-size:10px; color:#94A3B8;">Nog opsluiten</span>'}
        \`;
        grid.appendChild(card);
      });
      document.getElementById('unlockedCountDisplay').textContent = u.unlocked.length;
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
      playSound('correct');
      document.getElementById('coinsDisplay').textContent = u.coins + ' 🪙';
      document.getElementById('starsDisplay').textContent = u.score + ' 🌟';
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
          <div style="font-size:10px; color:#64748B;">\${b.description}</div>
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
      document.getElementById('userBtnHemali').className = 'user-select-btn ' + (key === 'hemali' ? 'active' : '');
      document.getElementById('userBtnRidheya').className = 'user-select-btn ' + (key === 'ridheya' ? 'active' : '');
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
        playSound('correct');
      } else {
        document.getElementById('loginError').textContent = 'Onjuist wachtwoord voor ' + target.username;
        document.getElementById('loginError').style.display = 'block';
        playSound('wrong');
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
        logsList.innerHTML = '<div style="font-size:11px; color:#94A3B8;">Nog geen vragen beantwoord.</div>';
      } else {
        activityLogs.slice(0, 15).forEach(l => {
          const item = document.createElement('div');
          item.style.cssText = 'font-size:11px; padding:6px 10px; border-radius:8px; display:flex; justify-content:space-between; background:' + (l.correct ? '#ECFDF5' : '#FEF2F2');
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
console.log('Successfully generated public/boerin_tess_safari.html with all 42 levels and 250+ questions!');
