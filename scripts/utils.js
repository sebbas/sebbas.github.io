// ========================================
// MARKDOWN TASK LISTS
// Enhances Markdown checklists with persistent checkbox states,
// clickable labels, improved spacing, and automatic strikethrough.
// ========================================

document.querySelectorAll(".task-list-item").forEach((item, index) => {
  const checkbox = item.querySelector("input[type='checkbox']");
  if (!checkbox) return;

  const key = location.pathname + "-task-" + index;

  // Remove list indentation and bullets
  const ul = item.closest("ul");
  if (ul) {
    ul.style.listStyle = "none";
    ul.style.paddingLeft = "0";
  }

  // Enable checkbox
  checkbox.disabled = false;

  // Add spacing between checkbox and text
  checkbox.style.marginRight = "8px";

  // Make text clickable by wrapping everything in a label
  if (!checkbox.closest("label")) {
    const label = document.createElement("label");

    checkbox.parentNode.insertBefore(label, checkbox);
    label.appendChild(checkbox);

    while (label.nextSibling) {
      label.appendChild(label.nextSibling);
    }

    label.style.cursor = "pointer";
  }

  // Restore saved state
  checkbox.checked = localStorage.getItem(key) === "true";

  // Apply strikethrough
  item.style.textDecoration = checkbox.checked ? "line-through" : "none";

  // Save changes
  checkbox.addEventListener("change", function () {
    localStorage.setItem(key, this.checked);

    item.style.textDecoration = this.checked ? "line-through" : "none";
  });
});
