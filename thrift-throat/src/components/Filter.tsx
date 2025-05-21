import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Filter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState<number | null>(null);
  const [currentOrder, setCurrentOrder] = useState("ascending");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const queryParamsRef = useRef(new URLSearchParams(location.search));

  const categories = [
    { id: 1, name: "cap" },
    { id: 2, name: "jacket" },
    { id: 3, name: "pants" },
    { id: 4, name: "shirt" },
    { id: 5, name: "long sleeve" },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderParam = queryParams.get("sort");
    const categoryParams = queryParams.getAll("category");

    setCurrentOrder(orderParam ?? "ascending");
    setSelectedCategories(categoryParams);
  }, [location.search]);

  const delayedNavigate = () => {
    navigate(`/products?${queryParamsRef.current.toString()}`);
  };

  const startTimer = () => {
    if (timer) clearTimeout(timer); // cancel previous timer
    const newTimer = setTimeout(delayedNavigate, 1000); // wait 1s then navigate
    setTimer(newTimer);
  };

  const updateURL = (newParams: Record<string, string | string[]>) => {
    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryParamsRef.current.delete(key);
        value.forEach((v) => queryParamsRef.current.append(key, v));
      } else {
        if (value === "") {
          queryParamsRef.current.delete(key);
        } else {
          queryParamsRef.current.set(key, value);
        }
      }
    });
    queryParamsRef.current.set("page", "1"); // Reset pagination
    startTimer(); // Every change restarts timer
  };

  const handleSort = (order: string) => {
    setCurrentOrder(order);
    updateURL({ sort: order });
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
    <>
      <div className="filterContainer">
        <h3 className="filterTitle">Filter</h3>

        <div className="sortFilterContainer">
          <div className="buttonContainer">
            <button
              className={`sortFilterButton ${
                currentOrder == "ascending" ? "activeSort" : ""
              }`}
              onClick={() => handleSort("ascending")}
            >
              Ascending
            </button>
            <button
              className={`sortFilterButton ${
                currentOrder == "descending" ? "activeSort" : ""
              }`}
              onClick={() => handleSort("descending")}
            >
              Descending
            </button>
          </div>
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
    </>
  );
}

export default Filter;
