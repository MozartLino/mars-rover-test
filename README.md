# mars-rover-test

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

## Installation

```
npm install
```

## To run

```
npm run init
```

Você pode atualizar o .env file para rodar o projeto com o nome dos arquivos que você desejar:

```env
INPUT_FILE_NAME=input.txt
OUTPUT_FILE_NAME=output.txt
DEBUG_ENABLE=true
```

## Sobre a Logica

No desafio Rover é possivel identificar uma solução simples para encontrar a posição final do robo, utilizando uma cadeia de if/elses ou switch case, onde é possivel combinar instruções a partir da posição atual do robo. ex. Se o robo esta apontado para o norte e recebe uma instrução para a esquerda, podemos condiciona-lo a virar-se para a posição oeste. No entanto,isso traria uma alta complexidade ciclomática, e seria difícil a adição de novos comandos e novos testes. Dado isso, pensei em achar uma solução não apenas simples, mas tambem de baixa complexidade, facilitando a manutenção e evolução do codigo, utilizando o principio do aberto e fechado, onde seria possível adicionar novas funcionalidade/novos comandos , sem necessitar de alteração do codigo..

A solução apresentada então, se utiliza de um dicionário para mapear os possíveis movimentos do robo, e com a combinação da instrução com a posição do robo, o dicionario teria o mapeamento com o resultado da proxima posição do robo.

```js
const marsRoverCommandsMap = {
  NL: { method: 'moveSideways', params: 'W' },
  NR: { method: 'moveSideways', params: 'E' },
  EL: { method: 'moveSideways', params: 'N' },
  ER: { method: 'moveSideways', params: 'S' },
  SL: { method: 'moveSideways', params: 'E' },
  SR: { method: 'moveSideways', params: 'W' },
  WL: { method: 'moveSideways', params: 'S' },
  WR: { method: 'moveSideways', params: 'N' },
  NM: { method: 'moveForward', params: [0, 1] },
  EM: { method: 'moveForward', params: [1, 0] },
  SM: { method: 'moveForward', params: [0, -1] },
  WM: { method: 'moveForward', params: [-1, 0] },
};
```

Com isso a classe Position tera apenas dois metodos, a de mover para os lados, e a de mover para frente. O dicionario, saberia dizer, qual metodo executar e qual parametro passar, dessa forma, temos uma implementação simples, elegante e de fácil manutenção.

O segundo desafio que identifiquei do exercicio, foi o possivel tamanho do arquivo que contem as instruçoes, caso o arquivo fosse muito grande, o codigo, nao poderia carregar todo o arquivo na memoria, com isso, resolvi utilizar a função `createReadStream` do fs, onde é possível processar o arquivo em partes. No entanto, a função `createReadStream`, é intrusiva, o que acloparia a regra de negocio a uma camada de infra, entao resolvi utilizar uma biblioteca `n-readlines` e isolá-la da regra de negócio

## PASSO A PASSO:

Primeiro passo foi entender a solução do desafio, com os exemplos do desafio criei alguns testes para me guiar no desenvolvimento da solução.

Ao encotrar a solução utilizando o dicionario, comecei a escrever o meu codigo. Optei por combinar, orientação a objeto, com programação funcional. Uma das caracteristicas da programação funcional é desenvolver codigos declarativos, outra caracteristica muito encontrada nessa programação é o conceito de imutabilidade, onde resolvi aplicar na classe position. Isso significa que uma vez a classe instanciada, ela nao podera ser mais alterada, com isso, forçamos a aplicação a criar o objeto position com todas as informações necessarias, garantindo que o objeto position, sera um objeto consistente durante toda a sua vida dentro da aplicação, previnindo efeitos colaterais e facilitando o entendimento do codigo. Como no javascript nao existe conceito de construtor privado ainda, utilizei o conceito do closure do javascriptm para encapsular a classe position, e privar a criação da classe position fora do escopo da closure, ou seja, a unica forma de instranciar o objeto position é atraves da função create.

[travis-image]: https://travis-ci.com/MozartLino/mars-rover-test.svg?token=aJRRfnEXpnSoXxWf96zv&branch=main
[travis-url]: https://travis-ci.com/github/MozartLino/mars-rover-test
[coveralls-image]: https://coveralls.io/repos/github/MozartLino/mars-rover-test/badge.svg?YaZTlmvpKXPgs5JHPqXqYcXZFHInLEjJo?branch=main
[coveralls-url]: https://coveralls.io/github/MozartLino/mars-rover-test?branch=main
