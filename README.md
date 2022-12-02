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
Existe um arquivo input.txt na raiz que você pode modificar ou adicionar mais comandos para o Rover se movimentar pelo plateau

## Sobre a Logica

No desafio Rover é possível identificar uma solução simples para encontrar a posição final do robô, utilizando uma cadeia de if/elses ou switch case, onde é possível combinar instruções a partir da posição atual do robô. ex. Se o robô esta apontado para o norte e recebe uma instrução para a esquerda, podemos condicioná-lo a virar-se para a posição oeste. No entanto,isso traria uma alta complexidade ciclomática, e seria difícil a adição de novos comandos e novos testes. Dado isso, pensei em achar uma solução não apenas simples, mas também de baixa complexidade, facilitando a manutenção e evolução do código, utilizando o principio do aberto e fechado, onde seria possível adicionar novas funcionalidades/novos comandos, sem necessitar de alteração do código.

A solução apresentada então, se utiliza de um dicionário para mapear os possíveis movimentos do robô, e com a combinação da instrução com a posição do robô, o dicionário teria o mapeamento com o resultado da próxima posição do robô.

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

Com isso a classe Position terá apenas dois metodos, a de mover para os lados, e a de mover para frente. O dicionário, saberia dizer, qual metodo executar e qual parametro passar, dessa forma, temos uma implementação simples, elegante e de fácil manutenção.

O segundo desafio que identifiquei do exercício, foi o possível tamanho do arquivo que contém as instruções, caso o arquivo fosse muito grande, o código, nao poderia carregar todo o arquivo na memória, com isso, resolvi utilizar a função `createReadStream` do fs, onde é possível processar o arquivo em partes. No entanto, a função `createReadStream`, é intrusiva, o que acloparia a regra de negócio a uma camada de infra, entao resolvi utilizar uma biblioteca `n-readlines` e isolá-la da regra de negócio

## PASSO A PASSO:

Primeiro passo foi entender a solução do desafio, com os exemplos do desafio criei alguns testes para me guiar no desenvolvimento da solução.

Ao encontrar a solução utilizando o dicionário, comecei a escrever o meu código. Optei por combinar, orientação a objeto, com programação funcional. Uma das características da programação funcional é desenvolver códigos declarativos, outra característica muito encontrada nessa programação é o conceito de imutabilidade, onde resolvi aplicar na classe position. Isso significa que uma vez a classe instanciada, ela nao podera ser mais alterada, com isso, forçamos a aplicação a criar o objeto position com todas as informações necessárias, garantindo que o objeto position, será um objeto consistente durante toda a sua vida dentro da aplicação, prevenindo efeitos colaterais e facilitando o entendimento do código. Como no javascript não existe conceito de construtor privado ainda, utilizei o conceito do closure do javascript para encapsular a classe position, e privar a criação da classe position fora do escopo da closure, ou seja, a unica forma de instanciar o objeto position é através da função create.

[travis-image]: https://travis-ci.com/MozartLino/mars-rover-test.svg?token=aJRRfnEXpnSoXxWf96zv&branch=main
[travis-url]: https://travis-ci.com/github/MozartLino/mars-rover-test
[coveralls-image]: https://coveralls.io/repos/github/MozartLino/mars-rover-test/badge.svg?YaZTlmvpKXPgs5JHPqXqYcXZFHInLEjJo?branch=main
[coveralls-url]: https://coveralls.io/github/MozartLino/mars-rover-test?branch=main
