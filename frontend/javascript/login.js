async function pegarTipoDeComanda() {
  try {
    const resposta = await fetch("../server/TipoDeComanda.php?tipoDeComanda");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    const objTipoComanda = await resposta.json();

    localStorage.setItem("tipoDeComanda", JSON.stringify(objTipoComanda));

    console.log("Tipo de comanda já está no locaStorage!", objTipoComanda);
  } catch (erro) {
    console.log("Erro ao carregar tipo de comanda:", erro);
  }
}

//======================================================================================

async function pegarCategorias() {
  try {
    const resposta = await fetch("../server/Categorias.php?pegarCategorias");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    const arrayCategorias = await resposta.json();

    localStorage.setItem("categorias", JSON.stringify(arrayCategorias));

    console.log("Categorias já estão no locaStorage!", arrayCategorias);
  } catch (erro) {
    console.log("Erro ao carregar categorias:", erro);
  }
}

//=======================================================================================

async function pegarMercadorias() {
  try {
    const resposta = await fetch("../server/Mercadorias.php");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    const arrayMercadorias = await resposta.json();

    localStorage.setItem("mercadorias", JSON.stringify(arrayMercadorias));

    console.log("Mercadirias já estão no locaStorage!", arrayMercadorias);
  } catch (erro) {
    console.log(erro);
  }
}

//=======================================================================================

async function cargaInicialDeDados() {
  try {
    await Promise.all([
      pegarTipoDeComanda(),
      pegarCategorias(),
      pegarMercadorias(),
    ]);
    console.log("Dados carregados com sucesso!");
    return true;
  } catch (erro) {
    console.log("Algo não carregou corretamente.", erro);
    return false;
  }
}

//=======================================================================================

async function pegarUsuarios() {
  try {
    const resposta = await fetch("../server/Login.php?pegarUsuarios");
    if (!resposta.ok) {
      throw new Error(`Erro ao pegar usuários: ${resposta.status}`);
    }
    const arrayUsuarios = await resposta.json();
    const selectUsuario = document.getElementById("selectUsuario");
    arrayUsuarios.forEach((usuario) => {
      const option = document.createElement("option");
      option.value = usuario.Nome;
      option.textContent = usuario.Nome;
      selectUsuario.append(option);
    });
  } catch (erro) {
    console.error("Erro ao pegar usuários:", erro);
  }

  const imgLoading = document.getElementById("imgLoading");
  const btnEnter = document.querySelector("#btnEnter");

  btnEnter.addEventListener("click", async (e) => {
    e.preventDefault();

    imgLoading.style.display = "block";

    const [cargaOk] = await Promise.all([
      cargaInicialDeDados(),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);

    imgLoading.style.display = "none";

    if (cargaOk) {
      console.log("Navegando para a página principal...");
      location.href = "./index.php";
    } else {
      console.log("A navegação foi impedida devido a erros na carga inicial.");
    }
  });
}

window.onload = pegarUsuarios;

//=======================================================================================
