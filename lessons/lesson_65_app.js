// ==========================================================================
// APP LOGIC: LESSON 65 (我们在哪里？ - Chúng Ta Đang Ở Đâu?) - RPG Edition
// Includes Vocabulary data, Web Audio, TTS, Games, PDF generation & Telegram
// ==========================================================================

const vocabularyList = [
  {
    "word": "哪里",
    "pinyin": "nǎlǐ",
    "meaning_vi": "Ở đâu, đâu",
    "meaning_en": "where",
    "sentence": "请问我们在哪里？",
    "sentence_pinyin": "Qǐngwèn wǒmen zài nǎlǐ?",
    "sentence_vi": "Xin hỏi chúng ta đang ở đâu vậy?"
  },
  {
    "word": "迷路",
    "pinyin": "mílù",
    "meaning_vi": "Lạc đường",
    "meaning_en": "get lost",
    "sentence": "糟糕，我们好像迷路了。",
    "sentence_pinyin": "Zāogāo, wǒmen hǎoxiàng mílù le.",
    "sentence_vi": "Hỏng rồi, hình như chúng mình lạc đường rồi."
  },
  {
    "word": "地图",
    "pinyin": "dìtú",
    "meaning_vi": "Bản đồ",
    "meaning_en": "map",
    "sentence": "快拿地图出来看看。",
    "sentence_pinyin": "Kuài ná dìtú chūlái kànkan.",
    "sentence_vi": "Mau lấy bản đồ ra xem thử nào."
  },
  {
    "word": "指南针",
    "pinyin": "zhǐnánzhēn",
    "meaning_vi": "La bàn",
    "meaning_en": "compass",
    "sentence": "用指南针可以辨别方向。",
    "sentence_pinyin": "Yòng zhǐnánzhēn kěyǐ biànbié fāngxiàng.",
    "sentence_vi": "Dùng la bàn có thể phân biệt phương hướng."
  },
  {
    "word": "方向",
    "pinyin": "fāngxiàng",
    "meaning_vi": "Phương hướng, hướng",
    "meaning_en": "direction",
    "sentence": "这个方向对吗？",
    "sentence_pinyin": "Zhège fāngxiàng duì ma?",
    "sentence_vi": "Hướng này có đúng không?"
  },
  {
    "word": "森林",
    "pinyin": "sēnlín",
    "meaning_vi": "Rừng rậm, khu rừng",
    "meaning_en": "forest",
    "sentence": "这片森林非常茂密。",
    "sentence_pinyin": "Zhè piàn sēnlín fēicháng màomì.",
    "sentence_vi": "Khu rừng này rất rậm rạp."
  },
  {
    "word": "茂密",
    "pinyin": "màomì",
    "meaning_vi": "Rậm rạp, xanh tốt",
    "meaning_en": "dense, thick",
    "sentence": "山上长满了茂密的竹林。",
    "sentence_pinyin": "Shānshàng zhǎngmǎn le màomì de zhúlín.",
    "sentence_vi": "Trên núi mọc đầy những rừng trúc xanh tốt rậm rạp."
  },
  {
    "word": "奇怪",
    "pinyin": "qíguài",
    "meaning_vi": "Kỳ lạ, quái dị",
    "meaning_en": "strange, weird",
    "sentence": "这里的感觉有些奇怪。",
    "sentence_pinyin": "Zhèlǐ de gǎnjué yǒuxiē qíguài.",
    "sentence_vi": "Cảm giác ở đây có chút kỳ lạ."
  },
  {
    "word": "声音",
    "pinyin": "shēngyīn",
    "meaning_vi": "Âm thanh, tiếng",
    "meaning_en": "sound, voice",
    "sentence": "你听到了什么声音吗？",
    "sentence_pinyin": "Nǐ tīngdào le shénme shēngyīn ma?",
    "sentence_vi": "Cậu có nghe thấy âm thanh gì không?"
  },
  {
    "word": "寻找",
    "pinyin": "xúnzhǎo",
    "meaning_vi": "Tìm kiếm, đi tìm",
    "meaning_en": "look for, search",
    "sentence": "我们在寻找出路。",
    "sentence_pinyin": "Wǒmen zài xúnzhǎo chūlù.",
    "sentence_vi": "Chúng tớ đang tìm lối ra."
  }
];

// AUDIO SYNTHESIZER
let audioEnabled = true;
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

