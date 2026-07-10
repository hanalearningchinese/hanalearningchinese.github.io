// ==========================================================================
// MAIN DASHBOARD LOGIC
// Reads progress and scoring from localStorage, updates UI stats dynamically.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  updateDashboardStats();

  // Tab switching logic
  const tabs = document.querySelectorAll('.dash-tab');
  const panes = document.querySelectorAll('.tab-pane');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(target);
      if (targetPane) targetPane.classList.add('active');
    });
  });

});

function updateDashboardStats() {

  const yct2Titles = {
    81: { cn: "我可以坐这儿吗？", py: "Wǒ kěyǐ zuò zhè'r ma?", vi: "Tôi có thể ngồi đây không?" },
    82: { cn: "你早上几点起床？", py: "Nǐ zǎoshang jǐ diǎn qǐchuáng?", vi: "Sáng mấy giờ bạn thức dậy?" },
    83: { cn: "你的铅笔呢？", py: "Nǐ de qiānbǐ ne?", vi: "Bút chì của bạn đâu?" },
    84: { cn: "书包里有两本书", py: "Shūbāo lǐ yǒu liǎng běn shū", vi: "Trong cặp sách có hai quyển sách" },
    85: { cn: "你会不会做饭？", py: "Nǐ huì bú huì zuòfàn?", vi: "Bạn có biết nấu cơm không?" },
    86: { cn: "包子多少钱一个？", py: "Bāozi duōshao qián yí ge?", vi: "Bánh bao bao nhiêu tiền một cái?" },
    87: { cn: "今天比昨天热", py: "Jīntiān bǐ zuótiān rè", vi: "Hôm nay nóng hơn hôm qua" },
    88: { cn: "马丁比我大三岁", py: "Mǎdīng bǐ wǒ dà sān suì", vi: "Martin lớn hơn tôi 3 tuổi" },
    89: { cn: "你今天做什么了？", py: "Nǐ jīntiān zuò shénme le?", vi: "Hôm nay bạn đã làm gì?" },
    90: { cn: "你怎么了？", py: "Nǐ zěnme le?", vi: "Bạn bị làm sao thế?" },
    91: { cn: "我来北京一年了", py: "Wǒ lái Běijīng yì nián le", vi: "Tôi đến Bắc Kinh được một năm rồi" }
  };

  // 1. Read completion status and scores from localStorage
  const lessons = {
    60: {
      completed: localStorage.getItem('lesson_60_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_60_score') || '0'),
      url: 'lessons/lesson_60.html',
      yt: 'https://www.youtube.com/watch?v=SRm4upkD85M',
      unlocked: true // First lesson is always unlocked by default
    },
    61: {
      completed: localStorage.getItem('lesson_61_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_61_score') || '0'),
      url: 'lessons/lesson_61.html',
      yt: 'https://www.youtube.com/watch?v=kzTXHuBITos',
      unlocked: false
    },
    62: {
      completed: localStorage.getItem('lesson_62_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_62_score') || '0'),
      url: 'lessons/lesson_62.html',
      yt: 'https://www.youtube.com/watch?v=ewb-pxeyDw0',
      unlocked: false
    },
    63: {
      completed: localStorage.getItem('lesson_63_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_63_score') || '0'),
      url: 'lessons/lesson_63.html',
      yt: 'https://www.youtube.com/watch?v=mnTCrCUC134',
      unlocked: false
    },
    64: {
      completed: localStorage.getItem('lesson_64_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_64_score') || '0'),
      url: 'lessons/lesson_64.html',
      yt: 'https://www.youtube.com/watch?v=0O_17rBZAtw',
      unlocked: false
    },
    65: {
      completed: localStorage.getItem('lesson_65_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_65_score') || '0'),
      url: 'lessons/lesson_65.html',
      yt: 'https://www.youtube.com/watch?v=Fw7iZQrZenw',
      unlocked: false
    },
    66: {
      completed: localStorage.getItem('lesson_66_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_66_score') || '0'),
      url: 'lessons/lesson_66.html',
      yt: 'https://www.youtube.com/watch?v=J0X8oaom7js',
      unlocked: false
    },
    67: {
      completed: localStorage.getItem('lesson_67_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_67_score') || '0'),
      url: 'lessons/lesson_67.html',
      yt: 'https://www.youtube.com/watch?v=aFV_dJVB7MY',
      unlocked: false
    },
    68: {
      completed: localStorage.getItem('lesson_68_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_68_score') || '0'),
      url: 'lessons/lesson_68.html',
      yt: 'https://www.youtube.com/watch?v=6t6XPw9J9-Y',
      unlocked: false
    },
    69: {
      completed: localStorage.getItem('lesson_69_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_69_score') || '0'),
      url: 'lessons/lesson_69.html',
      yt: 'https://www.youtube.com/watch?v=9xZvrLqiqTo',
      unlocked: false
    },
    70: {
      completed: localStorage.getItem('lesson_70_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_70_score') || '0'),
      url: 'lessons/lesson_70.html',
      yt: 'https://www.youtube.com/watch?v=R9Ym5s2nWeI',
      unlocked: true // Mở khóa mặc định cho Hana theo yêu cầu
    },
    71: {
      completed: localStorage.getItem('lesson_71_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_71_score') || '0'),
      url: 'lessons/lesson_71.html',
      yt: 'https://www.youtube.com/watch?v=F_fD6hO6d7o',
      unlocked: false
    },
    72: {
      completed: localStorage.getItem('lesson_72_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_72_score') || '0'),
      url: 'lessons/lesson_72.html',
      yt: 'https://www.youtube.com/watch?v=hB9i8a_b5rU',
      unlocked: false
    },
    73: {
      completed: localStorage.getItem('lesson_73_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_73_score') || '0'),
      url: 'lessons/lesson_73.html',
      yt: 'https://www.youtube.com/watch?v=UbuxXfm1gz4',
      unlocked: false
    },
    81: {
      completed: localStorage.getItem('lesson_81_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_81_score') || '0'),
      url: 'lessons/lesson_81.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    82: {
      completed: localStorage.getItem('lesson_82_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_82_score') || '0'),
      url: 'lessons/lesson_82.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    83: {
      completed: localStorage.getItem('lesson_83_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_83_score') || '0'),
      url: 'lessons/lesson_83.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    84: {
      completed: localStorage.getItem('lesson_84_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_84_score') || '0'),
      url: 'lessons/lesson_84.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    85: {
      completed: localStorage.getItem('lesson_85_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_85_score') || '0'),
      url: 'lessons/lesson_85.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    86: {
      completed: localStorage.getItem('lesson_86_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_86_score') || '0'),
      url: 'lessons/lesson_86.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    87: {
      completed: localStorage.getItem('lesson_87_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_87_score') || '0'),
      url: 'lessons/lesson_87.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    88: {
      completed: localStorage.getItem('lesson_88_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_88_score') || '0'),
      url: 'lessons/lesson_88.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    89: {
      completed: localStorage.getItem('lesson_89_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_89_score') || '0'),
      url: 'lessons/lesson_89.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    90: {
      completed: localStorage.getItem('lesson_90_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_90_score') || '0'),
      url: 'lessons/lesson_90.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    },
    91: {
      completed: localStorage.getItem('lesson_91_completed') === 'true',
      score: parseInt(localStorage.getItem('lesson_91_score') || '0'),
      url: 'lessons/lesson_91.html',
      yt: 'https://www.youtube.com/watch?v=R9j0v0bXN9Y',
      unlocked: true
    }
  };

  // Determine unlock status dynamically
  const seq = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73];
  for (let i = 0; i < seq.length - 1; i++) {
    if (lessons[seq[i]].completed) {
      lessons[seq[i+1]].unlocked = true;
    }
  }

  let totalPoints = 0;
  let completedCount = 0;
  let totalXP = 0;

  // List of cities matching lessons 60 to 72
  const cities = {
    60: "Thượng Hải 🚢",
    61: "Hải Nam 🌊",
    62: "Quế Lâm ⛰️",
    63: "Thành Đô 🐼",
    64: "Bắc Kinh 🏯",
    65: "Đôn Hoàng 🏜️",
    66: "Tây An 🛡️",
    67: "Tây Tạng 🏔️",
    68: "Phượng Hoàng 🏮",
    69: "Himalaya ❄️",
    70: "Siêu Thị 🛒",
    71: "Sở Thú 🦁",
    73: "Đầm Lầy 🌿",
    81: "YCT 2 - Bài 1 坐 ⚓",
    82: "YCT 2 - Bài 2 起床 🐚",
    83: "YCT 2 - Bài 3 铅笔 ⛰️",
    84: "YCT 2 - Bài 4 书包 🐼",
    85: "YCT 2 - Bài 5 做饭 🏯",
    86: "YCT 2 - Bài 6 包子 🏜️",
    87: "YCT 2 - Bài 7 天气 🛡️",
    88: "YCT 2 - Bài 8 岁 🏔️",
    89: "YCT 2 - Bài 9 水果 🏮",
    90: "YCT 2 - Bài 10 医院 ❄️",
    91: "YCT 2 - Bài 11 学习 🌿"
  };

  // 2. Loop through lessons and update UI components
  Object.keys(lessons).forEach(num => {
    const lesson = lessons[num];
    const card = document.getElementById(`card-lesson-${num}`);
    const badge = document.getElementById(`badge-status-${num}`);
    const scoreText = document.getElementById(`score-text-${num}`);
    const actions = document.getElementById(`actions-${num}`);
    const lockOverlay = document.getElementById(`lock-${num}`);
    const banner = document.getElementById(`banner-${num}`);

    // Inject YCT 2 titles dynamically
    if (num >= 81 && num <= 91) {
      const titles = yct2Titles[num];
      const cnEl = document.getElementById(`cn-title-${num}`);
      const pyEl = document.getElementById(`py-title-${num}`);
      const viEl = document.getElementById(`vi-title-${num}`);
      if (cnEl) cnEl.textContent = titles.cn;
      if (pyEl) pyEl.textContent = titles.py;
      if (viEl) viEl.textContent = titles.vi;
    }

    if (lesson.completed) {
      completedCount++;
      totalPoints += lesson.score;
      // RPG rule: 1 point = 10 XP + 50 XP bonus for completion
      totalXP += (lesson.score * 10) + 50;
      
      // Unlock badge UI
      const badgeItem = document.getElementById(`badge-${num}-item`);
      if (badgeItem) {
        badgeItem.classList.remove('locked');
        badgeItem.setAttribute('title', `Đã nhận Huy hiệu thám hiểm tại thành phố ${cities[num]}!`);
      }
    }

    if (!card) return; // Guard in case of missing DOM elements

    // Customize banner name to City
    const lessonNumEl = card.querySelector('.lesson-num');
    if (lessonNumEl) {
      lessonNumEl.textContent = cities[num];
      lessonNumEl.style.fontSize = "0.9rem";
      lessonNumEl.style.padding = "6px 14px";
      lessonNumEl.style.background = "var(--color-primary)";
    }

    if (lesson.unlocked) {
      // Unlock state updates
      card.className = "lesson-card unlocked";
      if (lockOverlay) lockOverlay.style.display = "none";
      if (banner) banner.style.backgroundImage = "url('magic_pen_banner.png')";

      // Inject YCT 2 titles dynamically
    if (num >= 81 && num <= 91) {
      const titles = yct2Titles[num];
      const cnEl = document.getElementById(`cn-title-${num}`);
      const pyEl = document.getElementById(`py-title-${num}`);
      const viEl = document.getElementById(`vi-title-${num}`);
      if (cnEl) cnEl.textContent = titles.cn;
      if (pyEl) pyEl.textContent = titles.py;
      if (viEl) viEl.textContent = titles.vi;
    }

    if (lesson.completed) {
        badge.textContent = "Đã dẹp Boss";
        badge.className = "status-badge completed";
        scoreText.textContent = `Điểm: ${lesson.score}/50`;
      } else {
        badge.textContent = "Chưa Khám Phá";
        badge.className = "status-badge";
        scoreText.textContent = "Boss: Sẵn sàng ⚔️";
        scoreText.style.color = "var(--color-danger)";
      }

      // Inject active buttons
      if (actions) {
        actions.innerHTML = `
          <a href="${lesson.url}" class="play-lesson-btn">Thám Hiểm ➡️</a>
          <a href="${lesson.yt}" target="_blank" class="yt-watch-btn" title="Xem video trên YouTube">📺 Xem Phim</a>
        `;
      }
    } else {
      // Locked state updates
      card.className = "lesson-card locked";
      if (lockOverlay) lockOverlay.style.display = "flex";
      if (banner) {
        banner.style.backgroundImage = "none";
        banner.style.backgroundColor = "#cbd5e1";
      }

      badge.textContent = "Bị Khóa";
      badge.className = "status-badge locked";
      scoreText.textContent = "";

      // Inject disabled action button
      if (actions) {
        actions.innerHTML = `
          <button class="play-lesson-btn disabled" disabled>Khóa 🔒</button>
        `;
      }
    }
  });

  // Calculate RPG Level based on totalXP
  // Formula: Level 1 = 0-99 XP, Level 2 = 100-199 XP, Level N = (N-1)*100 XP
  const rpgLevel = Math.floor(totalXP / 100) + 1;
  const currentXP = totalXP % 100;
  
  // Save RPG stats to localStorage
  localStorage.setItem('rpg_level', rpgLevel);
  localStorage.setItem('rpg_xp', totalXP);

  // 3. Update Header Stats
  document.getElementById('total-points').textContent = totalPoints;
  document.getElementById('completed-count').textContent = `${completedCount}/25`;
  
  // Update XP elements
  const xpCurrentEl = document.getElementById('xp-current');
  const xpNextEl = document.getElementById('xp-next');
  const xpFillEl = document.getElementById('xp-bar-fill');
  const lvlBadgeEl = document.getElementById('avatar-level');

  if (xpCurrentEl) xpCurrentEl.textContent = currentXP;
  if (xpNextEl) xpNextEl.textContent = 100;
  if (xpFillEl) xpFillEl.style.width = `${currentXP}%`;
  if (lvlBadgeEl) lvlBadgeEl.textContent = `Lv.${rpgLevel}`;

  // 4. Calculate Badge Name (Rank)
  const badgeNameEl = document.getElementById('badge-name');
  if (rpgLevel >= 15) {
    badgeNameEl.textContent = "Nhà Thám Hiểm Huyền Thoại 👑";
  } else if (rpgLevel >= 10) {
    badgeNameEl.textContent = "Đại Hiệp Tiếng Trung ⚔️";
  } else if (rpgLevel >= 6) {
    badgeNameEl.textContent = "Thợ Săn Boss Tinh Nhuệ 🎯";
  } else if (rpgLevel >= 3) {
    badgeNameEl.textContent = "Du Khách Chăm Chỉ 🎒";
  } else {
    badgeNameEl.textContent = "Nhà Thám Hiểm Mới 🥚";
  }
}
