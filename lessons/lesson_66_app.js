// ==========================================================================
// APP LOGIC: LESSON 66 (在这儿见到你们真好！ - Gặp Được Các Bạn Ở Đây Thật Tốt!)
// Includes Vocabulary data, Web Audio, TTS, Games, PDF generation & Telegram
// ==========================================================================

const vocabularyList = [
  {
    "word": "这儿",
    "pinyin": "zhè'r",
    "meaning_vi": "Ở đây, tại đây",
    "meaning_en": "here",
    "sentence": "在这儿见到你太高兴了！",
    "sentence_pinyin": "Zài zhè'r jiàndào nǐ tài gāoxìng le!",
    "sentence_vi": "Gặp cậu ở đây vui quá đi thôi!"
  },
  {
    "word": "真好",
    "pinyin": "zhēnhǎo",
    "meaning_vi": "Thật tốt, thật tuyệt",
    "meaning_en": "great, wonderful",
    "sentence": "今天天气真好！",
    "sentence_pinyin": "Jīntiān tiānqì zhēnhǎo!",
    "sentence_vi": "Thời tiết hôm nay thật là tốt!"
  },
  {
    "word": "遇见",
    "pinyin": "yùjiàn",
    "meaning_vi": "Gặp gỡ, tình cờ gặp",
    "meaning_en": "meet, run into",
    "sentence": "我竟然在这里遇见了你！",
    "sentence_pinyin": "Wǒ jìngrán zài zhèlǐ yùjiàn le nǐ!",
    "sentence_vi": "Tớ không ngờ lại tình cờ gặp cậu ở đây!"
  },
  {
    "word": "惊喜",
    "pinyin": "jīngxǐ",
    "meaning_vi": "Kinh ngạc và vui mừng, bất ngờ",
    "meaning_en": "pleasant surprise",
    "sentence": "这个消息给大家带来了惊喜。",
    "sentence_pinyin": "Zhège xiāoxi gěi dàjiā dàilái le jīngxǐ.",
    "sentence_vi": "Tin tức này mang lại bất ngờ lớn cho mọi người."
  },
  {
    "word": "拥抱",
    "pinyin": "yōngbào",
    "meaning_vi": "Ôm, cái ôm",
    "meaning_en": "hug, embrace",
    "sentence": "好久不见，我们拥抱一下。",
    "sentence_pinyin": "Hǎojiǔ bújiàn, wǒmen yōngbào yíxià.",
    "sentence_vi": "Đã lâu không gặp, tụi mình ôm một cái nào."
  },
  {
    "word": "笑",
    "pinyin": "xiào",
    "meaning_vi": "Cười",
    "meaning_en": "smile, laugh",
    "sentence": "大家都开心地笑了。",
    "sentence_pinyin": "Dàjiā dōu kāixīnde xiào le.",
    "sentence_vi": "Mọi người đều bật cười vui vẻ."
  },
  {
    "word": "说话",
    "pinyin": "shuōhuà",
    "meaning_vi": "Nói chuyện, nói",
    "meaning_en": "talk, speak",
    "sentence": "坐下来好好说话吧。",
    "sentence_pinyin": "Zuò xiàlai hǎohǎo shuōhuà ba.",
    "sentence_vi": "Hãy ngồi xuống nói chuyện đàng hoàng đi nào."
  },
  {
    "word": "聚会",
    "pinyin": "jùhuì",
    "meaning_vi": "Tụ họp, gặp mặt, liên hoan",
    "meaning_en": "gathering, party",
    "sentence": "今晚我们有一个好朋友聚会。",
    "sentence_pinyin": "Jīnwǎn wǒmen yǒu yíge hǎo péngyou jùhuì.",
    "sentence_vi": "Tối nay chúng tớ có một buổi họp mặt bạn thân."
  },
  {
    "word": "故事",
    "pinyin": "gùshi",
    "meaning_vi": "Câu chuyện",
    "meaning_en": "story",
    "sentence": "杰克讲了旅途中的有趣故事。",
    "sentence_pinyin": "Jiékè jiǎng le lǚtú zhōng de yǒuqù gùshi.",
    "sentence_vi": "Jack đã kể những câu chuyện thú vị trong hành trình."
  },
  {
    "word": "难忘",
    "pinyin": "nánwàng",
    "meaning_vi": "Đáng nhớ, khó quên",
    "meaning_en": "unforgettable",
    "sentence": "这是一次难忘的旅行。",
    "sentence_pinyin": "Zhè - yící nánwàng de lǚxíng.",
    "sentence_vi": "Đây quả thực là một chuyến đi đáng nhớ."
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
  } else {
    if (data.word === "要... l" && data.sentence.includes("要") && data.sentence.includes("了")) {
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
  state.gameMatch.selectedWords.forEach(item => {
    const carriage = document.createElement('div');
    carriage.className = 'carriage';
    carriage.innerHTML = `
      <div class="carriage-meaning" title="${item.meaning_vi}">${item.meaning_vi}</div>
      <div class="carriage-drop-zone" data-word="${item.word}">Thả chữ vào đây</div>
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
      const targetWord = zone.dataset.word;
      
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

// GAME 2: QUIZ GAME
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
  document.getElementById('quiz-score-val').textContent = '0';
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

function handleQuizAnswer(isCorrect, clickedBtn, data) {
  const feedback = document.getElementById('quiz-feedback');
  const btns = document.querySelectorAll('.quiz-option-btn');
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
    feedback.textContent = '😢 Chưa đúng rồi, bé chọn lại nhé!';
  }
}

function completeQuizGame() {
  const finalScore = state.gameQuiz.score;
  
  // Save scores to localStorage for the Dashboard
  localStorage.setItem('lesson_66_score', finalScore);
  localStorage.setItem('lesson_66_completed', 'true');
  
  showModal({
    title: "Chúc Mừng Hana! 🏆🌟",
    message: "Bé đã vượt qua tất cả các câu hỏi trắc nghiệm thử thách!",
    stats: `Điểm số trắc nghiệm: ${finalScore} / 50 điểm ⭐`,
    actionText: "Chơi Lại Trắc Nghiệm 🔄",
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
    doc.text("PHIEU DIEM HOC TIENG TRUNG", 105, 35, { align: "center" });
    
    // Sub-title
    doc.setFontSize(14);
    doc.setTextColor(14, 165, 233); // Blue
    doc.text("Chuong Trinh: But Phep Thuat 66", 105, 45, { align: "center" });
    
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
    doc.text("Bai 66 - Zai zhe'r jian dao ni men zhen hao! (Roi di bang tau hoa)", 70, 80);
    
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
    doc.text("- Nhận diện mặt chữ & bính âm của 23 từ vựng của bài.", 35, 175);
    doc.text("- Hoàn thành trò chơi kéo thả từ vựng ghép toa xe lửa.", 35, 183);
    doc.text("- Trả lời đúng các câu trắc nghiệm hoàn thiện câu trong bài học.", 35, 191);
    
    // Footer encouragement
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(139, 92, 246);
    doc.text("Chuc mung Hana da hoan thanh xuat sac bai hoc!", 105, 230, { align: "center" });
    doc.text("Con hay co gang o nhung bai hoc tiep theo nhe! Let's Go!", 105, 238, { align: "center" });
    
    // Download the PDF
    doc.save(`Phieu_diem_Hana_Bai_66.pdf`);
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
    lesson: "Bài 66: 在这儿见到你们真好！ (Rời đi bằng tàu hỏa)",
    score: score,
    date: new Date().toLocaleDateString('vi-VN')
  };
  
  fetch(CONFIG.APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors", // Required to send requests without CORS blockage from browser to Apps Script
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    // Note: mode 'no-cors' will return an opaque response with status 0. We assume success if it doesn't throw.
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

