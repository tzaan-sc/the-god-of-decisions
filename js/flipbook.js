/**
 * Điều khiển và khởi tạo StPageFlip (page-flip)
 * Quản lý lật trang vật lý 3D chân thực, điều hướng mũi tên và đồng bộ thanh dock
 */

class BookController {
  constructor() {
    this.pageFlip = null;
    this.bookEl = document.getElementById("book");
    this.currentPageEl = document.getElementById("current-page-num");
    this.totalPagesEl = document.getElementById("total-page-num");
    this.prevBtn = document.getElementById("prev-page-btn");
    this.nextBtn = document.getElementById("next-page-btn");
    this.init();
  }

  init() {
    if (!this.bookEl || typeof St === "undefined" || !St.PageFlip) {
      console.warn("StPageFlip library not ready yet");
      return;
    }

    // Tính toán kích thước trang thoáng đãng, tuyệt đối không chạm vào dock điều khiển bên dưới
    const isMobile = window.innerWidth <= 768;
    const headerFooterSpace = isMobile ? 140 : 180;
    const availHeight = window.innerHeight - headerFooterSpace;
    const availWidth = isMobile ? window.innerWidth - 30 : (window.innerWidth - 140) / 2;
    
    // Giới hạn chiều cao an toàn để không bao giờ đè vào thanh Footer bên dưới
    const maxH = isMobile ? 500 : 580;
    const minH = isMobile ? 360 : 420;
    const pageHeight = Math.max(Math.min(availHeight, maxH), minH);
    const pageWidth = isMobile ? Math.min(availWidth, 360) : Math.min(Math.round(pageHeight / 1.42), Math.floor(availWidth));

    this.pageFlip = new St.PageFlip(this.bookEl, {
      width: pageWidth,
      height: pageHeight,
      size: "fixed",
      minWidth: 280,
      maxWidth: 480,
      minHeight: 360,
      maxHeight: 650,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: isMobile,
      startPage: 0,
      drawShadow: true,
      flippingTime: 800
    });

    // Tải danh sách các trang đã được render trong DOM
    this.pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    // Lắng nghe sự kiện lật trang
    this.pageFlip.on("flip", (e) => {
      this.updatePageIndicator(e.data);
      localStorage.setItem("god_of_decisions_last_page", e.data);
    });

    // Cập nhật tổng số trang và trạng thái mũi tên
    setTimeout(() => {
      if (this.pageFlip) {
        const total = this.pageFlip.getPageCount();
        if (this.totalPagesEl) {
          this.totalPagesEl.textContent = `${total - 1}`;
        }
        this.updatePageIndicator(this.pageFlip.getCurrentPageIndex());
      }
    }, 200);

    // Xử lý resize màn hình
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  handleResize() {
    if (!this.pageFlip) return;
    const isMobile = window.innerWidth <= 768;
    const currentMode = this.pageFlip.getOrientation();
    const shouldBePortrait = isMobile ? "portrait" : "landscape";
    
    if (currentMode !== shouldBePortrait) {
      this.pageFlip.update();
    }
  }

  flipPrev() {
    if (this.pageFlip) {
      this.pageFlip.flipPrev();
    }
  }

  flipNext() {
    if (this.pageFlip) {
      this.pageFlip.flipNext();
    }
  }

  flipTo(pageIndex) {
    if (this.pageFlip) {
      this.pageFlip.flip(pageIndex);
    }
  }

  getCurrentPage() {
    return this.pageFlip ? this.pageFlip.getCurrentPageIndex() : 0;
  }

  getTotalPages() {
    return this.pageFlip ? this.pageFlip.getPageCount() : 0;
  }

  updatePageIndicator(pageIndex) {
    if (!this.currentPageEl) return;
    const total = this.getTotalPages();

    // Ẩn nút mũi tên nếu đang ở bìa đầu hoặc bìa cuối
    if (this.prevBtn) {
      this.prevBtn.style.opacity = pageIndex === 0 ? "0" : "1";
      this.prevBtn.style.pointerEvents = pageIndex === 0 ? "none" : "auto";
    }
    if (this.nextBtn) {
      this.nextBtn.style.opacity = pageIndex >= total - 1 ? "0" : "1";
      this.nextBtn.style.pointerEvents = pageIndex >= total - 1 ? "none" : "auto";
    }

    if (pageIndex === 0) {
      this.currentPageEl.textContent = "Bìa trước";
    } else if (pageIndex >= total - 1) {
      this.currentPageEl.textContent = "Bìa sau";
    } else {
      const isPortrait = this.pageFlip && this.pageFlip.getOrientation() === "portrait";
      if (isPortrait || pageIndex + 1 >= total - 1) {
        this.currentPageEl.textContent = `Trang ${pageIndex}`;
      } else {
        this.currentPageEl.textContent = `Trang ${pageIndex} - ${pageIndex + 1}`;
      }
    }
    if (this.totalPagesEl) {
      this.totalPagesEl.textContent = `${total - 1}`;
    }
  }
}

window.bookController = null;
