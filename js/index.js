const frm = document.querySelector("#frm")
const dvPalco = document.querySelector("#divPalco")

const poltronas = 240
const reservadas = []
window.addEventListener("load", () => {
    const ocupadas = localStorage.getItem("teatroOcupadas")
        ? localStorage.getItem("teatroOcupadas").split(";")
        : []

    for (let i = 1; i <= poltronas; i++) {
        const figure = document.createElement("figure")
        const imgStatus = document.createElement("img")

        imgStatus.src = ocupadas.includes(i.toString())
            ? "img/ocupada.jpg"
            : "img/disponivel.jpg"
        imgStatus.className = "poltrona"

        const figureCap = document.createElement("figcaption")
        const num = document.createTextNode(`[${i.toString().padStart(3, "0")}]`)
        figureCap.appendChild(num)

        figure.appendChild(imgStatus)
        figure.appendChild(figureCap)
        if (i <= 120) {
            ladoEsquerdo.appendChild(figure)
        } else {
            ladoDireito.appendChild(figure)
        }
    }
})
frm.addEventListener("submit", (e) => {
    e.preventDefault()
    const poltrona = Number(frm.inPoltrona.value)

    if (poltrona < 1 || poltrona > poltronas) {
        Swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Informe um número válido!",
            confirmButtonText: "OK"
        })
        frm.inPoltrona.focus()
        return
    }

    const ocupadas = localStorage.getItem("teatroOcupadas")
        ? localStorage.getItem("teatroOcupadas").split(";")
        : []

    if (ocupadas.includes(poltrona.toString())) {
        Swal.fire({
            icon: "error",
            title: "Ops...",
            text: `A poltrona ${poltrona} já está ocupada.`,
            confirmButtonText: "Entendi"
        })
        frm.inPoltrona.value = ""
        frm.inPoltrona.focus()
        return
    }

    const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona - 1]
    imgPoltrona.src = "img/reservada.jpg"
    reservadas.push(poltrona)

    frm.inPoltrona.value = ""
    frm.inPoltrona.focus()
})

frm.btnConfirmar.addEventListener("click", () => {
    if (reservadas.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Nenhuma reserva",
            text: "Não há poltronas reservadas.",
            confirmButtonText: "OK"
        })
        frm.inPoltrona.focus()
        return
    }

    const ocupadas = localStorage.getItem("teatroOcupadas")
        ? localStorage.getItem("teatroOcupadas").split(";")
        : []

    while (reservadas.length > 0) {
        const poltrona = reservadas.pop()
        ocupadas.push(poltrona)
        const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona - 1]
        imgPoltrona.src = "img/ocupada.jpg"
    }

    localStorage.setItem("teatroOcupadas", ocupadas.join(";"))
    Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Poltronas confirmadas com sucesso!",
        confirmButtonText: "OK"
    })
})
