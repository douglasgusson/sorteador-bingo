(function() {
  'use strict';

    var app = {
        container : document.querySelector('.main'),
        carrega : document.querySelector('.carrega'),
        sorteado : null, 
        cont : 0,
        numeros : [],
        tds : document.querySelectorAll('.numero'),
        jogadaAtual : document.querySelector('#jogada-atual'),
        botaoRecomecar : document.querySelector('#recomecar'),
        botaoSortear : document.querySelector('#sortear'),
        playerAudio : document.querySelector('#audio'),
        somMp3 : document.querySelector('#som-mp3'),
        somOgg : document.querySelector('#som-ogg')
    };

    // preenche um array com numeros de 1 a 75
    function preencherArray() {
        for (var i=1; i<=75; i++) {
           app.numeros[i-1] = i;
        }
    }

    app.botaoRecomecar.addEventListener('click', function() {
        recomecar();
    });

    app.botaoSortear.addEventListener('click', function() {
        if (app.cont < 75) {
            app.sorteado = sortear();

            if (app.sorteado <= 15) {
                app.jogadaAtual.setAttribute('value', 'Letra B - Número ' + app.sorteado);
            } else if (app.sorteado <= 30) {
                app.jogadaAtual.setAttribute('value', 'Letra I - Número ' + app.sorteado);
            } else if (app.sorteado <= 45) {
                app.jogadaAtual.setAttribute('value', 'Letra N - Número ' + app.sorteado);
            } else if (app.sorteado <= 60) {
                app.jogadaAtual.setAttribute('value', 'Letra G - Número ' + app.sorteado);
            } else {
                app.jogadaAtual.setAttribute('value', 'Letra O - Número ' + app.sorteado);
            }

            marcarSorteado(app.sorteado);
              
        } else {
            recomecar();
        }
    });


    function sortear() {
        var index = Math.round(Math.random() * (74 - app.cont));
        var x = app.numeros[index];
        app.numeros.splice(index, 1);
        app.cont++;
        if (app.numeros.length == 0) {
            app.jogadaAtual.setAttribute('value', 'Encerrado!');
            app.botaoSortear.className += ' animated bounceIn orange lighten-1';
            app.botaoSortear.textContent = 'RECOMEÇAR';     
        }
        return x;
    }

    function recomecar() {    
        if (app.tds != null) {
            for (var i = 0; i < app.tds.length; i++) {
                    app.tds[i].className = 'numero';
            }
        }    
        app.jogadaAtual.setAttribute('value', '');
        app.botaoSortear.className = 'waves-effect waves-light btn-large btn-sortear';
        app.botaoSortear.textContent = 'SORTEAR';
        app.cont = 0;
        preencherArray();
    }

    function marcarSorteado(sorteado) {
        if (app.tds != null) {
            for (var i = 0; i < app.tds.length; i++) {
                if (parseInt(app.tds[i].textContent) == sorteado) {
                    app.tds[i].className += ' animated bounceIn sorteado';
                    app.playerAudio.load();
                    app.playerAudio.play();
                }
            }
        }
    }


    document.addEventListener("DOMContentLoaded", function(event) {
        app.carrega.setAttribute('hidden', true);
        app.container.removeAttribute('hidden');
    });


    preencherArray();

})();