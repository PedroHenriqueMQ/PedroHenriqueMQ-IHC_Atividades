const botaoConfirma = document.getElementById("calcular");
const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const resultado = document.getElementById("resultado");
const operacoesSelect = document.getElementById("operacoes");

resultado.textContent = "Resultado: ";

function calcular() {
    if (numero1.value.trim() === "" || numero2.value.trim() === "") return;

    const operacoes = operacoesSelect.value;
    let resultadoCalculo;

    switch (operacoes) {
        case "+":
        resultadoCalculo = numero1.valueAsNumber + numero2.valueAsNumber;
        break;
        case "-":
        resultadoCalculo = numero1.valueAsNumber - numero2.valueAsNumber;
        break;
        case "*":
        resultadoCalculo = numero1.valueAsNumber * numero2.valueAsNumber;
        break;
        case "/":
        resultadoCalculo = numero1.valueAsNumber / numero2.valueAsNumber;
        break;
        default:
        resultadoCalculo = "Operação inválida";
    }

    resultado.textContent = `Resultado: ${resultadoCalculo}`;
}

botaoConfirma.addEventListener("click", calcular);