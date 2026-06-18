// ==========================================================================
// APP LOGIC: CHINESE MAGIC PEN LESSON & GAMES
// Features: 23 Vocabulary database, Web Audio SFX, Web Speech TTS, Slide Deck,
//           Train Matching Game, Sentence Builder Quiz Game.
// ==========================================================================

// 1. VOCABULARY DATABASE
const vocabularyList = [
  {
    word: "离开",
    pinyin: "líkāi",
    meaning_vi: "Rời khỏi, rời đi",
    meaning_en: "leave",
    sentence: "坐火车离开。",
    sentence_pinyin: "Zuò huǒchē líkāi.",
    sentence_vi: "Rời đi bằng tàu hỏa."
  },
  {
    word: "不敢",
    pinyin: "bù gǎn",
    meaning_vi: "Không dám",
    meaning_en: "not dare to",
    sentence: "我不敢相信你们竟然去了中国！",
    sentence_pinyin: "Wǒ bù gǎn xiāngxìn nǐmen jìngrán qù le Zhōngguó!",
    sentence_vi: "Mình không dám tin các bạn lại đi Trung Quốc đấy!"
  },
  {
    word: "相信",
    pinyin: "xiāngxìn",
    meaning_vi: "Tin tưởng, tin",
    meaning_en: "believe",
    sentence: "我不敢相信你们竟然去了中国！",
    sentence_pinyin: "Wǒ bù gǎn xiāngxìn nǐmen jìngrán qù le Zhōngguó!",
    sentence_vi: "Mình không dám tin các bạn lại đi Trung Quốc đấy!"
  },
  {
    word: "竟然",
    pinyin: "jìngrán",
    meaning_vi: "Lại, mà lại (ngạc nhiên)",
    meaning_en: "unexpectedly, to one's surprise",
    sentence: "我不敢相信你竟然去了中国！",
    sentence_pinyin: "Wǒ bù gǎn xiāngxìn nǐ jìngrán qù le Zhōngguó!",
    sentence_vi: "Mình không dám tin cậu lại đi Trung Quốc đấy!"
  },
  {
    word: "中国",
    pinyin: "Zhōngguó",
    meaning_vi: "Trung Quốc",
    meaning_en: "China",
    sentence: "我不敢相信你们竟然去了中国！",
    sentence_pinyin: "Wǒ bù gǎn xiāngxìn nǐmen jìngrán qù le Zhōngguó!",
    sentence_vi: "Mình không dám tin các bạn lại đi Trung Quốc đấy!"
  },
  {
    word: "交",
    pinyin: "jiāo",
    meaning_vi: "Kết bạn, giao thiệp",
    meaning_en: "make friends",
    sentence: "我们在那里交了一些很好的朋友。",
    sentence_pinyin: "Wǒmen zài nàli jiāo le yìxiē hěn hǎo de péngyou.",
    sentence_vi: "Chúng mình đã kết bạn với một vài người bạn rất tốt ở đó."
  },
  {
    word: "奇妙",
    pinyin: "qímiào",
    meaning_vi: "Kỳ diệu, tuyệt vời",
    meaning_en: "fantastic, wonderful",
    sentence: "见到了许多很奇妙的东西！",
    sentence_pinyin: "Jiàndào le xǔduō hěn qímiào de dōngxi!",
    sentence_vi: "Đã nhìn thấy rất nhiều thứ kỳ diệu!"
  },
  {
    word: "再次",
    pinyin: "zàicì",
    meaning_vi: "Lần nữa, lại",
    meaning_en: "again, once more",
    sentence: "再次见到你真好，杰克。",
    sentence_pinyin: "Zàicì jiàndào nǐ zhēn hǎo, Jiékè.",
    sentence_vi: "Thật vui khi được gặp lại cậu lần nữa, Jack."
  },
  {
    word: "好好",
    pinyin: "hǎohāo",
    meaning_vi: "Tốt, cẩn thận, đàng hoàng",
    meaning_en: "well, carefully",
    sentence: "你在新家里好好生活，照顾好自己。",
    sentence_pinyin: "Nǐ zài xīn jiā li hǎohāo shēnghuó, zhàogù hǎo zìjǐ.",
    sentence_vi: "Con ở nhà mới hãy sống thật tốt và chăm sóc bản thân cho tốt nhé."
  },
  {
    word: "生活",
    pinyin: "shēnghuó",
    meaning_vi: "Sống, cuộc sống",
    meaning_en: "live, life",
    sentence: "你在新家里好好生活，照顾好自己。",
    sentence_pinyin: "Nǐ zài xīn jiā li hǎohāo shēnghuó, zhàogù hǎo zìjǐ.",
    sentence_vi: "Con ở nhà mới hãy sống thật tốt và chăm sóc bản thân cho tốt nhé."
  },
  {
    word: "照顾",
    pinyin: "zhàogù",
    meaning_vi: "Chăm sóc, trông nom",
    meaning_en: "take care of",
    sentence: "你在新家里好好生活，照顾好自己。",
    sentence_pinyin: "Nǐ zài xīn jiā li hǎohāo shēnghuó, zhàogù hǎo zìjǐ.",
    sentence_vi: "Con ở nhà mới hãy sống thật tốt và chăm sóc bản thân cho tốt nhé."
  },
  {
    word: "支",
    pinyin: "zhī",
    meaning_vi: "Chiếc, cây (lượng từ vật dạng que)",
    meaning_en: "measure word for stick-like objects",
    sentence: "杰克，这支笔是我的！",
    sentence_pinyin: "Jiékè, zhè zhī bǐ shì wǒ de!",
    sentence_vi: "Jack, chiếc bút này là của mình!"
  },
  {
    word: "汽车",
    pinyin: "qìchē",
    meaning_vi: "Xe hơi, ô tô",
    meaning_en: "car",
    sentence: "有回家的汽车吗？",
    sentence_pinyin: "Yǒu huí jiā de qìchē ma?",
    sentence_vi: "Có xe về nhà không?"
  },
  {
    word: "看不清",
    pinyin: "kàn bu qīng",
    meaning_vi: "Không nhìn rõ, mờ mắt",
    meaning_en: "not able to see clearly",
    sentence: "我看不清。",
    sentence_pinyin: "Wǒ kàn bu qīng.",
    sentence_vi: "Mình không nhìn rõ."
  },
  {
    word: "得",
    pinyin: "děi",
    meaning_vi: "Phải, cần phải",
    meaning_en: "need to, must",
    sentence: "我们得去机场看看。",
    sentence_pinyin: "Wǒmen děi qù jīchǎng kànkan.",
    sentence_vi: "Chúng ta phải đến sân bay xem sao."
  },
  {
    word: "机场",
    pinyin: "jīchǎng",
    meaning_vi: "Sân bay, phi trường",
    meaning_en: "airport",
    sentence: "我们得去机场看看。",
    sentence_pinyin: "Wǒmen děi qù jīchǎng kànkan.",
    sentence_vi: "Chúng ta phải đến sân bay xem sao."
  },
  {
    word: "航班",
    pinyin: "hángbān",
    meaning_vi: "Chuyến bay",
    meaning_en: "flight",
    sentence: "航班也没有了。",
    sentence_pinyin: "Hángbān yě méiyǒu le.",
    sentence_vi: "Chuyến bay cũng không còn nữa rồi."
  },
  {
    word: "该",
    pinyin: "gāi",
    meaning_vi: "Nên, cần nên",
    meaning_en: "should",
    sentence: "我们该怎么办？",
    sentence_pinyin: "Wǒmen gāi zěnmebàn?",
    sentence_vi: "Chúng ta nên làm thế nào đây?"
  },
  {
    word: "怎么办",
    pinyin: "zěnmebàn",
    meaning_vi: "Làm sao, làm thế nào",
    meaning_en: "what's to be done",
    sentence: "我们该怎么办？",
    sentence_pinyin: "Wǒmen gāi zěnmebàn?",
    sentence_vi: "Chúng ta nên làm thế nào đây?"
  },
  {
    word: "火车站",
    pinyin: "huǒchēzhàn",
    meaning_vi: "Ga tàu hỏa, nhà ga",
    meaning_en: "train station",
    sentence: "我们去火车站看看。",
    sentence_pinyin: "Wǒmen qù huǒchēzhàn kànkan.",
    sentence_vi: "Chúng ta đến ga tàu hỏa xem thử đi."
  },
  {
    word: "马上",
    pinyin: "mǎshàng",
    meaning_vi: "Ngay lập tức, sắp sửa",
    meaning_en: "right away, immediately",
    sentence: "但是马上要开了。",
    sentence_pinyin: "Dànshì mǎshàng yào kāi le.",
    sentence_vi: "Nhưng xe/tàu sắp chạy ngay rồi."
  },
  {
    word: "要...了",
    pinyin: "yào...le",
    meaning_vi: "Sắp... rồi, chuẩn bị... rồi",
    meaning_en: "going to, about to",
    sentence: "但是马上要开了。",
    sentence_pinyin: "Dànshì mǎshàng yào kāi le.",
    sentence_vi: "Nhưng xe/tàu sắp chạy ngay rồi."
  },
  {
    word: "错过",
    pinyin: "cuòguò",
    meaning_vi: "Bỏ lỡ, lỡ (chuyến tàu, cơ hội)",
    meaning_en: "miss (train, opportunity)",
    sentence: "我们要错过了！",
    sentence_pinyin: "Wǒmen yào cuòguò le!",
    sentence_vi: "Chúng ta sắp lỡ mất rồi!"
  }
];