const soundEffects = {
  click: () => {
    if (!audioEnabled) return;
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  },
  success: () => {
    if (!audioEnabled) return;
    initAudioContext();
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.3);
    });
  },
  error: () => {
    if (!audioEnabled) return;
    initAudioContext();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.3);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start();
    osc.stop(now + 0.3);
  },
  trainWhistle: () => {
    if (!audioEnabled) return;
    initAudioContext();
    const now = audioCtx.currentTime;
    const freqs = [587.33, 622.25];
    freqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq + 5, now + 0.2);
      osc.frequency.linearRampToValueAtTime(freq - 5, now + 0.5);
      osc.frequency.linearRampToValueAtTime(freq, now + 0.8);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.start();
      osc.stop(now + 0.85);
    });
  }
};

// TTS SYSTEM
let chineseVoice = null;
function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  chineseVoice = voices.find(v => v.lang.startsWith('zh-CN')) ||
                 voices.find(v => v.lang.startsWith('zh')) ||
                 null;
}
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speakChinese(text, onEndCallback = null) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  } else {
    utterance.lang = 'zh-CN';
  }
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  if (onEndCallback) utterance.onend = onEndCallback;
  window.speechSynthesis.speak(utterance);
}

// MAIN STATE
const state = {
  currentSlide: 0,
  gameMatch: {
    selectedWords: [],
    matchedCount: 0
  },
  gameQuiz: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    bossHP: 100,
    playerLives: 3
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupAudioToggle();
  setupSlideDeck();
  setupTrainGame();
  setupQuizGame();
  setupReporting();
});

function setupTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      soundEffects.click();
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      document.getElementById(target).classList.add('active');
      if (target === 'section-game-match') {
        startTrainGame();
      } else if (target === 'section-game-quiz') {
        startQuizGame();
      }
    });
  });
}

function setupAudioToggle() {
  const btn = document.getElementById('btn-sound-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    const textSpan = btn.querySelector('.btn-text');
    const path = document.getElementById('sound-icon-path');
    if (audioEnabled) {
      if (textSpan) textSpan.textContent = "Âm thanh: Bật";
      if (path) path.setAttribute('d', 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z');
      soundEffects.click();
    } else {
      if (textSpan) textSpan.textContent = "Âm thanh: Tắt";
      if (path) path.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
    }
  });
}

// SLIDE DECK SYSTEM
function setupSlideDeck() {
  renderSlide();
  document.getElementById('btn-prev-slide').addEventListener('click', () => {
    if (state.currentSlide > 0) {
      soundEffects.click();
      state.currentSlide--;
      renderSlide();
    }
  });
  document.getElementById('btn-next-slide').addEventListener('click', () => {
    if (state.currentSlide < vocabularyList.length - 1) {
      soundEffects.click();
      state.currentSlide++;
      renderSlide();
    }
  });
  
  const quickList = document.getElementById('vocab-quick-list');
  if (quickList) {
    quickList.innerHTML = '';
    vocabularyList.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'vocab-item-link';
      el.innerHTML = `<span class="vocab-link-cn">${item.word}</span> <span class="vocab-link-vi">${item.meaning_vi}</span>`;
      el.addEventListener('click', () => {
        soundEffects.click();
        state.currentSlide = idx;
        renderSlide();
        document.getElementById('section-lesson').scrollIntoView({ behavior: 'smooth' });
      });
      quickList.appendChild(el);
    });
  }
  const countEl = document.getElementById('vocab-count');
  if (countEl) countEl.textContent = vocabularyList.length;
  const totalSlidesEl = document.getElementById('total-slides-num');
  if (totalSlidesEl) totalSlidesEl.textContent = vocabularyList.length;
}

