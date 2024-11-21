import { component, html } from "haunted";

type ShoppingListProps = {
  items: string[];
  onRemove: (item: string) => void;
};

function ShoppingList({ items, onRemove }: ShoppingListProps) {
  const printShoppingList = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Shopping List</title>
          </head>
          <body>
            <h1>Shopping List</h1>
            <ul>
              ${items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return html`
    <div
      class="shopping-list"
      style="background-color: #f8f9fa; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; height: auto; min-height: 300px; min-width: 300px; overflow-y: auto;"
    >
      <h2>Shopping List</h2>
      <ul style="list-style: none; padding: 0;">
        ${items.map(
          (item) => html`
            <li
              style="margin-bottom: 0.5rem; font-size: 0.9rem; display: flex; justify-content: space-between; align-items: center;"
            >
              <span>${item}</span>
              <button
                @click=${() => onRemove(item)}
                style="background-color: red; color: white; border: none; border-radius: 4px; padding: 0.3rem 0.6rem; cursor: pointer; font-size: 0.8rem;"
              >
                -
              </button>
            </li>
          `
        )}
      </ul>
      <button
        @click=${printShoppingList}
        style="background-color: black; color: white; border: none; border-radius: 4px; padding: 0.5rem; cursor: pointer; font-size: 0.9rem; margin-top: 1rem;"
      >
        Print
      </button>
    </div>
  `;
}

customElements.define(
  "shopping-list",
  component(ShoppingList, { useShadowDOM: false })
);
