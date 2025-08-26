// If it worked, don't touch anything.

const { Client, RichPresence, CustomStatus } = require("discord.js-selfbot-v13");
const moment = require("moment-timezone");
const { schedule } = require("node-cron");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { execSync } = require('child_process');
const yaml = require("js-yaml");
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("colors");

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('error', (error) => {
  console.error('Process Error:', error.message);
});

const BANNER = `
                                                                                            :                                    -@                      
                                                                                            -                @  +     .%#.  @@@            .*           
                                                                                            *.   :         @%++.    ###%%%%@:                %          
                                                                                            *+. .=       @@@==   #######%                    @          
                                                                                            ++ .=    # @@@@@@@%%####%+*###:*.:.         #.   @          
                                                                                        . :+=+=@ +##-@@@@%####%#@%%%%%#++==+:::--           @          
                                                                                            *++  @**.@@%#####@#+*#=+=--====-::: .::...       #           
                                                                                        .+++:.@-@@@*%+=##-*#--+-**-==--:-##--::::..... .  -@           
                                                                                            ++++@@@@*+%@#@@%#####*####+==::::++++:::...+:.  @@            
                                                                                        .++#@@@@@=@@@@@@@@@@@%#####=*-::::::..::---::+:. @@             
                                                                                        +@+@@@@@@@@@@@@@@@@@@%%++=-#+--::::*%  ::----- @@@ =            
                                                                                        .*++@@#@*%+*@@%%%@@@@@@@===**:-:::-%@##   ==-- @@@@ :.            
                                                                                        *+*+=%*=#*=@@@@@@@@@@@@%##+===:::%@@@@   +:  @@@@   ..            
                                                                                        *+=++++*+#++@@@@@@@@@@@@@#+++==%@@@@@=   =@@@#@-    .             
                                                                                    #+@#++*++*@@@@@##@@%@@#####**+=@@@@@@.    @@@@@%.                  
                                                                                    *%****%%@@@@@@      @  #**+*+@@@@@@@ @@  @@@.  +%.   @@*           
                                                                                    #**@%%%@@:+*        %   =-:=#@@@*+@@@@@ @@###:#-  %%@@             
                                                                                    ##*%%%+                  .**+@@:@%@@@@@ +*+##*#   %%%     :@        
                                                                                    ###%%#                    #*..@-@@@@@@ .#****##*+ #.  +%%%%.         
                                                                                    %@%%%                    *   @@@@@+.@@@@**+%%@@  ####=#%%@           
                                                                                                        - ::   .#@*.#+:@@@%@@@@@%%***%%##@@@%             
                                                                                                        --::::..#@%%%%#%##**+***#*%%#@@@                
                                                                                                        .-#@@#####%%%%%#*+++++**##%%@                   
                                                                                                    ......*#%####=-==-##* +++++*.*.                       
                                                                                        ....  ::::::::::+*#*++=+*#****.*+++ +++++++*.                    
                                                                                            .::......++-+++**++++*+*.====+=++=.++++*                      
                                                                                        ::::::.-=--++++++-=+=+.   .:=-----=:                           
                                                                                        :::::::::==++++==+.  -: ......:---                             
                                                                                        .:...::::..:=====..   .::====.. ....                              
                                                                                    ....::::. ==:===:    .==-==..                                      
                                                                                    .....:.  =-  :.      ====   ..                                      
                                                                                    ....  -        .  ==-                                              
                                                                                                    . =:                                                 


`;


let config;
try {
  const configPath = path.join(__dirname, "CONFIG", "config.yml");
  const fileContents = fs.readFileSync(configPath, "utf8");
  config = yaml.load(fileContents);
  global.config = config; 
  console.log("Configuration loaded successfully from config.yml".green);
} catch (error) {
  console.error("Error loading configuration from config.yml:", error.message.red);
  process.exit(1);
}

class GetImage {
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
      
      url1 = this.isValidURL(url1) ? url1 : null;
      url2 = this.isValidURL(url2) ? url2 : null;
      
      if (!url1 && !url2) {
        return { bigImage: null, smallImage: null };
      }
      
      const { getExternal } = RichPresence;

      const validUrls = [url1, url2].filter(url => url !== null);
      const images = await getExternal(
        this.client,
        config.options?.botid || global.config?.options?.botid || "1109522937989562409",
        ...validUrls
      );
      
      let finalUrl1 = null;
      let finalUrl2 = null;
      
      if (images.length === 1) {
        const { url, external_asset_path } = images[0];
        if (url === url1) {
          finalUrl1 = url.includes("attachments") ? url : external_asset_path;
        } else if (url === url2) {
          finalUrl2 = url.includes("attachments") ? url : external_asset_path;
        }
      } else if (images.length === 2) {
        const [img1, img2] = images;
        if (img1.external_asset_path) {
          const { url, external_asset_path } = img1;
          if (url === url1) {
            finalUrl1 = url.includes("attachments") ? url : external_asset_path;
          } else if (url === url2) {
            finalUrl2 = url.includes("attachments") ? url : external_asset_path;
          }
        }
        if (img2.external_asset_path) {
          const { url, external_asset_path } = img2;
          if (url === url1) {
            finalUrl1 = url.includes("attachments") ? url : external_asset_path;
          } else if (url === url2) {
            finalUrl2 = url.includes("attachments") ? url : external_asset_path;
          }
        }
      }
      
      return { bigImage: finalUrl1, smallImage: finalUrl2 };
    } catch (error) {
      return { bigImage: null, smallImage: null };
    }
  }
}

class Weather {
  constructor(location) {
    this.location = location;
    this.feelslike_c = 0;
    this.feelslike_f = 0;
    this.windchill_c = 0;
    this.windchill_f = 0;
    this.heatindex_c = 0;
    this.heatindex_f = 0;
    this.dewpoint_c = 0;
    this.dewpoint_f = 0;
    this.co = 0;
    this.no2 = 0;
    this.o3 = 0;
    this.so2 = 0;
    this.pm10 = 0;
    this.stop = 0;
    schedule("*/5 * * * *", () => this.update());
  }

