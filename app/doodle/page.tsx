'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'

// ── Jay's real palette ───────────────────────────────────────────────────────
const P = {
  purple:   '#8A038C',
  periwink: '#6B71F2',
  sky:      '#29A5F2',
  crimson:  '#C61D70',
  cream:    '#F1F1C2',
  green:    '#1D752C',
  bg:       '#0E0520',
  panel:    '#160830',
  border:   'rgba(107,113,242,0.25)',
}

// ── Types ────────────────────────────────────────────────────────────────────
type El = { id:string; src:string; label:string; x:number; y:number; w:number; h:number; rot:number; z:number }
type Tab = 'chars'|'buttons'|'stars'|'random'|'letters'

// ── Updated asset catalogue ───────────────────────────────────────────────────
// Characters: individual oval portraits (35-42)
const CHARS = [35,36,37,38,39,40,41,42].map((n,i) => ({
  src: `/studio/v2/characters/${n}.png`,
  label: `Character ${i+1}`,
  w: 80, h: 80,
}))

// Buttons: 1-8
const BUTTONS = [1,2,3,4,5,6,7,8].map((n,i) => ({
  src: `/studio/v2/stickers/${n}.png`, label: `Button ${i+1}`, w: 70, h: 70,
}))
// Stars: 43-52
const STARS = [43,44,45,46,47,48,49,50,51,52].map((n,i) => ({
  src: `/studio/v2/stickers/${n}.png`, label: `Star ${i+1}`, w: 70, h: 70,
}))
// Random: 53-61
const RANDOM = [53,54,55,56,57,58,59,60,61].map((n,i) => ({
  src: `/studio/v2/stickers/${n}.png`, label: `Item ${i+1}`, w: 70, h: 70,
}))

// Letters: chrome metallic A-Z (files 9-34 = A-Z)
const LETTER_FILES = Array.from({length:26},(_,i)=>i+9)  // 9=A, 10=B ... 34=Z
const LETTER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function uid(){ return Math.random().toString(36).slice(2) }

