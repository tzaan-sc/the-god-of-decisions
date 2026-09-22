/**
 * Điều khiển và khởi tạo StPageFlip (page-flip)
 * Quản lý lật trang vật lý 3D, sự kiện âm thanh và đồng bộ giao diện
 */

class BookController {
  constructor() {
    this.pageFlip = null;
    this.bookEl = document.getElementById("book");
    this.currentPageEl = document.getElementById("current-page-num");
    this.totalPagesEl = document.getElementById("total-page-num");
    this.init();
  }

  init() {
    if (!this.bookEl || typeof St === "undefined" || !St.PageFlip) {
      console.warn("StPageFlip library not ready yet");
      return;
    }

    // Tính toán kích thước phù hợp với màn hình
    const isMobile = window.innerWidth <= 768;
    const pageWidth = isMobile ? Math.min(window.innerWidth - 30, 360) : 420;
    const pageHeight = isMobile ? Math.min(window.innerHeight - 180, 540) : 590;

    this.pageFlip = new St.PageFlip(this.bookEl, {
      width: pageWidth,
      height: pageHeight,
      size: "fixed",
      minWidth: 300,
      maxWidth: 480,
      minHeight: 450,
      maxHeight: 650,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: isMobile,
      startPage: 0,
      drawShadow: true,
      flippingTime: 850
    });

    // Tải danh sách các trang đã được render trong DOM
    this.pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    // Lắng nghe sự kiện lật trang
    this.pageFlip.on("flip", (e) => {
      if (window.soundEngine) {
        window.soundEngine.playPageFlip(1);
      }
      this.updatePageIndicator(e.data);
      // Lưu lại trang đang đọc dở
      localStorage.setItem("god_of_decisions_last_page", e.data);
    });

    // Cập nhật tổng số trang
    setTimeout(() => {
      if (this.totalPagesEl && this.pageFlip) {
        this.totalPagesEl.textContent = this.pageFlip.getPageCount();
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
      // Cho phép StPageFlip tự động thích ứng chế độ hiển thị
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
    if (pageIndex === 0) {
      this.currentPageEl.textContent = "Bìa trước";
    } else if (pageIndex >= this.getTotalPages() - 1) {
      this.currentPageEl.textContent = "Bìa sau";
    } else {
      this.currentPageEl.textContent = `Trang ${pageIndex}`;
    }
  }
}

window.bookController = null;
