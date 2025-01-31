# VKify
VKify — аддон для VepurOVK, который старается приблизить дизайн данного сервиса к ВКонтакте 2010-х, однако, получается солянка из разных эпох данного сайта. <sup><b>100% Без ГМО!</b></sup>
#### 

## Функционал
<sup><b>* - включено по умолчанию</b></sup>
- Замена стандартных смайликов twemoji на смайлики из ВКонтакте*
  <br>Смайлики загружаются с серверов ВКонтакте. Если по какой-то причине вас не устраивает прямой доступ, вы можете использовать проксирование для них через https://koke228.ru*
- Имитация ВКонтакте ~2012 года с возможностью смены шапки (подборка из официальных, а также возможность загрузки внешней)*
- Замена аватарки [Администрации](https://vepurovk.xyz/id20)*
- Замена favicon (подборка официальных иконок за разные года, 2007~2015)*
- И многое другое!
  #### У вас есть интересное предложение? Мы рады увидеть его в [issues](https://github.com/saursvepur/VKify/issues)!
## Скриншоты
<p align="center">
  <img width="49%" alt="Скриншот настроек скрипта" src="https://github.com/user-attachments/assets/50aea5f4-7c3e-4391-8fee-444ae8e1235a">
  <img width="49%" alt="Примерный вид страниц, новый AJAX плеер и прочее" src="https://github.com/user-attachments/assets/7c140910-58ea-48b6-8afc-4007ad2cbc33">
</p>
<p align="center">
  <img alt="Частично доработанные диалоги" src="https://github.com/user-attachments/assets/69a19e05-b1c9-4da7-9336-3ceabfa82f15">
</p>


## Установка
### Если вы ставите аддон не в первый раз, то удалите все связанные с VKify скрипты и стили, а затем поставьте начисто. Это из-за того, что я дебил и не додумался сразу сделать нормальные манифесты.

1. Для начала необходимо установить данные расширения для браузера:
- [Tampermonkey](https://www.tampermonkey.net/?locale=ru) 
- [Stylus](https://add0n.com/stylus.html)
  <br> Учтите: если ваш браузер Chromium-based, важно [сделать это](https://www.tampermonkey.net/faq.php#Q209), иначе я дам вам по шапке. Не пишите мне ни о каких проблемах, возникающих на подобных браузерах. Установите [величайший браузер всех времён](https://www.mozilla.org/firefox), или же [его более крутую версию](https://www.waterfox.net/)
2. Выберите тему "ВКонтакте 2007" в [настройках интерфейса OpenVK](https://vepurovk.xyz/settings?act=interface), в настройках VKify вы сможете включить дизайн ВКонтакте 2012
3. Потыкайте следующие ссылки:
  <br>[Скрипт](https://raw.githubusercontent.com/saursvepur/VKify/refs/heads/main/vkify.user.js)
  <br>[Стиль](https://raw.githubusercontent.com/saursvepur/VKify/refs/heads/main/vkify.user.css)
#### Готово!
После установки, настройки скрипта будут доступны [тут](https://vepurovk.xyz/settings?vkify)

## Локализация
Если вас как-либо не устраивает стандартная локализация VKify, вы можете использовать готовую из корня репозитория, или же создать свою на их основе. Достаточно вставить содержимое файла локализации (к примеру, [Английский (США)](https://raw.githubusercontent.com/saursvepur/VKify/refs/heads/main/en-US.json)) в специальное поле:
<p align="center">
  <img alt="Волшебное поле локализации" src="https://github.com/user-attachments/assets/0b6a88f9-7e79-4556-9495-1f378ab46c9d">
</p>
<p align="center">
  ...и все элементы VKify примут эту локализацию:
  <img alt="Локализованная страничка VKify" src="https://github.com/user-attachments/assets/eb80cc97-3b22-4c03-9bfa-590dd3aac8e0">
</p>

