/**
 * Ứng dụng chính: Điều phối nạp dữ liệu sách, khởi tạo giao diện và xử lý tương tác toàn diện
 */

document.addEventListener("DOMContentLoaded", () => {
  renderBookPages();
  setupAtmosphere();
  setupUserControls();

  // Khởi tạo các bộ điều khiển sau khi DOM sách hoàn tất
  window.bookController = new BookController();
  window.oracleController = new OracleController();

  // Khôi phục trang đọc dở nếu có
  const savedPage = localStorage.getItem("god_of_decisions_last_page");
  if (savedPage && parseInt(savedPage, 10) > 0) {
    setTimeout(() => {
      window.bookController.flipTo(parseInt(savedPage, 10));
    }, 600);
  }
});

/**
 * Tạo danh sách các trang sách từ dữ liệu BOOK_DATA
 */
function renderBookPages() {
  const bookContainer = document.getElementById("book");
  if (!bookContainer || !window.BOOK_DATA) return;

  const data = window.BOOK_DATA;
  let html = "";
  let pageCounter = 1;

  // 1. TRANG BÌA TRƯỚC (HARDCOVER)
  html += `
    <div class="page page-cover page-cover-top" data-density="hard">
      <div class="cover-gold-border"></div>
      <div class="corner-ornament tl"></div>
      <div class="corner-ornament tr"></div>
      <div class="corner-ornament bl"></div>
      <div class="corner-ornament br"></div>

      <div class="cover-emblem">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" stroke="#8ec5fc" stroke-width="2" fill="none" opacity="0.6"/>
          <circle cx="50" cy="50" r="41" stroke="#8ec5fc" stroke-width="1" stroke-dasharray="2,3" fill="none"/>
          <polygon points="50,8 57,43 92,50 57,57 50,92 43,57 8,50 43,43" fill="#8ec5fc"/>
          <polygon points="50,22 54,46 78,50 54,54 50,78 46,54 22,50 46,46" fill="#e3f2fd" opacity="0.9"/>
          <circle cx="50" cy="50" r="6" fill="#1976d2" stroke="#8ec5fc" stroke-width="1.5"/>
        </svg>
      </div>

      <h1 class="cover-title">${data.title}</h1>
      <p class="cover-subtitle">${data.subtitle}</p>
      <div class="cover-author">✦ ${data.author} ✦</div>
    </div>
  `;

  // 2. BÌA LÓT TRONG (INSIDE FRONT COVER)
  html += `
    <div class="page page--left" data-page-index="${pageCounter++}">
      <div class="page-inner">
        <div class="page-header">
          <span>Khế Ước Định Mệnh</span>
          <span>Ex Libris</span>
        </div>
        <div class="page-body" style="align-items: center; justify-content: center; text-align: center;">
          <div style="font-size: 2.2rem; color: #78201a; margin-bottom: 1rem;">✦ ❂ ✦</div>
          <h3 style="font-family: var(--font-serif-title); font-size: 1.2rem; letter-spacing: 2px; color: #78201a; margin-bottom: 1.2rem;">LỜI THỀ CỦA NGƯỜI TÌM KIẾM</h3>
          <p class="page-paragraph" style="text-align: center; font-style: italic; max-width: 90%;">
            "${data.epigraph}"
          </p>
          <div style="margin-top: 2rem; width: 60px; height: 2px; background: #c4b59b;"></div>
          <div style="margin-top: 1.5rem; font-family: var(--font-sans); font-size: 0.75rem; letter-spacing: 2px; color: var(--ink-muted);">
            DÀNH CHO NGƯỜI ĐANG ĐỨNG GIỮA NHỮNG NGÃ RẼ
          </div>
        </div>
        <div class="page-footer">✦</div>
      </div>
    </div>
  `;

  // 3. TRANG TỰA ĐẦU (TITLE PAGE)
  html += `
    <div class="page page--right" data-page-index="${pageCounter++}">
      <div class="page-inner">
        <div class="page-header">
          <span>${data.title}</span>
          <span>${data.edition}</span>
        </div>
        <div class="page-body" style="text-align: center; justify-content: center;">
          <h2 style="font-family: var(--font-serif-title); font-size: 1.8rem; color: var(--ink-accent); margin-bottom: 0.5rem; letter-spacing: 2px;">
            ${data.title.toUpperCase()}
          </h2>
          <p style="font-style: italic; color: var(--ink-muted); margin-bottom: 2rem;">${data.subtitle}</p>
          <div style="font-size: 1.1rem; line-height: 1.8; color: var(--ink-dark); margin: 0 auto; max-width: 90%;">
            "Không có cánh buồm nào xuôi gió nếu người cầm lái không biết mình muốn đi về đâu."
          </div>
        </div>
        <div class="page-footer">i</div>
      </div>
    </div>
  `;

  // 4. MỤC LỤC TƯƠNG TÁC (TABLE OF CONTENTS)
  html += `
    <div class="page page--left" data-page-index="${pageCounter++}">
      <div class="page-inner">
        <div class="page-header">
          <span>Mục Lục</span>
          <span>Tập Khảo Luận</span>
        </div>
        <div class="page-body">
          <h3 class="chapter-title" style="text-align: center; margin-bottom: 1.2rem;">MỤC LỤC TỔNG QUAN</h3>
          <ul class="toc-list" id="toc-list">
            <li class="toc-item" onclick="window.bookController.flipTo(4)">
              <span class="toc-title">Lời Ngỏ: Trước Khi Bạn Quyết Định</span>
              <span class="toc-page">Trang 04</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(5)">
              <span class="toc-title">Chương I: Tiếng Thì Thầm Trực Giác</span>
              <span class="toc-page">Trang 05</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(6)">
              <span class="toc-title">Chương II: Nghệ Thuật Của Sự Chờ Đợi</span>
              <span class="toc-page">Trang 06</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(7)">
              <span class="toc-title">Chương III: Dũng Khí Bước Qua Vạch Kẻ</span>
              <span class="toc-page">Trang 07</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(8)">
              <span class="toc-title">✦ CÁC TRANG THÔNG ĐIỆP NGẪU NHIÊN ✦</span>
              <span class="toc-page">Trang 08+</span>
            </li>
          </ul>
        </div>
        <div class="page-footer">ii</div>
      </div>
    </div>
  `;

  // 5. CÁC CHƯƠNG LÝ THUYẾT & CHIÊM NGHIỆM
  data.chapters.forEach((ch, idx) => {
    const isLeft = pageCounter % 2 !== 0;
    const pageClass = isLeft ? "page--left" : "page--right";

    html += `
      <div class="page ${pageClass}" data-page-index="${pageCounter}">
        <div class="page-inner">
          <div class="page-header">
            <span>${ch.title.split(":")[0]}</span>
            <span>Vị Thần Của Những Quyết Định</span>
          </div>
          <div class="page-body">
            <h3 class="chapter-title">${ch.title}</h3>
            <p class="chapter-subtitle">${ch.subtitle}</p>
            ${ch.content.map((p, pIdx) => {
              if (pIdx === 0) {
                const firstChar = p.charAt(0);
                const rest = p.slice(1);
                return `<p class="page-paragraph"><span class="drop-cap">${firstChar}</span>${rest}</p>`;
              }
              return `<p class="page-paragraph">${p}</p>`;
            }).join("")}
          </div>
          <div class="page-footer">${pageCounter++}</div>
        </div>
      </div>
    `;
  });

  // 6. NGÂN HÀNG CÁC TRANG SẤM TRUYỀN QUYẾT ĐỊNH (ORACLE DECISIONS)
  data.oracleDecisions.forEach((dec) => {
    const isLeft = pageCounter % 2 !== 0;
    const pageClass = isLeft ? "page--left" : "page--right";

    html += `
      <div class="page page-oracle ${pageClass}" data-page-index="${pageCounter}" data-decision-code="${dec.code}">
        <div class="page-inner">
          <div class="page-header">
            <span>Thông Điệp Ngẫu Nhiên #${dec.code.replace("DECISION-", "")}</span>
            <span>Vị Thần Của Những Quyết Định</span>
          </div>
          <div class="page-body">
            <div class="oracle-page-content">
              <div class="oracle-rune-symbol">${dec.rune}</div>
              <div class="oracle-verdict">${dec.verdict}</div>
              <div class="oracle-summary">"${dec.summary}"</div>
              <div class="oracle-reflection">${dec.reflection}</div>
              <div class="oracle-action-box">
                <strong>Chỉ Dẫn Hành Động</strong>
                ${dec.actionPrompt}
              </div>
              <button class="oracle-page-btn" onclick="window.oracleController.openQuoteModal('${dec.code}')">
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
                Lưu Thẻ Trích Dẫn
              </button>
            </div>
          </div>
          <div class="page-footer">${pageCounter++}</div>
        </div>
      </div>
    `;
  });

  // 7. TRANG LỜI KẾT (EPILOGUE)
  const isLeftEpilogue = pageCounter % 2 !== 0;
  html += `
    <div class="page ${isLeftEpilogue ? "page--left" : "page--right"}" data-page-index="${pageCounter}">
      <div class="page-inner">
        <div class="page-header">
          <span>Hồi Kết</span>
          <span>Khép Lại Cuốn Sách</span>
        </div>
        <div class="page-body" style="justify-content: center; text-align: center;">
          <div style="font-size: 2rem; color: #78201a; margin-bottom: 1.2rem;">✦ ❂ ✦</div>
          <h3 class="chapter-title" style="margin-bottom: 1.5rem;">KHI BẠN KHÉP SÁCH LẠI</h3>
          <p class="page-paragraph" style="text-align: center; font-style: italic;">
            "Dù câu trả lời của Vị Thần hôm nay là gì, hãy luôn nhớ rằng: Quyền năng tối thượng của một con người chính là quyền năng lựa chọn thái độ sống."
          </p>
          <p class="page-paragraph" style="text-align: center; margin-top: 1rem;">
            Chúc bạn luôn kiên định, thanh thản và vững bước trên con đường của chính mình.
          </p>
        </div>
        <div class="page-footer">${pageCounter++}</div>
      </div>
    </div>
  `;

  // 8. BÌA SAU (HARDCOVER BACK)
  html += `
    <div class="page page-cover page-cover-bottom" data-density="hard">
      <div class="cover-gold-border"></div>
      <div class="corner-ornament tl"></div>
      <div class="corner-ornament tr"></div>
      <div class="corner-ornament bl"></div>
      <div class="corner-ornament br"></div>

      <svg class="back-seal" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#8ec5fc" stroke-width="2" fill="none"/>
        <circle cx="50" cy="50" r="38" stroke="#8ec5fc" stroke-width="1" stroke-dasharray="3,3" fill="none"/>
        <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" stroke="#8ec5fc" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="8" fill="#8ec5fc"/>
      </svg>

      <p class="back-quote">
        "Cuốn sách chỉ là chiếc chìa khóa. Ngôi đền của sự khôn ngoan vốn dĩ luôn ngự trị bên trong bạn."
      </p>

      <div class="cover-author">✦ THE GOD OF DECISIONS ✦</div>
    </div>
  `;

  bookContainer.innerHTML = html;
}

