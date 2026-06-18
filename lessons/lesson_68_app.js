// ==========================================================================
// APP LOGIC: LESSON 68 (客人 - The Guest)
// Includes Vocabulary data, Web Audio, TTS, Games, PDF generation & Telegram
// ==========================================================================

const vocabularyList = [
  {
    word: "客人",
    pinyin: "kèrén",
    meaning_vi: "Khách nhân, khách khứa",
    meaning_en: "guest",
    sentence: "今天家里有客人来。",
    sentence_pinyin: "Jīntiān jiāli yǒu kèrén lái.",
    sentence_vi: "Hôm nay ở nhà có khách đến chơi."
  },
  {
    word: "欢迎",
    pinyin: "huānyíng",
    meaning_vi: "Chào mừng, hoan nghênh",
    meaning_en: "welcome",
    sentence: "欢迎你来到我们家！",
    sentence_pinyin: "Huānyíng nǐ láidào wǒmen jiā!",
    sentence_vi: "Chào mừng bạn đến với nhà của chúng tớ!"
  },
  {
    word: "敲门",
    pinyin: "qiāomén",
    meaning_vi: "Gõ cửa",
    meaning_en: "knock on the door",
    sentence: "有人在敲门。",
    sentence_pinyin: "Yǒu rén zài qiāomén.",
    sentence_vi: "Có ai đó đang gõ cửa kìa."
  },
  {
    word: "谁",
    pinyin: "shéi",
    meaning_vi: "Ai",
    meaning_en: "who",
    sentence: "请问门外是谁？",
    sentence_pinyin: "Qǐngwèn mén wài shì shéi?",
    sentence_vi: "Xin hỏi ngoài cửa là ai thế ạ?"
  },
  {
    word: "朋友",
    pinyin: "péngyou",
    meaning_vi: "Bạn bè, bằng hữu",
    meaning_en: "friend",
    sentence: "这是我的好朋友杰克。",
    sentence_pinyin: "Zhè shì wǒ de hǎo péngyou Jiékè.",
    sentence_vi: "Đây là Jack, bạn tốt của tớ."
  },
  {
    word: "进来",
    pinyin: "jìnlái",
    meaning_vi: "Đi vào, mời vào",
    meaning_en: "come in",
    sentence: "外面冷，快请进来吧！",
    sentence_pinyin: "Wàimiàn lěng, kuài qǐng jìnlái ba!",
    sentence_vi: "Bên ngoài lạnh lắm, mau mời vào đi!"
  },
  {
    word: "请坐",
    pinyin: "qǐng zuò",
    meaning_vi: "Mời ngồi",
    meaning_en: "please sit",
    sentence: "大家都请坐吧！",
    sentence_pinyin: "Dàjiā dōu qǐng zuò ba!",
    sentence_vi: "Mọi người đều mời ngồi ạ!"
  },
  {
    word: "茶",
    pinyin: "chá",
    meaning_vi: "Trà, chè",
    meaning_en: "tea",
    sentence: "我给客人倒一杯茶。",
    sentence_pinyin: "Wǒ gěi kèrén dào yì bēi chá.",
    sentence_vi: "Tớ rót cho khách một ly trà."
  },
  {
    word: "点心",
    pinyin: "diǎnxin",
    meaning_vi: "Điểm tâm, bánh ngọt",
    meaning_en: "snack, pastry",
    sentence: "桌子上有好吃的点心。",
    sentence_pinyin: "Zhuōzi shang yǒu hǎochī de diǎnxin.",
    sentence_vi: "Trên bàn có điểm tâm ngon lắm đó."
  },
  {
    word: "客气",
    pinyin: "kèqi",
    meaning_vi: "Khách sáo, lịch sự",
    meaning_en: "polite",
    sentence: "别客气, 像在自己家一样。",
    sentence_pinyin: "Bié kèqi, xiàng zài zìjǐ jiā yíyàng.",
    sentence_vi: "Đừng khách sáo nhé, cứ tự nhiên như ở nhà mình."
  }
];

// Audio variables
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

// TTS System
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
    score: 0
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
  const btnText = btn.querySelector('.btn-text');
  const iconPath = document.getElementById('sound-icon-path');
  btn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    soundEffects.click();
    if (audioEnabled) {
      btnText.textContent = "Âm thanh: Bật";
      iconPath.setAttribute('d', 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z');
    } else {
      btnText.textContent = "Âm thanh: Tắt";
      iconPath.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
    }
  });
}

