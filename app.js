// ==========================================================================
// MAIN DASHBOARD LOGIC
// Reads progress and scoring from localStorage, updates UI stats dynamically.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  updateDashboardStats();
});

function updateDashboardStats() {
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
    }
  };

  // Determine unlock status dynamically
  const seq = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
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
    72: "Hoạt Hình 🎬"
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
  document.getElementById('completed-count').textContent = `${completedCount}/13`;
  
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