function renderSlide() {
  const card = document.getElementById('slide-card');
  if (!card) return;
  
  const data = vocabularyList[state.currentSlide];
  document.getElementById('current-slide-num').textContent = state.currentSlide + 1;
  
  // Highlight targeted characters
  let highlightedSentence = data.sentence;
  if (data.sentence.includes(data.word)) {
    highlightedSentence = data.sentence.replace(data.word, `<span class="highlight">${data.word}</span>`);
  } else {
    // Edge cases
    if (data.word === "要...了" && data.sentence.includes("要") && data.sentence.includes("了")) {
      highlightedSentence = data.sentence.replace("要", `<span class="highlight">要</span>`).replace("了", `<span class="highlight">了</span>`);
    } else {
      ["得", "该", "交", "支"].forEach(char => {
        if (data.word === char && data.sentence.includes(char)) {
          highlightedSentence = data.sentence.replace(char, `<span class="highlight">${char}</span>`);
        }
      });
    }
  }
  
  card.innerHTML = `
    <div class="slide-banner"></div>
    <div class="slide-word-container">
      <div class="slide-chinese">${data.word}</div>
      <div class="slide-pinyin">${data.pinyin}</div>
      <button class="btn-speak" id="btn-slide-speak" title="Nghe phát âm">
        <svg viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      </button>
    </div>
    <div class="slide-meaning">
      <div class="meaning-vi">${data.meaning_vi}</div>
      <div class="meaning-en">${data.meaning_en}</div>
    </div>
    <div class="slide-example-box">
      <div class="example-title">Câu ví dụ:</div>
      <div class="example-cn">${highlightedSentence}</div>
      <div class="example-pinyin">${data.sentence_pinyin}</div>
      <div class="example-vi">${data.sentence_vi}</div>
    </div>
  `;
  
  const btnSpeak = card.querySelector('#btn-slide-speak');
  btnSpeak.addEventListener('click', () => {
    speakChinese(data.word, () => {
      setTimeout(() => { speakChinese(data.sentence); }, 500);
    });
  });
  
  document.getElementById('btn-prev-slide').disabled = (state.currentSlide === 0);
  document.getElementById('btn-next-slide').disabled = (state.currentSlide === vocabularyList.length - 1);
}

// GAME 1: MATCHING GAME
function setupTrainGame() {
  const btnReset = document.getElementById('btn-reset-match');
  btnReset.addEventListener('click', () => {
    soundEffects.click();
    startTrainGame();
  });
}

function startTrainGame() {
  const carriagesContainer = document.getElementById('carriages-container');
  const wordsDock = document.getElementById('words-dock');
  const trainSprite = document.getElementById('train-sprite');
  trainSprite.style.transform = 'translateX(0)';
  
  const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
  state.gameMatch.selectedWords = shuffled.slice(0, 4);
  state.gameMatch.matchedCount = 0;
  
  carriagesContainer.innerHTML = '';
  state.gameMatch.selectedWords.forEach((item, index) => {
    const carriage = document.createElement('div');
    carriage.className = 'carriage';
    carriage.innerHTML = `
      <div class="carriage-meaning">${item.meaning_vi}</div>
      <div class="carriage-drop-zone" data-index="${index}">Thả chữ vào đây</div>
      <div class="wheel wheel-1"></div>
      <div class="wheel wheel-2"></div>
      <div class="carriage-hook"></div>
    `;
    carriagesContainer.appendChild(carriage);
  });
  
  const shuffledWords = [...state.gameMatch.selectedWords].sort(() => 0.5 - Math.random());
  wordsDock.innerHTML = '';
  shuffledWords.forEach(item => {
    const card = document.createElement('div');
    card.className = 'draggable-word';
    card.textContent = item.word;
    card.draggable = true;
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', item.word);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
    wordsDock.appendChild(card);
  });
  
  const dropZones = document.querySelectorAll('.carriage-drop-zone');
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const draggedWord = e.dataTransfer.getData('text/plain');
      const wordIndex = parseInt(zone.dataset.index);
      const targetWord = state.gameMatch.selectedWords[wordIndex].word;
      
      if (draggedWord === targetWord) {
        zone.classList.add('matched');
        zone.textContent = draggedWord;
        wordsDock.querySelectorAll('.draggable-word').forEach(card => {
          if (card.textContent === draggedWord) card.remove();
        });
        speakChinese(draggedWord);
        soundEffects.success();
        state.gameMatch.matchedCount++;
        if (state.gameMatch.matchedCount === 4) {
          setTimeout(completeTrainGame, 600);
        }
      } else {
        soundEffects.error();
        zone.closest('.carriage').animate([
          { transform: 'translateX(0)' }, { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' }, { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }
        ], { duration: 300 });
      }
    });
  });
}

function completeTrainGame() {
  soundEffects.trainWhistle();
  const trainSprite = document.getElementById('train-sprite');
  trainSprite.style.transform = 'translateX(100vw)';
  setTimeout(() => {
    showModal({
      title: "Đoàn Tàu Xuất Phát! 🚂💨",
      message: "Tuyệt vời! Hana đã xếp đúng tất cả toa tàu rồi.",
      stats: "Hoàn thành xếp chữ: 4 / 4 từ đúng ✅",
      actionText: "Chơi Lại Trò Này 🔄",
      actionCallback: () => { startTrainGame(); }
    });
  }, 1200);
}

