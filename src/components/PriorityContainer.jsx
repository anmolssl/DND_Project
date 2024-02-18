import { SortableContext, useSortable } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import ItemCard from "./ItemCard";

const PriorityContainer = ({ title, id, priority, items, backToColumn }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: { type: "Priority", priority } });

  const itemsIds = useMemo(() => items.map((item) => item.id), [items]);

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          transition,
          backgroundColor: "white",
          // height: "50%",
          flex: "0.49",
          width: "300px",
          borderRadius: "8px",
          padding: "5px 10px",
          color: "black",
        }}
        {...attributes}
        {...listeners}
      >
        <h2 style={{ margin: "0" }}>{title}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <SortableContext items={itemsIds} id={id}>
            {items.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                item={item}
                backToColumn={(item) => {
                  backToColumn(item);
                }}
              >
                {item.content}
              </ItemCard>
            ))}
          </SortableContext>
        </div>
      </div>
    </>
  );
};

export default PriorityContainer;
