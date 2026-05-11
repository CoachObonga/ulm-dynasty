// ─── NAVIGATION ───────────────────────────────────────────────
const NAV_LINKS = document.querySelectorAll('#main-nav a');
const PAGES = document.querySelectorAll('.page');

function showPage(id) {
  PAGES.forEach(p => p.classList.remove('active'));
  NAV_LINKS.forEach(a => a.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  const link = document.querySelector(`#main-nav a[data-page="${id}"]`);
  if (link) link.classList.add('active');
  window.scrollTo(0, 0);
  history.replaceState(null, '', '#' + id);
}

NAV_LINKS.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showPage(a.dataset.page);
  });
});

// ─── INNER TABS ───────────────────────────────────────────────
document.querySelectorAll('.inner-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const group = tab.closest('[data-tab-group]').dataset.tabGroup;
    document.querySelectorAll(`[data-tab-group="${group}"] .inner-tab`).forEach(t => t.classList.remove('active'));
    document.querySelectorAll(`[data-tab-group="${group}"] .inner-panel`).forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.add('active');
  });
});

// ─── SEASON DRILL-DOWN ─────────────────────────────────────────
let currentSeason = null;
let currentGame = null;

function openSeason(year) {
  if (!SEASONS[year]) return;
  currentSeason = year;
  currentGame = null;

  // Hide season grid, show season schedule
  document.getElementById('seasons-grid').style.display = 'none';
  document.getElementById('season-schedule-view').style.display = 'block';
  document.getElementById('game-detail-view').style.display = 'none';

  const s = SEASONS[year];
  document.getElementById('sched-year').textContent = year;
  document.getElementById('sched-record').textContent = s.record || '—';
  document.getElementById('sched-conf').textContent = s.conference || '—';
  document.getElementById('sched-result').textContent = s.bowl || '';

  // Build schedule rows
  const tbody = document.getElementById('sched-tbody');
  tbody.innerHTML = '';
  if (s.games && s.games.length) {
    s.games.forEach((g, i) => {
      const row = document.createElement('div');
      row.className = 'schedule-row';
      const isW = g.result === 'W';
      const isL = g.result === 'L';
      row.innerHTML = `
        <div class="week-num">${i + 1}</div>
        <div class="game-date">${g.date || '—'}</div>
        <div class="opponent">${g.location === 'A' ? '@ ' : g.location === 'N' ? '&#9679; ' : ''}${g.opponent}</div>
        <div class="${isW ? 'result-w' : isL ? 'result-l' : ''}">${g.result || '—'} ${g.score || ''}</div>
        <div class="location">${g.location === 'H' ? 'Home' : g.location === 'A' ? 'Away' : 'Neutral'}</div>
        <div>
          ${g.hasDetail ? '<span class="badge badge-outline" style="cursor:pointer">RECAP</span>' : ''}
        </div>
      `;
      if (g.hasDetail) {
        row.addEventListener('click', () => openGame(year, i));
      }
      tbody.appendChild(row);
    });
  } else {
    tbody.innerHTML = '<div style="padding:2rem;color:var(--text-dim);font-style:italic;text-align:center;">No game data entered yet for this season.</div>';
  }
}

