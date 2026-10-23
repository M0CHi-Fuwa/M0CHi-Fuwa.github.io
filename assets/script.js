document.addEventListener("DOMContentLoaded", () => {
  const toast = document.querySelector(".toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }
  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(value);
        showToast("已複製 Discord ID：" + value);
      } catch {
        showToast("Discord ID：" + value + "（請手動複製）");
      }
    });
  });
});
