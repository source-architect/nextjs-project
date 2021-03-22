import { useState, useEffect } from "react";

import ItemCard from "./ItemCard/ItemCard";
import Loading from "../Loading/Loading";

//better solution for active category update (?)
export default function CardsMenu({
  menuData,
  orderData,
  toggleItemInOrder = () => {},
  increaseItemQuantity = () => {},
  decreaseItemQuantity = () => {},
}) {
  const [activeCategory, setActiveCategory] = useState("popular");

  const newActiveCategory = (category) => {
    //to reRender cards and start from the start of each scroll section
    setActiveCategory(null);
    setTimeout(() => {
      setActiveCategory(category);
    }, 1);
  };

  useEffect(() => {
    newActiveCategory("popular");
  }, [menuData]);

  if (menuData && Object.keys(menuData).includes(activeCategory))
    return (
      <div className="cards-menu h-100 d-flex flex-column">
        <div className="cards-categories">
          {Object.keys(menuData).map((categoryTitle) => {
            return (
              <div
                key={categoryTitle}
                className={`category${
                  activeCategory === categoryTitle ? " active" : ""
                }`}
                onClick={() => newActiveCategory(categoryTitle)}
              >
                {categoryTitle}
              </div>
            );
          })}
        </div>
        <div className="cards-container">
          <div
            className="flex-fill d-inline-block"
            // style={{ transform: "translateX(-320px)" }}
          >
            {menuData[activeCategory].map((item) => {
              const itemOrderInfo = orderData
                ? orderData.items.find(
                    (orderedItem) => orderedItem._id === item._id
                  )
                : null;
              return (
                <ItemCard
                  key={item._id}
                  itemData={item}
                  toggleItemInOrder={toggleItemInOrder}
                  itemOrderInfo={itemOrderInfo}
                  increaseItemQuantity={increaseItemQuantity}
                  decreaseItemQuantity={decreaseItemQuantity}
                />
              );
            })}
          </div>
        </div>
      </div>
    );

  return <Loading />;
}
