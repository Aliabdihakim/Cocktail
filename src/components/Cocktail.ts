import { component, html } from "haunted";

interface Cocktail {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

interface CocktailProps {
  cocktail: Cocktail;
  onAddToShoppingList: (cocktail: Cocktail) => void;
}

function Cocktail({ cocktail, onAddToShoppingList }: CocktailProps) {
  return html`
    <div
      style="display: flex; flex-direction: row; gap: 1rem; border: 1px solid #ddd; background: white; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;"
    >
      <img
        src=${cocktail.strDrinkThumb}
        alt=${cocktail.strDrink}
        style="border-radius: 4px; max-width: 100px; max-height: 100px;"
      />
      <div
        style="display: flex-direction: coloumn; flex; align-items: center; gap: 1rem;"
      >
        <div style="flex: 1;">
          <h3 style="margin: 0; color: black;">${cocktail.strDrink}</h3>
          <p style="margin: 0.5rem 0; color: #555;">
            ${cocktail.strInstructions}
          </p>
        </div>
        <button
          @click=${() => onAddToShoppingList(cocktail)}
          style="background-color: white; color: black; border: 1px solid black; border-radius: 4px; font-size: 1rem; cursor: pointer; padding: 0.5rem 1rem; margin-left: auto;"
          onmouseover="this.style.backgroundColor='#f0f0f0';"
          onmouseout="this.style.backgroundColor='white';"
        >
          +
        </button>
      </div>
    </div>
  `;
}

customElements.define(
  "cocktail-result",
  component(Cocktail, { useShadowDOM: false })
);
