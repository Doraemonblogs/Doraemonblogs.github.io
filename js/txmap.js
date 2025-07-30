//get请求
$.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
        key: 'ZVYBZ-LGQCC-DN62P-AP5JR-CQ7OO-G4BWN',
        output: 'jsonp',
    },
    dataType: 'jsonp',
    success: function (res) {
        ipLoacation = res;
    }
})
function getDistance(e1, n1, e2, n2) {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
        e *= PI / 180
        n *= PI / 180
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }

    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
}

function showWelcome() {        // 网安基地图书馆
    let dist = getDistance(114.136978,30.675353, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
    let pos = ipLoacation.result.ad_info.nation;
    let ip;
    let posdesc;
        //根据国家、省份、城市信息自定义欢迎语
        switch (ipLoacation.result.ad_info.nation) {
            case "日本":
                posdesc = "よろしく，一起去看樱花吗";
                break;
            case "美国":
                posdesc = "Let us live in peace!";
                break;
            case "英国":
                posdesc = "想同你一起夜乘伦敦眼";
                break;
            case "俄罗斯":
                posdesc = "干了这瓶伏特加！";
                break;
            case "法国":
                posdesc = "C'est La Vie";
                break;
            case "德国":
                posdesc = "Die Zeit verging im Fluge.";
                break;
            case "澳大利亚":
                posdesc = "一起去大堡礁吧！";
                break;
            case "加拿大":
                posdesc = "拾起一片枫叶赠予你";
                break;
            case "意大利":
                posdesc = "在威尼斯贡多拉上共赏落日";
                break;
            case "韩国":
                posdesc = "明洞的灯火比星星更闪耀";
                break;
            case "印度":
                posdesc = "恒河畔的晨光与泰姬陵的月光";
                break;
            case "巴西":
                posdesc = "里约热内卢的基督像正张开双臂";
                break;
            case "西班牙":
                posdesc = "弗拉明戈的裙摆扫过巴塞罗那的夜";
                break;
            case "泰国":
                posdesc = "萨瓦迪卡，要来份芒果糯米饭吗？";
                break;
            case "新西兰":
                posdesc = "霍比特村的小门已为你打开";
                break;
            case "埃及":
                posdesc = "金字塔的阴影藏着法老的秘密";
                break;
            case "中国":
                pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
                ip = ipLoacation.result.ip;
                try {
                    // IPv6格式处理
                    const isIPv6 = /^([0-9a-fA-F]{1,4}:){3,}/.test(ip);
                    if (isIPv6) {
                        const ipv6Segments = ip.split(':').slice(0, 3);
                        ip = ipv6Segments.join(':') + '...'; 
                    }
                } catch (error) {
                    console.error("IP地址处理异常:", error);
                    ip = "无效IP";
                }
                switch (ipLoacation.result.ad_info.province) {
                    case "北京市":
                        const beijingMessages = [
                            "故宫红墙映琉璃，胡同深处听鸽哨",
                            "长城豌蜓镇山河，铜锅涮肉暖寒冬",
                            "天安门升旗迎朝阳，老北京炸酱面香满巷",
                            "颐和园中泛轻舟，798里探潮流",
                            "京腔京韵自多情，冰糖葫芦甜透心"
                        ];
                        posdesc = beijingMessages[Math.floor(Math.random() * beijingMessages.length)];
                        break;
                    case "天津市":
                        posdesc = "吃个肉包子，讲段相声吧";
                        break;
                    case "河北省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "石家庄市":
                                posdesc = "燕赵咽喉地，灯火正阑珊";
                                break;
                            case "秦皇岛市":
                                posdesc = "东临碣石，以观沧海";
                                break;
                            default:
                                posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山";
                                break;
                        }
                        break;
                    case "山西省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "太原市":
                                posdesc = "龙城宝地，晋祠流水如碧玉";
                                break;
                            case "大同市":
                                posdesc = "云冈石窟的佛陀低眉浅笑";
                                break;
                            default:
                                posdesc = "展开坐具长三尺，已占山河五百余。";
                                break;
                        }
                        break;
                    case "内蒙古自治区":
                        posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
                        break;
                    case "辽宁省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "沈阳市":
                                posdesc = "一朝发祥地，两代帝王宫";
                                break;
                            case "大连市":
                                posdesc = "星海湾的晚风里有海蛎子味";
                                break;
                            default:
                                posdesc = "我想吃烤鸡架！";
                                break;
                        }
                        break;
                    case "吉林省":
                        posdesc = "状元阁就是东北烧烤之王。";
                        break;
                    case "黑龙江省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "哈尔滨市":
                                posdesc = "中央大街的面包石印着百年时光";
                                break;
                            case "牡丹江市":
                                posdesc = "镜泊湖的雾凇恍若仙境";
                                break;
                            default:
                                posdesc = "很喜欢哈尔滨大剧院。";
                                break;
                        }
                        break;
                    case "上海市":
                        posdesc = "众所周知，中国只有两个城市。";
                        break;
                    case "江苏省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "南京市":
                                posdesc = "南京，历史文化名城";
                                break;
                            case "苏州市":
                                posdesc = "上有天堂，下有苏杭。";
                                break;
                            case "无锡市":
                                posdesc = "太湖佳绝处，毕竟在鼋头";
                                break;
                            case "徐州市":
                                posdesc = "九朝帝王徐州籍，千年兵家必争地";
                                break;
                            default:
                                posdesc = "散装是必须要散装的。";
                                break;
                        }
                        break;
                    case "浙江省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "杭州市":
                                posdesc = "东风渐绿西湖柳，雁已还人未南归。";
                                break;
                            case "宁波市":
                                posdesc = "书藏古今，港通天下";
                                break;
                            default:
                                posdesc = "天目千重秀，林木十里深";
                                break;
                        }
                        break;
                    case "河南省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "郑州市":
                                posdesc = "豫州之域，天地之中。";
                                break;
                            case "南阳市":
                                posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
                                break;
                            case "洛阳市":
                                posdesc = "洛阳牡丹甲天下。";
                                break;
                            case "开封市":
                                posdesc = "刚正不阿包青天。";
                                break;
                            case "信阳市":
                                posdesc = "毛尖茶香漫南湾湖";
                                break;
                            default:
                                posdesc = "可否带我品尝河南烩面啦？";
                                break;
                        }
                        break;
                    case "安徽省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "合肥市":
                                posdesc = "三国故地，包拯故里";
                                break;
                            case "黄山市":
                                posdesc = "五岳归来不看山，黄山归来不看岳";
                                break;
                            default:
                                posdesc = "蚌埠住了，芜湖起飞。";
                                break;
                        }
                        break;
                    case "福建省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "福州市":
                                posdesc = "三山两塔一条江，闽江夜景赛外滩";
                                break;
                            case "厦门市":
                                posdesc = "鼓浪屿的琴声飘过鹭江";
                                break;
                            default:
                                posdesc = "井邑白云间，岩城远带山。";
                                break;
                        }
                        break;
                    case "江西省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "南昌市":
                                posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
                                break;
                            case "景德镇市":
                                posdesc = "千年窑火不熄，青花瓷韵流长";
                                break;
                            default:
                                posdesc = "庐山烟雨浙江潮，未到千般恨不消";
                                break;
                        }
                        break;
                    case "山东省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "济南市":
                                posdesc = "四面荷花三面柳，一城山色半城湖";
                                break;
                            case "青岛市":
                                posdesc = "红瓦绿树，碧海蓝天";
                                break;
                            default:
                                posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
                                break;
                        }
                        break;
                    case "湖北省":
                        const hubeiMessages = [
                            "黄鹤楼头望长江，户部巷里热干香！",
                            "过早了吗？豆皮面窝配蛋酒，武汉伢带你嚯！",
                            "两江交汇三镇立，桥都夜灯照星河✨",
                            "武大樱花落肩头，东湖绿道骑自由🚴",
                            "鸭脖啃起来，宵夜吉庆街——越夜越嗨皮！",
                            "江湖儿女江湖聚，一碗藕汤暖人心♨️",
                            "江汉关钟声百年响，老汉口风情万种藏",
                            "光谷步行街，年轻心跳与科技脉搏同频💡"
                        ];
                        posdesc = hubeiMessages[Math.floor(Math.random() * hubeiMessages.length)];
                        break;
                    case "湖南省":
                        const hunanMessages = [
                            "辣妹子辣，火宫殿里剁椒鱼头香透胃",
                            "张家界峰林插云霄，凤凰古城沱江映虹桥",
                            "子洲头问苍茫，毛家红烧肉慰乡愁！",
                            "岳麓书院传干年，湘江夜风送晚凉",
                            "嗦一碗米粉，闯一回衡山，湖南人霸得蛮"
                        ];
                        posdesc = hunanMessages[Math.floor(Math.random() * hunanMessages.length)];
                        break;
                    case "广东省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "广州市":
                                posdesc = "饮早茶啦，虾饺烧卖叉烧包！";
                                break;
                            case "深圳市":
                                posdesc = "科技园区的代码正在沸腾";
                                break;
                            default:
                                posdesc = "老板来两斤福建人。";
                                break;
                        }
                        break;
                    case "广西壮族自治区":
                        switch (ipLoacation.result.ad_info.city) {
                            case "南宁市":
                                posdesc = "半城绿树半城楼，朱槿花开满城香";
                                break;
                            case "桂林市":
                                posdesc = "桂林山水甲天下";
                                break;
                            default:
                                posdesc = "山歌好比春江水";
                                break;
                        }
                        break;
                    case "海南省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "三亚市":
                                posdesc = "天涯海角见证碧海银沙";
                                break;
                            case "海口市":
                                posdesc = "骑楼老街的南洋风情";
                                break;
                            default:
                                posdesc = "朝观日出逐白浪，夕看云起收霞光。";
                                break;
                        }
                        break;
                    case "四川省":
                        const sichuanMessages = [
                            "府之国迎客来，火锅沸腾麻辣香",
                            "寨沟头看碧水，宽窄巷里摆龙门",
                            "猫崽崽打滚卖萌，川剧变脸惊艳四方～",
                            "眉金顶云海涌，都江堰水润干年",
                            "巴适得板！茶馆听评书，安逸到心坎"
                        ];
                        posdesc = sichuanMessages[Math.floor(Math.random() * sichuanMessages.length)];
                        break;
                    case "贵州省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "贵阳市":
                                posdesc = "黔灵山猴群等你投喂";
                                break;
                            case "遵义市":
                                posdesc = "红色星火从此燎原";
                                break;
                            default:
                                posdesc = "茅台，学生，再塞200";
                                break;
                        }
                        break;
                    case "云南省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "昆明市":
                                posdesc = "四季看花花不老，春城无处不飞花";
                                break;
                            case "丽江市":
                                posdesc = "玉龙雪山下的柔软时光";
                                break;
                            default:
                                posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天";
                                break;
                        }
                        break;
                    case "西藏自治区":
                        switch (ipLoacation.result.ad_info.city) {
                            case "拉萨市":
                                posdesc = "布达拉宫的金顶闪耀日光";
                                break;
                            case "林芝市":
                                posdesc = "三月的桃花沟惊艳雪域";
                                break;
                            default:
                                posdesc = "躺在茫茫草原上，仰望蓝天。";
                                break;
                        }
                        break;
                    case "陕西省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "西安市":
                                posdesc = "城墙根下的秦腔吼破云霄";
                                break;
                            case "咸阳市":
                                posdesc = "地下军团守护千年帝陵";
                                break;
                            default:
                                posdesc = "来份臊子面加馍。";
                                break;
                        }
                        break;
                    case "甘肃省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "兰州市":
                                posdesc = "黄河水奔腾穿过中山桥";
                                break;
                            case "敦煌市":
                                posdesc = "月牙泉边听驼铃悠悠";
                                break;
                            default:
                                posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
                                break;
                        }
                        break;
                    case "青海省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "西宁市":
                                posdesc = "青藏高原的门户已敞开";
                                break;
                            case "海西州":
                                posdesc = "茶卡盐湖倒映天空之镜";
                                break;
                            default:
                                posdesc = "牛肉干和老酸奶都好好吃。";
                                break;
                        }
                        break;
                    case "宁夏回族自治区":
                        switch (ipLoacation.result.ad_info.city) {
                            case "银川市":
                                posdesc = "塞上江南，鱼米之乡";
                                break;
                            case "中卫市":
                                posdesc = "沙坡头的黄河与沙漠共舞";
                                break;
                            default:
                                posdesc = "大漠孤烟直，长河落日圆。";
                                break;
                        }
                        break;
                    case "新疆维吾尔自治区":
                        switch (ipLoacation.result.ad_info.city) {
                            case "乌鲁木齐市":
                                posdesc = "大巴扎的烤包子香飘十里";
                                break;
                            case "喀什市":
                                posdesc = "喀什噶尔的老城迷宫";
                                break;
                            default:
                                posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
                                break;
                        }
                        break;
                    case "台湾省":
                        switch (ipLoacation.result.ad_info.city) {
                            case "台北市":
                                posdesc = "101大楼触摸云端";
                                break;
                            case "高雄市":
                                posdesc = "打狗领事馆遥望西子湾";
                                break;
                            default:
                                posdesc = "我在这头，大陆在那头。";
                                break;
                        }
                        break;
                    case "香港特别行政区":
                        posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
                        break;
                    case "澳门特别行政区":
                        switch (ipLoacation.result.ad_info.city) {
                            case "澳门半岛":
                                posdesc = "大三巴牌坊诉说沧桑";
                                break;
                            case "氹仔岛":
                                posdesc = "威尼斯人的运河永不落幕";
                                break;
                            default:
                                posdesc = "性感荷官，在线发牌。";
                                break;
                        }
                        break;
                    default:
                        posdesc = "带我去你的城市逛逛吧！";
                        break;
                }
                break;
            default:
                posdesc = "带我去你的国家逛逛吧。";
                break;
        }

    //根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
    else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
    else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
    else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
    else timeChange = "夜深了，早点休息，少熬夜。";

    try {
        //自定义文本和需要放的位置
        document.getElementById("welcome-info").innerHTML =
            `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;
            欢迎来自 <span style="color:#0af6ee">${pos}</span> 的小伙伴，
            ${timeChange}您现在距离站长约 <span style="color:#0af6ee">${dist}</span> 公里，
            当前的IP地址为： <span style="color:#0af6ee">${ip}</span>， ${posdesc}</b>`;
    } catch (err) {
        // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
    }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', showWelcome);