// GAME 2: RPG BOSS BATTLE
function setupQuizGame() {
  const btnNext = document.getElementById('btn-next-quiz');
  const btnReset = document.getElementById('btn-reset-quiz');
  btnNext.addEventListener('click', () => {
    soundEffects.click();
    state.gameQuiz.currentQuestionIndex++;
    if (state.gameQuiz.currentQuestionIndex < state.gameQuiz.questions.length) {
      renderQuizQuestion();
    } else {
      completeQuizGame();
    }
  });
  btnReset.addEventListener('click', () => {
    soundEffects.click();
    startQuizGame();
  });
}

function startQuizGame() {
  state.gameQuiz.score = 0;
  state.gameQuiz.currentQuestionIndex = 0;
  state.gameQuiz.bossHP = 100;
  state.gameQuiz.playerLives = 3;
  
  // Reset Boss UI
  document.getElementById('boss-hp-fill').style.width = '100%';
  document.getElementById('heart-1').classList.remove('lost');
  document.getElementById('heart-2').classList.remove('lost');
  document.getElementById('heart-3').classList.remove('lost');
  
  const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
  state.gameQuiz.questions = shuffled.slice(0, 5);
  document.getElementById('quiz-total-q').textContent = state.gameQuiz.questions.length;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const data = state.gameQuiz.questions[state.gameQuiz.currentQuestionIndex];
  document.getElementById('btn-next-quiz').classList.add('hidden');
  const feedback = document.getElementById('quiz-feedback');
  feedback.className = 'quiz-feedback';
  feedback.textContent = '';
  document.getElementById('quiz-current-q').textContent = state.gameQuiz.currentQuestionIndex + 1;
  
  let displaySentence = data.sentence;
  if (data.sentence.includes(data.word)) {
    displaySentence = data.sentence.replace(data.word, `<span class="blank-spot" id="blank-spot">？</span>`);
  } else {
    if (data.word === "要...了" && data.sentence.includes("要") && data.sentence.includes("了")) {
      displaySentence = data.sentence.replace("要", `<span class="blank-spot" id="blank-spot">要</span>`).replace("l", `<span class="blank-spot">了</span>`);
    } else {
      ["得", "该", "交", "支"].forEach(char => {
        if (data.word === char && data.sentence.includes(char)) {
          displaySentence = data.sentence.replace(char, `<span class="blank-spot" id="blank-spot">？</span>`);
        }
      });
    }
  }
  
  document.getElementById('quiz-hint').textContent = `Nghĩa câu: "${data.sentence_vi}"`;
  document.getElementById('quiz-sentence').innerHTML = displaySentence;
  document.getElementById('quiz-pinyin').textContent = data.sentence_pinyin;
  
  const distractors = vocabularyList
    .filter(item => item.word !== data.word)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const options = [data, ...distractors].sort(() => 0.5 - Math.random());
  
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `<span class="opt-chinese">${opt.word}</span><span class="opt-pinyin">${opt.pinyin}</span>`;
    btn.addEventListener('click', () => {
      handleQuizAnswer(opt.word === data.word, btn, data);
    });
    optionsContainer.appendChild(btn);
  });
}

function triggerSpellEffect(fromEl, toEl, emoji, callback) {
  const container = document.getElementById('app-rpg-container');
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const spell = document.createElement('div');
  spell.className = 'boss-spell';
  spell.textContent = emoji;
  spell.style.left = `${fromRect.left - containerRect.left + fromRect.width/2}px`;
  spell.style.top = `${fromRect.top - containerRect.top + fromRect.height/2}px`;
  container.appendChild(spell);

  setTimeout(() => {
    spell.style.left = `${toRect.left - containerRect.left + toRect.width/2}px`;
    spell.style.top = `${toRect.top - containerRect.top + toRect.height/2}px`;
    spell.style.transform = 'scale(1.8) rotate(360deg)';
  }, 50);

  setTimeout(() => {
    spell.remove();
    if (callback) callback();
  }, 500);
}

