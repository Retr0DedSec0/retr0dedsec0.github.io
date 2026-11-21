(function () {
    var cards = document.querySelectorAll('[data-version]');
    function save(version) { try { localStorage.setItem('selectedGoldHENVersion', version); } catch (error) {} }
    for (var i = 0; i < cards.length; i++) {
        (function (card) { card.addEventListener('click', function () { save(card.getAttribute('data-version')); }, false); }(cards[i]));
    }
}());
