# Hướng dẫn đưa sản phẩm của đội lên web

Mỗi thiết bị chính có một thư mục riêng:

- `public/products/opportunity/`
- `public/products/pioneer-11/`

## Các bước

1. Chép file sản phẩm vào đúng thư mục (ví dụ `video.mp4`, `audio.mp3`, ảnh truyện tranh `comic/trang-1.jpg`…).
2. Mở `manifest.json` trong thư mục đó và điền thông tin. Ví dụ đầy đủ:

```json
{
  "author": "Nguyễn Văn A",
  "title": "Opportunity — Bài hát cuối cùng trên Sao Hỏa",
  "description": "Bài nhạc kể lại 15 năm của Opportunity. Lời bài hát dựa trên dữ liệu NASA; phần lời 'cỗ máy tự nói' là sáng tạo.",
  "video": { "src": "video.mp4", "captions": "video.vtt", "transcript": "loi-thoai.txt" },
  "audio": { "src": "audio.mp3", "transcript": "loi-bai-hat.txt" },
  "comic": { "pages": ["comic/trang-1.jpg", "comic/trang-2.jpg"] }
}
```

- Không có dạng nào thì để `null` (ví dụ `"video": null`).
- Truyện tranh dạng PDF: `"comic": { "pdf": "truyen.pdf" }`.
- **Luôn kèm lời (transcript)** cho video và nhạc để người khiếm thính / khiếm thị đều tiếp cận được.

3. Tải lại trang web, sản phẩm sẽ tự hiện ở trang triển lãm, trang "Sản phẩm của đội" và poster.

## Lưu ý về độ chính xác

Sáng tạo thoải mái về hình thức, nhưng mọi ngày tháng / số liệu phải khớp dữ liệu trên web, ví dụ:

- Opportunity: tín hiệu cuối **10/06/2018** ≠ kết thúc sứ mệnh **13/02/2019**; tìm thấy **dấu vết nước**, không phải sự sống.
- Pioneer 11: liên lạc cuối **30/09/1995** ≠ dữ liệu kỹ thuật cuối **24/11/1995**; mang **Pioneer Plaque**, không phải Golden Record.
