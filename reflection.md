# Individual reflection — Hoàng Thị Thanh Tuyền (2A202600074)

## 1. Role

Đảm nhiệm vai trò AI Logic, chịu trách nhiệm viết system prompt, xây dựng các node explain, node suggest và lab knowlegde base cho AI.

## 2. Đóng góp cụ thể

- Viết system prompt là knowlegde base cho phiên bản v1 của sản phẩm.
- Xây dựng explain node gồm LLM và fallback logic, build prompt có context.
- Xây dựng suggest node là recommendation logic, tạo logic gợi ý hành động dựa trên severity

## 3. SPEC mạnh/yếu

- Mạnh nhất: Safety & Boundary Definition: spec xác định rất rõ là AI không chẩn đoán, không kê thuốc và luôn từ chối trách nhiệm. Điều này giúp triển khai rõ ràng tránh mơ hồ khi viết prompt.
- Yếu nhất: Spec chưa định nghĩa rõ các node kết nối với nhau trong pipeline thực tế, dẫn đến khi implement phải suy luận workflow. Nếu Spec có thêm 1 sơ đồ flow Langraph thì sẽ implement nhanh và ít lỗi hơn.

## 4. Đóng góp khác

- Làm slides và đi đánh giá các nhóm cùng zone Vinmec 1.

## 5. Điều học được

Trước hackathon LLM đủ tốt thì chỉ cần prompt là xong. Sau hackathon học được rằng: trong hệ thống production đặc biệt là healthcare, LLM chỉ nên là một phần augment và không bao giờ là core logic duy nhất.

## 6. Nếu làm lại

Sẽ phân tách rõ 3 layer từ đầu: Data layer (normalize), Logic layer (severity, rule), LLM layer (explain)

## 7. AI giúp gì / AI sai gì

- **Giúp:** dùng ChatGPT, hỗ sợ viết system prompt và gợi ý structure hợp lý cho node. Dùng Codex để viết code, xây dựng các hàm cụ thể và tạo test cases nhanh.
- **Sai/mislead:** ChatGPT đề xuất kiến trúc quá phức tạp, một số suggest không phù hợp với data thực (giả định schema không tồn tại).
  Bài học rút ra: AI rất mạnh trong việc tăng tốc, nhưng vẫn cần người kiểm soát logic hệ thống và đảm bảo phù hợp với spec và thực tế dữ liệu.
