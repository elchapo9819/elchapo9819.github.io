function idOf(i) {
  return (
    (i >= 26 ? idOf(((i / 26) >> 0) - 1) : "") +
    "abcdefghijklmnopqrstuvwxyz"[i % 26 >> 0]
  );
}

function convertLetterToNumber(str) {
  str = str.toUpperCase();
  let out = 0,
    len = str.length;
  for (pos = 0; pos < len; pos++) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
  }
  return out;
}

let cell = 0;
let b = 1;

for (var i = 0; i < 123; i++) {
  let target = document.querySelector("#header");
  let box = document.createElement("div");
  box.id = i;
  target.appendChild(box);
  document.getElementById(i).innerHTML = "<span>" + i + "</span>";

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


nuovocarica()


const client = new tmi.Client({
  channels: ["pixelstheory"],
});

client.connect();

let numero = 1;

var pixel = 0;

client.on("message", (channel, tags, message, self) => {
  console.log(`${tags["display-name"]}: ${message}`);
  var string = message.toLowerCase();
  string = string.split(" ");
  var stringArray = new Array();

  for (var i = 0; i < string.length; i++) {
    stringArray.push(string[i]);
    if (i != string.length - 1) {
      stringArray.push(" ");
    }
  }

  let cell = stringArray[0];
  let color = stringArray[2];

  if (stringArray[0].match(/\d+/g) != null) {
    document.getElementById(cell).style.backgroundColor = color;
    document.getElementById(cell).style.borderColor = color;
    pixel++;

    if (pixel % 10 == 0) {
      save();
    }

    if (color == "white" || color == "#ffffff" || color == "#fff" ) {
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



var controllo = location.hash;
console.log(controllo);

if (controllo == "#carica") {
  console.log("ha fatto");

  var url = 'http://127.0.0.1:5500/salvataggio.txt';
  var storedText;

  fetch(url)
    .then(function (response) {
      response.text().then(function (text) {
        storedText = text;
        done();
      });
    });

  function done() {
    console.log(storedText);
    storedText = storedText.toString(); 
    str = storedText.split(/(\s+)/);
    console.log(str);
  
    for (i = 0, b = 0; b < 1; i = i + 4) {
      if (
        i < str.length &&
        str[i] !== "undefined" &&
        str[i] !== " " &&
        str[i] !== "\n" &&
        str[i] !== "s" &&
        str[i] !== "Salvataggio"
      ) {
        console.log(i);
        document.getElementById(str[i]).style.backgroundColor = str[i + 2];
        document.getElementById(str[i]).style.borderColor = str[i + 2];
  
        if (str[i + 2] == "white" ) {
          document.getElementById(str[i]).style.borderColor = "lightgrey";
  
  
        }
      }
      else if (str[i] !== "Salvataggio") {
        b = b + 1;
      }
    }
  }

}






function save() {
  let cella = 0;
  let f = 1;
  var data = "Salvataggio Wall"
  for (var i = 0; i < 7442; i++) {
    // We need something to add our new element too
    let target = document.querySelector("#target");
    // Now we have to create a NEW element
    let box = document.createElement("div");

    if (f < 123) {
      var coloresfondo = document.getElementById(idOf(cella) + f).style
        .backgroundColor;

      if (coloresfondo !== "" && coloresfondo !== "white") {
          var data = data + "\n" + idOf(cella) + f + " " + coloresfondo.replace(/\s/g, "");
      }

      f = f + 1;

    } else {
      cella = cella + 1;
      f = 1;
    }
  }

  fetch('https://fiverrtest.netsons.org/api/collections/save/salvataggio?token=e79b01dcea616b5ded3b24600e5cfe', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        data: {  
                 "_id": "61280cc6383862ec390000cf",
                 "textarea": data
                 }
    })
    })
    .then(res=>res.json())
    .then(entry => console.log(entry));
}


function nuovocarica() {

  (async () => {
    let url = 'https://fiverrtest.netsons.org/api/collections/get/salvataggio?token=e79b01dcea616b5ded3b24600e5cfe';
    let response = await fetch(url);

    let salvataggio = await response.json(); // legge il body della risposta e lo interpreta come JSON

    console.log(salvataggio);

    var str = salvataggio.entries[0].textarea;
  str = str.split(/(\s+)/);
  console.log(str);

  for (i = 0, b = 0; b < 1; i = i + 4) {
    if (
      i < str.length &&
      str[i] !== "undefined" &&
      str[i] !== " " &&
      str[i] !== "\n" &&
      str[i] !== "s" &&
      str[i] !== "Salvataggio"
    ) {
      console.log(i);
      document.getElementById(str[i]).style.backgroundColor = str[i + 2];
      document.getElementById(str[i]).style.borderColor = str[i + 2];

      if (str[i + 2] == "white" || str[i + 2] == "#fff"  || str[i + 2] == "#ffffff") {
        document.getElementById(str[i]).style.borderColor = "lightgrey";


      }
    }
    else if (str[i] !== "Salvataggio") {
      b = b + 1;
    }
  }
})()

}

function carica() {
  var str = document.getElementById("txtarea");
  str = str.value.split(/(\s+)/);
  console.log(str);

  for (i = 0, b = 0; b < 1; i = i + 4) {
    if (
      i < str.length &&
      str[i] !== "undefined" &&
      str[i] !== " " &&
      str[i] !== "\n" &&
      str[i] !== "s" &&
      str[i] !== "Salvataggio"
    ) {
      console.log(i);
      document.getElementById(str[i]).style.backgroundColor = str[i + 2];
      document.getElementById(str[i]).style.borderColor = str[i + 2];

      if (str[i + 2] == "white" || str[i + 2] == "#fff"  || str[i + 2] == "#ffffff") {
        document.getElementById(str[i]).style.borderColor = "lightgrey";


      }
    }
    else if (str[i] !== "Salvataggio") {
      b = b + 1;
    }
  }
}


function apri() {

  var stato = document.getElementById("txtarea").style.display;

  if (stato == "inline") {
    document.getElementById("txtarea").style.display = "none";
    document.getElementById("btnApri").innerHTML = "Apri Textbox";

  }

  else {

    document.getElementById("txtarea").style.display = "inline";
    document.getElementById("btnApri").innerHTML = "Chiudi Textbox";

  }

}

function reset() {
  var stato = document.getElementById("reset").style.display;

  if (stato == "inline") {
    document.getElementById("reset").style.display = "none";
    document.getElementById("resetbtn").innerHTML = "Reset"
  }

  else {

    document.getElementById("reset").style.display = "inline";
    document.getElementById("resetbtn").innerHTML = "Sicuro?"

  }

}