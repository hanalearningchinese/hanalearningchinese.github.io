/**
 * GOOGLE APPS SCRIPT: SECURE API PROXY FOR HANA'S CHINESE LEARNING APP (TELEGRAM EDITION)
 * 
 * Huong dan su dung:
 * 1. Truy cap https://script.google.com va dang nhap bang Gmail cua chi.
 * 2. Nhan "New Project" (Du an moi).
 * 3. Xoa het code cu va dan toan bo doan code nay vao.
 * 4. Nhan nut Save (Bieu tuong dia mem).
 * 5. Nhan "Deploy" (Trien khai) -> "New deployment" (Trien khai moi).
 * 6. Chon loai trien khai la "Web app" (Ung dung Web) bang cach nhan vao bieu tuong banh rang.
 * 7. Cau hinh trien khai:
 *    - Description: Hana Chinese Telegram Proxy
 *    - Execute as: Me (Toi)
 *    - Who has access: Anyone (Moi nguoi)
 * 8. Nhan Deploy. Google se yeu cau cap quyen (Authorize Access), chi nhan tiep tuc va cho phep.
 * 9. Copy lay duong dan "Web app URL" (co dang https://script.google.com/macros/s/.../exec) 
 *     va dan vao file config.js o may cua chi.
 */

// 1. CAU HINH BAO MAT (Chay tren Cloud cua Google, an toan hoan toan)
const GEMINI_API_KEY = "DÁN_API_KEY_GEMINI_CỦA_CHỊ_VÀO_ĐÂY"; // API Key Google AI Studio
const TELEGRAM_BOT_TOKEN = "DÁN_TELEGRAM_BOT_TOKEN_CỦA_CHỊ_VÀO_ĐÂY"; // Token Bot Telegram cua chi
const TELEGRAM_CHAT_ID = "DÁN_TELEGRAM_CHAT_ID_CỦA_CHỊ_VÀO_ĐÂY"; // ID nhom chat Telegram
const TELEGRAM_THREAD_ID = 2; // ID Topic 2 (message_thread_id)

function doPost(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  try {
    const data = JSON.parse(e.postData.contents);
    const student = data.student || "Hana";
    const lesson = data.lesson || "Bai hoc";
    const score = data.score !== undefined ? data.score : 0;
    const date = data.date || new Date().toLocaleDateString('vi-VN');
    
    // 2. Goi Google AI Studio (Gemini API) de lay nhan xet
    const aiComment = getGeminiComment(student, lesson, score);
    
    // 3. Gui thong bao diem va nhan xet cua AI vao Telegram Group (co Topic)
    sendToTelegram(student, lesson, score, date, aiComment);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", aiComment: aiComment }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Hana Chinese Telegram Proxy Active!")
                       .setHeaders({ "Access-Control-Allow-Origin": "*" });
}

// Ham goi Gemini API de lay nhan xet
function getGeminiComment(student, lesson, score) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `Bạn là một giáo viên dạy tiếng Trung vui vẻ, yêu trẻ con và luôn khuyến khích học sinh. 
Hãy viết một lời nhận xét ngắn gọn (khoảng 3-4 câu) bằng Tiếng Việt dành cho bé tên là ${student} vừa hoàn thành bài học "${lesson}" với số điểm là ${score}/50 điểm.
Yêu cầu:
- Nếu điểm tối đa (50/50): Khen ngợi nồng nhiệt, gọi bé là "siêu nhân tiếng Trung", khuyến khích bé tiếp tục giữ vững phong độ.
- Nếu điểm trung bình/cao (30-40): Động viên bé đã làm rất tốt, chỉ ra rằng chỉ cần cẩn thận hơn một chút nữa là sẽ đạt điểm tuyệt đối.
- Nếu điểm thấp (<30): Động viên ngọt ngào, nói rằng việc học từ mới luôn cần thời gian và tin chắc lần sau bé sẽ làm tốt hơn.
Hãy giữ giọng văn dễ thương, sử dụng các biểu tượng cảm xúc (emoji) sinh động.`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());
    if (json.candidates && json.candidates[0].content.parts[0].text) {
      return json.candidates[0].content.parts[0].text.trim();
    }
    return "Con đã hoàn thành bài học rất tốt! Cố gắng phát huy con nhé! ❤️";
  } catch (err) {
    return "Chúc mừng con đã hoàn thành bài tập học tiếng Trung xuất sắc! ❤️";
  }
}

// Ham gui tin nhan dang HTML vao dung Topic 2 cua Telegram Group
function sendToTelegram(student, lesson, score, date, aiComment) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const text = `🏆 <b>BÁO CÁO HỌC TẬP - ${student.toUpperCase()}</b>\n\n` +
               `📚 <b>Bài học:</b> ${lesson}\n` +
               `📅 <b>Ngày học:</b> ${date}\n` +
               `⭐ <b>Điểm số:</b> <code>${score} / 50 điểm</code>\n\n` +
               `✏️ <b>Nhận xét từ giáo viên AI:</b>\n<i>${aiComment}</i>\n\n` +
               `🔗 <a href="https://hanalearningchinese.github.io/">Vào Trang Học Tập Của Hana</a>`;
               
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    message_thread_id: TELEGRAM_THREAD_ID,
    text: text,
    parse_mode: "HTML",
    disable_web_page_preview: true
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(url, options);
}
