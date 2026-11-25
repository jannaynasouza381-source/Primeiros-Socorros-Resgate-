// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. MENU MOBILE INTERATIVO
    // =========================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('ativo');
    });

    // Fecha o menu ao clicar em um link (útil no celular)
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('ativo');
        });
    });

    // =========================================================
    // 2. STATUS DE FUNCIONAMENTO DA OFICINA EM TEMPO REAL
    // Seg a Sex: 07:00 às 18:00 | Sábado: 07:00 às 13:00
    // =========================================================
    function atualizarStatusOficina() {
        const badge = document.getElementById('status-oficina');
        const agora = new Date();
        const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Seg, ..., 6 = Sáb
        const horaAtual = agora.getHours() + agora.getMinutes() / 60;

        let aberto = false;

        if (diaSemana >= 1 && diaSemana <= 5) {
            // Segunda a Sexta (07:00 às 18:00)
            if (horaAtual >= 7 && horaAtual < 18) {
                aberto = true;
            }
        } else if (diaSemana === 6) {
            // Sábado (07:00 às 13:00)
            if (horaAtual >= 7 && horaAtual < 13) {
                aberto = true;
            }
        }

        if (aberto) {
            badge.textContent = 'Oficina Aberta Agora';
            badge.className = 'status-badge status-aberto';
        } else {
            badge.textContent = 'Oficina Fechada no Momento';
            badge.className = 'status-badge status-fechado';
        }
    }
    atualizarStatusOficina();

    // =========================================================
    // 3. FILTRO DE PRODUTOS DA LOJA VIRTUAL
    // =========================================================
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cardsProdutos = document.querySelectorAll('.produto-card');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Atualiza classe ativa nos botões
            botoesFiltro.forEach(btn => btn.classList.remove('active'));
            botao.classList.add('active');

            const categoriaSelecionada = botao.getAttribute('data-categoria');

            cardsProdutos.forEach(card => {
                const categoriaProduto = card.getAttribute('data-categoria');
                if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaProduto) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // =========================================================
    // 4. CARRINHO DE COMPRAS LOCAL (LOJA VIRTUAL)
    // =========================================================
    let carrinho = [];
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const modalCarrinho = document.getElementById('modal-carrinho');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const listaItensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinhoTexto = document.getElementById('total-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    // Formata valores para Real Brasileiro
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Atualiza a exibição do carrinho
    function renderizarCarrinho() {
        contadorCarrinho.textContent = carrinho.length;
        listaItensCarrinho.innerHTML = '';

        if (carrinho.length === 0) {
            listaItensCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
            totalCarrinhoTexto.textContent = 'R$ 0,00';
            return;
        }

        let somaTotal = 0;

        carrinho.forEach((item, index) => {
            somaTotal += item.preco;

            const divItem = document.createElement('div');
            divItem.className = 'item-carrinho';
            divItem.innerHTML = `
                <div>
                    <strong>${item.nome}</strong><br>
                    <small>${formatarMoeda(item.preco)}</small>
                </div>
                <button class="btn-remover" data-index="${index}">Remover</button>
            `;
            listaItensCarrinho.appendChild(divItem);
        });

        totalCarrinhoTexto.textContent = formatarMoeda(somaTotal);

        // Adiciona evento de remover em cada botão
        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                carrinho.splice(idx, 1);
                renderizarCarrinho();
            });
        });
    }

    // Adicionar produto ao carrinho
    document.querySelectorAll('.btn-add').forEach(botao => {
        botao.addEventListener('click', () => {
            const nome = botao.getAttribute('data-nome');
            const preco = parseFloat(botao.getAttribute('data-preco'));

            carrinho.push({ nome, preco });
            renderizarCarrinho();

            // Feedback visual rápido no botão
            const textoOriginal = botao.textContent;
            botao.textContent = 'Adicionado!';
            botao.style.backgroundColor = '#04d361';
            setTimeout(() => {
                botao.textContent = textoOriginal;
                botao.style.backgroundColor = '';
            }, 900);
        });
    });

    abrirCarrinhoBtn.addEventListener('click', () => modalCarrinho.classList.add('aberto'));
    fecharCarrinhoBtn.addEventListener('click', () => modalCarrinho.classList.remove('aberto'));

    finalizarCompraBtn.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Adicione pelo menos uma peça ao carrinho antes de finalizar.');
            return;
        }
        alert(`Pedido confirmado na Gotham Garagem! Total: ${totalCarrinhoTexto.textContent}. Retire na loja ou aguarde nosso contato.`);
        carrinho = [];
        renderizarCarrinho();
        modalCarrinho.classList.remove('aberto');
    });

    // =========================================================
    // 5. CALCULADORA / SIMULADOR DE ORÇAMENTO DE SERVIÇOS
    // =========================================================
    const checkboxesServicos = document.querySelectorAll('.servico-check');
    const valorSimuladorTexto = document.getElementById('valor-simulador');
    const limparSimuladorBtn = document.getElementById('limpar-simulador');

    function calcularOrcamento() {
        let total = 0;
        checkboxesServicos.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.value);
            }
        });
        valorSimuladorTexto.textContent = formatarMoeda(total);
    }

    checkboxesServicos.forEach(checkbox => {
        checkbox.addEventListener('change', calcularOrcamento);
    });

    limparSimuladorBtn.addEventListener('click', () => {
        checkboxesServicos.forEach(checkbox => checkbox.checked = false);
        calcularOrcamento();
    });

    // =========================================================
    // 6. FORMULÁRIO DE AGENDAMENTO COM VALIDAÇÃO
    // =========================================================
    const formAgendamento = document.getElementById('form-agendamento');
    const mensagemForm = document.getElementById('mensagem-form');

    formAgendamento.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const moto = document.getElementById('moto').value.trim();
        const dataServico = document.getElementById('data-servico').value;

        // Validação básica dos campos obrigatórios
        if (nome.length < 3) {
            exibirMensagem('Por favor, informe seu nome completo.', 'erro');
            return;
        }

        if (telefone.length < 8) {
            exibirMensagem('Informe um número de telefone válido com DDD.', 'erro');
            return;
        }

        if (!moto) {
            exibirMensagem('Informe o modelo da sua motocicleta.', 'erro');
            return;
        }

        if (!dataServico) {
            exibirMensagem('Selecione uma data para o agendamento.', 'erro');
            return;
        }

        // Verifica se a data escolhida cai em um domingo (oficina fechada)
        const dataEscolhida = new Date(dataServico + 'T12:00:00');
        if (dataEscolhida.getDay() === 0) {
            exibirMensagem('A Gotham Garagem não abre aos domingos. Escolha uma data de segunda a sábado.', 'erro');
            return;
        }

        exibirMensagem(`Agendamento confirmado para ${nome} (${moto}) na data ${dataServico.split('-').reverse().join('/')}. Entraremos em contato!`, 'sucesso');
        formAgendamento.reset();
    });

    function exibirMensagem(texto, tipo) {
        mensagemForm.textContent = texto;
        mensagemForm.className = `mensagem-feedback ${tipo}`;
    }
});