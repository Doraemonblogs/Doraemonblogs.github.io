// ipapi.co API
// function clockUpdateTime(e, c) {
//     let a = "#000";
//     switch (e.now.icon) {
//         case "100":
//             a = "#fdcc45";
//             break;
//         case "101":
//             a = "#fe6976";
//             break;
//         case "102":
//         case "103":
//             a = "#fe7f5b";
//             break;
//         case "104":
//         case "150":
//         case "151":
//         case "152":
//         case "153":
//         case "154":
//         case "800":
//         case "801":
//         case "802":
//         case "803":
//         case "804":
//         case "805":
//         case "806":
//         case "807":
//             a = "#2152d1";
//             break;
//         case "300":
//         case "301":
//         case "305":
//         case "306":
//         case "307":
//         case "308":
//         case "309":
//         case "310":
//         case "311":
//         case "312":
//         case "313":
//         case "314":
//         case "315":
//         case "316":
//         case "317":
//         case "318":
//         case "350":
//         case "351":
//         case "399":
//             a = "#49b1f5";
//             break;
//         case "302":
//         case "303":
//         case "304":
//             a = "#fdcc46";
//             break;
//         case "400":
//         case "401":
//         case "402":
//         case "403":
//         case "404":
//         case "405":
//         case "406":
//         case "407":
//         case "408":
//         case "409":
//         case "410":
//         case "456":
//         case "457":
//         case "499":
//             a = "#a3c2dc";
//             break;
//         case "500":
//         case "501":
//         case "502":
//         case "503":
//         case "504":
//         case "507":
//         case "508":
//         case "509":
//         case "510":
//         case "511":
//         case "512":
//         case "513":
//         case "514":
//         case "515":
//             a = "#97acba";
//             break;
//         case "900":
//         case "999":
//             a = "red";
//             break;
//         case "901":
//             a = "#179fff;"
//     }
//     var t = document.getElementById("hexo_electric_clock");
//     clock_box_html = `\n  <div class="clock-row">\n    <span id="card-clock-clockdate" class="card-clock-clockdate"></span>\n    <span class="card-clock-weather"><i class="qi-${e.now.icon}-fill" style="color: ${a}"></i> ${e.now.text} <span>${e.now.temp}</span> ℃ </span>\n    <span class="card-clock-humidity">💧 ${e.now.humidity}%</span>\n  </div>\n  <div class="clock-row">\n    <span id="card-clock-time" class="card-clock-time"></span>\n  </div>\n  <div class="clock-row">\n    <span class="card-clock-windDir"> <i class="qi-gale"></i> ${e.now.windDir}</span>\n    <span class="card-clock-location">${c}</span>\n    <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>\n  </div>\n  `;
//     var s = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
//         n = document.getElementById("card-clock-loading");

//     function r() {
//         var e, c = new Date,
//             a = o(c.getHours(), 2) + ":" + o(c.getMinutes(), 2) + ":" + o(c.getSeconds(), 2),
//             t = o(c.getFullYear(), 4) + "-" + o(c.getMonth() + 1, 2) + "-" + o(c.getDate(), 2) + " " + s[c.getDay()],
//             n = c.getHours();
//         if (n > 12 ? (n -= 12, e = " P M") : e = " A M", document.getElementById("card-clock-time")) {
//             var r = document.getElementById("card-clock-time"),
//                 l = document.getElementById("card-clock-clockdate"),
//                 i = document.getElementById("card-clock-dackorlight");
//             r.innerHTML = a, l.innerHTML = t, i.innerHTML = e
//         }
//     }

//     function o(e, c) {
//         for (var a = "", t = 0; t < c; t++) a += "0";
//         return (a + e).slice(-c)
//     }
//     n && (n.innerHTML = ""), t.innerHTML = clock_box_html;
//     setInterval(r, 1e3);
//     r()
// }

// function getIpInfo() {
//     // 优先使用ipapi.co获取经纬度和城市信息
//     fetch('https://ipapi.co/json/')
//         .then(response => response.json())
//         .then(ipData => {
//             // 提取关键数据：城市名、经纬度（用于天气API）
//             const city = ipData.city || 'Unknown';
//             const location = `${ipData.longitude},${ipData.latitude}`; // 经度,纬度格式
            
//             // 调用和风天气API（需确保qweather_key已定义）
//             const weatherUrl = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${qweather_key}&lang=zh`;
            
