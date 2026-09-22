/**
 * Hệ thống âm thanh tương tác: Howler.js + Web Audio API Procedural Synthesizer
 * Tự động tạo âm thanh lật giấy, xòe trang liên thanh, chuông đồng và ambient thiền định
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.ambientRunning = false;
    this.ambientNodes = null;
    this.initContext();
  }

  initContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !this.audioCtx) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureContext() {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientRunning) {
      this.stopAmbient();
    } else if (!this.isMuted && !this.ambientRunning) {
      this.startAmbient();
    }
    return this.isMuted;
  }

  /**
   * Tạo âm thanh lật giấy tự nhiên (Crisp Paper Page Flip)
   * Sử dụng White Noise lọc qua Bandpass filter và Envelope giảm dần
   */
  playPageFlip(speedMultiplier = 1) {
    if (this.isMuted) return;
    this.initContext();
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const bufferSize = ctx.sampleRate * 0.18 * speedMultiplier;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Sinh tiếng xào xạc trắng
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.8);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter giả lập tiếng ma sát giấy mộc
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.15 * speedMultiplier);
      filter.Q.value = 1.2;

      // Highpass nhẹ để loại bỏ tiếng ồn trầm
      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 350;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.17 * speedMultiplier);

      noise.connect(filter);
      filter.connect(highpass);
      highpass.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (err) {
      console.warn("Audio play error", err);
    }
  }

  /**
   * Tạo âm thanh xòe trang liên thanh dồn dập (Fast Page Riffle Effect)
   */
  playPageRiffle(durationMs = 1500) {
    if (this.isMuted) return;
    const startTime = Date.now();
    let count = 0;

    const riffleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs) {
        clearInterval(riffleInterval);
        return;
      }
      // Tần suất và tốc độ chậm dần mô phỏng sách xòe chậm lại
      this.playPageFlip(0.6);
      count++;
    }, 65);
  }

  /**
   * Tạo tiếng chuông đồng thiêng liêng (Mystical Singing Bowl / Tibetan Chime)
   * Phát ra khi trang sấm quyết định xuất hiện
   */
  playMysticalChime() {
    if (this.isMuted) return;
    this.initContext();
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      const frequencies = [528, 1056, 1584, 2112]; // Tần số 528Hz (Love/Transformation frequency)
      const gains = [0.35, 0.18, 0.08, 0.03];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.3);
      });
    } catch (e) {
      console.warn("Chime error", e);
    }
  }

  /**
   * Âm thanh ambient nền: Tiếng nến tí tách và gió khẽ (Warm Fireplace & Ambient Drone)
   */
  startAmbient() {
    if (this.isMuted || this.ambientRunning) return;
    this.initContext();
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Tạo tiếng hum trầm huyền bí (mystical drone)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(108, now); // nốt A thiền định
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(162, now); // nốt E ngũ cung

      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.linearRampToValueAtTime(0.03, now + 3);

      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.ambientNodes = { osc1, osc2, droneGain };
      this.ambientRunning = true;
    } catch (e) {
      console.warn("Ambient error", e);
    }
  }

  stopAmbient() {
    if (!this.ambientRunning || !this.ambientNodes) return;
    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      this.ambientNodes.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        if (this.ambientNodes) {
          this.ambientNodes.osc1.stop();
          this.ambientNodes.osc2.stop();
          this.ambientNodes = null;
        }
        this.ambientRunning = false;
      }, 1000);
    } catch (e) {
      console.warn("Stop ambient error", e);
    }
  }
}

window.soundEngine = new SoundEngine();
