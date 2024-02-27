import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import ItemCard from "./ItemCard";

export default function ColumnContainer({ id, title, column, items }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: { type: "Column", column } });

  const itemsIds = useMemo(() => items.map((item) => item.id), [items]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          transition,
          backgroundColor: "lightblue",
          width: "400px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          opacity: 0.5,
          borderRadius: "8px",
        }}
        {...attributes}
        {...listeners}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <h2
            style={{
              color: "darkslategray",
              margin: "0",
              marginBottom: "10px",
            }}
          >
            {title}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            gap: "5px",
            borderRadius: "8px",
            padding: "10px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {items.map((item) => (
            <ItemCard key={item.id} id={item.id} item={item}>
              {item.content}
            </ItemCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
        backgroundColor: "lightblue",
        width: "400px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        borderRadius: "8px",
      }}
      {...attributes}
      {...listeners}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <h2
          style={{ color: "darkslategray", margin: "0", marginBottom: "10px" }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          gap: "10px",
          padding: "10px",
          borderRadius: "8px",
          overflowY: "auto",
          flex: 1,
        }}
      >
        <SortableContext items={itemsIds} id={id}>
          {items.map((item) => (
            <ItemCard key={item.id} id={item.id} item={item}>
              {item.content}
            </ItemCard>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