// 2. AUDIO SYNTHESIZER (Web Audio API)
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

// Cartoon Sound Effects
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
    
    // Play a happy 3-note arpeggio (C5 - E5 - G5 - C6)
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
    
    // Train whistle uses two oscillators slightly detuned to create a chorused blast
    const freqs = [587.33, 622.25]; // D5 and D#5 (dissonant steam chord)
    
    freqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      // Add a tiny vibrato
      osc.frequency.linearRampToValueAtTime(freq + 5, now + 0.2);
      osc.frequency.linearRampToValueAtTime(freq - 5, now + 0.5);
      osc.frequency.linearRampToValueAtTime(freq, now + 0.8);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1); // Attack
      gain.gain.linearRampToValueAtTime(0.15, now + 0.6); // Sustain
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8); // Decay
      
      osc.start();
      osc.stop(now + 0.85);
    });
  }
};

// 3. TEXT-TO-SPEECH (TTS) SYSTEM
let chineseVoice = null;

function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  // Try to find a Chinese voice (zh-CN preferred, then zh-HK, zh-TW, etc.)
  chineseVoice = voices.find(v => v.lang.startsWith('zh-CN')) ||
                 voices.find(v => v.lang.startsWith('zh')) ||
                 null;
}

// Chrome loads voices asynchronously
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speakChinese(text, onEndCallback = null) {
  if (!window.speechSynthesis) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  } else {
    utterance.lang = 'zh-CN';
  }
  utterance.rate = 0.8; // Speak slightly slower for kids to hear clearly
  utterance.pitch = 1.1; // Cute, friendly pitch
  
  if (onEndCallback) {
    utterance.onend = onEndCallback;
  }
  
  window.speechSynthesis.speak(utterance);
}

