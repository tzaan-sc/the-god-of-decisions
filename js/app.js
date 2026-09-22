/**
 * Ứng dụng chính: Điều phối nạp dữ liệu sách, khởi tạo giao diện và xử lý tương tác toàn diện
 * Phiên bản nâng cấp: Dàn trang cặp 2 trang mở (2-Page Spreads) & Thẻ Sấm Cổ Điển
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
 * Hàm trợ giúp bọc khung viền chỉ đôi trang sách cổ
 */
function wrapPage(content, pageIndex, isLeft, headerLeft, headerRight, footerText = pageIndex) {
  const pageClass = isLeft ? "page--left" : "page--right";
  return `
    <div class="page ${pageClass}" data-page-index="${pageIndex}">
      <div class="page-inner">
        <div class="page-border-frame">
          <div class="p-corner tl"></div>
          <div class="p-corner tr"></div>
          <div class="p-corner bl"></div>
          <div class="p-corner br"></div>
        </div>
        <div class="page-header">
          <span>${headerLeft}</span>
          <span>${headerRight}</span>
        </div>
        <div class="page-body">
          ${content}
        </div>
        <div class="page-footer">
          <span>${footerText}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Hàm trợ giúp tạo thẻ Quẻ Sấm Hoàng Gia tinh gọn không scrollbar
 */
function wrapOraclePage(dec, pageIndex, isLeft) {
  const pageClass = isLeft ? "page--left" : "page--right";
  const numStr = String(dec.code.replace("DECISION-", "")).padStart(2, "0");
  const headerLeft = isLeft ? `Quẻ Số ${numStr} • Cổ Tự ${dec.rune}` : `Sách Khai Mở Trực Giác`;
  const headerRight = isLeft ? `Vị Thần Của Những Quyết Định` : `Quẻ Số ${numStr} • Cổ Tự ${dec.rune}`;

  return `
    <div class="page page-oracle ${pageClass}" data-page-index="${pageIndex}" data-decision-code="${dec.code}">
      <div class="page-inner">
        <div class="page-border-frame">
          <div class="p-corner tl"></div>
          <div class="p-corner tr"></div>
          <div class="p-corner bl"></div>
          <div class="p-corner br"></div>
        </div>
        <div class="page-header">
          <span>${headerLeft}</span>
          <span>${headerRight}</span>
        </div>
        <div class="page-body">
          <div class="oracle-page-content">
            <div class="oracle-card-frame">
              <div class="oracle-rune-medallion">
                <span class="oracle-rune-symbol">${dec.rune}</span>
              </div>
              <div class="oracle-verdict-banner">❖ ${dec.verdict} ❖</div>
              <div class="oracle-summary-quote">"${dec.summary}"</div>
              <div class="oracle-reflection-text">${dec.reflection}</div>
              <div class="oracle-action-decree">
                <strong>✦ Chỉ Dẫn Hành Động Trong 24H ✦</strong>
                ${dec.actionPrompt}
              </div>
              <button class="oracle-quote-stamp-btn" onclick="window.oracleController.openQuoteModal('${dec.code}')">
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
                Lưu Thẻ Trích Dẫn
              </button>
            </div>
          </div>
        </div>
        <div class="page-footer">
          <span>Trang ${String(pageIndex).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Tạo danh sách toàn bộ các trang sách từ dữ liệu BOOK_DATA theo cấu trúc Spreads chuẩn mực
 */
function renderBookPages() {
  const bookContainer = document.getElementById("book");
  if (!bookContainer || !window.BOOK_DATA) return;

  const data = window.BOOK_DATA;
  let html = "";
  let pageCounter = 0;

  // =========================================================================
  // 0. TRANG BÌA TRƯỚC (HARDCOVER FRONT)
  // =========================================================================
  html += `
    <div class="page page-cover page-cover-top" data-density="hard" data-page-index="${pageCounter++}">
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

  // =========================================================================
  // SPREAD 1 (TRANG 1 & 2): KHẾ ƯỚC TÂM THỨC & TRANG TỰA ĐẦU
  // =========================================================================

  // Trang 1 (Trái): Khế Ước Tâm Thức / Ex Libris
  const page1Content = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 0.5rem 1rem;">
      <div style="font-size: 2rem; color: var(--ink-accent); margin-bottom: 0.8rem; filter: drop-shadow(0 0 8px rgba(25, 118, 210, 0.3));">✦ ❂ ✦</div>
      <h3 style="font-family: var(--font-serif-title); font-size: 1.15rem; letter-spacing: 2px; color: var(--ink-accent); margin-bottom: 1.2rem; text-transform: uppercase;">
        LỜI THỀ CỦA NGƯỜI TÌM KIẾM
      </h3>
      <p class="page-paragraph" style="text-align: center; font-style: italic; max-width: 90%; line-height: 1.7; color: var(--ink-dark);">
        "${data.epigraph}"
      </p>
      <div style="margin: 1.5rem auto 1.2rem; width: 60px; height: 1.5px; background: linear-gradient(to right, transparent, var(--ink-accent), transparent);"></div>
      <div style="font-family: var(--font-sans); font-size: 0.72rem; letter-spacing: 2px; color: var(--ink-muted); text-transform: uppercase;">
        DÀNH CHO NGƯỜI ĐANG ĐỨNG GIỮA NHỮNG NGÃ RẼ
      </div>
      <div style="margin-top: 1.8rem; font-family: var(--font-serif-body); font-style: italic; font-size: 0.85rem; color: var(--ink-muted);">
        Ký tên lữ khách: . . . . . . . . . . . . . . . . . .
      </div>
    </div>
  `;
  html += wrapPage(page1Content, pageCounter++, true, "Khế Ước Định Mệnh", "Ex Libris", "✦");

  // Trang 2 (Phải): Trang Tựa Đầu (Title Page)
  const page2Content = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 0.5rem 1rem;">
      <div style="font-family: var(--font-serif-title); font-size: 0.75rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 0.8rem;">
        ẤN BẢN ĐẶC BIỆT DÀNH CHO TRỰC GIÁC
      </div>
      <h2 style="font-family: var(--font-serif-title); font-size: 1.6rem; color: var(--ink-accent); margin-bottom: 0.5rem; letter-spacing: 2px; line-height: 1.3;">
        ${data.title.toUpperCase()}
      </h2>
      <p style="font-style: italic; color: var(--ink-muted); font-size: 0.95rem; margin-bottom: 1.8rem;">${data.subtitle}</p>
      
      <div style="width: 40px; height: 1px; background: var(--ink-accent); margin-bottom: 1.5rem; opacity: 0.5;"></div>

      <div style="font-size: 0.96rem; font-style: italic; line-height: 1.7; color: var(--ink-dark); max-width: 88%;">
        "Không có cánh buồm nào xuôi gió nếu người cầm lái không biết mình muốn đi về đâu."
      </div>

      <div style="margin-top: 2.2rem; font-family: var(--font-sans); font-size: 0.68rem; letter-spacing: 2.5px; color: var(--ink-muted); text-transform: uppercase;">
        ${data.author}<br>
        <span style="opacity: 0.8;">BẢN KHẮC HUYỀN BÍ • 2026</span>
      </div>
    </div>
  `;
  html += wrapPage(page2Content, pageCounter++, false, data.title, data.edition, "i");

  // =========================================================================
  // SPREAD 2 (TRANG 3 & 4): MỤC LỤC & LỜI NGỎ
  // =========================================================================

  // Trang 3 (Trái): Mục Lục Tổng Quan
  const page3Content = `
    <div class="toc-container">
      <div>
        <h3 class="toc-heading">MỤC LỤC TỔNG QUAN</h3>
        <p class="toc-subheading">Bản đồ dẫn đường vào thế giới trực giác</p>
      </div>

      <div class="toc-sections-wrapper">
        <!-- Phần I -->
        <div>
          <div class="toc-group-title">PHẦN I: KHAI MINH TRỰC GIÁC</div>
          <ul class="toc-list">
            <li class="toc-item" onclick="window.bookController.flipTo(4)">
              <span class="toc-title">Lời Ngỏ: Trước Khi Bạn Quyết Định</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Trang 04</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(5)">
              <span class="toc-title">Chương I: Tiếng Thì Thầm Trực Giác</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Trang 05</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(7)">
              <span class="toc-title">Chương II: Nghệ Thuật Chờ Đợi</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Trang 07</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(9)">
              <span class="toc-title">Chương III: Dũng Khí Vượt Giới Hạn</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Trang 09</span>
            </li>
          </ul>
        </div>

        <!-- Phần II -->
        <div>
          <div class="toc-group-title">PHẦN II: 16 LỜI SẤM ĐỊNH MỆNH</div>
          <ul class="toc-list">
            <li class="toc-item" onclick="window.bookController.flipTo(11)">
              <span class="toc-title">Cổng Thần Truyền & Nghi Thức</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Trang 11</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(13)">
              <span class="toc-title">16 Quẻ Sấm Chỉ Dẫn Cổ Tự</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Trang 13+</span>
            </li>
            <li class="toc-item" onclick="window.bookController.flipTo(29)">
              <span class="toc-title">Hồi Kết: Khi Bạn Khép Sách Lại</span>
              <span class="toc-dots"></span>
              <span class="toc-page-num">Hồi Kết</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="toc-hint-footer">
        ✦ Nhấn vào bất kỳ mục nào để lật nhanh đến trang đó ✦
      </div>
    </div>
  `;
  html += wrapPage(page3Content, pageCounter++, true, "Mục Lục", "Tập Khảo Luận", "ii");

  // Trang 4 (Phải): Lời Ngỏ: Trước Khi Bạn Quyết Định
  const preface = data.chapters[0];
  const page4Content = `
    <div class="chapter-essay">
      <div>
        <h3 style="font-family: var(--font-serif-title); font-size: 1.25rem; color: var(--ink-accent); letter-spacing: 1px; margin-bottom: 0.2rem;">
          ${preface.title.toUpperCase()}
        </h3>
        <p style="font-size: 0.88rem; font-style: italic; color: var(--ink-muted); margin-bottom: 0.8rem;">
          ${preface.subtitle}
        </p>
        
        <p class="page-paragraph">
          <span class="drop-cap">${preface.content[0].charAt(0)}</span>${preface.content[0].slice(1)}
        </p>
        <p class="page-paragraph">
          ${preface.content[1]}
        </p>
        <p class="page-paragraph">
          ${preface.content[2]}
        </p>
      </div>

      <div class="wisdom-callout">
        "Câu trả lời bạn tìm thấy hôm nay chính là điều bạn đang cần nhất."
      </div>
    </div>
  `;
  html += wrapPage(page4Content, pageCounter++, false, "Lời Ngỏ", "Vị Thần Của Những Quyết Định", "04");

  // =========================================================================
  // SPREAD 3 (TRANG 5 & 6): CHƯƠNG I: TIẾNG THÌ THẦM TRỰC GIÁC
  // =========================================================================
  const ch1 = data.chapters[1];

  // Trang 5 (Trái): Cổng Chương I
  const page5Content = `
    <div class="chapter-portal">
      <div class="portal-numeral-medallion">
        <span class="portal-numeral">I</span>
      </div>
      <h3 class="portal-title">${ch1.title.replace("Chương I: ", "")}</h3>
      <p class="portal-subtitle">${ch1.subtitle}</p>
      
      <div class="portal-divider">✦ ❂ ✦</div>

      <div class="portal-epigraph">
        "Trực giác là món quà thiêng liêng, còn lý trí là người phục vụ trung thành. Đừng tôn thờ người phục vụ mà lãng quên món quà của thần linh ban tặng."
      </div>

      <div class="portal-bottom-glyph">ᚠ • ᚢ • ᚦ</div>
    </div>
  `;
  html += wrapPage(page5Content, pageCounter++, true, "Chương I • Dẫn Nhập", "Vị Thần Của Những Quyết Định", "05");

  // Trang 6 (Phải): Luận Giải Chương I
  const page6Content = `
    <div class="chapter-essay">
      <div>
        <h4 style="font-family: var(--font-serif-title); font-size: 1.15rem; color: var(--ink-accent); margin-bottom: 0.6rem;">
          TIẾNG NÓI KHÔNG THÀNH LỜI
        </h4>
        <p class="page-paragraph">
          <span class="drop-cap">${ch1.content[0].charAt(0)}</span>${ch1.content[0].slice(1)}
        </p>
        <p class="page-paragraph">
          ${ch1.content[1]}
        </p>
        <p class="page-paragraph">
          ${ch1.content[2]}
        </p>
      </div>

      <div class="wisdom-callout">
        "Tĩnh lặng không phải là khoảng trống vô nghĩa, mà là nơi mọi sự sáng tỏ bắt đầu."
        <span>— Chiêm nghiệm Chương I —</span>
      </div>
    </div>
  `;
  html += wrapPage(page6Content, pageCounter++, false, "Chương I • Luận Giải", "Tiếng Thì Thầm Trực Giác", "06");

  // =========================================================================
  // SPREAD 4 (TRANG 7 & 8): CHƯƠNG II: NGHỆ THUẬT CỦA SỰ CHỜ ĐỢI
  // =========================================================================
  const ch2 = data.chapters[2];

  // Trang 7 (Trái): Cổng Chương II
  const page7Content = `
    <div class="chapter-portal">
      <div class="portal-numeral-medallion">
        <span class="portal-numeral">II</span>
      </div>
      <h3 class="portal-title">${ch2.title.replace("Chương II: ", "")}</h3>
      <p class="portal-subtitle">${ch2.subtitle}</p>
      
      <div class="portal-divider">✦ ❂ ✦</div>

      <div class="portal-epigraph">
        "Nước chỉ trở nên trong vắt khi bạn thôi không khuấy động. Chờ đợi trong sự an tĩnh chính là biểu hiện cao nhất của lòng can đảm."
      </div>

      <div class="portal-bottom-glyph">ᚨ • ᚱ • ᚲ</div>
    </div>
  `;
  html += wrapPage(page7Content, pageCounter++, true, "Chương II • Dẫn Nhập", "Vị Thần Của Những Quyết Định", "07");

  // Trang 8 (Phải): Luận Giải Chương II
  const page8Content = `
    <div class="chapter-essay">
      <div>
        <h4 style="font-family: var(--font-serif-title); font-size: 1.15rem; color: var(--ink-accent); margin-bottom: 0.6rem;">
          KHOẢNG LẶNG ĐỊNH MỆNH
        </h4>
        <p class="page-paragraph">
          <span class="drop-cap">${ch2.content[0].charAt(0)}</span>${ch2.content[0].slice(1)}
        </p>
        <p class="page-paragraph">
          ${ch2.content[1]}
        </p>
        <p class="page-paragraph">
          ${ch2.content[2]}
        </p>
      </div>

      <div class="wisdom-callout">
        "Mọi quả chín đều cần thời gian. Nóng vội hái sớm chỉ mang lại vị chát."
        <span>— Chiêm nghiệm Chương II —</span>
      </div>
    </div>
  `;
  html += wrapPage(page8Content, pageCounter++, false, "Chương II • Luận Giải", "Nghệ Thuật Của Sự Chờ Đợi", "08");

  // =========================================================================
  // SPREAD 5 (TRANG 9 & 10): CHƯƠNG III: DŨNG KHÍ BƯỚC QUA VẠCH KẺ
  // =========================================================================
  const ch3 = data.chapters[3];

  // Trang 9 (Trái): Cổng Chương III
  const page9Content = `
    <div class="chapter-portal">
      <div class="portal-numeral-medallion">
        <span class="portal-numeral">III</span>
      </div>
      <h3 class="portal-title">${ch3.title.replace("Chương III: ", "")}</h3>
      <p class="portal-subtitle">${ch3.subtitle}</p>
      
      <div class="portal-divider">✦ ❂ ✦</div>

      <div class="portal-epigraph">
        "Chiếc thuyền neo đậu trong bến cảng luôn an toàn, nhưng đó chưa từng là lý do con người đóng nên những con thuyền viễn chinh."
      </div>

      <div class="portal-bottom-glyph">ᚷ • ᚹ • ᚺ</div>
    </div>
  `;
  html += wrapPage(page9Content, pageCounter++, true, "Chương III • Dẫn Nhập", "Vị Thần Của Những Quyết Định", "09");

  // Trang 10 (Phải): Luận Giải Chương III
  const page10Content = `
    <div class="chapter-essay">
      <div>
        <h4 style="font-family: var(--font-serif-title); font-size: 1.15rem; color: var(--ink-accent); margin-bottom: 0.6rem;">
          BƯỚC CHÂN VƯỢT GIỚI HẠN
        </h4>
        <p class="page-paragraph">
          <span class="drop-cap">${ch3.content[0].charAt(0)}</span>${ch3.content[0].slice(1)}
        </p>
        <p class="page-paragraph">
          ${ch3.content[1]}
        </p>
        <p class="page-paragraph">
          ${ch3.content[2]}
        </p>
      </div>

      <div class="wisdom-callout">
        "Bên kia nỗi sợ hãi chính là vùng đất của tự do và sức mạnh chân thật."
        <span>— Chiêm nghiệm Chương III —</span>
      </div>
    </div>
  `;
  html += wrapPage(page10Content, pageCounter++, false, "Chương III • Luận Giải", "Dũng Khí Bước Qua Vạch Kẻ", "10");

  // =========================================================================
  // SPREAD 6 (TRANG 11 & 12): CỔNG THẦN TRUYỀN & NGHI THỨC THỈNH QUẺ
  // =========================================================================

  // Trang 11 (Trái): Cổng Thần Truyền
  const page11Content = `
    <div class="oracle-gateway-left">
      <svg class="oracle-gateway-wheel" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" stroke="#1976d2" stroke-width="1.8" fill="none" opacity="0.4"/>
        <circle cx="50" cy="50" r="38" stroke="#1976d2" stroke-width="1.2" stroke-dasharray="3,3" fill="none"/>
        <path d="M50 12 L50 88 M12 50 L88 50 M23 23 L77 77 M23 77 L77 23" stroke="#1976d2" stroke-width="1" opacity="0.6"/>
        <circle cx="50" cy="50" r="14" fill="#e3f2fd" stroke="#1976d2" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="4" fill="#1976d2"/>
      </svg>

      <h3 style="font-family: var(--font-serif-title); font-size: 1.25rem; color: var(--ink-accent); letter-spacing: 1.5px; margin-bottom: 0.3rem;">
        PHẦN II: 16 LỜI SẤM ĐỊNH MỆNH
      </h3>
      <p style="font-size: 0.85rem; font-style: italic; color: var(--ink-muted); margin-bottom: 1.2rem;">
        Tiếng Nói Của Trực Giác & Vũ Trụ
      </p>

      <div style="font-size: 0.95rem; font-style: italic; line-height: 1.65; color: var(--ink-dark); max-width: 90%;">
        "Không có sự ngẫu nhiên tuyệt đối. Vào đúng khoảnh khắc bạn mở trang sách, tâm trí bạn đã sẵn sàng đón nhận chân lý đó."
      </div>
    </div>
  `;
  html += wrapPage(page11Content, pageCounter++, true, "Phần II • Khởi Nhập", "Các Quẻ Sấm Định Mệnh", "11");

  // Trang 12 (Phải): Nghi Thức Thỉnh Quẻ
  const page12Content = `
    <div class="oracle-gateway-right">
      <div>
        <h4 style="font-family: var(--font-serif-title); font-size: 1.15rem; color: var(--ink-accent); margin-bottom: 0.2rem;">
          NGHI THỨC THỈNH THÔNG ĐIỆP
        </h4>
        <p style="font-size: 0.82rem; font-style: italic; color: var(--ink-muted); margin-bottom: 0.6rem;">
          3 Bước để kết nối với trực giác của bạn
        </p>

        <div class="ritual-step-list">
          <div class="ritual-step">
            <div class="ritual-num">1</div>
            <div class="ritual-text">
              <strong>Tịnh Tâm & Đặt Câu Hỏi</strong>
              <p>Hít thở sâu 3 nhịp. Giữ trong tâm trí điều bạn đang do dự nhất.</p>
            </div>
          </div>
          <div class="ritual-step">
            <div class="ritual-num">2</div>
            <div class="ritual-text">
              <strong>Khởi Động Trang Ngẫu Nhiên</strong>
              <p>Bấm nút bên dưới hoặc phím Space để cuốn sách tự xòe trang định mệnh.</p>
            </div>
          </div>
          <div class="ritual-step">
            <div class="ritual-num">3</div>
            <div class="ritual-text">
              <strong>Đón Nhận & Hành Động</strong>
              <p>Đọc phán quyết và thực thi chỉ dẫn cụ thể trong 24 giờ tiếp theo.</p>
            </div>
          </div>
        </div>
      </div>

      <button class="ritual-direct-btn" onclick="window.oracleController.triggerRandomDirectly()">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4M8 12h8"/></svg>
        Thỉnh Cầu Thông Điệp Ngay
      </button>
    </div>
  `;
  html += wrapPage(page12Content, pageCounter++, false, "Nghi Thức Thỉnh Quẻ", "Vị Thần Của Những Quyết Định", "12");

  // =========================================================================
  // SPREADS 7 ĐẾN 14 (TRANG 13 ĐẾN 28): 16 QUẺ SẤM QUYẾT ĐỊNH (ORACLE DECISIONS)
  // =========================================================================
  data.oracleDecisions.forEach((dec) => {
    const isLeft = pageCounter % 2 !== 0;
    html += wrapOraclePage(dec, pageCounter++, isLeft);
  });

  // =========================================================================
  // SPREAD 15 (TRANG 29 & 30): HỒI KẾT & LỜI TRI ÂN (COLOPHON)
  // =========================================================================

  // Trang 29 (Trái): Hồi Kết
  const page29Content = `
    <div class="epilogue-content">
      <div style="font-size: 2rem; color: var(--ink-accent); margin-bottom: 0.8rem;">✦ ❂ ✦</div>
      <h3 class="epilogue-title">KHI BẠN KHÉP SÁCH LẠI</h3>
      <p class="epilogue-quote">
        "Dù thông điệp của Vị Thần hôm nay là gì, hãy luôn nhớ rằng: Quyền năng tối thượng của một con người chính là quyền năng lựa chọn thái độ sống."
      </p>
      <p class="epilogue-closing">
        Cuốn sách này sẽ luôn ở đây, tĩnh lặng chờ đợi bạn mỗi khi đứng trước những ngã rẽ cuộc đời. Chúc bạn luôn kiên định, thanh thản và dũng cảm trên hành trình của chính mình.
      </p>
    </div>
  `;
  html += wrapPage(page29Content, pageCounter++, true, "Hồi Kết", "Khép Lại Cuốn Sách", "29");

  // Trang 30 (Phải): Lời Tri Ân & Colophon
  const page30Content = `
    <div class="epilogue-content">
      <h4 style="font-family: var(--font-serif-title); font-size: 1.1rem; color: var(--ink-accent); margin-bottom: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase;">
        BẢN QUYỀN TÂM THỨC
      </h4>
      <p style="font-size: 0.88rem; font-style: italic; color: var(--ink-muted); margin-bottom: 1rem;">
        Hành Trình Khai Mở Trực Giác
      </p>

      <div class="colophon-box">
        ✦ Tác phẩm: Vị Thần Của Những Quyết Định<br>
        ✦ Phiên bản: Sách Tương Tác 3D & Bản Khắc Cổ Tự<br>
        ✦ Biên soạn: Hội Đồng Những Kẻ Lữ Hành Vô Tận<br>
        ✦ Phong cách thiết kế: Xanh Pastel Huyền Bí (2026)<br>
        ✦ Công nghệ: StPageFlip, GSAP, HTML5 Canvas
      </div>

      <div style="font-family: var(--font-sans); font-size: 0.72rem; letter-spacing: 2px; color: var(--ink-muted); text-transform: uppercase;">
        VŨ TRỤ ĐỒNG HÀNH CÙNG BẠN
      </div>
    </div>
  `;
  html += wrapPage(page30Content, pageCounter++, false, "Lời Tri Ân", "Vị Thần Của Những Quyết Định", "30");

  // =========================================================================
  // 31. TRANG BÌA SAU (HARDCOVER BACK)
  // =========================================================================
  html += `
    <div class="page page-cover page-cover-bottom" data-density="hard" data-page-index="${pageCounter++}">
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
