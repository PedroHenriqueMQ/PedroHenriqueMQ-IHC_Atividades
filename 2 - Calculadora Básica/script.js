function adicao(a, b) {
    return a+ b;
}

function subtracao(a, b) {
    return a - b;
}

function multiplicacao(a, b) {
    return a * b;
}

function divisao(a, b) {
    if (b != 0) return a / b;
    else return "Erro: Divisão por zero!";
}

function numeroPar(a) {
    if (a % 2 == 0) return "É par";
    return "Não é par";
}

function somaIntervalo(a, b) {
    let soma = 0;

    for(let i = a; i <= b; i++) {
        soma += i;
    }

    return soma;
}

function fatorial(a) {
    for(let i  = a-1; i > 0; i--) {
        a *= i;
    }

    return a;
}

function contarVogais(a) {
    let contagem = 0;
    const vogais = ['a', 'e', 'i', 'o', 'u'];

    for(let i = 0; i < a.length; i++) {
        if(vogais.includes(a[i].toLowerCase())) contagem++;
    }

    return contagem;
}

console.log(adicao(5, 3));
console.log(subtracao(10, 7));
console.log(multiplicacao(4, 6));
console.log(divisao(15, 3));
console.log(divisao(10, 0));
console.log(numeroPar(1));
console.log(somaIntervalo(1, 5));
console.log(fatorial(5));
console.log(contarVogais('javascript'));