function handleQuizAnswer(isCorrect, clickedBtn, data) {
  const feedback = document.getElementById('quiz-feedback');
  const btns = document.querySelectorAll('.quiz-option-btn');
  const heroEl = document.getElementById('rpg-hero');
  const bossEl = document.getElementById('rpg-boss');
  const arenaEl = document.querySelector('.boss-battle-container');

  if (isCorrect) {
    soundEffects.success();
    clickedBtn.classList.add('correct');
    feedback.className = 'quiz-feedback success';
    feedback.textContent = '🎉 Chính xác! Bạn LuLu tung chưởng tấn công Boss!';
    
    // Spell attack animation
    triggerSpellEffect(heroEl, bossEl, "✨", () => {
      // Shakes the Boss on hits
      bossEl.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.3) rotate(15deg)', filter: 'hue-rotate(90deg)' },
        { transform: 'scale(1)' }
      ], { duration: 300 });
      
      // Decrease HP
      state.gameQuiz.bossHP -= 20;
      document.getElementById('boss-hp-fill').style.width = `${state.gameQuiz.bossHP}%`;
    });

    const blank = document.getElementById('blank-spot');
    if (blank) {
      blank.textContent = data.word;
      blank.style.color = 'var(--color-success)';
    }
    speakChinese(data.sentence);
    btns.forEach(btn => btn.classList.add('disabled'));
    state.gameQuiz.score += 10;
    document.getElementById('btn-next-quiz').classList.remove('hidden');
  } else {
    soundEffects.error();
    clickedBtn.classList.add('wrong');
    clickedBtn.classList.add('disabled');
    feedback.className = 'quiz-feedback error';
    feedback.textContent = '😢 Ôi không! Boss đã phản công LuLu rồi!';

    // Boss counter attack animation
    triggerSpellEffect(bossEl, heroEl, "☄️", () => {
      // Shake screen
      arenaEl.classList.add('shake-element');
      setTimeout(() => { arenaEl.classList.remove('shake-element'); }, 400);

      // Deduct live
      state.gameQuiz.playerLives--;
      const targetHeart = document.getElementById(`heart-${state.gameQuiz.playerLives + 1}`);
      if (targetHeart) targetHeart.classList.add('lost');

      if (state.gameQuiz.playerLives <= 0) {
        setTimeout(failBossBattle, 500);
      }
    });
  }
}

function failBossBattle() {
  showModal({
    title: "Thất Bại Rồi! 😢💥",
    message: "Hana và bạn LuLu đã hết sinh mệnh trước sức mạnh của Boss!",
    stats: "Hãy nhấp hồi phục để chuẩn bị chiến đấu lại nhé!",
    actionText: "Hồi Phục Sinh Mệnh 💖",
    actionCallback: () => { startQuizGame(); }
  });
}

function completeQuizGame() {
  const finalScore = state.gameQuiz.score;
  
  // Save scores to localStorage for the Dashboard
  localStorage.setItem('lesson_65_score', finalScore);
  localStorage.setItem('lesson_65_completed', 'true');
  
  showModal({
    title: "Đã Diệt Boss Thượng Hải! 🏆🐼",
    message: "Chúc mừng Hana và LuLu đã thám hiểm thành phố thành công và nhận Huy hiệu!",
    stats: `Boss bị diệt! HP: 0% | Điểm nhận được: ${finalScore} / 50 điểm ⭐`,
    actionText: "Đấu Boss Lại ⚔️",
    actionCallback: () => { startQuizGame(); },
    showReporting: true
  });
}

// 8. PDF GENERATION & GOOGLE CHAT REPORTING
function setupReporting() {
  const btnPDF = document.getElementById('btn-pdf-download');
  const btnGChat = document.getElementById('btn-gchat-send');
  
  btnPDF.addEventListener('click', () => {
    soundEffects.click();
    generatePDF(state.gameQuiz.score);
  });
  
  btnGChat.addEventListener('click', () => {
    soundEffects.click();
    sendReportToGChat(state.gameQuiz.score);
  });
}

