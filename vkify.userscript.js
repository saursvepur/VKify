// ==UserScript==
// @name         VKify
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Дополнительные штуки-друюки для VKify
// @author       koke228
// @match        *://ovk.to/*
// @match        *://openvk.xyz/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /* доп. настройка овк (выключение AJAX и бесконечной прокрутки)*/
    if (Number(localStorage.getItem('ux.auto_scroll')) == 1) {
        localStorage.setItem('ux.auto_scroll', 0)
    }
   /*if (Number(localStorage.getItem('ux.disable_ajax_routing')) == 0) {
        localStorage.setItem('ux.disable_ajax_routing', 1);
        location.reload();
    } я надеюсь, что выключать ajax больше не понадобится */
    const enable_setts = localStorage.getItem('enable_vkify_settings');
    const enable_vk2012 = localStorage.getItem('vk2012');
    const vk2012_header_type = localStorage.getItem('vk2012_header_type');
    const realvkify = localStorage.getItem('realvkify');

    if (!(enable_setts)) {
        localStorage.setItem('enable_vkify_settings', 1)
    }
    if (!(enable_vk2012)) {
        localStorage.setItem('vk2012', 1)
    }
    if (!(vk2012_header_type)) {
        localStorage.setItem('vk2012_header_type', 1)
    }
    if (!(realvkify)) {
        localStorage.setItem('realvkify', 0)
    }

    if (enable_setts == 'true') {
        var vkifysett = '<a href="/settings?vkify" target="_blank" class="link">настройки VKify</a>';
    } else {
       var vkifysett = '';
    }
    var popupimg = "data:image/png;base64,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"
    const vk2012header2 = document.createElement('style');
    vk2012header2.type = 'text/css';
    vk2012header2.innerHTML = `
    .page_header {
     background: url(/themepack/vk2012/0.0.1.0/resource/1.png) !important;
    }`
    const vk2012header1 = document.createElement('style');
    vk2012header1.type = 'text/css';
    vk2012header1.innerHTML = `
    .page_header {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxcAAAAtCAYAAADcKZZqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAlESURBVHhe7d15kBTlGcfxZ7p7LnZZdoE1eEVWRUiZoMY7RqOAVwKJEbQqlIVFMIpJSCyv8ojmQMWooYpoJNGYCEmhEpUIVYaqwIbExEK8FStGxduAcsjuzjI7M90zeZ+3exd3dwjO7uKgfj/rw8y8/Xa3f/avnn67YydNv67Ukc0KAAAAAPRVKp0WGy4CP4iGAAAAAKByrueG4UJiXjQEAAAAAH1Q8sNwEYunohEAAAAAqFyp0BGGCyeejoYAAAAAoHLFQjYKF4lB0RAAAAAAVK6Y32bCxbevL7l0LgAAAAD0Q6Cdi3EaLuhcAAAAAOiHQDsXNlwkCRcAAAAA+i7IReHCS9ZEQ7tAqST2z3yaj/AzEovZfyXmmDJ/0QAAAACAjxk/127CxYwbSvEKw0UYFMLAUDYsmC9aqlgqSjEIbJWKpuz0aB8zx3EccVzPlCtOzNkeMLodXz/DYdXtPGZ/AAAAANVV0HAx/rw5Ja+SNRfmKr9Y1MDgh6HBfO8KC+aC34YFLwwL2o0omkBx7NgmmXjCITJy70ZpqKuRuOfa2dmOvLy5fpP8Ydmjsnrt6+Ka/WIaMPQcnaHEN+fpdg61/TxePBGNAQAAAKgWX9dcaLiopHOhnYTAXPDPnHK8TD75yGh0u4IfyMU3LZIX33jPBADXhov5V58jI4YPkdpB5V/WpwFj+jV3maCQtKGkZIKFnmPMfnvI3Mun2jCi5+3shqh33t0iy//1vNzf/Fw0AgAAAKBaujoXiVRtNLRzneHihMP2l6vP/3o02t2a59bJVbc+0NVVqBsUly+N3V8umna6/d2ThoZxM26UeDLVFUj8fE5umDVZjhp7QDSrt8XLH5MFDz8R/QIAAABQLfmOjOgiB/O1stIwsOrxF+XdTS02bPQsDQSj9m2UYlA00x3Z2paTfz71stk3DCc9KygWzadutFPsfrq/HqfcfK3WTFbuXb7GzC7//0hRFEVRFEVR1EdbdjW03m30YctxzE66nsLUwqWPmDEz2INe/M848ytSLPrmFCUz35Etbe3R1t4cc4zO45fseo6C3V+PU46ec/69KyTTke/aj6IoiqIoiqKo6pW9Tp9w3s9LyUEf/rYopRf9dkG3X5AF158njQ2Doy3baQC49OZFsva19+x3vc3pr3deXjYw6PaTv3OTxBNJKZrtn2/aQ265bOoO5655fp386LYlZn7KLgIHAAAAUF25bZkwXKRqeoeDndEnOGlgmHDUQXLxuaf3CgIaAv67catcOHuh5H1doF2w4SJ88lN3+uQnDReuF5eE58j8a6bJXo31ZcNFZltOLvjZ3dKa9bc/XQoAAABAVXW0t0nMXNSXkn0IF13di6Agv732XPs0qJ40YCxZ8YTcvvhvdpF2811X7jBcjJsxxy7m/u7ZJ8k3JxxRNljovKvmLZanX1ovXiJh5wMAAACovlxnuEjV1kVDldGgEBTyctiovWT2rDPLBgd15bz75bFn/iOrFlyzw3Bx4rmz5ehDR8ucH06JRrvToHLPX1bLHx9eY4JF0gYLHQMAAABQfR2ZVhMuzr+plK7t3XX4MMLuRSCFXIf8ZOYkOeLgkWVvj/KDorzy5gYZ07RX2Y6Ezln31rv2JXuuCRrljvHia+vl0rmLTbDQdRZxggUAAACwG8lmWsKnRfWVXuDrk6DceFzm/2mVBMXej4zVToVjcsBB+42w33tu75zTZIKFxoVyc9R9yx8zJ3TMObUIFgAAAMDuJnbK+TeX0oP71rnoZLsX+ZycNf5QOWfisRKY3wNJb5v6c/NTctdDj0oiGT4hioXcAAAAwO4j29YShotBdfXRUN/Y7kPgi1/IyfXfO0PGjPxM2bUVfaWdCtd1ZYEJF0v+/qx9ZK3jasCggwEAAADsDra1bpXYqRfc0u9wofTld75fkIaauMy95GxJJ72KAkZnUOi8Daon3e55nty99FFZ+o+1JmAkCBgAAADAbqIrXNQMaYiG+kdvj/ILeWnas16u+/4ZEiuF6yd2Rm97as/m5aU3NsgRBzeZkOKX3U+DRDwel9vvWyXNT74sXjzJS/QAAACA3UB7y/smXMz8Ral2gMKFBgLtYBQKORl7wAi5Yvpp5new0w6GBobZdyyTp/79lhx/2Ci56JwJZp9ghwHD8+Iyb1GzrH7hTUmk0tEWAAAAANWS6QoX9UOjof7TQKDBwM/nZfQ+DXLJtFOlNh3fYTdCpVIpmXLZb8TxEnoA+fIhTfKDb50kuVyu7D7a6dBboi6e+4Bs7dh5ZwQAAADArpXZuiUMF4MHMFyozg6GrsFIuiJnTfiijDtqtCQ8x3YxPvi4We1E1NTUyOTL7pR4MmkfR1swweRrx31Opk08xgaMcp0P7Xa8vqFFZv9+ZTQCAAAAoFraNFycduHcAQ8XKgwPJkgEgQS+L6l4TI475EAZ9dlG2W/PoaaGmWARdiEebH5WFq98RjwTGPQRs+GTp/Jy+Jh9ZOrpR8vejXX2eB/U2p6TtevWyx1LH49GAAAAAFRLV7ioaxgWDQ28zi6G3iplOxZdnYuwG+GYMOF4nl2Y7Tiu7WToPna+CSX6zgz9bgbtfMvM0VDiup7Ek6loEAAAAEC1tL6/OQoXQ4dHQ7uO7Txo0NAyf/qfFQsXafd883a3+fq9a4eI3UdDhhsNAAAAAKiW1i2bwnAxZNiuDxcAAAAAPrlaNptwMWnWLwfsPRcAAAAAPn30zqR8pk1i06/9Xandd8Vxub0IAAAAQOV0nXRDOiax2xatLDU//aok07yMDgAAAEDlctmsnHLkQRJ79e2NpVk3LpIhH8GibgAAAACfPC1bNsmtV0yVWMn41T3NsuLJdTKotjbaDAAAAAA7ty2TkdOOHi0XnHVCGC70Hqmf/vohef61zZJKp8Vl/QUAAACA/0MzREc2K19oGiY/nvkNmyFsuIi2y4Mrn5SFy1aLm0xLIpGQ+vrwKVLJeNJ+AgAAAPj0yRVy9rMt0yaB70s+n5cgl5Vpk46RM8cfbrepbuFCvbVhszz8yAvy3CvvyOtvb4xGAQAAAEBk5D6NMvbAveWrxx8s+44YFo2GeoULoBIb38+YapPh9TXRCAAAAD6ONm1tl8aGwab6vg7biT4BAAAAoF8IF+iXdFzEc2PRLwAAAHxc6TWdXtv1B+ECAAAAwAAQ+R9UlyIJX5dgDwAAAABJRU5ErkJggg==") !important;
    }`
    const vk2012style = document.createElement('style');
    vk2012style.type = 'text/css';
    vk2012style.innerHTML = `
.header_navigation .link {
  background: none !important;
}


input[class="button"] {
  padding-top: 5px;
  padding-bottom: 4px;
  text-shadow: 0 1px 0 #45688e;
}

input[class="button"] {
  padding: 5px 7px 4px;
  padding-top: 7px;
  padding-bottom: 7px;
border-top: 1px solid #517295;
  border-bottom: 1px solid #4e6f93;
  border-left: 1px solid #4e6f93;
  border-right: 1px solid #4e6f93;
}


.button {
  border-top: 1px solid #517295;
  border-bottom: 1px solid #4e6f93;
  border-left: 1px solid #4e6f93;
  border-right: 1px solid #4e6f93;
  background: url(/themepack/vk2012/0.0.1.0/resource/11.png) repeat-x !important;
  border-radius: 2px;
}

.button {
  border-radius: 2px;
 border-top: 1px solid #517295;
  border-bottom: 1px solid #4e6f93;
  border-left: 1px solid #4e6f93;
  border-right: 1px solid #4e6f93;;
  font-size: 11px;
  outline: none;
  white-space: nowrap;
  background: #597da3;
  background-position: 0px -16px;
  color: #fff;
  padding: 4px 8px 4px;
  text-shadow: 0 1px 0 #597da3;
  cursor: pointer;
  text-decoration: none;
}

.navigation .link {
  display: block;
  padding: 3px 3px 4px 6px;
  text-decoration: none;
  border-top: none;
  color: #285473;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  font-size: 11px;
  text-align: left;
  cursor: pointer;
  background: none;
  margin-bottom: 1px;
  border-radius: 2px;
}

.navigation .link {
    display: block;
    padding: 3px 3px 4px 6px;
    text-decoration: none;
    border-top: none;
    color: #285473;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    font-size: 11px;
    text-align: left;
    cursor: pointer;
    background: none;
    margin-bottom: 1px;
    border-radius: 2px;
}

.navigation .link:hover {
    background-color: #e2e8ee;
    border-top: 1px solid #fff !important;
}


.navigation_footer .link {
    padding: 3px 3px 3px 6px;
    text-decoration: none;
    border-top: 1px solid #fff;
    color: #000;
}

.navigation_footer .link:hover {
    background-color: #E4E4E4;
    border-top: 1px solid #CCCCCC;
}

.page_yellowheader {
  padding: 6px 10px 8px !important;
  font-weight: bold !important;
  background: url(/themepack/vk2012/0.0.1.0/resource/18.png) repeat-x !important;
    background-color: rgba(0, 0, 0, 0) !important;
  background-color: #e9edf1 !important;
  border-right: solid 1px #e9edf1 !important;
  border-left: solid 1px #e9edf1 !important;
  border-bottom: solid 1px #e9edf1 !important;
  color: #2b587a !important;
  overflow: hidden !important;
}
.page_yellowheader span {
  color: #AAB7C5 !important;
}
.completeness-gauge-gold {
  background-color: #F7F7F7 !important;
}
.completeness-gauge-gold {
  border-top: 1px solid #C6CBD1 !important;
}
.completeness-gauge.completeness-gauge-gold span {
  color: #8F9BA9 !important;
}
.completeness-gauge-gold>div {
  background-color: #C6CBD1 !important;
}
input[type="text"], input[type="password"], input[type~="text"], input[type~="password"], input[type="email"], input[type="phone"], input[type~="email"], input[type~="phone"], input[type="search"], select {
    border: 1px solid #C3CBD4;
    padding: 3px;
    font-size: 11px;
    font-family: tahoma, verdana, arial, sans-serif;
    height: 26px;
}
input[type~="search"] {
    border: 1px solid #4e729a !important;
    padding: 3px !important;
    font-size: 11px !important;
    font-family: tahoma, verdana, arial, sans-serif !important;
    border-radius: 3px !important;
    background: url(/themepack/vk2012/0.0.1.0/resource/4.gif) no-repeat 3px 4px !important;
    background-color: #fff !important;
    padding-left: 23px !important;
    background-position-y: 5px !important;
    background-position-x: 5px !important;
}
input[type~="search"][name~="query"] {
    width: 169px /* qualified */ !important;
    background: url(/themepack/vk2012/0.0.1.0/resource/4.gif) no-repeat 3px 4px /* qualified */ !important;
    background-color: #fff /* qualified */ !important;
    padding-left: 22px /* qualified */ !important;
    background-position-y: 5px /* qualified */ !important;
    background-position-x: 6px /* qualified */ !important;
    padding-bottom: 5px /* qualified */ !important;
}
.header_navigation #search_box select[name="section"], .header_navigation #search_box .search_box_button {
  border: 1px solid #4e729a !important;
  border-left: 0px !important;
}
`;
    var copydate = '2006-2007';
    if (enable_vk2012 == 'true') {
    document.head.appendChild(vk2012style);
    var copydate = '2006-2012';
        if (Number(vk2012_header_type) == 1) {
            document.head.appendChild(vk2012header1);
        }
        if (Number(vk2012_header_type) == 2) {
            document.head.appendChild(vk2012header2);
        }
    }
    window.addEventListener('DOMContentLoaded', () => {
    const ovkuserid = window.openvk.current_id;
    const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('value');
    async function parseGifts() {
        try {
            const response = await fetch(`/gifts${ovkuserid}`);
            if (!response.ok) {
                throw new Error('подарочки не грузяца: ' + response.status);
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const lastGift = doc.querySelector('.scroll_node.content');
            if (lastGift) {
                const senderName = lastGift.querySelector('a[href^="/id"]').textContent.trim();
                const giftPic = lastGift.querySelector('img').src;
                const newsDiv = document.querySelector('#_groupListPinnedGroups #news');
                const senderLink = lastGift.querySelector('a[href^="/id"]')?.getAttribute('href');
                window.lastgift = `<div id="news">
                                <b>Подарок</b>
                                <hr size="1">
                                <img src="${giftPic}" style="width: 100%;">
                                <text>Отправитель: <a href="${senderLink}">${senderName}</a></text>
                                <br>
                            </div>`
                if (newsDiv) {
                    newsDiv.insertAdjacentHTML('afterend', window.lastgift);
                    }
            } else {
                console.log('подарочков нема');
                return null;
            }
        } catch (error) {
            console.error('подарочки не грузяца:', error);
            return null;
        }
    }
        parseGifts()
        const page_header = document.querySelector('.page_header');
        if (page_header) {
            const headerData = `<div class="page_header">                <a href="/" class="home_button" title="ВКонтакте"></a>
                <div class="header_navigation">
<div class="link header_divider_stick" id="search_box">
                                <div id="search_box_fr">
                                    <form id="search_form" action="/search" method="get">
                                        <div id="search_and_one_more_wrapper">
                                            <input autocomplete="off" type="search" maxlength="79" name="q" placeholder="Поиск" title="Поиск [Alt+Shift+F]" accesskey="f">
                                            <select name="section">
                                                <option value="users">по пользователям</option>
                                                <option value="groups">по группам</option>
                                                <option value="posts">по записям</option>
                                                <option value="videos">по видео</option>
                                                <option value="apps">по приложениям</option>
                                                <option value="audios">по аудиозаписям</option>
                                                <option value="audios_playlists">по плейлистам</option>
                                            </select>
                                        </div>
                                        <button class="search_box_button">
                                            <span>Поиск</span>
                                        </button>
                                    </form>
                                </div>
                                <div id="searchBoxFastTips"></div>
                            </div>
                            <div class="link">
                                <a href="/search?q=&section=users">люди</a>
                            </div><div class="link">
                                <a href="/search?section=groups">сообщества</a>
                            </div>
                            <div class="link">
                                <a href="/apps?act=list">игры </a>
                            </div>
        <div class="link" id="headerMusicLinkDiv" style="margin-right: 28px;">
        <div class="headerMusicBtn paused" id="headerMusicBtn"></div><a id="headerMusicLink" href="/audios${ovkuserid}" style="color: #FFFFFF;" aria-expanded="false">музыка</a></div>
                            <div class="link">
                                <a href="/support">помощь </a>
                            </div>
                            <div class="link">
                                <a href="/logout?hash=${encodeURIComponent(csrfToken)}">выйти</a>
                            </div>
                </div></div>`;
        page_header.innerHTML = headerData;
            /* я украл эту хрень из исходников, хз как оно работает лол */
            u(`#search_box form input[type="search"]`).on('focus', (e) => {
                u('.page_header').addClass('search_expanded')
            })

            u(`#search_box form input[type="search"]` || `#search_and_one_more_wrapper select`).on('blur', (e) => { {
                setTimeout(() => {
                    const focusedElement = document.activeElement;

                    // Если новый элемент с фокусом не является select или input[type="search"]
                    if (!u(focusedElement).is('#search_box form input[type="search"], #search_and_one_more_wrapper select')) {
                        u('.page_header').removeClass('search_expanded');
                    }
    }, 0);
                } /* ладно я понял как оно работает и поэтому я в целом убрал время ОЖИДания */
            })
        };
    /* опенвк не существует, очень сырая функция, не советую */
    if (realvkify == 'true') {
    function replovk(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue.replace(/OpenVK/gi, 'ВКонтакте');
            node.nodeValue = node.nodeValue.replace(/опенвк/gi, 'ВКонтакте');
            node.nodeValue = node.nodeValue.replace(/опен вк/gi, 'ВКонтакте');
            node.nodeValue = node.nodeValue.replace(/open vk/gi, 'ВКонтакте');
        } else {
            node.childNodes.forEach(replovk);
        }
    }
            replovk(document.body);
    } /* работает только без AJAX вроде наверное, лучше её выпилить и никогда не вспоминать */
  //* замена футера *//
    const vkfooter = `
            <div class="navigation_footer">
                <a href="/about" class="link">о сайте</a>
                <a href="/support?act=new" class="link">техподдержка</a>
                <a href="/blog" class="link">блог</a>
                <a href="/terms" target="_blank" class="link">правила</a>
                `+vkifysett+`
            </div>
            <p>
                    <a href="/" class="vkify-footer-lang">ВКонтакте</a> © `+copydate+`
                    <a href="/language?lg=ru&hash=${encodeURIComponent(csrfToken)}&jReturnTo=${encodeURI(window.location.pathname)}" rel="nofollow" title="Русский" class="vkify-footer-lang">
                        Русский
                    </a>
                    <a href="/language?lg=en&hash=${encodeURIComponent(csrfToken)}&jReturnTo=${encodeURI(window.location.pathname)}" rel="nofollow" title="English" class="vkify-footer-lang">
						English
                    </a>
                    <a href="/language?lg=uk&hash=${encodeURIComponent(csrfToken)}&jReturnTo=${encodeURI(window.location.pathname)}" rel="nofollow" title="Українcька" class="vkify-footer-lang">
                        Українcька
                    </a>
                    <a href="/language" class="vkify-footer-lang">all languages »</a>
            </p>
            <br>`;
            const footer = document.querySelectorAll('.page_footer');
            footer[0].innerHTML = vkfooter;

        let mo = new MutationObserver(function(mutations) {
        const footer = document.querySelectorAll('.page_footer');
            if (footer[0].textContent.includes('OpenVK Altair Preview')) {
                    footer[0].innerHTML = vkfooter;
                    document.querySelector('#_groupListPinnedGroups #news').insertAdjacentHTML('afterend', window.lastgift);
            }
        });

        if (footer) {
            mo.observe(footer[0], {
                childList: true,
                attributes: true,
                characterData: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            });
        }
        function toggleMusic() {
            const headerMusicBtn = document.querySelector('.headerMusicBtn');

            if (headerMusicBtn) {
                headerMusicBtn.addEventListener('click', function() {
                    if (headerMusicBtn.classList.contains('paused')) {
                        window.player.play();
                        headerMusicBtn.classList.remove('paused');
                    } else {
                        window.player.pause();
                        headerMusicBtn.classList.add('paused');
                    }
                });
            }
        }

            if (window.player && window.player.audioPlayer) {
                const headerMusicBtn = document.querySelector('.headerMusicBtn');
                setInterval(() => {
                    if (window.player.is_closed == true) {
                        headerMusicBtn.classList.add('closed');
                    }
                    if (window.player.audioPlayer.paused == true) {
                        headerMusicBtn.classList.add('paused');
                    }
                    else {
                        headerMusicBtn.classList.remove('paused');
                    }
                }, 50);
            }
        toggleMusic();
    if (window.location.pathname.endsWith('/settings') && window.location.search === '?vkify') {
        const vkify_settings = `
            <div id="wrapH">
                <div id="wrapHI">
                    <div class="page_yellowheader">Настройки VKify</div>
                </div>
            </div>
            <div class="wrap2">
                <div class="wrap1">
                    <div id="auth" class="page-wrap">
                        <div class="page_content">
                            <div class="page_content">
						  <input type="checkbox" id="vkify_settings" checked="">
						  <label class="nobold" for="vkify_settings">Кнопка VKify в футере</label>
						  <span> - вы сможете всегда открыть эту страницу через <a href="/settings?vkify">эту ссылку</a></span>
						<br><br>
						  <input type="checkbox" checked="" id="realvkify">
						  <label class="nobold" for="realvkify">Абсолютная ВКфикация</label>
						  <span> - пытаемся заменить абсолютно все упоминания OpenVK со страницы на "ВКонтакте" (<b style="color: red;">ОСТОРОЖНО! Может заменить то, чего не стоило бы</b>, однако, выглядит прикольно)</span>
						<br><br>
						  <input type="checkbox" checked="" id="vk2012">
						  <label for="vk2012" class="nobold">Имитация ВК 2012 вместо 2007</label>
						<br>
						  <input name="vk2012head" type="radio" checked="" style="margin-left: 25px;" id="vk2012head2" value="1">
						  <span class="nobold">Использовать header #1</span>
						  <input name="vk2012head" type="radio" id="vk2012head2" value="2">
						  <span class="nobold">Использовать header #2</span>
						<br>
						<br>
						<input value="Сохранить" class="button" type="submit" id="save">
						</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const pgbody = document.querySelector('div.page_body');
        if (pgbody) {
            pgbody.innerHTML = vkify_settings;
        }
    function saveSettings() {
        localStorage.setItem('enable_vkify_settings', document.getElementById('vkify_settings').checked);
        localStorage.setItem('vk2012', document.getElementById('vk2012').checked);
        localStorage.setItem('realvkify', document.getElementById('realvkify').checked);
        const selectedHeader = document.querySelector('input[name="vk2012head"]:checked').id;
        localStorage.setItem('vk2012_header_type', document.querySelector('input[name="vk2012head"]:checked').value);
        NewNotification('VKify', 'Настройки сохранены!', popupimg, () => {}, 5000, false);
        location.reload();
    }
        document.getElementById('save').addEventListener('click', saveSettings);
        document.getElementById('vkify_settings').checked = (/true/).test(localStorage.getItem('enable_vkify_settings'));
        document.getElementById('vk2012').checked = (/true/).test(localStorage.getItem('vk2012'));
        document.getElementById('realvkify').checked = (/true/).test(localStorage.getItem('realvkify'));
    }
    });
})();