// 4. MAIN STATE & TAB SYSTEM
const state = {
  currentSlide: 0,
  gameMatch: {
    selectedWords: [], // List of 4 words chosen for current round
    matchedCount: 0
  },
  gameQuiz: {
    questions: [], // 5 randomized questions
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
  
  // Play welcome sounds on first user click anywhere to initialize Web Audio
  document.body.addEventListener('click', () => {
    initAudioContext();
  }, { once: true });
});

// Tab navigation handler
function setupTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      soundEffects.click();
      
      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Activate clicked
      tab.classList.add('active');
      const target = tab.dataset.target;
      document.getElementById(target).classList.add('active');
      
      // Auto-restart game elements if switching into games
      if (target === 'section-game-match') {
        startTrainGame();
      } else if (target === 'section-game-quiz') {
        startQuizGame();
      }
    });
  });
}

// Sound toggle button
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

// 5. SLIDE DECK SYSTEM
function setupSlideDeck() {
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  
  // Set total slides count
  document.getElementById('total-slides-num').textContent = vocabularyList.length;
  document.getElementById('vocab-count').textContent = vocabularyList.length;
  
  // Bind slide button controls
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
  
  // Populate Quick-Jump Sidebar
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
  
  // Initial render
  renderSlide();
}

function renderSlide() {
  const data = vocabularyList[state.currentSlide];
  const card = document.getElementById('slide-card');
  
  // Update indicator
  document.getElementById('current-slide-num').textContent = state.currentSlide + 1;
  
  // Update active sidebar item
  document.querySelectorAll('.vocab-item').forEach(item => {
    item.classList.remove('active');
    if (parseInt(item.dataset.index) === state.currentSlide) {
      item.classList.add('active');
      // Scroll into view gently
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  
  // Highlight the keyword inside example sentence
  let highlightedSentence = data.sentence;
  if (data.sentence.includes(data.word)) {
    highlightedSentence = data.sentence.replace(
      new RegExp(data.word, 'g'),
      `<span class="highlight">${data.word}</span>`
    );
  } else {
    // Fallback: search for sub-characters if needed, or leave as is
    // Let's check if there are sub-words like '要...了' in '但是马上要开了。'
    if (data.word === "要...了" && data.sentence.includes("要") && data.sentence.includes("了")) {
      highlightedSentence = data.sentence
        .replace("要", `<span class="highlight">要</span>`)
        .replace("了", `<span class="highlight">了</span>`);
    } else if (data.word === "得" && data.sentence.includes("得")) {
      highlightedSentence = data.sentence.replace("得", `<span class="highlight">得</span>`);
    } else if (data.word === "该" && data.sentence.includes("该")) {
      highlightedSentence = data.sentence.replace("该", `<span class="highlight">该</span>`);
    } else if (data.word === "交" && data.sentence.includes("交")) {
      highlightedSentence = data.sentence.replace("交", `<span class="highlight">交</span>`);
    } else if (data.word === "支" && data.sentence.includes("支")) {
      highlightedSentence = data.sentence.replace("支", `<span class="highlight">支</span>`);
    }
  }
  
  // Construct card content
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
  
  // Trigger speech button
  const btnSpeak = card.querySelector('#btn-slide-speak');
  btnSpeak.addEventListener('click', () => {
    // Speak word first, then pause, then speak sentence
    speakChinese(data.word, () => {
      setTimeout(() => {
        speakChinese(data.sentence);
      }, 500);
    });
  });
  
  // Enable/Disable navigation buttons
  document.getElementById('btn-prev-slide').disabled = (state.currentSlide === 0);
  document.getElementById('btn-next-slide').disabled = (state.currentSlide === vocabularyList.length - 1);
}

// 6. GAME 1: "CATCH THE TRAIN" MATCHING GAME
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
  
  // Reset train position
  trainSprite.style.transform = 'translateX(0)';
  
  // Select 4 random vocab items
  const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
  state.gameMatch.selectedWords = shuffled.slice(0, 4);
  state.gameMatch.matchedCount = 0;
  
  // Create carriages
  carriagesContainer.innerHTML = '';
  state.gameMatch.selectedWords.forEach((item, index) => {
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
  
  // Create draggable words, shuffled
  const shuffledWords = [...state.gameMatch.selectedWords].sort(() => 0.5 - Math.random());
  wordsDock.innerHTML = '';
  shuffledWords.forEach(item => {
    const card = document.createElement('div');
    card.className = 'draggable-word';
    card.textContent = item.word;
    card.draggable = true;
    
    // Drag events
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', item.word);
    });
    
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
    
    wordsDock.appendChild(card);
  });
  
  // Setup Drop zones
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
        // Correct match!
        zone.classList.add('matched');
        zone.textContent = draggedWord;
        
        // Remove draggable card from dock
        const dockCards = wordsDock.querySelectorAll('.draggable-word');
        dockCards.forEach(card => {
          if (card.textContent === draggedWord) {
            card.remove();
          }
        });
        
        // Speak word
        speakChinese(draggedWord);
        soundEffects.success();
        
        state.gameMatch.matchedCount++;
        
        // Check if all matched
        if (state.gameMatch.matchedCount === 4) {
          setTimeout(completeTrainGame, 600);
        }
      } else {
        // Wrong match
        soundEffects.error();
        // Add shake animation
        zone.closest('.carriage').animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0)' }
        ], { duration: 300 });
      }
    });
  });
}

