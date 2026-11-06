export type QuestionOption = "A" | "B" | "C" | "D";

export type ExamQuestion = {
  id: number;
  question_number: number;
  topic: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: QuestionOption;
  explanation: string;
};

export const QUESTION_BANK: ExamQuestion[] = [
  {
    id: 1,
    question_number: 1,
    topic: "NOO Registration",
    question_text:
      "Salesman telah menginput toko baru melalui SFA. Sales Supervisor perlu mengambil data tersebut agar dapat diteruskan ke HO. Menu yang paling sesuai untuk tahap ini adalah?",
    option_a: "Route Management",
    option_b: "NOO Registration Report",
    option_c: "Route Feedback",
    option_d: "Report Distribution",
    correct_option: "B",
    explanation:
      "NOO Registration Report digunakan untuk mengambil data toko baru hasil input salesman. Alurnya dilanjutkan oleh Sales Supervisor dengan mengunduh data dan meneruskannya ke HO.",
  },
  {
    id: 2,
    question_number: 2,
    topic: "NOO Registration",
    question_text: "Manakah urutan proses NOO Registration yang sesuai?",
    option_a:
      "Salesman mengunggah data di SFA, HO mengunduhnya, lalu SPV menetapkan approval akhir.",
    option_b:
      "SPV membuat toko baru di Route Management, lalu salesman mengirimkan data toko ke HO.",
    option_c:
      "Salesman input NOO di SFA; SPV unduh data lalu ajukan ke HO untuk approval.",
    option_d:
      "HO menyetujui data lebih dahulu, lalu salesman mencatat toko tersebut di aplikasi SFA.",
    correct_option: "C",
    explanation:
      "Materi menyebutkan salesman mengunggah toko baru di SFA, Sales Supervisor mengunduh data, kemudian menaikkannya ke HO untuk di-accept/di-approve.",
  },
  {
    id: 3,
    question_number: 3,
    topic: "Route Management",
    question_text:
      "Sebuah toko baru sudah terdaftar, tetapi status persetujuan HO belum diberikan. Sales Supervisor ingin menambahkan toko tersebut ke rute salesman. Tindakan yang sesuai adalah?",
    option_a:
      "Menunggu persetujuan HO, kemudian menambahkan toko ke rute melalui Route Management.",
    option_b:
      "Menambahkan toko melalui Route Feedback sambil menunggu persetujuan dari HO.",
    option_c:
      "Memasukkan toko melalui NOO Registration Report sebagai pengganti proses persetujuan HO.",
    option_d:
      "Mendaftarkan toko melalui Report Distribution agar otomatis tercantum pada rute salesman.",
    correct_option: "A",
    explanation:
      "Route Management dapat digunakan untuk menambahkan rute baru dari toko yang sudah disetujui oleh HO. Materi tidak menyebutkan bahwa toko yang belum disetujui dapat langsung ditambahkan.",
  },
  {
    id: 4,
    question_number: 4,
    topic: "Route Feedback",
    question_text:
      "Salesman telah kembali ke depo. Sales Supervisor ingin mengecek kesesuaian rute yang direncanakan dengan rute aktual pada hari tersebut. Menu yang tepat adalah?",
    option_a: "Route Management",
    option_b: "Report Distribution",
    option_c: "NOO Registration Report",
    option_d: "Route Feedback",
    correct_option: "D",
    explanation:
      "Route Feedback digunakan untuk melihat route plan dan route actual. Materi menjelaskan pengecekan dapat dilakukan setelah salesman kembali ke depo.",
  },
  {
    id: 5,
    question_number: 5,
    topic: "Route Management vs Route Feedback",
    question_text:
      "Sales Supervisor memiliki dua kebutuhan: (1) mengubah rute salesman dan menambah toko yang telah disetujui HO; (2) memeriksa route plan dan route actual setelah salesman kembali. Kombinasi menu yang benar adalah?",
    option_a:
      "Route Feedback untuk mengubah rute; Route Management untuk membandingkan plan dan actual.",
    option_b:
      "Route Management untuk mengubah rute; Route Feedback untuk membandingkan plan dan actual.",
    option_c:
      "NOO Registration Report untuk mengubah rute; Route Management untuk membandingkan plan dan actual.",
    option_d:
      "Report Distribution untuk mengubah rute; Route Feedback untuk membandingkan plan dan actual.",
    correct_option: "B",
    explanation:
      "Route Management berfungsi membuat, mengubah, mengatur, menghapus, dan menambah rute dari toko yang disetujui HO. Route Feedback digunakan untuk melihat route plan dan route actual.",
  },
  {
    id: 6,
    question_number: 6,
    topic: "Delivery Order Report",
    question_text:
      "Sales Supervisor membutuhkan data seluruh transaksi yang dilakukan salesman untuk memantau hasil penjualan. Laporan yang paling relevan adalah?",
    option_a: "Report Repeat Order",
    option_b: "Report Sales Trends",
    option_c: "Delivery Order Report",
    option_d: "Report Sales Ranking",
    correct_option: "C",
    explanation:
      "Delivery Order Report digunakan untuk melihat semua transaksi yang dilakukan salesman dan menjadi dasar evaluasi penjualan.",
  },
  {
    id: 7,
    question_number: 7,
    topic: "Report Trade Promo",
    question_text:
      "Setelah suatu program promosi berjalan, Sales Supervisor ingin memeriksa program apa saja yang telah dilaksanakan salesman di lapangan. Menu yang dipilih adalah?",
    option_a: "Report POSM",
    option_b: "Report Distribution",
    option_c: "Report Repeat Order",
    option_d: "Report Trade Promo / Report Trade Promo Detail",
    correct_option: "D",
    explanation:
      "Report Trade Promo digunakan untuk melihat laporan program yang sudah berjalan di lapangan, termasuk detail program yang sudah dijalankan salesman.",
  },
  {
    id: 8,
    question_number: 8,
    topic: "Report AR Aging",
    question_text:
      "Dalam pemeriksaan piutang, Sales Supervisor perlu mengetahui customer yang belum melunasi hutang beserta tanggal jatuh temponya. Tindak lanjut yang dinyatakan dalam materi adalah?",
    option_a: "Buka Report AR Aging",
    option_b: "Buka Report Payment History",
    option_c: "Buka Report Delivery Order",
    option_d: "Buka Report Remain Stock Customer",
    correct_option: "A",
    explanation:
      "Report AR Aging digunakan untuk memantau hutang customer yang belum lunas berdasarkan tanggal jatuh tempo.",
  },
  {
    id: 9,
    question_number: 9,
    topic: "Report Remain Stock Customer",
    question_text:
      "Sales Supervisor ingin memantau jumlah stok rokok yang masih tersedia di toko. Menu apa yang digunakan di DMS?",
    option_a: "Delivery Order Report",
    option_b: "Sales Ranking",
    option_c: "Remain Stock Customer",
    option_d: "Report Distribution",
    correct_option: "C",
    explanation:
      "Report Remain Stock Customer menampilkan jumlah stok customer saat ini. Data berfungsi untuk pengawasan stok di outlet.",
  },
  {
    id: 10,
    question_number: 10,
    topic: "Report Repeat Order",
    question_text:
      "Sales Supervisor ingin mengidentifikasi salesman yang menghasilkan penjualan berulang serta melihat jumlah penjualan berulang tersebut. Menu yang paling tepat adalah?",
    option_a: "Report Sales Trends",
    option_b: "Report Repeat Order",
    option_c: "Report Sales Ranking",
    option_d: "Delivery Order Report",
    correct_option: "B",
    explanation:
      "Report Repeat Order digunakan untuk melihat salesman yang terjadi penjualan berulang serta jumlah repeat order dan performa tersebut.",
  },
  {
    id: 11,
    question_number: 11,
    topic: "Report Sales Ranking",
    question_text:
      "Hasil laporan mingguan menunjukkan seorang salesman memiliki jumlah produk terjual paling sedikit dibandingkan rekan lainnya. Menu yang sesuai adalah?",
    option_a: "Report Sales Trends",
    option_b: "Report Repeat Order",
    option_c: "Report Distribution",
    option_d: "Sales Ranking",
    correct_option: "D",
    explanation:
      "Report Sales Ranking menyusun ranking salesman berdasarkan jumlah produk terjual, sehingga salesman dengan produksi paling sedikit akan muncul di ranking bawah.",
  },
  {
    id: 12,
    question_number: 12,
    topic: "Report Sales Trends",
    question_text:
      "Sales Supervisor ingin mengetahui apakah penjualan seorang salesman meningkat atau menurun dari satu hari ke hari berikutnya. Menu yang sesuai adalah?",
    option_a: "Report Sales Trends",
    option_b: "Report Sales Ranking",
    option_c: "Report Repeat Order",
    option_d: "Delivery Order Report",
    correct_option: "A",
    explanation:
      "Report Sales Trends digunakan untuk melihat tren penjualan setiap salesman, apakah naik atau turun dari hari ke hari.",
  },
  {
    id: 13,
    question_number: 13,
    topic: "Report Distribution",
    question_text:
      "Dalam evaluasi saleslman, Sales Supervisor perlu mengetahui jumlah toko yang dicover masing-masing salesman. Menu yang sesuai adalah?",
    option_a: "Report Sales Ranking",
    option_b: "Report Remain Stock Customer",
    option_c: "Report Distribution",
    option_d: "Report Sales Trends",
    correct_option: "C",
    explanation:
      "Report Distribution digunakan untuk melihat jumlah distribusi toko yang dicover oleh setiap salesman.",
  },
  {
    id: 14,
    question_number: 14,
    topic: "Sales Ranking vs Sales Trends",
    question_text:
      "Dua analisis dibutuhkan secara bersamaan: (1) membandingkan jumlah produk terjual antar-salesman setiap minggu; (2) melihat arah perubahan penjualan seorang salesman setiap hari. Pasangan menu yang tepat adalah?",
    option_a: "Report Sales Trends untuk (1), dan Report Repeat Order untuk (2).",
    option_b: "Sales Ranking untuk (1), dan Report Sales Trends untuk (2).",
    option_c: "Report Distribution untuk (1), dan Sales Ranking untuk (2).",
    option_d: "Report Repeat Order untuk (1), dan Report Distribution untuk (2).",
    correct_option: "B",
    explanation:
      "Sales Ranking menampilkan ranking berdasarkan jumlah produk terjual tiap minggu, sedangkan Report Sales Trends menunjukkan arah perubahan penjualan per hari.",
  },
  {
    id: 15,
    question_number: 15,
    topic: "Struktur Menu DMS – Trade Promo Detail",
    question_text:
      "Saat mencari Report Trade Promo Detail pada daftar CPS Supervisor Menu, kombinasi Menu yang tepat adalah?",
    option_a: "Marketing – Marketing Report.",
    option_b: "Sales – Sales Report.",
    option_c: "General – General Approval.",
    option_d: "Inventory – Inventory Report.",
    correct_option: "A",
    explanation:
      "Report Trade Promo Detail tercatat pada Module Marketing dengan Menu Marketing Report.",
  },
];

export const publicQuestionBank = QUESTION_BANK.map(({ question_number, topic, question_text, option_a, option_b, option_c, option_d }) => ({
  question_number,
  topic,
  question_text,
  options: [
    { label: "A", text: option_a },
    { label: "B", text: option_b },
    { label: "C", text: option_c },
    { label: "D", text: option_d },
  ],
}));

export const QUESTION_COUNT = QUESTION_BANK.length;
export const EXAM_DURATION_SECONDS = 30 * 60;
