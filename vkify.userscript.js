// ==UserScript==
// @name         VKify add-on
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Дополнительные штуки-друюки для VKify
// @author       koke228
// @match        *://ovk.to/*
// @match        *://openvk.xyz/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /* замена футера */

        const links = document.querySelectorAll('a.link');
        let linkRU, linkEN, linkUA;

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            if (href.includes('lg=ru')) {
                linkRU = href;
            } else if (href.includes('lg=en')) {
                linkEN = href;
            } else if (href.includes('lg=uk')) {
                linkUA = href;
            }
        });

    const vkfooter = `
            <div class="navigation_footer">
                <a href="/about" class="link">о сайте</a>
                <a href="/support?act=new" class="link">техподдержка</a>
                <a href="/blog" class="link">блог</a>
                <a href="/terms" target="_blank" class="link">правила</a>
            </div>
            <p>
                    <a href="https://ovk.to" class="vkify-footer-lang">ВКонтакте</a> © 2006-2012
                    <a href="`+linkRU+`" rel="nofollow" title="Русский" class="vkify-footer-lang">
                        Русский
                    </a>
                    <a href="`+linkEN+`" rel="nofollow" title="English" class="vkify-footer-lang">
						English
                    </a>
                    <a href="`+linkUA+`" rel="nofollow" title="Українcька" class="vkify-footer-lang">
                        Українcька
                    </a>
                <a href="/language" class="vkify-footer-lang">all languages »</a>
            </p>
            <br>`;
    const footer = document.querySelectorAll('.page_footer');
    footer.forEach(foot => {
        foot.innerHTML = vkfooter
    });

    /* доп. настройка овк (выключение AJAX и бесконечной прокрутки)*/
    if (Number(localStorage.getItem('ux.auto_scroll')) == 1) {
        localStorage.setItem('ux.auto_scroll', 0)
    }
    if (Number(localStorage.getItem('ux.disable_ajax_routing')) == 0) {
        localStorage.setItem('ux.disable_ajax_routing', 1);
        window.refresh();
    }

})();