function completeTrainGame() {
  soundEffects.trainWhistle();
  
  // Animate train chugging away
  const trainSprite = document.getElementById('train-sprite');
  trainSprite.style.transform = 'translateX(100vw)';
  
  setTimeout(() => {
    // Show win modal
    showModal({
      title: "Đoàn Tàu Xuất Phát! 🚂💨",
      message: "Tuyệt vời! Bé đã xếp đúng tất cả toa tàu rồi. Chuyến tàu chở các từ vựng đã lăn bánh!",
      stats: "Hoàn thành: 4 / 4 từ đúng ✅",
      actionText: "Chơi Lại Trò Này 🔄",
      actionCallback: () => {
        startTrainGame();
      }
    });
  }, 1200);
}

// 7. GAME 2: SENTENCE BUILDER QUIZ
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
  
  // Select 5 random words for quiz
  const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
  state.gameQuiz.questions = shuffled.slice(0, 5);
  
  document.getElementById('quiz-total-q').textContent = state.gameQuiz.questions.length;
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const data = state.gameQuiz.questions[state.gameQuiz.currentQuestionIndex];
  
  // Hide next button, clear feedback
  document.getElementById('btn-next-quiz').classList.add('hidden');
  const feedback = document.getElementById('quiz-feedback');
  feedback.className = 'quiz-feedback';
  feedback.textContent = '';
  
  // Update progress
  document.getElementById('quiz-current-q').textContent = state.gameQuiz.currentQuestionIndex + 1;
  
  // Build blank sentence
  // Replace target word in example sentence with blank
  let displaySentence = data.sentence;
  let hasReplaced = false;
  
  if (data.sentence.includes(data.word)) {
    displaySentence = data.sentence.replace(data.word, `<span class="blank-spot" id="blank-spot">？</span>`);
    hasReplaced = true;
  } else {
    // Custom fallbacks for compound words
    if (data.word === "要...了" && data.sentence.includes("要") && data.sentence.includes("了")) {
      displaySentence = data.sentence.replace("要", `<span class="blank-spot" id="blank-spot">要</span>`).replace("了", `<span class="blank-spot" id="blank-spot-2">了</span>`);
      hasReplaced = true;
    } else {
      // Direct characters
      ["得", "该", "交", "支"].forEach(char => {
        if (data.word === char && data.sentence.includes(char)) {
          displaySentence = data.sentence.replace(char, `<span class="blank-spot" id="blank-spot">？</span>`);
          hasReplaced = true;
        }
      });
    }
  }
  
  if (!hasReplaced) {
    // Ultimate fallback if sentence doesn't have exact word (should not happen with our list)
    displaySentence = `[ ${data.meaning_vi} ]`;
  }
  
  document.getElementById('quiz-hint').textContent = `Nghĩa câu: "${data.sentence_vi}"`;
  document.getElementById('quiz-sentence').innerHTML = displaySentence;
  document.getElementById('quiz-pinyin').textContent = data.sentence_pinyin;
  
  // Create 3 multiple choice options (1 correct, 2 distractors)
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
    btn.innerHTML = `
      <span class="opt-chinese">${opt.word}</span>
      <span class="opt-pinyin">${opt.pinyin}</span>
    `;
    
    btn.addEventListener('click', () => {
      handleQuizAnswer(opt.word === data.word, btn, data);
    });
    
    optionsContainer.appendChild(btn);
  });
}

