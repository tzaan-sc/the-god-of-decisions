/**
 * Dữ liệu nội dung cuốn sách: "Vị Thần Của Những Quyết Định"
 * Chứa cấu trúc các chương, lời tựa và ngân hàng thông điệp chỉ dẫn ngẫu nhiên (Oracle Decisions)
 */

const BOOK_DATA = {
  title: "Vị Thần Của Những Quyết Định",
  subtitle: "Sách Chỉ Dẫn & Khai Mở Trực Giác",
  author: "Hội Đồng Những Kẻ Lữ Hành Vô Tận",
  edition: "Bản Khắc Huyền Bí - 2026",
  epigraph: "Mỗi ngã rẽ không phải là sự tình cờ. Vũ trụ đã chuẩn bị câu trả lời trước cả khi bạn tự hỏi chính mình.",

  // Các chương lý thuyết & chiêm nghiệm
  chapters: [
    {
      id: "preface",
      title: "Lời Ngỏ: Trước Khi Bạn Quyết Định",
      subtitle: "Khởi nguồn của mọi sự lựa chọn",
      pageNumber: 3,
      content: [
        "Có những thời khắc trong đời, bạn đứng trước hai con đường mờ ảo trong sương. Một con đường quen thuộc nhưng không còn mang lại sự hào hứng; một con đường xa lạ, phủ đầy bất định nhưng lại thôi thúc từng nhịp đập nơi lồng ngực.",
        "Cuốn sách này không đưa ra quyết định thay bạn. Nó là một tấm gương thần chiếu rọi điều sâu kín nhất mà linh hồn bạn vốn dĩ đã biết từ lâu nhưng lý trí vì sợ hãi mà chối bỏ.",
        "Khi bạn lật mở một trang, hãy đón nhận nó như một cơn gió định mệnh — không phán xét, không hoài nghi. Bởi vì câu trả lời bạn thấy chính là câu trả lời bạn đang cần nhất vào giây phút hiện tại."
      ]
    },
    {
      id: "chapter-1",
      title: "Chương I: Tiếng Thì Thầm Của Trực Giác",
      subtitle: "Ngôn ngữ không thành lời của linh hồn",
      pageNumber: 5,
      content: [
        "Trí tuệ phân tích thường nói rất lớn, dùng những logic chặt chẽ, số liệu và nỗi sợ để thuyết phục bạn. Nhưng trực giác — 'Vị thần quyết định' ngự trị bên trong bạn — chỉ nói bằng những tiếng thì thầm khẽ khàng.",
        "Đó là cảm giác lạnh sống lưng khi bước vào một mối quan hệ sai lầm; đó là sự bừng sáng nhẹ nhõm khi bạn nghĩ đến việc từ bỏ một gánh nặng không thuộc về mình.",
        "Để nghe được tiếng nói ấy, điều đầu tiên bạn cần làm không phải là suy nghĩ nhiều hơn, mà là làm dịu lại tâm trí đang cuộn sóng."
      ]
    },
    {
      id: "chapter-2",
      title: "Chương II: Nghệ Thuật Của Sự Chờ Đợi",
      subtitle: "Khi không hành động chính là hành động tối thượng",
      pageNumber: 7,
      content: [
        "Xã hội hiện đại dạy chúng ta phải luôn vội vã. 'Phải quyết định ngay lập tức', 'phải chớp lấy thời cơ', 'chậm trễ là thất bại'. Nhưng có những dòng nước chỉ trở nên trong vắt khi bạn thôi không khuấy động nó nữa.",
        "Chờ đợi không phải là trốn tránh, mà là tạo không gian cho những mảnh ghép tự tìm về đúng vị trí của nó.",
        "Nếu hôm nay bạn cảm thấy mịt mờ, hãy cho phép mình được dừng lại. Đêm tối nhất luôn là thời khắc ngay trước khi rạng đông xuất hiện."
      ]
    },
    {
      id: "chapter-3",
      title: "Chương III: Dũng Khí Bước Qua Vạch Kẻ",
      subtitle: "Bên kia nỗi sợ là sự tự do tuyệt đối",
      pageNumber: 9,
      content: [
        "Mọi sự tiếc nuối lớn nhất của con người hiếm khi đến từ những việc họ đã dũng cảm làm và thất bại, mà đến từ những quyết định họ đã chần chừ bỏ lỡ vì sợ hãi sự phán xét.",
        "An toàn là một ảo tưởng êm ái. Chiếc thuyền neo đậu trong bến cảng luôn an toàn, nhưng đó không phải là lý do người ta đóng nên những con thuyền vượt đại dương.",
        "Hãy bước qua vạch kẻ an toàn. Vũ trụ luôn có xu hướng nâng đỡ những đôi chân dám bước ra khỏi vùng quen thuộc."
      ]
    }
  ],

  // Ngân hàng 24 Lời Sấm Quyết Định (Oracle Decision Cards)
  oracleDecisions: [
    {
      code: "DECISION-01",
      rune: "ᚠ",
      verdict: "HÃY HÀNH ĐỘNG NGAY BÂY GIỜ",
      summary: "Mọi điều kiện cần thiết đã hội tụ đủ. Sự chần chừ lúc này chính là kẻ thù lớn nhất của bạn.",
      reflection: "Bạn đã suy nghĩ, cân nhắc và chuẩn bị quá đủ rồi. Những điều bạn còn e ngại thực chất chỉ là ảo ảnh của sự tự ti. Hãy hít một hơi thật sâu và bước bước chân đầu tiên ngay hôm nay.",
      actionPrompt: "Thực hiện ngay một hành động cụ thể trong vòng 24 giờ tới để biến ý định thành sự thật."
    },
    {
      code: "DECISION-02",
      rune: "ᚢ",
      verdict: "DỪNG LẠI VÀ QUAN SÁT",
      summary: "Đây không phải là thời điểm thích hợp để tiến lên. Hãy lùi lại một bước để nhìn toàn cảnh.",
      reflection: "Nước đang đục, nếu bạn tiếp tục khuấy động thì sẽ càng mất phương hướng. Hãy đứng yên, quan sát phản ứng của mọi người và các dấu hiệu xung quanh trước khi đưa ra cam kết.",
      actionPrompt: "Tạm gác quyết định này lại trong 3 ngày. Giữ tâm trí tĩnh lặng như mặt hồ phẳng lặng."
    },
    {
      code: "DECISION-03",
      rune: "ᚦ",
      verdict: "TIN VÀO LINH CẢM ĐẦU TIÊN",
      summary: "Ấn tượng đầu tiên xuất hiện trong tâm trí bạn chính là lời giải chính xác nhất.",
      reflection: "Khi bạn bắt đầu phân tích quá nhiều, bạn đã để nỗi sợ hãi chiếm quyền điều khiển. Hãy nhớ lại cảm giác đầu tiên bạn có khi vừa đối diện với tình huống này. Đó chính là la bàn chỉ lối.",
      actionPrompt: "Hãy chọn phương án mà trái tim bạn đã rung động ngay từ giây đầu tiên."
    },
    {
      code: "DECISION-04",
      rune: "ᚨ",
      verdict: "BUÔNG BỎ ĐIỀU ĐÃ CŨ",
      summary: "Chiếc cốc phải rỗng mới có thể chứa được nguồn nước mát lành mới.",
      reflection: "Bạn đang cố níu giữ một điều đã không còn phù hợp với con người hiện tại của bạn. Sự gắn bó này không phải là tình yêu hay sự kiên trì, mà chỉ là thói quen và sự ngại thay đổi.",
      actionPrompt: "Dũng cảm chấm dứt hoặc nói lời từ chối dứt khoát với điều đang làm hao mòn năng lượng của bạn."
    },
    {
      code: "DECISION-05",
      rune: "ᚱ",
      verdict: "CON ĐƯỜNG GIAN NAN MỚI LÀ CHÂN ĐẠO",
      summary: "Lựa chọn khó khăn hơn ở hiện tại sẽ mang lại phần thưởng ngọt ngào nhất trong tương lai.",
      reflection: "Đừng chọn lối đi tắt chỉ vì nó bằng phẳng. Sự tôi luyện trong thử thách sẽ đánh thức những sức mạnh tiềm ẩn mà bạn chưa từng biết mình sở hữu.",
      actionPrompt: "Đón nhận thử thách với nụ cười. Hãy tự nhủ: 'Đây là cơ hội để mình trở nên mạnh mẽ hơn bao giờ hết'."
    },
    {
      code: "DECISION-06",
      rune: "ᚲ",
      verdict: "TÌM KIẾM MỘT GÓC NHÌN MỚI",
      summary: "Bạn không thể giải quyết vấn đề bằng chính hệ tư duy đã tạo ra nó.",
      reflection: "Hãy trò chuyện với một người ngoài cuộc, đọc một cuốn sách thuộc lĩnh vực xa lạ, hoặc nhìn nhận vấn đề từ vị trí của đối phương. Lời giải đang nằm ngay bên ngoài chiếc hộp tư duy quen thuộc.",
      actionPrompt: "Hỏi ý kiến của một người bạn tin tưởng nhưng có quan điểm sống hoàn toàn khác biệt với bạn."
    },
    {
      code: "DECISION-07",
      rune: "ᚷ",
      verdict: "HÃY CHO ĐI KHÔNG TOAN TÍNH",
      summary: "Chìa khóa mở ra cánh cửa bế tắc nằm ở lòng bao dung và sự hào phóng.",
      reflection: "Khi bạn tập trung vào việc mình sẽ 'được' gì, áp lực sẽ đè nặng. Khi bạn chuyển hướng suy nghĩ sang việc mình có thể 'giúp' gì hoặc mang lại giá trị gì cho người khác, con đường tự khắc sáng tỏ.",
      actionPrompt: "Làm một việc tốt bí mật hoặc gửi lời cảm ơn chân thành đến người đã đồng hành cùng bạn."
    },
    {
      code: "DECISION-08",
      rune: "ᚹ",
      verdict: "CHẤP NHẬN SỰ KHÔNG HOÀN HẢO",
      summary: "Hoàn thành tốt hơn hoàn hảo. Đừng để chủ nghĩa cầu toàn giam cầm bạn.",
      reflection: "Một kế hoạch 80% được thực thi với 100% đam mê sẽ luôn đánh bại một kế hoạch 100% hoàn hảo nằm mãi trên trang giấy. Hãy đón nhận những tì vết như một phần của vẻ đẹp tự nhiên.",
      actionPrompt: "Công bố hoặc bấm nút gửi ngay dự án mà bạn đang do dự chỉnh sửa suốt nhiều ngày qua."
    },
    {
      code: "DECISION-09",
      rune: "ᚺ",
      verdict: "CÂU TRẢ LỜI LÀ: CÓ!",
      summary: "Ánh sáng xanh đã bật. Hãy mỉm cười và tự tin đón nhận vận hội mới.",
      reflection: "Vũ trụ đang gửi tín hiệu đồng thuận mạnh mẽ đến bạn. Mọi sự nghi ngờ lúc này chỉ là tàn dư của quá khứ. Bạn hoàn toàn xứng đáng với những điều tuyệt vời đang đến.",
      actionPrompt: "Nói 'CÓ' với cơ hội này và ăn mừng một cách tự hào."
    },
    {
      code: "DECISION-10",
      rune: "ᚾ",
      verdict: "CÂU TRẢ LỜI LÀ: KHÔNG!",
      summary: "Lời từ chối lúc này là tấm khiên bảo vệ bạn khỏi những rắc rối khôn lường.",
      reflection: "Không phải mọi cánh cửa mở ra đều dành cho bạn. Biết nói 'Không' với những điều không xứng đáng là đỉnh cao của sự trưởng thành và tự trọng.",
      actionPrompt: "Lịch sự nhưng kiên quyết từ chối. Hãy bảo vệ ranh giới và năng lượng thiêng liêng của bạn."
    },
    {
      code: "DECISION-11",
      rune: "ᛁ",
      verdict: "KIÊN NHẪN, THỜI ĐIỂM CHƯA ĐẾN",
      summary: "Quả chưa chín thì không nên hái. Hãy tiếp tục vun trồng và tin tưởng quy luật mùa màng.",
      reflection: "Mỗi hạt mầm đều cần thời gian nằm trong lòng đất tối trước khi vươn mình đón ánh mặt trời. Nóng vội chỉ làm hỏng việc lớn. Sự bình thản là sức mạnh vô địch lúc này.",
      actionPrompt: "Hít thở sâu, tập trung làm tốt nhiệm vụ nhỏ hàng ngày thay vì trông ngóng kết quả cuối cùng."
    },
    {
      code: "DECISION-12",
      rune: "ᛃ",
      verdict: "CHỮA LÀNH TRƯỚC, QUYẾT ĐỊNH SAU",
      summary: "Đừng đưa ra quyết định hệ trọng khi tâm hồn bạn còn đang mang vết thương.",
      reflection: "Quyết định đưa ra trong lúc tức giận, cô đơn hoặc đau buồn thường chỉ là phản ứng tự vệ mù quáng. Hãy ôm ấp chính mình, nghỉ ngơi và hồi phục năng lượng trước.",
      actionPrompt: "Dành trọn vẹn buổi tối hôm nay cho việc thư giãn, tắm nước ấm và ngủ một giấc thật sâu."
    },
    {
      code: "DECISION-13",
      rune: "ᛇ",
      verdict: "TỰ DO NẰM Ở SỰ TRUNG THỰC",
      summary: "Hãy nói ra sự thật dù giọng bạn có run rẩy.",
      reflection: "Sự mập mờ và những lời nói dối vô hại đang tạo nên một mê cung mệt mỏi trong tâm trí bạn. Chỉ có sự thật trần trụi mới có sức mạnh giải phóng bạn và mọi người xung quanh.",
      actionPrompt: "Mở lòng và bày tỏ cảm xúc chân thật nhất với người có liên quan."
    },
    {
      code: "DECISION-14",
      rune: "ᛈ",
      verdict: "MỘT BẤT NGỜ THÚ VỊ ĐANG CHỜ ĐÓN",
      summary: "Hãy mở rộng dung lượng đón nhận, điều kỳ diệu sẽ đến theo cách không ngờ nhất.",
      reflection: "Bạn đang đóng khung tương lai vào những kịch bản hạn hẹp của lý trí. Cuộc sống luôn giàu trí tưởng tượng hơn bạn rất nhiều. Hãy chuẩn bị tâm thế cho một bước ngoặt đầy kỳ diệu.",
      actionPrompt: "Thử làm một việc khác biệt với thói quen hàng ngày: đi con đường khác, thử món ăn mới."
    },
    {
      code: "DECISION-15",
      rune: "ᛉ",
      verdict: "HÃY BẢO VỆ NĂNG LƯỢNG CỦA BẠN",
      summary: "Rút lui khỏi những tranh cãi vô bổ và những môi trường độc hại.",
      reflection: "Bạn không có nghĩa vụ phải sửa chữa mọi người hay giải thích bản thân với những kẻ không có thiện chí. Giữ gìn sự bình an nội tâm là ưu tiên cao nhất.",
      actionPrompt: "Tắt thông báo điện thoại, rời khỏi cuộc trò chuyện tiêu cực ngay lập tức."
    },
    {
      code: "DECISION-16",
      rune: "ᛋ",
      verdict: "ÁNH SÁNG ĐÃ Ở CUỐI ĐƯỜNG HẦM",
      summary: "Giai đoạn thử thách tột cùng sắp khép lại. Bình minh đang chuẩn bị hé rạng.",
      reflection: "Đừng bỏ cuộc ngay trước bước ngoặt chiến thắng. Mọi đau đớn và mồ hôi bạn đổ xuống đều đang đúc kết nên một phiên bản rực rỡ và vững vàng hơn bao giờ hết.",
      actionPrompt: "Tự vỗ vai động viên mình: 'Mình đã đi được xa đến thế này, mình nhất định sẽ làm được'."
    }
  ]
};

if (typeof window !== "undefined") {
  window.BOOK_DATA = BOOK_DATA;
}