function generatePDF(score) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Page border
    doc.setDrawColor(139, 92, 246); // Purple border
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);
    
    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(139, 92, 246);
    doc.text("CHUNG NHAN THAM HIEM TIENG TRUNG", 105, 35, { align: "center" });
    
    // Sub-title
    doc.setFontSize(14);
    doc.setTextColor(14, 165, 233); // Blue
    doc.text("Chuyen Di Thám Hiem: But Phep Thuat 65", 105, 45, { align: "center" });
    
    // Separator line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(25, 55, 185, 55);
    
    // Info block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 27, 75);
    doc.text("Nha Thám Hiem:", 30, 70);
    doc.setFont("helvetica", "normal");
    doc.text("Hana & Gau Truc LuLu", 70, 70);
    
    doc.setFont("helvetica", "bold");
    doc.text("Dia danh dat den:", 30, 80);
    doc.setFont("helvetica", "normal");
    doc.text("Thanh Pho: Đôn Hoàng (Bai 65 - Wo men zai na li?)", 70, 80);
    
    doc.setFont("helvetica", "bold");
    doc.text("Huy hieu dat duoc:", 30, 90);
    doc.setFont("helvetica", "normal");
    doc.text("Huy Hieu 🏜️ Đôn Hoàng", 70, 90);
    
    // Score board card
    doc.setFillColor(248, 250, 252);
    doc.rect(30, 105, 150, 40, "F");
    doc.setDrawColor(16, 185, 129); // Green border
    doc.setLineWidth(1);
    doc.rect(30, 105, 150, 40, "S");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129); // Green
    doc.text("CHI SO KHAM PHA THU THACH", 105, 118, { align: "center" });
    doc.setFontSize(20);
    doc.text(`${score} / 50 DIEM (TIET DIET BOSS 100%)`, 105, 134, { align: "center" });
    
    // Detail Checklist
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 27, 75);
    doc.text("Cac nhiem vu da hoan thanh:", 30, 165);
    
    doc.setFont("helvetica", "normal");
    doc.text("- Nhiem vu 1: Xem Phim Hoat Hinh Tieu Thuyết [Hoan Thanh]", 35, 177);
    doc.text("- Nhiem vu 2: Tham Hiem Tu Vung Hinh Chuyen [Hoan Thanh]", 35, 187);
    doc.text("- Nhiem vu 3: Ghep Tu Chay Tau Hoa [Hoan Thanh]", 35, 197);
    doc.text("- Nhiem vu 4: Tieu Diet Boss Cuoi Tuan [Hoan Thanh]", 35, 207);
    
    // Decorative Badge Frame
    doc.setDrawColor(245, 158, 11);
    doc.setFillColor(254, 243, 199);
    doc.rect(70, 222, 70, 25, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(245, 158, 11);
    doc.text("HUY HIEU: 🏜️", 105, 238, { align: "center" });
    
    // Footer notice
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text("Ban LuLu va But Than Ky se dong hanh cung Hana o cac chang tiep theo!", 105, 265, { align: "center" });
    
    doc.save("Phieu_diem_Hana_Bai_65.pdf");
  } catch (err) {
    console.error("PDF generation failed:", err);
  }
}

function sendReportToGChat(score) {
  const statusDiv = document.getElementById('gchat-status');
  statusDiv.textContent = "Đang gửi báo cáo và xin nhận xét của AI...";
  statusDiv.className = "gchat-status";
  
  if (!CONFIG || !CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes("PLACEHOLDER")) {
    statusDiv.textContent = "Chưa cấu hình Google Apps Script URL trong config.js!";
    statusDiv.className = "gchat-status error";
    return;
  }
  
  const payload = {
    student: "Hana",
    lesson: "Bai 65: Giao dien RPG - Quyết Đấu Boss Đôn Hoàng",
    score: score,
    date: new Date().toLocaleDateString('vi-VN')
  };
  
  fetch(CONFIG.APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    statusDiv.textContent = "Gửi báo cáo thành công! Check Google Chat nhé mẹ ơi! ❤️";
    statusDiv.className = "gchat-status success";
  })
  .catch(err => {
    console.error("GChat send error:", err);
    statusDiv.textContent = "Không thể kết nối được tới máy chủ gửi tin.";
    statusDiv.className = "gchat-status error";
  });
}

// MODAL CONTROLLER
function showModal({ title, message, stats, actionText, actionCallback, showReporting = false }) {
  const overlay = document.getElementById('success-modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-message').textContent = message;
  document.getElementById('modal-stats').textContent = stats;
  
  const reportBox = document.getElementById('report-box');
  const statusDiv = document.getElementById('gchat-status');
  statusDiv.textContent = '';
  
  if (showReporting) {
    reportBox.classList.remove('hidden');
  } else {
    reportBox.classList.add('hidden');
  }
  
  const actionBtn = document.getElementById('btn-modal-action');
  actionBtn.textContent = actionText;
  
  const newActionBtn = actionBtn.cloneNode(true);
  actionBtn.parentNode.replaceChild(newActionBtn, actionBtn);
  
  newActionBtn.addEventListener('click', () => {
    soundEffects.click();
    overlay.classList.remove('active');
    if (actionCallback) actionCallback();
  });
  
  overlay.classList.add('active');
}
