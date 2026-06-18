// ==========================================================================
// MAIN DASHBOARD LOGIC
// Reads progress and scoring from localStorage, updates UI stats dynamically.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  updateDashboardStats();
});

function updateDashboardStats() {
  // 1. Read Lesson 67 progress
  const isCompleted67 = localStorage.getItem('lesson_67_completed') === 'true';
  const score67 = parseInt(localStorage.getItem('lesson_67_score') || '0');
  
  // 2. Update UI for Lesson 67 card
  const badge67 = document.getElementById('badge-status-67');
  const scoreText67 = document.getElementById('score-text-67');
  
  if (isCompleted67) {
    badge67.textContent = "Đã học";
    badge67.classList.add('completed');
    scoreText67.textContent = `Điểm: ${score67}/50`;
  } else {
    badge67.textContent = "Chưa học";
    badge67.classList.remove('completed');
    scoreText67.textContent = "Điểm: --";
  }
  
  // 3. Calculate general stats
  const totalPoints = score67; // Add other lesson scores here in the future
  const completedLessons = isCompleted67 ? 1 : 0;
  const totalAvailableLessons = 1;
  
  // 4. Update Header Stats
  document.getElementById('total-points').textContent = totalPoints;
  document.getElementById('completed-count').textContent = `${completedLessons}/${totalAvailableLessons}`;
  
  // 5. Calculate Badge Name (Rank)
  const badgeNameEl = document.getElementById('badge-name');
  if (totalPoints >= 50) {
    badgeNameEl.textContent = "Trạng Nguyên Nhí 👑";
  } else if (totalPoints >= 30) {
    badgeNameEl.textContent = "Học Giả Siêu Cấp 🌟";
  } else if (totalPoints > 0) {
    badgeNameEl.textContent = "Học Giả Chăm Chỉ 🌱";
  } else {
    badgeNameEl.textContent = "Tân Binh Học Tập 🎒";
  }
}

