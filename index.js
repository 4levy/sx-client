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
require("colors");

const fetch = (...args) => import("node-fetch").then(m => m.default(...args));


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
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
};

// logger
function fuck_logger(type, message) {
  const tags = {
    success: `${colors.green}[ SUCCESSFULLY ]${colors.reset}`,
    error: `${colors.red}[ ERROR ]${colors.reset}`,
    warning: `${colors.yellow}[ WARNING ]${colors.reset}`,
  };
  const tag = tags[type.toLowerCase()] || "[ LOG ]";
  console.log(`${tag} ${message}`);
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
try {
  const configPath = path.join(__dirname, "CONFIG", "config.yml");
  const fileContents = fs.readFileSync(configPath, "utf8");
  config = yaml.load(fileContents);
  global.config = config;

} catch (error) {
  fuck_logger("error", `Failed to load config.yml: ${error.message}`);
  process.exit(1);
}


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
      streaming: voice.streaming !== undefined ? voice.streaming : true
    };
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
        if (newState.member.id === this.user.id) {
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
          await this.connectToVoiceChannel(channelId, true, true, false);
          break;

        case "play-live":
        case "play-cam":
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
          await this.streamer.leaveVoice().catch(() => {});
          fuck_logger("log", `Joining voice channel ${channel.guild.id}/${channelId}`);
          await this.streamer.joinVoice(channel.guild.id, channelId);
        }
      } else {
        fuck_logger("log", `Joining voice channel ${channel.guild.id}/${channelId}`);
        await this.streamer.joinVoice(channel.guild.id, channelId);
      }

      const { StageChannel } = require("discord.js-selfbot-v13");
      if (channel instanceof StageChannel) {
        await this.user?.voice?.setSuppressed(false).catch(() => {});
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
          const images = await this.getImage(largeImage, smallImage);
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
      const cachedBigImage = this.cacheImage.get(bigImg);
      const cachedSmallImage = this.cacheImage.get(smallImg);

      let fetchedImages = { bigImage: null, smallImage: null };
      try {
        fetchedImages = await this.getExternal.get(bigImg, smallImg);
      } catch (error) {
        fuck_logger("warning", `Error fetching images: ${error.message}`);
      }

      const finalBigImage = fetchedImages.bigImage || cachedBigImage || null;
      const finalSmallImage = fetchedImages.smallImage || cachedSmallImage || null;

      if (fetchedImages.bigImage) this.cacheImage.set(bigImg, fetchedImages.bigImage);
      if (fetchedImages.smallImage) this.cacheImage.set(smallImg, fetchedImages.smallImage);

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
      const { weather, sys, emoji, textFont, lib } = this;
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
        "uptime:days": Math.trunc((this.uptime || 0) / 86400000),
        "uptime:hours": Math.trunc(((this.uptime || 0) / 3600000) % 24),
        "uptime:minutes": Math.trunc(((this.uptime || 0) / 60000) % 60),
        "uptime:seconds": Math.trunc(((this.uptime || 0) / 1000) % 60),

        // User
        "user:name": this.user?.username || "User",
        "user:icon": this.user?.displayAvatarURL() || "",
        "user:banner": this.user?.bannerURL() || "",
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
            (_, key) => variables[key] || key
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
            .replace(/\{([^{}]+)\}/g, (_, key) => variables[key] || key);
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
          const token = input.token.replace(/["']/g, '').trim();
          
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
    const streamManager = new nyx();
    
    fuck_logger("success", "Loaded");
    
    const result = await streamManager.startStream(config);
    
    if (result.success) {
      fuck_logger("success", `Successfully started ${result.successCount}/${result.totalCount} client(s)`);
      if (result.failedCount > 0) {
        fuck_logger("warning", `Failed to start ${result.failedCount} client(s)`);
      }
      
      process.on('SIGINT', async () => {
        fuck_logger("log", "Shutting down gracefully...");
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