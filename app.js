// ==========================================================================
// MAIN DASHBOARD LOGIC (KIDITORIAL THEME)
// Updates stats, progress indicators, charts, and achievements based on local storage.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  updateDashboardStats();
});

function updateDashboardStats() {
  // 1. Read progress from localStorage
  const isCompleted67 = localStorage.getItem('lesson_67_completed') === 'true';
  const score67 = parseInt(localStorage.getItem('lesson_67_score') || '0');
  
  // 2. Element references
  const progressPercentVal = document.getElementById('progress-percent-val');
  const progressRingBar = document.getElementById('progress-ring-bar');
  const bellCount = document.getElementById('bell-count');
  const diamondCount = document.getElementById('diamond-count');
  const scoreBadge67 = document.getElementById('score-badge-67');
  
  const badgeShoes = document.getElementById('badge-shoes');
  const badgeStar = document.getElementById('badge-star');
  const badgePen = document.getElementById('badge-pen');
  
  const chartBarToday = document.getElementById('chart-bar-today');
  const chartTooltipVal = document.getElementById('chart-tooltip-val');
  
  // 3. Compute stats based on Lesson 67 status
  let percent = 0;
  let bells = 0;
  let diamonds = 5; // Start with 5 base diamonds
  
  if (isCompleted67) {
    percent = 100;
    bells = 1;
    // Base 90 diamonds + 10 bonus diamonds for finishing = 100 diamonds
    diamonds = 90 + (score67 >= 50 ? 10 : 0);
    
    // Show score badge on Lesson 67 card
    scoreBadge67.textContent = `Done: ${score67}/50`;
    scoreBadge67.style.display = 'block';
    
    // Unlock badges
    badgeShoes.classList.remove('locked');
    badgeShoes.classList.add('unlocked');
    
    if (score67 >= 50) {
      badgeStar.classList.remove('locked');
      badgeStar.classList.add('unlocked');
      badgePen.classList.remove('locked');
      badgePen.classList.add('unlocked');
    }
    
    // Update chart
    chartBarToday.style.height = '85%';
    chartTooltipVal.textContent = '40 min';
  } else {
    percent = 0;
    bells = 0;
    diamonds = 5;
    scoreBadge67.style.display = 'none';
    
    chartBarToday.style.height = '10%';
    chartTooltipVal.textContent = '5 min';
  }
  
  // 4. Update Header Stats
  bellCount.textContent = bells;
  diamondCount.textContent = diamonds;
  
  // 5. Update Progress Circle
  progressPercentVal.textContent = percent;
  
  // Calculate SVG stroke-dashoffset (radius is 38, circumference is 238.76)
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // 238.76
  const offset = circumference - (percent / 100) * circumference;
  
  // Apply offset animation
  progressRingBar.style.strokeDasharray = `${circumference} ${circumference}`;
  progressRingBar.style.strokeDashoffset = offset;
}
