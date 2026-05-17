const WHATSAPP_CONTATO = "5547999999999"; // Configure seu WhatsApp aqui

let dadosProjeto = JSON.parse(localStorage.getItem('coppi_projeto')) || {
    valor: 75000.00,
    status: 'Pendente',
    contrapropostaValor: '',
    contrapropostaTexto: ''
};

function renderizarApp() {
    document.getElementById('display-value').innerText = dadosProjeto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const badge = document.getElementById('display-status');
    
    if(dadosProjeto.status === 'Pendente') {
        badge.className = "status-badge status-pendente";
        badge.innerText = "Aguardando Análise do Cliente";
    } else if(dadosProjeto.status === 'Aceito') {
        badge.className = "status-badge status-aceito";
        badge.innerText = "✓ Proposta Aceita pelo Cliente";
    } else if(dadosProjeto.status === 'Recusado') {
        badge.className = "status-badge status-recusado";
        badge.innerText = "✕ Proposta Não Aceita";
    } else if(dadosProjeto.status === 'Contraproposta') {
        badge.className = "status-badge status-contraproposta";
        badge.innerText = `⇄ Contraproposta de ${Number(dadosProjeto.contrapropostaValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} enviada`;
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

// CHAVE MÁGICA: Abre seu painel de valores de forma discreta por comando de senha
function acessarPainelAdmin() {
    const senha = prompt("Digite a senha mestre de engenharia:");
    if (senha === "coppi2026") {
        document.getElementById('admin-panel').style.display = "block";
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
        alert("Acesso negado.");
    }
}

function adminAtualizarValor() {
    const novoValor = document.getElementById('admin-new-value').value;
    if(!novoValor) {
        alert("Digite um valor válido.");
        return;
    }

    dadosProjeto.valor = parseFloat(novoValor);
    dadosProjeto.status = 'Pendente'; 
    dadosProjeto.contrapropostaValor = '';
    dadosProjeto.contrapropostaTexto = '';

    localStorage.setItem('coppi_projeto', JSON.stringify(dadosProjeto));
    renderizarApp();
    document.getElementById('admin-new-value').value = '';
    document.getElementById('admin-panel').style.display = "none";
    alert("Orçamento atualizado com sucesso!");
}

// Inicializa a renderização direta do portal
renderizarApp();