// CREDENCIAIS DE ACESSO
const CREDENCIAIS = {
    cliente: { usuario: "cliente", senha: "123" },
    empresa: { usuario: "admin", senha: "coppi2026" }
};

const WHATSAPP_CONTATO = "5547999999999"; // Configure seu WhatsApp com DDD aqui

let dadosProjeto = JSON.parse(localStorage.getItem('coppi_projeto')) || {
    valor: 75000.00,
    status: 'Pendente',
    contrapropostaValor: '',
    contrapropostaTexto: ''
};

let perfilLogado = localStorage.getItem('coppi_perfil') || null;

function executarLogin() {
    const u = document.getElementById('user-input').value;
    const s = document.getElementById('pass-input').value;

    if (u === CREDENCIAIS.cliente.usuario && s === CREDENCIAIS.cliente.senha) {
        perfilLogado = "cliente";
    } else if (u === CREDENCIAIS.empresa.usuario && s === CREDENCIAIS.empresa.senha) {
        perfilLogado = "empresa";
    } else {
        alert("Usuário ou senha incorretos!");
        return;
    }

    localStorage.setItem('coppi_perfil', perfilLogado);
    checarSessao();
}

function executarLogout() {
    localStorage.removeItem('coppi_perfil');
    perfilLogado = null;
    document.getElementById('app-block').style.display = "none";
    document.getElementById('login-block').style.display = "flex";
    document.getElementById('user-input').value = '';
    document.getElementById('pass-input').value = '';
}

function checarSessao() {
    if (perfilLogado) {
        document.getElementById('login-block').style.display = "none";
        document.getElementById('app-block').style.display = "block";
        
        if (perfilLogado === "empresa") {
            document.getElementById('admin-panel').style.display = "block"; 
            document.getElementById('client-actions').style.display = "none"; 
        } else {
            document.getElementById('admin-panel').style.display = "none"; 
            document.getElementById('client-actions').style.display = "flex"; 
        }
        renderizarApp();
    } else {
        document.getElementById('login-block').style.display = "flex";
        document.getElementById('app-block').style.display = "none";
    }
}

function renderizarApp() {
    document.getElementById('display-value').innerText = dadosProjeto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const badge = document.getElementById('display-status');
    const actions = document.getElementById('client-actions');
    
    if(dadosProjeto.status === 'Pendente') {
        badge.className = "status-badge status-pendente";
        badge.innerText = "Aguardando Análise do Cliente";
        if(perfilLogado === "cliente") actions.style.display = "flex";
    } else if(dadosProjeto.status === 'Aceito') {
        badge.className = "status-badge status-aceito";
        badge.innerText = "✓ Proposta Aceita pelo Cliente";
        actions.style.display = "none";
    } else if(dadosProjeto.status === 'Recusado') {
        badge.className = "status-badge status-recusado";
        badge.innerText = "✕ Proposta Não Aceita";
        if(perfilLogado === "cliente") actions.style.display = "flex";
    } else if(dadosProjeto.status === 'Contraproposta') {
        badge.className = "status-badge status-contraproposta";
        badge.innerText = `⇄ Contraproposta de ${Number(dadosProjeto.contrapropostaValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} enviada`;
        if(perfilLogado === "cliente") actions.style.display = "flex";
    }
}

function responderProposta(statusDigitado) {
    dadosProjeto.status = statusDigitado;
    localStorage.setItem('coppi_projeto', JSON.stringify(dadosProjeto));
    renderizarApp();

    let textoWhats = `*Portal COPPI* \nO cliente respondeu à proposta financeira de valor ${document.getElementById('display-value').innerText}.\nStatus: *${statusDigitado.toUpperCase()}*`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_CONTATO}&text=${encodeURIComponent(textoWhats)}`, '_blank');
}

function abrirCaixaNegociacao() {
    document.getElementById('negotiation-panel').style.display = "block";
}

function enviarContraproposta() {
    const valorSugerido = document.getElementById('counter-value').value;
    const textoSugerido = document.getElementById('counter-text').value;

    if(!valorSugerido) {
        alert("Por favor, preencha o valor que deseja propor.");
        return;
    }

    dadosProjeto.status = 'Contraproposta';
    dadosProjeto.contrapropostaValor = valorSugerido;
    dadosProjeto.contrapropostaTexto = textoSugerido;
    
    localStorage.setItem('coppi_projeto', JSON.stringify(dadosProjeto));
    renderizarApp();
    document.getElementById('negotiation-panel').style.display = "none";

    let textoWhats = `*Portal COPPI - Nova Negociação* \nO cliente enviou uma contraproposta.\nValor sugerido: *R$ ${valorSugerido}*\nJustificativa: ${textoSugerido}`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_CONTATO}&text=${encodeURIComponent(textoWhats)}`, '_blank');
}

function adminAtualizarValor() {
    const novoValor = document.getElementById('admin-new-value').value;
    if(!novoValor) {
        alert("Digite um valor válido para alterar.");
        return;
    }

    dadosProjeto.valor = parseFloat(novoValor);
    dadosProjeto.status = 'Pendente'; 
    dadosProjeto.contrapropostaValor = '';
    dadosProjeto.contrapropostaTexto = '';

    localStorage.setItem('coppi_projeto', JSON.stringify(dadosProjeto));
    renderizarApp();
    document.getElementById('admin-new-value').value = '';
    alert("Sucesso! O valor foi atualizado e a proposta voltou ao status pendente para o cliente.");
}

// Inicializa a sessão do app
checarSessao();