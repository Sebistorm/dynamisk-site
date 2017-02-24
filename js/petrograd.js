window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");


    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);


    document.querySelector(".sortering_knapper_vegetar").addEventListener("click", filtrerVegetar);
    document.querySelector(".sortering_knapper_ikkevegetar").addEventListener("click", filtrerIkkeVegetar);
    document.querySelector(".sortering_knapper_tilbud").addEventListener("click", filtrertilbud);
    document.querySelector(".sortering_knapper_udenalkohol").addEventListener("click", filtrerudenalkohol);

}



function filtrerVegetar() {
    console.log("klik på vegetar filter")
        // find alle ikke-vegetar produkter
    var liste = document.querySelectorAll(".produkt:not(.vegetar)");

    // skjul dem - tilføj klassen "hide"
    liste.forEach(div => div.classList.add("hide"));
    event.preventDefault();

}

function filtrerIkkeVegetar() {
    console.log("klik på ikke vegetar filter")
        // find alle ikke-vegetar produkter
    var liste = document.querySelectorAll(".produkt.vegetar");

    // skjul dem - tilføj klassen "hide"
    liste.forEach(div => div.classList.add("hide"));
    event.preventDefault();



}

function filtrertilbud() {
    console.log("klik på tilbud filter")
        // find alle ikke-vegetar produkter
    var liste = document.querySelectorAll(".produkt:not(.tilbud)");

    // skjul dem - tilføj klassen "hide"
    liste.forEach(div => div.classList.add("hide"));
    event.preventDefault();

}

function filtrerudenalkohol() {
    console.log("klik på uden alkohol filter")
        // find alle ikke-vegetar produkter
    var liste = document.querySelectorAll(".produkt.alkohol");

    // skjul dem - tilføj klassen "hide"
    liste.forEach(div => div.classList.add("hide"));
    event.preventDefault();

}





function visProduktListe(listen) {
    console.table(listen);

    //filtrer udsolgte produkter fra...
    listen = listen.filter(produkt => !produkt.udsolgt);

    listen.forEach(visProdukt);
}


function visProdukt(produkt) {
    console.log(produkt);
    //kon produkt til template//
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // insæt data i klon //
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";



    if (produkt.udsolgt == false) {
        // produktet er ikke udsolgt
        // udsolgtteskt skal fjernes
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        //der er ikke rabat, rabatprisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }



    if (produkt.vegetar == true) {
        klon.querySelector(".produkt").classList.add("vegetar")
    }


    if (produkt.udsolgt) {
        klon.querySelector(".produkt").classList.add("udsolgt")
    }

    if (produkt.rabatsats > 0) {
        klon.querySelector(".produkt").classList.add("tilbud")
    }

    if (produkt.alkoholprocent > 0) {
        klon.querySelector(".produkt").classList.add("alkohol")
    }



    // tilføj produkt-id til modalknap
    klon.querySelector(".modalknap").dataset.produkt = produkt.id;
    // registrer klik på modalknap
    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik)
        // append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}

function modalKnapKlik(event) {
    console.log("knapklik", event);
    // find det produkt id, hvis knap der blev trykket på
    var produktId = event.target.dataset.produkt;
    console.log("Klik på produkt: ", produktId);
    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {
        id: produktId
    }, visModalProdukt);
}

function visModalProdukt(produkt) {
    console.log("vis modal for ", produkt);
    // find modal_template - klon den
    var klon =
        document.querySelector("#modal_template").content.cloneNode(true);
    // put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    // sletter det der stod i modal-content
    document.querySelector(".modal-content").innerHTML = "";
    // append klonen til modal-content
    document.querySelector(".modal-content").appendChild(klon);
}









/*
    //
    //	if (produkt.vegetar) == true {
    //		klon.querySelector(".produkt").classList.add("vegetar");
    //	}





    // tilføj produkt-id til modelknap
    klon.querySelector(".modalknap").dataset.produkt = produkt.id;


    // registerer klik på modalknap
    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik)

    // append klon til .produkt_liste //
    document.querySelector(".produktliste").appendChild(klon);
}

function modalKnapKlik(event) {
    console.log("knapklik", event);
    // find det produkt id, hvis knap der blev trykket på
    var produktId = event.target.dataset.produkt;
    console.log("Klik på produkt: ", produktId);
    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {
        id: produktId
    }, visModalProdukt);
}


function visModalProdukt(produkt) {
    console.log("vis modal for ", produkt);

    // find modal_template - klon den
    var klon = document.querySelector("#modal_template").content.cloneNode(true);

    // put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;

    // sletter det der stod i model_content
    document.querySelector(".modal-content").innerHTML = "";

    // append klonen til modal_content

    document.querySelector(".modal-content").appendChild(klon);

}

*/
