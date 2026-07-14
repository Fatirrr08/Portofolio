import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Hand, Play, RotateCcw, Monitor, Sparkles, Columns, ZoomIn, EyeOff, Edit3 } from 'lucide-react';

export default function Simulator({ activeProjectIndex, setActiveProjectIndex, triggerGlobalEffect }) {
  const [logs, setLogs] = useState([
    { text: '[SYSTEM] Initializing GPU Pipeline (MPS Support)...', type: 'info' },
    { text: '[SYSTEM] Loading YOLOv8 weights "yolov8n.pt"... OK', type: 'info' },
    { text: '[SYSTEM] DeepSORT Tracker initialized.', type: 'info' },
    { text: '[SYSTEM] MediaPipe Landmark Classifier (21 Joints) loaded.', type: 'info' },
    { text: '[SYSTEM] Microphones mapped. Target: default backend input.', type: 'info' },
    { text: '[SYSTEM] CORE READY. Awaiting simulation inputs.', type: 'success' }
  ]);

  const canvasRef = useRef(null);
  const terminalRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [trails, setTrails] = useState([]);
  const [activeCmd, setActiveCmd] = useState('');

  // Terminal logger helper
  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { text: `[${timestamp}] ${text}`, type }]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Canvas drawing & animation loop for gesture trails
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
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
      ctx.fillStyle = 'rgba(250, 246, 238, 0.2)'; // Clear with slight fade for trails (matching pastel background cream)
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (localTrails.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = '#38BDF8'; // Sky blue trail for pastel vibe
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
  }, [trails, isDrawing]);

  // Mouse drag-swipe logic
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartX(x);
    const newTrails = [{ x, y }];
    setTrails(newTrails);
    addLog(`Pointer Down di Zona (X: ${Math.round(x)}, Y: ${Math.round(y)})`, 'info');
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

  // Touch Support
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    setIsDrawing(true);
    setStartX(x);
    setTrails([{ x, y }]);
  };

  const handleTouchMove = (e) => {
    if (!isDrawing || e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    setTrails(prev => {
      const next = [...prev, { x, y }];
      if (next.length > 20) next.shift();
      return next;
    });
  };

  const handleTouchEnd = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX - rect.left;
      const diffX = endX - startX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          addLog('Gestur Dikenali (Sentuh): Swipe Kanan', 'action');
          setActiveProjectIndex(prev => (prev - 1 + 5) % 5);
        } else {
          addLog('Gestur Dikenali (Sentuh): Swipe Kiri', 'action');
          setActiveProjectIndex(prev => (prev + 1) % 5);
        }
      }
    }
  };

  const runCommand = (cmd) => {
    setActiveCmd(cmd);
    
    switch (cmd) {
      case 'pena':
        addLog('Perintah Suara Virtual: "aktifkan pena"', 'action');
        triggerGlobalEffect('pena', addLog);
        break;
      case 'konfeti':
        addLog('Perintah Suara Virtual: "tampilkan konfeti"', 'action');
        triggerGlobalEffect('konfeti', addLog);
        break;
      case 'hitam':
        addLog('Perintah Suara Virtual: "layar hitam"', 'action');
        triggerGlobalEffect('hitam', addLog);
        break;
      case 'tirai':
        addLog('Perintah Suara Virtual: "buka tirai"', 'action');
        triggerGlobalEffect('tirai', addLog);
        break;
      case 'zoom':
        addLog('Perintah Suara Virtual: "zoom fit"', 'action');
        triggerGlobalEffect('zoom', addLog);
        break;
      case 'normal':
        addLog('Perintah Suara Virtual: "kembali normal"', 'action');
        triggerGlobalEffect('normal', addLog);
        break;
      default:
        break;
    }
  };

  const commands = [
    { id: 'pena', label: 'aktifkan pena', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'konfeti', label: 'tampilkan konfeti', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hitam', label: 'layar hitam', icon: <EyeOff className="w-4 h-4" /> },
    { id: 'tirai', label: 'buka tirai', icon: <Columns className="w-4 h-4" /> },
    { id: 'zoom', label: 'zoom fit', icon: <ZoomIn className="w-4 h-4" /> },
    { id: 'normal', label: 'kembali normal', icon: <RotateCcw className="w-4 h-4" /> },
  ];

  return (
    <section id="simulator" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          El Presentasi Simulator
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-yellow/60 -z-10 rounded-full"></span>
        </h2>
        <p className="text-pastel-navy/70 mt-4 max-w-2xl leading-relaxed">
          Simulasikan asisten presentasi nirkabel berbasis <strong>Computer Vision (YOLOv8 & MediaPipe)</strong> dan <strong>Speech Recognition</strong> yang saya buat. Coba geser mouse pada trackpad siber atau jalankan perintah suara di bawah!
        </p>
      </div>

      <div className="bg-white border-2 border-pastel-blue rounded-3xl overflow-hidden shadow-pastel-lg flex flex-col">
        {/* Simulator Bar */}
        <div className="bg-pastel-blue/30 border-b-2 border-pastel-blue px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-pastel-navy font-bold font-space text-sm md:text-base">
            <Cpu className="w-5 h-5 text-pastel-blue-dark animate-spin-slow" />
            <span>EL_GESTUR_ENGINE_V2.5</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-pastel-yellow/80 border border-pastel-yellow-hover px-3 py-1 rounded-full text-xs font-bold text-pastel-navy">
              <span className="w-2 h-2 rounded-full bg-pastel-yellow-hover animate-ping"></span>
              OK Pose Standby
            </div>
            
            <div className="hidden sm:flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-pastel-pink"></span>
              <span className="w-3 h-3 rounded-full bg-pastel-yellow"></span>
              <span className="w-3 h-3 rounded-full bg-pastel-green"></span>
            </div>
          </div>
        </div>

        {/* Simulator Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Terminal Console */}
          <div className="bg-[#121622] p-5 h-72 md:h-80 overflow-y-auto font-mono text-xs text-emerald-400 relative scanlines" ref={terminalRef}>
            {logs.map((log, idx) => (
              <div key={idx} className="mb-2 leading-relaxed">
                <span className="text-sky-400 mr-1.5">&gt;</span>
                {log.type === 'success' && <span className="text-emerald-300 font-bold">{log.text}</span>}
                {log.type === 'action' && <span className="text-amber-300 font-bold">{log.text}</span>}
                {log.type === 'info' && <span>{log.text}</span>}
              </div>
            ))}
          </div>

          {/* Gesture Pad Canvas */}
          <div className="bg-pastel-bg border-t-2 md:border-t-0 md:border-l-2 border-pastel-blue p-5 flex flex-col items-center justify-center relative">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleMouseMove} // MouseMove event handler can handle TouchMove coordinates if adjusted, but we use dedicated handler
              onTouchEnd={handleTouchEnd}
              className="w-full h-56 border-2 border-dashed border-pastel-blue/40 rounded-2xl bg-white/60 cursor-crosshair touch-none transition-colors duration-300 hover:border-pastel-blue"
            />
            
            {!isDrawing && trails.length === 0 && (
              <div className="absolute pointer-events-none text-center flex flex-col items-center gap-2 max-w-[80%]">
                <Hand className="w-8 h-8 text-pastel-blue-dark animate-bounce-soft" />
                <span className="text-xs font-bold text-pastel-navy/40 leading-relaxed">
                  <strong>Gesture Trackpad</strong><br />
                  Klik & seret ke kiri/kanan untuk geser slide proyek, atau gerakkan kursor untuk coretan laser trail.
                </span>
              </div>
            )}
            
            <span className="text-[10px] font-bold text-pastel-navy/40 mt-3 uppercase tracking-wider">// One Euro Filter Active (Smoothing jitter)</span>
          </div>
        </div>

        {/* Deck Commands Footer */}
        <div className="bg-pastel-peach/20 border-t-2 border-pastel-blue p-6">
          <span className="block text-xs font-bold font-space uppercase text-pastel-navy/60 tracking-wider mb-4">
            Simulasi Perintah Suara Virtual (Voice HUD)
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {commands.map((cmd) => (
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
    </section>
  );
}
