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
    }
  };

  // Determine unlock status dynamically
  const seq = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69];
  for (let i = 0; i < seq.length - 1; i++) {
    if (lessons[seq[i]].completed) {
      lessons[seq[i+1]].unlocked = true;
    }
  }

  let totalPoints = 0;
  let completedCount = 0;

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
    }

    if (!card) return; // Guard in case of missing DOM elements

    if (lesson.unlocked) {
      // Unlock state updates
      card.className = "lesson-card unlocked";
      if (lockOverlay) lockOverlay.style.display = "none";
      if (banner) banner.style.backgroundImage = "url('magic_pen_banner.png')";

      if (lesson.completed) {
        badge.textContent = "Đã học";
        badge.className = "status-badge completed";
        scoreText.textContent = `Điểm: ${lesson.score}/50`;
      } else {
        badge.textContent = "Chưa học";
        badge.className = "status-badge";
        scoreText.textContent = "Điểm: --";
      }

      // Inject active buttons
      if (actions) {
        actions.innerHTML = `
          <a href="${lesson.url}" class="play-lesson-btn">Học Ngay ➡️</a>
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

      badge.textContent = "Chưa mở khóa";
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

  // 3. Update Header Stats
  document.getElementById('total-points').textContent = totalPoints;
  document.getElementById('completed-count').textContent = `${completedCount}/10`;

  // 4. Calculate Badge Name (Rank)
  const badgeNameEl = document.getElementById('badge-name');
  if (totalPoints >= 450) {
    badgeNameEl.textContent = "Trạng Nguyên Nhí 👑";
  } else if (totalPoints >= 300) {
    badgeNameEl.textContent = "Học Giả Siêu Cấp 🌟";
  } else if (totalPoints >= 150) {
    badgeNameEl.textContent = "Học Giả Chăm Chỉ 🌱";
  } else if (totalPoints > 0) {
    badgeNameEl.textContent = "Tân Binh Học Tập 🎒";
  } else {
    badgeNameEl.textContent = "Học Giả Mới 🥚";
  }
}
