const card = document.querySelector(".card");
const cardInner = document.querySelector(".card-inner");
const btns = document.querySelectorAll(".btn-player-stats");

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    cardInner.classList.toggle("card-flip");
  });
});

// ── Helpers ──────────────────────────────────────────────
function setValid(inputEl) {
  const fg = inputEl.closest('.fg');
  fg.classList.remove('error');
  fg.classList.add('valid');
}

function setError(inputEl, msg) {
  const fg = inputEl.closest('.fg');
  const fbId = 'fb-' + inputEl.id.replace('f-', '');
  fg.classList.remove('valid');
  fg.classList.add('error');
  const fb = document.getElementById(fbId);
  if (fb) fb.textContent = msg;
}

function clearState(inputEl) {
  const fg = inputEl.closest('.fg');
  fg.classList.remove('valid', 'error');
}

// ── Character counters ────────────────────────────────────
document.getElementById('f-name').addEventListener('input', function () {
  document.getElementById('cc-name').textContent = `${this.value.length}/40`;
});

document.getElementById('f-notes').addEventListener('input', function () {
  document.getElementById('cc-notes').textContent = `${this.value.length}/300`;
});

// ── Inline (blur) validation ──────────────────────────────
function validateName() {
  const el = document.getElementById('f-name');
  if (!el.value.trim()) { setError(el, 'Scout name is required.'); return false; }
  setValid(el); return true;
}

function validateEmail() {
  const el = document.getElementById('f-email');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!el.value.trim()) { setError(el, 'Email is required.'); return false; }
  if (!re.test(el.value)) { setError(el, 'Enter a valid email address.'); return false; }
  setValid(el); return true;
}

function validateGrade() {
  const el = document.getElementById('f-grade');
  if (!el.value) { setError(el, 'Please select a grade.'); return false; }
  setValid(el); return true;
}

function validateNotes() {
  const el = document.getElementById('f-notes');
  if (!el.value.trim()) { setError(el, 'Observations are required.'); return false; }
  setValid(el); return true;
}

function validateMeasurable(id, min, max, label) {
  const el = document.getElementById(id);
  if (el.value === '') return true; // optional fields
  const v = parseFloat(el.value);
  if (isNaN(v) || v < min || v > max) {
    setError(el, `${label} must be between ${min} and ${max}.`);
    return false;
  }
  setValid(el); return true;
}

// Attach blur listeners
document.getElementById('f-name').addEventListener('blur', validateName);
document.getElementById('f-email').addEventListener('blur', validateEmail);
document.getElementById('f-grade').addEventListener('change', validateGrade);
document.getElementById('f-notes').addEventListener('blur', validateNotes);

[
  ['f-forty',   4.0,  6.0,  '40-Yard Dash'],
  ['f-vert',    20,   50,   'Vertical Jump'],
  ['f-broad',   80,   160,  'Broad Jump'],
  ['f-cone',    6.0,  8.0,  '3-Cone Drill'],
  ['f-shuttle', 3.5,  5.5,  'Short Shuttle'],
  ['f-bench',   0,    50,   'Bench Reps'],
].forEach(([id, min, max, label]) => {
  document.getElementById(id)?.addEventListener('blur', () =>
    validateMeasurable(id, min, max, label)
  );
});

// ── Round buttons ─────────────────────────────────────────
let selectedRound = null;
document.querySelectorAll('.round-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    selectedRound = this.dataset.round;
    document.getElementById('fb-round').textContent = '';
  });
});

// ── Submit ────────────────────────────────────────────────
document.getElementById('sub-btn').addEventListener('click', function () {
  const ok = [
    validateName(),
    validateEmail(),
    validateGrade(),
    validateNotes(),
  ].every(Boolean);

  if (!selectedRound) {
    document.getElementById('fb-round').textContent = 'Please select a projected round.';
  }

  if (!ok || !selectedRound) {
    showToast(false, 'Please fix the errors above.');
    return;
  }

  showToast(true, 'Report submitted successfully!');
});