  async update() {
    try {
      const params = new URLSearchParams();
      params.append("key", config.weatherAPI?.key || global.config?.weatherAPI?.key || "1e1a0f498dbf472cb3991045241608");
      params.append("q", encodeURIComponent(this.location));
      params.append("aqi", "yes");
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?${params}`
      );
      const data = await response.json();
      this.timezone = data.location.tz_id;
      this.city = data.location.name;
      this.region = data.location.region;
      this.country = data.location.country;
      this.temp_c = data.current.temp_c;
      this.temp_f = data.current.temp_f;
      this.wind_kph = data.current.wind_kph;
      this.wind_mph = data.current.wind_mph;
      this.wind_degree = data.current.wind_degree;
      this.pressure_mb = data.current.pressure_mb;
      this.pressure_in = data.current.pressure_in;
      this.precip_mm = data.current.precip_mm;
      this.precip_in = data.current.precip_in;
      this.wind_dir = data.current.wind_dir;
      this.gust_kph = data.current.gust_kph;
      this.gust_mph = data.current.gust_mph;
      this.vis_km = data.current.vis_km;
      this.vis_mi = data.current.vis_miles;
      this.humidity = data.current.humidity;
      this.cloud = data.current.cloud;
      this.uv = data.current.uv;
      this.pm2_5 = data.current.air_quality.pm2_5;
      this.feelslike_c = data.current.feelslike_c;
      this.feelslike_f = data.current.feelslike_f;
      this.windchill_c = data.current.windchill_c;
      this.windchill_f = data.current.windchill_f;
      this.heatindex_c = data.current.heatindex_c;
      this.heatindex_f = data.current.heatindex_f;
      this.dewpoint_c = data.current.dewpoint_c;
      this.dewpoint_f = data.current.dewpoint_f;
      this.co = data.current.air_quality.co;
      this.no2 = data.current.air_quality.no2;
      this.o3 = data.current.air_quality.o3;
      this.so2 = data.current.air_quality.so2;
      this.pm10 = data.current.air_quality.pm10;
    } catch {
      if (this.stop > 10) {
        return;
      }
      this.stop++;
      this.update();
    }
  }
}

class SystemInfo {
  constructor() {
    this.cpuname = os.cpus()[0]?.model;
    this.cpucores = os.cpus()?.length;
    this.cpuspeed = (os.cpus()[0]?.speed / 1000 || 0).toFixed(1);
    this.cpu = 0;
    this.ram = 0;
  }

  getCpuUsage() {
    let totalIdle = 0,
      totalTick = 0;
    const cpus = os.cpus();
    cpus.forEach((cpu) => {
      for (let type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
    return 100 - Math.floor((totalIdle / totalTick) * 100);
  }

  async getCpuUsageOverInterval(interval) {
    return new Promise((resolve) => {
      const startMeasure = this._measureCpuTimes();
      setTimeout(() => {
        const endMeasure = this._measureCpuTimes();
        const idleDifference = endMeasure.idle - startMeasure.idle;
        const totalDifference = endMeasure.total - startMeasure.total;
        resolve(100 - Math.floor((idleDifference / totalDifference) * 100));
      }, interval);
    });
  }

  _measureCpuTimes() {
    let totalIdle = 0,
      totalTick = 0;
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
    return Math.floor(((totalMem - freeMem) / totalMem) * 100);
  }

  async update() {
    this.cpu = await this.getCpuUsageOverInterval(1000);
    this.ram = this.getRamUsage();
  }
}

class Emoji {
  random() {
    const emojis = [
      "😄",
      "😃",
      "😀",
      "😊",
      "☺",
      "😉",
      "😍",
      "😘",
      "😚",
      "😗",
      "😙",
      "😜",
      "😝",
      "😛",
      "😳",
      "😁",
      "😔",
      "😌",
      "😒",
      "😞",
      "😣",
      "😢",
      "😂",
      "😭",
      "😪",
      "😥",
      "😰",
      "😅",
      "😓",
      "😩",
      "😫",
      "😨",
      "😱",
      "😠",
      "😡",
      "😤",
      "😖",
      "😆",
      "😋",
      "😷",
      "😎",
      "😴",
      "😵",
      "😲",
      "😟",
      "😦",
      "😧",
      "😈",
      "👿",
      "😮",
      "😬",
      "😐",
      "😕",
      "😯",
      "😶",
      "😇",
      "😏",
      "😑",
      "👲",
      "👳",
      "👮",
      "👷",
      "💂",
      "👶",
      "👦",
      "👧",
      "👨",
      "👩",
      "👴",
      "👵",
      "👱",
      "👼",
      "👸",
      "😺",
      "😸",
      "😻",
      "😽",
      "😼",
      "🙀",
      "😿",
      "😹",
      "😾",
      "👹",
      "👺",
      "🙈",
      "🙉",
      "🙊",
      "💀",
      "👽",
      "💩",
      "🔥",
      "✨",
      "🌟",
      "💫",
      "💥",
      "💢",
      "💦",
      "💧",
      "💤",
      "💨",
      "👂",
      "👀",
      "👃",
      "👅",
      "👄",
      "👍",
      "👎",
      "👌",
      "👊",
      "✊",
      "✌",
      "👋",
      "✋",
      "👐",
      "👆",
      "👇",
      "👉",
      "👈",
      "🙌",
      "🙏",
      "☝",
      "👏",
      "💪",
      "🚶",
      "🏃",
      "💃",
      "👫",
      "👪",
      "👬",
      "👭",
      "💏",
      "💑",
      "👯",
      "🙆",
      "🙅",
      "💁",
      "🙋",
      "💆",
      "💇",
      "💅",
      "👰",
      "🙎",
      "🙍",
      "🙇",
      "🎩",
      "👑",
      "👒",
      "👟",
      "👞",
      "👡",
      "👠",
      "👢",
      "👕",
      "👔",
      "👚",
      "👗",
      "🎽",
      "👖",
      "👘",
      "👙",
      "💼",
      "👜",
      "👝",
      "👛",
      "👓",
      "🎀",
      "🌂",
      "💄",
      "💛",
      "💙",
      "💜",
      "💚",
      "❤",
      "💔",
      "💗",
      "💓",
      "💕",
      "💖",
      "💞",
      "💘",
      "💌",
      "💋",
      "💍",
      "💎",
      "👤",
      "👥",
      "💬",
      "👣",
      "💭",
      "🐶",
      "🐺",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🐸",
      "🐯",
      "🐨",
      "🐻",
      "🐷",
      "🐽",
      "🐮",
      "🐗",
      "🐵",
      "🐒",
      "🐴",
      "🐑",
      "🐘",
      "🐼",
      "🐧",
      "🐦",
      "🐤",
      "🐥",
      "🐣",
      "🐔",
      "🐍",
      "🐢",
      "🐛",
      "🐝",
      "🐜",
      "🐞",
      "🐌",
      "🐙",
      "🐚",
      "🐠",
      "🐟",
      "🐬",
      "🐳",
      "🐋",
      "🐄",
      "🐏",
      "🐀",
      "🐃",
      "🐅",
      "🐇",
      "🐉",
      "🐎",
      "🐐",
      "🐓",
      "🐕",
      "🐖",
      "🐁",
      "🐂",
      "🐲",
      "🐡",
      "🐊",
      "🐫",
      "🐪",
      "🐆",
      "🐈",
      "🐩",
      "🐾",
      "💐",
      "🌸",
      "🌷",
      "🍀",
      "🌹",
      "🌻",
      "🌺",
      "🍁",
      "🍃",
      "🍂",
      "🌿",
      "🌾",
      "🍄",
      "🌵",
      "🌴",
      "🌲",
      "🌳",
      "🌰",
      "🌱",
      "🌼",
      "🌐",
      "🌞",
      "🌝",
      "🌚",
      "🌑",
      "🌒",
      "🌓",
      "🌔",
      "🌕",
      "🌖",
      "🌗",
      "🌘",
      "🌜",
      "🌛",
      "🌙",
      "🌍",
      "🌎",
      "🌏",
      "🌋",
      "🌌",
      "🌠",
      "⭐",
      "☀",
      "⛅",
      "☁",
      "⚡",
      "☔",
      "❄",
      "⛄",
      "🌀",
      "🌁",
      "🌈",
      "🌊",
      "🎍",
      "💝",
      "🎎",
      "🎒",
      "🎓",
      "🎏",
      "🎆",
      "🎇",
      "🎐",
      "🎑",
      "🎃",
      "👻",
      "🎅",
      "🎄",
      "🎁",
      "🎋",
      "🎉",
      "🎊",
      "🎈",
      "🎌",
      "🔮",
      "🎥",
      "📷",
      "📹",
      "📼",
      "💿",
      "📀",
      "💽",
      "💾",
      "💻",
      "📱",
      "☎",
      "📞",
      "📟",
      "📠",
      "📡",
      "📺",
      "📻",
      "🔊",
      "🔉",
      "🔈",
      "🔇",
      "🔔",
      "🔕",
      "📢",
      "📣",
      "⏳",
      "⌛",
      "⏰",
      "⌚",
      "🔓",
      "🔒",
      "🔏",
      "🔐",
      "🔑",
      "🔎",
      "💡",
      "🔦",
      "🔆",
      "🔅",
      "🔌",
      "🔋",
      "🔍",
      "🛁",
      "🛀",
      "🚿",
      "🚽",
      "🔧",
      "🔩",
      "🔨",
      "🚪",
      "🚬",
      "💣",
      "🔫",
      "🔪",
      "💊",
      "💉",
      "💰",
      "💴",
      "💵",
      "💷",
      "💶",
      "💳",
      "💸",
      "📲",
      "📧",
      "📥",
      "📤",
      "✉",
      "📩",
      "📨",
      "📯",
      "📫",
      "📪",
      "📬",
      "📭",
      "📮",
      "📦",
      "📝",
      "📄",
      "📃",
      "📑",
      "📊",
      "📈",
      "📉",
      "📜",
      "📋",
      "📅",
      "📆",
      "📇",
      "📁",
      "📂",
      "✂",
      "📌",
      "📎",
      "✒",
      "✏",
      "📏",
      "📐",
      "📕",
      "📗",
      "📘",
      "📙",
      "📓",
      "📔",
      "📒",
      "📚",
      "📖",
      "🔖",
      "📛",
      "🔬",
      "🔭",
      "📰",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎼",
      "🎵",
      "🎶",
      "🎹",
      "🎻",
      "🎺",
      "🎷",
      "🎸",
      "👾",
      "🎮",
      "🃏",
      "🎴",
      "🀄",
      "🎲",
      "🎯",
      "🏈",
      "🏀",
      "⚽",
      "⚾",
      "🎾",
      "🎱",
      "🏉",
      "🎳",
      "⛳",
      "🚵",
      "🚴",
      "🏁",
      "🏇",
      "🏆",
      "🎿",
      "🏂",
      "🏊",
      "🏄",
      "🎣",
      "☕",
      "🍵",
      "🍶",
      "🍼",
      "🍺",
      "🍻",
      "🍸",
      "🍹",
      "🍷",
      "🍴",
      "🍕",
      "🍔",
      "🍟",
      "🍗",
      "🍖",
      "🍝",
      "🍛",
      "🍤",
      "🍱",
      "🍣",
      "🍥",
      "🍙",
      "🍘",
      "🍚",
      "🍜",
      "🍲",
      "🍢",
      "🍡",
      "🍳",
      "🍞",
      "🍩",
      "🍮",
      "🍦",
      "🍨",
      "🍧",
      "🎂",
      "🍰",
      "🍪",
      "🍫",
      "🍬",
      "🍭",
      "🍯",
      "🍎",
      "🍏",
      "🍊",
      "🍋",
      "🍒",
      "🍇",
      "🍉",
      "🍓",
      "🍑",
      "🍈",
      "🍌",
      "🍐",
      "🍍",
      "🍠",
      "🍆",
      "🍅",
      "🌽",
      "🏠",
      "🏡",
      "🏫",
      "🏢",
      "🏣",
      "🏥",
      "🏦",
      "🏪",
      "🏩",
      "🏨",
      "💒",
      "⛪",
      "🏬",
      "🏤",
      "🌇",
      "🌆",
      "🏯",
      "🏰",
      "⛺",
      "🏭",
      "🗼",
      "🗾",
      "🗻",
      "🌄",
      "🌅",
      "🌃",
      "🗽",
      "🌉",
      "🎠",
      "🎡",
      "⛲",
      "🎢",
      "🚢",
      "⛵",
      "🚤",
      "🚣",
      "⚓",
      "🚀",
      "✈",
      "💺",
      "🚁",
      "🚂",
      "🚊",
      "🚉",
      "🚞",
      "🚆",
      "🚄",
      "🚅",
      "🚈",
      "🚇",
      "🚝",
      "🚋",
      "🚃",
      "🚎",
      "🚌",
      "🚍",
      "🚙",
      "🚘",
      "🚗",
      "🚕",
      "🚖",
      "🚛",
      "🚚",
      "🚨",
      "🚓",
      "🚔",
      "🚒",
      "🚑",
      "🚐",
      "🚲",
      "🚡",
      "🚟",
      "🚠",
      "🚜",
      "💈",
      "🚏",
      "🎫",
      "🚦",
      "🚥",
      "⚠",
      "🚧",
      "🔰",
      "⛽",
      "🏮",
      "🎰",
      "♨",
      "🗿",
      "🎪",
      "🎭",
      "📍",
      "🚩",
      "⬆",
      "⬇",
      "⬅",
      "➡",
      "🔠",
      "🔡",
      "🔤",
      "↗",
      "↖",
      "↘",
      "↙",
      "↔",
      "↕",
      "🔄",
      "◀",
      "▶",
      "🔼",
      "🔽",
      "↩",
      "↪",
      "ℹ",
      "⏪",
      "⏩",
      "⏫",
      "⏬",
      "⤵",
      "⤴",
      "🆗",
      "🔀",
      "🔁",
      "🔂",
      "🆕",
      "🆙",
      "🆒",
      "🆓",
      "🆖",
      "📶",
      "🎦",
      "🈁",
      "🈯",
      "🈳",
      "🈵",
      "🈴",
      "🈲",
      "🉐",
      "🈹",
      "🈺",
      "🈶",
      "🈚",
      "🚻",
      "🚹",
      "🚺",
      "🚼",
      "🚾",
      "🚰",
      "🚮",
      "🅿",
      "♿",
      "🚭",
      "🈷",
      "🈸",
      "🈂",
      "Ⓜ",
      "🛂",
      "🛄",
      "🛅",
      "🛃",
      "🉑",
      "㊙",
      "㊗",
      "🆑",
      "🆘",
      "🆔",
      "🚫",
      "🔞",
      "📵",
      "🚯",
      "🚱",
      "🚳",
      "🚷",
      "🚸",
      "⛔",
      "✳",
      "❇",
      "❎",
      "✅",
      "✴",
      "💟",
      "🆚",
      "📳",
      "📴",
      "🅰",
      "🅱",
      "🆎",
      "🅾",
      "💠",
      "➿",
      "♻",
      "♈",
      "♉",
      "♊",
      "♋",
      "♌",
      "♍",
      "♎",
      "♏",
      "♐",
      "♑",
      "♒",
      "♓",
      "⛎",
      "🔯",
      "🏧",
      "💹",
      "💲",
      "💱",
      "©",
      "®",
      "™",
      "〽",
      "〰",
      "🔝",
      "🔚",
      "🔙",
      "🔛",
      "🔜",
      "❌",
      "⭕",
      "❗",
      "❓",
      "❕",
      "❔",
      "🔃",
      "🕛",
      "🕧",
      "🕐",
      "🕜",
      "🕑",
      "🕝",
      "🕒",
      "🕞",
      "🕓",
      "🕟",
      "🕔",
      "🕠",
      "🕕",
      "🕖",
      "🕗",
      "🕘",
      "🕙",
      "🕚",
      "🕡",
      "🕢",
      "🕣",
      "🕤",
      "🕥",
      "🕦",
      "✖",
      "➕",
      "➖",
      "➗",
      "♠",
      "♥",
      "♣",
      "♦",
      "💮",
      "💯",
      "✔",
      "☑",
      "🔘",
      "🔗",
      "➰",
      "🔱",
      "🔲",
      "🔳",
      "◼",
      "◻",
      "◾",
      "◽",
      "▪",
      "▫",
      "🔺",
      "⬜",
      "⬛",
      "⚫",
      "⚪",
      "🔴",
      "🔵",
      "🔻",
      "🔶",
      "🔷",
      "🔸",
      "🔹",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

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
      a: "๐",
      b: "๑",
      c: "๒",
      d: "๓",
      e: "๔",
      f: "๕",
      g: "๖",
      h: "๗",
      i: "๘",
      j: "๙",
      k: "๐",
      l: "๑",
      m: "๒",
      n: "๓",
      o: "๔",
      p: "๕",
      q: "๖",
      r: "๗",
      s: "๘",
      t: "๙",
      u: "๐",
      v: "๑",
      w: "๒",
      x: "๓",
      y: "๔",
      z: "๕",
      A: "๐",
      B: "๑",
      C: "๒",
      D: "๓",
      E: "๔",
      F: "๕",
      G: "๖",
      H: "๗",
      I: "๘",
      J: "๙",
      K: "๐",
      L: "๑",
      M: "๒",
      N: "๓",
      O: "๔",
      P: "๕",
      Q: "๖",
      R: "๗",
      S: "๘",
      T: "๙",
      U: "๐",
      V: "๑",
      W: "๒",
      X: "๓",
      Y: "๔",
      Z: "๕",
      0: "๐",
      1: "๑",
      2: "๒",
      3: "๓",
      4: "๔",
      5: "๕",
      6: "๖",
      7: "๗",
      8: "๘",
      9: "๙",
      "°": "°",
      ":": ":",
      "/": "/",
      " ": " ",
      "(": "(",
      ")": ")",
      "⤿": "⤿",
      "★": "★",
      "☆": "☆",
      "༊": "༊",
      "*": "*",
      "·": "·",
      "˚": "˚",
      "꒰": "꒰",
      "꒱": "꒱",
      ˏ: "ˏ",
      ˋ: "ˋ",
      "´": "´",
      ˎ: "ˎ",
      "✦": "✦",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont2(text) {
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
      "°": "°",
      ":": ":",
      "/": "/",
      " ": " ",
      "(": "(",
      ")": ")",
      "⤿": "⤿",
      "★": "★",
      "☆": "☆",
      "༊": "༊",
      "*": "*",
      "·": "·",
      "˚": "˚",
      "꒰": "꒰",
      "꒱": "꒱",
      ˏ: "ˏ",
      ˋ: "ˋ",
      "´": "´",
      ˎ: "ˎ",
      "✦": "✦",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont3(text) {
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
      "°": "°",
      ":": ":",
      "/": "/",
      " ": " ",
      "(": "(",
      ")": ")",
      "⤿": "⤿",
      "★": "★",
      "☆": "☆",
      "༊": "༊",
      "*": "*",
      "·": "·",
      "˚": "˚",
      "꒰": "꒰",
      "꒱": "꒱",
      ˏ: "ˏ",
      ˋ: "ˋ",
      "´": "´",
      ˎ: "ˎ",
      "✦": "✦",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont4(text) {
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
      "°": "°",
      ":": ":",
      "/": "/",
      " ": " ",
      "(": "(",
      ")": ")",
      "⤿": "⤿",
      "★": "★",
      "☆": "☆",
      "༊": "༊",
      "*": "*",
      "·": "·",
      "˚": "˚",
      "꒰": "꒰",
      "꒱": "꒱",
      ˏ: "ˏ",
      ˋ: "ˋ",
      "´": "´",
      ˎ: "ˎ",
      "✦": "✦",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont5(text) {
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
      "°": "°",
      ":": ":",
      "/": "/",
      " ": " ",
      "(": "(",
      ")": ")",
      "⤿": "⤿",
      "★": "★",
      "☆": "☆",
      "༊": "༊",
      "*": "*",
      "·": "·",
      "˚": "˚",
      "꒰": "꒰",
      "꒱": "꒱",
      ˏ: "ˏ",
      ˋ: "ˋ",
      "´": "´",
      ˎ: "ˎ",
      "✦": "✦",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }

  getFont6(text) {
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
      "°": "°",
      ":": ":",
      "/": "/",
      " ": " ",
      "(": "(",
      ")": ")",
      "⤿": "⤿",
      "★": "★",
      "☆": "☆",
      "༊": "༊",
      "*": "*",
      "·": "·",
      "˚": "˚",
      "꒰": "꒰",
      "꒱": "꒱",
      ˏ: "ˏ",
      ˋ: "ˋ",
      "´": "´",
      ˎ: "ˎ",
      "✦": "✦",
    };
    return text
      .split("")
      .map((char) => fontMap[char] || char)
      .join("");
  }
}

class ModClient extends Client {
  constructor(token, config, info) {
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
        console.log(
          "Successfully patched ClientUserSettingManager before client creation"
        );
      }
    } catch (error) {
      console.warn("Pre-patching attempt failed:", error.message);
    }

    super({
      checkUpdate: false,
      autoRedeemNitro: false,
      proxy: config.setup?.proxy || undefined,
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

    this.TOKEN = token;
    this.config = config;
    this.customStatusEnabled = info.customStatus === true;
    this.voiceEnabled = info.voiceEnabled === true;
    this.currentStreamingActivity = null;
    this.voiceConnections = new Map();
    this.voiceConfig = config.voice || global.config?.voice || { data: "sx!", streaming: true };
    this.targetTime = info.wait;
    this.intervals = new Set();
    this.weather = new Weather(config.options?.location || global.config?.options?.location || "Bangkok");
    this.sys = new SystemInfo();
    this.emoji = new Emoji();
    this.textFont = new TextFont();
    this.getExternal = new GetImage(this);
    this.cacheImage = new Map();
    this.lib = {
      count: 0,
      countParty: 1,
      timestamp: 0,
      v: { patch: info.version },
    };
    this.index = {
      url: 0,
      text_0: 0,
      text_1: 0,
      text_2: 0,
      text_3: 0,
      text_4: 0,
      text_5: 0,
      bm: 0,
      sm: 0,
      bt_1: 0,
      bt_2: 0,
    };

    this.statusIndex = 0;

    this.lastRestartTime = 0;
    this.restartCount = 0;
    this.lastConnectionCheck = Date.now();
    this.isRunningStream = false;

    this.on("disconnect", () => {
      console.log(
        `Client disconnected for token: ${this.maskToken(this.TOKEN)}`
      );
    });

    this.on("reconnecting", () => {
      console.log(
        `Client reconnecting for token: ${this.maskToken(this.TOKEN)}`
      );
    });

    this.on("resumed", () => {
      console.log(`Client resumed for token: ${this.maskToken(this.TOKEN)}`);
    });

    this.on("ready", this._onReady.bind(this));
    this.on("error", this._onError.bind(this));
    this.on("messageCreate", this._onMessage.bind(this));

    this.on("voiceStateUpdate", (oldState, newState) => {
      try {
        if (newState.member.id === this.user.id) {
        }
      } catch (err) {
        console.warn("Voice state update error:", err.message);
      }
    });

    this.on("warn", (warning) => {
      console.warn("Client warning:", warning);
    });

    this.on("debug", (info) => {
      if (info.includes("ERROR") || info.includes("error")) {
        console.debug("Debug info:", info);
      }
    });
  }

  _onReady() {
    if (!this.user.settings) {
      console.log("Creating missing settings object");
      this.user.settings = {
        friend_source_flags: { all: true },
        custom_status: null,
        status: "online",
      };
    } else if (!this.user.settings.friend_source_flags) {
      console.log("Adding missing friend_source_flags");
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
      console.log("Patched settings._patch method");
    }

    this.restartCount = 0;
    this.startPingChecker();

    this.streaming();
    
    if (this.customStatusEnabled) {
      setTimeout(() => this.customStatus(), 2000);
    } else {
    }
  }

  _onError(error) {
    console.error("Client encountered an error:", error.message || error);
    
    if (error.message && error.message.includes("WebSocket")) {
      console.warn("WebSocket error detected, attempting to continue...");
      return;
    }

    if (error.message && (error.message.includes("voice") || error.message.includes("connection was established"))) {
      console.warn("Voice connection error detected, continuing without voice...");
      return; 
    }
    
    if (error.message && error.message.includes("Cannot read properties of null")) {
      console.log("Attempting to recover from null property error...");
      if (this.user && !this.user.settings) {
        this.user.settings = {
          friend_source_flags: { all: true },
          custom_status: null,
          status: "online",
        };
      } else if (
        this.user &&
        this.user.settings &&
        !this.user.settings.friend_source_flags
      ) {
        this.user.settings.friend_source_flags = { all: true };
      }
    }
  }

  async _onMessage(message) {
    try {
      if (message.author.id !== this.user.id) return;
      
      if (!this.voiceEnabled) {
        console.log(`Voice commands disabled for token: ${this.maskToken(this.TOKEN)}`);
        return;
      }
      
      if (!this.voiceConfig.streaming) {
        console.log(`Voice streaming is disabled in configuration`);
        return;
      }
      
      const voiceCommand = this.voiceConfig.data || "sx!";
      
      if (!message.content.startsWith(voiceCommand + " ")) {
        console.log(`Message doesn't start with "${voiceCommand} "`);
        return;
      }
      
      
      const args = message.content.slice(voiceCommand.length + 1).split(" ");
      const channelId = args[0];
      const command = args[1];
      
      
      if (!channelId) {
        console.log(`No channel ID provided. Usage: ${voiceCommand} <channelId> [live|stream|disconnect|leave|list]`.yellow);
        return;
      }
      
      switch (command?.toLowerCase()) {
        case 'live':
        case 'stream':
          await this.connectToVoiceChannel(channelId, true, true, true);
          break;
        case 'disconnect':
        case 'leave':
          console.log(`Disconnecting from channel ${channelId}...`.yellow);
          this.disconnectFromVoiceChannel(channelId);
          break;
        case 'list':
          console.log(`Available voice channels:`.cyan);
          this.channels.cache.forEach(ch => {
            if (ch.type === 2 || ch.type === 'GUILD_VOICE') {
              console.log(`- ${ch.name} (${ch.id}) - Type: ${ch.type}`);
            }
          });
          break;
        default:
          await this.connectToVoiceChannel(channelId, true, true, false);
          break;
      }
    } catch (error) {
      console.error(`Error processing voice command: ${error.message}`.red);
    }
  }

  async connectToVoiceChannel(channelId, selfMute = true, selfDeaf = true, createStream = false) {
    try {
      const channel = this.channels.cache.get(channelId);
      if (!channel) {
        console.log(`Channel ${channelId} not found`.red);
        return;
      }

      if (channel.type !== 2 && channel.type !== 'GUILD_VOICE') {
        console.log(`Channel ${channelId} is not a voice channel (Type: ${channel.type})`.red);
        return;
      }

      const connectionOptions = { selfMute, selfDeaf, selfVideo: false };
      let connection = null;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          const connectionPromise = this.voice.joinChannel(channel, connectionOptions);
          connection = await Promise.race([
            connectionPromise,
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
            )
          ]);
          
          if (connection) {
            break;
          }
        } catch (error) {
          retryCount++;
          
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      if (!connection) {
        console.log(`Failed to connect to ${channel.name} after ${maxRetries} attempts`.red);
        return;
      }

      if (createStream && connection && typeof connection.createStreamConnection === 'function') {
        try {
          await connection.createStreamConnection();
        } catch (streamError) {
          console.log(`Failed to start streaming: ${streamError.message}`.red);
        }
      }

      this.voiceConnections.set(channelId, connection);

      const intervalId = setInterval(async () => {
        try {
          if (connection && connection.status === 'disconnected') {
            connection = await this.voice.joinChannel(channel, connectionOptions);
            
            if (createStream && connection && typeof connection.createStreamConnection === 'function') {
              await connection.createStreamConnection().catch(err => 
                console.log(`Stream reconnect failed: ${err.message}`.red)
              );
            }
            
            this.voiceConnections.set(channelId, connection);
          }
        } catch (error) {
          console.error(`Auto-reconnect failed for ${channel.name}: ${error.message}`.red);
        }
      }, 30000);

      this.intervals.add(intervalId);
      
      return connection;
    } catch (error) {
      console.error(`Failed to connect to voice channel ${channelId}: ${error.message}`.red);
      return null;
    }
  }

  disconnectFromVoiceChannel(channelId) {
    try {
      const connection = this.voiceConnections.get(channelId);
      if (connection) {
        connection.disconnect();
        this.voiceConnections.delete(channelId);
      } else {
        console.log(`No active connection found for channel ${channelId}`.yellow);
      }
    } catch (error) {
      console.error(`Error disconnecting from voice channel: ${error.message}`.red);
    }
  }

  startPingChecker() {
    const checkerId = setInterval(() => {
      if (this.isRunningStream) return;

      try {
        if (this.ws && this.ws.status === 0 && this.ws.ping < 3000) {
          if (this.restartCount > 0) {
            console.log(
              `Connection stabilized for token: ${this.maskToken(this.TOKEN)}`
            );
            this.restartCount = 0;
          }
        }
      } catch (err) {
        console.error(`Error in ping checker: ${err.message}`);
      }
    }, 30000);

    this.intervals.add(checkerId);
  }

  getDefaultActivityName(activityType, platform) {
    switch (activityType) {
      case "STREAMING":
        return platform || "Live Stream";
      case "PLAYING":
        return "Discord Selfbot";
      case "LISTENING":
        return "Music";
      case "WATCHING":
        return "Videos";
      case "COMPETING":
        return "Tournament";
      default:
        return "Discord Selfbot";
    }
  }

  async streaming() {
    if (this.isRunningStream) {
      console.log(
        `Streaming update is already in progress for ${this.maskToken(
          this.TOKEN
        )}`
      );
      return;
    }

    this.isRunningStream = true;
    try {
      const { setup, config } = this.config;
      const applicationId = config.options?.botid || userConfig.options?.botid || global.config?.options?.botid || "1109522937989562409";

      const currentTime = Date.now();
      let connectionHasIssues = false;

      if (!this.ws || this.ws.status !== 0) {
        console.log(
          `Client not connected (status: ${this.ws?.status || "unknown"})`
        );
        connectionHasIssues = true;
      } else if (this.ws.ping > 5000) {
        console.log(`High ping detected: ${this.ws.ping}ms`);
        connectionHasIssues = true;
      }

      if (connectionHasIssues) {
        if (
          this.restartCount < 5 &&
          currentTime - this.lastRestartTime > 60000
        ) {
          this.lastRestartTime = currentTime;
          this.restartCount++;
          console.log(
            `Connection issues detected for ${this.maskToken(
              this.TOKEN
            )}, reconnection attempt #${this.restartCount}`
          );

          setTimeout(
            () => this.streaming(),
            Math.max(10000, (setup?.delay || 10) * 1000)
          );
          this.updateIndices(config);
          this.isRunningStream = false;
          return;
        } else if (this.restartCount >= 5) {
          console.log(
            `Too many reconnection attempts for ${this.maskToken(
              this.TOKEN
            )}, will try again later`
          );
          setTimeout(() => {
            if (Date.now() - this.lastRestartTime > 15 * 60 * 1000) {
              this.restartCount = 0;
            }
            this.streaming();
          }, 15 * 60 * 1000);
          this.isRunningStream = false;
          return;
        }
      }

      let watchUrl = config.options["watch-url"]?.[this.index.url];
      const activityType = config.options["activity-type"] || "STREAMING";

      if (activityType === "STREAMING") {
        if (!watchUrl || !this.getExternal.isValidURL(watchUrl)) {
          console.warn("No valid streaming URL found for STREAMING type. Using fallback URL.");
          watchUrl = "https://www.twitch.tv/4levy_z1";
        }
      }

      let platform = "";
      if (watchUrl) {
        if (watchUrl.includes("twitch.tv")) {
          platform = "Twitch";
        } else if (
          watchUrl.includes("youtube.com") ||
          watchUrl.includes("youtu.be")
        ) {
          platform = "YouTube";
        } else if (
          watchUrl.includes("spotify.com")
        ) {
          platform = "Spotify";
        } else {
          platform = "Custom";
        }
      }

      const presence = new RichPresence(this)
        .setApplicationId(applicationId)
        .setType(activityType);

      if (activityType === "STREAMING" && watchUrl) {
        presence.setURL(watchUrl);
      }

      const text1 = config["text-1"]?.[this.index.text_1] || null;
      let activityName;
      
      if (activityType === "STREAMING" && platform) {
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
        activityName = this.SPT(text1) || this.getDefaultActivityName(activityType, platform);
      }
      
      presence.setName(activityName);

      presence.setDetails(this.SPT(text1));

      const text2 = config["text-2"]?.[this.index.text_2] || null;
      presence.setState(this.SPT(text2));

      const text3 = config["text-3"]?.[this.index.text_3] || null;
      presence.setAssetsLargeText(this.SPT(text3));

      if (config["text-5"]?.length) {
        const text5 = config["text-5"][this.index.text_5];
        presence.setAssetsSmallText(this.SPT(text5));
      }

      if (config.bigimg?.length) {
        try {
          const bigImg = config.bigimg[this.index.bm];
          
          let smallImg = null;
          let useSmallImage = true;
          
          if (config.smallimg && Array.isArray(config.smallimg) && config.smallimg.length > 0) {
            const smallImgValue = config.smallimg[this.index.sm];
            
            if (smallImgValue === null || 
                smallImgValue === false || 
                smallImgValue === "" || 
                smallImgValue === "none" || 
                smallImgValue === "disabled" ||
                smallImgValue === "false") {
              useSmallImage = false;
            } else {
              smallImg = smallImgValue;
            }
          } else {
            useSmallImage = false;
          }
          
          const images = await this.getImage(bigImg, useSmallImage ? smallImg : null);
          
          if (images.bigImage) {
            presence.setAssetsLargeImage(images.bigImage);
          }
          
          if (useSmallImage && images.smallImage) {
            presence.setAssetsSmallImage(images.smallImage);
          } else {
          }
        } catch (imgError) {
          console.warn(`Failed to set images: ${imgError.message}`);
        }
      } else {
      }

      if (config["button-1"]?.length) {
        try {
          const button1 = config["button-1"][this.index.bt_1];
          presence.addButton(this.SPT(button1.name), button1.url);
        } catch (buttonError) {
          console.warn(`Failed to add button 1: ${buttonError.message}`);
        }
      }

      if (config["button-2"]?.length) {
        try {
          const button2 = config["button-2"][this.index.bt_2];
          presence.addButton(this.SPT(button2.name), button2.url);
        } catch (buttonError) {
          console.warn(`Failed to add button 2: ${buttonError.message}`);
        }
      }

      if (this.customStatusEnabled) {
        this.currentStreamingActivity = presence;
      } else {
        const status = {
          activities: [presence],
        };

        try {
          this.user?.setPresence(status);
        } catch (presenceError) {
          console.warn(`Failed to update presence: ${presenceError.message}`);
        }
      }

      this.updateIndices(config);

      const nextUpdateDelay = config.status?.delay || Math.max(5000, (setup?.delay || 10) * 1000);
      setTimeout(() => this.streaming(), nextUpdateDelay);
    } catch (error) {
      console.error(`Error in streaming method: ${error.message}`);
      setTimeout(() => this.streaming(), 30000);
    } finally {
      this.isRunningStream = false;
    }
  }

  updateIndices(config) {
    this.lib.count++;
    this.lib.countParty++;

    this.index.url =
      (this.index.url + 1) %
      Math.max(1, config.options["watch-url"]?.length || 1);
    this.index.text_0 =
      (this.index.text_0 + 1) % Math.max(1, config["text-1"]?.length || 1);
    this.index.text_1 =
      (this.index.text_1 + 1) % Math.max(1, config["text-1"]?.length || 1);
    this.index.text_2 =
      (this.index.text_2 + 1) % Math.max(1, config["text-2"]?.length || 1);
    this.index.text_3 =
      (this.index.text_3 + 1) % Math.max(1, config["text-3"]?.length || 1);
    this.index.text_4 =
      (this.index.text_4 + 1) % Math.max(1, config["text-4"]?.length || 1);
    this.index.text_5 =
      (this.index.text_5 + 1) % Math.max(1, config["text-5"]?.length || 1);
    this.index.bt_1 =
      (this.index.bt_1 + 1) % Math.max(1, config["button-1"]?.length || 1);
    this.index.bt_2 =
      (this.index.bt_2 + 1) % Math.max(1, config["button-2"]?.length || 1);
    this.index.bm =
      (this.index.bm + 1) % Math.max(1, config.bigimg?.length || 1);
    this.index.sm =
      (this.index.sm + 1) % Math.max(1, config.smallimg?.length || 1);
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
        console.warn(`Error disconnecting from voice channel ${channelId}: ${error.message}`);
      }
    }
    this.voiceConnections.clear();
  }

  maskToken(token) {
    const parts = token.split(".");
    if (parts.length < 2) return token;
    return `${parts[0]}.##########`;
  }

  async customStatus() {
    try {
      const statusConfig = config.status || global.config?.status;
      if (!statusConfig || !statusConfig.data || !statusConfig.data.length) {
        console.log("No custom status configuration found");
        return;
      }

      if (!this.statusIndex) {
        this.statusIndex = 0;
      }

      const currentStatus = statusConfig.data[this.statusIndex];
      if (!currentStatus) {
        console.log("Invalid status configuration");
        return;
      }

      // Parse the simplified format "emoji text" or use the old object format
      let emoji, text;
      if (typeof currentStatus === 'string') {
        // Split the string at the first space to separate emoji from text
        const spaceIndex = currentStatus.indexOf(' ');
        if (spaceIndex > 0) {
          emoji = currentStatus.substring(0, spaceIndex);
          text = currentStatus.substring(spaceIndex + 1);
        } else {
          emoji = '';
          text = currentStatus;
        }
      } else {
        // Old object format for backward compatibility
        emoji = currentStatus.emoji;
        text = currentStatus.text;
      }

      const customStatus = new CustomStatus(this)
        .setEmoji(this.SPT(emoji))
        .setState(this.SPT(text));

      const currentPresence = this.user?.presence;
      let activities = [];
      
      activities.push(customStatus);
      
      if (this.currentStreamingActivity) {
        activities.push(this.currentStreamingActivity);
      } else {
        if (currentPresence && currentPresence.activities) {
          const streamingActivities = currentPresence.activities.filter(
            activity => activity.type === 'STREAMING' || activity.type === 1 ||
                       activity.type === 'PLAYING' || activity.type === 0 ||
                       activity.type === 'LISTENING' || activity.type === 2 ||
                       activity.type === 'WATCHING' || activity.type === 3 ||
                       activity.type === 'COMPETING' || activity.type === 5
          );
          
          activities.push(...streamingActivities);
        }
      }

      await this.user?.setPresence({
        activities: activities,
        status: currentPresence?.status || "online"
      });

      this.statusIndex = (this.statusIndex + 1) % statusConfig.data.length;

      const delay = statusConfig.delay || 4000;
      setTimeout(() => this.customStatus(), delay);

    } catch (error) {
      console.error(`Custom status error for ${this.maskToken(this.TOKEN)}:`, error.message);

      setTimeout(() => this.customStatus(), 10000);
    }
  }

  async getImage(bigImg, smallImg) {
    try {
      const [bigImage, smallImage] = await Promise.all([
        this.SPT(bigImg),
        this.SPT(smallImg),
      ]);

      const cachedBigImage = this.cacheImage.get(bigImg);
      const cachedSmallImage = this.cacheImage.get(smallImg);

      let fetchedImages = { bigImage: null, smallImage: null };
      try {
        fetchedImages = await this.getExternal.get(bigImage, smallImage);
      } catch (error) {
        console.warn(`Error fetching images: ${error.message}`);
      }

      const finalBigImage = fetchedImages.bigImage || cachedBigImage || null;
      const finalSmallImage =
        fetchedImages.smallImage || cachedSmallImage || null;

      if (fetchedImages.bigImage)
        this.cacheImage.set(bigImg, fetchedImages.bigImage);
      if (fetchedImages.smallImage)
        this.cacheImage.set(smallImg, fetchedImages.smallImage);

      return { bigImage: finalBigImage, smallImage: finalSmallImage };
    } catch (error) {
      console.warn(`Image processing error: ${error.message}`);
      return { bigImage: null, smallImage: null };
    }
  }

  replaceVariables(text, variables) {
    if (!text) return text;

    const map = new Map(Object.entries(variables));
    return text.replace(/\{([^{}]+)\}/g, (match, key) => {
      const funcMatch = key.match(/^(\w+)\((.+)\)$/);
      if (funcMatch) {
        const [, funcName, args] = funcMatch;
        const func = map.get(funcName);
        if (typeof func === "function") {
          try {
            return func(args.trim());
          } catch (err) {
            console.warn(`Error in function ${funcName}: ${err.message}`);
            return match;
          }
        }
      }
      const [varName, defaultValue] = key.split("=");
      if (defaultValue) {
        const [funcName, ...params] = defaultValue.split(":");
        const func = map.get(`${varName}=${funcName}`);
        if (typeof func === "function") {
          try {
            return func(match, ...params);
          } catch (err) {
            console.warn(
              `Error in function ${varName}=${funcName}: ${err.message}`
            );
            return match;
          }
        }
      }
      return map.has(key) ? map.get(key) : match;
    });
  }

  SPT(text) {
    if (!text) return text || null;

    try {
      const { weather, sys, emoji, textFont, lib } = this;
      const currentMoment = moment()
        .locale("th")
        .tz(weather.timezone || config.options?.tz || global.config?.options?.tz || "Asia/Bangkok");

      const variables = {
        // Time
        "hour:1": currentMoment.format("HH"),
        "hour:2": currentMoment.format("hh"),
        "min:1": currentMoment.format("mm"),
        "min:2": currentMoment.format("mm A"),
        // Thai Date
        "th=date": currentMoment.format("D"),
        "th=week:1": currentMoment.format("ddd"),
        "th=week:2": currentMoment.format("dddd"),
        "th=month:1": currentMoment.format("M"),
        "th=month:2": currentMoment.format("MMM"),
        "th=month:3": currentMoment.format("MMMM"),
        "th=year:1": (parseInt(currentMoment.format("YYYY")) + 543)
          .toString()
          .slice(-2),
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

        // Weather - using defaults if data isn't loaded yet
        city: weather.city || "Unknown",
        region: weather.region || "",
        country: weather.country || "",
        "temp:c": weather.temp_c || 0,
        "temp:f": weather.temp_f || 32,
        "wind:kph": weather.wind_kph || 0,
        "wind:mph": weather.wind_mph || 0,
        "wind:degree": weather.wind_degree || 0,
        "wind:dir": weather.wind_dir || "N",
        "pressure:mb": weather.pressure_mb || 1013,
        "pressure:in": weather.pressure_in || 29.92,
        "precip:mm": weather.precip_mm || 0,
        "precip:in": weather.precip_in || 0,
        "gust:kph": weather.gust_kph || 0,
        "gust:mph": weather.gust_mph || 0,
        "feelslike:c": weather.feelslike_c || 0,
        "feelslike:f": weather.feelslike_f || 32,
        "windchill:c": weather.windchill_c || 0,
        "windchill:f": weather.windchill_f || 32,
        "heatindex:c": weather.heatindex_c || 0,
        "heatindex:f": weather.heatindex_f || 32,
        "dewpoint:c": weather.dewpoint_c || 0,
        "dewpoint:f": weather.dewpoint_f || 32,
        "vis:km": weather.vis_km || 10,
        "vis:mi": weather.vis_miles || 6.2,
        humidity: weather.humidity || 50,
        cloud: weather.cloud || 0,
        uv: weather.uv || 0,
        co: weather.co || 0,
        no2: weather.no2 || 0,
        o3: weather.o3 || 0,
        so2: weather.so2 || 0,
        "pm2.5": weather.pm2_5 || 0,
        pm10: weather.pm10 || 0,

        // System
        ping: Math.round(this.ws?.ping || 0),
        patch: lib.v.patch || "1.0.0",
        "cpu:name": sys.cpuname || "CPU",
        "cpu:cores": sys.cpucores || 1,
        "cpu:speed": sys.cpuspeed || "0.0",
        "cpu:usage": sys.cpu || 0,
        "ram:usage": sys.ram || 0,
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
        "emoji:random": () => emoji.random(),
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
      console.error(`Error in SPT: ${error.message}`);
      return text;
    }
  }

  async start() {
    try {
      try {
        await this.weather.update();
        await this.sys.update();
      } catch (initError) {
        console.warn(`Info initialization error: ${initError.message}`);
      }

      const originalLoginMethod = this.login;
      this.login = async function (token) {
        try {
          try {
            const path = require.resolve("discord.js-selfbot-v13");
            const basePath = path.substring(
              0,
              path.indexOf("node_modules") + "node_modules".length
            );
            const READYPath = `${basePath}/discord.js-selfbot-v13/src/client/websocket/handlers/READY`;
            const READY = require(READYPath);

            const originalHandler = READY.exports;

            READY.exports = function (client, packet) {
              if (packet && packet.d && packet.d.user_settings) {
                if (!packet.d.user_settings.friend_source_flags) {
                  console.log(
                    "Patching missing friend_source_flags in READY packet"
                  );
                  packet.d.user_settings.friend_source_flags = { all: false };
                }
              }
              return originalHandler(client, packet);
            };
            console.log("Successfully patched READY handler");
          } catch (e) {
            console.warn("Failed to patch READY handler:", e.message);
          }

          return await originalLoginMethod.call(this, token);
        } catch (loginError) {
          console.error("Login error:", loginError.message);

          if (loginError.message.includes("Cannot read properties of null")) {
            console.log("Applying emergency patch for friend_source_flags...");

            try {
              const ClientUserSettingManager = require("discord.js-selfbot-v13/src/managers/ClientUserSettingManager");
              const originalPatch = ClientUserSettingManager.prototype._patch;

              ClientUserSettingManager.prototype._patch = function (data) {
                if (!data) data = {};
                if (!data.friend_source_flags) {
                  data.friend_source_flags = { all: false };
                }
                return originalPatch.call(this, data);
              };
              console.log("Applied emergency patch, trying login again");

              return await originalLoginMethod.call(this, token);
            } catch (e) {
              console.error("Emergency patch failed:", e.message);
              throw loginError;
            }
          }

          throw loginError;
        }
      };

      await this.login(this.TOKEN);

      const delay = Math.max(0, this.targetTime - Date.now());
      await new Promise((resolve) => setTimeout(resolve, delay));

      this.lib.timestamp = Date.now();
      const updateInterval = 1000 * (this.config.setup?.delay || 10);
      this.startInterval(() => this.sys.update(), updateInterval);

      await this.streaming();

      return {
        success: true,
        username: this.user?.tag || "Unknown",
      };
    } catch (error) {
      console.error("Client start error:", error);
      this.destroy();
      const errorMessage = error.message.toUpperCase().replace(/\./g, "");
      console.log(`[-] ${this.maskToken(this.TOKEN)} : ${errorMessage}`.red);

      if (error.message.includes("Cannot read properties of null")) {
        console.log(
          "This appears to be an API compatibility issue. Trying alternative method..."
            .yellow
        );
        return { success: false, reason: "api_compatibility" };
      }

      return { success: false };
    }
  }

  end() {
    try {
      this.stopAllIntervals();
      this.destroy();
    } catch (error) {
      console.error(`Error during client cleanup: ${error.message}`);
    }
  }
}


