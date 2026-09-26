<!DOCTYPE html>
<html lang="tr">

<head>
  <!-- Sayfa karakter kodlaması -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Film Uygulaması</title>

  <!-- CSS Dosyası Bağlantısı -->
  <link rel="stylesheet" href="style.css">
  <script src="scripts.js" defer></script>
</head>

<body>

  <!-- Ekranı Karartan Arka Plan -->
  <div id="overlay" class="overlay"></div>


  <!-- Üst Başlık (Header) -->
  <header>
    <div class="header-left">
      <!-- Hamburger Menü Butonu -->
      <button id="open-sidebar-btn" class="hamburger-btn" aria-label="Menü Aç">&#9776;</button>
      <h1>BBFilms</h1>
    </div>
    <div class="header-right">
      <form id="search-form">
        <input type="text" id="search-input" placeholder="Film ara..." autocomplete="off">
      </form>
      <!-- Dark / Light Mode Toggle Button -->
      <button id="theme-toggle-btn" class="theme-toggle-btn" title="Tema üýtget (Gije / Gündiz)"
        aria-label="Gije ýa-da Gündiz temasyny üýtget">
        <span class="theme-icon sun-icon">☀️</span>
        <span class="theme-icon moon-icon">🌙</span>
      </button>
      <div id="auth-header-container">
        <button id="open-auth-btn" class="auth-btn">
          <span class="auth-icon">👤</span>
          <span class="auth-btn-text">Giriş</span>
        </button>
      </div>
    </div>
  </header>

  <!-- YAN MENÜ (Sidebar) -->
  <aside id="sidebar" class="sidebar">
    <div class="sidebar-header">
      <h2>Menü</h2>
      <button id="close-sidebar-btn" class="close-btn">&times;</button>
    </div>
    <div class="sidebar-user-box" id="sidebar-user-box">
      <!-- Dynamically filled with user info or login prompt -->
    </div>
    <ul class="sidebar-links">
      <li><a href="#" class="sidebar-nav-link active" data-filter="all">🏠 BAŞ SAHYPA</a></li>
      <li><a href="#" class="sidebar-nav-link" data-filter="popular">🔥 MEŞHUR Filmler</a></li>
      <li><a href="#" class="sidebar-nav-link" data-filter="top-rated">⭐ KÖP GÖRÜLENLER</a></li>
      <li class="dropdown-title">Kategoriyalar</li>
      <li><a href="#" class="sidebar-nav-link" data-filter="action">🎬 Aksiyon filmler</a></li>
      <li><a href="#" class="sidebar-nav-link" data-filter="scifi">🚀 Bilim baradaky filmler</a></li>
      <li><a href="#" class="sidebar-nav-link" data-filter="drama">🎭 Drama filmler</a></li>
      <li><a href="#" class="sidebar-nav-link" data-filter="comedy">😂 Komediýa filmler</a></li>
      <li class="dropdown-title">Sazlamalar</li>
      <li class="sidebar-theme-item">
        <div class="sidebar-theme-toggle" id="sidebar-theme-toggle" role="button" tabindex="0">
          <div class="sidebar-theme-info">
            <span class="sidebar-theme-icon" id="sidebar-theme-icon">🌙</span>
            <span class="sidebar-theme-text" id="sidebar-theme-text">Gijeki tema</span>
          </div>
          <div class="toggle-switch" id="sidebar-theme-switch">
            <span class="switch-handle"></span>
          </div>
        </div>
      </li>
    </ul>
  </aside>

  <!-- Giriş / Hasap Döret Modal (Auth Modal) -->
  <div id="auth-modal" class="auth-modal-overlay">
    <div class="auth-modal-card">
      <button id="close-auth-btn" class="modal-close-btn">&times;</button>

      <div class="auth-modal-header">
        <div class="auth-logo-badge">🎬 BeletFilm</div>
        <h2 id="auth-modal-title">Hoş geldiňiz!</h2>
        <p id="auth-modal-subtitle">Filmleri görmek üçin hasabyňyza giriň</p>
      </div>

      <!-- Tab Buttons -->
      <div class="auth-tabs">
        <button class="auth-tab-btn active" data-tab="login">Giriş</button>
        <button class="auth-tab-btn" data-tab="register">Hasap döret</button>
      </div>

      <!-- Giriş Formasy (Login) -->
      <form id="login-form" class="auth-form active">
        <div class="form-group">
          <label for="login-email">Email ýa-da Ulanyjy ady</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input type="text" id="login-email" placeholder="mysal@domain.com" required autocomplete="username">
          </div>
        </div>

        <div class="form-group">
          <label for="login-password">Açar sözi</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password">
            <button type="button" class="toggle-password" tabindex="-1">👁️</button>
          </div>
        </div>

        <div class="form-extras">
          <label class="remember-me">
            <input type="checkbox" id="remember-me">
            <span>Meni ýatda sakla</span>
          </label>
          <a href="#" class="forgot-link" id="forgot-password-link">Açar sözüni unutdyňyzmy?</a>
        </div>

        <button type="submit" class="auth-submit-btn">
          <span>Giriş et</span>
          <span class="btn-arrow">→</span>
        </button>
      </form>

      <!-- Hasap Döret Formasy (Register) -->
      <form id="register-form" class="auth-form">
        <div class="form-group">
          <label for="register-name">Doly adyňyz</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input type="text" id="register-name" placeholder="Aman Amanow" required autocomplete="name">
          </div>
        </div>

        <div class="form-group">
          <label for="register-email">Email salgysy</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input type="email" id="register-email" placeholder="mysal@domain.com" required autocomplete="email">
          </div>
        </div>

        <div class="form-group">
          <label for="register-password">Açar sözi (iň az 6 belgi)</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input type="password" id="register-password" placeholder="••••••••" minlength="6" required
              autocomplete="new-password">
            <button type="button" class="toggle-password" tabindex="-1">👁️</button>
          </div>
        </div>

        <div class="form-group">
          <label for="register-confirm-password">Açar sözüni gaýtalaň</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input type="password" id="register-confirm-password" placeholder="••••••••" minlength="6" required
              autocomplete="new-password">
          </div>
        </div>

        <button type="submit" class="auth-submit-btn">
          <span>Hasap döret</span>
          <span class="btn-arrow">→</span>
        </button>
      </form>
    </div>
  </div>

  <!-- Video / Film Tomaşa Etmek Modaly (Video Modal) -->
  <div id="video-modal" class="video-modal-overlay">
    <div class="video-modal-card">
      <button id="close-modal" class="modal-close-btn" aria-label="Ýap">&times;</button>

      <div class="video-modal-header">
        <div class="video-header-top">
          <div class="video-badge">🎬 BBFilms Cinema Player</div>
          <div class="video-mode-tabs">
            <button id="btn-mode-trailer" class="video-tab-btn active" title="Gysgaça treýler">▶ Treýler</button>
            <button id="btn-mode-movie" class="video-tab-btn" title="Doly film görnüşi">🍿 Doly Film</button>
            <button id="btn-mode-local" class="video-tab-btn local-tab-btn"
              title="Kompýuteriňizden islän film faýlyňyzy saýlap goşuň">📁 Faýldan aç</button>
            <input type="file" id="local-video-input" accept="video/mp4,video/webm,video/mkv,video/avi,video/*"
              style="display:none;">
          </div>
        </div>
        <h2 id="video-modal-title">Film Tomaşasy</h2>
      </div>

      <div class="video-player-wrapper">
        <iframe id="trailer-video" src="" title="Film Player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
        <video id="direct-video" controls playsinline></video>
      </div>

      <div class="video-modal-details">
        <div class="video-meta-tags">
          <span id="video-rating-tag" class="rating-badge">★ 8.8</span>
          <span id="video-year-tag" class="meta-pill">2010</span>
          <span id="video-genre-tag" class="meta-pill">Aksiyon, Fantastika</span>
          <span class="meta-pill quality-pill">4K Ultra HD</span>
          <span id="video-source-badge" class="meta-pill source-pill">▶ Treýler</span>
        </div>
        <p id="video-modal-desc" class="video-description">Film barada maglumat...</p>

        <div class="player-helper-box">
          <span class="helper-icon">💡</span>
          <div class="helper-text">
            <strong>Maslahat:</strong> Hakyky doly filmi görmek üçin ýokardaky <strong>"🍿 Doly Film"</strong> düwmesine
            basyň ýa-da <strong>"📁 Faýldan aç"</strong> arkaly kompýuteriňizdäki islän film faýlyňyzy (.mp4, .mkv,
            .avi) saýlap derrew tomaşa ediň!
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification Box -->
  <div id="toast-container" class="toast-container"></div>

  <!-- Bölüm Başlygy we Filtr Maglumaty -->
  <div class="section-header-bar">
    <div class="section-title-wrap">
      <h2 id="current-category-title">Ähli Filmler</h2>
      <span id="movies-count-badge" class="count-badge">6 film</span>
    </div>
    <button id="reset-filter-btn" class="reset-filter-btn" style="display: none;">✕ Ählisini görkez</button>
  </div>

  <!-- Ana İçerik: Film Kartları -->
  <main id="movies-container">

    <!-- 1. Film Kartı -->
    <div class="movie-card" data-title="Inception" data-year="2010" data-rating="★ 8.8"
      data-genre="Aksiyon, Bilim-Fantastika, Triller"
      data-desc="Dom Cobb — adamlaryň düýş wagtynda olaryň aňyndaky iň gymmatly syrlary ogurlap bilýän ussat ogry. Oňa täze we iň howply tabşyryk berilýär."
      data-trailer="https://www.youtube.com/embed/YoHD9XEInc0?autoplay=1&rel=0"
      data-full-movie="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4">
      <div class="poster-container">
        <img src="films/inspection.jpg.jpg" alt="Inception">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Inception</h3>
        <span class="rating">★ 8.8</span>
      </div>
    </div>

    <!-- 2. Film Kartı -->
    <div class="movie-card" data-title="The Godfather" data-year="1972" data-rating="★ 9.2" data-genre="Drama, Jenaýat"
      data-desc="Nýu-Ýorkdaky kuwwatly Korleone mafiýa maşgalasynyň taryhy we Don Witonyň ogly Maýklyň maşgala häkimiýetini ele alşy."
      data-trailer="https://www.youtube.com/embed/sY1S34973zA?autoplay=1&rel=0"
      data-full-movie="https://archive.org/embed/TheGodfather1972FullMovie">
      <div class="poster-container">
        <img src="films/godfather.jpg.jpg" alt="The Godfather">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Godfather</h3>
        <span class="rating">★ 9.2</span>
      </div>
    </div>

    <!-- 3. Film Kartı -->
    <div class="movie-card" data-title="The Dark Knight" data-year="2008" data-rating="★ 9.0"
      data-genre="Aksiyon, Jenaýat, Drama"
      data-desc="Betmen Gotem şäherini howp astyna goýýan Joker atly rehimsiz we dildüwşükli jenaýatçy bilen ölüm-ýitim göreşine girişýär."
      data-trailer="https://www.youtube.com/embed/EXeTwQWrcwY?autoplay=1&rel=0"
      data-full-movie="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4">
      <div class="poster-container">
        <img src="films/dark night.jpg.jpg" alt="The Dark Knight">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Dark Knight</h3>
        <span class="rating">★ 9.0</span>
      </div>
    </div>

    <!-- 4. Film Kartı -->
    <div class="movie-card" data-title="Interstellar" data-year="2014" data-rating="★ 8.7"
      data-genre="Bilim-Fantastika, Başdan geçirme, Drama"
      data-desc="Ýer şarynda ýaşaýyş howp astynda galanda, adamzadyň geljegi üçin täze planeta tapmak maksady bilen älem giňişligine syýahat başlanýar."
      data-trailer="https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&rel=0"
      data-full-movie="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4">
      <div class="poster-container">
        <img src="films/intersteller.jpg.jpg" alt="Interstellar">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Interstellar</h3>
        <span class="rating">★ 8.7</span>
      </div>
    </div>

    <!-- 5. Film Kartı -->
    <div class="movie-card" data-title="Fast and Furious" data-year="2023" data-rating="★ 8.9"
      data-genre="Aksiyon, Triller, Ýaryş"
      data-desc="Dom Toretto we onuň maşgalasy iň güýçli duşmanlaryna garşy ýokary tizlikde täze we howply göreşe başlaýarlar."
      data-trailer="https://www.youtube.com/embed/eoOaKn4T1Zo?autoplay=1&rel=0"
      data-full-movie="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4">
      <div class="poster-container">
        <img src="films/fast.jpp.jpg" alt="Fast and Furious">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Fast and Furious</h3>
        <div>
          <span class="rating">★ 8.9</span>
        </div>
      </div>
    </div>

    <!-- 6. Film Kartı -->
    <div class="movie-card" data-title="Home alone" data-year="1990" data-rating="★ 10M" data-genre="Komediýa, Maşgala"
      data-desc="Maşgalasy dynç alyşa gidende öýde ýalňyz galan 8 ýaşly Kewin, öýi iki sany ogrydan goramak üçin gülkili duzaklary gurnaýar."
      data-trailer="https://www.youtube.com/embed/jEDaVHmw88I?autoplay=1&rel=0"
      data-full-movie="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
      <div class="poster-container">
        <img src="films/home.jpg" alt="Home alone">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Home alone</h3>
        <span class="rating">★ 10M</span>
      </div>
    </div>
    <!-- 7. Film Kartı -->
    <div class="movie-card" data-title="The Matrix" data-year="1999" data-rating="★ 8.7"
      data-genre="Aksiyon, Bilim-Fantastika"
      data-desc="Bir programmist Neo, hakyky dünýä reýalliginiň kompýuter programmasy bolup çykyş edýänini öwrenýär."
      data-trailer="https://www.youtube.com/watch?v=m8e-FF8MsqQ" data-full-movie="">
      <div class="poster-container">
        <img src="films/matrix.webp" alt="The Matrix">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Matrix</h3>
        <span class="rating">★ 8.7</span>
      </div>
    </div>

    <!-- 8. Film Kartı -->
    <div class="movie-card" data-title="The Lion King" data-year="1994" data-rating="★ 8.5"
      data-genre="Karfuz, Drama, Musikal"
      data-desc="Ýaş şir Simba, kakasynyň ölüminden soň howlusyny yzyna almaga synanyşýar."
      data-trailer="https://www.youtube.com/watch?v=4sQrSKCH5BM" data-full-movie="">
      <div class="poster-container">
        <img src="films/thelion.jpg.jpg" alt="The Lion King">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Lion King</h3>
        <span class="rating">★ 8.5</span>
      </div>
    </div>

    <!-- 9. Film Kartı -->
    <div class="movie-card" data-title="Titanic" data-year="1997" data-rating="★ 7.8" data-genre="Romantika, Drama"
      data-desc="1912-nji ýylda barmasyz gämide ýaş romantiki gatnaşyk. Akyldar gözellik we ýykylyp barýan şan-şöhratyň hekaýasy."
      data-trailer="https://www.youtube.com/watch?v=2eKyTV2zfNg" data-full-movie="">
      <div class="poster-container">
        <img src="films/titanic.jpg" alt="Titanic">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Titanic</h3>
        <span class="rating">★ 7.8</span>
      </div>
    </div>

    <!-- 10. Film Kartı -->
    <div class="movie-card" data-title="Fast Five" data-year="2011" data-rating="★ 7.3"
      data-genre="Aksiyon, Jinoýat, Thriller"
      data-desc="Dom we onuň topary Rio-de-Janeyroda ýaşap ýörkä, täze howply duşman bilen ýüzbe-ýüz bolýarlar."
      data-trailer="https://www.youtube.com/watch?v=2g811Eo7K8U" data-full-movie="">
      <div class="poster-container">
        <img src="films/five.jpg" alt="Fast Five">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Fast Five</h3>
        <span class="rating">★ 7.3</span>
      </div>
    </div>

    <!-- 11. Film Kartı -->
    <div class="movie-card" data-title="The Lord of the Rings: The Return of the King" data-year="2003"
      data-rating="★ 9.0" data-genre="Fantastika, Başdan geçirme, Drama"
      data-desc="Frodo we Saň ýolbaşçylygynda Adamzadyň soňky umydy, Sauronyň güýjüni ýok etmek üçin Orta Ýerde ýöriş edýärler."
      data-trailer="https://www.youtube.com/watch?v=r5XJj37g9jo" data-full-movie="">
      <div class="poster-container">
        <img src="films/lotr.jpg" alt="The Lord of the Rings: The Return of the King">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Lord of the Rings: The Return of the King</h3>
        <span class="rating">★ 9.0</span>
      </div>
    </div>

    <!-- 12. Film Kartı -->
    <div class="movie-card" data-title="Pulp Fiction" data-year="1994" data-rating="★ 8.9"
      data-genre="Jinoýat, Drama, Komediýa"
      data-desc="Los-Angelesdäki jinoýat dünýäsiniň iki ganhor, bir ýaňsa we bir ýeňil ýeňil aýallar barada gyzykly hekaýalary."
      data-trailer="https://www.youtube.com/watch?v=tGpAvIqy5pg" data-full-movie="">
      <div class="poster-container">
        <img src="films/pulp.jpg" alt="Pulp Fiction">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Pulp Fiction</h3>
        <span class="rating">★ 8.9</span>
      </div>
    </div>
    <!-- 13. Film Kartı -->
    <div class="movie-card" data-title="The Godfather" data-year="1972" data-rating="★ 9.2" data-genre="Drama, Jinoýat"
      data-desc="Corleone maşgalasynyň güýçlenýän ähli agzalarynyň we özleriniň günäleriniň ganly hekaýasy."
      data-trailer="https://www.youtube.com/watch?v=sY1S3497ETw" data-full-movie="">
      <div class="poster-container">
        <img src="films/godfather.jpg" alt="The Godfather">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Godfather</h3>
        <span class="rating">★ 9.2</span>
      </div>
    </div>

    <!-- 14. Film Kartı -->
    <div class="movie-card" data-title="The Dark Knight" data-year="2008" data-rating="★ 9.0"
      data-genre="Aksiyon, Jinoýat"
      data-desc="Batmen ýene-de Gotham şäherini basyp alýan özüniň iň güýçli duşmanyna garşy göreşýär."
      data-trailer="https://www.youtube.com/watch?v=z7Xy6cE213g" data-full-movie="">
      <div class="poster-container">
        <img src="films/bat.jpg" alt="The Dark Knight">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Dark Knight</h3>
        <span class="rating">★ 9.0</span>
      </div>
    </div>

    <!-- 15. Film Kartı -->
    <div class="movie-card" data-title="The Green Mile" data-year="1999" data-rating="★ 8.6"
      data-genre="Drama, Fantastika" data-desc="Ölümler üçin esasy bölüminde rewolýusioner we täsin işler başlanýar."
      data-trailer="https://www.youtube.com/watch?v=0AuXRbNIP4E" data-full-movie="">
      <div class="poster-container">
        <img src="films/greenmile.jpg" alt="The Green Mile">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Green Mile</h3>
        <span class="rating">★ 8.6</span>
      </div>
    </div>

    <!-- 16. Film Kartı -->
    <div class="movie-card" data-title="The Sixth Sense" data-year="1999" data-rating="★ 8.2"
      data-genre="Drama, Mistika" data-desc="Çagalar psihology, ölüleri görýän bir oglan bilen duşuşýar."
      data-trailer="https://www.youtube.com/watch?v=VG_Lkt2lfz4" data-full-movie="">
      <div class="poster-container">
        <img src="films/sixth.jpg" alt="The Sixth Sense">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Sixth Sense</h3>
        <span class="rating">★ 8.2</span>
      </div>
    </div>

    <!-- 17. Film Kartı -->
    <div class="movie-card" data-title="Forrest Gump" data-year="1994" data-rating="★ 8.8" data-genre="Drama, Romantika"
      data-desc="Ýönekeý ýürekli Forrest Gump ýurdunyň taryhynyň täsin wakalaryny ýaşap geçýär."
      data-trailer="https://www.youtube.com/watch?v=bLv4CQAQ1Jg" data-full-movie="">
      <div class="poster-container">
        <img src="films/forrest.jpg" alt="Forrest Gump">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Forrest Gump</h3>
        <span class="rating">★ 8.8</span>
      </div>
    </div>

    <!-- 18. Film Kartı -->
    <div class="movie-card" data-title="The Departed" data-year="2006" data-rating="★ 8.5" data-genre="Drama, Jinoýat"
      data-desc="Boston polisiýasynda polisiýanyň içinde ýaşap ýörkä, mafiýada we tersine."
      data-trailer="https://www.youtube.com/watch?v=iozhdIbPvgA" data-full-movie="">
      <div class="poster-container">
        <img src="films/departed.jpg" alt="The Departed">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Departed</h3>
        <span class="rating">★ 8.5</span>
      </div>
    </div>

    <!-- 19. Film Kartı -->
    <div class="movie-card" data-title="Goodfellas" data-year="1990" data-rating="★ 8.7" data-genre="Jinoýat, Drama"
      data-desc="Ýaş ýigitleriň ýokary derejeli jinoýat dünýäsine düşmegi we ýörelgeleri."
      data-trailer="https://www.youtube.com/watch?v=qo5jJdKyYq4" data-full-movie="">
      <div class="poster-container">
        <img src="films/goodfella.jpg" alt="Goodfellas">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>Goodfellas</h3>
        <span class="rating">★ 8.7</span>
      </div>
    </div>

    <!-- 20. Film Kartı -->
    <div class="movie-card" data-title="The Prestige" data-year="2006" data-rating="★ 8.5" data-genre="Drama, Mistika"
      data-desc="Iki illusionistiň arasyndaky ýaralaryň we gizlinleriň gözleginde ýaryşy."
      data-trailer="https://www.youtube.com/watch?v=o4HYai BxaE" data-full-movie="">
      <div class="poster-container">
        <img src="films/prestige.jpg" alt="The Prestige">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="movie-info">
        <h3>The Prestige</h3>
        <span class="rating">★ 8.5</span>
      </div>
    </div>