// SLIDE DECK SYSTEM
function setupSlideDeck() {
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  document.getElementById('total-slides-num').textContent = vocabularyList.length;
  document.getElementById('vocab-count').textContent = vocabularyList.length;
  
  btnPrev.addEventListener('click', () => {
    if (state.currentSlide > 0) {
      state.currentSlide--;
      soundEffects.click();
      renderSlide();
    }
  });
  btnNext.addEventListener('click', () => {
    if (state.currentSlide < vocabularyList.length - 1) {
      state.currentSlide++;
      soundEffects.click();
      renderSlide();
    }
  });
  
  const sidebar = document.getElementById('vocab-quick-list');
  sidebar.innerHTML = '';
  vocabularyList.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `vocab-item ${index === 0 ? 'active' : ''}`;
    div.dataset.index = index;
    div.innerHTML = `
      <span class="vocab-item-cn">${item.word}</span>
      <span class="vocab-item-vi">${item.meaning_vi}</span>
    `;
    div.addEventListener('click', () => {
      soundEffects.click();
      state.currentSlide = index;
      renderSlide();
    });
    sidebar.appendChild(div);
  });
  renderSlide();
}

function renderSlide() {
  const data = vocabularyList[state.currentSlide];
  const card = document.getElementById('slide-card');
  document.getElementById('current-slide-num').textContent = state.currentSlide + 1;
  
  document.querySelectorAll('.vocab-item').forEach(item => {
    item.classList.remove('active');
    if (parseInt(item.dataset.index) === state.currentSlide) {
      item.classList.add('active');
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  
  let highlightedSentence = data.sentence;
  if (data.sentence.includes(data.word)) {
    highlightedSentence = data.sentence.replace(new RegExp(data.word, 'g'), `<span class="highlight">${data.word}</span>`);
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
  state.gameMatch.matchedCount = 0;
  state.gameMatch.selectedWords = [];

  // Pick 5 random words for the train carriages
  const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);
  state.gameMatch.selectedWords = selected;

  // Build the carriages
  const carriagesContainer = document.getElementById('carriages-container');
  carriagesContainer.innerHTML = '';
  
  selected.forEach((item, index) => {
    const carriage = document.createElement('div');
    carriage.className = 'train-carriage';
    carriage.dataset.id = item.word;
    carriage.innerHTML = `
      <div class="carriage-window">🖼️</div>
      <div class="carriage-label-vi">${item.meaning_vi}</div>
      <div class="carriage-dropzone" data-word="${item.word}">Thả chữ vào đây</div>
      <div class="wheel wheel-left"></div>
      <div class="wheel wheel-right"></div>
    `;
    carriagesContainer.appendChild(carriage);
  });

  // Build the draggable words dock
  const wordsDock = document.getElementById('words-dock');
  wordsDock.innerHTML = '';
  
  // Shuffle words for docking
  const dockedWords = [...selected].sort(() => 0.5 - Math.random());
  dockedWords.forEach(item => {
    const wordCard = document.createElement('div');
    wordCard.className = 'word-card';
    wordCard.draggable = true;
    wordCard.id = `drag-${item.word}`;
    wordCard.dataset.word = item.word;
    wordCard.innerHTML = `
      <span class="cn-text">${item.word}</span>
      <span class="py-text">${item.pinyin}</span>
    `;
    
    // Drag handlers
    wordCard.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.word);
      wordCard.classList.add('dragging');
    });
    
    wordCard.addEventListener('dragend', () => {
      wordCard.classList.remove('dragging');
    });

    // Support tap-to-select on mobile devices
    wordCard.addEventListener('click', () => {
      handleMobileSelect(wordCard);
    });

    wordsDock.appendChild(wordCard);
  });

  // Setup drop zones
  const dropzones = document.querySelectorAll('.carriage-dropzone');
  dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('hover');
    });
    
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('hover');
    });
    
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('hover');
      const droppedWord = e.dataTransfer.getData('text/plain');
      handleMatching(droppedWord, zone);
    });

    // Support mobile tap-to-drop
    zone.addEventListener('click', () => {
      const selectedActive = document.querySelector('.word-card.mobile-selected');
      if (selectedActive) {
        handleMatching(selectedActive.dataset.word, zone);
      }
    });
  });
}

function handleMobileSelect(card) {
  document.querySelectorAll('.word-card').forEach(c => c.classList.remove('mobile-selected'));
  card.classList.add('mobile-selected');
}

function handleMatching(word, zone) {
  const targetWord = zone.dataset.word;
  if (word === targetWord) {
    // Correct Match
    soundEffects.click();
    zone.innerHTML = `<span class="matched-success">${word} ✅</span>`;
    zone.classList.add('matched');
    
    // Hide the word card from dock
    const card = document.getElementById(`drag-${word}`);
    if (card) card.style.visibility = 'hidden';
    
    state.gameMatch.matchedCount++;
    
    if (state.gameMatch.matchedCount === 5) {
      soundEffects.trainWhistle();
      animateTrainRelease();
    }
  } else {
    // Wrong Match
    soundEffects.error();
    zone.classList.add('shake');
    setTimeout(() => zone.classList.remove('shake'), 500);
  }
}