function openGame(year, gameIdx) {
  const s = SEASONS[year];
  const g = s.games[gameIdx];
  if (!g || !g.hasDetail) return;
  currentGame = gameIdx;

  document.getElementById('season-schedule-view').style.display = 'none';
  document.getElementById('game-detail-view').style.display = 'block';

  // Score display
  const ulm = g.ulmScore ?? 0;
  const opp = g.oppScore ?? 0;
  const ulmWin = ulm > opp;
  document.getElementById('gd-ulm-score').textContent = ulm;
  document.getElementById('gd-opp-score').textContent = opp;
  document.getElementById('gd-ulm-score').className = 'game-score' + (ulmWin ? ' winner' : '');
  document.getElementById('gd-opp-score').className = 'game-score' + (!ulmWin ? ' winner' : '');
  document.getElementById('gd-opponent').textContent = g.opponent;
  document.getElementById('gd-meta').textContent = `${g.date || ''} · ${g.location === 'H' ? 'Home' : g.location === 'A' ? 'Away at ' + g.opponent : 'Neutral Site'}`;

  // Quarter scores
  const qRow = document.getElementById('gd-quarters');
  if (g.quarters) {
    qRow.innerHTML = g.quarters.map((q, i) => `
      <div class="stat-block">
        <div class="stat-block-value" style="font-size:1.8rem">${q.ulm ?? '—'} – ${q.opp ?? '—'}</div>
        <div class="stat-block-label">${i < 4 ? 'Q' + (i+1) : 'OT'}</div>
      </div>
    `).join('');
  } else {
    qRow.innerHTML = '<div class="placeholder-box">Quarter-by-quarter scores not entered.</div>';
  }

  // Player stats
  renderPlayerStats('gd-ulm-stats', g.ulmStats);
  renderPlayerStats('gd-opp-stats', g.oppStats);

  // Team stats comparison
  renderTeamStats(g.teamStats);

  // Key Moments
  const km = document.getElementById('gd-key-moments');
  if (g.keyMoments && g.keyMoments.length) {
    km.innerHTML = '<ol style="padding-left:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">' +
      g.keyMoments.map(m => `<li style="font-size:0.9rem;color:var(--text)">${m}</li>`).join('') + '</ol>';
  } else {
    km.innerHTML = '<div class="placeholder-box">Key moments not entered yet.</div>';
  }

  // Coaching Notes
  const cn = document.getElementById('gd-coaching-notes');
  cn.textContent = g.coachingNotes || 'No coaching notes entered.';

  // Post-game Quote
  const pq = document.getElementById('gd-quote');
  if (g.postGameQuote) {
    pq.innerHTML = `<blockquote style="border-left:3px solid var(--gold);padding-left:1.2rem;font-style:italic;color:var(--text)">"${g.postGameQuote.text}"<br><span style="font-size:0.8rem;color:var(--text-muted);margin-top:0.4rem;display:block">— ${g.postGameQuote.attribution}</span></blockquote>`;
  } else {
    pq.innerHTML = '<div class="placeholder-box">Post-game quote not entered.</div>';
  }

  // Star Players
  const sp = document.getElementById('gd-stars');
  if (g.starPlayers && g.starPlayers.length) {
    sp.innerHTML = g.starPlayers.map(star => `
      <div class="hof-card" style="margin-bottom:1px">
        <div class="hof-name" style="font-size:1.3rem">${star.name}</div>
        <div class="hof-pos-years">${star.team} · ${star.position}</div>
        <div style="font-size:0.85rem;color:var(--text)">${star.statLine}</div>
        ${star.note ? `<div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem">${star.note}</div>` : ''}
      </div>
    `).join('');
  } else {
    sp.innerHTML = '<div class="placeholder-box">Star player data not entered.</div>';
  }
}

function renderPlayerStats(containerId, stats) {
  const el = document.getElementById(containerId);
  if (!stats) {
    el.innerHTML = '<div class="placeholder-box">Player stats not entered.</div>';
    return;
  }
  let html = '';
  const groups = [
    { key: 'qb', label: 'Quarterbacks', cols: ['Player', 'C/ATT', 'YDS', 'TD', 'INT'] },
    { key: 'rb', label: 'Running Backs', cols: ['Player', 'CAR', 'YDS', 'TD', 'REC', 'REC YDS'] },
    { key: 'wr', label: 'Receivers', cols: ['Player', 'TGT', 'REC', 'YDS', 'TD'] },
    { key: 'def', label: 'Defense', cols: ['Player', 'POS', 'TKL', 'SACK', 'TFL', 'INT', 'FF'] },
    { key: 'st', label: 'Special Teams', cols: ['Player', 'FG', 'KR YDS', 'PR YDS'] },
  ];
  groups.forEach(g => {
    if (!stats[g.key] || !stats[g.key].length) return;
    html += `<div class="pos-group-header">${g.label}</div>
    <div class="data-table-wrap"><table class="data-table">
      <thead><tr>${g.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${stats[g.key].map(row => `<tr>${row.map((cell, i) => `<td${i===0?' class="highlight"':''}>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  });
  el.innerHTML = html || '<div class="placeholder-box">No player data.</div>';
}

function renderTeamStats(ts) {
  const el = document.getElementById('gd-team-stats');
  if (!ts) {
    el.innerHTML = '<div class="placeholder-box">Team stats not entered.</div>';
    return;
  }
  const rows = [
    ['Total Yards', ts.ulmTotalYds, ts.oppTotalYds],
    ['Passing Yards', ts.ulmPassYds, ts.oppPassYds],
    ['Rushing Yards', ts.ulmRushYds, ts.oppRushYds],
    ['Turnovers', ts.ulmTO, ts.oppTO],
    ['Penalties', ts.ulmPen, ts.oppPen],
    ['Time of Possession', ts.ulmTOP, ts.oppTOP],
    ['3rd Down Conv.', ts.ulm3rd, ts.opp3rd],
    ['Red Zone Eff.', ts.ulmRZ, ts.oppRZ],
  ];
  el.innerHTML = `<div class="data-table-wrap"><table class="data-table">
    <thead><tr><th>Category</th><th>ULM</th><th>Opponent</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${r[0]}</td><td class="highlight">${r[1] ?? '—'}</td><td>${r[2] ?? '—'}</td></tr>`).join('')}</tbody>
  </table></div>`;
}

// ─── BACK BUTTONS ──────────────────────────────────────────────
document.getElementById('back-to-seasons').addEventListener('click', () => {
  currentSeason = null;
  currentGame = null;
  document.getElementById('seasons-grid').style.display = '';
  document.getElementById('season-schedule-view').style.display = 'none';
  document.getElementById('game-detail-view').style.display = 'none';
});

document.getElementById('back-to-schedule').addEventListener('click', () => {
  currentGame = null;
  document.getElementById('season-schedule-view').style.display = 'block';
  document.getElementById('game-detail-view').style.display = 'none';
  window.scrollTo(0, 0);
});

// ─── INITIAL PAGE ──────────────────────────────────────────────
(function init() {
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    showPage(hash);
  } else {
    showPage('home');
  }
})();
