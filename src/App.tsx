/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Activity, ArrowUpRight, ArrowDownRight, Terminal, Zap, Crosshair, BarChart2, Cpu } from 'lucide-react';

// --- Mock Data for UI Prototype ---
const generateChartData = () => {
  let base = 42000;
  return Array.from({ length: 50 }).map((_, i) => {
    base = base + (Math.random() - 0.45) * 500;
    return { time: `10:${i < 10 ? '0'+i : i}`, price: base };
  });
};

const ASSETS = [
  { symbol: 'BTC-USD', price: '64,230.50', change: '+2.4%', up: true, vol: '1.2B' },
  { symbol: 'ETH-USD', price: '3,450.12', change: '+1.8%', up: true, vol: '840M' },
  { symbol: 'SOL-USD', price: '145.20', change: '-0.5%', up: false, vol: '320M' },
  { symbol: 'NVDA-EQ', price: '890.45', change: '+4.2%', up: true, vol: '2.1B' },
  { symbol: 'TSLA-EQ', price: '175.30', change: '-1.2%', up: false, vol: '1.5B' },
];

const TICKER_ITEMS = [
  "SYS.STATUS: ONLINE",
  "LATENCY: 12ms",
  "BTC/USD 64,230.50 (+2.4%)",
  "ETH/USD 3,450.12 (+1.8%)",
  "MARKET VOLATILITY: HIGH",
  "NODE: EU-WEST-2",
  "ENCRYPTION: AES-256",
];