function animateTrainRelease() {
  const train = document.getElementById('train-sprite');
  train.classList.add('train-leave-active');
  
  setTimeout(() => {
    showModal({
      title: "Tuyệt Vời Quá Hana ơi! 🚂💨",
      message: "Bé đã ghép đúng các toa tàu và giúp đoàn tàu khởi hành thành công!",
      stats: "Nhấn nút dưới để vào phần thử thách trắc nghiệm nhé.",
      actionText: "Tiến Tới Trắc Nghiệm 🎯",
      actionCallback: () => {
        train.classList.remove('train-leave-active');
        const tabQuiz = document.querySelector('[data-target="section-game-quiz"]');
        if (tabQuiz) tabQuiz.click();
      }
    });
  }, 1800);
}

// GAME 2: QUIZ GAME
const dbQuestions = [
  {
    sentence: "今天家里有 [ ? ] 来，我们要好好准备一下。",
    sentence_pinyin: "Jīntiān jiāli yǒu [ ? ] lái, wǒmen yào hǎohāo zhǔnbèi yíxià.",
    word: "客人",
    meaning_vi: "Hôm nay ở nhà có khách đến chơi, chúng ta phải chuẩn bị cho tốt nhé.",
    options: ["客人", "敲门", "朋友", "茶"]
  },
  {
    sentence: "大家都在门外站着，快请 [ ? ] 吧！",
    sentence_pinyin: "Dàjiā dōu zài mén wài zhànzhe, kuài qǐng [ ? ] ba!",
    word: "进来",
    meaning_vi: "Mọi người đều đang đứng ngoài cửa, mau mời vào đi!",
    options: ["敲门", "进来", "请坐", "客气"]
  },
  {
    sentence: "请问门外是 [ ? ] 在敲门啊？",
    sentence_pinyin: "Qǐngwèn mén wài shì [ ? ] zài qiāomén a?",
    word: "谁",
    meaning_vi: "Xin hỏi ngoài cửa là ai đang gõ cửa thế ạ?",
    options: ["茶", "谁", "客人", "朋友"]
  },
  {
    sentence: "爸爸，这是我的好 [ ? ] 杰克。",
    sentence_pinyin: "Bàba, zhè shì wǒ de hǎo [ ? ] Jiékè.",
    word: "朋友",
    meaning_vi: "Bố ơi, đây là Jack bạn tốt của con ạ.",
    options: ["茶", "点心", "朋友", "客人"]
  },
  {
    sentence: "大家快请 [ ? ] ，我给你们倒茶。",
    sentence_pinyin: "Dàjiā kuài qǐng [ ? ] , wǒ gěi nǐmen dào chá.",
    word: "请坐",
    meaning_vi: "Mọi người mau mời ngồi, cháu rót trà cho mọi người ạ.",
    options: ["请坐", "进来", "敲门", "欢迎"]
  }
];

function setupQuizGame() {
  const btnReset = document.getElementById('btn-reset-quiz');
  btnReset.addEventListener('click', () => {
    soundEffects.click();
    startQuizGame();
  });
  
  const btnNext = document.getElementById('btn-next-quiz');
  btnNext.addEventListener('click', () => {
    soundEffects.click();
    state.gameQuiz.currentQuestionIndex++;
    if (state.gameQuiz.currentQuestionIndex < state.gameQuiz.questions.length) {
      renderQuizQuestion();
    } else {
      completeQuizGame();
    }
  });
}

function startQuizGame() {
  state.gameQuiz.score = 0;
  state.gameQuiz.currentQuestionIndex = 0;
  state.gameQuiz.questions = [...dbQuestions].sort(() => 0.5 - Math.random());
  
  document.getElementById('quiz-score-val').textContent = "0";
  document.getElementById('btn-next-quiz').classList.add('hidden');
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const data = state.gameQuiz.questions[state.gameQuiz.currentQuestionIndex];
  document.getElementById('quiz-current-q').textContent = state.gameQuiz.currentQuestionIndex + 1;
  document.getElementById('quiz-total-q').textContent = state.gameQuiz.questions.length;
  
  document.getElementById('quiz-hint').textContent = `Dịch nghĩa: ${data.meaning_vi}`;
  document.getElementById('quiz-pinyin').textContent = data.sentence_pinyin;
  
  const formattedSentence = data.sentence.replace("[ ? ]", `<span class="blank-spot" id="blank-spot">❓</span>`);
  document.getElementById('quiz-sentence').innerHTML = formattedSentence;
  
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('btn-next-quiz').classList.add('hidden');

  data.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      handleAnswer(opt, btn);
    });
    optionsContainer.appendChild(btn);
  });
}

