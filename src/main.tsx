import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, BatteryCharging, Bot, CheckSquare, ChevronRight, Cloud, Cpu, FileText, Grid2X2, ListTodo, Menu, Mic, MessageCircle, Send, Settings, ShieldCheck, Signal, Sparkles, Volume2, Wifi, X, Zap } from 'lucide-react';
import './style.css';

type Panel = 'quick' | 'more' | 'settings' | 'tasks' | 'logs' | 'monitors' | 'weather' | null;
const quickActions = [
  { label: 'Check battery level', icon: BatteryCharging, reply: 'Battery status preview: 78% remaining.' },
  { label: "What's the weather?", icon: Cloud, reply: 'Weather preview: Colombo is partly cloudy, 28°C.' },
  { label: 'Open YouTube', icon: Zap, reply: 'UI demo only — no apps will be opened.' },
  { label: 'Show my tasks', icon: ListTodo, reply: 'You have 3 sample tasks in this UI preview.' },
];
const features = [
  ['System Monitor','Live device metrics preview'],['Battery Control','Battery status and power info'],['RAM Monitor','Memory usage preview'],['Network Status','Wi-Fi and signal preview'],
  ['Active Tasks','View sample scheduled tasks'],['Command Logs','Browse demo activity logs'],['Weather','Weather card preview'],['App Launcher','UI demo — no apps launched'],
  ['Voice Assistant','Voice controls are simulated'],['Memory Notes','Sample notes only'],['Automation','No automation will run'],['Security Center','Permission status preview']
];
function App(){
  const [panel,setPanel] = useState<Panel>(null);
  const [message,setMessage] = useState('');
  const [reply,setReply] = useState('Good evening. How may I assist you this evening?');
  const [listening,setListening] = useState(false);
  const [speaking,setSpeaking] = useState(false);
  const [morePage,setMorePage] = useState(0);
  const avatar = useRef<HTMLIFrameElement>(null);
  const [time,setTime] = useState(new Date());
  useEffect(()=>{const id=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(id)},[]);
  const avatarCall=(script:string)=>{try{avatar.current?.contentWindow?.eval(script)}catch{}}
  const togglePanel=(next:Panel)=>{const isMore=next==='more'; const isQuick=next==='quick'; setPanel(panel===next?null:next); avatarCall(`window.jarvisSetPanels(${isMore && panel!==next}, ${isQuick && panel!==next});`)};
  const send=(text=message)=>{if(!text.trim())return;setReply(`“${text.trim()}” — UI preview only. J.A.R.V.I.S. backend is not connected.`);setMessage('');setSpeaking(true);avatarCall('window.setSpeaking(true); window.pulseAudio(0.7);');window.setTimeout(()=>{setSpeaking(false);avatarCall('window.setSpeaking(false); window.pulseAudio(0.1);')},1800)};
  const toggleListen=()=>{setListening(v=>!v);setReply(listening?'Microphone preview stopped.':'Microphone preview active — voice recognition is not connected.');};
  const openPanel=(p:Panel)=>setPanel(panel===p?null:p);
  const FeatureIcon=({name}:{name:string})=>{const props={size:19}; if(name.includes('Monitor'))return <Activity {...props}/>; if(name.includes('Battery'))return <BatteryCharging {...props}/>;if(name.includes('Network'))return <Wifi {...props}/>;if(name.includes('Tasks'))return <CheckSquare {...props}/>;if(name.includes('Logs'))return <FileText {...props}/>;if(name.includes('Weather'))return <Cloud {...props}/>;if(name.includes('Voice'))return <Mic {...props}/>;return <Sparkles {...props}/>};
  return <main className="app-shell">
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <div className="statusbar"><span>{time.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span><div><Wifi size={17}/><Signal size={17}/><BatteryCharging size={17}/></div></div>
    <header className="topbar">
      <div className="brand-mark"><Bot size={39}/></div><div className="brand"><h1>J.A.R.V.I.S.</h1><span>JUST A RATHER VERY INTELLIGENT SYSTEM</span></div>
      <div className="header-right"><div className="online"><i/> <b>ONLINE</b><small>UI PREVIEW</small></div><button className="icon-btn" onClick={()=>openPanel('settings')} aria-label="Settings"><Settings size={23}/></button></div>
    </header>
    <section className="top-strip">
      <button className="strip-card weather-strip" onClick={()=>openPanel('weather')}><Cloud size={37}/><span><small>Colombo, LK</small><strong>28°C</strong><em>Partly Cloudy</em></span></button>
      <div className="strip-card greeting"><span>“Good evening. How may I assist you this evening?”</span></div>
      <div className="strip-card clock"><small>{time.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'})}</small><strong>{time.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})}</strong></div>
    </section>
    <section className="hero">
      <div className="side-stack left-stack">
        <button className="metric-card" onClick={()=>openPanel('monitors')}><span className="metric-icon"><Activity/></span><span><b>SYSTEM<br/>MONITORS</b><small>Open dashboard</small></span><ChevronRight className="chev"/></button>
        <button className="metric-card" onClick={()=>openPanel('monitors')}><span className="metric-icon"><BatteryCharging/></span><span><b>BATTERY</b><small>78% <i className="meter"><i style={{width:'78%'}}/></i></small></span><ChevronRight className="chev"/></button>
        <button className="metric-card" onClick={()=>openPanel('monitors')}><span className="metric-icon"><Cpu/></span><span><b>RAM</b><small>4.2 / 8 GB <i className="meter"><i style={{width:'53%'}}/></i></small></span><ChevronRight className="chev"/></button>
        <button className="metric-card" onClick={()=>openPanel('monitors')}><span className="metric-icon"><Wifi/></span><span><b>NETWORK</b><small>Wi-Fi connected</small></span><ChevronRight className="chev"/></button>
      </div>
      <div className="face-stage"><div className="stage-orbit orbit-one"/><div className="stage-orbit orbit-two"/><div className="stage-grid"/><div className="corner corner-tl"/><div className="corner corner-tr"/><div className="corner corner-bl"/><div className="corner corner-br"/>
        <iframe ref={avatar} title="JARVIS 3D wireframe avatar" src={`${import.meta.env.BASE_URL}3d/jarvis-avatar.html`} className="avatar-frame" allow="autoplay" />
        <div className="face-label"><span className="pulse-dot"/> HOLOGRAPHIC CORE <span>•</span> ONLINE</div>
      </div>
      <div className="side-stack right-stack">
        <button className="metric-card" onClick={()=>openPanel('tasks')}><span className="metric-icon"><CheckSquare/></span><span><b>ACTIVE TASKS</b><small>3 sample tasks</small></span><ChevronRight className="chev"/></button>
        <button className="metric-card" onClick={()=>openPanel('logs')}><span className="metric-icon"><FileText/></span><span><b>COMMAND LOGS</b><small>Latest activity</small></span><ChevronRight className="chev"/></button>
        <button className="metric-card" onClick={()=>openPanel('weather')}><span className="metric-icon"><Cloud/></span><span><b>WEATHER</b><small>28°C · Cloudy</small></span><ChevronRight className="chev"/></button>
        <button className="metric-card" onClick={()=>openPanel('logs')}><span className="metric-icon"><Menu/></span><span><b>VIEW ALL LOGS</b><small>Demo entries</small></span><ChevronRight className="chev"/></button>
      </div>
    </section>
    <nav className="feature-controls">
      <button className={`wide-control ${panel==='quick'?'selected':''}`} onClick={()=>togglePanel('quick')}><Zap/><b>QUICK ACCESS</b><ChevronRight className="control-chevron"/></button>
      <button className={`mic-control ${listening?'listening':''}`} onClick={toggleListen} aria-label="Toggle microphone preview"><span className="sound-bars"><i/><i/><i/><i/><i/></span><Mic size={32}/><span className="sound-bars"><i/><i/><i/><i/><i/></span></button>
      <button className={`wide-control ${panel==='more'?'selected':''}`} onClick={()=>togglePanel('more')}><Grid2X2/><b>SHOW MORE</b><ChevronRight className="control-chevron"/></button>
    </nav>
    <section className="assistant-card">
      <div className="assistant-head"><div className="mini-logo"><Bot size={25}/></div><div className="assistant-id"><b>J.A.R.V.I.S.</b><small><i/> ONLINE · UI PREVIEW</small></div><button className="sound-toggle" onClick={()=>{setSpeaking(v=>!v);avatarCall(`window.setSpeaking(${!speaking});`)}}><Volume2/></button></div>
      <div className="reply-bubble">{reply}</div>
      <div className="quick-actions">{quickActions.map(a=><button key={a.label} onClick={()=>send(a.label)}><a.icon size={16}/><span>{a.label}</span></button>)}</div>
      <form className="composer" onSubmit={e=>{e.preventDefault();send()}}><MessageCircle size={22}/><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Type your message or say something..."/><button type="submit" aria-label="Send message"><Send size={22}/></button></form>
    </section>
    {panel && <div className="panel-backdrop" onClick={()=>setPanel(null)}><section className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><small>J.A.R.V.I.S. / UI PREVIEW</small><h2>{panel==='more'?'Feature Modules':panel==='quick'?'Quick Access':panel==='settings'?'Settings':panel==='tasks'?'Active Tasks':panel==='logs'?'Command Logs':panel==='weather'?'Weather':'System Monitors'}</h2></div><button className="icon-btn" onClick={()=>{setPanel(null);avatarCall('window.jarvisSetPanels(false,false);')}}><X/></button></div>
      {panel==='more' && <><p className="drawer-note">Swipe-style carousel preview. These are UI demonstrations only; no phone actions run.</p><div className="feature-grid">{features.slice(morePage*6,morePage*6+6).map(([name,desc])=><button className="feature-tile" key={name} onClick={()=>setReply(`${name}: ${desc}. UI preview only.`)}><span><FeatureIcon name={name}/></span><b>{name}</b><small>{desc}</small></button>)}</div><div className="pager"><button onClick={()=>setMorePage(Math.max(0,morePage-1))} disabled={morePage===0}>← Previous</button><span>{morePage+1} / 2</span><button onClick={()=>setMorePage(Math.min(1,morePage+1))} disabled={morePage===1}>Next →</button></div></>}
      {panel==='quick' && <div className="quick-grid">{quickActions.map(a=><button key={a.label} onClick={()=>{setReply(a.reply);setPanel(null)}}><a.icon/><span>{a.label}</span><ChevronRight/></button>)}</div>}
      {panel==='settings' && <div className="settings-list"><div><span><ShieldCheck/> Backend connection</span><b className="demo-badge">NOT CONNECTED</b></div><div><span><Mic/> Microphone input</span><b>SIMULATED</b></div><div><span><Volume2/> Voice output</span><b>SIMULATED</b></div><p>This website is a visual prototype. It does not connect to the Kotlin backend, request permissions, access your microphone, or control your phone.</p></div>}
      {panel==='tasks' && <div className="sample-list">{['Morning briefing · 08:00','Check weather · On demand','Review system status · Demo'].map((x,i)=><div key={x}><CheckSquare/><span>{x}</span><small>{i===0?'SAMPLE':'PREVIEW'}</small></div>)}</div>}
      {panel==='logs' && <div className="sample-list">{['10:42:05 · UI preview opened','10:42:12 · SHOW MORE selected','10:42:20 · Sample action tapped'].map(x=><div key={x}><FileText/><span>{x}</span><small>DEMO</small></div>)}</div>}
      {panel==='weather' && <div className="weather-detail"><Cloud size={54}/><strong>28°C</strong><b>Partly Cloudy</b><span>Colombo, Sri Lanka · sample display</span><div><span>Humidity <b>72%</b></span><span>Wind <b>14 km/h</b></span></div><small>Weather values are sample UI data; live weather is not connected.</small></div>}
      {panel==='monitors' && <div className="monitor-grid"><div><BatteryCharging/><span>Battery</span><b>78%</b><i><i style={{width:'78%'}}/></i></div><div><Cpu/><span>RAM</span><b>4.2 / 8 GB</b><i><i style={{width:'53%'}}/></i></div><div><Wifi/><span>Network</span><b>Connected</b></div><div><Activity/><span>CPU load</span><b>32% · sample</b></div><p>These values are static demo data and do not read actual device telemetry.</p></div>}
    </section></div>}
    <footer><span><Sparkles size={13}/> FRONTEND PREVIEW ONLY</span><span>No AI · No backend · No phone actions</span></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
