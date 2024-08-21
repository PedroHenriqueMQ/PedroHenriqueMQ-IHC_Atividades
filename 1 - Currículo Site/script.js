let tagQuerySelector;
const botaoPerfil = document.getElementById("botaoPerfil");
const botaoSecao = document.getElementById("botaoSecao");
let caixasSecoes = [];

function criarElementoDeCaixaDeSecao(titulo, descricao) {
    const caixaElementoDeSecao = document.createElement("div");
    caixaElementoDeSecao.className = "caixa-de-elemento-de-secao";

    const tituloSecao = document.createElement("h2");
    tituloSecao.className = "titulo-secao";
    tituloSecao.textContent = titulo;

    const descricaoSecao = document.createElement("p");
    descricaoSecao.className = "descricao-secao";
    descricaoSecao.textContent = descricao;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "botao-excluir";

    caixaElementoDeSecao.appendChild(tituloSecao);
    caixaElementoDeSecao.appendChild(descricaoSecao);
    if (tagQuerySelector.tagName.toLowerCase() !== "header")
        caixaElementoDeSecao.appendChild(botaoRemover);

    botaoRemover.onclick = () => {
        caixaElementoDeSecao.remove();
    }

    return caixaElementoDeSecao;
}

function criarCaixaDeSecao(secao, titulo, descricao) {
    const tituloPrincipalSecao = document.createElement("h1");
    tituloPrincipalSecao.className = "titulo-principal-secao";
    tituloPrincipalSecao.textContent = secao;

    const botaoNovoElementoDeSecao = document.createElement("button");
    botaoNovoElementoDeSecao.textContent = "Adicionar novo";
    botaoNovoElementoDeSecao.className = "botaoEditor";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir Seção";
    botaoExcluir.className = "botao-excluir";

    const caixaTitulo = document.createElement("div");
    caixaTitulo.className = "caixa-titulo";
    caixaTitulo.appendChild(tituloPrincipalSecao);
    caixaTitulo.appendChild(botaoExcluir);

    const caixaDeSecao = document.createElement("div");
    caixaDeSecao.className = "caixa-de-secao";
    caixaDeSecao.appendChild(caixaTitulo);
    const elementoDeSecao = criarElementoDeCaixaDeSecao(titulo, descricao);
    caixaDeSecao.appendChild(elementoDeSecao);

    if (secao !== "Perfil Profissional") {
        caixaDeSecao.insertBefore(botaoNovoElementoDeSecao, elementoDeSecao);
        caixasSecoes.push(caixaDeSecao);
    }

    botaoNovoElementoDeSecao.onclick = () => {
        tagQuerySelector = document.querySelector(caixaDeSecao.parentElement.tagName.toLowerCase());
        
        const caixaDeEdicao = criarCaixaDeEdicao(
            ["Título", "Descrição"],
            secao
        );
        caixaDeSecao.insertBefore(caixaDeEdicao, elementoDeSecao);
    }

    botaoExcluir.onclick = () => {
        tagQuerySelector = document.querySelector(caixaDeSecao.parentElement.tagName.toLowerCase());

        caixaDeSecao.remove();
        caixasSecoes = caixasSecoes.filter(
            (caixa) => 
                caixa.querySelector("h1").textContent !== secao
        );

        if (tagQuerySelector.tagName.toLowerCase() === "header") tagQuerySelector.prepend(botaoPerfil);
    };
    
    return caixaDeSecao;
}

