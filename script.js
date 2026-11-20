// Interações do site Socorrista Janaina — sem servidor ou bibliotecas externas.
document.addEventListener("DOMContentLoaded", () => {
  const guidancePanel = document.getElementById("guidancePanel");

  // Menu responsivo para celulares.
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  }));

  // Orientações iniciais resumidas por situação.
  const cases = {
    cardiaca: {
      title: "Suspeita de parada cardíaca",
      steps: [
        "Garanta que o local esteja seguro. Verifique se a pessoa responde e se respira normalmente por até 10 segundos.",
        "Se não responder e não respirar normalmente (ou apenas apresentar suspiros), peça a alguém para ligar 192 e buscar um DEA, se houver.",
        "Comece compressões no centro do tórax, fortes e rápidas, se souber realizar. Siga as instruções do atendente do SAMU.",
        "Use o DEA assim que disponível e siga as instruções de voz do aparelho."
      ],
      urgent: "Ligue 192 imediatamente. Não perca tempo tentando confirmar pulso se você não é profissional treinado."
    },
    sangramento: {
      title: "Sangramento intenso",
      steps: [
        "Proteja-se, se possível, com luvas ou uma barreira limpa e segura.",
        "Aplique pressão firme e contínua diretamente sobre o ferimento com gaze ou pano limpo.",
        "Se o material encharcar, não retire a primeira camada; mantenha a pressão e acrescente outro material por cima.",
        "Não retire objetos cravados. Pressione ao redor e aguarde o socorro."
      ],
      urgent: "Sangramento intenso, jato de sangue, desmaio ou piora rápida: ligue 192. Em hemorragia grave em membro, siga as orientações do atendente."
    },
    queimadura: {
      title: "Queimadura",
      steps: [
        "Afaste a pessoa da fonte de calor sem colocar você mesmo em risco.",
        "Resfrie a área com água corrente fresca por 20 minutos, se possível. Não use gelo.",
        "Retire anéis, relógios e roupas próximas que não estejam grudadas à pele.",
        "Cubra frouxamente com gaze ou pano limpo. Não estoure bolhas nem aplique pasta de dente, manteiga ou pomadas caseiras."
      ],
      urgent: "Queimadura extensa, profunda, elétrica, química, no rosto ou vias aéreas: procure atendimento urgente e ligue 192/193 conforme a situação."
    },
    engasgo: {
      title: "Engasgo",
      steps: [
        "Se a pessoa consegue tossir e falar, incentive a tosse e observe. Não dê água nem tente retirar algo às cegas.",
        "Se não consegue falar, respirar ou tossir de forma eficaz, peça ajuda e ligue 192.",
        "As manobras para desobstrução variam conforme idade, gravidez e condição da pessoa. Siga imediatamente as instruções do atendente e use técnicas aprendidas em treinamento.",
        "Se a pessoa perder a consciência, coloque-a com cuidado no chão e siga as instruções do atendente para iniciar RCP."
      ],
      urgent: "Engasgo grave é emergência. Ligue 192. Não faça varredura às cegas com os dedos na boca."
    },
    convulsao: {
      title: "Durante uma convulsão",
      steps: [
        "Afaste móveis e objetos perigosos e proteja a cabeça com algo macio.",
        "Marque o tempo. Não segure os movimentos e não coloque nada na boca.",
        "Quando os movimentos terminarem, se estiver respirando, coloque a pessoa de lado e observe a respiração.",
        "Permaneça ao lado dela até se recuperar e explique o que aconteceu."
      ],
      urgent: "Ligue 192 se durar mais de 5 minutos, repetir sem recuperação, for a primeira crise, houver ferimento, gravidez, dificuldade para respirar ou ocorrer na água."
    },
    fratura: {
      title: "Suspeita de fratura",
      steps: [
        "Evite movimentar a região lesionada e mantenha a pessoa confortável.",
        "Não tente colocar o osso no lugar nem endireitar deformidades.",
        "Se houver ferida, cubra com pano limpo sem pressionar diretamente um osso exposto.",
        "Aplique compressa fria envolta em tecido, sem colocar gelo diretamente na pele, se isso não causar dor."
      ],
      urgent: "Trauma grave, deformidade importante, osso exposto, perda de sensibilidade, sangramento ou suspeita de lesão na coluna: ligue 192/193 e não movimente a pessoa."
    }
  };

  document.querySelectorAll(".case-button").forEach(button => {
    button.addEventListener("click", () => {
      const item = cases[button.dataset.case];
      if (!item) return;
      guidancePanel.replaceChildren();
      const heading = document.createElement("h3");
      heading.textContent = item.title;
      const list = document.createElement("ul");
      item.steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        list.appendChild(li);
      });
      const warning = document.createElement("p");
      warning.className = "urgent";
      warning.textContent = item.urgent;
      guidancePanel.append(heading, list, warning);
      guidancePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // Abas com conteúdo educativo sobre manobras.
  const maneuvers = {
    rcp: {
      kicker: "MANOBRA 01",
      title: "Ressuscitação cardiopulmonar (RCP) — adulto",
      steps: [
        "Verifique se o local está seguro e chame a pessoa em voz alta.",
        "Se não responder e não respirar normalmente, peça para alguém ligar 192 e buscar um DEA, se disponível.",
        "Coloque a pessoa deitada de costas em superfície firme. Inicie compressões no centro do tórax, fortes e rápidas, se souber realizar.",
        "Continue até a chegada do socorro, retorno de sinais de vida ou exaustão. Siga as instruções do atendente do SAMU."
      ],
      note: "Treinamento prático é essencial. Se não tiver treinamento, ligue 192 e siga as instruções do atendente; compressões somente no tórax são melhores do que não agir."
    },
    pressao: {
      kicker: "MANOBRA 02",
      title: "Pressão direta em ferimentos",
      steps: [
        "Certifique-se de que o local é seguro e use luvas ou uma barreira, se disponíveis.",
        "Coloque gaze ou pano limpo sobre o ferimento.",
        "Pressione com firmeza e sem interrupção. Peça ajuda a outra pessoa para acionar 192 se o sangramento for intenso.",
        "Não remova objetos presos no ferimento; mantenha a pressão ao redor deles até a chegada do socorro."
      ],
      note: "Não remova curativos já encharcados para verificar o ferimento. Hemorragia grave exige atendimento de emergência."
    },
    queimadura: {
      kicker: "MANOBRA 03",
      title: "Primeiros cuidados em queimaduras",
      steps: [
        "Interrompa o contato com a fonte de calor, desde que seja seguro.",
        "Resfrie a queimadura com água corrente fresca por 20 minutos, se possível.",
        "Retire joias e acessórios próximos antes que a região inche, mas não puxe tecidos grudados.",
        "Cubra frouxamente com material limpo e procure avaliação conforme a gravidade."
      ],
      note: "Não use gelo, pasta de dente, manteiga, óleo ou receitas caseiras. Queimaduras extensas, profundas, químicas ou elétricas precisam de avaliação urgente."
    },
    convulsao: {
      kicker: "MANOBRA 04",
      title: "Como proteger alguém durante uma convulsão",
      steps: [
        "Afaste objetos que possam causar ferimentos e proteja a cabeça.",
        "Marque a duração da crise e não tente conter os movimentos.",
        "Não coloque dedos, objetos, líquidos ou medicamentos na boca.",
        "Após a crise, se a pessoa estiver respirando, coloque-a de lado e permaneça ao lado dela."
      ],
      note: "Ligue 192 se a crise durar mais de 5 minutos, repetir, for a primeira, houver lesão, gravidez ou dificuldade respiratória."
    }
  };
  const maneuverContent = document.getElementById("maneuverContent");
  document.querySelectorAll(".maneuver-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".maneuver-tab").forEach(other => {
        other.classList.remove("active");
        other.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const item = maneuvers[tab.dataset.tab];
      maneuverContent.replaceChildren();
      const kicker = document.createElement("span");
      kicker.className = "content-kicker";
      kicker.textContent = item.kicker;
      const title = document.createElement("h3");
      title.textContent = item.title;
      const list = document.createElement("ol");
      item.steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        list.appendChild(li);
      });
      const note = document.createElement("p");
      note.className = "caution";
      const strong = document.createElement("strong");
      strong.textContent = "Atenção: ";
      note.append(strong, document.createTextNode(item.note));
      maneuverContent.append(kicker, title, list, note);
    });
  });

  // Assistente local: identifica palavras-chave e retorna conteúdo fixo.
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const replyRules = [
    { keys: ["inconsciente", "desmai", "não acorda", "nao acorda", "não responde", "nao responde", "parada", "não respira", "nao respira"], reply: "Se a pessoa não responde e não respira normalmente, ligue 192 agora. Garanta que o local esteja seguro, peça um DEA se houver e siga as instruções do atendente. Se souber, inicie compressões no centro do tórax." },
    { keys: ["sangra", "sangramento", "hemorragia", "cortou", "ferimento"], reply: "Para sangramento: use uma barreira de proteção e faça pressão firme e contínua diretamente no ferimento com gaze ou pano limpo. Não retire objetos cravados. Se for intenso ou não parar, ligue 192." },
    { keys: ["engas", "ental", "garganta"], reply: "Se consegue tossir e falar, incentive a tosse. Se não consegue respirar, falar ou tossir, ligue 192 imediatamente e siga as orientações do atendente. Não faça varredura às cegas com os dedos." },
    { keys: ["queim", "água quente", "agua quente", "fogo"], reply: "Afaste a pessoa da fonte de calor com segurança e resfrie a região com água corrente fresca por 20 minutos, se possível. Não use gelo nem receitas caseiras. Queimadura extensa, profunda, elétrica ou química precisa de atendimento urgente." },
    { keys: ["convuls", "ataque epil"], reply: "Afaste objetos, proteja a cabeça e marque o tempo. Não segure a pessoa e não coloque nada na boca. Após a crise, se respirar, coloque-a de lado. Ligue 192 se durar mais de 5 minutos, repetir ou houver sinais de gravidade." },
    { keys: ["fratura", "quebrou", "osso", "torceu"], reply: "Evite movimentar a região, não tente colocar o osso no lugar e não force a pessoa a andar. Em trauma grave, deformidade, osso exposto ou perda de sensibilidade, ligue 192/193." }
  ];

  function addMessage(text, type) {
    const bubble = document.createElement("div");
    bubble.className = `message ${type === "user" ? "user-message" : "bot-message"}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function getReply(message) {
    const normalized = message.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const found = replyRules.find(rule => rule.keys.some(key => normalized.includes(key.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
    return found ? found.reply : "Não consegui identificar com segurança a situação descrita. Se houver risco de vida, ligue 192 (SAMU) ou 193 (Bombeiros) agora. Diga ao atendente o endereço, o que aconteceu e como a pessoa está. Este assistente é automático e não substitui orientação profissional.";
  }
  function sendChatMessage(message) {
    const clean = message.trim();
    if (!clean) return;
    addMessage(clean, "user");
    addMessage(getReply(clean), "bot");
  }
  chatForm.addEventListener("submit", event => {
    event.preventDefault();
    sendChatMessage(chatInput.value);
    chatInput.value = "";
    chatInput.focus();
  });
  document.querySelectorAll("[data-prompt]").forEach(button => {
    button.addEventListener("click", () => sendChatMessage(button.dataset.prompt));
  });

  // Organiza as informações para a pessoa ler ao falar com o atendente.
  const emergencyForm = document.getElementById("emergencyForm");
  const callSummary = document.getElementById("callSummary");
  emergencyForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("callerName").value.trim() || "Não informado";
    const place = document.getElementById("callerPlace").value.trim() || "Não informado";
    const situation = document.getElementById("callerSituation").value.trim() || "Não informado";
    callSummary.textContent = `RESUMO PARA INFORMAR AO ATENDENTE\nNome: ${name}\nCidade/endereço: ${place}\nO que está acontecendo: ${situation}\n\nLembre-se: ligue diretamente para 192 (SAMU) ou 193 (Bombeiros).`;
    callSummary.hidden = false;
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
