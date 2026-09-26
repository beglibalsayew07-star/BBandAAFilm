// ==========================================
// 1. DOM ELEMANLARINI SEÇME
// ==========================================
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieCards = document.querySelectorAll('.movie-card');

// Yan Menü (Sidebar) Elemanları
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('open-sidebar-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const overlay = document.getElementById('overlay');
const sidebarUserBox = document.getElementById('sidebar-user-box');

// Video Modal Elemanları
const videoModal = document.getElementById('video-modal');
const trailerVideo = document.getElementById('trailer-video');
const directVideo = document.getElementById('direct-video');
const closeModalBtn = document.getElementById('close-modal');
const videoModalTitle = document.getElementById('video-modal-title');
const videoRatingTag = document.getElementById('video-rating-tag');
const videoYearTag = document.getElementById('video-year-tag');
const videoGenreTag = document.getElementById('video-genre-tag');
const videoModalDesc = document.getElementById('video-modal-desc');
const videoSourceBadge = document.getElementById('video-source-badge');
const btnModeTrailer = document.getElementById('btn-mode-trailer');
const btnModeMovie = document.getElementById('btn-mode-movie');
const btnModeLocal = document.getElementById('btn-mode-local');
const localVideoInput = document.getElementById('local-video-input');

// Auth (Giriş / Kayıt) Modal Elemanları
const authModal = document.getElementById('auth-modal');
const openAuthBtn = document.getElementById('open-auth-btn');
const closeAuthBtn = document.getElementById('close-auth-btn');
const authHeaderContainer = document.getElementById('auth-header-container');
const authTabs = document.querySelectorAll('.auth-tab-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authModalTitle = document.getElementById('auth-modal-title');
const authModalSubtitle = document.getElementById('auth-modal-subtitle');
const toastContainer = document.getElementById('toast-container');
const forgotPasswordLink = document.getElementById('forgot-password-link');

// Tema (Dark / Light Mode) Elemanları
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const sidebarThemeToggle = document.getElementById('sidebar-theme-toggle');
const sidebarThemeIcon = document.getElementById('sidebar-theme-icon');
const sidebarThemeText = document.getElementById('sidebar-theme-text');

// ==========================================
// 2. YAN MENÜ (SIDEBAR) İŞLEVLERİ
// ==========================================

function openSidebar() {
  if (sidebar) sidebar.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (openSidebarBtn) {
  openSidebarBtn.addEventListener('click', openSidebar);
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener('click', closeSidebar);
}

if (overlay) {
  overlay.addEventListener('click', () => {
    closeSidebar();
  });
}

// ==========================================
// 3. TOAST BİLDİRİŞ SİSTEMİ (NOTIFICATIONS)
// ==========================================

function showToast(message, type = 'success') {
  if (!toastContainer) return;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '🔔'}</span>
    <span class="toast-message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// ==========================================
// 4. AUTH (GİRİŞ VE HASAP DÖRET) İŞLEVLERİ
// ==========================================

// Başlangıçta kayıtlı kullanıcıları ve oturum açmış kullanıcıyı al
function getStoredUsers() {
  try {
    const users = localStorage.getItem('beletfilm_users');
    return users ? JSON.parse(users) : [
      // Demo ulanyjy
      {
        name: 'Merdan Begow',
        email: 'demo@belet.tm',
        password: 'password123'
      }
    ];
  } catch (e) {
    return [
      {
        name: 'Merdan Begow',
        email: 'demo@belet.tm',
        password: 'password123'
      }
    ];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem('beletfilm_users', JSON.stringify(users));
  } catch (e) {}
}

function getCurrentUser() {
  try {
    const user = localStorage.getItem('beletfilm_current_user') || sessionStorage.getItem('beletfilm_current_user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user, remember = true) {
  try {
    const data = JSON.stringify(user);
    if (remember) {
      localStorage.setItem('beletfilm_current_user', data);
    } else {
      sessionStorage.setItem('beletfilm_current_user', data);
    }
  } catch (e) {}
}

function clearCurrentUser() {
  try {
    localStorage.removeItem('beletfilm_current_user');
    sessionStorage.removeItem('beletfilm_current_user');
  } catch (e) {}
}

// Auth Modal Aç / Kapat
function openAuthModal(defaultTab = 'login') {
  if (!authModal) return;
  closeSidebar();
  switchTab(defaultTab);
  authModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  if (!authModal) return;
  authModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (openAuthBtn) {
  openAuthBtn.addEventListener('click', () => openAuthModal('login'));
}

if (closeAuthBtn) {
  closeAuthBtn.addEventListener('click', closeAuthModal);
}

if (authModal) {
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      closeAuthModal();
    }
  });
}

// Tab Değiştirme (Giriş <-> Hasap döret)
function switchTab(tabName) {
  authTabs.forEach((btn) => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (tabName === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    authModalTitle.textContent = 'Hoş geldiňiz!';
    authModalSubtitle.textContent = 'Filmleri görmek üçin hasabyňyza giriň';
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    authModalTitle.textContent = 'Täze Hasap Dörediň';
    authModalSubtitle.textContent = 'BeletFilm platformasyna agza boluň';
  }
}

authTabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    switchTab(tabName);
  });
});

