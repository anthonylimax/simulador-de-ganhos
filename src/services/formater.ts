export function formatadorDeMilharesComRegex(numero : number){
    var texto = numero.toFixed(2).replace(".", ",");
    var stringComPontos = texto.replace(/(\d)(?=(?:[0-9]{3})+\b)/g, "$1.")
    return stringComPontos;
}