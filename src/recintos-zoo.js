class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: ["savana"],
        tamanhoTotal: 10,
        animaisExistentes: { MACACO: 3 },
      },
      {
        numero: 2,
        bioma: ["floresta"],
        tamanhoTotal: 5,
        animaisExistentes: {},
      },
      {
        numero: 3,
        bioma: ["savana", "rio"],
        tamanhoTotal: 7,
        animaisExistentes: { GAZELA: 1 },
      },
      { numero: 4, bioma: ["rio"], tamanhoTotal: 8, animaisExistentes: {} },
      {
        numero: 5,
        bioma: ["savana"],
        tamanhoTotal: 9,
        animaisExistentes: { LEAO: 1 },
      },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {

    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }


    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animalInfo = this.animais[animal];
    const recintosViaveis = [];

    for (const recinto of this.recintos) {

      const biomaValido = recinto.bioma.some((bioma) =>
        animalInfo.biomas.includes(bioma)
      );
      if (!biomaValido) continue;


      let podeAdicionar = true;


      const animaisNoRecinto = Object.keys(recinto.animaisExistentes);
      const temCarnivorosNoRecinto = animaisNoRecinto.some(
        (especie) => this.animais[especie].carnivoro
      );
      const temNaoCarnivorosNoRecinto = animaisNoRecinto.some(
        (especie) => !this.animais[especie].carnivoro
      );

      if (animalInfo.carnivoro) {
        if (temNaoCarnivorosNoRecinto) {
          podeAdicionar = false;
        }
        if (
          temCarnivorosNoRecinto &&
          animaisNoRecinto.some(
            (especie) => this.animais[especie].carnivoro && especie !== animal
          )
        ) {
          podeAdicionar = false;
        }
      } else {
        if (temCarnivorosNoRecinto) {
          podeAdicionar = false;
        }
      }

      if (!podeAdicionar) continue;


      if (animal === "MACACO") {
        const temOutrosAnimais =
          Object.keys(recinto.animaisExistentes).length > 0;
        if (quantidade === 1 && !temOutrosAnimais) {
          continue;
        }
      }


      if (animal === "HIPOPOTAMO") {
        const temOutrasEspecies =
          Object.keys(recinto.animaisExistentes).length > 0;
        const biomaCertoParaOutrasEspecies =
          recinto.bioma.includes("savana") && recinto.bioma.includes("rio");
        if (temOutrasEspecies && !biomaCertoParaOutrasEspecies) {
          continue;
        }
      }

      if (Object.keys(recinto.animaisExistentes).includes("HIPOPOTAMO")) {
        const biomaAdequado =
          recinto.bioma.includes("savana") && recinto.bioma.includes("rio");
        if (!biomaAdequado) {
          continue;
        }
      }
      const espacoOcupado = Object.entries(recinto.animaisExistentes).reduce(
        (total, [tipo, qtd]) => {
          return total + qtd * this.animais[tipo].tamanho;
        },
        0
      );


      let espacoNecessario = quantidade * animalInfo.tamanho;


      if (Object.keys(recinto.animaisExistentes).length > 0) {

        const temOutrasEspecies = Object.keys(recinto.animaisExistentes).some(
          (especie) => especie !== animal
        );
        if (temOutrasEspecies) {
          espacoNecessario += 1;
        }
      }





      const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
      if (espacoNecessario <= espacoLivre) {
        const espacoLivrePosInsercao = espacoLivre - espacoNecessario;
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoLivrePosInsercao} total: ${recinto.tamanhoTotal})`
        );
      }
    }



    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };