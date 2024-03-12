// import thư viện
const express = require("express");
const mongoose = require("mongoose");
// Tạo đối tượng mới
const app = express();
app.set("view engine", "ejs");
// Kết nối với CSDL MongoDB
mongoose
  .connect(
    "mongodb+srv://dangquanghuy090298:huyhuy98@cluster0.x5ilo80.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Kết nối thành công với MongoDB");
  })
  .catch((error) => {
    console.error("Lỗi", error);
  });
// Truy vấn CSDL
// Định nghĩa mô hình cho bảng dữ liệu
const SinhVienSchema = new mongoose.Schema({
  masv: String,
  tensv: String,
});
// Chọn cơ sở dữ liệu để thao tác
const SinhVien = mongoose.model("sinhviens", SinhVienSchema, "db1");

// Tạo endpoint để lấy dữ liệu từ bảng "sinhvien"
app.get("/sinhvien", async (req, res) => {
  try {
    const sinhviens = await SinhVien.find({});
    res.render("sinhviens.ejs",{sinhviens:sinhviens})
    // res.json(sinhviens);
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu sinh viên", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi truy vấn dữ liệu sinh viên" });
  }
});

app.use(express.json()); // Middleware để phân tích JSON


// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server đang chạy ở cổng", PORT);
});

module.exports = app;
module.exports = SinhVien;