//             return fetch(weatherUrl)
//                 .then(response => response.json())
//                 .then(weatherData => {
//                     if (document.getElementById("hexo_electric_clock")) {
//                         // 传递城市名和天气数据到时钟渲染函数
//                         clockUpdateTime(weatherData, city);
//                     }
//                 });
//         })
//         .catch(error => {
//             console.error('定位或天气获取失败:', error);
//             // 降级处理：显示默认城市(武汉)
//             const fallbackWeatherUrl = `https://devapi.qweather.com/v7/weather/now?location=114.41330,30.51319&key=${qweather_key}&lang=zh`;
//             fetch(fallbackWeatherUrl)
//                 .then(response => response.json())
//                 .then(weatherData => {
//                     clockUpdateTime(weatherData, '武汉市');
//                 });
//         });
// }

// getIpInfo();

// 腾讯地图
// function getIpInfo() {
//     // 使用腾讯地图IP定位服务
//     const txMapKey = 'ZVYBZ-LGQCC-DN62P-AP5JR-CQ7OO-G4BWN';
//     fetch(`https://apis.map.qq.com/ws/location/v1/ip?key=${txMapKey}`)
//         .then(response => response.json())
//         .then(txData => {
//             if (txData.status === 0) {  // 腾讯API成功状态码为0
//                 // 提取中文城市名（自动去除"市"后缀）
//                 const city = txData.result.ad_info.city || '武汉市';
//                 // 获取经纬度（格式：经度,纬度）
//                 const [lng, lat] = [
//                     // txData.result.location.lng.toFixed(5),
//                     // txData.result.location.lat.toFixed(5)
//                     txData.result.location.lng,
//                     txData.result.location.lat
//                 ];
                
//                 // 调用和风天气API
//                 const weatherUrl = `https://devapi.qweather.com/v7/weather/now?location=${lng},${lat}&key=${qweather_key}&lang=zh`;
//                 return fetch(weatherUrl);
//             }
//             throw new Error('腾讯定位失败');
//         })
//         .then(response => response.json())
//         .then(weatherData => {
//             if (weatherData.code === '200') {
//                 // 显示完整中文地址（省+市+区）
//                 const fullAddress = `${txData.result.ad_info.province}·${city}·${txData.result.ad_info.district}`;
//                 clockUpdateTime(weatherData, fullAddress);
//             } else {
//                 console.error('天气数据异常:', weatherData);
//                 clockUpdateTime({ now: {} }, '武汉市'); // 显示基础时钟
//             }
//         })
//         .catch(error => {
//             console.error('定位失败:', error);
//             // 降级方案：显示武汉天气
//             fetch(`https://devapi.qweather.com/v7/weather/now?location=114.30525,30.59276&key=${qweather_key}&lang=zh`)
//                 .then(response => response.json())
//                 .then(weatherData => {
//                     clockUpdateTime(weatherData, '武汉市');
//                 });
//         });
// }

// getIpInfo();

// 高德地图API
// function clockUpdateTime(e, c) {
//     let a = "#000";
//     switch (e.now.icon) {
//         case "100": a = "#fdcc45"; break;
//         case "101": a = "#fe6976"; break;
//         case "102":
//         case "103": a = "#fe7f5b"; break;
//         case "104":
//         case "150":
//         case "151":
//         case "152":
//         case "153":
//         case "154":
//         case "800":
//         case "801":
//         case "802":
//         case "803":
//         case "804":
//         case "805":
//         case "806":
//         case "807": a = "#2152d1"; break;
//         case "300":
//         case "301":
//         case "305":
//         case "306":
//         case "307":
//         case "308":
//         case "309":
//         case "310":
//         case "311":
//         case "312":
//         case "313":
//         case "314":
//         case "315":
//         case "316":
//         case "317":
//         case "318":
//         case "350":
//         case "351":
//         case "399": a = "#49b1f5"; break;
//         case "302":
//         case "303":
//         case "304": a = "#fdcc46"; break;
//         case "400":
//         case "401":
//         case "402":
//         case "403":
//         case "404":
//         case "405":
//         case "406":
//         case "407":
//         case "408":
//         case "409":
//         case "410":
//         case "456":
//         case "457":
//         case "499": a = "#a3c2dc"; break;
//         case "500":
//         case "501":
//         case "502":
//         case "503":
//         case "504":
//         case "507":
//         case "508":
//         case "509":
//         case "510":
//         case "511":
//         case "512":
//         case "513":
//         case "514":
//         case "515": a = "#97acba"; break;
//         case "900":
//         case "999": a = "red"; break;
//         case "901": a = "#179fff";
//     }

