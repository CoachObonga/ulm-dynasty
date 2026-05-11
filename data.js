// ═══════════════════════════════════════════════════════════════
//  ULM WARHAWKS DYNASTY DATA
//  Edit this file to populate the site with real data.
//  Each season, game, and player entry has placeholder structure.
// ═══════════════════════════════════════════════════════════════

// ─── SEASONS ──────────────────────────────────────────────────
// record: "W-L"
// conference: "Sun Belt" or "Big 12"
// bowl: optional bowl game result string
// games: array of game objects (see structure below)
// Each game:
//   date, opponent, location (H/A/N), result (W/L), score "XX-XX"
//   ulmScore, oppScore (numbers)
//   hasDetail: true = full game detail page exists
//   quarters: [{ulm, opp}, ...] — Q1 through Q4 (+ OT if needed)
//   ulmStats / oppStats: { qb:[], rb:[], wr:[], def:[], st:[] }
//     Each entry is an array of cell values matching column order
//   teamStats: { ulmTotalYds, oppTotalYds, ulmPassYds, ... }
//   keyMoments: ["string", ...]
//   coachingNotes: "string"
//   postGameQuote: { text: "string", attribution: "string" }
//   starPlayers: [{ name, team, position, statLine, note }]

const SEASONS = {
  2025: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2026: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2027: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2028: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2029: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2030: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2031: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2032: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2033: {
    record: null,
    conference: 'Sun Belt',
    bowl: null,
    games: []
  },
  2034: {
    record: null,
    conference: 'Big 12',
    bowl: null,
    games: []
  },
  2035: {
    record: null,
    conference: 'Big 12',
    bowl: null,
    games: []
  },
  2036: {
    record: null,
    conference: 'Big 12',
    bowl: null,
    games: []
  },
  2037: {
    record: null,
    conference: 'Big 12',
    bowl: null,
    games: []
  },
  2038: {
    record: null,
    conference: 'Big 12',
    bowl: null,
    games: []
  },
};

// ─── NFL DRAFT ─────────────────────────────────────────────────
// Each entry: { round, name, year, position, notes }
const NFL_DRAFT_PICKS = [
  // Example: { round: 1, name: 'Barry Abreu', year: 2033, position: 'QB', notes: 'Heisman winner' }
];

// ─── AWARDS ────────────────────────────────────────────────────
const AWARDS = {
  national: [
    // { year, award, player, note }
    // Example: { year: 2032, award: 'Heisman Trophy', player: 'Barry Abreu', note: 'First Heisman for ULM' }
  ],
  allAmerican: [
    // { year, team, player, position }
  ],
  conference: [
    // { year, award, player, position }
  ],
  weekly: [
    // { week, year, award, player, position }
  ],
};

// ─── HALL OF FAME ──────────────────────────────────────────────
const HOF = {
  ringOfHonor: [
    // { name, position, years, stats: [{label, value}], note }
  ],
  hallOfFame: [
    // same structure
  ],
  programLegends: [
    // same structure
  ],
};

// ─── RECRUITING ────────────────────────────────────────────────
// classes: array of { year, nationalRank, stars: {5,4,3,2}, points, topRecruits: [{name, pos, stars, origin}] }
const RECRUITING = {
  classes: [],
  transfersIn: [],   // { year, name, pos, from }
  transfersOut: [],  // { year, name, pos, to }
};

// ─── COACHING STAFF ────────────────────────────────────────────
const COACHING = {
  current: [
    { title: 'Head Coach', name: 'Barack Obonga', since: 2025 },
    { title: 'Offensive Coordinator', name: 'TBD', since: null },
    { title: 'Defensive Coordinator', name: 'TBD', since: null },
    { title: 'Special Teams Coordinator', name: 'TBD', since: null },
  ],
  history: [
    // { year, title, name, action: 'hired'|'departed'|'promoted' }
  ],
};

// ─── CONFERENCE HISTORY ────────────────────────────────────────
const CONFERENCE = {
  sunBelt: {
    seasons: [], // { year, record, finish, champion: bool }
    championships: [], // { year, opponent, score, result }
  },
  big12: {
    seasons: [],
    championships: [],
  },
};

// ─── STATS RECORDS ─────────────────────────────────────────────
// Each record: { category, player, value, year, opponent }
const RECORDS = {
  career: [
    // { category: 'Passing Yards', player: '', value: '', year: '' }
  ],
  singleSeason: [],
  singleGame: [],
};

// ─── NATIONAL CONTEXT ──────────────────────────────────────────
const NATIONAL = {
  champions: [
    // { year, team }
  ],
  cfpAppearances: [
    // { year, seed, round, opponent, result }
  ],
  top25: [
    // { year, peakRank, weeksRanked }
  ],
};
