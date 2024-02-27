import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import "./ItemCard.css";

const ItemCard = ({ id, children, item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: "Item", item } });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          zIndex: 99,
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          transition,
          backgroundColor: "lightblue",
          borderRadius: "10px",
          padding: "0 8px",
          opacity: 0.5,
          minHeight: "99px",
        }}
      >
        <h3 style={{ color: "black", margin: 0 }}>{children}</h3>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
        backgroundColor: "lightblue",
        border: `1px solid lightgreen`,
        borderRadius: "6px",
        padding: "0 8px",
        minHeight: "99px",
      }}
    >
      <h3 style={{ color: "black", margin: 0 }}>{children}</h3>
    </div>
  );
};

export default ItemCard;