//     var t = document.getElementById("hexo_electric_clock");
//     clock_box_html = `
//         <div class="clock-row">
//             <span id="card-clock-clockdate" class="card-clock-clockdate"></span>
//             <span class="card-clock-weather"><i class="qi-${e.now.icon}-fill" style="color: ${a}"></i> ${e.now.text} <span>${e.now.temp}</span> ℃</span>
//             <span class="card-clock-humidity">💧 ${e.now.humidity}%</span>
//         </div>
//         <div class="clock-row">
//             <span id="card-clock-time" class="card-clock-time"></span>
//         </div>
//         <div class="clock-row">
//             <span class="card-clock-windDir"> <i class="qi-gale"></i> ${e.now.windDir}</span>
//             <span class="card-clock-location">${c}</span>
//             <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>
//         </div>
//     `;

//     var s = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
//         n = document.getElementById("card-clock-loading");

//     function r() {
//         var e, c = new Date,
//             a = o(c.getHours(), 2) + ":" + o(c.getMinutes(), 2) + ":" + o(c.getSeconds(), 2),
//             t = o(c.getFullYear(), 4) + "-" + o(c.getMonth() + 1, 2) + "-" + o(c.getDate(), 2) + " " + s[c.getDay()],
//             n = c.getHours();
//         if (n > 12 ? (n -= 12, e = " P M") : e = " A M", document.getElementById("card-clock-time")) {
//             var r = document.getElementById("card-clock-time"),
//                 l = document.getElementById("card-clock-clockdate"),
//                 i = document.getElementById("card-clock-dackorlight");
//             r.innerHTML = a;
//             l.innerHTML = t;
//             i.innerHTML = e;
//         }
//     }

//     function o(e, c) {
//         for (var a = "", t = 0; t < c; t++) a += "0";
//         return (a + e).slice(-c);
//     }

//     n && (n.innerHTML = "");
//     t.innerHTML = clock_box_html;
//     setInterval(r, 1e3);
//     r();
// }

// function getIpInfo() {
//     let e = { city: "深圳市", qweather_url: "" };
//     "true" === clock_default_rectangle_enable && e ?
//         fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`)
//         .then((e => e.json()))
//         .then((e => {
//             if ("1" === e.status) {
//                 const c = e.regeocode.addressComponent;
//                 return Array.isArray(c.city) ? c.province : c.city;
//             }
//         }))
//         .then((c => {
//             fetch(`https://devapi.qweather.com/v7/weather/now?location=${clock_rectangle}&key=${qweather_key}`)
//                 .then((e => e.json()))
//                 .then((a => {
//                     if (document.getElementById("hexo_electric_clock")) {
//                         clockUpdateTime(a, Array.isArray(c) ? e.city : c);
//                     }
//                 }))
//         })) :
//         fetch(`https://restapi.amap.com/v3/ip?key=${gaud_map_key}`)
//         .then((e => e.json()))
//         .then((c => {
//             let a = Array.isArray(c.rectangle) ? clock_rectangle : c.rectangle.split(";")[0];
//             e.qweather_url = `https://devapi.qweather.com/v7/weather/now?location=${a}&key=${qweather_key}`;
//             Array.isArray(c.rectangle) ?
//                 fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`)
//                 .then((e => e.json()))
//                 .then((a => {
//                     if ("1" === a.status) {
//                         const c = a.regeocode.addressComponent;
//                         e.city = Array.isArray(c.city) ? c.province : c.city;
//                     }
//                     return c;
//                 }))
//                 .then((c => {
//                     fetch(e.qweather_url)
//                         .then((e => e.json()))
//                         .then((a => {
//                             if (document.getElementById("hexo_electric_clock")) {
//                                 clockUpdateTime(a, Array.isArray(c.city) ? e.city : c.city);
//                             }
//                         }))
//                 })) :
//                 fetch(e.qweather_url)
//                 .then((e => e.json()))
//                 .then((a => {
//                     if (document.getElementById("hexo_electric_clock")) {
//                         clockUpdateTime(a, Array.isArray(c.city) ? e.city : c.city);
//                     }
//                 }))
//         }))
// }

// getIpInfo();


