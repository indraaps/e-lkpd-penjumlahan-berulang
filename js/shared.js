// ========== SHARED UTILITIES ==========

// Get student info from localStorage
function getStudent() {
  return {
    name: localStorage.getItem('elkpd_nama') || '',
    kelas: localStorage.getItem('elkpd_kelas') || ''
  };
}

// Set student info bar
function initStudentBar() {
  const student = getStudent();
  const bar = document.getElementById('student-bar');
  if (bar && student.name) {
    document.getElementById('display-nama').textContent = `👤 ${student.name}`;
    document.getElementById('display-kelas').textContent = `🏫 Kelas ${student.kelas}`;
  }
}

// Check if student is logged in, redirect to index if not
function requireLogin() {
  const student = getStudent();
  if (!student.name || !student.kelas) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// ========== TOAST NOTIFICATION ==========
function showToast(msg, type = 'info') {
  const colors = { info: '#4FC3F7', warning: '#FF6B2B', success: '#4CAF50', error: '#F44336' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:${colors[type]}; color:white; padding:0.8rem 1.8rem;
    border-radius:50px; font-family:'Nunito',sans-serif; font-weight:800;
    font-size:1rem; box-shadow:0 4px 20px rgba(0,0,0,0.2); z-index:500;
    animation:fadeSlideIn 0.3s ease; white-space:nowrap;`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ========== CONFETTI ==========
function showConfetti() {
  const emojis = ['🎉','⭐','🌟','✨','🎈','🎊','🏆','💫','🌈','🎯'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.top = '-20px';
      c.style.fontSize = (1 + Math.random()) + 'rem';
      c.style.animationDuration = (1.5 + Math.random()) + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3000);
    }, i * 80);
  }
}

// ========== RESULT MODAL ==========
function showResult(correct, total) {
  const pct = Math.round((correct / total) * 100);
  const overlay = document.getElementById('result-overlay');
  if (!overlay) return;
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '😊' : '💪';
  const title = pct >= 80 ? 'Luar Biasa!' : pct >= 60 ? 'Bagus!' : 'Ayo semangat!';
  const msg = pct >= 80
    ? `Kamu menjawab ${correct} dari ${total} soal dengan benar! Hebat sekali! 🌟`
    : pct >= 60
    ? `${correct} dari ${total} benar. Terus berlatih ya! 😊`
    : `${correct} dari ${total} benar. Jangan menyerah, coba lagi! 💪`;

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-score').textContent = `${correct}/${total}`;
  document.getElementById('result-msg').textContent = msg;
  overlay.classList.add('show');
  if (pct >= 80) showConfetti();
}

function closeResult() {
  document.getElementById('result-overlay').classList.remove('show');
}

// Init result modal events
function initResultModal() {
  const closeBtn = document.getElementById('btn-close-result');
  const overlay = document.getElementById('result-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeResult);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeResult();
  });
}

// Mark active nav button
function markActiveNav(page) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('href') === page) {
      btn.classList.add('active');
    }
  });
}
