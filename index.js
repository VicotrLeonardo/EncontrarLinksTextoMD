import chalk from "chalk";
import fs from "fs";

function tratarErro(error) {
  throw new Error(
    chalk.red(`Algo deu Errado !! :( , Codigo do erro é: ${error.code}`)
  );
}

async function capturarArquivo(caminhoArquivo) {
  const encoding = "utf-8";
  try {
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    console.log(chalk.yellow(texto));
    console.log(extraiLinks(texto));
  } catch (error) {
    tratarErro(error);
  }
}

//capturarArquivo("./utils/arquivos/texto1.md");

// function capturarArquivo(caminhoArquivo) {
//   const encoding = "utf-8";
//   fs.promises
//     .readFile(caminhoArquivo, encoding)
//     .then((texto) => {
//       console.log(chalk.yellow(texto));
//     })
//     .catch((error) => {
//       tratarErro(error);
//     });
// }
function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  console.log(`Valor do Regex: ${regex}`);

  const array = [];
  let temp;

  while ((temp = regex.exec(texto)) !== null) {
    array.push({ [temp[1]]: temp[2] });
  }
  return array;
}

capturarArquivo("./utils/arquivos/texto1.md");

module.exports = capturarArquivo;
