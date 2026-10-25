import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, BatteryCharging, Bot, CheckSquare, ChevronLeft, ChevronRight, Cloud, Cpu, FileText, Grid2X2, ListTodo, Mic, MessageCircle, Send, Settings, ShieldCheck, Wifi, X, Zap, Volume2, Smartphone, Sparkles } from 'lucide-react';
import './style.css';

type Panel = 'settings' | 'monitors' | 'battery' | 'ram' | 'network' | 'tasks' | 'logs' | 'weather' | 'quick' | 'more' | null;
const features = [
  { name: 'System Monitor', description: 'Device performance and live metrics', icon: Activity },
  { name: 'Battery Control', description: 'Battery status and power information', icon: BatteryCharging },
  { name: 'RAM Monitor', description: 'Memory usage overview', icon: Cpu },
  { name: 'Network Status', description: 'Wi-Fi and signal status', icon: Wifi },
  { name: 'Active Tasks', description: 'Review your current task list', icon: CheckSquare },
  { name: 'Command Logs', description: 'Recent assistant activity', icon: FileText },
  { name: 'Weather', description: 'Local weather preview', icon: Cloud },
  { name: 'App Launcher', description: 'App shortcuts preview', icon: Smartphone },
  { name: 'Voice Assistant', description: 'Voice interface preview', icon: Mic },
  { name: 'Security Center', description: 'Security status preview', icon: ShieldCheck },
  { name: 'Quick Actions', description: 'Frequently used commands', icon: Zap },
  { name: 'AI Preferences', description: 'Assistant settings', icon: Sparkles },
];
const quickActions = [
  { label: 'Check battery level', icon: BatteryCharging, text: 'Battery status preview: 78% remaining.' },
  { label: "What's the weather?", icon: Cloud, text: 'Weather preview: Colombo is partly cloudy, 28°C.' },
  { label: 'Open YouTube', icon: Zap, text: 'This web UI preview does not launch external apps.' },
  { label: 'Show my tasks', icon: ListTodo, text: 'You have 3 sample tasks in this UI preview.' },
];
const taskItems = ['Review today’s schedule', 'Check battery status', 'Prepare a daily summary'];
const logItems = ['J.A.R.V.I.S. interface initialized', 'Holographic dashboard loaded', 'Voice interface ready for connection', 'Weather preview refreshed'];

