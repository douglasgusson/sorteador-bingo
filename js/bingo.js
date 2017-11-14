var sorteado, cont = 0, numeros = [];

var $tds = document.querySelectorAll('.numero');
var $jogadaAtual = document.querySelector('#jogada-atual');
var $botaoSortear = document.querySelector('#sortear');
var $playerAudio = document.querySelector('#audio');
var $somMp3 = document.querySelector('#som-mp3');
var $somOgg = document.querySelector('#som-ogg');

// preenche um array com numeros de 1 a 75
function preencherArray() {
    for (var i=1; i<=75; i++) {
       numeros[i-1] = i;
    }
}

$botaoSortear.addEventListener('click', function() {
    if (cont < 75) {
        sorteado = sortear();

        if (sorteado <= 15) {
            $jogadaAtual.setAttribute('value', 'Letra B - Número ' + sorteado);
        } else if (sorteado <= 30) {
            $jogadaAtual.setAttribute('value', 'Letra I - Número ' + sorteado);
        } else if (sorteado <= 45) {
            $jogadaAtual.setAttribute('value', 'Letra N - Número ' + sorteado);
        } else if (sorteado <= 60) {
            $jogadaAtual.setAttribute('value', 'Letra G - Número ' + sorteado);
        } else {
            $jogadaAtual.setAttribute('value', 'Letra O - Número ' + sorteado);
        }

        marcarSorteado(sorteado);
    } else if (cont == 75) {
        $jogadaAtual.setAttribute('value', 'Encerrado!');
        $botaoSortear.className += ' animated bounceIn botao-recomecar';
        $botaoSortear.textContent = 'RECOMEÇAR';
        cont++;            
    } else {
        recomecar();
    }
});


function sortear() {
    var index = Math.round(Math.random() * (74 - cont));
    var x = numeros[index];
    numeros.splice(index, 1);
    cont++;
    return x;
}

function recomecar() {    
    if ($tds != null) {
        for (var i = 0; i < $tds.length; i++) {
                $tds[i].className = 'numero';
        }
    }    
    $jogadaAtual.setAttribute('value', '');
    $botaoSortear.className = 'botao botao-sortear';
    $botaoSortear.textContent = 'SORTEAR';
    cont = 0;
    preencherArray();
}

function marcarSorteado(sorteado) {
    if ($tds != null) {
        for (var i = 0; i < $tds.length; i++) {
            if (parseInt($tds[i].textContent) == sorteado) {
                $tds[i].className += ' animated bounceIn sorteado';
                $playerAudio.load();
                $playerAudio.play();
            }
        }
    }
}

preencherArray();
