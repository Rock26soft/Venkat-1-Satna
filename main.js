function loadpage(pname){
    fetch("./pages/"+pname+".html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("pagearea").innerHTML = html;
    })
    .catch((error) => {
      console.warn(error);
    });
    }
    