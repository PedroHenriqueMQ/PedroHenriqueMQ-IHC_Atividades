const apiURL = "http://localhost:3000/lista";

const collection = document.getElementById("collection");
const listItensSelecionados = [];

document.getElementById("submit-btn").addEventListener("click", function () {
    const mls = document.getElementById("mls").value;
    const horario = document.getElementById("horario").value;

    if (mls && horario) {
        const data = {
        mls: mls,
        horario: horario
        };

        fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => {
        console.error("Erro:", error);
        });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});


document.getElementById("cancel-btn").addEventListener("click", function () {
    const cardAction = document.getElementsByClassName("card blue-grey darken-1")[0];
    cardAction.style.display = "none";
});

document.getElementById("add-btn").addEventListener("click", function () {
    const cardAction = document.getElementsByClassName("card blue-grey darken-1")[0];
    cardAction.style.display = "block";
});

function carregarItens() {
    let totaMls = 0;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const linkElement = document.createElement("a");
                linkElement.href = "#!";
                linkElement.className = "collection-item";
                linkElement.textContent = `mls: ${item.mls} - Horário: ${item.horario}`;
                linkElement.dataset.id = item.id;

                totaMls += parseInt(item.mls);
                document.getElementById("total-mls").innerHTML = `Total: ${totaMls} mls`;

                linkElement.addEventListener("click", function () {
                    const itemId = linkElement.dataset.id; 
                    
                    if (listItensSelecionados.includes(itemId)) {
                        listItensSelecionados.splice(listItensSelecionados.indexOf(itemId), 1)
                        linkElement.style.backgroundColor = "#3973f0";
                    } else {
                        listItensSelecionados.push(itemId);
                        linkElement.style.backgroundColor = "#5047FC";
                    }
                });

                collection.appendChild(linkElement);
            });
        })
        .catch(error => console.error("Erro ao carregar itens:", error));
}

window.onload = carregarItens;


function deletarItem(itemId) {
    fetch(`http://localhost:3000/lista/${itemId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao remover item");
        }
    })
    .catch(error => console.error("Erro:", error));
}

document.getElementById("delete-btn").addEventListener("click", function() {
    listItensSelecionados.forEach(itemId => deletarItem(itemId));
    listItensSelecionados = [];
    collection.innerHTML = "";
    carregarItens();
});