function criarCaixaDeEdicao(placeholder, secao, conteudoDoTexto) {
    botaoSecao.disabled = true;
    botaoPerfil.disabled = true;

    const titulo = document.createElement("input");
    titulo.type = "text";
    titulo.className = "titulo";
    titulo.placeholder = placeholder[0];
  
    const descricao = document.createElement("textarea");
    descricao.rows = 7;
    descricao.style.resize = "none";
    descricao.className = "descricao";
    descricao.placeholder = placeholder[1];

    if (conteudoDoTexto !== undefined) {
        console.log(conteudoDoTexto);
        titulo.textContent = conteudoDoTexto[0];
        descricao.textContent = conteudoDoTexto[1];
    }

    const botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = "Concluido";
    botaoConcluir.className = "botaoEditor";

    const botaoCancelar = document.createElement("button");
    botaoCancelar.textContent = "Cancelar";
    botaoCancelar.className = "botaoEditor";

    const caixaBotoes = document.createElement("div");
    caixaBotoes.className = "caixa-botoes";
    caixaBotoes.appendChild(botaoConcluir);
    caixaBotoes.appendChild(botaoCancelar);

    const caixaDeEdicao = document.createElement("div");
    caixaDeEdicao.className = "caixa-de-edicao";
    caixaDeEdicao.appendChild(titulo);
    caixaDeEdicao.appendChild(descricao);
    caixaDeEdicao.appendChild(caixaBotoes);

    botaoConcluir.onclick = () => {
        botaoSecao.disabled = false;
        botaoPerfil.disabled = false;

        if(tagQuerySelector.tagName.toLowerCase() === "header") {
            tagQuerySelector.prepend(criarCaixaDeSecao(secao, titulo.value, descricao.value));
        } else {
            const caixaSecaoCorrespondente = caixasSecoes.filter(
                (caixa) => caixa.querySelector("h1").textContent === secao
            );
                
            if(caixaSecaoCorrespondente.length === 1) {
                caixaSecaoCorrespondente[0]
                    .appendChild(
                        criarElementoDeCaixaDeSecao(titulo.value, descricao.value)
                    );
            } else {
                tagQuerySelector.insertBefore(
                    criarCaixaDeSecao(secao, titulo.value, descricao.value),
                    botaoSecao
                );
            }
        }
        caixaDeEdicao.remove();
    }
    
    botaoCancelar.onclick = () => {
        caixaDeEdicao.remove();
        botaoSecao.disabled = false;
        botaoPerfil.disabled = false;

        if (tagQuerySelector.tagName.toLowerCase() === "header") 
            tagQuerySelector.prepend(botaoPerfil);
    }
  
    return caixaDeEdicao;
}

function acionarCaixaDeEdicao(tag, secao) {
    tagQuerySelector = document.querySelector(tag);

    if (tag != tagQuerySelector.tagName.toLowerCase()) return;
    else if (tag === "header") {
        botaoPerfil.remove();

        const caixaDeEdicao = criarCaixaDeEdicao(
            ["Seu Nome", "Seu perfil profissional"],
            "Perfil Profissional"
        );

        tagQuerySelector.appendChild(caixaDeEdicao);
    } else {
        const caixaDeEdicao = criarCaixaDeEdicao(
            ["Título", "Descrição"],
            secao
        );

        tagQuerySelector.insertBefore(caixaDeEdicao, botaoSecao);
    }
}

function criarEscolhaDeSecao() {
    botaoSecao.disabled = true;
    botaoPerfil.disabled = true;
    const secoes = ["Experiências", "Certicados", "Habilidades"];

    const select = document.createElement("select");
    select.id = "secoes";

    const optgroup = document.createElement("optgroup");
    optgroup.label = "Opções de escolha:";
    select.appendChild(optgroup);

    const optionTitulo = document.createElement("option");
    optionTitulo.disabled = true;
    optionTitulo.selected = true;
    optionTitulo.textContent = "Selecione uma seção";
    select.appendChild(optionTitulo); 

    secoes.forEach((secao) => {
        const option = document.createElement("option");
        option.value = secao.toLowerCase();
        option.textContent = secao;

        const tituloSecaoCorrespondente = caixasSecoes
            .map((caixa) => caixa.querySelector("h1").textContent)
            .filter((tituloSecao) => tituloSecao === secao);

        if (tituloSecaoCorrespondente.includes(secao)) option.disabled = true;
        select.appendChild(option);
      });

    const botaoCancelar = document.createElement("button");
    botaoCancelar.textContent = "Cancelar";
    botaoCancelar.className = "botaoEditor";

    const caixaDeEscolhaDeSecao = document.createElement("div");
    caixaDeEscolhaDeSecao.className = "caixa-de-escolha";
    caixaDeEscolhaDeSecao.appendChild(select);
    caixaDeEscolhaDeSecao.appendChild(botaoCancelar);

    select.addEventListener("change", () => {
        const opcaoSelecionada = select.selectedOptions[0].textContent;
        caixaDeEscolhaDeSecao.remove();
        acionarCaixaDeEdicao("main", opcaoSelecionada);
    });

    botaoCancelar.onclick = () => {
        caixaDeEscolhaDeSecao.remove();
        botaoSecao.disabled = false;
        botaoPerfil.disabled = false;
    }

    return caixaDeEscolhaDeSecao;
}

function acionarEscolhaDeSecao(tag) {
    tagQuerySelector = document.querySelector(tag);

    const escolhaDeSecao = criarEscolhaDeSecao();
    tagQuerySelector.appendChild(escolhaDeSecao);
}