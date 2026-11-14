// @ts-nocheck
/* Generated from the design canvas board "Entrance.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "@tanstack/react-router";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./entrance.css";

class Component extends DCLogic {
  componentWillUnmount() {
    try { if (this._rec) this._rec.abort(); } catch (e) { /* ignore */ }
    try { if (this._audio) this._audio.pause(); } catch (e) { /* ignore */ }
  }
  renderVals() {
    /* ---------- SCRIPT: entrance (team spec). `ta`, `en`, `keys`, the right-answer `why` and Paati’s reactions are additions to review. ---------- */
    const ENTRANCE = [
      { paati: 'vaanga kannu, ulla vaa!', audio: 'entrance_t1.mp3', ta: 'வாங்க கண்ணு, உள்ள வா!', en: 'Come in, dear, come inside!',
        options: [
          { text: 'vanakkam paati, eppadi irukkeenga?', correct: true, keys: ['vanakkam', 'irukkeenga?'], why: '‘vanakkam’ is the respectful greeting, and ‘irukkeenga’ uses the polite ‑nga ending for elders.', ta: 'வணக்கம் பாட்டி, எப்படி இருக்கீங்க?', en: 'Hello Paati, how are you?' },
          { text: 'hi paati da, nee eppadi irukka?', keys: ['da,', 'nee'], why: '‘da’ and ‘nee’ are for friends. Greet elders with ‘vanakkam’ and ‘neenga’.', ta: 'ஹாய் பாட்டி டா, நீ எப்படி இருக்க?', en: 'Hi Paati mate, how are you?' },
          { text: 'sari, ulla poren.', keys: ['sari,', 'poren.'], why: 'Too curt. Greet her warmly first.', ta: 'சரி, உள்ள போறேன்.', en: 'Okay, I’m going in.' }
        ],
        right: { text: 'nalla irukken kannu! vaa vaa.', audio: 'entrance_t1_right.mp3', ta: 'நல்லா இருக்கேன் கண்ணு! வா வா.', en: 'I’m well, dear! Come, come.' },
        wrong: { text: 'enna kannu, ippadi pesura?', audio: 'entrance_t1_wrong.mp3', ta: 'என்ன கண்ணு, இப்படி பேசுற?', en: 'What’s this, dear, talking like that?' } },
      { paati: 'romba naal aachu kannu, unna paathu.', audio: 'entrance_t2.mp3', ta: 'ரொம்ப நாள் ஆச்சு கண்ணு, உன்ன பாத்து.', en: 'It’s been so long since I saw you, dear.',
        options: [
          { text: 'aama paati, ungala paakka romba aasaiya irundhuchu.', correct: true, keys: ['ungala', 'aasaiya'], why: '‘ungala’ is the respectful ‘you’, and ‘aasaiya irundhuchu’ tells her warmly that you longed to see her.', ta: 'ஆமா பாட்டி, உங்கள பாக்க ரொம்ப ஆசையா இருந்துச்சு.', en: 'Yes Paati, I’ve been longing to see you.' },
          { text: 'aama da, naanum miss pannen.', keys: ['da,', 'miss', 'pannen.'], why: '‘da’ and ‘miss pannen’ are casual. Say it warmly and respectfully.', ta: 'ஆமா டா, நானும் மிஸ் பண்ணேன்.', en: 'Yeah mate, I missed you too.' },
          { text: 'naan busy-ya irundhen, adhaan varala.', keys: ['busy-ya', 'varala.'], why: 'Sounds like an excuse. Tell her you’re happy to see her instead.', ta: 'நான் பிஸியா இருந்தேன், அதான் வரல.', en: 'I was busy, that’s why I didn’t come.' }
        ],
        right: { text: 'en chellam! vaa, kitta vaa.', audio: 'entrance_t2_right.mp3', ta: 'என் செல்லம்! வா, கிட்ட வா.', en: 'My darling! Come, come close.' },
        wrong: { text: 'mm… sari kannu.', audio: 'entrance_t2_wrong.mp3', ta: 'ம்ம்… சரி கண்ணு.', en: 'Hmm… alright, dear.' } },
      { paati: 'kaal kai kazhuvikko, apram saapdalaam.', audio: 'entrance_t3.mp3', ta: 'கால் கை கழுவிக்கோ, அப்புறம் சாப்டலாம்.', en: 'Wash your hands and feet, then we’ll eat.',
        options: [
          { text: 'sari paati, naan kazhuvittu varen.', correct: true, keys: ['paati,', 'kazhuvittu', 'varen.'], why: 'You agree with ‘sari paati’ and say what you’ll do: ‘kazhuvittu varen’, I’ll wash and come.', ta: 'சரி பாட்டி, நான் கழுவிட்டு வரேன்.', en: 'Okay Paati, I’ll wash and come.' },
          { text: 'sari, nee ready-a vechuko.', keys: ['nee', 'vechuko.'], why: 'Don’t tell an elder what to do. Answer her politely.', ta: 'சரி, நீ ரெடியா வெச்சுக்கோ.', en: 'Okay, you keep it ready.' },
          { text: 'ippo venaam, apram paakalaam da.', keys: ['venaam,', 'da.'], why: 'Brushing her off with ‘da’ is disrespectful. Agree and do it.', ta: 'இப்போ வேணாம், அப்புறம் பாக்கலாம் டா.', en: 'Not now, we’ll see later, mate.' }
        ],
        right: { text: 'nalla pulla! seekiram vaa.', audio: 'entrance_t3_right.mp3', ta: 'நல்ல புள்ள! சீக்கிரம் வா.', en: 'Good child! Come quickly.' },
        wrong: { text: 'kannu, appadi pesakoodaadhu.', audio: 'entrance_t3_wrong.mp3', ta: 'கண்ணு, அப்படி பேசக்கூடாது.', en: 'Dear, you mustn’t talk like that.' } },
      { paati: 'ukkaaru kannu, thatha ingayae irukkaaru.', audio: 'entrance_t4.mp3', ta: 'உக்காரு கண்ணு, தாத்தா இங்கயே இருக்காரு.', en: 'Sit down, dear. Thatha is right here.',
        options: [
          { text: 'sari paati. thatha eppadi irukkaaru?', correct: true, keys: ['eppadi', 'irukkaaru?'], why: '‘irukkaaru’ is the respectful form for Thatha, and asking after him shows you care.', ta: 'சரி பாட்டி. தாத்தா எப்படி இருக்காரு?', en: 'Okay Paati. How is Thatha?' },
          { text: 'thatha-va kupdu da.', keys: ['kupdu', 'da.'], why: '‘da’ and a bare command are too casual. Ask about Thatha politely.', ta: 'தாத்தாவ கூப்டு டா.', en: 'Call Thatha, mate.' },
          { text: 'thatha enga? nee sollu.', keys: ['nee', 'sollu.'], why: '‘nee sollu’ is a command to an elder. Ask kindly instead.', ta: 'தாத்தா எங்க? நீ சொல்லு.', en: 'Where’s Thatha? You tell me.' }
        ],
        right: { text: 'nalla irukkaaru kannu. unna paatha romba santhoshap paduvaaru.', audio: 'entrance_t4_right.mp3', ta: 'நல்லா இருக்காரு கண்ணு. உன்ன பாத்தா ரொம்ப சந்தோஷப்படுவாரு.', en: 'He’s well, dear. He’ll be so happy to see you.' },
        wrong: { text: 'mariyaadhaiya pesu kannu.', audio: 'entrance_t4_wrong.mp3', ta: 'மரியாதையா பேசு கண்ணு.', en: 'Speak respectfully, dear.' } },
      { paati: 'idhu unakkaaga seithen, saapdu kannu.', audio: 'entrance_t5.mp3', ta: 'இது உனக்காக செய்தேன், சாப்டு கண்ணு.', en: 'I made this for you. Eat, dear.',
        options: [
          { text: 'romba nandri paati, neenga enakkaaga seitheenga, santhosham.', correct: true, keys: ['nandri', 'neenga', 'santhosham.'], why: '‘nandri’ with ‘neenga’ thanks her respectfully, and ‘santhosham’ shares your joy.', ta: 'ரொம்ப நன்றி பாட்டி, நீங்க எனக்காக செய்தீங்க, சந்தோஷம்.', en: 'Thank you so much, Paati. You made it for me, I’m so happy.' },
          { text: 'thanks da paati, super.', keys: ['thanks', 'da'], why: '‘thanks da’ is for friends. Thank her warmly and respectfully.', ta: 'தேங்க்ஸ் டா பாட்டி, சூப்பர்.', en: 'Thanks mate Paati, super.' },
          { text: 'enakku pidikkaadhu.', keys: ['pidikkaadhu.'], why: 'That’s rude to someone who made food for you. Be grateful first.', ta: 'எனக்கு பிடிக்காது.', en: 'I don’t like it.' }
        ],
        right: { text: 'santhosham kannu! nalla saapdu.', audio: 'entrance_t5_right.mp3', ta: 'சந்தோஷம் கண்ணு! நல்லா சாப்டு.', en: 'I’m so happy, dear! Eat well.' },
        wrong: { text: 'aiyo… kashtappattu senjen kannu.', audio: 'entrance_t5_wrong.mp3', ta: 'ஐயோ… கஷ்டப்பட்டு செஞ்சேன் கண்ணு.', en: 'Oh… I worked hard to make it, dear.' } }
    ];
    /* Paste each uploaded file’s asset link here, e.g. 'entrance_t1.mp3': '/_blob/…'. Missing files play nothing. */
    const AUDIO_URLS = AUDIO;
    /* Speech bridge (wired by the /entrance route): Paati's lines play as ElevenLabs TTS of the Tamil script.
       Every file name the board references maps to its `ta` line; the bridge always resolves with an Audio
       element (it falls back to the uploaded backup MP3 when TTS fails). */
    const LINE_BY_AUDIO = {};
    ENTRANCE.forEach((t) => {
      LINE_BY_AUDIO[t.audio] = { ta: t.ta, kind: 'line' };
      LINE_BY_AUDIO[t.right.audio] = { ta: t.right.ta, kind: 'right' };
      LINE_BY_AUDIO[t.wrong.audio] = { ta: t.wrong.ta, kind: 'wrong' };
    });
    const KIND_MOOD = { line: null, right: 'happy', wrong: 'hurt' };
    /* Hearts carry between rooms through this browser key. The kitchen and living room boards read it. */
    const HEART_KEY = 'tamil-rpg:paati-hearts';
    const saveHearts = (n) => { try { const v = JSON.stringify({ hearts: n, from: 'entrance', at: Date.now() }); window.localStorage.setItem(HEART_KEY, v); window.localStorage.setItem('tamil-rpg:hearts:entrance', v); } catch (e) { /* storage unavailable */ } };

    const heartsOn = this.props.heartsOn ?? true;
    const START = Math.max(1, Math.min(5, this.props.startHearts ?? 3));
    const shuffled = () => { const a = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    const S = Object.assign({ screen: 'intro', t: 0, picked: null, order: [[1, 0, 2], [2, 0, 1], [0, 2, 1], [1, 2, 0], [2, 1, 0]], hearts: START, fx: null, fxN: 0, firstTry: {}, tried: {}, mistakes: [], showTa: true, showEn: true, apologyUsed: false, apologyFailed: false, typed: '', via: 'tap', heard: '', matchPct: 0, heardNote: null, voice: 'idle', mode: 'easy', revealed: false }, this.state || {});
    const set = (o) => this.setState(o);

    const play = (file) => {
      try {
        if (this._audio) { this._audio.pause(); this._audio = null; }
        const line = LINE_BY_AUDIO[file];
        if (!line) return;
        if (this.props.tts) {
          this.props.tts(line.ta, KIND_MOOD[line.kind])
            .then((audio) => { this._audio = audio; audio.play(); })
            .catch(() => { /* bridge already fell back to the backup audio */ });
        }
      } catch (e) { /* audio unavailable */ }
    };

    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('r'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    f(0, 0, 13, 25, 'g'); f(0, 0, 13, 1, 'c');
    f(2, 5, 4, 2, 't');
    f(7, 6, 5, 5, 'K');
    f(12, 8, 1, 7, 'P'); f(11, 11, 1, 4, 'P');
    f(13, 0, 1, 25, 'v'); f(13, 7, 1, 3, 'D');
    f(14, 0, 26, 1, 'W'); f(14, 1, 26, 1, 'w'); f(14, 2, 26, 1, 'k');
    g[1][18] = 'C'; g[1][21] = 'o'; g[1][24] = 'f'; g[1][26] = 'f';
    f(27, 0, 3, 3, 'O');
    f(39, 3, 1, 22, 'v');
    f(14, 7, 2, 3, 'm');
    f(14, 11, 3, 2, 'R');
    f(22, 7, 2, 2, 'E');
    f(16, 10, 2, 1, 'T');
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const floor = px('#a4452f', 23, 0, 1, 24) + ',' + px('#a4452f', 0, 23, 24, 1) + ',#b4533c';
    const P = {
      'r': floor,
      'g': px('#cfae7c', 6, 9, 3, 3) + ',' + px('#cfae7c', 16, 17, 3, 3) + ',#dcbc8c',
      'c': px('#b9a68a', 0, 18, 24, 6) + ',#efe4cf',
      't': px('#8f8a80', 0, 20, 24, 4) + ',' + px('#cfcac0', 0, 0, 24, 3) + ',#b5b0a6',
      'K': 'radial-gradient(circle,#fff8ec 0 2px,transparent 2px) 0 0/8px 8px,linear-gradient(45deg,transparent 46%,rgba(255,248,236,.85) 46% 54%,transparent 54%) 0 0/24px 24px,linear-gradient(-45deg,transparent 46%,rgba(255,248,236,.85) 46% 54%,transparent 54%) 0 0/24px 24px,#c9a46f',
      'P': px('#b8b0a2', 3, 3, 18, 18) + ',' + px('#9c9486', 3, 19, 18, 2) + ',#dcbc8c',
      'v': px('#c99a6b', 18, 0, 6, 24) + ',#5b3a22',
      'D': px('#3f8a3e', 0, 2, 4, 4) + ',' + px('#3f8a3e', 0, 14, 4, 4) + ',' + px('#e0a43a', 8, 0, 4, 24) + ',#7a4a2a',
      'W': px('#c99a6b', 0, 20, 24, 4) + ',#5b3a22',
      'w': '#f3e6cf',
      'k': px('#8a5a3a', 0, 14, 24, 10) + ',#f3e6cf',
      'C': px('#c2185b', 4, 3, 16, 5) + ',' + px('#fff6e5', 4, 8, 16, 12) + ',' + px('#1d1d1d', 7, 11, 2, 2) + ',' + px('#1d1d1d', 12, 11, 2, 2) + ',' + px('#1d1d1d', 7, 15, 2, 2) + ',#f3e6cf',
      'o': 'radial-gradient(circle,#fff6e5 0 6px,#5b3a22 6px 8px,transparent 8px),#f3e6cf',
      'f': px('#e9d3a8', 6, 6, 12, 10) + ',' + px('#6b3f22', 4, 4, 16, 14) + ',#f3e6cf',
      'O': 'repeating-linear-gradient(90deg,#c2185b 0 6px,#f2b705 6px 8px,#2e7d32 8px 12px)',
      'm': 'repeating-linear-gradient(0deg,#6b8f71 0 3px,#557a5c 3px 6px)',
      'R': px('#4a2a16', 0, 10, 24, 3) + ',' + px('#4a2a16', 0, 21, 24, 3) + ',#9c6236',
      'E': px('#5b3a22', 0, 0, 3, 24) + ',' + px('#5b3a22', 21, 0, 3, 24) + ',repeating-linear-gradient(0deg,#2f7fbf 0 4px,#f2f2f2 4px 8px)',
      'T': px('#4a2a16', 0, 20, 24, 4) + ',#8a5a3a'
    };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = g[y][x];
      const alt = c === 'r' && (x * 31 + y * 17) % 5 === 0;
      tiles.push({ bg: alt ? px('#a4452f', 23, 0, 1, 24) + ',' + px('#a4452f', 0, 23, 24, 1) + ',#ad4d37' : (P[c] || floor) });
    }

    const toPx = (rows, pal) => rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || '#ff00ff') }));
    const sp = (rows, pal, x, y, size, cls) => ({ left: x, top: y, cols: rows[0].length, px: size, cls: cls || '', pixels: toPx(rows, pal) });
    const BASE = ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '..smms..', '.cddddc.', 'scddddcs', 'scddddcs', '.cddddc.', '..pppp..', '..p..p..', '.ff..ff.'];
    const SAREE = { neutral: ['..hhhh..', '.hjhhhh.', '.hssssh.', '.sesses.', '..ssss..'], smile: ['..hhhh..', '.hjhhhh.', '.hssssh.', '.sesses.', '..smms..'], frown: ['..hhhh..', '.hjhhhh.', '.hesseh.', '.sesses.', '..ssss..'] };
    const SAREE_BODY = ['.krrrgk.', 'skrrrgks', 'srrrrgrs', '.rrrrgr.', '.rrrrgr.', '.rrrrrr.', '.gggggg.'];
    const paatiPal = { h: '#d8d4cc', j: '#ffffff', s: '#a86b45', e: '#1d1d1d', m: '#5a1e12', k: '#2e7d32', r: '#c2185b', g: '#f2b705' };
    const playerPal = { h: '#3b2a20', s: '#c68a5e', e: '#1d1d1d', m: '#c68a5e', c: '#e76f51', d: '#2a9d8f', p: '#264653', f: '#2a2a2a' };
    const thathaPal = { h: '#eeeeee', s: '#8d5a3b', e: '#1d1d1d', m: '#dcdcdc', c: '#f5f2ea', d: '#f5f2ea', p: '#f5f2ea', f: '#5b3a22' };
    const FACE = {
      top: ['...hhhhhh...', '..hhhhhhhhj.', '.hhhhhhhhhjj', '.hssskksssh.'],
      neutral: ['.hsbbssbbsh.', '.hssessessh.', '.EsssSSsssE.', '.SssnnnnssS.', '..SssssssS..'],
      smile: ['.hsbbssbbsh.', '.hssessessh.', '.EscsSSscsE.', '.SsmssssmsS.', '..SsmmmmsS..'],
      frown: ['.hssbssbssh.', '.hssessessh.', '.EsssSSsssE.', '.SssmmmmssS.', '..SmssssmS..'],
      bottom: ['....SssS....', '.llrrrrrrll.', 'lllrrrroolll', 'rrrrrrroorrr', 'rrrrrrorrrrr']
    };
    const facePal = { h: '#d8d4cc', j: '#ffffff', s: '#a86b45', S: '#8e5636', k: '#c2185b', b: '#7a7470', e: '#1d1d1d', E: '#f2b705', n: '#6e2e1e', m: '#5a1e12', c: '#d98a6a', l: '#2e7d32', r: '#c2185b', o: '#f2b705' };
    const faceRows = (ex) => FACE.top.concat(FACE[ex], FACE.bottom);

    const POS = [
      { paati: [348, 156], player: [270, 270] },
      { paati: [348, 156], player: [288, 180] },
      { paati: [348, 156], player: [288, 180] },
      { paati: [600, 180], player: [480, 204] },
      { paati: [420, 192], player: [480, 204] }
    ];
    const END = { paati: [420, 192], player: [480, 204] };

    const isPlay = S.screen === 'play';
    const isEnd = S.screen === 'end';
    const T = Math.min(S.t, 4);
    const turn = ENTRANCE[T];
    const opt = isPlay && S.picked !== null ? turn.options[S.picked] : null;
    const isRight = !!(opt && opt.correct);
    const isWrong = !!(opt && !opt.correct);
    const re = opt ? (isRight ? turn.right : turn.wrong) : { text: '', ta: '', en: '', audio: '' };

    /* Hard mode: Paati's dialogue stays hidden until the player clicks Reveal —
       listen to her voice and answer by mic instead of reading. */
    const isHard = S.mode === 'hard';
    const lineHidden = isHard && !S.revealed;
    const toggleMode = () => set({ mode: isHard ? 'easy' : 'hard', revealed: false });
    const revealLine = () => set({ revealed: true });

    const changeHearts = (d) => {
      if (!heartsOn) return { hearts: S.hearts, fx: null };
      const nh = Math.max(0, Math.min(5, S.hearts + d));
      return { hearts: nh, fx: nh > S.hearts ? { type: 'gain', idx: nh - 1 } : nh < S.hearts ? { type: 'loss', idx: nh } : null };
    };
    /* Answer by option index. `via` records how the player answered: tap, type or voice. */
    const answer = (idx, via, heard, pct) => {
      const o = turn.options[idx];
      const tried = Object.assign({}, S.tried); const firstTry = Object.assign({}, S.firstTry);
      if (!tried[S.t]) firstTry[S.t] = !!o.correct;
      tried[S.t] = true;
      const hc = changeHearts(o.correct ? 1 : -1);
      if (heartsOn) saveHearts(hc.hearts);
      const mistakes = o.correct ? S.mistakes : S.mistakes.concat([{ text: o.text, why: o.why }]);
      play(o.correct ? turn.right.audio : turn.wrong.audio);
      set({ picked: idx, tried: tried, firstTry: firstTry, mistakes: mistakes, hearts: hc.hearts, fx: hc.fx, fxN: S.fxN + 1, via: via, heard: heard || '', matchPct: pct || 0, typed: '', heardNote: null, voice: 'idle' });
    };
    const pick = (display) => () => answer(S.order[S.t][display], 'tap');

    /* Fuzzy match free text (typed or recognised speech, Tanglish or Tamil script) to the closest option. */
    const norm = (s) => (s || '').toLowerCase().replace(/[.,!?‘’“”'"…\-]/g, ' ').replace(/\s+/g, ' ').trim();
    const grams = (s) => { const t = norm(s).replace(/ /g, ''); const out = {}; for (let i = 0; i < t.length - 1; i++) { const k = t.slice(i, i + 2); out[k] = (out[k] || 0) + 1; } return out; };
    const dice = (a, b) => { const A = grams(a), B = grams(b); let inter = 0, na = 0, nb = 0; Object.keys(A).forEach((k) => { na += A[k]; if (B[k]) inter += Math.min(A[k], B[k]); }); Object.keys(B).forEach((k) => { nb += B[k]; }); return na + nb ? (2 * inter) / (na + nb) : 0; };
    const bestMatch = (alts) => {
      let best = { idx: -1, score: 0, heard: alts[0] || '' };
      alts.forEach((h) => turn.options.forEach((o, idx) => { const sc = Math.max(dice(h, o.text), dice(h, o.ta)); if (sc > best.score) best = { idx: idx, score: sc, heard: h }; }));
      return best;
    };
    const resolveFree = (alts, via) => {
      const m = bestMatch(alts.filter((a) => norm(a)));
      if (m.idx >= 0 && m.score >= 0.45) answer(m.idx, via, m.heard, Math.round(m.score * 100));
      else set({ heardNote: { t: (via === 'voice' ? 'We heard “' + m.heard + '”, but it doesn’t match any of Paati’s answers. ' : 'That doesn’t match any of Paati’s answers yet. ') + 'Try again, or tap one below.', c: '#ffb3bd' }, voice: 'idle' });
    };
    const onType = (e) => set({ typed: e && e.target ? e.target.value : '', heardNote: null });
    const submitTyped = () => { if (norm(S.typed)) resolveFree([S.typed], 'type'); else set({ heardNote: { t: 'Type an answer first, or tap one below.', c: '#ffb3bd' } }); };
    const onTypeKey = (e) => { if (e && e.key === 'Enter') { e.preventDefault(); submitTyped(); } };

    const listen = () => {
      if (!(isPlay && S.picked === null)) return;
      if (S.voice === 'listening') { try { this._rec && this._rec.stop(); } catch (e) { /* ignore */ } set({ voice: 'idle' }); return; }
      /* Scribe pipeline (wired by the /entrance route): record with MediaRecorder, batch-STT the clip,
         then fuzzy-match the transcript (Tamil script + Tanglish transliteration) to the closest option. */
      if (this.props.stt) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'audio/ogg;codecs=opus' : undefined;
          const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
          const chunks = [];
          rec.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
          rec.onstop = async () => {
            stream.getTracks().forEach((t) => t.stop());
            if (this.state && this.state.voice === 'listening') set({ voice: 'idle' });
            try {
              const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
              const expected = turn.options.filter((o) => o.correct).map((o) => o.text)[0] || '';
              const draft = await this.props.stt(blob, expected);
              const alts = [draft.transcript_tamil_script, draft.transcript_transliterated].filter(Boolean);
              resolveFree(alts, 'voice');
            } catch (e) {
              set({ heardNote: { t: 'Speech service hiccup. Tap the mic and try again.', c: '#ffb3bd' }, voice: 'error' });
            }
          };
          rec.onerror = () => { stream.getTracks().forEach((t) => t.stop()); set({ voice: 'error' }); };
          this._rec = rec;
          rec.start();
          set({ voice: 'listening', heardNote: null });
        }).catch((e) => set({ voice: e && e.name === 'NotAllowedError' ? 'blocked' : 'error' }));
        return;
      }
      const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
      if (!SR) { set({ voice: 'unsupported' }); return; }
      try {
        const r = new SR();
        r.lang = 'ta-IN'; r.interimResults = false; r.maxAlternatives = 4;
        r.onresult = (ev) => { const res = ev.results && ev.results[0]; const alts = []; if (res) for (let i = 0; i < res.length; i++) alts.push(res[i].transcript); resolveFree(alts, 'voice'); };
        r.onerror = (ev) => set({ voice: ev && (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') ? 'blocked' : ev && ev.error === 'no-speech' ? 'nospeech' : 'error' });
        r.onend = () => { if (this.state && this.state.voice === 'listening') set({ voice: 'idle' }); };
        this._rec = r;
        r.start();
        set({ voice: 'listening', heardNote: null });
      } catch (e) { set({ voice: 'error' }); }
    };

    const reshuffleTurn = (t) => { const order = S.order.slice(); order[t] = shuffled(); return order; };
    const freshOrders = () => [shuffled(), shuffled(), shuffled(), shuffled(), shuffled()];
    const reset = { t: 0, picked: null, hearts: START, fx: null, firstTry: {}, tried: {}, mistakes: [], apologyUsed: false, apologyFailed: false, typed: '', heardNote: null, voice: 'idle', revealed: false };
    const start = () => { play(ENTRANCE[0].audio); if (heartsOn) saveHearts(START); set(Object.assign({ screen: 'play', order: freshOrders() }, reset)); };
    const replay = () => set(Object.assign({ screen: 'intro' }, reset));
    const retry = () => set({ picked: null, order: reshuffleTurn(S.t), typed: '', heardNote: null });
    const cont = () => {
      if (heartsOn && S.hearts <= 0) { set({ screen: 'broken' }); return; }
      if (S.t < 4) { play(ENTRANCE[S.t + 1].audio); set({ t: S.t + 1, picked: null, typed: '', heardNote: null, revealed: false }); }
      else { if (heartsOn) saveHearts(S.hearts); set({ screen: 'end', picked: null }); }
    };
    const replayLine = () => play(turn.audio);
    const replayReaction = () => play(re.audio);
    const apologiseRight = () => { const nh = Math.max(1, Math.min(5, S.hearts + 1)); saveHearts(nh); set({ screen: 'play', picked: null, order: reshuffleTurn(S.t), apologyUsed: true, hearts: nh, fx: { type: 'gain', idx: 0 }, fxN: S.fxN + 1 }); };
    const apologiseWrong = () => set({ apologyUsed: true, apologyFailed: true });
    const toggleTa = () => set({ showTa: !S.showTa });
    const toggleEn = () => set({ showEn: !S.showEn });

    const pos = isEnd ? END : POS[T];
    const paatiEx = isRight ? 'smile' : isWrong ? 'frown' : isEnd ? 'smile' : 'neutral';
    const paatiCls = isRight ? 'hop' : isWrong ? 'shake' : 'breathe';
    const pw = { x: pos.paati[0], y: pos.paati[1], cls: paatiCls, pixels: toPx(SAREE[paatiEx].concat(SAREE_BODY), paatiPal) };
    const thathaHappy = isRight && S.t === 3;
    const people = [
      { left: pos.player[0], top: pos.player[1], cls: '', pixels: toPx(BASE, playerPal) },
      { left: 534, top: 166, cls: thathaHappy ? 'hop' : 'breathe', pixels: toPx(BASE.map((r, i) => (i === 4 ? '..mmmm..' : r)), thathaPal) }
    ];
    const props = [
      sp(['..gg..', '.gggg.', 'g.gg.g', '..gg..', 'wwwwww', 'wkrrkw', 'wrrrrw', 'wwwwww'], { g: '#3f8a3e', w: '#efe4cf', r: '#c8553d', k: '#fff8ec' }, 60, 224, 4, 'sway'),
      sp(['.bbbb.', '..ll..', '.bbbb.', 'bbllbb', 'bbbbbb', '.bbbb.'], { b: '#d4a017', l: '#ffd166' }, 296, 116, 3, ''),
      sp(['b.b', 'b.b', 'b.b'], { b: '#7a4a2a' }, 420, 290, 3, ''),
      sp(['b.b', 'b.b', 'b.b'], { b: '#2b2b3b' }, 440, 294, 3, '')
    ];
    if (S.t >= 4 || isEnd) props.push(sp(['.ssss.', 'sylyls', '.ssss.'], { s: '#d6dbe1', l: '#f2a23a', y: '#ffd166' }, 390, 236, 4, ''));
    if (S.t < 3 && !isEnd) props.push(sp(['..hh..', '.h..h.', 'ssssss', 'sllsss', 'ssssss', 'd....d'], { h: '#222222', s: '#3d5a80', l: '#98c1d9', d: '#222222' }, pos.player[0] + 26, pos.player[1] + 18, 3, ''));

    const badge = { x: pw.x + 12, y: pw.y - 26 };
    const burstCls = ['floatL', 'floatC', 'floatR', 'floatL', 'floatR', 'floatC', 'floatL'];
    const burst = burstCls.map((c, i) => ({ cls: c, x: pw.x - 4 + (i % 4) * 9, y: pw.y - 8 + (i % 3) * 6, d: (i * 0.09).toFixed(2), w: i % 2 ? 14 : 21, h: i % 2 ? 12 : 18 }));
    const portraitBurst = ['floatL', 'floatC', 'floatR'].map((c, i) => ({ cls: c, x: 56 + i * 28, y: 450, d: (0.15 + i * 0.12).toFixed(2) }));
    const endBurst = ['floatL', 'floatC', 'floatR', 'floatL', 'floatC', 'floatR', 'floatL', 'floatC', 'floatR'].map((c, i) => ({ cls: c, x: 60 + i * 56, y: 150 + (i % 2) * 20, d: (i * 0.22).toFixed(2) }));
    const hurt = { x: pw.x + 30, y: pw.y - 24 };

    const fxCls = S.fx ? (S.fx.type === 'gain' ? 'pop' : 'loss') + (S.fxN % 2 ? 'A' : 'B') : '';
    const heartRow = [0, 1, 2, 3, 4].map((i) => ({ c: i < S.hearts ? '#ff4d6d' : '#3a3350', hi: i < S.hearts ? '#ffd6de' : '#3a3350', cls: S.fx && S.fx.idx === i ? fxCls : '' }));
    const heartRowStatic = heartRow.map((h) => ({ c: h.c, hi: h.hi }));
    const introHearts = [0, 1, 2, 3, 4].map((i) => ({ c: i < START ? '#ff4d6d' : '#5a3a48' }));
    const heartNote = S.hearts <= 1 ? { t: 'One heart left. Be careful!', c: '#ff8fa3' } : S.hearts >= 5 ? { t: 'Paati’s heart is full!', c: '#ffd6de' } : { t: 'Hearts carry on to the next room', c: '#c8bcd8' };
    const pips = [0, 1, 2, 3, 4].map((i) => ({ c: isEnd || i < S.t ? '#2a9d8f' : i === S.t && isPlay ? '#ffd166' : '#4a4060' }));

    /* Highlight the words that make the answer right (green) or wrong (red). */
    const cleanW = (w) => w.toLowerCase().replace(/[.,!?]/g, '');
    const keySet = opt ? (opt.keys || []).map(cleanW) : [];
    const parts = opt ? opt.text.split(' ').map((w) => {
      const hit = keySet.indexOf(cleanW(w)) >= 0;
      return { w: w, c: hit ? (isRight ? '#c0dd97' : '#ffb3bd') : '#fff6e5', u: hit ? 'underline' : 'none', bg: hit ? (isRight ? 'rgba(59,109,17,0.35)' : 'rgba(163,45,45,0.35)') : 'transparent' };
    }) : [];
    const viaLabel = { tap: 'You', type: 'You typed', voice: 'You said' }[S.via] || 'You';
    const verdict = isRight
      ? { label: 'Why it’s right', bg: '#173a16', edge: '#3b6d11', chipBg: '#c0dd97', chipInk: '#173404', ink: '#e6f5d6', heart: heartsOn ? (S.hearts >= 5 && S.fx === null ? 'hearts full' : '+1 heart') : '', heartBg: '#c2185b' }
      : { label: 'Why it’s wrong', bg: '#3a1820', edge: '#e63946', chipBg: '#f7c1c1', chipInk: '#501313', ink: '#ffe3e6', heart: heartsOn ? '−1 heart' : '', heartBg: '#6b2b33' };

    const micStates = {
      idle: { label: 'Tap to speak', bg: '#e76f51', edge: '#5a1a12', ink: '#c8bcd8', cls: '', aria: 'Speak your answer in Tamil' },
      listening: { label: 'Listening… tap to stop', bg: '#e63946', edge: '#ffd166', ink: '#ffd166', cls: 'listen', aria: 'Stop listening' },
      unsupported: { label: 'Voice needs Chrome or Edge', bg: '#6a5f80', edge: '#2b2440', ink: '#ffb3bd', cls: '', aria: 'Voice input is not supported in this browser' },
      blocked: { label: 'Allow the microphone to speak', bg: '#6a5f80', edge: '#2b2440', ink: '#ffb3bd', cls: '', aria: 'Microphone access is blocked' },
      nospeech: { label: 'Didn’t hear you. Tap to try again', bg: '#e76f51', edge: '#5a1a12', ink: '#ffb3bd', cls: '', aria: 'Speak your answer in Tamil' },
      error: { label: 'Voice hiccup. Tap to retry', bg: '#e76f51', edge: '#5a1a12', ink: '#ffb3bd', cls: '', aria: 'Speak your answer in Tamil' }
    };
    const mic = Object.assign({ pressed: S.voice === 'listening' ? 'true' : 'false' }, isPlay && S.picked !== null ? { label: 'Answer given', bg: '#4a4060', edge: '#2b2440', ink: '#8a7fa0', cls: '', aria: 'Answer already given' } : micStates[S.voice] || micStates.idle);

    const firstCount = Object.keys(S.firstTry).filter((k) => S.firstTry[k]).length;
    const showNames = this.props.showAudioNames ?? true;
    const note = (file) => (showNames && file && !AUDIO_URLS[file] ? 'audio: ' + file + ' (not uploaded yet)' : '');
    const tog = (on) => ({ pressed: on ? 'true' : 'false', bg: on ? '#9fe1cb' : '#2b2440', ink: on ? '#04342c' : '#9fe1cb' });
    const brokenText = S.apologyFailed ? 'That made it worse: ‘da’ and ‘vidu’ brush an elder off. Paati needs some time. Start the visit again.' : S.apologyUsed ? 'You’ve already apologised once. Paati needs some time. Start the visit again.' : 'You lost all of Paati’s hearts, so she has stopped talking to you. Say sorry the right way to win one heart back and carry on.';

    return {
      tiles, props, people, pw, badge, burst, portraitBurst, endBurst, hurt, heartRow, heartRowStatic, introHearts, heartNote, pips,
      face: toPx(faceRows(paatiEx), facePal), endFace: toPx(faceRows('smile'), facePal),
      portraitCls: isRight ? 'hop' : isWrong ? 'shake' : 'breathe',
      heartsOn: heartsOn, hearts: S.hearts, heartsLabel: S.hearts + ' of 5 hearts',
      heartPanelCls: heartsOn && S.hearts <= 1 && isPlay ? 'alarm' : '',
      introHeartText: 'You start with ' + START + ' of Paati’s 5 hearts',
      showHints: (this.props.showHints ?? true) && !isEnd,
      isIntro: S.screen === 'intro', isPlay: isPlay, isEnd: isEnd, isBroken: S.screen === 'broken',
      noPick: isPlay && S.picked === null, hasPick: isPlay && S.picked !== null,
      talkLine: isPlay && S.picked === null, talkReply: isPlay && S.picked !== null,
      isRight: isRight, isWrong: isWrong, isLove: isRight && heartsOn, isHurt: isWrong && heartsOn,
      showPotHint: isPlay && S.t === 2 && S.picked === null,
      canRetry: isWrong && (!heartsOn || S.hearts > 0), canContinue: isRight || (isWrong && heartsOn && S.hearts <= 0),
      contBtn: isWrong ? { label: 'Paati turns away…', bg: '#6b2b33', edge: '#2a0a10', ink: '#ffd6de' } : { label: S.t < 4 ? 'Continue' : 'Step inside', bg: '#f2b705', edge: '#5a3a00', ink: '#2a1a00' },
      turn: turn, turnNo: T + 1, re: re, verdict: verdict,
      mine: opt ? { via: viaLabel, parts: parts, en: opt.en, why: opt.why || '', hasHeard: S.via !== 'tap' && !!S.heard, heardLine: (S.via === 'voice' ? 'Heard: “' : 'Typed: “') + S.heard + '” · closest answer, ' + S.matchPct + '% match' } : { via: '', parts: [], en: '', why: '', hasHeard: false, heardLine: '' },
      opts: S.order[T].map((idx, i) => { const o = turn.options[idx]; return { n: String(i + 1), text: o.text, ta: o.ta, en: o.en, pick: pick(i) }; }),
      typed: S.typed, onType, onTypeKey, submitTyped, listen, mic: mic,
      hasHeardNote: !!S.heardNote, heardNote: S.heardNote || { t: '', c: '' },
      showTa: S.showTa, showEn: S.showEn, taBtn: tog(S.showTa), enBtn: tog(S.showEn),
      modeLabel: isHard ? 'HARD' : 'EASY', isHard: isHard, lineHidden: lineHidden, revealed: !!S.revealed, toggleMode, revealLine,
      audioNote: { line: note(turn.audio), reply: note(re.audio) },
      pipLabel: 'Turn ' + (T + 1) + ' of 5',
      endStats: 'First-try answers: ' + firstCount + ' of 5' + (heartsOn ? ' · ' + S.hearts + ' of 5 hearts carry on to the kitchen' : ''),
      mistakes: S.mistakes, hasMistakes: S.mistakes.length > 0,
      canApologise: !S.apologyUsed, brokenText: brokenText,
      start, replay, retry, cont, replayLine, replayReaction, apologiseRight, apologiseWrong, toggleTa, toggleEn
    };
  }
}

