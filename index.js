const express = require("express");
const app = express();

app.get("/:codigo", (req, res) => {
  const digito = calculaDigitoMod11(req.params.codigo, 1, 18, true);

  res.send(digito);

  function calculaDigitoMod11(dado, numDig, limMult, x10) {
    let mult, soma, i, n, dig;

    if (!x10) numDig = 1;
    for (n = 1; n <= numDig; n++) {
      soma = 0;
      mult = 2;
      for (i = dado.length - 1; i >= 0; i--) {
        soma += mult * parseInt(dado.charAt(i));
        if (++mult > limMult) mult = 2;
      }
      if (x10) {
        dig = ((soma * 10) % 11) % 10;
      } else {
        dig = soma % 11;
        if (dig == 10) dig = "X";
      }
      dado += dig;
    }
    return dado.substr(dado.length - numDig, numDig);
  }
});

app.listen(3001, () => console.log("listening"));