function clockUpdateTime(e, c) {
    let a = "#000";
    switch (e.now.icon) {
        case "100": a = "#fdcc45"; break;
        case "101": a = "#fe6976"; break;
        case "102":
        case "103": a = "#fe7f5b"; break;
        case "104":
        case "150":
        case "151":
        case "152":
        case "153":
        case "154":
        case "800":
        case "801":
        case "802":
        case "803":
        case "804":
        case "805":
        case "806":
        case "807": a = "#2152d1"; break;
        case "300":
        case "301":
        case "305":
        case "306":
        case "307":
        case "308":
        case "309":
        case "310":
        case "311":
        case "312":
        case "313":
        case "314":
        case "315":
        case "316":
        case "317":
        case "318":
        case "350":
        case "351":
        case "399": a = "#49b1f5"; break;
        case "302":
        case "303":
        case "304": a = "#fdcc46"; break;
        case "400":
        case "401":
        case "402":
        case "403":
        case "404":
        case "405":
        case "406":
        case "407":
        case "408":
        case "409":
        case "410":
        case "456":
        case "457":
        case "499": a = "#a3c2dc"; break;
        case "500":
        case "501":
        case "502":
        case "503":
        case "504":
        case "507":
        case "508":
        case "509":
        case "510":
        case "511":
        case "512":
        case "513":
        case "514":
        case "515": a = "#97acba"; break;
        case "900":
        case "999": a = "red"; break;
        case "901": a = "#179fff";
    }

    var t = document.getElementById("hexo_electric_clock");
    clock_box_html = `
        <div class="clock-row">
            <span id="card-clock-clockdate" class="card-clock-clockdate"></span>
            <span class="card-clock-weather"><i class="qi-${e.now.icon}-fill" style="color: ${a}"></i> ${e.now.text} <span>${e.now.temp}</span> ℃</span>
            <span class="card-clock-humidity">💧 ${e.now.humidity}%</span>
        </div>
        <div class="clock-row">
            <span id="card-clock-time" class="card-clock-time"></span>
        </div>
        <div class="clock-row">
            <span class="card-clock-windDir"> <i class="qi-gale"></i> ${e.now.windDir}</span>
            <span class="card-clock-location">${c}</span>
            <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>
        </div>
    `;

    var s = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        n = document.getElementById("card-clock-loading");

    function r() {
        var e, c = new Date,
            a = o(c.getHours(), 2) + ":" + o(c.getMinutes(), 2) + ":" + o(c.getSeconds(), 2),
            t = o(c.getFullYear(), 4) + "-" + o(c.getMonth() + 1, 2) + "-" + o(c.getDate(), 2) + " " + s[c.getDay()],
            n = c.getHours();
        if (n > 12 ? (n -= 12, e = " P M") : e = " A M", document.getElementById("card-clock-time")) {
            var r = document.getElementById("card-clock-time"),
                l = document.getElementById("card-clock-clockdate"),
                i = document.getElementById("card-clock-dackorlight");
            r.innerHTML = a;
            l.innerHTML = t;
            i.innerHTML = e;
        }
    }

    function o(e, c) {
        for (var a = "", t = 0; t < c; t++) a += "0";
        return (a + e).slice(-c);
    }

    n && (n.innerHTML = "");
    t.innerHTML = clock_box_html;
    setInterval(r, 1e3);
    r();
}

// 1. 定义天气接口地址
const QWATHER_NOW_URL = 'https://api.qweather.com/v7/weather/now';

// 2. 抽一个通用的获取并渲染天气的函数
function fetchAndRenderWeather(location, cityName) {
  fetch(`${QWATHER_NOW_URL}?location=${location}`, {
    method: 'GET',
    headers: {
      'X-QW-Api-Key': `${qweather_key}`,      // 你的 API Key
      'Accept-Encoding': 'gzip,deflate'  // 自动解压
    }
  })
  .then(res => res.json())
  .then(data => {
    if (document.getElementById('hexo_electric_clock')) {
      clockUpdateTime(data, cityName);
    }
  })
  .catch(err => console.error('weather fetch error:', err));
}

// 3. 改造 getIpInfo，用上面这个函数
function getIpInfo() {
  // 如果开启了固定 rect（clock_rectangle）
  if (clock_default_rectangle_enable === 'true' && clock_rectangle) {
    // 先逆地理解析拿城市名
    fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`)
      .then(res => res.json())
      .then(r => {
        const comp = r.regeocode.addressComponent;
        const city = Array.isArray(comp.city) ? comp.province : comp.city;
        fetchAndRenderWeather(clock_rectangle, city);
      })
      .catch(console.error);
  }
  else {
    // 否则通过 IP 定位
    fetch(`https://restapi.amap.com/v3/ip?key=${gaud_map_key}`)
      .then(res => res.json())
      .then(ipRes => {
        // 拿到第一个矩形框作为 location
        let loc = '';
        if (ipRes.rectangle && !Array.isArray(ipRes.rectangle))
          loc = ipRes.rectangle.split(';')[0];
        else
          loc = clock_rectangle || '';  // 兜底

        // 再逆地理解析拿城市名
        return fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${loc}`)
          .then(res => res.json())
          .then(rgeo => {
            const comp = rgeo.regeocode.addressComponent;
            const city = Array.isArray(comp.city) ? comp.province : comp.city;
            return { loc, city };
          });
      })
      .then(({ loc, city }) => {
        fetchAndRenderWeather(loc, city);
      })
      .catch(console.error);
  }
}

getIpInfo();