// Şifre Göster / Gizle
document.querySelectorAll('.toggle-password').forEach((toggleBtn) => {
  toggleBtn.addEventListener('click', () => {
    const wrapper = toggleBtn.closest('.input-wrapper');
    const input = wrapper.querySelector('input');
    if (input.type === 'password') {
      input.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      input.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });
});

// Giriş Formu Submit
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailOrUser = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    const users = getStoredUsers();
    const user = users.find(
      (u) => (u.email.toLowerCase() === emailOrUser.toLowerCase() || u.name.toLowerCase() === emailOrUser.toLowerCase()) && u.password === password
    );

    if (user) {
      setCurrentUser(user, rememberMe);
      loginForm.reset();
      closeAuthModal();
      updateAuthUI();
      showToast(`Hoş geldiňiz, ${user.name}!`, 'success');
    } else {
      showToast('Email ýa-da açar sözi nädogry!', 'error');
    }
  });
}

// Kayıt Formu Submit
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
      showToast('Açar sözleri biri-birine gabat gelenok!', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Açar sözi iň az 6 belgiden ybarat bolmaly!', 'error');
      return;
    }

    const users = getStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      showToast('Bu email salgysy eýýäm hasapda bar!', 'error');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser, true);

    registerForm.reset();
    closeAuthModal();
    updateAuthUI();
    showToast(`Hasabyňyz döredildi! Hoş geldiňiz, ${name}!`, 'success');
  });
}

// Unutdum Linki
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Açar sözüni täzelemek kody emailiňize ugradyldy (Demo).', 'info');
  });
}

// UI Güncelleme (Giriş yapılmış mı kontrolü)
function updateAuthUI() {
  const currentUser = getCurrentUser();

  // Header Alanı
  if (authHeaderContainer) {
    if (currentUser) {
      const initials = currentUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      authHeaderContainer.innerHTML = `
        <div class="user-badge" title="${currentUser.email}">
          <div class="user-avatar">${initials}</div>
          <span class="user-name">${currentUser.name}</span>
          <button id="logout-btn" class="logout-icon-btn" title="Çykyş et">🚪</button>
        </div>
      `;

      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
      }
    } else {
      authHeaderContainer.innerHTML = `
        <button id="open-auth-btn" class="auth-btn">
          <span class="auth-icon">👤</span>
          <span class="auth-btn-text">Giriş</span>
        </button>
      `;
      const newOpenAuthBtn = document.getElementById('open-auth-btn');
      if (newOpenAuthBtn) {
        newOpenAuthBtn.addEventListener('click', () => openAuthModal('login'));
      }
    }
  }

  // Sidebar Alanı
  if (sidebarUserBox) {
    if (currentUser) {
      const initials = currentUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      sidebarUserBox.innerHTML = `
        <div class="sidebar-user-card">
          <div class="user-avatar">${initials}</div>
          <div class="user-info">
            <div class="user-title">${currentUser.name}</div>
            <div class="user-email">${currentUser.email}</div>
          </div>
          <button id="sidebar-logout-btn" class="logout-icon-btn" title="Çykyş">🚪</button>
        </div>
      `;
      const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
      if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', handleLogout);
      }
    } else {
      sidebarUserBox.innerHTML = `
        <div class="sidebar-login-prompt">
          <p>Hasabyňyza giriň ýa-da agza boluň</p>
          <button id="sidebar-open-auth-btn" class="sidebar-auth-btn">Giriş / Agza bol</button>
        </div>
      `;
      const sidebarOpenAuthBtn = document.getElementById('sidebar-open-auth-btn');
      if (sidebarOpenAuthBtn) {
        sidebarOpenAuthBtn.addEventListener('click', () => openAuthModal('login'));
      }
    }
  }
}

