/**
 * Xử lý kịch bản "Thỉnh Cầu Vị Thần" (The Oracle Mode)
 * Hoạt họa GSAP, chọn thông điệp ngẫu nhiên và xuất ảnh thẻ bài qua html2canvas
 */

class OracleController {
  constructor() {
    this.modalEl = document.getElementById("oracle-modal");
    this.quoteModalEl = document.getElementById("quote-modal");
    this.timerEl = document.getElementById("oracle-countdown");
    this.sealBtn = document.getElementById("oracle-seal-btn");
    this.stepTitle = document.getElementById("oracle-step-title");
    this.stepDesc = document.getElementById("oracle-step-desc");
    this.currentDecision = null;
    this.isConsulting = false;

    this.initEvents();
  }

  initEvents() {
    if (this.sealBtn) {
      this.sealBtn.addEventListener("click", () => {
        this.startCenteringRitual();
      });
    }

    // Nút đóng modal thỉnh cầu
    const closeOracleBtn = document.getElementById("close-oracle-btn");
    if (closeOracleBtn) {
      closeOracleBtn.addEventListener("click", () => this.closeOracleModal());
    }

    // Nút đóng modal trích dẫn
    const closeQuoteBtn = document.getElementById("close-quote-btn");
    if (closeQuoteBtn) {
      closeQuoteBtn.addEventListener("click", () => this.closeQuoteModal());
    }

    // Nút tải ảnh thẻ trích dẫn
    const downloadQuoteBtn = document.getElementById("download-quote-btn");
    if (downloadQuoteBtn) {
      downloadQuoteBtn.addEventListener("click", () => this.exportQuoteCardAsImage());
    }
  }