const statusChecks = new Map();
const MemoryManager = {
  monitorAndCleanup: async () => {},
  checkMemoryUsage: () => ({ percentage: 50 }),
  cleanupMemory: async () => {}
};

const activeStreamsManager = {
  addUser: (userId) => {},
  removeUser: (userId) => {}
};

class StreamManager {
  constructor() {
    this.activeStreams = new Map();
    this.userConfigs = new Map();
    this.failedTokens = new Map();
    this.setupMemoryMonitoring();
  }

  setupMemoryMonitoring() {
    setInterval(async () => {
      await MemoryManager.monitorAndCleanup();

      if (MemoryManager.checkMemoryUsage().percentage > 95) {
        await this.restartProblematicStreams();
      }
    }, 60000);
  }

  async restartProblematicStreams() {
    const restartedClients = new Map();

    for (const [userId, clients] of this.activeStreams.entries()) {
      for (const [token, client] of clients.entries()) {
        const clientKey = `${userId}-${token}`;
        const lastRestart = restartedClients.get(clientKey) || 0;
        const currentTime = Date.now();

        if (currentTime - lastRestart < 15 * 60 * 1000) {
          continue;
        }

        if (client.ws.ping > 5000 || client.ws.status === 5) {
          console.log(
            `Restarting stream for token due to connectivity issues: ${this.maskToken(
              token
            )}`
          );
          await this.restartStream(userId, token, client.config);

          restartedClients.set(clientKey, currentTime);
        }
      }
    }
  }

