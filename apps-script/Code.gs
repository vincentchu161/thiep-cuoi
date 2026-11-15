/**
 * Google Apps Script lưu RSVP + Sổ lưu bút cho thiệp cưới.
 * Cách cài: xem README.md (mục "Kết nối Google Sheet").
 */
var SHEET_RSVP = "RSVP";
var SHEET_WISH = "LoiChuc";

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sh;
}

function clean_(v, max) {
  v = String(v == null ? "" : v).trim().slice(0, max || 300);
  // tránh công thức bị chèn vào Sheet
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var p = (e && e.parameter) || {};
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    if (p.type === "rsvp") {
      sheet_(SHEET_RSVP, ["Thời gian", "Họ tên", "Khách của", "Tham dự", "Số người", "Lời nhắn"]).appendRow([
        new Date(), clean_(p.name, 80), clean_(p.side, 20), clean_(p.attend, 20), Number(p.guests) || 0, clean_(p.note, 300),
      ]);
    } else if (p.type === "wish") {
      sheet_(SHEET_WISH, ["Thời gian", "Tên", "Lời chúc", "Hiển thị"]).appendRow([
        new Date(), clean_(p.name, 80), clean_(p.message, 500), true,
      ]);
    } else {
      return json_({ ok: false, error: "unknown type" });
    }
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/** GET ?action=wishes → 100 lời chúc mới nhất (bỏ những dòng cột "Hiển thị" = FALSE). */
function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action !== "wishes") return json_({ ok: true });
  var sh = sheet_(SHEET_WISH, ["Thời gian", "Tên", "Lời chúc", "Hiển thị"]);
  var rows = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues() : [];
  var out = rows
    .filter(function (r) { return r[3] !== false && String(r[3]).toUpperCase() !== "FALSE"; })
    .map(function (r) { return { name: String(r[1]).replace(/^'/, ""), message: String(r[2]).replace(/^'/, "") }; })
    .reverse()
    .slice(0, 100);
  return json_(out);
}
