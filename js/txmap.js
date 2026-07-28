(() => {
  const IPWHOIS_URL = 'https://ipwho.is/?lang=zh-CN'
  const CACHE_KEY = 'welcome-ipwhois-cache-v1'
  const CACHE_TTL = 6 * 60 * 60 * 1000
  const SITE_LOCATION = {
    lng: 114.136978,
    lat: 30.675353
  }

  let locationPromise

  const escapeHtml = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

  const unique = values => {
    const result = []
    values.filter(Boolean).forEach(item => {
      const normalized = String(item).trim()
      if (normalized && !result.includes(normalized)) result.push(normalized)
    })
    return result
  }

  const getDistance = (lng1, lat1, lng2, lat2) => {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    const getPoint = (lng, lat) => {
      lng *= PI / 180
      lat *= PI / 180
      return { x: cos(lat) * cos(lng), y: cos(lat) * sin(lng), z: sin(lat) }
    }

    const a = getPoint(lng1, lat1)
    const b = getPoint(lng2, lat2)
    const c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    return Math.round(asin(c / 2) * 2 * R)
  }

  const maskIp = ip => {
    if (!ip) return '未知'
    if (ip.includes(':')) return ip.split(':').slice(0, 3).join(':') + ':...'
    return ip.replace(/\.\d+$/, '.*')
  }

  const getCachedLocation = () => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data
    } catch (err) {
      localStorage.removeItem(CACHE_KEY)
    }
    return null
  }

  const setCachedLocation = data => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data
      }))
    } catch (err) {
      // localStorage may be disabled in privacy mode.
    }
  }

  const fetchLocation = () => {
    if (locationPromise) return locationPromise

    const cached = getCachedLocation()
    if (cached) {
      locationPromise = Promise.resolve(cached)
      return locationPromise
    }

    locationPromise = fetch(IPWHOIS_URL, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`IPWHOIS request failed: ${response.status}`)
        return response.json()
      })
      .then(data => {
        if (!data || data.success !== true) {
          throw new Error(data && data.message ? data.message : 'IPWHOIS returned an invalid response')
        }
        setCachedLocation(data)
        return data
      })

    return locationPromise
  }

  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 11) return '<span>上午好</span>，一日之计在于晨。'
    if (hour >= 11 && hour < 13) return '<span>中午好</span>，该摸鱼吃午饭了。'
    if (hour >= 13 && hour < 15) return '<span>下午好</span>，懒懒地睡个午觉吧。'
    if (hour >= 15 && hour < 16) return '<span>三点几啦</span>，一起饮茶先。'
    if (hour >= 16 && hour < 19) return '<span>夕阳无限好</span>。'
    if (hour >= 19 && hour < 24) return '<span>晚上好</span>，夜生活嗨起来。'
    return '夜深了，早点休息，少熬夜。'
  }

  const getLocationText = data => {
    const country = data.country
    const region = data.region
    const city = data.city

    if (data.country_code === 'CN') {
      return unique([country, region, city]).join(' ')
    }

    return unique([city, region, country]).join(' ')
  }

  const getLocationMessage = data => {
    const countryCode = data.country_code
    const region = data.region || ''
    const city = data.city || ''

    const countryMessages = {
      JP: 'よろしければ，一起去看樱花吧。',
      US: 'Let us live in peace!',
      GB: '想同你一起夜乘伦敦眼。',
      FR: "C'est La Vie.",
      DE: 'Die Zeit verging im Fluge.',
      AU: '一起去大堡礁看看海吧。',
      CA: '拾起一片枫叶赠予你。',
      KR: '明洞的灯火比星星更闪耀。',
      IN: '恒河畔的晨光与泰姬陵的月光。'
    }

    if (countryCode !== 'CN') {
      return countryMessages[countryCode] || '带我去你的国家逛逛吧。'
    }

    if (region.includes('湖北') || city.includes('武汉')) {
      const messages = [
        '过早了吗？热干面配蛋酒，武汉伢带你冲。',
        '黄鹤楼头望长江，东湖绿道骑自由。',
        '光谷步行街，年轻心跳与科技脉搏同频。'
      ]
      return messages[Math.floor(Math.random() * messages.length)]
    }

    if (region.includes('北京')) return '故宫红墙映琉璃，胡同深处听鸽哨。'
    if (region.includes('上海')) return '外滩灯影与梧桐风一起亮起来。'
    if (region.includes('广东')) return '饮早茶啦，虾饺烧卖叉烧包。'
    if (region.includes('四川')) return '火锅翻滚，麻辣香气在巷口招手。'
    if (region.includes('浙江')) return '东风渐绿西湖柳，山水正好。'
    if (region.includes('江苏')) return '江南烟雨，园林水巷都在等你。'
    if (region.includes('湖南')) return '一碗米粉，一口辣味，湘江夜风正好。'

    return '带我去你的城市逛逛吧。'
  }

  const renderWelcome = data => {
    const target = document.getElementById('welcome-info')
    if (!target) return

    const lng = Number(data.longitude)
    const lat = Number(data.latitude)
    const hasCoordinate = Number.isFinite(lng) && Number.isFinite(lat)
    const distance = hasCoordinate ? getDistance(SITE_LOCATION.lng, SITE_LOCATION.lat, lng, lat) : null
    const distanceText = distance === null
      ? '暂时无法计算你与站长的距离。'
      : `您现在距离站长约 <span style="color:#0af6ee">${distance}</span> 公里。`

    target.innerHTML = `<b><center>欢迎信息</center>&emsp;&emsp;
      欢迎来自 <span style="color:#0af6ee">${escapeHtml(getLocationText(data) || '神秘地区')}</span> 的小伙伴，
      ${getTimeGreeting()}${distanceText}
      当前 IP 地址为：<span style="color:#0af6ee">${escapeHtml(maskIp(data.ip))}</span>，
      ${escapeHtml(getLocationMessage(data))}</b>`
  }

  const renderFallback = error => {
    const target = document.getElementById('welcome-info')
    if (!target) return

    console.warn('Failed to load visitor location:', error)
    target.innerHTML = '<b><center>欢迎信息</center>&emsp;&emsp;欢迎来到我的小窝。访客位置暂时获取失败，稍后再试试吧。</b>'
  }

  const showWelcome = () => {
    fetchLocation()
      .then(renderWelcome)
      .catch(renderFallback)
  }

  const runWhenReady = fn => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true })
      return
    }
    fn()
  }

  runWhenReady(showWelcome)
  document.addEventListener('pjax:complete', showWelcome)
})()
