import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import "./ItemCard.css";
import { useEffect } from "react";

const ItemCard = ({ id, children, item, backToColumn }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: "Item", item } });

  let backgroundColor;
  let borderColor;
  {
    if (item.columnIdColor === "Core") {
      backgroundColor = "lightgreen";
      borderColor = "green";
    } else if (item.columnIdColor === "Special") {
      backgroundColor = "#f3dbdb";
      borderColor = "red";
    } else if (item.columnIdColor === "Creative") {
      backgroundColor = "#fbddfa";
      borderColor = "#cf39c8";
    }
  }

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
          height: "30px",
          backgroundColor: backgroundColor,
          borderRadius: "10px",
          padding: "0 9px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: 0.5,
          position: "relative",
        }}
      >
        <h3 style={{ color: "black" }}>{children}</h3>
        {item.priorityId !== "none" && (
          <button
            style={{
              height: "20px",
              width: "20px",
              padding: "0px",
              borderRadius: "2px",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
            className="itemCardDeleteBtn"
            onMouseDown={() => {
              backToColumn(item);
            }}
          >
            <h6 style={{ margin: 0 }}>X</h6>
          </button>
        )}
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
        height: "30px",
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "6px",
        padding: "0 8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        minWidth: item.priorityId !== "none" && "280px",
        maxWidth: item.priorityId === "none" && "fit-content",
      }}
    >
      <h3 style={{ color: "black" }}>{children}</h3>
      {item.priorityId !== "none" && (
        <button
          style={{
            height: "20px",
            width: "20px",
            padding: "0px",
            borderRadius: "2px",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
          className="itemCardDeleteBtn"
          onMouseDown={() => {
            backToColumn(item);
          }}
        >
          <h6 style={{ margin: 0 }}>X</h6>
        </button>
      )}
    </div>
  );
};

export default ItemCard;