// ── Component ─────────────────────────────────────────────────────────────────
export default function Studio() {
  const [els,  setEls]  = useState<El[]>([])
  const [selId,setSelId]= useState<string|null>(null)
  const [tab,  setTab]  = useState<Tab>('chars')
  const [exp,  setExp]  = useState(false)
  const [hist, setHist] = useState<El[][]>([])

  const cvRef  = useRef<HTMLDivElement>(null)
  const maxZ   = useRef(1)
  const drag   = useRef<{id:string;sx:number;sy:number;ex:number;ey:number}|null>(null)

  // Hide global nav/footer/stars while on this page
  useEffect(() => {
    const hide = (sel: string) => {
      const el = document.querySelector(sel) as HTMLElement|null
      if (el) el.style.display = 'none'
      return el
    }
    // Nav stays visible so user can navigate back
    const foot = hide('footer')
    const spn  = hide('.spinning-badge-wrap')
    const sf   = document.getElementById('global-star-field') as HTMLElement|null
    if (sf) sf.style.display = 'none'
    document.body.style.overflow = 'hidden'
    return () => {
      if (foot) foot.style.display = ''
      if (spn)  spn.style.display  = ''
      if (sf)   sf.style.display   = ''
      document.body.style.overflow = ''
    }
  }, [])

  // Global drag listeners
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current; if (!d) return
      e.preventDefault()
      setEls(p => p.map(el => el.id===d.id ? {...el, x:d.ex+(e.clientX-d.sx), y:d.ey+(e.clientY-d.sy)} : el))
    }
    const up = () => { drag.current = null }
    window.addEventListener('pointermove', move, {passive:false})
    window.addEventListener('pointerup',   up)
    return () => { window.removeEventListener('pointermove',move); window.removeEventListener('pointerup',up) }
  }, [])

  const saveH = useCallback(() => setHist(h => [...h.slice(-15), els]), [els])

  const spawn = useCallback((src:string, label:string, w:number, h:number) => {
    saveH()
    const cv = cvRef.current
    const cx = cv ? Math.max(10, cv.clientWidth/2  - w/2 + (Math.random()*60-30)) : 20
    const cy = cv ? Math.max(10, cv.clientHeight/2 - h/2 + (Math.random()*60-30)) : 20
    maxZ.current += 1
    const el: El = {id:uid(),src,label,x:cx,y:cy,w,h,rot:Math.random()*10-5,z:maxZ.current}
    setEls(p => [...p,el]); setSelId(el.id)
  }, [saveH])

  const spawnL = useCallback((c:string,col:string) => spawn(`__L__${c}__${col}`,c,60,60),[spawn])

  const onDown = (e:React.PointerEvent, id:string) => {
    e.preventDefault(); e.stopPropagation()
    const el = els.find(x=>x.id===id); if (!el) return
    drag.current = {id,sx:e.clientX,sy:e.clientY,ex:el.x,ey:el.y}
    maxZ.current+=1
    setEls(p=>p.map(x=>x.id===id?{...x,z:maxZ.current}:x))
    setSelId(id)
  }

  const del   = (id:string) => { saveH(); setEls(p=>p.filter(x=>x.id!==id)); setSelId(null) }
  const dup   = (id:string) => { saveH(); const e=els.find(x=>x.id===id); if(!e) return; maxZ.current+=1; const c={...e,id:uid(),x:e.x+20,y:e.y+20,z:maxZ.current}; setEls(p=>[...p,c]); setSelId(c.id) }
  const rot   = (id:string,d:number) => setEls(p=>p.map(x=>x.id===id?{...x,rot:x.rot+d}:x))
  const sc    = (id:string,f:number) => setEls(p=>p.map(x=>x.id===id?{...x,w:Math.max(30,x.w*f),h:Math.max(30,x.h*f)}:x))
  const lyr   = (id:string,d:1|-1) => setEls(p=>p.map(x=>x.id===id?{...x,z:x.z+d}:x))

  const exportPoster = async () => {
    setExp(true)
    try {
      const W=800, H=1000
      const c=document.createElement('canvas'); c.width=W; c.height=H
      const ctx=c.getContext('2d')!

      // 1. Draw the scrapbook canvas background at full size
      await new Promise<void>(res => {
        const bg=new window.Image(); bg.crossOrigin='anonymous'
        bg.onload=()=>{ ctx.drawImage(bg,0,0,W,H); res() }
        bg.onerror=()=>{ ctx.fillStyle='#fef5f8'; ctx.fillRect(0,0,W,H); res() }
        bg.src=window.location.origin+'/studio/canvas-web.png'
      })

      // 2. Scale elements from canvas div coords to export coords
      const cv=cvRef.current
      const sx=W/(cv?.clientWidth||W), sy=H/(cv?.clientHeight||H)

      // 3. Draw each element
      for (const el of [...els].sort((a,b)=>a.z-b.z)) {
        if (el.src.startsWith('__L__')) {
          const [,,ch,col]=el.src.split('__')
          ctx.save(); ctx.translate((el.x+el.w/2)*sx,(el.y+el.h/2)*sy); ctx.rotate(el.rot*Math.PI/180)
          const sz=el.w*sx; ctx.fillStyle=col; ctx.beginPath()
          if(ctx.roundRect) ctx.roundRect(-sz/2,-sz/2,sz,sz,8); else ctx.rect(-sz/2,-sz/2,sz,sz)
          ctx.fill(); ctx.fillStyle='#fff'; ctx.font=`bold ${sz*.6}px Georgia,serif`
          ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(ch,0,0); ctx.restore()
          continue
        }
        await new Promise<void>(res => {
          const img=new window.Image(); img.crossOrigin='anonymous'
          img.onload=()=>{
            ctx.save(); ctx.translate((el.x+el.w/2)*sx,(el.y+el.h/2)*sy)
            ctx.rotate(el.rot*Math.PI/180)
            ctx.drawImage(img,-el.w/2*sx,-el.h/2*sy,el.w*sx,el.h*sy)
            ctx.restore(); res()
          }
          img.onerror=()=>res()
          img.src=window.location.origin+el.src
        })
      }

      // 4. Jay's logo as signature — bottom right
      await new Promise<void>(res=>{
        const wm=new window.Image(); wm.crossOrigin='anonymous'
        wm.onload=()=>{ ctx.globalAlpha=.85; ctx.drawImage(wm,W-130,H-68,120,58); ctx.globalAlpha=1; res() }
        wm.onerror=()=>res()
        wm.src=window.location.origin+'/brand/logo-badge.png'
      })

      const a=document.createElement('a'); a.download='my-jay-poster.png'
      a.href=c.toDataURL('image/png'); document.body.appendChild(a); a.click(); document.body.removeChild(a)
    } finally { setExp(false) }
  }

  const sel = els.find(x=>x.id===selId)
  const TABS: {key:Tab;label:string}[] = [
    {key:'chars',   label:'Characters'},
    {key:'buttons', label:'Buttons'},
    {key:'stars',   label:'Stars'},
    {key:'random',  label:'Random'},
    {key:'letters', label:'Letters'},
  ]

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',background:'#ffffff',overflow:'hidden',fontFamily:'var(--font-body)',minHeight:0}}>
      <style>{`
        .ns::-webkit-scrollbar{display:none}.ns{-ms-overflow-style:none;scrollbar-width:none}
        .tb:hover{opacity:0.75}
        .cv-el:active{cursor:grabbing}
        /* Keep global stars fully behind studio */
        #global-star-field { display: none !important; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 14px',background:'#fff',borderBottom:'1px solid #f0f0f0',flexShrink:0,gap:'8px'}}>
        <p style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#C61D70',lineHeight:1,whiteSpace:'nowrap'}}>
          ★ Studio
        </p>
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
          <button onClick={()=>setHist(h=>{if(!h.length)return h;setEls(h[h.length-1]);setSelId(null);return h.slice(0,-1)})}
            disabled={!hist.length}
            style={{background:'#f5f5f5',border:'1px solid #ddd',borderRadius:'6px',padding:'7px 10px',color:'#444',fontSize:'12px',cursor:'pointer',opacity:hist.length?1:0.35,touchAction:'manipulation',whiteSpace:'nowrap'}}>
            ↩ Undo
          </button>
          <button onClick={()=>{saveH();setEls([]);setSelId(null)}}
            style={{background:'#f5f5f5',border:'1px solid #ddd',borderRadius:'6px',padding:'7px 10px',color:'#444',fontSize:'12px',cursor:'pointer',touchAction:'manipulation'}}>
            Clear
          </button>
          <button onClick={exportPoster} disabled={exp||!els.length}
            style={{background:P.crimson,border:'none',borderRadius:'6px',padding:'8px 14px',color:'#fff',fontWeight:700,fontSize:'13px',cursor:'pointer',opacity:els.length?1:0.4,touchAction:'manipulation',whiteSpace:'nowrap'}}>
            {exp ? '…' : '⬇ Save'}
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{flex:1,display:'flex',overflow:'hidden',minHeight:0}}>

        {/* Desktop left sidebar */}
        <div style={{width:'200px',background:'#f5f3f0',borderRight:`1px solid ${P.border}`,display:'none',flexDirection:'column',padding:'16px 12px',gap:'12px',overflowY:'auto',flexShrink:0}}
          className="desktop-sidebar ns">
          <p style={{fontSize:'10px',color:'rgba(255,255,255,0.35)',letterSpacing:'0.1em',textTransform:'uppercase',fontFamily:'Courier New,monospace'}}>How to use</p>
          {[
            ['Tap','an element in the tray to add it to your canvas'],
            ['Drag','elements to reposition them'],
            ['Select','to resize, rotate, or delete'],
            ['Download','saves your creation as a PNG with Jay\'s signature'],
          ].map(([k,v])=>(
            <div key={k}>
              <p style={{fontWeight:700,color:P.cream,fontSize:'12px'}}>{k}</p>
              <p style={{color:'rgba(255,255,255,0.45)',fontSize:'11px',lineHeight:1.5}}>{v}</p>
            </div>
          ))}
        </div>

        {/* Canvas area */}
        <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'12px',overflow:'hidden',minHeight:0}}>
          <div style={{position:'relative',height:'100%',aspectRatio:'3/4',maxHeight:'100%',maxWidth:'calc(100vw - 8px)'}}>

            {/* The canvas */}
            <div ref={cvRef}
              onPointerDown={e=>{if(e.target===cvRef.current)setSelId(null)}}
              style={{
                width:'100%',height:'100%',
                position:'relative',
                backgroundImage:"url('/studio/canvas-web.png')",backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundColor:'transparent',
                overflow:'visible',
                touchAction:'none',
              }}>


              {[...els].sort((a,b)=>a.z-b.z).map(el=>{
                const isL=el.src.startsWith('__L__')
                const [,,lch,lcol]=isL?el.src.split('__'):[]
                const isSel=el.id===selId
                return (
                  <div key={el.id} className="cv-el"
                    onPointerDown={e=>onDown(e,el.id)}
                    style={{position:'absolute',left:el.x,top:el.y,width:el.w,height:el.h,transform:`rotate(${el.rot}deg)`,transformOrigin:'center',cursor:'grab',zIndex:el.z,touchAction:'none',userSelect:'none',outline:isSel?`2px solid ${P.sky}`:'2px solid transparent',outlineOffset:'2px',borderRadius:'4px'}}>
                    {isL
                      ? <div style={{width:'100%',height:'100%',background:lcol,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:`${el.w*.6}px`,fontWeight:700,color:'#fff',boxShadow:'2px 3px 0 rgba(0,0,0,0.25)',border:'2px solid rgba(255,255,255,0.3)'}}>{lch}</div>
                      : <img src={el.src} alt={el.label} draggable={false} style={{width:'100%',height:'100%',objectFit:'contain',display:'block',pointerEvents:'none'}}/>
                    }
                  </div>
                )
              })}

              {/* Element toolbar */}
              {sel && (
                <div onPointerDown={e=>e.stopPropagation()}
                  style={{position:'absolute',left:Math.min(sel.x,(cvRef.current?.clientWidth??300)-248),top:Math.max(4,sel.y-46),display:'flex',gap:'3px',background:P.bg,borderRadius:'8px',padding:'4px 5px',zIndex:99999,boxShadow:`0 2px 16px rgba(0,0,0,0.6), 0 0 0 1px ${P.border}`}}>
                  {[
                    {i:'↺',f:()=>rot(sel.id,-15)},
                    {i:'↻',f:()=>rot(sel.id,15)},
                    {i:'⊕',f:()=>sc(sel.id,1.15)},
                    {i:'⊖',f:()=>sc(sel.id,0.87)},
                    {i:'⧉',f:()=>dup(sel.id)},
                    {i:'↑',f:()=>lyr(sel.id,1)},
                    {i:'↓',f:()=>lyr(sel.id,-1)},
                    {i:'✕',f:()=>del(sel.id)},
                  ].map(b=>(
                    <button key={b.i} onClick={b.f}
                      style={{background:'rgba(255,255,255,0.07)',border:'none',borderRadius:'4px',width:'30px',height:'30px',color:'#fff',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',touchAction:'manipulation'}}>
                      {b.i}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tray ── */}
      <div style={{background:'#fff',borderTop:'1px solid #e8e4f0',flexShrink:0}}>
        {/* Tabs */}
        <div className="ns" style={{display:'flex',overflowX:'auto',borderBottom:'1px solid #eee'}}>
          {TABS.map(t=>(
            <button key={t.key} onClick={()=>setTab(t.key)}
              style={{background:tab===t.key?'rgba(41,165,242,0.12)':'transparent',border:'none',borderBottom:tab===t.key?`2px solid ${P.crimson}`:'2px solid transparent',padding:'10px 18px',color:tab===t.key?P.crimson:'#999',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,letterSpacing:'0.05em',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,touchAction:'manipulation',transition:'color 0.15s'}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Elements */}
        {/* Element tray */}
        <div className="ns" style={{display:'flex',gap:'10px',padding:'12px 16px 16px',overflowX:'auto',alignItems:'center',height:'90px',flexShrink:0,background:'#fafafa',touchAction:'pan-x'}}>
          {tab==='chars'    && CHARS.map(e=><TB key={e.src} {...e} onAdd={spawn}/>)}
          {tab==='buttons'  && BUTTONS.map(e=><TB key={e.src} {...e} onAdd={spawn}/>)}
          {tab==='stars'    && STARS.map(e=><TB key={e.src} {...e} onAdd={spawn}/>)}
          {tab==='random'   && RANDOM.map(e=><TB key={e.src} {...e} onAdd={spawn}/>)}
          {tab==='letters'  && LETTER_FILES.map((n,i)=>(
            <TB key={n}
              src={`/studio/v2/letters/${n}.png`}
              label={LETTER_CHARS[i]}
              w={70} h={70}
              onAdd={spawn}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TB({src,label,w,h,onAdd}:{src:string;label:string;w:number;h:number;onAdd:(s:string,l:string,w:number,h:number)=>void}) {
  const add = () => onAdd(src,label,w,h)
  return (
    <button
      onClick={add}
      onTouchEnd={(e)=>{e.preventDefault();add()}}
      title={label} className="tb"
      style={{background:'transparent',border:'none',padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,touchAction:'manipulation',minWidth:'64px',minHeight:'64px'}}>
      <img src={src} alt={label} style={{width:`${Math.min(w,58)}px`,height:'auto',display:'block',objectFit:'contain',maxHeight:'58px'}}/>
    </button>
  )
}

function LB({char,color,onAdd}:{char:string;color:string;onAdd:(c:string,col:string)=>void}) {
  return (
    <button onClick={()=>onAdd(char,color)} className="tb"
      style={{width:'46px',height:'46px',background:color,border:'2px solid rgba(255,255,255,0.2)',borderRadius:'8px',cursor:'pointer',fontFamily:'var(--font-display)',fontSize:'21px',fontWeight:700,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 2px 6px rgba(0,0,0,0.3)',touchAction:'manipulation'}}>
      {char}
    </button>
  )
}