const DEFAULT_PROPS = {"heartsOn": true, "startHearts": 3, "showHints": true, "showAudioNames": false, "tts": null, "stt": null};

export default function EntranceBoard(passedProps) {
  const v = useDCLogic(Component, Object.assign({}, DEFAULT_PROPS, passedProps));
  return (
    <div className="dc-root dc-entrance">
      <div style={{ position: "relative", width: "960px", height: "600px", overflow: "hidden", background: "#b4533c", fontFamily: "'Pixelify Sans', 'Noto Sans Tamil', monospace", color: "#fff6e5" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(40, 24px)", gridAutoRows: "24px" }}>
          {(v?.tiles || []).map((t, $index) => (
            <React.Fragment key={$index}>
              <div style={{ background: t?.bg }}></div>
            </React.Fragment>
          ))}
        </div>
        {(v?.props || []).map((s, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden="true" className={s?.cls} style={{ position: "absolute", left: `${s?.left ?? ""}px`, top: `${s?.top ?? ""}px`, display: "grid", gridTemplateColumns: `repeat(${s?.cols ?? ""}, ${s?.px ?? ""}px)`, gridAutoRows: `${s?.px ?? ""}px` }}>
              {(s?.pixels || []).map((p, $index) => (
                <React.Fragment key={$index}>
                  <div style={{ background: p?.c }}></div>
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ))}
        {(v?.people || []).map((a, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden="true" className="walk" style={{ position: "absolute", left: `${a?.left ?? ""}px`, top: `${a?.top ?? ""}px` }}>
              <div aria-hidden="true" style={{ position: "absolute", left: "3px", top: "33px", width: "18px", height: "5px", background: "rgba(60,15,5,0.3)" }}></div>
              <div className={a?.cls} style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(8, 3px)", gridAutoRows: "3px" }}>
                {(a?.pixels || []).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <div style={{ background: p?.c }}></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
        <div aria-hidden="true" className="walk" style={{ position: "absolute", left: `${v?.pw?.x ?? ""}px`, top: `${v?.pw?.y ?? ""}px` }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "3px", top: "33px", width: "18px", height: "5px", background: "rgba(60,15,5,0.3)" }}></div>
          <div className={v?.pw?.cls} style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 3px)", gridAutoRows: "3px" }}>
              {(v?.pw?.pixels || []).map((p, $index) => (
                <React.Fragment key={$index}>
                  <div style={{ background: p?.c }}></div>
                </React.Fragment>
              ))}
            </div>
            <div className="blink" style={{ position: "absolute", left: "6px", top: "9px", width: "3px", height: "3px", background: "#a86b45" }}></div>
            <div className="blink" style={{ position: "absolute", left: "15px", top: "9px", width: "3px", height: "3px", background: "#a86b45" }}></div>
            {v?.talkLine ? (
              <>
                <div className="talk" style={{ position: "absolute", left: "9px", top: "12px", width: "6px", height: "3px", background: "#3a0f08" }}></div>
              </>
            ) : null}
            {v?.talkReply ? (
              <>
                <div className="talk" style={{ position: "absolute", left: "9px", top: "12px", width: "6px", height: "3px", background: "#3a0f08" }}></div>
              </>
            ) : null}
          </div>
        </div>
        {v?.showPotHint ? (
          <>
            <div className="bob" aria-hidden="true" style={{ position: "absolute", left: "299px", top: "92px", width: "16px", height: "18px", background: "#9fe1cb", border: "3px solid #0f6e56", color: "#04342c", fontWeight: "600", fontSize: "13px", lineHeight: "18px", textAlign: "center" }}>
              {"!"}
            </div>
          </>
        ) : null}
        {v?.showHints ? (
          <>
            <div style={{ position: "absolute", left: `${v?.badge?.x ?? ""}px`, top: `${v?.badge?.y ?? ""}px`, transform: "translateX(-50%)", padding: "1px 6px", background: "#ffd166", border: "2px solid #7a4a00", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", lineHeight: "1.4", color: "#3a2400", whiteSpace: "nowrap", transition: "left .9s steps(9), top .9s steps(9)" }}>
              {"\u0ba8\u0bc0\u0b99\u0bcd\u0b95"}
            </div>
          </>
        ) : null}
        {v?.isLove ? (
          <>
            {(v?.burst || []).map((b, $index) => (
              <React.Fragment key={$index}>
                <div aria-hidden="true" className={b?.cls} style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, animationDelay: `${b?.d ?? ""}s` }}>
                  <svg width={b?.w} height={b?.h} viewBox="0 0 7 6" shapeRendering="crispEdges">
                    <rect x="1" y="0" width="2" height="1" fill="#ff4d6d"></rect>
                    <rect x="4" y="0" width="2" height="1" fill="#ff4d6d"></rect>
                    <rect x="0" y="1" width="7" height="2" fill="#ff4d6d"></rect>
                    <rect x="1" y="3" width="5" height="1" fill="#ff4d6d"></rect>
                    <rect x="2" y="4" width="3" height="1" fill="#ff4d6d"></rect>
                    <rect x="3" y="5" width="1" height="1" fill="#ff4d6d"></rect>
                    <rect x="1" y="1" width="1" height="1" fill="#ffd6de"></rect>
                  </svg>
                </div>
              </React.Fragment>
            ))}
          </>
        ) : null}
        {v?.isHurt ? (
          <>
            <div aria-hidden="true" style={{ position: "absolute", left: `${v?.hurt?.x ?? ""}px`, top: `${v?.hurt?.y ?? ""}px`, width: "28px", height: "24px" }}>
              <svg className="crackL" style={{ position: "absolute", left: "0", top: "0" }} width="28" height="24" viewBox="0 0 7 6" shapeRendering="crispEdges">
                <rect x="1" y="0" width="2" height="1" fill="#e63946"></rect>
                <rect x="0" y="1" width="3" height="1" fill="#e63946"></rect>
                <rect x="0" y="2" width="4" height="1" fill="#e63946"></rect>
                <rect x="1" y="3" width="2" height="1" fill="#e63946"></rect>
                <rect x="2" y="4" width="1" height="1" fill="#e63946"></rect>
                <rect x="1" y="1" width="1" height="1" fill="#ffd6de"></rect>
              </svg>
              <svg className="crackR" style={{ position: "absolute", left: "0", top: "0" }} width="28" height="24" viewBox="0 0 7 6" shapeRendering="crispEdges">
                <rect x="4" y="0" width="2" height="1" fill="#e63946"></rect>
                <rect x="3" y="1" width="4" height="1" fill="#e63946"></rect>
                <rect x="4" y="2" width="3" height="1" fill="#e63946"></rect>
                <rect x="3" y="3" width="3" height="1" fill="#e63946"></rect>
                <rect x="3" y="4" width="2" height="1" fill="#e63946"></rect>
                <rect x="3" y="5" width="1" height="1" fill="#e63946"></rect>
              </svg>
            </div>
          </>
        ) : null}
        <div className={v?.heartPanelCls} style={{ position: "absolute", left: "12px", top: "12px", width: "236px", boxSizing: "border-box", padding: "8px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span>
              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px" }}>
                {"\u0bb5\u0bbe\u0b9a\u0bb2\u0bcd"}
              </span>
              <span style={{ fontSize: "12px", color: "#f6dcb8" }}>
                {" \u00b7 front door"}
              </span>
            </span>
            <button onClick={v?.toggleMode} title={v?.isHard ? "Back to easy mode" : "Hard mode: Paati\u2019s words are hidden \u2014 listen and answer by voice"} style={{ padding: "0 6px", background: v?.isHard ? "#e63946" : "#2a9d8f", color: "#04241f", fontWeight: "600", fontSize: "12px", cursor: "pointer", border: "none" }}>
              {v?.modeLabel}
            </button>
          </div>
          {v?.heartsOn ? (
            <>
              <div role="meter" aria-label="Paati\u2019s affection" aria-valuemin="0" aria-valuemax="5" aria-valuenow={v?.hearts} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {(v?.heartRow || []).map((ht, $index) => (
                  <React.Fragment key={$index}>
                    <svg className={ht?.cls} width="25" height="21" viewBox="0 0 7 6" shapeRendering="crispEdges" aria-hidden="true">
                      <rect x="1" y="0" width="2" height="1" fill={ht?.c}></rect>
                      <rect x="4" y="0" width="2" height="1" fill={ht?.c}></rect>
                      <rect x="0" y="1" width="7" height="2" fill={ht?.c}></rect>
                      <rect x="1" y="3" width="5" height="1" fill={ht?.c}></rect>
                      <rect x="2" y="4" width="3" height="1" fill={ht?.c}></rect>
                      <rect x="3" y="5" width="1" height="1" fill={ht?.c}></rect>
                      <rect x="1" y="1" width="1" height="1" fill={ht?.hi}></rect>
                    </svg>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ fontSize: "11px", color: v?.heartNote?.c }}>
                {v?.heartNote?.t}
              </div>
            </>
          ) : null}
        </div>
        <div style={{ position: "absolute", right: "12px", top: "12px", width: "212px", boxSizing: "border-box", padding: "8px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#ffd166" }}>
              {"House map"}
            </span>
            <span aria-label={v?.pipLabel} style={{ display: "flex", gap: "3px" }}>
              {(v?.pips || []).map((pp, $index) => (
                <React.Fragment key={$index}>
                  <span style={{ width: "8px", height: "8px", background: pp?.c }}></span>
                </React.Fragment>
              ))}
            </span>
          </div>
          <div style={{ position: "relative", height: "84px" }}>
            <div style={{ position: "absolute", left: "0", top: "10px", width: "58px", height: "64px", boxSizing: "border-box", background: "#ffd166", border: "2px solid #7a4a00", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "11px", color: "#3a2400" }}>
              {"\u0bb5\u0bbe\u0b9a\u0bb2\u0bcd"}
            </div>
            <div style={{ position: "absolute", left: "70px", top: "0", width: "118px", height: "38px", boxSizing: "border-box", background: "#2b2440", border: "2px solid #4a4060", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "11px", color: "#c8bcd8" }}>
              {"\u0b9a\u0bae\u0bc8\u0baf\u0bb2\u0bb1\u0bc8"}
            </div>
            <div style={{ position: "absolute", left: "70px", top: "46px", width: "118px", height: "38px", boxSizing: "border-box", background: "#2b2440", border: "2px solid #4a4060", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "11px", color: "#c8bcd8" }}>
              {"\u0bb9\u0bbe\u0bb2\u0bcd"}
            </div>
            <div aria-hidden="true" style={{ position: "absolute", left: "60px", top: "18px", width: "3px", height: "3px", background: "#ffd166" }}></div>
            <div aria-hidden="true" style={{ position: "absolute", left: "65px", top: "18px", width: "3px", height: "3px", background: "#ffd166" }}></div>
            <div aria-hidden="true" style={{ position: "absolute", left: "128px", top: "40px", width: "3px", height: "3px", background: "#6a5f80" }}></div>
          </div>
        </div>
        {v?.isPlay ? (
          <>
            <div style={{ position: "absolute", left: "16px", top: "340px", width: "928px", height: "248px", boxSizing: "border-box", padding: "14px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e9c46a", display: "flex", gap: "16px" }}>
              <div style={{ width: "104px", height: "150px", flexShrink: "0", boxSizing: "border-box", background: "#3a2a40", border: "3px solid #e9c46a" }}></div>
              <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                {v?.noPick ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "13px", color: "#ffd166", flexShrink: "0" }}>
                        {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf"}
                      </span>
                      {v?.lineHidden ? (
                        <button onClick={v?.revealLine} style={{ fontSize: "14px", padding: "6px 12px", background: "#2b2440", border: "2px dashed #e9c46a", color: "#ffd166", fontFamily: "'Pixelify Sans', monospace", cursor: "pointer" }}>
                          {"Hidden \u00b7 click to reveal what she said"}
                        </button>
                      ) : (
                        <span style={{ fontSize: "21px", lineHeight: "1.25", color: "#ffffff" }}>
                          {"\u201c"}{v?.turn?.paati}{"\u201d"}
                        </span>
                      )}
                      <button onClick={v?.replayLine} aria-label="Replay Paati\u2019s line" style={{ height: "28px", padding: "0 8px", background: "#2b2440", border: "2px solid #9fe1cb", color: "#9fe1cb", fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", flexShrink: "0" }}>
                        <svg width="8" height="10" viewBox="0 0 4 5" shapeRendering="crispEdges" aria-hidden="true">
                          <rect x="0" y="0" width="1" height="5" fill="#9fe1cb"></rect>
                          <rect x="1" y="1" width="2" height="3" fill="#9fe1cb"></rect>
                          <rect x="3" y="2" width="1" height="1" fill="#9fe1cb"></rect>
                        </svg>
                        {"Replay"}
                      </button>
                      <span style={{ marginLeft: "auto", fontSize: "11px", color: "#a89cb8", textAlign: "right" }}>
                        {v?.audioNote?.line}
                      </span>
                    </div>
                    {v?.showTa && !v?.lineHidden ? (
                      <>
                        <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#9fe1cb" }}>
                          {v?.turn?.ta}
                        </div>
                      </>
                    ) : null}
                    {v?.showEn && !v?.lineHidden ? (
                      <>
                        <div style={{ fontSize: "13px", color: "#c8bcd8" }}>
                          {v?.turn?.en}
                        </div>
                      </>
                    ) : null}
                    {v?.hasHeardNote ? (
                      <>
                        <div role="status" style={{ fontSize: "12px", color: v?.heardNote?.c }}>
                          {v?.heardNote?.t}
                        </div>
                      </>
                    ) : null}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginTop: "auto" }}>
                      {(v?.opts || []).map((o, $index) => (
                        <React.Fragment key={$index}>
                          <button className="opt" onClick={o?.pick} title={v?.lineHidden ? undefined : o?.text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "6px 8px", minHeight: "52px", background: "#2b2440", border: "2px solid #e9c46a", color: "#fff6e5", cursor: "pointer", textAlign: "left" }}>
                            <span aria-hidden="true" style={{ flexShrink: "0", padding: "0 4px", background: "#e9c46a", color: "#1f1a2e", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "11px", lineHeight: "15px" }}>
                              {o?.n}
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", minWidth: "0", flex: "1" }}>
                              <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {o?.text}
                              </span>
                              {v?.showTa && !v?.lineHidden ? (
                                <>
                                  <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "500", fontSize: "11px", color: "#9fe1cb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {o?.ta}
                                  </span>
                                </>
                              ) : null}
                              {v?.showEn && !v?.lineHidden ? (
                                <>
                                  <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", color: "#c8bcd8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {o?.en}
                                  </span>
                                </>
                              ) : null}
                            </span>
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                {v?.hasPick ? (
                  <>
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline", flexWrap: "wrap", padding: "4px 8px", background: "#2b2440", border: "2px solid #4a4060" }}>
                      <span style={{ fontSize: "12px", color: "#ffd166", flexShrink: "0" }}>
                        {v?.mine?.via}
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {(v?.mine?.parts || []).map((pt, $index) => (
                          <React.Fragment key={$index}>
                            <span style={{ color: pt?.c, textDecoration: pt?.u, textUnderlineOffset: "3px", background: pt?.bg }}>
                              {pt?.w}
                            </span>
                            <span>
                              {" "}
                            </span>
                          </React.Fragment>
                        ))}
                      </span>
                      {v?.showEn ? (
                        <>
                          <span style={{ fontSize: "12px", color: "#c8bcd8" }}>
                            {v?.mine?.en}
                          </span>
                        </>
                      ) : null}
                    </div>
                    {v?.mine?.hasHeard ? (
                      <>
                        <div style={{ fontSize: "11px", color: "#a89cb8" }}>
                          {v?.mine?.heardLine}
                        </div>
                      </>
                    ) : null}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "13px", color: "#ffd166", flexShrink: "0" }}>
                        {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf"}
                      </span>
                      <span style={{ fontSize: "17px", lineHeight: "1.25", color: "#ffffff" }}>
                        {"\u201c"}{v?.re?.text}{"\u201d"}
                      </span>
                      <button onClick={v?.replayReaction} aria-label="Replay Paati\u2019s reaction" style={{ height: "26px", padding: "0 8px", background: "#2b2440", border: "2px solid #9fe1cb", color: "#9fe1cb", fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", flexShrink: "0" }}>
                        <svg width="8" height="10" viewBox="0 0 4 5" shapeRendering="crispEdges" aria-hidden="true">
                          <rect x="0" y="0" width="1" height="5" fill="#9fe1cb"></rect>
                          <rect x="1" y="1" width="2" height="3" fill="#9fe1cb"></rect>
                          <rect x="3" y="2" width="1" height="1" fill="#9fe1cb"></rect>
                        </svg>
                        {"Replay"}
                      </button>
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      {v?.showTa ? (
                        <>
                          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "500", color: "#9fe1cb" }}>
                            {v?.re?.ta}{" "}
                          </span>
                        </>
                      ) : null}
                      {v?.showEn ? (
                        <>
                          <span style={{ color: "#c8bcd8" }}>
                            {"\u00b7 "}{v?.re?.en}
                          </span>
                        </>
                      ) : null}
                      <span style={{ color: "#a89cb8" }}>
                        {" "}{v?.audioNote?.reply}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", padding: "5px 8px", background: v?.verdict?.bg, border: `2px solid ${v?.verdict?.edge ?? ""}` }}>
                      <span style={{ padding: "0 6px", background: v?.verdict?.chipBg, color: v?.verdict?.chipInk, fontSize: "12px", fontWeight: "600", flexShrink: "0", whiteSpace: "nowrap" }}>
                        {v?.verdict?.label}
                      </span>
                      <span style={{ fontSize: "13px", lineHeight: "1.35", color: v?.verdict?.ink, flex: "1", minWidth: "0" }}>
                        {v?.mine?.why}
                      </span>
                      {v?.heartsOn ? (
                        <>
                          <span style={{ padding: "0 6px", background: v?.verdict?.heartBg, color: "#ffffff", fontSize: "12px", fontWeight: "600", flexShrink: "0", whiteSpace: "nowrap" }}>
                            {v?.verdict?.heart}
                          </span>
                        </>
                      ) : null}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "auto" }}>
                      <span style={{ flex: "1" }}></span>
                      {v?.canRetry ? (
                        <>
                          <button onClick={v?.retry} style={{ minHeight: "44px", padding: "0 16px", background: "#f2b705", border: "2px solid #5a3a00", color: "#2a1a00", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                            {"Try again"}
                          </button>
                        </>
                      ) : null}
                      {v?.canContinue ? (
                        <>
                          <button onClick={v?.cont} style={{ minHeight: "44px", padding: "0 16px", background: v?.contBtn?.bg, border: `2px solid ${v?.contBtn?.edge ?? ""}`, color: v?.contBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                            {v?.contBtn?.label}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
              <div style={{ width: "92px", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button onClick={v?.toggleTa} aria-pressed={v?.taBtn?.pressed} aria-label="Show Tamil script" style={{ width: "42px", height: "28px", padding: "0", background: v?.taBtn?.bg, border: "2px solid #9fe1cb", color: v?.taBtn?.ink, fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>
                    {"\u0ba4"}
                  </button>
                  <button onClick={v?.toggleEn} aria-pressed={v?.enBtn?.pressed} aria-label="Show English" style={{ width: "42px", height: "28px", padding: "0", background: v?.enBtn?.bg, border: "2px solid #9fe1cb", color: v?.enBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", cursor: "pointer" }}>
                    {"EN"}
                  </button>
                </div>
                <button onClick={v?.listen} aria-label={v?.mic?.aria} aria-pressed={v?.mic?.pressed} className={v?.mic?.cls} style={{ width: "60px", height: "60px", border: `4px solid ${v?.mic?.edge ?? ""}`, background: v?.mic?.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="28" height="32" viewBox="0 0 7 8" shapeRendering="crispEdges" aria-hidden="true">
                    <rect x="2" y="0" width="3" height="5" fill="#fff6e5"></rect>
                    <rect x="1" y="3" width="1" height="2" fill="#fff6e5"></rect>
                    <rect x="5" y="3" width="1" height="2" fill="#fff6e5"></rect>
                    <rect x="2" y="5" width="3" height="1" fill="#fff6e5"></rect>
                    <rect x="3" y="6" width="1" height="1" fill="#fff6e5"></rect>
                    <rect x="1" y="7" width="5" height="1" fill="#fff6e5"></rect>
                  </svg>
                </button>
                <div role="status" style={{ fontSize: "11px", lineHeight: "1.3", color: v?.mic?.ink, textAlign: "center" }}>
                  {v?.mic?.label}
                </div>
              </div>
            </div>
            <div aria-hidden="true" className={v?.portraitCls} style={{ position: "absolute", left: "44px", top: "384px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 7px)", gridAutoRows: "7px" }}>
                {(v?.face || []).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <div style={{ background: p?.c }}></div>
                  </React.Fragment>
                ))}
              </div>
              <div className="blink" style={{ position: "absolute", left: "28px", top: "35px", width: "7px", height: "7px", background: "#a86b45" }}></div>
              <div className="blink" style={{ position: "absolute", left: "49px", top: "35px", width: "7px", height: "7px", background: "#a86b45" }}></div>
              {v?.talkLine ? (
                <>
                  <div className="talk" style={{ position: "absolute", left: "35px", top: "49px", width: "14px", height: "14px", background: "#3a0f08" }}></div>
                </>
              ) : null}
              {v?.talkReply ? (
                <>
                  <div className="talk" style={{ position: "absolute", left: "35px", top: "49px", width: "14px", height: "14px", background: "#3a0f08" }}></div>
                </>
              ) : null}
            </div>
            {v?.isLove ? (
              <>
                {(v?.portraitBurst || []).map((b, $index) => (
                  <React.Fragment key={$index}>
                    <div aria-hidden="true" className={b?.cls} style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, animationDelay: `${b?.d ?? ""}s` }}>
                      <svg width="14" height="12" viewBox="0 0 7 6" shapeRendering="crispEdges">
                        <rect x="1" y="0" width="2" height="1" fill="#ff4d6d"></rect>
                        <rect x="4" y="0" width="2" height="1" fill="#ff4d6d"></rect>
                        <rect x="0" y="1" width="7" height="2" fill="#ff4d6d"></rect>
                        <rect x="1" y="3" width="5" height="1" fill="#ff4d6d"></rect>
                        <rect x="2" y="4" width="3" height="1" fill="#ff4d6d"></rect>
                        <rect x="3" y="5" width="1" height="1" fill="#ff4d6d"></rect>
                      </svg>
                    </div>
                  </React.Fragment>
                ))}
              </>
            ) : null}
          </>
        ) : null}
        {v?.isIntro ? (
          <>
            <div style={{ position: "absolute", inset: "0", background: "rgba(20,12,24,0.62)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "560px", boxSizing: "border-box", padding: "22px 24px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e9c46a", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "12px", color: "#ffd166" }}>
                  {"Paati\u2019s house \u00b7 stop 1 of 3"}
                </div>
                <div style={{ fontSize: "26px", lineHeight: "1.2" }}>
                  <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                    {"\u0bb5\u0bbe\u0b9a\u0bb2\u0bcd"}
                  </span>
                  {" \u00b7 Arriving for the visit"}
                </div>
                <div style={{ fontSize: "14px", lineHeight: "1.5", color: "#e8dcc8" }}>
                  {"You\u2019ve just reached Paati\u2019s front door. Greet her, answer her five questions kindly and respectfully, and make your way inside."}
                </div>
                <div style={{ fontSize: "12px", lineHeight: "1.5", color: "#ffd166" }}>
                  {"Hard mode: Paati\u2019s words are hidden \u2014 listen and answer by voice. Tap Reveal if stuck."}
                </div>
                {v?.heartsOn ? (
                  <>
                    <div style={{ padding: "10px 12px", background: "#3a0f1e", border: "2px solid #ff8fa3", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        {(v?.introHearts || []).map((ht, $index) => (
                          <React.Fragment key={$index}>
                            <svg width="21" height="18" viewBox="0 0 7 6" shapeRendering="crispEdges" aria-hidden="true">
                              <rect x="1" y="0" width="2" height="1" fill={ht?.c}></rect>
                              <rect x="4" y="0" width="2" height="1" fill={ht?.c}></rect>
                              <rect x="0" y="1" width="7" height="2" fill={ht?.c}></rect>
                              <rect x="1" y="3" width="5" height="1" fill={ht?.c}></rect>
                              <rect x="2" y="4" width="3" height="1" fill={ht?.c}></rect>
                              <rect x="3" y="5" width="1" height="1" fill={ht?.c}></rect>
                            </svg>
                          </React.Fragment>
                        ))}
                        <span style={{ fontSize: "13px", color: "#ffd6de", marginLeft: "4px" }}>
                          {v?.introHeartText}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#ffe8b0", lineHeight: "1.5" }}>
                        {"A kind answer wins a heart and a smile. A careless one costs a heart and a frown. Lose them all and Paati stops talking."}
                      </div>
                    </div>
                  </>
                ) : null}
                <button onClick={v?.start} style={{ alignSelf: "flex-start", minHeight: "44px", padding: "0 18px", background: "#f2b705", border: "3px solid #5a3a00", color: "#2a1a00", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "16px", cursor: "pointer" }}>
                  {"Ring the bell"}
                </button>
              </div>
            </div>
          </>
        ) : null}
        {v?.isBroken ? (
          <>
            <div style={{ position: "absolute", inset: "0", background: "rgba(10,4,12,0.78)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="alarm" style={{ width: "580px", boxSizing: "border-box", padding: "22px 24px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e63946", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>
                    {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf\u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bae\u0bbe \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1"}
                  </div>
                  <div style={{ fontSize: "14px", color: "#ffb3bd" }}>
                    {"paatikku varuthamaa irukku \u00b7 Paati is hurt"}
                  </div>
                </div>
                <div style={{ fontSize: "14px", lineHeight: "1.5", color: "#e8dcc8" }}>
                  {v?.brokenText}
                </div>
                {v?.canApologise ? (
                  <>
                    <div style={{ fontSize: "12px", color: "#ffd166" }}>
                      {"Pick the right way to say sorry to an elder:"}
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button onClick={v?.apologiseWrong} style={{ minHeight: "52px", padding: "6px 12px", background: "#2b2440", border: "2px solid #e9c46a", color: "#fff6e5", cursor: "pointer", textAlign: "left", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px" }}>
                        {"sorry paati da, vidu!"}
                      </button>
                      <button onClick={v?.apologiseRight} style={{ minHeight: "52px", padding: "6px 12px", background: "#2b2440", border: "2px solid #e9c46a", color: "#fff6e5", cursor: "pointer", textAlign: "left", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px" }}>
                        {"mannichidunga paati."}
                      </button>
                    </div>
                  </>
                ) : null}
                <button onClick={v?.replay} style={{ minHeight: "44px", padding: "0 14px", background: "#3a3350", border: "3px solid #e9c46a", color: "#fff6e5", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                  {"Start the visit again"}
                </button>
              </div>
            </div>
          </>
        ) : null}
        {v?.isEnd ? (
          <>
            <div style={{ position: "absolute", inset: "0", background: "rgba(20,12,24,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="glow" style={{ width: "600px", boxSizing: "border-box", padding: "24px 26px", background: "#1f1a2e", border: "4px solid #ff8fa3", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", textAlign: "center", position: "relative" }}>
                {(v?.endBurst || []).map((b, $index) => (
                  <React.Fragment key={$index}>
                    <div aria-hidden="true" className={b?.cls} style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, animationDelay: `${b?.d ?? ""}s`, animationIterationCount: "infinite" }}>
                      <svg width="18" height="15" viewBox="0 0 7 6" shapeRendering="crispEdges">
                        <rect x="1" y="0" width="2" height="1" fill="#ff4d6d"></rect>
                        <rect x="4" y="0" width="2" height="1" fill="#ff4d6d"></rect>
                        <rect x="0" y="1" width="7" height="2" fill="#ff4d6d"></rect>
                        <rect x="1" y="3" width="5" height="1" fill="#ff4d6d"></rect>
                        <rect x="2" y="4" width="3" height="1" fill="#ff4d6d"></rect>
                        <rect x="3" y="5" width="1" height="1" fill="#ff4d6d"></rect>
                      </svg>
                    </div>
                  </React.Fragment>
                ))}
                <div className="hop" aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "repeat(12, 6px)", gridAutoRows: "6px", animationIterationCount: "infinite", animationDuration: "1.4s" }}>
                  {(v?.endFace || []).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <div style={{ background: p?.c }}></div>
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ fontSize: "28px", lineHeight: "1.2", color: "#ffd166", fontWeight: "600" }}>
                  {"You\u2019re home! Paati is happy."}
                </div>
                {v?.heartsOn ? (
                  <>
                    <div role="img" aria-label={v?.heartsLabel} style={{ display: "flex", gap: "6px" }}>
                      {(v?.heartRowStatic || []).map((ht, $index) => (
                        <React.Fragment key={$index}>
                          <svg width="28" height="24" viewBox="0 0 7 6" shapeRendering="crispEdges" aria-hidden="true">
                            <rect x="1" y="0" width="2" height="1" fill={ht?.c}></rect>
                            <rect x="4" y="0" width="2" height="1" fill={ht?.c}></rect>
                            <rect x="0" y="1" width="7" height="2" fill={ht?.c}></rect>
                            <rect x="1" y="3" width="5" height="1" fill={ht?.c}></rect>
                            <rect x="2" y="4" width="3" height="1" fill={ht?.c}></rect>
                            <rect x="3" y="5" width="1" height="1" fill={ht?.c}></rect>
                            <rect x="1" y="1" width="1" height="1" fill={ht?.hi}></rect>
                          </svg>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                <div style={{ fontSize: "13px", color: "#e8dcc8" }}>
                  {v?.endStats}
                </div>
                {v?.hasMistakes ? (
                  <>
                    <div style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", background: "#2b2440", border: "2px solid #4a4060", display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" }}>
                      <div style={{ fontSize: "12px", color: "#ff9f80" }}>
                        {"Phrases to review"}
                      </div>
                      {(v?.mistakes || []).map((mk, $index) => (
                        <React.Fragment key={$index}>
                          <div style={{ fontSize: "12px", color: "#fff6e5" }}>
                            {"\u201c"}{mk?.text}{"\u201d "}
                            <span style={{ color: "#c8bcd8" }}>
                              {"\u00b7 "}{mk?.why}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  <button onClick={v?.replay} style={{ minHeight: "44px", padding: "0 14px", background: "#3a3350", border: "3px solid #e9c46a", color: "#fff6e5", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                    {"Play the entrance again"}
                  </button>
                  <Link to="/" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", boxSizing: "border-box", padding: "0 14px", background: "#f2b705", border: "3px solid #5a3a00", color: "#2a1a00", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                    {"Follow Paati inside · next rooms coming soon"}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