function App() {
  const [panel, setPanel] = useState<Panel>(null);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Good evening, Sir. How may I assist you this evening?');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [featurePage, setFeaturePage] = useState(0);

  const open = (next: Panel) => setPanel(current => current === next ? null : next);
  const respond = (text: string) => {
    setReply(text);
    setPanel(null);
  };
  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const value = message.trim();
    if (!value) return;
    setReply(`“${value}” — UI preview only. J.A.R.V.I.S. backend is not connected.`);
    setMessage('');
    setSpeaking(true);
    window.setTimeout(() => setSpeaking(false), 1600);
  };

  const hotspots = [
    { name: 'Weather details', className: 'hot-weather', action: () => open('weather') },
    { name: 'Greeting', className: 'hot-greeting', action: () => respond('Good evening, Sir. How may I assist you this evening?') },
    { name: 'Clock', className: 'hot-clock', action: () => respond(`Current local time: ${new Date().toLocaleTimeString()}`) },
    { name: 'Settings', className: 'hot-settings', action: () => open('settings') },
    { name: 'System monitors', className: 'hot-monitor', action: () => open('monitors') },
    { name: 'Battery', className: 'hot-battery', action: () => open('battery') },
    { name: 'RAM', className: 'hot-ram', action: () => open('ram') },
    { name: 'Network', className: 'hot-network', action: () => open('network') },
    { name: 'Active tasks', className: 'hot-tasks', action: () => open('tasks') },
    { name: 'Command logs', className: 'hot-logs', action: () => open('logs') },
    { name: 'Weather card', className: 'hot-weather-card', action: () => open('weather') },
    { name: 'View all logs', className: 'hot-all-logs', action: () => open('logs') },
    { name: 'Quick access', className: 'hot-quick', action: () => open('quick') },
    { name: 'Microphone', className: 'hot-mic', action: () => { setListening(v => !v); setReply(listening ? 'Microphone preview stopped.' : 'Microphone preview active — voice recognition is not connected.'); } },
    { name: 'Show more features', className: 'hot-more', action: () => { setFeaturePage(0); open('more'); } },
    { name: 'Voice output', className: 'hot-sound', action: () => { setSpeaking(v => !v); setReply(speaking ? 'Voice output preview stopped.' : 'Voice output preview active.'); } },
    { name: 'Check battery shortcut', className: 'hot-action-battery', action: () => respond(quickActions[0].text) },
    { name: 'Weather shortcut', className: 'hot-action-weather', action: () => respond(quickActions[1].text) },
    { name: 'YouTube shortcut', className: 'hot-action-youtube', action: () => respond(quickActions[2].text) },
    { name: 'Tasks shortcut', className: 'hot-action-tasks', action: () => open('tasks') },
  ];

  return <main className="page">
    <div className="dashboard" aria-label="JARVIS futuristic dashboard">
      <img className="reference-art" src={`${import.meta.env.BASE_URL}jarvis-reference-dashboard.png`} alt="J.A.R.V.I.S. holographic dashboard reference design" draggable={false} />
      <div className="hotspot-layer">
        {hotspots.map(item => <button key={item.className} type="button" aria-label={item.name} title={item.name} className={`hotspot ${item.className}`} onClick={item.action} />)}
        <form className="message-hotspot" onSubmit={send} aria-label="Send a message to JARVIS">
          <MessageCircle className="message-icon" size={22} aria-hidden="true" />
          <input value={message} onChange={e => setMessage(e.target.value)} aria-label="Type your message" placeholder="Type your message or say something..." />
          <button type="submit" aria-label="Send message"><Send size={22} /></button>
        </form>
        {reply !== 'Good evening, Sir. How may I assist you this evening?' && <div className="response-overlay" role="status">{reply}</div>}
        {listening && <div className="state-chip listening-chip"><span /> MICROPHONE PREVIEW ACTIVE</div>}
        {speaking && <div className="state-chip speaking-chip"><span /> VOICE OUTPUT ACTIVE</div>}
      </div>
    </div>

    {panel && <div className="modal-backdrop" onClick={() => setPanel(null)}>
      <section className={`panel panel-${panel}`} role="dialog" aria-modal="true" aria-label={panel === 'more' ? 'Feature modules' : panel === 'quick' ? 'Quick access' : panel} onClick={e => e.stopPropagation()}>
        <header className="panel-header">
          <div><span className="eyebrow">J.A.R.V.I.S. / UI PREVIEW</span><h2>{({ settings: 'Settings', monitors: 'System Monitors', battery: 'Battery Status', ram: 'RAM Monitor', network: 'Network Status', tasks: 'Active Tasks', logs: 'Command Logs', weather: 'Weather', quick: 'Quick Access', more: 'Feature Modules' } as Record<Exclude<Panel, null>, string>)[panel]}</h2></div>
          <button className="close-button" onClick={() => setPanel(null)} aria-label="Close panel"><X /></button>
        </header>
        {panel === 'more' && <>
          <p className="panel-description">Holographic feature modules. This is a UI preview; phone actions are not connected.</p>
          <div className="feature-grid">{features.slice(featurePage * 6, featurePage * 6 + 6).map(item => <button className="feature-tile" key={item.name} onClick={() => respond(`${item.name}: ${item.description}.`)}><span><item.icon size={20}/></span><b>{item.name}</b><small>{item.description}</small></button>)}</div>
          <footer className="pager"><button disabled={featurePage === 0} onClick={() => setFeaturePage(0)}><ChevronLeft size={16}/> Previous</button><span>{featurePage + 1} / 2</span><button disabled={featurePage === 1} onClick={() => setFeaturePage(1)}>Next <ChevronRight size={16}/></button></footer>
        </>}
        {panel === 'quick' && <div className="quick-grid">{quickActions.map(a => <button key={a.label} onClick={() => respond(a.text)}><a.icon size={20}/><span>{a.label}</span><ChevronRight size={18}/></button>)}</div>}
        {panel === 'settings' && <div className="settings-list"><div><span><Volume2/> Voice output</span><b>PREVIEW</b></div><div><span><Mic/> Microphone access</span><b>NOT CONNECTED</b></div><div><span><ShieldCheck/> Privacy & permissions</span><b>LOCAL UI</b></div><p>This web dashboard is a frontend preview. Device actions require a connected backend or native bridge.</p></div>}
        {panel === 'monitors' && <div className="monitor-grid"><Metric icon={<BatteryCharging/>} title="Battery" value="78%" progress={78}/><Metric icon={<Cpu/>} title="Memory" value="4.2 / 8 GB" progress={53}/><Metric icon={<Wifi/>} title="Network" value="Wi-Fi connected" progress={92}/><Metric icon={<Activity/>} title="System" value="Nominal" progress={86}/></div>}
        {panel === 'battery' && <Detail icon={<BatteryCharging size={42}/>} title="78%" description="Battery status sample. Live device telemetry is not connected." />}
        {panel === 'ram' && <Detail icon={<Cpu size={42}/>} title="4.2 / 8 GB" description="Memory usage preview. Live system metrics require a native device connection." />}
        {panel === 'network' && <Detail icon={<Wifi size={42}/>} title="Wi-Fi connected" description="Signal status preview. Network diagnostics are not connected." />}
        {panel === 'weather' && <Detail icon={<Cloud size={42}/>} title="28°C" description="Colombo, Sri Lanka · Partly cloudy. Weather shown here is sample UI data." />}
        {panel === 'tasks' && <div className="list-items">{taskItems.map((t, i) => <div key={t}><CheckSquare/><span>{t}</span><small>{i === 0 ? 'IN PROGRESS' : 'SCHEDULED'}</small></div>)}</div>}
        {panel === 'logs' && <div className="list-items">{logItems.map((t, i) => <div key={t}><FileText/><span>{t}</span><small>{`${i + 1}m ago`}</small></div>)}</div>}
      </section>
    </div>}
  </main>;
}

function Metric({icon,title,value,progress}:{icon:React.ReactNode;title:string;value:string;progress:number}) { return <div className="metric"><span>{icon}</span><small>{title}</small><b>{value}</b><i><i style={{width:`${progress}%`}}/></i></div>; }
function Detail({icon,title,description}:{icon:React.ReactNode;title:string;description:string}) { return <div className="detail"><span>{icon}</span><strong>{title}</strong><p>{description}</p></div>; }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
