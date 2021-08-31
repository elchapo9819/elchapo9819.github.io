import { idOf, convertLetterToNumber } from './funzioni.js';
let cell = 0;
let b = 1;

for (var i = 0; i < 123; i++) {
  let target = document.querySelector("#header");
  let box = document.createElement("div");
  box.id = i+200;
  target.appendChild(box);
  document.getElementById(i+200).innerHTML = "<span>" + i + "</span>";

  if (i < 61) {
    let target = document.querySelector("#side");
    let box = document.createElement("div");
    box.className = idOf(i);
    target.appendChild(box);
    document.querySelector("." + idOf(i)).innerHTML =
      "<span>" + idOf(i) + "</span>";

    let target2 = document.querySelector("#side2");
    let box2 = document.createElement("div");
    box2.id = idOf(i);
    target2.appendChild(box2);
    document.getElementById(idOf(i)).innerHTML = "<span>" + idOf(i) + "</span>";
  }
}

for (var i = 0; i < 7442; i++) {
  // We need something to add our new element too
  let target = document.querySelector("#target");
  // Now we have to create a NEW element
  let box = document.createElement("div");

  if (b < 122) {
    box.id = idOf(cell) + b;

    target.appendChild(box);

    b = b + 1;
  } else {
    box.id = idOf(cell) + b;

    target.appendChild(box);
    cell = cell + 1;
    b = 1;
  }
}

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: "slv_ndc",
    password: "oauth:8w8zps1r9oaqz2whzsc4633u7amkx7",
  },
  channels: ["PixelsTheory"],
});

client.connect();

let numero = 1;

var pixel = 0;
client.on("connected", (channel, tags, message, self) => {

  function salvataggio(id, dati) {
    fetch(
      "https://fiverrtest.netsons.org/api/collections/save/salvataggiobeta?token=e79b01dcea616b5ded3b24600e5cfe",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            _id: id,
            textarea: dati,
            data: new Date().toLocaleString(),
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((entry) => client.say("BonoboRiven", "/w PixelsTheory Salvataggio Effettuato " + new Date().toLocaleTimeString()));
  }

  nuovocarica();

  client.on("message", (channel, tags, message, self) => {
    console.log(`${tags["display-name"]}: ${message}`);
    var string = message;

    if (string == "!salva") {
      save();
    }

    string = string.split(" ");
    var stringArray = new Array();

    for (var i = 0; i < string.length; i++) {
      stringArray.push(string[i]);
      if (i != string.length - 1) {
        stringArray.push(" ");
      }
    }

    let cell = stringArray[0].toLowerCase();
    let color = stringArray[2].toLowerCase();
    if (stringArray[0].match(/\d+/g) != null) {
      document.getElementById(cell).style.backgroundColor = color;
      document.getElementById(cell).style.borderColor = color;
      document.getElementById(cell).innerHTML = "";


      if (stringArray[4] && stringArray[4].length == 1 )  {
        document.getElementById(cell).innerHTML = stringArray[4];
      }


      pixel++;

      if (pixel % 10 == 0) {
        save();
      }

      if (color == "white" || color == "#ffffff" || color == "#fff") {
        document.getElementById(cell).style.borderColor = "lightgrey";
      }
    }

    if (tags.badges !== null) {
      if (tags.badges.broadcaster !== null || tags.mod) {
        if (color == "canc") {
          var casellalett = String(cell.match(/[a-zA-Z]+/g));
          var casellanum = String(cell.match(/\d+/g));
          var riga = convertLetterToNumber(casellalett) - 1;
          var colore = "white";

          for (i = 0; i < 5; i++) {
            var nuovariga = riga - 2 + i;
            var casellalett = idOf(nuovariga);

            for (b = 0; b < 5; b++) {
              var casella = casellalett + (casellanum - 2 + b);
              document.getElementById(casella).style.backgroundColor = colore;

              document.getElementById(casella).style.borderColor = "lightgrey";
            }
          }
        }
      }
    }
  });

  function save() {
    let cella = 0;
    let f = 1;
    var data = "Salvataggio Twitch Wall";
    for (var i = 0; i < 7442; i++) {
      // We need something to add our new element too
      let target = document.querySelector("#target");
      // Now we have to create a NEW element
      let box = document.createElement("div");

      if (f < 123) {
        var coloresfondo = document.getElementById(idOf(cella) + f).style
          .backgroundColor;
        var letterasalva = document.getElementById(idOf(cella) + f).innerHTML;

        if (coloresfondo !== "" && coloresfondo !== "white") {

          if (letterasalva !== "") {
            var data =
              data + "\n" + idOf(cella) + f + " " + coloresfondo.replace(/\s/g, "") + " " + letterasalva;
          }

          else {
            var data =
              data + "\n" + idOf(cella) + f + " " + coloresfondo.replace(/\s/g, "") + " " + "&nbsp";
          }

        }


        f = f + 1;
      } else {
        cella = cella + 1;
        f = 1;
      }
    }

    salvataggio("6128fdeb6239364b9900004d", data)

  }

  function nuovocarica() {
    (async () => {
      let url =
        "https://fiverrtest.netsons.org/api/collections/get/salvataggiobeta?token=e79b01dcea616b5ded3b24600e5cfe";
      let response = await fetch(url);

      let salvataggio = await response.json(); // legge il body della risposta e lo interpreta come JSON

      var str = salvataggio.entries[0].textarea;
      str = str.split(/(\s+)/);
      for (i = 0, b = 0; b < 1; i = i + 6) {
        if (
          i < str.length &&
          str[i] !== "undefined" &&
          str[i] !== " " &&
          str[i] !== "\n" &&
          str[i] !== "s" &&
          str[i] !== "Salvataggio"
        ) {
          document.getElementById(str[i]).style.backgroundColor = str[i + 2];
          document.getElementById(str[i]).style.borderColor = str[i + 2];
          document.getElementById(str[i]).innerHTML = str[i + 4];

          if (
            str[i + 2] == "white" ||
            str[i + 2] == "#fff" ||
            str[i + 2] == "#ffffff"
          ) {
            document.getElementById(str[i]).style.borderColor = "lightgrey";
          }
        } else if (str[i] !== "Salvataggio") {
          b = b + 1;
        }
      }
    })();
  }
});
