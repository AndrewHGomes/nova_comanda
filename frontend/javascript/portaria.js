async function pegarIntervaloComandas() {
  const resposta = await fetch(
    "../server/TipoDeComanda.php?pegarIntervaloComandas"
  );

  const objIntervaloComandas = await resposta.json();

  const strIntervaloComandas = objIntervaloComandas.Valor;

  const arrIntervaloComandas = strIntervaloComandas.split("-");

  const inicioIntervalo = Number(arrIntervaloComandas[0]);
  const finalIntervalo = Number(arrIntervaloComandas[1]);

  const inputNome = document.getElementById("nome-cliente");
  inputNome.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
  });

  const btnSalvarComanda = document.getElementById("btnSalvarComanda");
  const imgLoading = document.querySelector("#imgLoading");

  btnSalvarComanda.addEventListener("click", (e) => {
    e.preventDefault();

    const numeroComanda = Number(
      document.getElementById("numero-comanda").value
    );

    const nomeCliente = inputNome.value;

    const telefoneCliente = document.getElementById("telefone-cliente").value;

    if (
      numeroComanda < inicioIntervalo ||
      numeroComanda > finalIntervalo ||
      numeroComanda === ""
    ) {
      alert(
        `A COMANDA DEVE ESTAR ENTRE ${inicioIntervalo} e ${finalIntervalo}`
      );
      e.preventDefault();
    } else if (!nomeCliente || nomeCliente === "" || nomeCliente.length < 2) {
      alert("PREENCHA O NOME CORRETAMENTE...");
      e.preventDefault();
    } else if (
      !telefoneCliente ||
      telefoneCliente === "" ||
      telefoneCliente.length !== 11
    ) {
      alert("PREENCHA O TELEFONE CORRETAMENTE...");
      e.preventDefault();
    } else {
      const dados = {
        CodigoComanda: numeroComanda,
        Telefone: telefoneCliente,
        Cliente: nomeCliente,
      };

      console.log(dados);

      fetch("../server/TipoDeComanda.php?dadosComandaCab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na requisição HTTP: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          if (data === "SUCESSO!") {
            imgLoading.style.display = "block";
            setTimeout(() => {
              imgLoading.style.display = "none";
              location.href = "./index.php";
            }, 1000);
          } else if (data === "ERRO!") {
            console.error("Resposta do PHP: ", data);
            alert("OCORREU UM ERRO!");
          } else {
            console.warn("Resposta inesperada do PHP:", data);
            alert("Ocorreu um problema inesperado.");
          }
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
          alert("Erro ao enviar os dados para o servidor.");
        });
    }
    document.getElementById("numero-comanda").value = "";
    document.getElementById("nome-cliente").value = "";
    document.getElementById("telefone-cliente").value = "";
  });
}

pegarIntervaloComandas();
