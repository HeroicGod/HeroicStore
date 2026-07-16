import React, { useState, useEffect, useRef } from "react";

interface PaketOpsi {
  namaPaket: string;
  harga: number;
}

interface Produk {
  id: number;
  nama: string;
  kategori: string;
  gambar: string;
  keterangan: string;
  terlaris: boolean;
  linkDownload: string;
  opsi: PaketOpsi[];
}

interface Snowflake {
  id: number;
  left: string;
  duration: string;
  widthHeight: string;
  opacity: number;
  delay: string;
}

interface Toast {
  id: number;
  pesan: string;
  tipe: 'success' | 'error';
}

const daftarProduk: Produk[] = [
  { id: 1, nama: "Rapid Core Cracked", kategori: "Panel", gambar: "images/rapid.jpg", keterangan: "Panel Root ekternal safe", terlaris: true, linkDownload: "https://www.mediafire.com/file/rjgxd0ddy1qe5lw/RAPID+V1+ROOT+PS+sign.apk", opsi: [{ namaPaket: "1 Hari", harga: 10000 }, { namaPaket: "7 Hari", harga: 35000 }, { namaPaket: "30 Hari", harga: 100000 }] },
  { id: 2, nama: "Pato Team Orange", kategori: "Panel", gambar: "images/pato.jpg", keterangan: "loader apkmod free fire full fitur", terlaris: false, linkDownload: "#", opsi: [{ namaPaket: "3 Hari", harga: 55000 }, { namaPaket: "7 Hari", harga: 75000 }, { namaPaket: "30 Hari", harga: 181000 }] },
  { id: 3, nama: "Br Mods Ekternal", kategori: "Panel", gambar: "images/share.jpg", keterangan: "loader free fire panel ekternal anti-bl", terlaris: true, linkDownload: "#", opsi: [{ namaPaket: "1 Hari", harga: 20000 }, { namaPaket: "7 Hari", harga: 65000 }] },
  { id: 4, nama: "Drip Client", kategori: "Apkmod", gambar: "images/dripc.jpg", keterangan: "loader free fire all server no root. Nb: masuk ke saluran telegram untuk update apkmod", terlaris: false, linkDownload: "#", opsi: [{ namaPaket: "1 Hari", harga: 15000 }, { namaPaket: "7 Hari", harga: 65000 }] },
  { id: 5, nama: "Skb Mods", kategori: "Panel", gambar: "images/skb.png", keterangan: "Panel free fire root&virtual terbaru anti ban.", terlaris: true, linkDownload: "https://www.mediafire.com/file/80u5pesdupjo25v/SKBMODS_V2_sign.apk/file", opsi: [{ namaPaket: "1 Hari", harga: 25000 }, { namaPaket: "7 Hari", harga: 75000 }] },
  { id: 6, nama: "KMODs Ekternal", kategori: "Panel", gambar: "images/kmods.png", keterangan: "Panel free fire root&virtual dengan fitur lengkap.", terlaris: true, linkDownload: "https://www.mediafire.com/file/fa840fweuy71fnj/KMODs+External_v3.0+(1).apk/file", opsi: [{ namaPaket: "7 Hari", harga: 65000 }] },
  { id: 7, nama: "painel 07", kategori: "Panel", gambar: "images/painel07.png", keterangan: "Panel free fire root&virtual VIP server.", terlaris: true, linkDownload: "https://www.mediafire.com/file/hana1itibsgsvmq/PAINEL+07+ANDROID+PS_sign.apk/file", opsi: [{ namaPaket: "7 Hari", harga: 35000 }] },
  { id: 8, nama: "Prime Hook", kategori: "Panel", gambar: "images/prime.png", keterangan: "Panel free fire No root.", terlaris: false, linkDownload: "https://www.mediafire.com/file/67mbmnf0lgjao9e/LOGIN-V10.apk/file", opsi: [{ namaPaket: "1 Hari", harga: 15000 }, { namaPaket: "7 Hari", harga: 65000 }] },
  { id: 9, nama: "Lkteam", kategori: "Panel", gambar: "images/lkteam.png", keterangan: "Panel free fire root&virtual khusus push rank.", terlaris: true, linkDownload: "https://www.mediafire.com/file/8hvgtjye93acs1c/LK+TEAM_V1.apk/file", opsi: [{ namaPaket: "1 Hari", harga: 15000 }, { namaPaket: "10 Hari", harga: 100000 }] },
  { id: 10, nama: "HG Cheats", kategori: "Apkmod", gambar: "images/hg.jpg", keterangan: "Cheat FF No Root. Nb: masuk ke saluran telegram untuk update apkmod", terlaris: false, linkDownload: "https://www.mediafire.com/file/jgjbhpc8wwpzxz8/HG+CHEATS+AP+9.2.apks/file", opsi: [{ namaPaket: "7 Hari", harga: 65000 }, { namaPaket: "10 Hari", harga: 100000 }] }
];

