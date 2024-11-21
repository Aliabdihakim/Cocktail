import { component, html, useState } from "haunted";
import "./components/Cocktail";
import "./components/ShoppingList";

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const fetchCocktails = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMessage("Please enter a cocktail name.");
      setMessageType("error");
      setResults([]);
      return;
    }

    setMessage("Searching...");
    setMessageType("info");
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();

      if (data.drinks) {
        setResults(data.drinks);
        setMessage("Here are your results.");
        setMessageType("success");
      } else {
        setResults([]);
        setMessage("No results found.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error fetching cocktails:", error);
      setMessage("An error occurred while fetching results.");
      setMessageType("error");
    }
  };

  const addToShoppingList = (cocktail: any) => {
    const ingredients: string[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) ingredients.push(ingredient);
    }

    setShoppingList((prev = []) =>
      Array.from(new Set([...prev, ...ingredients]))
    );
    setMessage("Ingredients added to shopping list.");
    setMessageType("success");
  };

  const removeFromShoppingList = (ingredient: string) => {
    setShoppingList((prev = []) => prev.filter((item) => item !== ingredient));
    setMessage("Ingredient removed from shopping list.");
    setMessageType("info");
  };

  const getMessageStyle = () => {
    switch (messageType) {
      case "success":
        return "color: green; background-color: #eafbea; border: 1px solid green; padding: 0.5rem; margin-top: 1rem; border-radius: 4px;";
      case "error":
        return "color: red; background-color: #fdecea; border: 1px solid red; padding: 0.5rem; margin-top: 1rem; border-radius: 4px;";
      case "info":
        return "color: #0056b3; background-color: #eaf2fa; border: 1px solid #0056b3; padding: 0.5rem; margin-top: 1rem; border-radius: 4px;";
      default:
        return "";
    }
  };

  console.log({ results });

  return html`
    <div style="font-family: Arial, sans-serif; margin: 1rem;">
      <div style="margin-bottom: 1rem;">
        <h1>Cocktail Assistant</h1>
        <div>
          <input
            type="text"
            placeholder="Search for a cocktail..."
            style="padding: 0.5rem; width: 80%; margin-right: 1rem; border: 1px solid #ddd; border-radius: 4px;"
            @input=${(e: Event) =>
              setQuery((e.target as HTMLInputElement).value)}
          />
          <button
            @click=${() => fetchCocktails(query)}
            style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Search
          </button>
        </div>
      </div>

      <div
        class="container"
        style="display: grid; grid-template-columns: 4fr 1fr; gap: 1rem;"
      >
        <div class="cocktails">
          <div>
            ${results.map(
              (cocktail) => html`
                <cocktail-result
                  .cocktail=${cocktail}
                  .onAddToShoppingList=${addToShoppingList}
                ></cocktail-result>
              `
            )}
          </div>
        </div>

        <div>
          <shopping-list
            .items=${shoppingList}
            .onRemove=${removeFromShoppingList}
          ></shopping-list>
          ${message
            ? html`<p style="${getMessageStyle()} max-width:400px">
                ${message}
              </p>`
            : ""}
        </div>
      </div>
    </div>
  `;
}

customElements.define("app-component", component(App));