function handleLogout() {
  clearCurrentUser();
  updateAuthUI();
  showToast('Ulgamdan üstünlikli çykdyňyz.', 'info');
}

// ESC Tuşu Kontrolü
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (sidebar && sidebar.classList.contains('active')) {
      closeSidebar();
    }
    if (authModal && authModal.classList.contains('active')) {
      closeAuthModal();
    }
    if (videoModal && videoModal.classList.contains('active')) {
      closeModal();
    }
  }
});

// ==========================================
// 5. FİLM TIKLAMA VE VİDEO OYNATMA İŞLEVİ (DOLY FILM & TREÝLER)
// ==========================================

let currentActiveMovie = null;
let currentBlobUrl = null;

function setPlayerSource(url, isDirect = false, sourceLabel = 'Treýler') {
  if (!url) {
    showToast('Bu film üçin wideo çeşmesi tapylmady!', 'error');
    return;
  }

  // Wideo çeşmesiniň görnüşini anyklamak (.mp4, .webm, blob:// ýa-da göni video faýl)
  const isDirectFile = isDirect || url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('blob:');

  if (videoSourceBadge) {
    videoSourceBadge.textContent = sourceLabel;
  }

  if (isDirectFile) {
    if (trailerVideo) {
      trailerVideo.src = '';
      trailerVideo.classList.add('hidden');
    }
    if (directVideo) {
      directVideo.src = url;
      directVideo.classList.add('active');
      directVideo.play().catch(() => {
        // Autoplay policy block handling
      });
    }
  } else {
    if (directVideo) {
      directVideo.pause();
      directVideo.src = '';
      directVideo.classList.remove('active');
    }
    if (trailerVideo) {
      trailerVideo.classList.remove('hidden');
      trailerVideo.src = url;
    }
  }
}

function setActiveModeTab(tabBtn) {
  [btnModeTrailer, btnModeMovie, btnModeLocal].forEach((btn) => {
    if (btn) btn.classList.remove('active');
  });
  if (tabBtn) tabBtn.classList.add('active');
}

function openMoviePlayer(card) {
  if (!card) return;
  const trailerUrl = card.getAttribute('data-trailer') || '';
  const fullMovieUrl = card.getAttribute('data-full-movie') || trailerUrl;
  const title = card.getAttribute('data-title') || card.querySelector('.movie-info h3')?.textContent || 'Film';
  const rating = card.getAttribute('data-rating') || card.querySelector('.rating')?.textContent || '★ --';
  const year = card.getAttribute('data-year') || '2024';
  const genre = card.getAttribute('data-genre') || 'Aksiyon, Drama';
  const desc = card.getAttribute('data-desc') || 'Bu film BeletFilm platformasynda ýokary hilli tomaşa etmek üçin elýeterlidir.';

  currentActiveMovie = {
    title,
    rating,
    year,
    genre,
    desc,
    trailerUrl,
    fullMovieUrl
  };

  if (videoModalTitle) videoModalTitle.textContent = title;
  if (videoRatingTag) videoRatingTag.textContent = rating;
  if (videoYearTag) videoYearTag.textContent = year;
  if (videoGenreTag) videoGenreTag.textContent = genre;
  if (videoModalDesc) videoModalDesc.textContent = desc;

  // Başlangyçda göni oýnadylýan wideo akymyny açmak
  if (fullMovieUrl && (fullMovieUrl.endsWith('.mp4') || fullMovieUrl.endsWith('.webm'))) {
    setActiveModeTab(btnModeMovie);
    setPlayerSource(fullMovieUrl, true, '🍿 Doly Film');
  } else {
    setActiveModeTab(btnModeTrailer);
    setPlayerSource(trailerUrl, false, '▶ Treýler');
  }

  if (videoModal) {
    videoModal.classList.add('active');
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Treýler düwmesine basylanda
if (btnModeTrailer) {
  btnModeTrailer.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!currentActiveMovie) return;
    setActiveModeTab(btnModeTrailer);
    setPlayerSource(currentActiveMovie.trailerUrl, false, '▶ Treýler');
  });
}

