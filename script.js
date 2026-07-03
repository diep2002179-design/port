const printButton = document.getElementById("printResume");
const downloadButton = document.getElementById("downloadResume");

const handlePrint = () => {
  window.print();
};

const handleDownload = () => {
  // Trình duyệt chặn đọc file:/// vào canvas để xuất PDF do chính sách bảo mật CORS.
  // Khi chạy online trên GitHub Pages hoặc Local Server (http://), chức năng tải trực tiếp sẽ chạy tốt.
  if (window.location.protocol === 'file:') {
    alert('Trình duyệt không cho phép tạo file PDF trực tiếp khi mở file offline từ máy tính (giao thức file://). \n\nHệ thống sẽ chuyển hướng qua hộp thoại In (Hãy chọn "Save as PDF" để lưu về máy). \n\nKhi bạn đăng trang web này lên GitHub, nút tải xuống trực tiếp này sẽ hoạt động bình thường!');
    window.print();
    return;
  }

  const element = document.querySelector('.resume-paper');
  const actions = document.querySelector('.paper-actions');
  
  if (actions) {
    actions.style.setProperty('display', 'none', 'important');
  }
  
  const opt = {
    margin:       0,
    filename:     'Y-Diep-CV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2.5, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(element).save().then(() => {
    if (actions) {
      actions.style.removeProperty('display');
    }
  }).catch(err => {
    console.error('PDF download error:', err);
    if (actions) {
      actions.style.removeProperty('display');
    }
  });
};

if (printButton) {
  printButton.addEventListener("click", handlePrint);
}

if (downloadButton) {
  downloadButton.addEventListener("click", handleDownload);
}
