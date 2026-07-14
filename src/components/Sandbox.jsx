import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Hand, Play, RotateCcw, Monitor, Sparkles, Columns, ZoomIn, EyeOff, Edit3, ShoppingBag, BookOpen, ShieldCheck, MapPin, Search, Check, X, ShieldAlert } from 'lucide-react';

export default function Sandbox({ activeProjectIndex, setActiveProjectIndex, triggerGlobalEffect }) {
  const [activeTab, setActiveTab] = useState('el_gestur');

  // ==========================================
  // STATE 1: el_gestur_v2 STATES
  // ==========================================
  const [logs, setLogs] = useState([
    { text: '[SYSTEM] Initializing GPU Pipeline (MPS Support)...', type: 'info' },
    { text: '[SYSTEM] Loading YOLOv8 weights "yolov8n.pt"... OK', type: 'info' },
    { text: '[SYSTEM] DeepSORT Tracker initialized.', type: 'info' },
    { text: '[SYSTEM] MediaPipe Landmark Classifier (21 Joints) loaded.', type: 'info' },
    { text: '[SYSTEM] CORE READY. Awaiting simulation inputs.', type: 'success' }
  ]);
  const canvasRef = useRef(null);
  const terminalRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [trails, setTrails] = useState([]);
  const [activeCmd, setActiveCmd] = useState('');

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { text: `[${timestamp}] ${text}`, type }]);
  };

  useEffect(() => {
    if (activeTab === 'el_gestur' && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  // Canvas drawing loop
  useEffect(() => {
    if (activeTab !== 'el_gestur') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId;
    let localTrails = [...trails];

    const render = () => {
      ctx.fillStyle = 'rgba(250, 246, 238, 0.2)'; // Clear with trailing fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (localTrails.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.moveTo(localTrails[0].x, localTrails[0].y);
        for (let i = 1; i < localTrails.length; i++) {
          ctx.lineTo(localTrails[i].x, localTrails[i].y);
        }
        ctx.stroke();
      }

      if (localTrails.length > 0 && !isDrawing) {
        localTrails.shift();
      }
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [trails, isDrawing, activeTab]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartX(x);
    setTrails([{ x, y }]);
    addLog(`Pointer Down (X: ${Math.round(x)}, Y: ${Math.round(y)})`, 'info');
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTrails(prev => {
      const next = [...prev, { x, y }];
      if (next.length > 25) next.shift();
      return next;
    });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const diffX = endX - startX;

    addLog(`Pointer Up. Delta X: ${Math.round(diffX)}`, 'info');

    if (Math.abs(diffX) > 60) {
      if (diffX > 0) {
        addLog('Gestur Dikenali: Swipe Kanan (Slide Sebelumnya)', 'action');
        setActiveProjectIndex(prev => (prev - 1 + 5) % 5);
      } else {
        addLog('Gestur Dikenali: Swipe Kiri (Slide Berikutnya)', 'action');
        setActiveProjectIndex(prev => (prev + 1) % 5);
      }
    }
  };

  const runCommand = (cmd) => {
    setActiveCmd(cmd);
    triggerGlobalEffect(cmd, addLog);
  };

  const elCommands = [
    { id: 'pena', label: 'aktifkan pena', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'konfeti', label: 'tampilkan konfeti', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hitam', label: 'layar hitam', icon: <EyeOff className="w-4 h-4" /> },
    { id: 'tirai', label: 'buka tirai', icon: <Columns className="w-4 h-4" /> },
    { id: 'zoom', label: 'zoom fit', icon: <ZoomIn className="w-4 h-4" /> },
    { id: 'normal', label: 'kembali normal', icon: <RotateCcw className="w-4 h-4" /> },
  ];

  // ==========================================
  // STATE 2: SALIN GAYA STATES
  // ==========================================
  const [weight, setWeight] = useState(2); // 2 kg
  const [distance, setDistance] = useState('purwokerto'); // purwokerto, jakarta, bandung
  const [payMethod, setPayMethod] = useState('snap');
  const [orderStatus, setOrderStatus] = useState('idle'); // idle, paying, paid
  const [payLog, setPayLog] = useState('');

  const distanceCosts = {
    purwokerto: { label: 'Purwokerto (Lokal)', cost: 5000 },
    bandung: { label: 'Bandung (Jawa Barat)', cost: 15000 },
    jakarta: { label: 'Jakarta (Jabodetabek)', cost: 20000 },
    surabaya: { label: 'Surabaya (Jawa Timur)', cost: 25000 },
  };

  const itemPrice = 85000; // Harga kemeja thrifting kustom
  const shippingCost = weight * distanceCosts[distance].cost;
  const totalCost = itemPrice + shippingCost;

  const handlePay = () => {
    setOrderStatus('paying');
    setPayLog('Menyiapkan snap token Midtrans...');
    setTimeout(() => {
      setPayLog('Menghubungkan ke API Bank Gateway...');
    }, 1000);
  };

  const handlePaySuccess = () => {
    setPayLog('Pembayaran Diterima! Sinkronisasi status pesanan ke Firebase RTDB...');
    setTimeout(() => {
      setOrderStatus('paid');
      setPayLog('');
    }, 1200);
  };

  // ==========================================
  // STATE 3: LIBRARYPRO STATES
  // ==========================================
  const [libraryRole, setLibraryRole] = useState('gate'); // gate, admin, anggota
  const [fuzzyQuery, setFuzzyQuery] = useState('');
  const [borrowRequests, setBorrowRequests] = useState([
    { id: 1, name: 'Maruf', book: 'Refactoring 2nd Edition', date: '15 Juli 2026', status: 'Pending' },
    { id: 2, name: 'Gibran', book: 'Computer Networks & Security', date: '14 Juli 2026', status: 'Pending' }
  ]);
  const [bookList, setBookList] = useState([
    { id: 101, title: 'Clean Code: Handbook of Agile Craft', stock: 3, rating: 4.8 },
    { id: 102, title: 'Refactoring 2nd Edition', stock: 1, rating: 4.9 },
    { id: 103, title: 'Computer Networks & Security', stock: 2, rating: 4.7 }
  ]);
  const [memberMessage, setMemberMessage] = useState('');

  // Simple fuzzy logic simulation for search
  const filteredBooks = bookList.filter(book => {
    const q = fuzzyQuery.toLowerCase().trim();
    if (!q) return true;
    
    // Exact or direct inclusion match
    if (book.title.toLowerCase().includes(q)) return true;

    // Fuzzy: check if letters appear in order (Levenshtein simulation)
    let bIdx = 0;
    for (let char of q) {
      bIdx = book.title.toLowerCase().indexOf(char, bIdx);
      if (bIdx === -1) return false;
      bIdx++;
    }
    return true;
  });

  const handleApproveRequest = (id, bookTitle) => {
    // Approve Request
    setBorrowRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
    
    // Decrement stock
    setBookList(prev => prev.map(b => b.title === bookTitle ? { ...b, stock: Math.max(0, b.stock - 1) } : b));
  };

  const handleRejectRequest = (id) => {
    setBorrowRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const handleMemberBorrow = (bookTitle, stock) => {
    if (stock <= 0) {
      setMemberMessage('Maaf, stok buku ini sedang kosong!');
      return;
    }
    // Add pending request
    const newId = borrowRequests.length + 1;
    setBorrowRequests(prev => [
      ...prev,
      { id: newId, name: 'Fatir (Saya)', book: bookTitle, date: 'Hari Ini', status: 'Pending' }
    ]);
    setMemberMessage(`Permintaan pinjam "${bookTitle}" berhasil diajukan ke Admin!`);
    
    setTimeout(() => {
      setMemberMessage('');
    }, 3000);
  };

  return (
    <section id="simulator" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          Testing Sandbox
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-yellow/60 -z-10 rounded-full"></span>
        </h2>
        <p className="text-pastel-navy/70 mt-4 max-w-2xl leading-relaxed">
          Uji simulasi interaktif dari sistem backend dan frontend yang telah saya bangun. Pilih modul di bawah ini untuk mencoba secara instan!
        </p>
      </div>

      {/* Cheerful Tabs Switcher */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveTab('el_gestur')}
          className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-bold font-space text-sm border-2 transition-all duration-300 transform active:scale-95 ${
            activeTab === 'el_gestur'
              ? 'bg-pastel-yellow border-pastel-yellow-hover text-pastel-navy shadow-pastel-sm'
              : 'bg-white border-pastel-peach/50 text-pastel-navy/70 hover:bg-pastel-peach/20 hover:text-pastel-navy'
          }`}
        >
          <Cpu className="w-5 h-5 text-pastel-blue-dark" />
          <span>el_gestur_v2 Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab('salin_gaya')}
          className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-bold font-space text-sm border-2 transition-all duration-300 transform active:scale-95 ${
            activeTab === 'salin_gaya'
              ? 'bg-pastel-yellow border-pastel-yellow-hover text-pastel-navy shadow-pastel-sm'
              : 'bg-white border-pastel-peach/50 text-pastel-navy/70 hover:bg-pastel-peach/20 hover:text-pastel-navy'
          }`}
        >
          <ShoppingBag className="w-5 h-5 text-pastel-pink" />
          <span>Salin Gaya Gateway</span>
        </button>
        <button
          onClick={() => setActiveTab('library_pro')}
          className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-bold font-space text-sm border-2 transition-all duration-300 transform active:scale-95 ${
            activeTab === 'library_pro'
              ? 'bg-pastel-yellow border-pastel-yellow-hover text-pastel-navy shadow-pastel-sm'
              : 'bg-white border-pastel-peach/50 text-pastel-navy/70 hover:bg-pastel-peach/20 hover:text-pastel-navy'
          }`}
        >
          <BookOpen className="w-5 h-5 text-pastel-green" />
          <span>LibraryPro Portal</span>
        </button>
      </div>

      {/* Main Sandbox Container */}
      <div className="bg-white border-2 border-pastel-blue rounded-3xl overflow-hidden shadow-pastel-lg min-h-[420px] flex flex-col justify-between">
        
        {/* ==========================================
            TAB 1: EL_GESTUR SIMULATOR PANEL
            ========================================== */}
        {activeTab === 'el_gestur' && (
          <div className="flex flex-col h-full justify-between flex-grow">
            <div className="bg-pastel-blue/30 border-b-2 border-pastel-blue px-6 py-4 flex justify-between items-center">
              <span className="text-pastel-navy font-bold font-space text-sm">EL_GESTUR_ENGINE // STANDBY</span>
              <span className="text-xs font-bold text-pastel-blue-dark bg-pastel-blue/80 py-1 px-3 rounded-full">One Euro Filter: ON</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
              <div className="bg-[#121622] p-5 h-64 md:h-72 overflow-y-auto font-mono text-xs text-emerald-400 scanlines" ref={terminalRef}>
                {logs.map((log, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="text-sky-400 mr-2">&gt;</span>
                    {log.type === 'success' && <span className="text-emerald-300 font-bold">{log.text}</span>}
                    {log.type === 'action' && <span className="text-amber-300 font-bold">{log.text}</span>}
                    {log.type === 'info' && <span>{log.text}</span>}
                  </div>
                ))}
              </div>

              <div className="bg-pastel-bg p-5 flex flex-col items-center justify-center relative border-t-2 md:border-t-0 md:border-l-2 border-pastel-blue">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="w-full h-48 border-2 border-dashed border-pastel-blue/40 rounded-2xl bg-white/60 cursor-crosshair touch-none"
                />
                {!isDrawing && trails.length === 0 && (
                  <div className="absolute pointer-events-none text-center flex flex-col items-center gap-2 max-w-[80%]">
                    <Hand className="w-8 h-8 text-pastel-blue-dark animate-bounce-soft" />
                    <span className="text-xs font-bold text-pastel-navy/40">
                      Seret mouse ke kiri/kanan untuk geser proyek, atau gerakkan kursor untuk coretan laser trail.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-pastel-peach/20 border-t-2 border-pastel-blue p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {elCommands.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => runCommand(cmd.id)}
                    className={`flex items-center justify-between gap-2 p-3 rounded-xl border text-xs font-bold font-space transition-all duration-300 transform active:scale-95 ${
                      activeCmd === cmd.id
                        ? 'bg-pastel-yellow border-pastel-yellow-hover text-pastel-navy shadow-pastel-sm'
                        : 'bg-white border-pastel-blue/50 text-pastel-navy/80 hover:bg-pastel-blue/30 hover:border-pastel-blue'
                    }`}
                  >
                    <span>{cmd.label}</span>
                    {cmd.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: SALIN GAYA GATEWAY PANEL
            ========================================== */}
        {activeTab === 'salin_gaya' && (
          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Form */}
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-xl font-bold font-space text-pastel-navy flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-pastel-pink" />
                  Kalkulator Logistik & Order Thrifting
                </h3>

                {/* Weight Slider */}
                <div>
                  <label className="block text-xs font-bold text-pastel-navy/50 uppercase tracking-wider mb-2">
                    Berat Pakaian (kg): <span className="text-pastel-blue-dark font-space text-sm font-extrabold">{weight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-pastel-blue rounded-lg appearance-none cursor-pointer accent-pastel-blue-dark"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-pastel-navy/40 mt-1">
                    <span>1 kg</span>
                    <span>5 kg</span>
                    <span>10 kg</span>
                  </div>
                </div>

                {/* Distance Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-pastel-navy/50 uppercase tracking-wider mb-2">
                    Tujuan Wilayah Pengiriman
                  </label>
                  <select
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-pastel-peach bg-white font-semibold text-sm text-pastel-navy"
                  >
                    {Object.entries(distanceCosts).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label} - Rp{val.cost.toLocaleString('id-ID')}/kg
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Method Option */}
                <div>
                  <label className="block text-xs font-bold text-pastel-navy/50 uppercase tracking-wider mb-2">
                    Metode Pembayaran (Sandbox)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPayMethod('snap')}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-xs font-space transition-colors ${
                        payMethod === 'snap'
                          ? 'bg-pastel-blue/40 border-pastel-blue-dark text-pastel-blue-dark'
                          : 'bg-white border-pastel-peach/50 text-pastel-navy/70 hover:bg-pastel-peach/20'
                      }`}
                    >
                      Midtrans SNAP (Otomatis)
                    </button>
                    <button
                      onClick={() => setPayMethod('qris')}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-xs font-space transition-colors ${
                        payMethod === 'qris'
                          ? 'bg-pastel-pink/20 border-pastel-pink text-pastel-pink'
                          : 'bg-white border-pastel-peach/50 text-pastel-navy/70 hover:bg-pastel-peach/20'
                      }`}
                    >
                      QRIS Manual
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Order Summary & QRIS screen */}
              <div className="flex-1 bg-pastel-bg border-2 border-pastel-peach/60 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-pastel-navy/40 uppercase tracking-wider mb-4">// ORDER SUMMARY</span>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span>1x Custom Flannel Grade A</span>
                    <span>Rp{itemPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2 border-b border-dashed border-pastel-navy/10 pb-2">
                    <span>Ongkos Kirim ({weight}kg)</span>
                    <span>Rp{shippingCost.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-extrabold text-pastel-navy mt-4">
                    <span>TOTAL HARGA</span>
                    <span className="text-pastel-blue-dark font-space">Rp{totalCost.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Simulation Payment Trigger Panel */}
                <div className="mt-8 flex flex-col items-center justify-center min-h-[140px] border border-dashed border-pastel-peach/80 rounded-xl bg-white p-4">
                  {orderStatus === 'idle' && (
                    <div className="text-center w-full">
                      <p className="text-xs text-pastel-navy/60 font-semibold mb-4">Uji simulasi order untuk memicu proses gateway pembayaran.</p>
                      <button
                        onClick={handlePay}
                        className="w-full bg-pastel-pink hover:bg-pastel-pink/80 text-pastel-navy font-bold py-3 rounded-xl shadow-pastel-sm transition-all"
                      >
                        Bayar Sekarang
                      </button>
                    </div>
                  )}

                  {orderStatus === 'paying' && (
                    <div className="text-center w-full flex flex-col items-center">
                      {payLog && <p className="text-xs font-mono text-pastel-navy/70 mb-4 animate-pulse">{payLog}</p>}
                      
                      {payMethod === 'snap' ? (
                        <div className="border border-pastel-blue rounded-xl p-4 bg-pastel-blue/10 w-full animate-bounce-soft">
                          <span className="block text-xs font-bold text-pastel-blue-dark mb-2">Popup SNAP Simulator</span>
                          <button
                            onClick={handlePaySuccess}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-6 rounded-lg transition-colors"
                          >
                            Simulasikan Sukses Bank Transfer
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          {/* Fake QRIS SVG */}
                          <div className="bg-white border-2 border-pastel-navy p-2 rounded-lg w-28 h-28 flex flex-col items-center justify-center font-bold text-[10px] relative">
                            <span className="text-red-600 font-space font-extrabold mb-1">QRIS</span>
                            <div className="grid grid-cols-4 gap-1 w-20 h-20 bg-gray-200">
                              <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                              <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                              <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                              <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                            </div>
                          </div>
                          <button
                            onClick={handlePaySuccess}
                            className="bg-pastel-yellow border border-pastel-yellow-hover text-pastel-navy font-bold text-xs py-2 px-6 rounded-lg shadow-pastel-sm hover:scale-105 transition-transform"
                          >
                            Simulasikan Bayar QRIS Sukses
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {orderStatus === 'paid' && (
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center p-3 bg-pastel-green rounded-full mb-3 animate-ping">
                        <Check className="w-6 h-6 text-emerald-700" />
                      </span>
                      <p className="text-sm font-bold text-emerald-700 font-space">LUNAS! Order Berhasil Dicatat.</p>
                      <button
                        onClick={() => setOrderStatus('idle')}
                        className="text-[10px] font-bold text-pastel-navy/40 hover:text-pastel-navy mt-4 underline uppercase tracking-wider block mx-auto"
                      >
                        Reset Simulator
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: LIBRARYPRO PORTAL PANEL
            ========================================== */}
        {activeTab === 'library_pro' && (
          <div className="flex flex-col justify-between flex-grow h-full">
            {/* A. Gate View */}
            {libraryRole === 'gate' && (
              <div className="flex flex-col items-center justify-center flex-grow p-12 text-center bg-pastel-bg">
                <BookOpen className="w-16 h-16 text-pastel-blue-dark mb-4 animate-bounce-soft" />
                <h3 className="text-2xl font-bold font-space text-pastel-navy mb-2">Portal LibraryPro Simulator</h3>
                <p className="text-sm text-pastel-navy/60 max-w-sm mb-8 leading-relaxed">
                  Refleksi MVC Library System. Pilih peran Anda untuk menyimulasikan sistem validasi peminjaman atau pencarian buku fuzzy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                  <button
                    onClick={() => setLibraryRole('admin')}
                    className="flex-1 bg-white border-2 border-pastel-yellow hover:bg-pastel-yellow text-pastel-navy font-bold py-3.5 px-6 rounded-2xl shadow-pastel-sm transition-all"
                  >
                    Masuk Pustakawan (Admin)
                  </button>
                  <button
                    onClick={() => setLibraryRole('anggota')}
                    className="flex-1 bg-white border-2 border-pastel-blue hover:bg-pastel-blue text-pastel-navy font-bold py-3.5 px-6 rounded-2xl shadow-pastel-sm transition-all"
                  >
                    Masuk Anggota (Member)
                  </button>
                </div>
              </div>
            )}

            {/* B. Admin View */}
            {libraryRole === 'admin' && (
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-pastel-peach/30 pb-3">
                    <span className="text-sm font-bold font-space text-pastel-navy flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-pastel-blue-dark animate-pulse" />
                      Dashboard Pustakawan (Admin)
                    </span>
                    <button
                      onClick={() => setLibraryRole('gate')}
                      className="text-xs font-bold text-pastel-navy/40 hover:text-pastel-navy underline"
                    >
                      Keluar
                    </button>
                  </div>

                  <h4 className="text-sm font-bold font-space uppercase text-pastel-navy/50 tracking-wider mb-4">// Validasi Peminjaman Pending</h4>
                  
                  <div className="flex flex-col gap-4">
                    {borrowRequests.filter(req => req.status === 'Pending').length === 0 ? (
                      <div className="p-8 border border-dashed border-pastel-blue/40 bg-pastel-bg rounded-xl text-center">
                        <span className="text-sm font-semibold text-pastel-navy/40">Tidak ada pengajuan peminjaman pending!</span>
                      </div>
                    ) : (
                      borrowRequests.map(req => (
                        <div key={req.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-pastel-peach bg-pastel-peach/10 rounded-2xl gap-4">
                          <div>
                            <span className="block text-xs font-bold text-pastel-navy/40 font-mono">ID: {req.id} | Tanggal: {req.date}</span>
                            <span className="block text-sm font-bold text-pastel-navy">{req.name} <span className="font-medium text-pastel-navy/60">ingin meminjam</span> "{req.book}"</span>
                          </div>
                          
                          {req.status === 'Pending' ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveRequest(req.id, req.book)}
                                className="flex items-center gap-1 bg-pastel-green border border-emerald-600/30 text-emerald-700 font-bold text-xs py-2 px-4 rounded-xl hover:bg-emerald-200 transition-colors"
                              >
                                <Check className="w-4 h-4" /> Setujui
                              </button>
                              <button
                                onClick={() => handleRejectRequest(req.id)}
                                className="flex items-center gap-1 bg-pastel-pink border border-red-400/30 text-red-600 font-bold text-xs py-2 px-4 rounded-xl hover:bg-red-200 transition-colors"
                              >
                                <X className="w-4 h-4" /> Tolak
                              </button>
                            </div>
                          ) : (
                            <span className={`text-xs font-bold font-space py-1 px-3.5 rounded-full ${
                              req.status === 'Approved' ? 'bg-pastel-green/70 text-emerald-700' : 'bg-pastel-pink/70 text-red-600'
                            }`}>
                              {req.status}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-pastel-peach/30 pt-4 flex justify-between items-center text-xs font-semibold text-pastel-navy/50">
                  <span>Stok Tersedia Buku "Refactoring": {bookList.find(b => b.id === 102).stock}</span>
                  <span>*Persetujuan Admin secara otomatis memotong stok buku di katalog.</span>
                </div>
              </div>
            )}

            {/* C. Anggota View */}
            {libraryRole === 'anggota' && (
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-pastel-peach/30 pb-3">
                    <span className="text-sm font-bold font-space text-pastel-navy flex items-center gap-1.5">
                      <User className="w-5 h-5 text-pastel-blue-dark" />
                      Dashboard Anggota (Pembaca)
                    </span>
                    <button
                      onClick={() => setLibraryRole('gate')}
                      className="text-xs font-bold text-pastel-navy/40 hover:text-pastel-navy underline"
                    >
                      Keluar
                    </button>
                  </div>

                  {/* Fuzzy Search bar */}
                  <div className="mb-6 relative">
                    <label className="block text-xs font-bold text-pastel-navy/50 uppercase tracking-wider mb-2">Fuzzy Search Katalog Buku (Toleransi Typo Levenshtein)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fuzzyQuery}
                        onChange={(e) => setFuzzyQuery(e.target.value)}
                        placeholder="Cari e.g. 'codo', 'cln', 'refa', 'comp'..."
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-pastel-blue focus:border-pastel-blue-dark outline-none font-semibold text-sm transition-colors text-pastel-navy"
                      />
                      <Search className="w-5 h-5 text-pastel-navy/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    {fuzzyQuery && (
                      <span className="block text-[10px] font-bold text-pastel-blue-dark mt-1 font-mono uppercase tracking-wider">// Fuzzy match running...</span>
                    )}
                  </div>

                  {memberMessage && (
                    <div className="mb-4 p-3 bg-pastel-green/70 border border-emerald-600/30 rounded-xl text-emerald-700 text-xs font-bold font-space animate-pulse">
                      {memberMessage}
                    </div>
                  )}

                  {/* Book Catalog List */}
                  <div className="flex flex-col gap-3">
                    {filteredBooks.map(book => (
                      <div key={book.id} className="flex justify-between items-center p-4 border border-pastel-blue/40 bg-white rounded-2xl">
                        <div>
                          <span className="block font-bold text-pastel-navy text-sm md:text-base">{book.title}</span>
                          <span className="text-xs font-semibold text-pastel-navy/50">Stok: {book.stock} | Rating: ⭐ {book.rating}</span>
                        </div>
                        <button
                          onClick={() => handleMemberBorrow(book.title, book.stock)}
                          disabled={book.stock <= 0}
                          className={`py-2 px-4 rounded-xl font-bold text-xs transition-colors shadow-pastel-sm ${
                            book.stock > 0
                              ? 'bg-pastel-yellow border border-pastel-yellow-hover text-pastel-navy hover:scale-105'
                              : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {book.stock > 0 ? 'Ajukan Pinjam' : 'Kosong'}
                        </button>
                      </div>
                    ))}
                    {filteredBooks.length === 0 && (
                      <div className="p-8 border border-dashed border-pastel-pink/40 bg-pastel-pink/5 rounded-xl text-center text-pastel-pink flex items-center justify-center gap-2">
                        <ShieldAlert className="w-5 h-5" />
                        <span className="text-xs font-bold font-space uppercase tracking-wider">Buku tidak ditemukan! (Fuzzy threshold exceeded)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-pastel-peach/30 pt-4 flex justify-between items-center text-xs font-semibold text-pastel-navy/40">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-pastel-blue-dark" /> Geolocation Alamat: Aktif</span>
                  <span>Denda Tertunggak: Rp0</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Inline mock wrapper to let lucide User icon compile
function User(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