// Doly Film düwmesine basylanda
if (btnModeMovie) {
  btnModeMovie.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!currentActiveMovie) return;
    setActiveModeTab(btnModeMovie);
    if (currentActiveMovie.fullMovieUrl) {
      setPlayerSource(currentActiveMovie.fullMovieUrl, false, '🍿 Doly Film');
      showToast(`"${currentActiveMovie.title}" filmi açyldy!`, 'success');
    } else {
      showToast('Doly film çeşmesi tapylmady. Kompýuteriňizden faýl saýlap bilersiňiz.', 'info');
    }
  });
}

// Kompýuterden ýerli faýl saýlamak
if (btnModeLocal && localVideoInput) {
  btnModeLocal.addEventListener('click', (e) => {
    e.stopPropagation();
    localVideoInput.click();
  });

  localVideoInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }

    currentBlobUrl = URL.createObjectURL(file);
    setActiveModeTab(btnModeLocal);
    setPlayerSource(currentBlobUrl, true, `📁 ${file.name}`);
    showToast(`"${file.name}" filmi üstünlikli ýüklendi we oýnadylýar!`, 'success');
  });
}

// Kartlara basylanda açylyş (Event Delegation)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.movie-card');
  if (card) {
    openMoviePlayer(card);
  }
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (videoModal) {
  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) {
      closeModal();
    }
  });
}

function closeModal() {
  if (videoModal) {
    videoModal.classList.remove('active');
    videoModal.style.display = 'none';
  }
  if (trailerVideo) {
    trailerVideo.src = '';
  }
  if (directVideo) {
    directVideo.pause();
    directVideo.src = '';
    directVideo.classList.remove('active');
  }
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }
  document.body.style.overflow = '';
}

// ==========================================
// 6. ARAMA VE SIDEBAR KATEGORİYA FİLTRELEME İŞLEVİ
// ==========================================

const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-link');
const currentCategoryTitle = document.getElementById('current-category-title');
const moviesCountBadge = document.getElementById('movies-count-badge');
const resetFilterBtn = document.getElementById('reset-filter-btn');

let currentActiveCategory = 'all';

function updateCategoryUI(title, count, isFiltered) {
  if (currentCategoryTitle) {
    currentCategoryTitle.textContent = title;
  }
  if (moviesCountBadge) {
    moviesCountBadge.textContent = `${count} film`;
  }
  if (resetFilterBtn) {
    resetFilterBtn.style.display = isFiltered ? 'inline-flex' : 'none';
  }
}