export default function App() {
  // --- Persistent & DB states ---
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const data = localStorage.getItem('herox_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });

  const [dbUsers, setDbUsers] = useState<any[]>(() => {
    try {
      const data = localStorage.getItem('herox_db_users');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('herox_db_users', JSON.stringify(dbUsers));
  }, [dbUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('herox_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('herox_user');
    }
  }, [currentUser]);

  // --- UI Animation & Decorative states ---
  const [preloaderAwal, setPreloaderAwal] = useState(true);
  const [musicConsent, setMusicConsent] = useState(false);
  const [preloaderAksi, setPreloaderAksi] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // --- Sound ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // --- Product Navigation & Filters ---
  const [kategoriAktif, setKategoriAktif] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Modals states ---
  const [selectedProductDetail, setSelectedProductDetail] = useState<Produk | null>(null);
  const [selectedProductCheckout, setSelectedProductCheckout] = useState<Produk | null>(null);
  const [pesananAktif, setPesananAktif] = useState<any | null>(null);
  const [modalConfirm, setModalConfirm] = useState<{ text: string; onConfirm: () => void } | null>(null);
  const [modalAuth, setModalAuth] = useState<null | 'login' | 'daftar'>(null);
  const [modalOTP, setModalOTP] = useState(false);
  const [inputOTP, setInputOTP] = useState('');
  const [modalProfil, setModalProfil] = useState(false);
  const [modalRiwayat, setModalRiwayat] = useState(false);

  // --- Risk Disclaimer Modal (NEW REQUESTED FEATURE) ---
  const [modalRiskWarning, setModalRiskWarning] = useState(false);
  const [isRiskAgreed, setIsRiskAgreed] = useState(false);
  const [pendingCheckoutProduct, setPendingCheckoutProduct] = useState<Produk | null>(null);

  // --- Captcha & Form inputs ---
  const [captchaCoQuestion, setCaptchaCoQuestion] = useState('');
  const [captchaCoAnswer, setCaptchaCoAnswer] = useState(0);
  const [captchaCoUserAnswer, setCaptchaCoUserAnswer] = useState('');

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  
  const [authCaptchaQuestion, setAuthCaptchaQuestion] = useState('');
  const [authCaptchaCorrect, setAuthCaptchaCorrect] = useState(0);
  const [authCaptchaAnswer, setAuthCaptchaAnswer] = useState('');

  const [dataDaftarSmt, setDataDaftarSmt] = useState<any>(null);
  const [editNameValue, setEditNameValue] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  // Format IDR Currency
  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // --- Trigger First Load and Consent ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderAwal(false);
      setMusicConsent(true);
    }, 1500);

    // Generate Snowflakes
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 30; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100 + 'vw',
        duration: (Math.random() * 5 + 4) + 's',
        widthHeight: (Math.random() * 4 + 2) + 'px',
        opacity: Math.random() * 0.5 + 0.2,
        delay: (Math.random() * 5) + 's'
      });
    }
    setSnowflakes(flakes);

    // Anti-Inspect Security Traps
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 123 || 
         (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
         (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const trapInterval = setInterval(() => {
      try {
        (function() { return false; })["constructor"]("debugger")();
      } catch {}
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(trapInterval);
    };
  }, []);

  // --- Auto-slider banner ---
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // --- Action feedback toast helper ---
  const showToast = (pesan: string, tipe: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, pesan, tipe }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3300);
  };

  // --- Music controls ---
  const handleMusicConsent = (izinkan: boolean) => {
    setMusicConsent(false);
    if (izinkan && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        showToast("Musik ON");
      }).catch(() => {
        showToast("Gagal memutar musik otomatis.", "error");
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        showToast("Musik ON");
      }).catch(() => {
        showToast("Gagal memutar musik.", "error");
      });
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  // --- Captcha generation ---
  const generateAuthCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setAuthCaptchaQuestion(`${a} + ${b} =`);
    setAuthCaptchaCorrect(a + b);
    setAuthCaptchaAnswer('');
  };

  const generateCaptchaCo = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaCoQuestion(`${a} + ${b} =`);
    setCaptchaCoAnswer(a + b);
    setCaptchaCoUserAnswer('');
  };

  // --- Auth Handlers ---
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalAuth === 'login') {
      if (parseInt(authCaptchaAnswer) !== authCaptchaCorrect) {
        showToast("Captcha Salah!", "error");
        generateAuthCaptcha();
        return;
      }
      const foundUser = dbUsers.find(u => u.email === authEmail && u.pass === authPassword);
      if (foundUser) {
        setCurrentUser(foundUser);
        setModalAuth(null);
        showToast(`Welcome, ${foundUser.nama}!`);
      } else {
        showToast("Email/Password salah!", "error");
        generateAuthCaptcha();
      }
    } else {
      // Register Flow
      if (dbUsers.find(u => u.email === authEmail)) {
        showToast("Email terdaftar! Silakan Login.", "error");
        setModalAuth('login');
        generateAuthCaptcha();
        return;
      }
      setDataDaftarSmt({
        nama: authName,
        email: authEmail,
        pass: authPassword,
        pesanan: []
      });
      setModalAuth(null);
      setModalOTP(true);
      setInputOTP('');
      showToast("OTP dikirim ke email!");
    }
  };

  const verifikasiOTP = () => {
    if (inputOTP !== '1234') {
      showToast("OTP Salah (Ketik 1234)", "error");
      return;
    }
    const finalUser = { ...dataDaftarSmt };
    setDbUsers((prev) => [...prev, finalUser]);
    setCurrentUser(finalUser);
    setModalOTP(false);
    showToast("Berhasil Daftar!");
  };

  // --- Profile Operations ---
  const handleLogout = () => {
    setModalConfirm({
      text: "Yakin ingin keluar akun?",
      onConfirm: () => {
        setCurrentUser(null);
        setModalProfil(false);
        showToast("Logout berhasil.");
      }
    });
  };

  const startEditName = () => {
    setEditNameValue(currentUser.nama);
    setIsEditingName(true);
  };

  const simpanNama = () => {
    if (!editNameValue.trim()) return;
    const updatedUser = { ...currentUser, nama: editNameValue };
    setCurrentUser(updatedUser);
    setDbUsers((prev) => prev.map(u => u.email === currentUser.email ? updatedUser : u));
    setIsEditingName(false);
    showToast("Nama diubah!");
  };

  // --- CS Trigger ---
  const hubungiCS = () => {
    window.location.href = "https://t.me/Latipu122";
  };

  const salinTeks = (t: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(t)
        .then(() => showToast("Disalin!"))
        .catch(() => showToast("Gagal disalin.", "error"));
    } else {
      showToast("Gagal disalin otomatis.", "error");
    }
  };

  // --- Purchase Flow with Trigger for Risk Warning (NEW REQUESTED REQUIREMENT) ---
  const handlePurchaseTrigger = (product: Produk) => {
    if (!currentUser) {
      showToast("Login untuk membeli!", "error");
      setModalAuth('login');
      generateAuthCaptcha();
      return;
    }
    
    // Check if the product matches risk categories ("Panel" or "Apkmod")
    if (product.kategori === 'Panel' || product.kategori === 'Apkmod') {
      setPendingCheckoutProduct(product);
      setIsRiskAgreed(false);
      setModalRiskWarning(true);
    } else {
      bukaCheckout(product);
    }
  };

  const bukaCheckout = (product: Produk) => {
    setPreloaderAksi(true);
    setTimeout(() => {
      setPreloaderAksi(false);
      const randUnik = Math.floor(Math.random() * 900) + 100;
      setPesananAktif({
        produk: product,
        opsiDipilih: product.opsi[0],
        metode: '',
        total: product.opsi[0].harga + randUnik,
        kodeUnik: randUnik
      });
      generateCaptchaCo();
      setSelectedProductCheckout(product);
    }, 300);
  };

  const handleOpsiPaketChange = (index: number) => {
    if (!pesananAktif) return;
    const selectedOpsi = pesananAktif.produk.opsi[index];
    setPesananAktif((prev: any) => ({
      ...prev,
      opsiDipilih: selectedOpsi,
      total: selectedOpsi.harga + prev.kodeUnik
    }));
  };

  const handleMetodeBayarChange = (m: string) => {
    if (!pesananAktif) return;
    setPesananAktif((prev: any) => ({
      ...prev,
      metode: m
    }));
  };

  const konfirmasiPesanan = () => {
    if (!pesananAktif) return;
    if (!pesananAktif.metode) {
      showToast("Pilih metode bayar!", "error");
      return;
    }
    if (parseInt(captchaCoUserAnswer) !== captchaCoAnswer) {
      showToast("Bot Salah!", "error");
      generateCaptchaCo();
      return;
    }

    const totalCalculated = pesananAktif.opsiDipilih.harga + pesananAktif.kodeUnik;
    const orderData = {
      produk: pesananAktif.produk.nama,
      paket: pesananAktif.opsiDipilih.namaPaket,
      total: totalCalculated,
      tgl: new Date().toLocaleDateString('id-ID'),
      status: 'Pending'
    };

    const updatedUser = { ...currentUser };
    if (!updatedUser.pesanan) updatedUser.pesanan = [];
    updatedUser.pesanan.unshift(orderData);

    setCurrentUser(updatedUser);
    setDbUsers((prev) => prev.map(u => u.email === currentUser.email ? updatedUser : u));

    const noWA = "6285185206908"; 
    const pesanWA = `Halo HEROxStore!\n\nProduk: ${pesananAktif.produk.nama}\nPaket: ${pesananAktif.opsiDipilih.namaPaket}\nMetode: ${pesananAktif.metode}\nTotal: *${formatRupiah(totalCalculated)}*`;

    setSelectedProductCheckout(null);
    setPesananAktif(null);
    showToast("Membuka WhatsApp...");
    setTimeout(() => {
      window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesanWA)}`, '_blank');
    }, 1500);
  };

  const filterKategoriList = ['Semua', ...new Set(daftarProduk.map(p => p.kategori))];
  const filteredProduk = daftarProduk.filter(p => {
    const matchKat = kategoriAktif === 'Semua' || p.kategori === kategoriAktif;
    const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKat && matchSearch;
  });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    e.currentTarget.src = fallbackUrl;
  };

  return (
    <div className="app-main-bg min-h-screen text-slate-100 font-sans antialiased overflow-x-hidden select-none pb-12">
      {/* Background Audio */}
      <audio ref={audioRef} id="bgm-audio" loop preload="none">
        <source src="audio/musik2.mp3" type="audio/mpeg" />
      </audio>

      {/* Snow container */}
      <div id="snow-container">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: flake.left,
              animationDuration: flake.duration,
              width: flake.widthHeight,
              height: flake.widthHeight,
              opacity: flake.opacity,
              animationDelay: flake.delay
            }}
          />
        ))}
      </div>

      {/* TOAST NOTIFICATIONS */}
      <div id="toast-container" className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[999999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${toast.tipe === 'error' ? 'bg-red-600' : 'bg-primary'} text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 font-bold text-xs transition-all border border-white/10 z-[999999] fade-in`}
          >
            <i className={`fa-solid ${toast.tipe === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'} text-base`}></i>
            <span>{toast.pesan}</span>
          </div>
        ))}
      </div>

      {/* PRELOADER 1: AWAL WEB */}
      {preloaderAwal && (
        <div id="preloader-awal" className="fixed inset-0 bg-[#0f172a] z-[99999] flex flex-col items-center justify-center transition-opacity duration-500">
          <div className="loader-pulse mb-6">
            <i className="fa-solid fa-bolt text-white text-4xl drop-shadow-md"></i>
          </div>
          <h1 className="text-white font-black text-2xl tracking-widest uppercase">HEROxStore</h1>
          <p className="text-primary text-xs mt-2 font-bold tracking-widest animate-pulse">MEMUAT SISTEM...</p>
        </div>
      )}

      {/* PRELOADER 2: LOADING ACTION */}
      {preloaderAksi && (
        <div id="preloader-aksi" className="fixed inset-0 bg-black/70 z-[99998] flex flex-col items-center justify-center backdrop-blur-sm transition-opacity">
          <div className="w-10 h-10 border-4 border-gray-600 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* POPUP IZIN MUSIK */}
      {musicConsent && (
        <div id="music-consent" className="fixed inset-0 bg-black/80 z-[99990] flex flex-col items-center justify-center backdrop-blur-md p-4 transition-opacity">
          <div className="bg-card p-6 rounded-2xl max-w-sm w-full text-center border border-gray-700 shadow-2xl fade-in">
            <div className="w-16 h-16 bg-blue-900/40 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-headphones text-3xl"></i>
            </div>
            <h3 className="text-white font-black text-xl mb-2">Pengalaman Terbaik</h3>
            <p className="text-gray-400 text-sm mb-6">Nyalakan musik latar untuk pengalaman berbelanja yang lebih seru?</p>
            <div className="flex gap-3">
              <button onClick={() => handleMusicConsent(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition">Nanti Saja</button>
              <button onClick={() => handleMusicConsent(true)} className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition shadow-[0_0_15px_rgba(59,130,246,0.4)]">Ya, Putar Musik</button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION BAR */}
      <nav className="bg-[#1e293b]/70 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center gap-4">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-white cursor-pointer" onClick={() => { setKategoriAktif('Semua'); setSearchQuery(''); }}>
              <i className="fa-solid fa-bolt text-primary"></i> HEROxStore
            </div>
            
            {/* Desktop Search */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full bg-gray-800 text-white rounded-full px-5 py-2 pl-11 focus:outline-none focus:ring-1 focus:ring-primary border border-gray-700 transition"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-2.5 text-gray-500"></i>
              </div>
            </div>

            {/* Profile / Auth Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {!currentUser ? (
                <button
                  onClick={() => { setModalAuth('login'); generateAuthCaptcha(); }}
                  className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-blue-600 transition text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <i className="fa-solid fa-user text-xs"></i> Masuk
                </button>
              ) : (
                <button
                  onClick={() => setModalProfil(true)}
                  className="bg-gray-800 text-white px-3 py-1.5 rounded-full font-bold hover:bg-gray-700 transition text-sm flex items-center gap-2 border border-gray-700 cursor-pointer"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${currentUser.nama?.replace(/\s+/g, '+') || 'User'}&background=3b82f6&color=fff&bold=true`}
                    className="w-6 h-6 rounded-full object-cover"
                    alt="Profil"
                  />
                  <span className="hidden sm:inline text-gray-200">{currentUser.nama?.split(" ")[0]}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* BANNER SLIDER AUTOMATIC */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-30">
        <div className="rounded-2xl shadow-2xl overflow-hidden relative group">
          <div
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
          >
            {/* Slide 1 */}
            <img
              src="images/banner 2.jpg"
              onError={(e) => handleImageError(e, 'https://placehold.co/1200x400/1e293b/3b82f6?text=Banner+Promo+1')}
              className="w-full flex-shrink-0 object-cover aspect-[16/7] sm:aspect-[21/9]"
              alt="Banner 1"
            />
            {/* Slide 2 */}
            <img
              src="images/banner 1.jpg"
              onError={(e) => handleImageError(e, 'https://placehold.co/1200x400/1e293b/3b82f6?text=Banner+Promo+2')}
              className="w-full flex-shrink-0 object-cover aspect-[16/7] sm:aspect-[21/9]"
              alt="Banner 2"
            />
            {/* Slide 3 */}
            <img
              src="images/banner 3.jpg"
              onError={(e) => handleImageError(e, 'https://placehold.co/1200x400/1e293b/3b82f6?text=Banner+Promo+3')}
              className="w-full flex-shrink-0 object-cover aspect-[16/7] sm:aspect-[21/9]"
              alt="Banner 3"
            />
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                onClick={() => setSliderIndex(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === sliderIndex ? 'bg-primary w-4' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* TRUST VALUES ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-8 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="frosted-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-900/30 text-primary rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Proses Kilat</h3>
              <p className="text-[10px] text-gray-400">Langsung masuk</p>
            </div>
          </div>
          <div className="frosted-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">24 Jam Online</h3>
              <p className="text-[10px] text-gray-400">Sistem otomatis</p>
            </div>
          </div>
          <div className="frosted-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-900/30 text-purple-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              <i className="fa-solid fa-shield"></i>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">100% Aman</h3>
              <p className="text-[10px] text-gray-400">Transaksi legal</p>
            </div>
          </div>
        </div>
      </div>

      {/* CORE STORE PRODUCTS AREA */}
      <main id="area-produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-30">
        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {filterKategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setKategoriAktif(kat)}
              className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition border ${
                kat === kategoriAktif
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Mobile Search bar */}
        <div className="mb-6 sm:hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full bg-card text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary border border-gray-700"
          />
        </div>

        {/* Products Grid */}
        {filteredProduk.length > 0 ? (
          <div id="wadah-produk" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
            {filteredProduk.map((p, idx) => {
              const minHarga = Math.min(...p.opsi.map(o => o.harga));
              return (
                <div
                  key={p.id}
                  className="frosted-card flex flex-col cursor-pointer slide-up overflow-hidden group"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  onClick={() => setSelectedProductDetail(p)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-900 p-3">
                    <img
                      src={p.gambar}
                      onError={(e) => handleImageError(e, 'https://placehold.co/300x300/1e293b/3b82f6?text=Product')}
                      className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-110"
                      alt={p.nama}
                    />
                    {p.terlaris && (
                      <span className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider z-10 border border-white/20">
                        Root
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 flex flex-col flex-grow">
                    <h3 className="font-bold text-white text-xs leading-snug line-clamp-2">{p.nama}</h3>
                    <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-800">
                      <span className="font-black text-primary text-sm">{formatRupiah(minHarga)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchaseTrigger(p);
                        }}
                        className="w-7 h-7 bg-gray-700 text-white rounded-lg hover:bg-primary transition flex justify-center items-center cursor-pointer"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div id="pesan-kosong" className="text-center py-16">
            <i className="fa-solid fa-box-open text-5xl text-gray-600 mb-3 animate-bounce"></i>
            <h3 className="text-lg font-bold text-gray-300">Produk Tidak Ditemukan</h3>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b1120] text-gray-400 py-10 border-t-2 border-primary relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-black text-2xl text-white mb-2">
              <i className="fa-solid fa-bolt text-primary"></i> HEROxStore
            </div>
            <p className="text-xs">Top Up & Digital Produk Termurah 24/7.</p>
          </div>
        </div>
      </footer>

      {/* --- NEW REQUESTED POP-UP: RISK DISCLAIMER & TERMS POLICY MODAL --- */}
      {modalRiskWarning && pendingCheckoutProduct && (
        <div className="fixed inset-0 frosted-overlay flex items-center justify-center z-[110] p-4">
          <div className="frosted-modal p-8 max-w-md w-full fade-in">
            {/* Warning Header */}
            <div className="flex items-center gap-3.5 mb-5 border-b border-white/10 pb-4">
              <div className="w-11 h-11 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                <i className="fa-solid fa-triangle-exclamation animate-pulse"></i>
              </div>
              <div>
                <h3 className="text-sm font-black text-white tracking-wider uppercase">Ketentuan & Risiko</h3>
                <p className="text-[10px] text-gray-400">Harap baca dengan teliti sebelum melanjutkan</p>
              </div>
            </div>

            {/* Warning Body Content */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto scrollbar-hide pr-1 text-left text-xs">
              <div className="frosted-item p-4">
                <p className="font-bold text-amber-400 mb-1 flex items-center gap-1.5 text-xs">
                  <i className="fa-solid fa-circle-exclamation"></i> Risiko Penggunaan
                </p>
                <p className="text-[11px] leading-relaxed text-gray-300">
                  Tidak ada perangkat lunak cheat yang 100% aman dari deteksi. Segala bentuk penggunaan produk memiliki risiko inheren. Dengan membeli dan menggunakan produk ini, Anda sepenuhnya memahami risiko yang ada dan bertanggung jawab penuh atas segala tindakan yang dilakukan.
                </p>
              </div>

              <div className="frosted-item p-4">
                <p className="font-bold text-blue-400 mb-1 flex items-center gap-1.5 text-xs">
                  <i className="fa-solid fa-bullhorn"></i> Wajib Memantau Informasi
                </p>
                <p className="text-[11px] leading-relaxed text-gray-300">
                  Sebelum melakukan transaksi, pelanggan wajib memeriksa saluran Telegram resmi kami. Informasi terkait pembaruan (update), status produk, serta pengumuman penting lainnya hanya kami sampaikan melalui saluran tersebut.
                </p>
              </div>

              <div className="frosted-item p-4">
                <p className="font-bold text-red-400 mb-1 flex items-center gap-1.5 text-xs">
                  <i className="fa-solid fa-hand-holding-dollar"></i> Kebijakan Non-Refund
                </p>
                <p className="text-[11px] leading-relaxed text-gray-300">
                  All transaksi yang telah berhasil diproses bersifat final dan tidak dapat dibatalkan atau dikembalikan dengan alasan apa pun. Harap lakukan riset mandiri (DYOR) dan pastikan Anda memahami fungsi serta risiko produk sebelum melakukan pembayaran.
                </p>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <label className="flex items-start gap-2.5 cursor-pointer text-left select-none group">
                <input
                  type="checkbox"
                  checked={isRiskAgreed}
                  onChange={(e) => setIsRiskAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[11px] font-bold text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                  Saya memahami seluruh risiko dan kebijakan di atas, serta bersedia mematuhi ketentuan yang berlaku.
                </span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setModalRiskWarning(false);
                  setPendingCheckoutProduct(null);
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-bold py-3 rounded-xl transition text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (isRiskAgreed && pendingCheckoutProduct) {
                    const prod = pendingCheckoutProduct;
                    setModalRiskWarning(false);
                    setPendingCheckoutProduct(null);
                    bukaCheckout(prod);
                  }
                }}
                disabled={!isRiskAgreed}
                className={`flex-1 font-bold py-3 rounded-xl transition text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                  isRiskAgreed
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <i className="fa-solid fa-check"></i> Setuju & Lanjut
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL PRODUK */}
      {selectedProductDetail && (
        <div id="modal-detail" className="fixed inset-0 frosted-overlay z-[70] flex items-center justify-center p-4 overflow-y-auto">
          <div className="frosted-modal max-w-md w-full p-6 relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <h2 className="font-black text-lg text-white">Detail Produk</h2>
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>

            <img
              src={selectedProductDetail.gambar}
              onError={(e) => handleImageError(e, 'https://placehold.co/300x300/1e293b/3b82f6?text=Product')}
              className="w-full h-48 object-cover rounded-2xl mb-4 border border-white/10"
              alt={selectedProductDetail.nama}
            />
            <span className="text-[10px] font-black text-primary mb-1 uppercase tracking-widest bg-blue-900/30 px-2.5 py-1 rounded inline-block">
              {selectedProductDetail.kategori}
            </span>
            <h3 className="text-xl font-black text-white leading-tight mt-1 mb-3 text-left">{selectedProductDetail.nama}</h3>
            
            <div className="frosted-item p-4 mb-6 text-left">
              <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Keterangan Produk:</p>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">{selectedProductDetail.keterangan}</p>
            </div>

            <div className="flex gap-3">
              {selectedProductDetail.kategori === 'Panel' && (
                <button
                  onClick={() => window.open(selectedProductDetail.linkDownload, '_blank')}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-download"></i> Unduh
                </button>
              )}
              <button
                onClick={() => {
                  const prod = selectedProductDetail;
                  setSelectedProductDetail(null);
                  setTimeout(() => {
                    handlePurchaseTrigger(prod);
                  }, 300);
                }}
                className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-cart-shopping"></i> Lanjut Beli
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHECKOUT */}
      {selectedProductCheckout && pesananAktif && (
        <div id="modal-checkout" className="fixed inset-0 frosted-overlay z-[80] flex items-center justify-center p-4 overflow-y-auto">
          <div className="frosted-modal max-w-md w-full p-6 relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <h2 className="font-black text-lg text-white">Pembayaran</h2>
              <button
                onClick={() => { setSelectedProductCheckout(null); setPesananAktif(null); }}
                className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-full flex items-center justify-center transition cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>

            <div className="frosted-item p-4 flex items-center gap-4 mb-5">
              <img
                src={selectedProductCheckout.gambar}
                onError={(e) => handleImageError(e, 'https://placehold.co/300x300/1e293b/3b82f6?text=Product')}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
                alt={selectedProductCheckout.nama}
              />
              <div className="text-left">
                <h4 className="font-bold text-white text-base leading-tight">{selectedProductCheckout.nama}</h4>
                <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-widest">{selectedProductCheckout.kategori}</p>
              </div>
            </div>

            {/* Step 1: Pilih Paket */}
            <div className="mb-5 text-left">
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">1. Pilih Paket</label>
              <div id="co-opsi" className="space-y-2">
                {selectedProductCheckout.opsi.map((o, idx) => {
                  const isSelected = pesananAktif.opsiDipilih.namaPaket === o.namaPaket;
                  return (
                    <label
                      key={idx}
                      onClick={() => handleOpsiPaketChange(idx)}
                      className={`flex justify-between p-3 border rounded-xl cursor-pointer bg-white/5 transition ${
                        isSelected ? 'border-primary' : 'border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name="pkt"
                          checked={isSelected}
                          readOnly
                          className="w-3 h-3 text-primary"
                        />
                        <span className="font-bold text-gray-200 text-xs">{o.namaPaket}</span>
                      </div>
                      <span className="font-black text-primary text-xs">{formatRupiah(o.harga)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Metode Bayar */}
            <div className="mb-5 text-left">
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">2. Metode Bayar</label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { key: 'QRIS', icon: 'fa-qrcode' },
                  { key: 'DANA', icon: 'fa-wallet' },
                  { key: 'GOPAY', icon: 'fa-mobile-screen' },
                  { key: 'BNI', icon: 'fa-building-columns', label: 'Bank BNI' }
                ].map((met) => {
                  const isSelected = pesananAktif.metode === met.key;
                  return (
                    <div
                      key={met.key}
                      onClick={() => handleMetodeBayarChange(met.key)}
                      className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-white/5 transition ${
                        isSelected ? 'border-primary' : 'border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-900/30 text-primary flex items-center justify-center">
                        <i className={`fa-solid ${met.icon} text-sm`}></i>
                      </div>
                      <span className="font-bold text-gray-200 text-xs">{met.label || met.key}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Display Payment Information */}
            {pesananAktif.metode && (
              <div id="co-info-bayar" className="mb-4 p-4 border border-blue-500/30 rounded-xl bg-blue-900/10 text-center fade-in">
                {pesananAktif.metode === 'QRIS' ? (
                  <div>
                    <p className="text-[10px] text-primary font-bold mb-2 uppercase">Scan Barcode Ini</p>
                    <img
                      src="images/qris.jpg"
                      onError={(e) => handleImageError(e, 'https://placehold.co/200x200/1e293b/3b82f6?text=QRIS+QR')}
                      className="w-full max-w-[200px] mx-auto rounded-lg mb-3 border border-white/10"
                      alt="QRIS"
                    />
                    <a
                      href="images/qris.jpg"
                      download="QRIS"
                      className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs px-4 py-2 rounded-lg cursor-pointer"
                    >
                      <i className="fa-solid fa-download mr-1"></i> Simpan QRIS
                    </a>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] text-primary font-bold mb-1 uppercase">Transfer Ke Nomor</p>
                    <div className="flex justify-center gap-2 my-2 items-center">
                      <span className="text-xl text-white font-bold tracking-wider">
                        {pesananAktif.metode === 'BNI' ? "1986703695" : "0895425394257"}
                      </span>
                      <button
                        onClick={() => salinTeks(pesananAktif.metode === 'BNI' ? "1986703695" : "0895425394257")}
                        className="text-gray-400 hover:text-white cursor-pointer"
                      >
                        <i className="fa-solid fa-copy"></i>
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400">A.n Abdul Latif</p>
                  </div>
                )}
              </div>
            )}

            {/* Price Details */}
            {pesananAktif.metode && (
              <div id="co-rincian" className="mb-5 p-4 frosted-item bg-black/20 fade-in text-left">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Harga:</span>
                  <span>{formatRupiah(pesananAktif.opsiDipilih.harga)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Kode Unik:</span>
                  <span className="text-primary">+{pesananAktif.kodeUnik}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-1">
                  <span className="font-bold text-xs text-gray-200">Total:</span>
                  <span className="font-black text-sm text-red-500">{formatRupiah(pesananAktif.total)}</span>
                </div>
                <p className="text-[9px] text-red-400 text-center mt-2">*Transfer tepat hingga 3 digit terakhir!</p>
              </div>
            )}

            {/* Verification Captcha */}
            <div className="mb-6 text-left">
              <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">3. Verifikasi</label>
              <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span id="co-captcha-soal" className="font-mono bg-white/5 px-4 py-2 rounded-lg border border-white/10 font-bold text-primary text-sm min-w-[5rem] text-center">
                  {captchaCoQuestion}
                </span>
                <input
                  type="number"
                  value={captchaCoUserAnswer}
                  onChange={(e) => setCaptchaCoUserAnswer(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent text-center font-bold text-white outline-none text-sm border-b border-white/10 focus:border-primary"
                  placeholder="Jawab?"
                />
              </div>
            </div>

            {/* WA Order Button */}
            <button
              onClick={konfirmasiPesanan}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> Pesan Sekarang
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {modalConfirm && (
        <div id="modal-confirm" className="fixed inset-0 frosted-overlay flex items-center justify-center z-[120] p-4">
          <div className="frosted-modal p-6 max-w-sm w-full fade-in text-center">
            <h3 className="text-lg font-bold text-white mb-2">Konfirmasi Keluar</h3>
            <p className="text-gray-400 text-xs mb-6">{modalConfirm.text}</p>
            <div className="flex gap-2">
              <button onClick={() => setModalConfirm(null)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold py-2.5 rounded-xl cursor-pointer">Batal</button>
              <button onClick={() => { modalConfirm.onConfirm(); setModalConfirm(null); }} className="flex-1 bg-red-600/80 hover:bg-red-600 text-white text-sm font-bold py-2.5 rounded-xl cursor-pointer">Keluar</button>
            </div>
          </div>
        </div>
      )}

      {/* AUTHENTICATION MODAL */}
      {modalAuth && (
        <div id="modal-auth" className="fixed inset-0 frosted-overlay flex items-center justify-center z-[60] p-4">
          <div className="frosted-modal p-6 max-w-sm w-full fade-in relative text-left">
            <button onClick={() => setModalAuth(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
            <div className="flex gap-4 mb-5 border-b border-white/10 pb-2">
              <button
                onClick={() => { setModalAuth('login'); generateAuthCaptcha(); }}
                className={`text-sm font-bold pb-1 cursor-pointer ${
                  modalAuth === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => setModalAuth('daftar')}
                className={`text-sm font-bold pb-1 cursor-pointer ${
                  modalAuth === 'daftar' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
                }`}
              >
                Daftar
              </button>
            </div>

            {/* Login Form */}
            {modalAuth === 'login' ? (
              <form onSubmit={handleAuthSubmit}>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg mb-3 text-sm focus:border-primary outline-none"
                  placeholder="Email"
                />
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg mb-3 text-sm focus:border-primary outline-none"
                  placeholder="Password"
                />
                <div className="mb-5 flex gap-2">
                  <span id="pertanyaan-captcha-login" className="bg-white/5 text-primary text-sm px-3 py-2 rounded-lg font-bold w-20 text-center border border-white/10">
                    {authCaptchaQuestion}
                  </span>
                  <input
                    type="number"
                    required
                    value={authCaptchaAnswer}
                    onChange={(e) => setAuthCaptchaAnswer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-center text-sm outline-none focus:border-primary"
                    placeholder="Jawab"
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-2.5 text-sm rounded-lg cursor-pointer hover:bg-blue-600 transition">
                  Login
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleAuthSubmit}>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg mb-3 text-sm focus:border-primary outline-none"
                  placeholder="Nama Lengkap"
                />
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg mb-3 text-sm focus:border-primary outline-none"
                  placeholder="Email"
                />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg mb-4 text-sm focus:border-primary outline-none"
                  placeholder="Password"
                />
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 text-sm rounded-lg cursor-pointer hover:bg-blue-700 transition">
                  Daftar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* OTP MODAL */}
      {modalOTP && (
        <div id="modal-otp" className="fixed inset-0 frosted-overlay flex items-center justify-center z-[65] p-4">
          <div className="frosted-modal p-6 max-w-sm w-full text-center fade-in">
            <h3 className="text-white font-bold mb-1 text-lg">Verifikasi</h3>
            <p className="text-xs text-gray-400 mb-4">Ketik 1234</p>
            <input
              type="number"
              value={inputOTP}
              onChange={(e) => setInputOTP(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-center font-bold text-xl mb-4 outline-none focus:border-primary"
            />
            <button onClick={verifikasiOTP} className="w-full bg-green-600 text-white font-bold py-2.5 rounded-xl text-sm mb-2 cursor-pointer hover:bg-green-700 transition">
              Verifikasi
            </button>
            <button
              onClick={() => { setModalOTP(false); setModalAuth('daftar'); }}
              className="text-xs text-gray-400 hover:text-white cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* PROFILE DETAILS MODAL */}
      {modalProfil && currentUser && (
        <div id="modal-profil" className="fixed inset-0 frosted-overlay flex items-center justify-center z-[50] p-4">
          <div className="frosted-modal max-w-sm w-full fade-in p-6 relative text-left">
            <button onClick={() => setModalProfil(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer z-10">
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="text-center pb-5 mb-5 border-b border-white/10">
              <img
                src={`https://ui-avatars.com/api/?name=${currentUser.nama?.replace(/\s+/g, '+') || 'User'}&background=3b82f6&color=fff&bold=true`}
                className="w-20 h-20 rounded-full border-2 border-primary mx-auto mb-3 object-cover shadow-lg"
                alt="Avatar"
              />
              
              {isEditingName ? (
                <div className="mt-2 flex flex-col items-center gap-1.5">
                  <input
                    type="text"
                    value={editNameValue}
                    onChange={(e) => setEditNameValue(e.target.value)}
                    className="text-black px-2 py-1 text-sm rounded bg-white outline-none w-full max-w-[200px]"
                  />
                  <div className="flex gap-2">
                    <button onClick={simpanNama} className="bg-primary text-white text-xs px-3 py-1 rounded cursor-pointer font-bold">Save</button>
                    <button onClick={() => setIsEditingName(false)} className="bg-gray-600 text-white text-xs px-3 py-1 rounded cursor-pointer font-bold">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-base font-black text-white">{currentUser.nama}</h3>
                  <p className="text-gray-400 text-[10px]">{currentUser.email}</p>
                </>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => { setModalProfil(false); setModalRiwayat(true); }}
                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-gray-200 font-bold flex items-center gap-3 border border-white/10 transition cursor-pointer"
              >
                <i className="fa-solid fa-clock-rotate-left text-primary"></i> Riwayat
              </button>
              <button
                onClick={hubungiCS}
                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-gray-200 font-bold flex items-center gap-3 border border-white/10 transition cursor-pointer"
              >
                <i className="fa-solid fa-headset text-green-500"></i> CS Telegram
              </button>
              {!isEditingName && (
                <button
                  onClick={startEditName}
                  className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-gray-200 font-bold flex items-center gap-3 border border-white/10 transition cursor-pointer"
                >
                  <i className="fa-solid fa-pen text-gray-500"></i> Ubah Nama
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 bg-red-900/10 border border-red-900/30 hover:bg-red-900/20 rounded-xl text-sm font-bold text-red-500 flex items-center gap-3 transition cursor-pointer"
              >
                <i className="fa-solid fa-power-off"></i> Keluar Akun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HISTORIC ORDERS MODAL */}
      {modalRiwayat && currentUser && (
        <div id="modal-riwayat" className="fixed inset-0 frosted-overlay flex items-center justify-center z-[55] p-4">
          <div className="frosted-modal p-6 max-w-sm w-full fade-in max-h-[80vh] flex flex-col text-left">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <h3 className="font-bold text-white text-base">Riwayat</h3>
              <button onClick={() => setModalRiwayat(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
            
            <div className="overflow-y-auto space-y-2.5 flex-1 scrollbar-hide pr-1">
              {currentUser.pesanan && currentUser.pesanan.length > 0 ? (
                currentUser.pesanan.map((pesan: any, idx: number) => (
                  <div key={idx} className="frosted-item p-3.5 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-400">{pesan.tgl}</span>
                      <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">{pesan.status}</span>
                    </div>
                    <h4 className="text-white text-xs font-bold">{pesan.produk}</h4>
                    <p className="text-[10px] text-primary font-medium">{pesan.paket}</p>
                    <div className="text-xs font-bold text-gray-200 mt-2">{formatRupiah(pesan.total)}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-xs text-center py-6">Belum ada riwayat.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOAT FLOATING BGM MUSIC PLAYER CONTROL */}
      <button
        id="btn-musik"
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-[90] w-12 h-12 frosted-item rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
          isMusicPlaying ? 'shadow-[0_0_15px_rgba(59,130,246,0.5)] text-blue-400 border-blue-400/50' : 'text-primary'
        }`}
      >
        <i id="ikon-musik" className={`fa-solid ${isMusicPlaying ? 'fa-volume-high' : 'fa-music'}`}></i>
      </button>
    </div>
  );
}