  openOracleModal() {
    if (!this.modalEl) return;
    this.resetModalUI();
    this.modalEl.classList.add("active");

    if (window.gsap) {
      gsap.fromTo(
        ".oracle-card",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }

  closeOracleModal() {
    if (!this.modalEl || this.isConsulting) return;
    this.modalEl.classList.remove("active");
  }

  resetModalUI() {
    this.isConsulting = false;
    this.timerEl.style.display = "none";
    this.sealBtn.style.pointerEvents = "auto";
    this.stepTitle.textContent = "Khởi Tâm Thỉnh Cầu";
    this.stepDesc.textContent = "Hãy nhắm mắt lại, hít một hơi sâu và tập trung tâm trí vào câu hỏi hoặc quyết định bạn đang băn khoăn. Khi đã sẵn sàng, hãy chạm vào Ấn Triện Định Mệnh.";
  }

  /**
   * Bắt đầu nghi thức đếm ngược và xòe trang sách
   */
  startCenteringRitual() {
    if (this.isConsulting) return;
    this.isConsulting = true;
    this.sealBtn.style.pointerEvents = "none";

    let count = 3;
    this.stepTitle.textContent = "Đang Đồng Điệu Với Vị Thần...";
    this.stepDesc.textContent = "Giữ vững sự tĩnh tại... Lời chỉ dẫn đang tìm đường đến với bạn.";
    this.timerEl.style.display = "block";
    this.timerEl.textContent = count;

    if (window.soundEngine) {
      window.soundEngine.playMysticalChime();
    }

    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        this.timerEl.textContent = count;
        if (window.gsap) {
          gsap.fromTo(this.timerEl, { scale: 1.5, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.5 });
        }
      } else {
        clearInterval(countdownInterval);
        this.timerEl.textContent = "✦";
        this.executeRiffleAndReveal();
      }
    }, 1000);
  }

  /**
   * Đóng modal và thực hiện hiệu ứng xòe sách GSAP rồi dừng ở trang định mệnh
   */
  executeRiffleAndReveal() {
    this.modalEl.classList.remove("active");

    if (window.soundEngine) {
      window.soundEngine.playPageRiffle(1800);
    }

    // Hiệu ứng rung nhẹ và lắc lốc sách bằng GSAP
    const bookStage = document.querySelector(".book-viewport");
    if (window.gsap && bookStage) {
      gsap.to(bookStage, {
        keyframes: [
          { x: -8, y: -4, rotation: -1, duration: 0.15 },
          { x: 10, y: 5, rotation: 1.5, duration: 0.15 },
          { x: -12, y: -6, rotation: -2, duration: 0.15 },
          { x: 8, y: 4, rotation: 1, duration: 0.15 },
          { x: -5, y: -2, rotation: -0.5, duration: 0.2 },
          { x: 0, y: 0, rotation: 0, duration: 0.35 }
        ],
        ease: "power1.inOut"
      });
    }

    // Tìm tất cả các trang Oracle có sẵn trong DOM
    const oraclePages = document.querySelectorAll(".page-oracle");
    if (oraclePages.length === 0) return;

    // Chọn ngẫu nhiên 1 trang
    const randomIndex = Math.floor(Math.random() * oraclePages.length);
    const targetElement = oraclePages[randomIndex];
    const targetPageIndex = parseInt(targetElement.getAttribute("data-page-index"), 10);

    setTimeout(() => {
      if (window.bookController) {
        window.bookController.flipTo(targetPageIndex);
      }

      setTimeout(() => {
        // Chuông ngân vang khi trang mở ra
        if (window.soundEngine) {
          window.soundEngine.playMysticalChime();
        }

        // Bắn pháo hoa ánh vàng lấp lánh (Confetti)
        if (typeof confetti === "function") {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#d4af37", "#f9e295", "#ffffff", "#78201a"]
          });
        }

        this.showToast("✦ Vị thần đã ban lời chỉ dẫn cho bạn!");
        this.isConsulting = false;
      }, 900);
    }, 1200);
  }

  /**
   * Mở modal xem thẻ bài trích dẫn để tải về
   */
  openQuoteModal(decisionCode) {
    if (!window.BOOK_DATA) return;
    const decision = window.BOOK_DATA.oracleDecisions.find(d => d.code === decisionCode);
    if (!decision) return;

    this.currentDecision = decision;
    const renderTarget = document.getElementById("quote-render-target");
    if (renderTarget) {
      renderTarget.innerHTML = `
        <div class="quote-card-border"></div>
        <div class="quote-card-rune">${decision.rune}</div>
        <h3 class="quote-card-title">${decision.verdict}</h3>
        <p class="quote-card-summary">"${decision.summary}"</p>
        <p class="quote-card-action"><strong>Chỉ dẫn:</strong> ${decision.actionPrompt}</p>
        <div class="quote-card-footer">✦ VỊ THẦN CỦA NHỮNG QUYẾT ĐỊNH ✦</div>
      `;
    }

    if (this.quoteModalEl) {
      this.quoteModalEl.classList.add("active");
    }
  }

  closeQuoteModal() {
    if (this.quoteModalEl) {
      this.quoteModalEl.classList.remove("active");
    }
  }

  /**
   * Xuất thẻ trích dẫn ra ảnh PNG bằng html2canvas
   */
  exportQuoteCardAsImage() {
    const cardEl = document.getElementById("quote-render-target");
    if (!cardEl || typeof html2canvas === "undefined") {
      alert("Tính năng xuất ảnh đang được chuẩn bị!");
      return;
    }

    const downloadBtn = document.getElementById("download-quote-btn");
    if (downloadBtn) {
      downloadBtn.textContent = "Đang khắc họa...";
      downloadBtn.style.pointerEvents = "none";
    }

    html2canvas(cardEl, {
      backgroundColor: null,
      scale: 2.5, // Độ nét cao Retina
      useCORS: true
    }).then(canvas => {
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const filename = this.currentDecision ? `vi-than-quyet-dinh-${this.currentDecision.code.toLowerCase()}.png` : "vi-than-quyet-dinh.png";
      link.download = filename;
      link.href = imageURL;
      link.click();

      if (downloadBtn) {
        downloadBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
          Đã Tải Xong!
        `;
        setTimeout(() => {
          downloadBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
            Tải Về Ảnh Thẻ Bài (PNG)
          `;
          downloadBtn.style.pointerEvents = "auto";
        }, 2000);
      }
      this.showToast("✦ Đã lưu Thẻ Chỉ Dẫn thành công!");
    }).catch(err => {
      console.error("Lỗi xuất ảnh:", err);
      alert("Có lỗi khi tạo ảnh, vui lòng thử lại!");
      if (downloadBtn) downloadBtn.style.pointerEvents = "auto";
    });
  }

  showToast(message) {
    const toast = document.getElementById("toast-notice");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }
}

window.oracleController = null;
