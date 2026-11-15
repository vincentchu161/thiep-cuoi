(function () {
  "use strict";
  var W = window.WEDDING;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var body = document.body;
  var DOW = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function toast(msg) {
    var t = $("[data-toast]");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  // Giờ Việt Nam cho một mốc ISO (không phụ thuộc múi giờ máy khách)
  function vnParts(iso) {
    var d = new Date(new Date(iso).getTime() + 7 * 3600 * 1000);
    return { y: d.getUTCFullYear(), mo: d.getUTCMonth() + 1, d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes(), dow: d.getUTCDay() };
  }

  /* ---------- Tên khách ---------- */
  var params = new URLSearchParams(location.search);
  var guest = (params.get("khach") || params.get("to") || "").trim().slice(0, 60);
  if (guest) {
    $$("[data-guest]").forEach(function (el) { el.textContent = guest; });
    $$("[data-guest-line]").forEach(function (el) { el.hidden = false; });
  }

  /* ---------- Theme ---------- */
  function applyTheme(t) {
    if (!W.themes[t]) t = W.defaultTheme || "trang";
    body.dataset.theme = t;
    document.documentElement.dataset.theme = t;
    $$("[data-theme-pick]").forEach(function (b) { b.setAttribute("aria-checked", String(b.dataset.themePick === t)); });
    $("[data-hero]").src = W.themes[t].hero;
    $("[data-closing]").src = t === "do" ? "assets/img/ao-dai-3754.jpg" : "assets/img/ngau-3485.jpg";
    $('meta[name="theme-color"]').content = t === "do" ? "#7d1419" : "#f7f5ef";
    renderGallery(t);
    store("thiep-theme", t);
  }
  $$("[data-theme-pick]").forEach(function (b) {
    b.addEventListener("click", function () { applyTheme(b.dataset.themePick); });
  });
  $("[data-theme-toggle]").addEventListener("click", function () {
    applyTheme(body.dataset.theme === "do" ? "trang" : "do");
    toast(body.dataset.theme === "do" ? "Đã đổi sang thiệp màu Đỏ" : "Đã đổi sang thiệp màu Trắng");
  });

  /* ---------- Nhạc ---------- */
  var audio = $("[data-audio]");
  var musicBtn = $("[data-music]");
  function setPlaying(on) { musicBtn.classList.toggle("playing", on); }
  function playMusic() {
    if (!W.music) return;
    if (!audio.src) audio.src = W.music;
    var p = audio.play();
    if (p && p.then) p.then(function () { setPlaying(true); }).catch(function () { setPlaying(false); });
  }
  musicBtn.addEventListener("click", function () {
    if (audio.paused) playMusic(); else { audio.pause(); setPlaying(false); }
  });
  audio.addEventListener("error", function () { musicBtn.hidden = true; });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && !audio.paused) { audio.pause(); audio._resume = true; }
    else if (!document.hidden && audio._resume) { audio._resume = false; playMusic(); }
  });

  /* ---------- Mở thiệp ---------- */
  var cover = $("#cover");
  var opened = false;
  function openInvite() {
    if (opened) return;
    opened = true;
    playMusic();
    cover.classList.add("opening");
    body.classList.add("opened");
    var ms = matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1450;
    setTimeout(function () {
      cover.classList.add("gone");
      body.classList.remove("locked");
    }, ms);
  }
  $$("[data-open]").forEach(function (b) { b.addEventListener("click", openInvite); });
  $(".cover-white").addEventListener("click", function (e) {
    if (body.dataset.theme === "trang" && !e.target.closest(".theme-pick")) openInvite();
  });

  /* ---------- Gia đình + monogram ---------- */
  $("[data-families]").innerHTML = ["trai", "gai"].map(function (k) {
    var f = W.families[k];
    return '<div class="family"><h4>' + esc(f.label) + "</h4><p>" + esc(f.father) + "</p><p>" + esc(f.mother) + "</p></div>";
  }).join("");

  (function monogram() {
    var leaves = "";
    function branch(from, to, flip) {
      var n = 7;
      for (var i = 0; i < n; i++) {
        var a = (from + (to - from) * i / (n - 1)) * Math.PI / 180;
        var x = 75 + 58 * Math.cos(a), y = 75 + 58 * Math.sin(a);
        var deg = a * 180 / Math.PI + (flip ? -55 : 55) + 90;
        var s = 1 - Math.abs(i - (n - 1) / 2) / n;
        leaves += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + (3.2 * s + 1.5).toFixed(1) + '" ry="' + (8 * s + 3).toFixed(1) +
          '" transform="rotate(' + deg.toFixed(0) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')" fill="none" stroke="currentColor" stroke-width="1.1"/>';
      }
    }
    branch(100, 230, false);
    branch(-50, 80, true);
    $("[data-monogram]").innerHTML = '<svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="58" fill="none" stroke="currentColor" stroke-width="1"/>' +
      leaves + '<text x="75" y="92" text-anchor="middle" font-family="Great Vibes, cursive" font-size="54" fill="currentColor">' +
      esc(W.groom.initial + W.bride.initial) + "</text></svg>";
  })();

  /* ---------- Sự kiện ---------- */
  function gcalDate(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  function eventInfo(ev) {
    var f = W.families[ev.family];
    return {
      title: ev.title + (ev.title.indexOf(f.label) < 0 && ev.title.indexOf("Lễ") !== 0 ? " " + f.label : "") + " · " + W.groom.short + " & " + W.bride.short,
      place: "Tư gia " + f.label,
      address: f.address,
      map: f.mapUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(f.address),
    };
  }
  function gcalUrl(ev) {
    var i = eventInfo(ev);
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(i.title) +
      "&dates=" + gcalDate(ev.start) + "/" + gcalDate(ev.end) + "&details=" + encodeURIComponent(ev.lunar || "") +
      "&location=" + encodeURIComponent(i.place + ", " + i.address) + "&ctz=Asia/Ho_Chi_Minh";
  }
  function icsFor(ev) {
    var i = eventInfo(ev);
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//thiep-cuoi//VN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      "UID:" + gcalDate(ev.start) + "-" + ev.family + "@thiep-cuoi",
      "DTSTAMP:" + gcalDate(new Date().toISOString()),
      "DTSTART:" + gcalDate(ev.start), "DTEND:" + gcalDate(ev.end),
      "SUMMARY:" + i.title, "LOCATION:" + (i.place + ", " + i.address).replace(/,/g, "\\,"),
      "DESCRIPTION:" + (ev.lunar || ""),
      "BEGIN:VALARM", "TRIGGER:-PT3H", "ACTION:DISPLAY", "DESCRIPTION:" + i.title, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ];
    return lines.join("\r\n");
  }
  (function renderEvents() {
    // Gom theo từng nhà: địa chỉ + bản đồ hiện một lần, bên dưới là các mốc giờ
    $("[data-events]").innerHTML = '<div class="venues">' + ["trai", "gai"].map(function (fk) {
      var f = W.families[fk];
      var items = W.events.map(function (ev, idx) { return { ev: ev, idx: idx }; })
        .filter(function (it) { return it.ev.family === fk; })
        .sort(function (x, y) { return new Date(x.ev.start) - new Date(y.ev.start); });
      if (!items.length) return "";
      return '<article class="venue"><p class="caps venue-kicker">Tư gia</p><h4 class="venue-name">' + esc(f.label) + '</h4>' +
        '<p class="addr">' + esc(f.address) + '</p><ul class="ev-rows">' +
        items.map(function (it) {
          var ev = it.ev, t = vnParts(ev.start);
          return '<li><div class="ev-time"><b>' + pad(t.h) + ":" + pad(t.mi) + '</b><span>' + DOW[t.dow] + '</span></div>' +
            '<div class="ev-info"><p class="ev-title">' + esc(ev.title) + '</p><p class="ev-date">' + pad(t.d) + "." + pad(t.mo) + "." + t.y +
            (ev.lunar ? '<br><i>' + esc(ev.lunar) + '</i>' : "") + '</p></div>' +
            '<div class="cal-menu"><button class="cal-btn" type="button" data-cal="' + it.idx + '" aria-label="Thêm ' + esc(ev.title) + ' vào lịch" title="Thêm vào lịch">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zm-2 7h14v10H5zm6 2v2H9v2h2v2h2v-2h2v-2h-2v-2z"/></svg></button></div></li>';
        }).join("") +
        '</ul><a class="btn sm venue-map" href="' + (f.mapUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(f.address)) +
        '" target="_blank" rel="noopener">Xem bản đồ</a></article>';
    }).join("") + "</div>";

    $("[data-events]").addEventListener("click", function (e) {
      var b = e.target.closest("[data-cal]");
      if (!b) return;
      var menu = b.parentNode, open = $(".cal-pop", menu);
      $$(".cal-pop").forEach(function (p) { p.remove(); });
      if (open) return;
      var ev = W.events[+b.dataset.cal];
      var gcal = gcalUrl(ev);
      var pop = document.createElement("div");
      pop.className = "cal-pop";
      pop.innerHTML = '<a href="' + gcal + '" target="_blank" rel="noopener">Google Calendar</a><button type="button" data-ics>Apple / Outlook (.ics)</button>';
      menu.appendChild(pop);
      $("[data-ics]", pop).addEventListener("click", function () {
        var blob = new Blob([icsFor(ev)], { type: "text/calendar;charset=utf-8" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = (ev.title + "-" + W.families[ev.family].label).replace(/\s+/g, "-") + ".ics";
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
        pop.remove();
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".cal-menu")) $$(".cal-pop").forEach(function (p) { p.remove(); });
    });
  })();

  /* ---------- Đếm ngược ---------- */
  (function countdown() {
    var target = new Date(W.mainDate).getTime();
    var els = {}; ["d", "h", "m", "s"].forEach(function (k) { els[k] = $('[data-cd="' + k + '"]'); });
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        $("[data-countdown]").hidden = true;
        $("[data-countdown-done]").hidden = false;
        return;
      }
      var s = Math.floor(diff / 1000);
      els.d.textContent = pad(Math.floor(s / 86400));
      els.h.textContent = pad(Math.floor(s % 86400 / 3600));
      els.m.textContent = pad(Math.floor(s % 3600 / 60));
      els.s.textContent = pad(s % 60);
      setTimeout(tick, 1000 - (Date.now() % 1000));
    }
    tick();
  })();

  /* ---------- Lịch tháng ---------- */
  (function calendar() {
    var main = vnParts(W.mainDate);
    var marks = {};
    W.events.forEach(function (ev) { var p = vnParts(ev.start); if (p.mo === main.mo) marks[p.d] = 1; });
    var first = new Date(Date.UTC(main.y, main.mo - 1, 1)).getUTCDay(); // 0 = CN
    var offset = (first + 6) % 7; // tuần bắt đầu Thứ Hai
    var days = new Date(Date.UTC(main.y, main.mo, 0)).getUTCDate();
    var html = '<h4>Tháng ' + main.mo + " · " + main.y + '</h4><div class="cal-grid">' +
      ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(function (d) { return '<span class="dow">' + d + "</span>"; }).join("");
    for (var i = 0; i < offset; i++) html += "<span></span>";
    for (var d = 1; d <= days; d++) {
      var cls = d === main.d ? "d main" : marks[d] ? "d mark" : "d";
      html += '<span class="' + cls + '">' + d + "</span>";
    }
    html += '</div><div class="cal-legend"><span><i style="box-shadow:inset 0 0 0 1px var(--accent)"></i>Tiệc cưới</span><span><i style="background:var(--accent)"></i>Lễ cưới</span></div>';
    $("[data-calendar]").innerHTML = html;
  })();

  /* ---------- Album + lightbox ---------- */
  var photos = [];
  function renderGallery(theme) {
    var a = W.album.aoDai, n = W.album.ngau;
    var order = theme === "trang" ? n.concat(a) : a.concat(n);
    order = order.filter(function (x) { return x !== W.album.wide; });
    photos = order.map(function (x) { return "assets/img/" + x + ".jpg"; });
    $("[data-gallery]").innerHTML = photos.map(function (src, i) {
      var wide = i === 0 || i === 7;
      return '<button type="button" class="' + (wide ? "wide" : "") + '" data-idx="' + i + '" aria-label="Xem ảnh ' + (i + 1) +
        '"><img src="' + src + '" alt="Ảnh cưới ' + (i + 1) + '" loading="lazy" decoding="async"></button>';
    }).join("");
  }
  var lb = $("[data-lightbox]"), lbImg = $("[data-lb-img]"), lbIdx = 0;
  function showLb(i) {
    lbIdx = (i + photos.length) % photos.length;
    lbImg.src = photos[lbIdx];
    $("[data-lb-count]").textContent = (lbIdx + 1) + " / " + photos.length;
  }
  function openLb(i) { showLb(i); lb.hidden = false; body.style.overflow = "hidden"; }
  function closeLb() { lb.hidden = true; body.style.overflow = ""; }
  $("[data-gallery]").addEventListener("click", function (e) {
    var b = e.target.closest("[data-idx]");
    if (b) openLb(+b.dataset.idx);
  });
  $("[data-lb-close]").addEventListener("click", closeLb);
  $("[data-lb-prev]").addEventListener("click", function () { showLb(lbIdx - 1); });
  $("[data-lb-next]").addEventListener("click", function () { showLb(lbIdx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showLb(lbIdx - 1);
    if (e.key === "ArrowRight") showLb(lbIdx + 1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 45) showLb(lbIdx + (dx < 0 ? 1 : -1));
  });

  /* ---------- Gửi lên Google Sheet ---------- */
  function send(data) {
    if (!W.sheetUrl) return Promise.reject(new Error("no-url"));
    return fetch(W.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
  }
  function bindForm(form, build, onDone) {
    var msg = $("[data-msg]", form), btn = $('button[type="submit"]', form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = build(new FormData(form));
      if (!data) return;
      msg.className = "form-msg"; msg.textContent = "Đang gửi…"; btn.disabled = true;
      send(data).then(function () {
        msg.className = "form-msg ok";
        onDone(data, msg);
      }).catch(function (err) {
        msg.className = "form-msg err";
        msg.textContent = err.message === "no-url"
          ? "Thiệp chưa kết nối nơi lưu dữ liệu. Bạn vui lòng báo trực tiếp cho cô dâu chú rể nhé!"
          : "Gửi chưa được, bạn kiểm tra mạng và thử lại giúp mình nhé.";
      }).then(function () { btn.disabled = false; });
    });
  }
  function need(form, name, label) {
    var el = form.elements[name], v = (el.value || "").trim();
    if (!v) { el.focus(); var m = $("[data-msg]", form); m.className = "form-msg err"; m.textContent = "Bạn vui lòng nhập " + label + "."; return null; }
    return v;
  }

  // RSVP
  var rsvp = $("[data-rsvp]"), guests = 1, gOut = $("[data-guests]");
  if (guest) rsvp.elements.name.value = guest;
  $$("[data-step]", rsvp).forEach(function (b) {
    b.addEventListener("click", function () { guests = Math.max(1, Math.min(20, guests + +b.dataset.step)); gOut.textContent = guests; });
  });
  $$('input[name="attend"]', rsvp).forEach(function (r) {
    r.addEventListener("change", function () { $("[data-guests-row]").style.opacity = rsvp.elements.attend.value === "Không" ? .4 : 1; });
  });
  bindForm(rsvp, function (fd) {
    var name = need(rsvp, "name", "họ tên");
    if (!name) return null;
    return { type: "rsvp", name: name, side: fd.get("side"), attend: fd.get("attend"), guests: fd.get("attend") === "Không" ? 0 : guests, note: (fd.get("note") || "").trim() };
  }, function (d, msg) {
    msg.textContent = d.attend === "Không" ? "Cảm ơn bạn đã báo. Rất tiếc vì không gặp được bạn!" : "Cảm ơn " + d.name + "! Hẹn gặp bạn trong ngày vui.";
    store("thiep-rsvp", "1");
  });

  // Lời chúc
  var wishForm = $("[data-wish]"), list = $("[data-wish-list]");
  if (guest) wishForm.elements.name.value = guest;
  function wishItem(w) { return "<li><b>" + esc(w.name) + "</b><p>" + esc(w.message) + "</p></li>"; }
  bindForm(wishForm, function () {
    var name = need(wishForm, "name", "tên"); if (!name) return null;
    var message = need(wishForm, "message", "lời chúc"); if (!message) return null;
    return { type: "wish", name: name, message: message };
  }, function (d, msg) {
    msg.textContent = "Cảm ơn lời chúc của bạn! ♥";
    var empty = $(".empty", list); if (empty) empty.remove();
    list.insertAdjacentHTML("afterbegin", wishItem(d));
    wishForm.elements.message.value = "";
  });
  (function loadWishes() {
    if (!W.sheetUrl) { list.innerHTML = '<li class="empty">Hãy là người đầu tiên gửi lời chúc!</li>'; return; }
    fetch(W.sheetUrl + (W.sheetUrl.indexOf("?") < 0 ? "?" : "&") + "action=wishes")
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        list.innerHTML = rows && rows.length ? rows.map(wishItem).join("") : '<li class="empty">Hãy là người đầu tiên gửi lời chúc!</li>';
      })
      .catch(function () { list.innerHTML = '<li class="empty">Chưa tải được lời chúc, bạn thử tải lại trang nhé.</li>'; });
  })();

  /* ---------- Quà mừng ---------- */
  $("[data-gifts]").innerHTML = W.gifts.map(function (g, i) {
    return '<div class="gift"><h4>' + esc(g.who) + '</h4><img src="' + esc(g.qr) + '" alt="Mã QR ' + esc(g.bank) + " " + esc(g.account) +
      '" loading="lazy"><p class="bank">' + esc(g.bank) + '</p><p class="acc">' + esc(g.account) + '</p><p class="holder">' + esc(g.holder) +
      '</p><div class="actions"><button class="btn sm" type="button" data-copy="' + esc(g.account) + '">Sao chép STK</button>' +
      '<button class="btn sm ghost" type="button" data-qr="' + i + '">Tải QR</button></div></div>';
  }).join("");

  // Tải QR: tải sẵn ảnh vào bộ nhớ để bấm là lưu ngay. Trình duyệt trong Zalo/Facebook và iPhone
  // thường chặn hoặc làm chậm việc tải file -> mở QR toàn màn hình để khách nhấn giữ lưu ảnh.
  var UA = navigator.userAgent;
  var holdToSave = /Zalo|FBAN|FBAV|FB_IAB|Instagram|Line\/|MicroMessenger/i.test(UA) ||
    /iPad|iPhone|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var qrBlobs = {};
  function preloadQr() {
    W.gifts.forEach(function (g, i) {
      if (qrBlobs[i]) return;
      qrBlobs[i] = fetch(g.qr).then(function (r) { return r.blob(); }).catch(function () { delete qrBlobs[i]; return null; });
    });
  }
  if ("IntersectionObserver" in window) {
    var qio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { preloadQr(); qio.disconnect(); } }, { rootMargin: "600px" });
    qio.observe($("[data-gifts]"));
  } else preloadQr();

  var qrView = $("[data-qr-view]");
  function showQr(g) {
    $("[data-qr-img]").src = g.qr;
    $("[data-qr-name]").textContent = g.bank + " · " + g.account + " · " + g.holder;
    qrView.hidden = false; body.style.overflow = "hidden";
  }
  function hideQr() { qrView.hidden = true; body.style.overflow = ""; }
  $("[data-qr-close]").addEventListener("click", hideQr);
  qrView.addEventListener("click", function (e) { if (e.target === qrView) hideQr(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !qrView.hidden) hideQr(); });

  function downloadQr(i) {
    var g = W.gifts[i], name = "QR-" + g.holder.replace(/\s+/g, "-") + ".png";
    preloadQr();
    qrBlobs[i].then(function (blob) {
      if (!blob) { showQr(g); return; }
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      toast("Đã tải mã QR " + g.bank + " về máy");
    });
  }

  $("[data-gifts]").addEventListener("click", function (e) {
    var q = e.target.closest("[data-qr]");
    if (q) {
      var g = W.gifts[+q.dataset.qr];
      if (holdToSave) showQr(g); else downloadQr(+q.dataset.qr);
      return;
    }
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var v = b.dataset.copy;
    function done() { toast("Đã sao chép số tài khoản " + v); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(done, fallback); else fallback();
    function fallback() {
      var t = document.createElement("textarea"); t.value = v; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); done(); } catch (err) { toast("STK: " + v); }
      t.remove();
    }
  });

  /* ---------- Hiện dần khi cuộn ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Khởi tạo ---------- */
  var urlTheme = params.get("mau");
  applyTheme(W.themes[urlTheme] ? urlTheme : store("thiep-theme") || W.defaultTheme || "trang");
})();