export default function App() {
  const [chartData, setChartData] = useState(generateChartData());
  const [activeAsset, setActiveAsset] = useState(ASSETS[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Simulate real-time updates for the prototype
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          price: lastPrice + (Math.random() - 0.48) * 200
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#39FF14] font-mono selection:bg-[#39FF14] selection:text-black relative">
      <div className="scanlines"></div>
      
      {/* Top Ticker Marquee */}
      <div className="w-full border-b border-[#39FF14]/30 bg-[#39FF14]/5 overflow-hidden flex items-center h-8 text-xs tracking-widest uppercase">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full mr-2 animate-pulse"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Header / Branding */}
        <header className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#39FF14]/30 pb-4 mb-2">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-4xl md:text-6xl font-bold tracking-tighter uppercase text-glow"
              data-text="NEXUS_TRADE"
            >
              NEXUS_TRADE
            </motion.h1>
            <p className="text-xs tracking-[0.2em] opacity-70 mt-1 flex items-center">
              <Terminal className="w-3 h-3 mr-2" />
              QUANTUM EXECUTION TERMINAL v2.4.1
            </p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <div className="text-2xl font-bold">{time}</div>
            <div className="text-xs opacity-70 tracking-widest uppercase">SYS_TIME (LOCAL)</div>
          </div>
        </header>

        {/* Main Chart Area */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Portfolio Summary */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-[#39FF14]/30 bg-neon-dimmer p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#39FF14]"></div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xs tracking-widest uppercase opacity-70 mb-2">Total Value (USD)</h2>
                <div className="font-sans text-5xl md:text-7xl font-bold tracking-tighter text-glow">
                  $1,248,930.00
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+14,230.50 (1.15%)</span>
                  <span className="mx-3 opacity-30">|</span>
                  <span className="opacity-70">TODAY</span>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center w-16 h-16 border border-[#39FF14]/30 rounded-full group-hover:box-glow transition-all duration-500">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="border border-[#39FF14]/30 bg-neon-dimmer p-4 h-[400px] md:h-[500px] relative flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                <h3 className="text-sm tracking-widest uppercase font-bold">{activeAsset.symbol} // LIVE FEED</h3>
              </div>
              <div className="flex gap-2 text-xs">
                {['1M', '15M', '1H', '4H', '1D'].map(tf => (
                  <button key={tf} className={`px-2 py-1 border ${tf === '15M' ? 'border-[#39FF14] bg-[#39FF14]/20 text-glow' : 'border-[#39FF14]/30 hover:bg-[#39FF14]/10'} transition-colors`}>
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#39FF14" strokeOpacity={0.1} vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#39FF14" 
                    strokeOpacity={0.5} 
                    tick={{ fill: '#39FF14', fontSize: 10, opacity: 0.7 }} 
                    tickMargin={10}
                    minTickGap={30}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    stroke="#39FF14" 
                    strokeOpacity={0.5} 
                    tick={{ fill: '#39FF14', fontSize: 10, opacity: 0.7 }}
                    tickFormatter={(val) => `$${val.toLocaleString()}`}
                    width={80}
                    orientation="right"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#050505', border: '1px solid #39FF14', borderRadius: 0, boxShadow: '0 0 10px rgba(57, 255, 20, 0.2)' }}
                    itemStyle={{ color: '#39FF14', fontWeight: 'bold' }}
                    labelStyle={{ color: '#39FF14', opacity: 0.7, marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#39FF14" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: '#050505', stroke: '#39FF14', strokeWidth: 2 }}
                    animationDuration={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Action Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-[#39FF14]/30 bg-neon-dimmer p-6"
          >
            <h3 className="text-sm tracking-widest uppercase mb-4 flex items-center border-b border-[#39FF14]/30 pb-2">
              <Crosshair className="w-4 h-4 mr-2" />
              EXECUTE_ORDER
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="bg-[#39FF14]/10 border border-[#39FF14] py-3 font-bold uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-all duration-300 box-glow cursor-pointer">
                BUY
              </button>
              <button className="bg-transparent border border-[#39FF14]/50 py-3 font-bold uppercase tracking-widest hover:bg-[#39FF14]/20 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer">
                SELL
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs opacity-70 uppercase block mb-1">Order Type</label>
                <select className="w-full bg-transparent border border-[#39FF14]/30 p-2 text-[#39FF14] outline-none focus:border-[#39FF14] appearance-none cursor-pointer">
                  <option className="bg-black">MARKET</option>
                  <option className="bg-black">LIMIT</option>
                  <option className="bg-black">STOP_LOSS</option>
                </select>
              </div>
              <div>
                <label className="text-xs opacity-70 uppercase block mb-1">Amount ({activeAsset.symbol.split('-')[0]})</label>
                <input 
                  type="text" 
                  defaultValue="1.5000"
                  className="w-full bg-transparent border border-[#39FF14]/30 p-2 text-[#39FF14] outline-none focus:border-[#39FF14] font-sans text-xl"
                />
              </div>
              <div className="pt-4 border-t border-[#39FF14]/30 flex justify-between items-center">
                <span className="text-xs opacity-70 uppercase">Est. Total</span>
                <span className="font-bold text-lg">${(parseFloat(activeAsset.price.replace(',','')) * 1.5).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>
          </motion.div>

          {/* Asset List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-[#39FF14]/30 bg-neon-dimmer flex-1 flex flex-col"
          >
            <h3 className="text-sm tracking-widest uppercase p-4 border-b border-[#39FF14]/30 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              MARKET_DATA
            </h3>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs opacity-70 uppercase border-b border-[#39FF14]/30 bg-[#39FF14]/5">
                  <tr>
                    <th className="p-3 font-normal">Asset</th>
                    <th className="p-3 font-normal text-right">Price</th>
                    <th className="p-3 font-normal text-right">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {ASSETS.map((asset, idx) => (
                    <tr 
                      key={asset.symbol} 
                      onClick={() => setActiveAsset(asset)}
                      className={`border-b border-[#39FF14]/10 cursor-pointer transition-colors ${activeAsset.symbol === asset.symbol ? 'bg-[#39FF14]/20' : 'hover:bg-[#39FF14]/10'}`}
                    >
                      <td className="p-3 font-bold">{asset.symbol}</td>
                      <td className="p-3 text-right">${asset.price}</td>
                      <td className={`p-3 text-right flex items-center justify-end ${asset.up ? 'text-glow' : 'opacity-70'}`}>
                        {asset.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {asset.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#39FF14]/30 mt-8 p-2 text-[10px] flex justify-between items-center uppercase tracking-widest opacity-50 relative z-10">
        <div className="flex items-center">
          <Cpu className="w-3 h-3 mr-2" />
          SYSTEM SECURE
        </div>
        <div>DATA DELAY: 0ms</div>
      </footer>
    </div>
  );
}
