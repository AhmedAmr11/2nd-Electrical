const quranid = document.getElementById("quran");
const quranurl =
  "https://qurancentral.com/?powerpress_embed=126416-podcast&amp;powerpress_player=mediaelement-audio";

function createOptions() {
  const select = document.createElement("select");
  const ioption = document.createElement("option");
  ioption.value = 0;
  ioption.text = '';
  select.appendChild(ioption);

  for (let i = 0; i < 114; i++) {
    const option = document.createElement("option");
    option.value = 126417 - i;
    option.text = i+1;
    select.appendChild(option);
  }
  select.className = "quranList";
  return select;
}

function renderQuran(recsrc, scope, suraID) {
  const srcID = recsrc.split("=");

  const url1 = srcID[0];
  const url2 = srcID[1].substr(6);
  const value = `=${suraID}`;
  const displayrec = url1 + value + url2;

  let rec = document.createElement("iframe");
  rec.src = displayrec;
  rec.SameSite='None'
  rec.className = "player";
  rec.setAttribute("frameborder", "0");
  renderOnce(scope, rec);
  return rec;
}

const selects = createOptions();
const label = document.createElement('span')
label.innerText="Select sūrah"
label.className="label"
selects.appendChild(label)

const selectContainer = document.createElement('div')
selectContainer.className="select-container"
selectContainer.appendChild(label)
selectContainer.appendChild(selects)
quranid.appendChild(selectContainer);

selects.addEventListener("change", event => {
  renderQuran(quranurl, quranid, event.target.value);
});

var counter = 0;
var old = 0;

function renderOnce(container, child) {
  if (counter === 0) {
    container.appendChild(child);
    old = child;
  } else {
    if (child !== old) {
      container.replaceChild(child, old);
      old = child;
    }
  }
  counter++;
}