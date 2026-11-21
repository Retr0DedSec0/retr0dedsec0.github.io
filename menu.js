(function () {
    var api = window.Retr0Firmware;
    var detected = api.detect(navigator.userAgent);
    var label = document.getElementById('firmware-value');
    var picker = document.getElementById('firmware-picker');
    var notice = document.getElementById('notice');
    var routes = document.querySelectorAll('[data-route]');
    var title = document.getElementById('selection-title');
    var primary = document.getElementById('primary-link');
    var base = primary.getAttribute('href');
    var recommended = document.getElementById('recommended');
    var i;
    for (i = 0; i < api.versions.length; i++) {
        var option = document.createElement('option');
        option.value = api.versions[i]; option.textContent = api.versions[i]; picker.appendChild(option);
    }
    function select(fw, manual) {
        var target = api.route(fw);
        label.textContent = fw ? 'PS4 · ' + fw + (manual ? ' · seleção manual' : ' · detectado') : 'PS4 não identificado';
        label.className = 'status-value' + (fw && !manual ? ' detected' : '');
        notice.textContent = fw && !target ? 'Firmware ' + fw + ' sem destino compatível neste host.' : '';
        title.textContent = target === base ? 'Seu firmware, seu host' : 'Em destaque';
        recommended.hidden = !target;
        if (target) { recommended.href = target; recommended.textContent = 'Abrir PS4 ' + fw + ' ↗'; }
        for (var j = 0; j < routes.length; j++) {
            var active = target === routes[j].getAttribute('data-route');
            routes[j].className = routes[j].className.replace(/ selected/g, '') + (active ? ' selected' : '');
            if (active) routes[j].setAttribute('aria-current', 'true'); else routes[j].removeAttribute('aria-current');
        }
        // Never start a host just by opening the menu. The user always confirms.
        primary.href = base;
        if (target) {
            for (var k = 0; k < routes.length; k++) {
                if (routes[k].getAttribute('data-route') === target) {
                    var focus = routes[k].tagName === 'A' ? routes[k] : primary;
                    if (!manual) { focus.focus(); window.scrollTo(0, 0); } break;
                }
            }
        }
    }
    picker.addEventListener('change', function () { select(this.value || detected, !!this.value); });
    select(detected, false);
    window.addEventListener('pageshow', function () { if (!picker.value) select(api.detect(navigator.userAgent), false); });
    var cacheLabel = document.getElementById('cache-status');
    var ac = window.applicationCache;
    if (!ac) { cacheLabel.textContent = 'Cache offline: indisponível neste navegador'; return; }
    function cached() { cacheLabel.textContent = 'Menu disponível offline · cada host tem seu próprio cache'; }
    ac.addEventListener('cached', cached, false); ac.addEventListener('noupdate', cached, false);
    ac.addEventListener('downloading', function () { cacheLabel.textContent = 'Salvando menu offline…'; }, false);
    ac.addEventListener('error', function () { cacheLabel.textContent = ac.status === ac.IDLE ? 'Menu salvo · atualização não verificada' : 'Não foi possível salvar o menu offline'; }, false);
    ac.addEventListener('updateready', function () { try { ac.swapCache(); } catch (e) {} cacheLabel.textContent = 'Menu atualizado · reabra a página'; }, false);
    if (ac.status === ac.IDLE) cached();
}());