import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Filter() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentFrom, setCurrentFrom] = useState(""); // empty by default
  const [currentTo, setCurrentTo] = useState(""); // empty by default
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // none selected

  const categories = [
    { id: 1, name: "cap" },
    { id: 2, name: "jacket" },
    { id: 3, name: "pants" },
    { id: 4, name: "shirt" },
  ];

  // Sync with URL params on load or URL change
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fromParam = queryParams.get("from");
    const toParam = queryParams.get("to");
    const categoryParams = queryParams.getAll("category");

    setCurrentFrom(fromParam ?? "");
    setCurrentTo(toParam ?? "");
    setSelectedCategories(categoryParams);
  }, [location.search]);

  const updateURL = (newParams: Record<string, string | string[]>) => {
    const queryParams = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryParams.delete(key);
        value.forEach((v) => queryParams.append(key, v));
      } else {
        if (value === "") {
          queryParams.delete(key);
        } else {
          queryParams.set(key, value);
        }
      }
    });

    queryParams.set("page", "1"); // Reset pagination
    navigate(`/products?${queryParams.toString()}`);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    const value = e.target.value;
    if (type === "from") setCurrentFrom(value);
    if (type === "to") setCurrentTo(value);

    updateURL({
      from: type === "from" ? value : currentFrom,
      to: type === "to" ? value : currentTo,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    let updated = [...selectedCategories];
    if (isChecked) {
      updated.push(value);
    } else {
      updated = updated.filter((v) => v !== value);
    }

    setSelectedCategories(updated);
    updateURL({ category: updated });
  };

  return (
    <div className="filterContainer">
      <h3 className="filterTitle">Filter</h3>

      <div className="priceFilterContainer">
        <h4 className="priceFilterTitle">Price</h4>
        <input
          type="number"
          className="from"
          min={0}
          max={5000}
          value={currentFrom}
          onChange={(e) => handlePriceChange(e, "from")}
        />
        -
        <input
          type="number"
          className="to"
          min={0}
          max={5000}
          value={currentTo}
          onChange={(e) => handlePriceChange(e, "to")}
        />
      </div>

      <div className="categoryFilterContainer">
        <h4 className="categoryFilterTitle">Category</h4>
        {categories.map((category) => (
          <div key={category.id} className="categories">
            <input
              type="checkbox"
              className="category"
              value={category.name}
              checked={selectedCategories.includes(category.name)}
              onChange={handleCategoryChange}
            />
            <label className="categoryLabel">{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