/**
 * Hiệu ứng ánh nến lung linh & hạt bụi ma thuật
 */
function setupAtmosphere() {
  const particlesContainer = document.getElementById("magic-particles");
  if (particlesContainer) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}vw`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${6 + Math.random() * 6}s`;
      particlesContainer.appendChild(p);
    }
  }

  // Chuyển động ánh nến theo vị trí chuột (Parallax nhẹ)
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 60;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    document.documentElement.style.setProperty("--candle-flicker-x", `${x}px`);
    document.documentElement.style.setProperty("--candle-flicker-y", `${y}px`);
  });
}

/**
 * Thiết lập các nút bấm điều khiển & phím tắt bàn phím
 */
function setupUserControls() {
  // Nút lật trang trước/sau
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (window.bookController) window.bookController.flipPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (window.bookController) window.bookController.flipNext();
    });
  }

  // Nút Thông Điệp Ngẫu Nhiên trên thanh Header
  const oracleTriggerBtn = document.getElementById("btn-trigger-oracle");
  if (oracleTriggerBtn) {
    oracleTriggerBtn.addEventListener("click", () => {
      if (window.oracleController) window.oracleController.openOracleModal();
    });
  }

  // Nút Lật Nhanh Thông Điệp Ngẫu Nhiên trên thanh Dock dưới
  const randomQuickBtn = document.getElementById("random-quick-btn");
  if (randomQuickBtn) {
    randomQuickBtn.addEventListener("click", () => {
      if (window.oracleController) window.oracleController.triggerRandomDirectly();
    });
  }



  // Chế độ toàn màn hình (Fullscreen)
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.warn(err));
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });
  }

  // Đánh dấu trang (Bookmark)
  const bookmarkBtn = document.getElementById("bookmark-btn");
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", () => {
      if (!window.bookController) return;
      const current = window.bookController.getCurrentPage();
      localStorage.setItem("god_of_decisions_bookmark", current);
      if (window.oracleController) {
        window.oracleController.showToast(`✦ Đã kẹp dải ruy-băng tại trang ${current}!`);
      }
    });
  }

  // Phím tắt bàn phím
  document.addEventListener("keydown", (e) => {
    // Nếu modal đang mở thì chỉ xử lý phím Escape để đóng
    if (document.querySelector(".oracle-modal.active") || document.querySelector(".quote-modal.active")) {
      if (e.key === "Escape") {
        if (window.oracleController) {
          window.oracleController.closeOracleModal();
          window.oracleController.closeQuoteModal();
        }
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      if (window.bookController) window.bookController.flipPrev();
    } else if (e.key === "ArrowRight") {
      if (window.bookController) window.bookController.flipNext();
    } else if (e.key === " ") {
      // Nhấn Space mở nhanh thỉnh cầu
      e.preventDefault();
      if (window.oracleController) window.oracleController.openOracleModal();
    }
  });
}