function handleQuizAnswer(isCorrect, clickedBtn, data) {
  const feedback = document.getElementById('quiz-feedback');
  const optionsContainer = document.getElementById('quiz-options');
  const btns = optionsContainer.querySelectorAll('.quiz-option-btn');
  
  if (isCorrect) {
    soundEffects.success();
    clickedBtn.classList.add('correct');
    feedback.className = 'quiz-feedback success';
    feedback.textContent = '🎉 Chính xác! Giỏi lắm bé ơi!';
    
    // Fill the blank
    const blank = document.getElementById('blank-spot');
    if (blank) {
      blank.textContent = data.word;
      blank.style.borderBottomStyle = 'solid';
      blank.style.color = 'var(--color-success)';
    }
    
    // Speak sentence
    speakChinese(data.sentence);
    
    // Disable all options
    btns.forEach(btn => btn.classList.add('disabled'));
    
    // Add score
    state.gameQuiz.score += 10;
    document.getElementById('quiz-score-val').textContent = state.gameQuiz.score;
    
    // Show next button
    document.getElementById('btn-next-quiz').classList.remove('hidden');
  } else {
    soundEffects.error();
    clickedBtn.classList.add('wrong');
    clickedBtn.classList.add('disabled');
    feedback.className = 'quiz-feedback error';
    feedback.textContent = '😢 Hộp quà chưa đúng rồi, bé thử lại nhé!';
  }
}

function completeQuizGame() {
  showModal({
    title: "Chúc Mừng Bé! 🏆🌟",
    message: "Bé đã vượt qua tất cả các câu hỏi trắc nghiệm thử thách trên đường đi rồi!",
    stats: `Điểm số đạt được: ${state.gameQuiz.score} / 50 điểm ⭐`,
    actionText: "Chơi Lại Trắc Nghiệm 🔄",
    actionCallback: () => {
      startQuizGame();
    }
  });
}

// 8. MODAL CONTROLLER
function showModal({ title, message, stats, actionText, actionCallback }) {
  const overlay = document.getElementById('success-modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-message').textContent = message;
  document.getElementById('modal-stats').textContent = stats;
  
  const actionBtn = document.getElementById('btn-modal-action');
  actionBtn.textContent = actionText;
  
  // Clone action button to strip previous event listeners
  const newActionBtn = actionBtn.cloneNode(true);
  actionBtn.parentNode.replaceChild(newActionBtn, actionBtn);
  
  newActionBtn.addEventListener('click', () => {
    soundEffects.click();
    overlay.classList.remove('active');
    if (actionCallback) actionCallback();
  });
  
  overlay.classList.add('active');
}
