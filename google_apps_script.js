/**
 * GOOGLE APPS SCRIPT: SECURE API PROXY FOR HANA'S CHINESE LEARNING APP
 * 
 * Huong dan su dung:
 * 1. Truy cap https://script.google.com va dang nhap bang tai khoan Google cua chi.
 * 2. Nhan "New Project" (Du an moi).
 * 3. Xoa het code cu va dan toan bo doan code nay vao.
 * 4. Thay the gia tri cua GOOGLE_CHAT_WEBHOOK_URL bang link webhook nhom chat cua chi.
 * 5. Nhan nut Save (Bieu tuong dia mem).
 * 6. Nhan "Deploy" (Trien khai) -> "New deployment" (Trien khai moi).
 * 7. Chon loai trien khai la "Web app" (Ung dung Web) bang cach nhan vao bieu tuong banh rang.
 * 8. Cau hinh trien khai:
 *    - Description: Hana Chinese Proxy
 *    - Execute as (Thuc thi duoi danh nghia): Me (Toi)
 *    - Who has access (Ai co quyen truy cap): Anyone (Moi nguoi) -> Dieu nay rat quan trong de web goi duoc API!
 * 9. Nhan Deploy. Google se yeu cau cap quyen (Authorize Access), chi nhan "Continue", chon email, nhan "Advanced" va nhan "Go to Untitled project (unsafe)" roi nhan "Allow".
 * 10. Copy lay duong dan "Web app URL" (co dang https://script.google.com/macros/s/.../exec) 
 *     va dan vao tuc muc config.js o may cua chi.
 */

// 1. CAU HINH CAC MA KHOA BAO MAT (Nam an toan tren Cloud cua Google, khong bi lo ra ngoai)
const GEMINI_API_KEY = "DÁN_API_KEY_GEMINI_CỦA_CHỊ_VÀO_ĐÂY"; // API Key Google AI Studio (Thay thế mã khóa của chị ở đây)
const GOOGLE_CHAT_WEBHOOK_URL = "DÁN_LINK_WEBHOOK_GOOGLE_CHAT_VÀO_ĐÂY"; // Link webhook group chat

function doPost(e) {
  // Ho tro CORS
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
    
    // 3. Gui thong tin phieu diem va nhan xet cua AI den Google Chat Group
    sendToGoogleChat(student, lesson, score, date, aiComment);
    
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
  return ContentService.createTextOutput("Hana Chinese Proxy Active!")
                       .setHeaders({ "Access-Control-Allow-Origin": "*" });
}

// Ham goi Gemini API de nhan xet diem so cho be
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

// Ham gui thong tin va phieu diem qua Google Chat Webhook
function sendToGoogleChat(student, lesson, score, date, aiComment) {
  if (!GOOGLE_CHAT_WEBHOOK_URL || GOOGLE_CHAT_WEBHOOK_URL.includes("WEBHOOK")) {
    Logger.log("Chua cau hinh Webhook URL!");
    return;
  }
  
  // Xay dung giao dien dang the (Card V2) trong Google Chat cuc dep cho Hana
  const card = {
    cardsV2: [{
      cardId: "hanaScoreCard",
      card: {
        header: {
          title: `BÁO CÁO HỌC TẬP - ${student.toUpperCase()}`,
          subtitle: `Bài học: ${lesson}`,
          imageUrl: "https://fonts.gstatic.com/s/i/shortterm/release/googleglyph/36px.png",
          imageType: "CIRCLE"
        },
        sections: [
          {
            header: "Kết quả bài tập",
            widgets: [
              {
                decoratedText: {
                  startIcon: { emoji: "🏆" },
                  text: `<b>Điểm số: <font color=\"#10b981\">${score} / 50 điểm</font></b>`,
                  bottomLabel: `Ngày học: ${date}`
                }
              }
            ]
          },
          {
            header: "Nhận xét từ giáo viên AI ✏️",
            widgets: [
              {
                textParagraph: {
                  text: aiComment.replace(/\n/g, "<br>")
                }
              }
            ]
          },
          {
            widgets: [
              {
                buttonList: {
                  buttons: [{
                    text: "Xem Trang Học Tập",
                    onClick: {
                      openLink: {
                        url: "https://hanalearningchinese.github.io/"
                      }
                    }
                  }]
                }
              }
            ]
          }
        ]
      }
    }]
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(card),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(GOOGLE_CHAT_WEBHOOK_URL, options);
}