function handleAnswer(selectedOpt, clickedBtn) {
  const data = state.gameQuiz.questions[state.gameQuiz.currentQuestionIndex];
  const isCorrect = (selectedOpt === data.word);
  const feedback = document.getElementById('quiz-feedback');
  const btns = document.querySelectorAll('.option-btn');

  if (isCorrect) {
    soundEffects.success();
    clickedBtn.classList.add('correct');
    feedback.className = 'quiz-feedback success';
    feedback.textContent = '🎉 Chính xác! Giỏi lắm Hana ơi!';
    const blank = document.getElementById('blank-spot');
    if (blank) {
      blank.textContent = data.word;
      blank.style.color = 'var(--color-success)';
    }
    speakChinese(data.sentence);
    btns.forEach(btn => btn.classList.add('disabled'));
    state.gameQuiz.score += 10;
    document.getElementById('quiz-score-val').textContent = state.gameQuiz.score;
    document.getElementById('btn-next-quiz').classList.remove('hidden');
  } else {
    soundEffects.error();
    clickedBtn.classList.add('wrong');
    clickedBtn.classList.add('disabled');
    feedback.className = 'quiz-feedback error';
    feedback.textContent = '❌ Chưa đúng rồi, bé chọn lại nhé!';
  }
}

function completeQuizGame() {
  const finalScore = state.gameQuiz.score;
  
  // Save scores to localStorage for the Dashboard
  localStorage.setItem('lesson_68_score', finalScore);
  localStorage.setItem('lesson_68_completed', 'true');
  
  showModal({
    title: "Chúc Mừng Hana! 🎉🏆",
    message: "Bé đã vượt qua tất cả các câu hỏi trắc nghiệm thử thách!",
    stats: `Điểm số trắc nghiệm: ${finalScore} / 50 điểm 🌟`,
    actionText: "Chơi Lại Trắc Nghiệm 🔄",
    actionCallback: () => { startQuizGame(); },
    showReporting: true
  });
}

// 8. PDF GENERATION & TELEGRAM / APPS SCRIPT REPORTING
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
    doc.text("PHIEU DIEM HOC TIENG TRUNG", 105, 35, { align: "center" });
    
    // Sub-title
    doc.setFontSize(14);
    doc.setTextColor(14, 165, 233); // Blue
    doc.text("Chuong Trinh: But Phep Thuat 68", 105, 45, { align: "center" });
    
    // Separator line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(25, 55, 185, 55);
    
    // Info block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 27, 75);
    doc.text("Hoc vien:", 30, 70);
    doc.setFont("helvetica", "normal");
    doc.text("Hana (9 tuoi)", 70, 70);
    
    doc.setFont("helvetica", "bold");
    doc.text("Bai hoc:", 30, 80);
    doc.setFont("helvetica", "normal");
    doc.text("Bai 68 - Ke ren (Khach nhan / Nguoi khach)", 70, 80);
    
    doc.setFont("helvetica", "bold");
    doc.text("Ngay hoan thanh:", 30, 90);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString('vi-VN'), 70, 90);
    
    // Score board card
    doc.setFillColor(248, 250, 252);
    doc.rect(30, 105, 150, 40, "F");
    doc.setDrawColor(16, 185, 129); // Green border
    doc.setLineWidth(1);
    doc.rect(30, 105, 150, 40, "S");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129); // Green
    doc.text("KET QUA DAT DUOC", 105, 118, { align: "center" });
    doc.setFontSize(20);
    doc.text(`${score} / 50 DIEM`, 105, 134, { align: "center" });
    
    // Detail Checklist
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 27, 75);
    doc.text("Noi dung hoc da hoan thanh:", 30, 165);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text("- Nhan dien mat chu & binh am cua 10 tu vung cua bai.", 35, 175);
    doc.text("- Hoan thanh tro choi keo tha tu vung xep toa xe lua.", 35, 183);
    doc.text("- Tra loi dung cac cau trac nghiem hoan thien cau trong bai hoc.", 35, 191);
    
    // Footer encouragement
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(139, 92, 246);
    doc.text("Chuc mung Hana da hoan thanh xuat sac bai hoc!", 105, 230, { align: "center" });
    doc.text("Con hay co gang o nhung bai hoc tiep theo nhe! Let's Go!", 105, 238, { align: "center" });
    
    // Download the PDF
    doc.save(`Phieu_diem_Hana_Bai_68.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Có lỗi xảy ra khi tạo PDF, bạn vui lòng kiểm tra lại trình duyệt nhé.");
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
    lesson: "Bài 68: 客人 (Khách Nhân / Người Khách)",
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
    statusDiv.textContent = "Gửi báo cáo thành công! Check Google Chat/Telegram nhé mẹ ơi! 💖";
    statusDiv.className = "gchat-status success";
  })
  .catch(err => {
    console.error("Report send error:", err);
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