  async restartStream(userId, token, config) {
    try {
      const clients = this.activeStreams.get(userId);
      if (!clients) return;

      const client = clients.get(token);
      if (!client) return;

      console.log(`Cleaning up client for token: ${this.maskToken(token)}`);
      client.end();
      clients.delete(token);

      await MemoryManager.cleanupMemory();

      await new Promise((resolve) => setTimeout(resolve, 5000));

      console.log(`Creating new client for token: ${this.maskToken(token)}`);
      const newClient = new ModClient(token, config, {
        wait: Date.now(),
        version: "1.0.0",
        customStatus: true,
        voiceEnabled: true // Default to enabled for replacement clients
      });

      try {
        const result = await newClient.start();
        if (result.success) {
          clients.set(token, newClient);
          console.log(
            `Successfully restarted client for token: ${this.maskToken(token)}`
          );
        } else {
          console.log(
            `Failed to restart client for token: ${this.maskToken(token)}`
          );
        }
      } catch (startError) {
        console.error(`Error starting new client: ${startError.message}`);
      }
    } catch (error) {
      console.error(`Error in restartStream: ${error}`);
    }
  }

  async startStreamWithConfigs(userId, tokenConfigs, globalConfig) {
    await this.stopStream(userId);

    try {
      this.failedTokens.set(userId, []);

      const clientInstances = new Map();
      let successCount = 0;
      let failedCount = 0;

      for (const tokenConfig of tokenConfigs) {
        try {
          if (
            !tokenConfig.value ||
            typeof tokenConfig.value !== "string" ||
            tokenConfig.value.split(".").length !== 3
          ) {
            console.log(
              `Invalid token format for user ${userId}: ${this.maskToken(
                tokenConfig.value
              )}`.red
            );
            failedCount++;
            continue;
          }

          const perTokenConfig = this.createTokenConfig(tokenConfig, globalConfig);
          
          const client = new ModClient(tokenConfig.value, perTokenConfig, {
            wait: Date.now() + successCount * 5000,
            version: "1.0.0",
            customStatus: tokenConfig.customStatus,
            voiceEnabled: tokenConfig.voiceEnabled
          });

          const result = await client.start();

          if (result.success) {
            clientInstances.set(tokenConfig.value, client);
            successCount++;
            const activityType = tokenConfig.activity?.type || globalConfig.rpc?.data?.type || "STREAMING";
          } else {
            console.log(
              `[-] Failed to start token: ${this.maskToken(tokenConfig.value)} - ${result.reason || "Unknown error"}`.red
            );
            failedCount++;
          }
        } catch (error) {
          failedCount++;
          const failedTokens = this.failedTokens.get(userId) || [];
          failedTokens.push({
            token: this.maskToken(tokenConfig.value),
            reason: error.message,
          });
          console.error(
            `Error with token ${this.maskToken(tokenConfig.value)}:`,
            error
          );
        }
      }

      if (successCount > 0) {
        this.activeStreams.set(userId, clientInstances);
        activeStreamsManager.addUser(userId);

        return {
          success: true,
          successCount,
          failedCount,
          totalCount: tokenConfigs.length,
        };
      }

      return {
        success: false,
        failedCount,
        totalCount: tokenConfigs.length,
        failedTokens: this.failedTokens.get(userId),
      };
    } catch (error) {
      console.error(`Stream start error for user ${userId}:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  createTokenConfig(tokenConfig, globalConfig) {
    const activity = tokenConfig.activity || {};

    const urls = [];
    if (globalConfig.rpc?.TwitchURL) {
      urls.push(globalConfig.rpc.TwitchURL);
    }
    if (globalConfig.rpc?.YoutubeURL) {
      urls.push(globalConfig.rpc.YoutubeURL);
    }
    

    if (urls.length === 0) {
      if (activity.url) {
        urls.push(activity.url);
      } else if (globalConfig.rpc?.url) {
        urls.push(globalConfig.rpc.url);
      } else {
        urls.push("https://www.twitch.tv/4levy_z1");
      }
    }
    
    return {
      setup: globalConfig.setup,
      config: {
        options: {
          ...globalConfig.options,
          "watch-url": urls,
          "activity-type": activity.type || globalConfig.rpc?.type || "STREAMING"
        },
        "text-1": activity.name || globalConfig.rpc?.name || ["Discord Selfbot"],
        "text-2": activity.state || globalConfig.rpc?.state || ["Active"],
        "text-3": activity.details || globalConfig.rpc?.details || ["Running"],
        "text-4": activity.assetsLargeText || globalConfig.rpc?.assetsLargeText || [""],
        "text-5": activity.assetsSmallText || globalConfig.rpc?.assetsSmallText || [""],
        bigimg: activity.assetsLargeImage || globalConfig.rpc?.assetsLargeImage || [],
        smallimg: activity.assetsSmallImage || globalConfig.rpc?.assetsSmallImage || [],
        "button-1": activity.buttonFirst || globalConfig.rpc?.buttonFirst || [],
        "button-2": activity.buttonSecond || globalConfig.rpc?.buttonSecond || []
      }
    };
  }

  async startStream(userId, tokens, config) {
    await this.stopStream(userId);

    try {
      this.failedTokens.set(userId, []);

      const clientInstances = new Map();
      let successCount = 0;
      let failedCount = 0;

      const userSpecificConfig = JSON.parse(JSON.stringify(config));

      this.userConfigs.set(userId, userSpecificConfig);

      for (const token of tokens) {
        try {
          if (
            !token.value ||
            typeof token.value !== "string" ||
            token.value.split(".").length !== 3
          ) {
            console.log(
              `Invalid token format for user ${userId}: ${this.maskToken(
                token.value
              )}`
            );
            this.failedTokens.get(userId).push({
              value: token.value,
              reason: "Invalid token format",
            });
            failedCount++;
            continue;
          }

          const client = new ModClient(token.value, userSpecificConfig, {
            wait: Date.now(),
            version: "1.0.0",
            customStatus: token.customStatus === true,
            voiceEnabled: token.voiceEnabled === true
          });

          client.on("error", (error) => {
            console.error(
              `Client error for token ${this.maskToken(token.value)}:`,
              error
            );
          });

          const result = await client.start();
          if (result.success) {
            clientInstances.set(token.value, client);
            successCount++;
            console.log(`[+] READY : [${result.username}]`.green);
          } else {
            failedCount++;
            this.failedTokens.get(userId).push({
              value: token.value,
              reason: result.reason || "Unknown error",
            });
            console.log(
              `[-] ${this.maskToken(token.value)} : Failed to start`.red
            );
          }
        } catch (error) {
          failedCount++;
          this.failedTokens.get(userId).push({
            value: token.value,
            reason: error.message,
          });
          console.error(
            `Error with token ${this.maskToken(token.value)}:`,
            error
          );
        }
      }

      if (successCount > 0) {
        this.activeStreams.set(userId, clientInstances);
        activeStreamsManager.addUser(userId);
        console.log(`Added user ${userId} to active streams`);

        return {
          success: true,
          successCount,
          failedCount,
          totalCount: tokens.length,
        };
      }

      return {
        success: false,
        failedCount,
        totalCount: tokens.length,
        failedTokens: this.failedTokens.get(userId),
      };
    } catch (error) {
      console.error(`Stream start error for user ${userId}:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async stopStream(userId) {
    const clients = this.activeStreams.get(userId);
    if (clients) {
      try {
        for (const client of clients.values()) {
          client.end();
        }
        this.activeStreams.delete(userId);
        activeStreamsManager.removeUser(userId);
        console.log(`Removed user ${userId} from active streams`);
        return true;
      } catch (error) {
        console.error(`Error stopping streams for user ${userId}:`, error);
        return false;
      }
    }
    return false;
  }

  isStreaming(userId) {
    return statusChecks.has(userId);
  }

  startStatusCheck(userId) {
    if (statusChecks.has(userId)) return;

    const checkInterval = setInterval(async () => {
      const streaming = await this.checkStreamingStatus(userId);
      if (!streaming) {
        this.stopStatusCheck(userId);
      }
    }, 10000);

    statusChecks.set(userId, checkInterval);
  }

  stopStatusCheck(userId) {
    const interval = statusChecks.get(userId);
    if (interval) {
      clearInterval(interval);
      statusChecks.delete(userId);
    }
  }

  async checkStreamingStatus(userId) {
    const clients = this.activeStreams.get(userId);
    if (!clients || clients.size === 0) {
      return false;
    }

    let activeStreamCount = 0;
    for (const client of clients.values()) {
      try {
        if (client && client.user && client.ws.status === 0) {
          const activities = client.user.presence?.activities || [];
          const isStreaming = activities.some(
            (activity) => activity && activity.type === "STREAMING"
          );

          if (isStreaming) {
            activeStreamCount++;
          }
        }
      } catch (error) {
        console.error(`Error checking stream status for a client:`, error);
      }
    }

    return activeStreamCount > 0;
  }

  getActiveStreamsCount(userId) {
    const clients = this.activeStreams.get(userId);
    return clients ? clients.size : 0;
  }

  maskToken(token) {
    if (!token || typeof token !== "string") return "INVALID_TOKEN";
    const parts = token.split(".");
    if (parts.length < 2) return token.substring(0, 10) + "...";
    return `${parts[0]}.##########`;
  }
}

if (!global.gc) {
  console.warn(
    "Running without exposed garbage collection. Memory management will be limited."
  );
}

async function main() {
  try {
    execSync('mode con: cols=155 lines=40');
    const streamManager = new StreamManager();
    
    let tokenConfigs = [];
    
    if (config.tokens && Array.isArray(config.tokens)) {
      tokenConfigs = config.tokens
        .filter(tokenConfig => tokenConfig.enabled !== false)
        .map(tokenConfig => {
          let token = tokenConfig.token;
          
          if (tokenConfig.encoded === true) {
            try {
              token = Buffer.from(token, 'base64').toString('utf-8');
              console.log(`Decoded Base64 token: ${token.substring(0, 20)}...`.cyan);
            } catch (error) {
              console.error(`Failed to decode Base64 token: ${error.message}`.red);
              return null;
            }
          }
          
          if (typeof token === 'string') {
            token = token.replace(/["']/g, '').trim();
          }
          
          return {
            value: token,
            enabled: tokenConfig.enabled !== false,
            customStatus: tokenConfig.customStatus === true,
            voiceEnabled: tokenConfig.voiceEnabled === true,
            activity: tokenConfig.activity || null 
          };
        })
        .filter(tokenConfig => tokenConfig && tokenConfig.value && 
                !tokenConfig.value.includes("YOUR_") && 
                tokenConfig.value !== "VALUE");
    } else if (config.token) {
      let token = config.token;
      if (typeof token === 'string') {
        token = token.replace(/["']/g, '').trim(); 
      }
      
      if (token && token !== "VALUE") {
        tokenConfigs = [{ 
          value: token, 
          enabled: true,
          customStatus: true, 
          activity: null
        }];
      }
    }
    
    if (tokenConfigs.length === 0) {
      console.error("Please set at least one valid Discord token in CONFIG/config.yml".red);
      console.error("Make sure to set enabled: true for the tokens you want to use".yellow);
      process.exit(1);
    }
    
    tokenConfigs.forEach((tokenConfig, index) => {
      const activityType = tokenConfig.activity?.type || config.rpc?.data?.type || "STREAMING";
      const maskedToken = tokenConfig.value.split(".")[0] + ".####";
      console.log(`Token ${index + 1} (${maskedToken}): ${activityType}`.yellow);
    });

    console.clear();
    console.log(BANNER);
    const userId = "selfbot_stream";
    
    console.log(`Starting streaming with ${tokenConfigs.length} token(s) from config.yml...`.yellow);
    
    const result = await streamManager.startStreamWithConfigs(userId, tokenConfigs, config);
    
    console.clear();
    console.log(BANNER);
    if (result.success) {
      console.log(`Successfully started ${result.successCount}/${result.totalCount} stream(s)`.green);
      if (result.failedCount > 0) {
        console.log(`Failed to start ${result.failedCount} stream(s)`.yellow);
      }
      
      process.on('SIGINT', async () => {
        console.log('\nShutting down gracefully...'.yellow);
        await streamManager.stopStream(userId);
        process.exit(0);
      });
      
      setInterval(() => {
      }, 60000);
      
    } else {
      console.error(`Failed to start streams: ${result.failedCount} failed`.red);
      if (result.failedTokens && result.failedTokens.length > 0) {
        result.failedTokens.forEach(failed => {
          console.error(`- ${failed.reason}`.red);
        });
      }
      process.exit(1);
    }
    
  } catch (error) {
    console.error("Error starting the bot:", error.message.red);
    process.exit(1);
  }
}

if (require.main === module) {
  console.log("Loading configuration from config.yml...".green);
  main().catch(console.error);
}

module.exports = new StreamManager();
