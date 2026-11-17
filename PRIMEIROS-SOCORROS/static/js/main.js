(() => {
  const STORAGE_KEY = "primeirosSocorros.tarefas.v1";
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#task-list");
  const empty = document.querySelector("#task-empty");

  function loadTasks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }
  let tasks = loadTasks();
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

  function renderTasks() {
    if (!list) return;
    list.replaceChildren();
    if (empty) empty.hidden = tasks.length > 0;
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `task-item${task.done ? " done" : ""}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", `Concluir: ${task.text}`);
      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked; save(); renderTasks();
      });
      const label = document.createElement("span");
      label.textContent = task.text;
      const remove = document.createElement("button");
      remove.type = "button"; remove.className = "delete-task"; remove.textContent = "Excluir";
      remove.setAttribute("aria-label", `Excluir tarefa: ${task.text}`);
      remove.addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== task.id); save(); renderTasks();
      });
      li.append(checkbox, label, remove); list.append(li);
    });
  }
  if (form && input && list) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      tasks.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, done: false });
      save(); renderTasks(); form.reset(); input.focus();
    });
    renderTasks();
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.addEventListener("click", () => {
      const feedback = document.querySelector("#quiz-feedback");
      document.querySelectorAll(".answer").forEach(item => {
        item.classList.remove("correct", "incorrect");
        item.disabled = true;
      });
      const correct = button.dataset.correct === "true";
      button.classList.add(correct ? "correct" : "incorrect");
      if (feedback) feedback.textContent = correct
        ? "Muito bem! Segurança da cena e pedido de ajuda são prioridades."
        : "Não é essa. Primeiro observe se o local é seguro e acione ajuda.";
    });
  });
})();