function applyCategoryFilter(filterType, title = 'Ähli Filmler') {
  currentActiveCategory = filterType;
  let visibleCount = 0;

  if (searchInput) searchInput.value = '';

  // Update active sidebar link
  sidebarNavLinks.forEach((link) => {
    if (link.getAttribute('data-filter') === filterType) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.movie-card');

  cards.forEach((card) => {
    const genre = (card.getAttribute('data-genre') || '').toLowerCase();
    const ratingStr = (card.getAttribute('data-rating') || '').replace('★', '').trim();
    const ratingNum = parseFloat(ratingStr) || 0;

    let isMatch = false;

    if (filterType === 'all') {
      isMatch = true;
    } else if (filterType === 'popular') {
      // Rating 8.9+ or 10M
      isMatch = ratingNum >= 8.9 || ratingStr.includes('10M');
    } else if (filterType === 'top-rated') {
      // 9.0+ or 10M
      isMatch = ratingNum >= 9.0 || ratingStr.includes('10M');
    } else if (filterType === 'action') {
      isMatch = genre.includes('aksiyon') || genre.includes('action') || genre.includes('ýaryş');
    } else if (filterType === 'scifi') {
      isMatch = genre.includes('bilim') || genre.includes('fantastika') || genre.includes('sci-fi');
    } else if (filterType === 'drama') {
      isMatch = genre.includes('drama') || genre.includes('jenaýat');
    } else if (filterType === 'comedy') {
      isMatch = genre.includes('komediýa') || genre.includes('komediya') || genre.includes('comedy') || genre.includes('maşgala');
    }

    if (isMatch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  updateCategoryUI(title, visibleCount, filterType !== 'all');
  closeSidebar();

  showToast(`${title} (${visibleCount} film görkezilýär)`, 'info');
}

// Sidebar linklerine basylanda
sidebarNavLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.getAttribute('data-filter') || 'all';
    const linkTitle = link.textContent.trim();
    applyCategoryFilter(filter, linkTitle);
  });
});

// Ählisini görkez (Reset) düwmesi
if (resetFilterBtn) {
  resetFilterBtn.addEventListener('click', () => {
    applyCategoryFilter('all', 'Ähli Filmler');
  });
}

// Gözleg (Search) filtri
function filterMovies() {
  if (!searchInput) return;
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  const cards = document.querySelectorAll('.movie-card');

  cards.forEach((card) => {
    const titleElement = card.querySelector('.movie-info h3');
    const genre = (card.getAttribute('data-genre') || '').toLowerCase();
    const movieTitle = titleElement ? titleElement.textContent.toLowerCase() : '';

    if (!searchTerm || movieTitle.includes(searchTerm) || genre.includes(searchTerm)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (searchTerm) {
    updateCategoryUI(`Gözleg: "${searchTerm}"`, visibleCount, true);
  } else {
    updateCategoryUI('Ähli Filmler', visibleCount, false);
  }
}

if (searchInput) {
  searchInput.addEventListener('input', filterMovies);
}

if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filterMovies();
  });
}

// ==========================================
// 7. TEMA (DARK / LIGHT MODE) DOLANDYRYŞY
// ==========================================

function getStoredTheme() {
  try {
    const savedTheme = localStorage.getItem('beletfilm_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch (e) {}
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

function applyTheme(theme, showNotification = false) {
  const isLight = theme === 'light';

  if (isLight) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.add('light-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.remove('light-theme');
  }

  // Header Theme Button a11y & title
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute(
      'title',
      isLight ? 'Gijeki tema geç (Dark mode)' : 'Gündizki tema geç (Light mode)'
    );
    themeToggleBtn.setAttribute(
      'aria-label',
      isLight ? 'Gijeki tema geç' : 'Gündizki tema geç'
    );
  }

  // Sidebar Theme Switch UI
  if (sidebarThemeIcon) {
    sidebarThemeIcon.textContent = isLight ? '☀️' : '🌙';
  }
  if (sidebarThemeText) {
    sidebarThemeText.textContent = isLight ? 'Gündizki tema' : 'Gijeki tema';
  }

  // LocalStorage saklamak
  try {
    localStorage.setItem('beletfilm_theme', theme);
  } catch (e) {}

  // Habarnama (Toast)
  if (showNotification) {
    showToast(
      isLight ? 'Gündizki tema işjeňleşdirildi ☀️' : 'Gijeki tema işjeňleşdirildi 🌙',
      'info'
    );
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || getStoredTheme();
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme, true);
}

// Header butony arkaly çalyşmak
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Sidebar sazlamasy arkaly çalyşmak
if (sidebarThemeToggle) {
  sidebarThemeToggle.addEventListener('click', toggleTheme);
  sidebarThemeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

// Beýleki açyk goşmaça sahypalar / penjireler bilen sazlaşyk (Storage Event)
window.addEventListener('storage', (e) => {
  if (e.key === 'beletfilm_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
    applyTheme(e.newValue, false);
  }
});

// Enjamyň sistema temasyny üýtgedende awtomatik sazlanyş (eger el bilen saklanmadyk bolsa)
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('beletfilm_theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });
}

// ==========================================
// 8. SAYFA YÜKLENDİĞİNDE BAŞLAT
// ==========================================
// Sahypa açylanda reňki derrew ulanmak
applyTheme(getStoredTheme(), false);

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getStoredTheme(), false);
  updateAuthUI();


});

