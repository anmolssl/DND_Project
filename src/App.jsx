import React, { useMemo, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import ColumnContainer from "./components/ColumnContainer";
import { createPortal } from "react-dom";
import ItemCard from "./components/ItemCard";

const defColumns = [
  {
    id: "toDo",
    title: "Open",
  },
  {
    id: "inProgress",
    title: "In Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];

const defItems = [
  {
    id: 1,
    content: "Finance & Entrepreneurship",
    columnId: "toDo",
  },
  {
    id: 2,
    content: "Maths",
    columnId: "toDo",
  },
  {
    id: 3,
    content: "Commerce",
    columnId: "toDo",
  },
  {
    id: 4,
    content: "Science",
    columnId: "toDo",
  },
  {
    id: 5,
    content: "Language & Communication",
    columnId: "toDo",
  },
  {
    id: 6,
    content: "Space Tech",
    columnId: "inProgress",
  },
  {
    id: 7,
    content: "Robotics",
    columnId: "inProgress",
  },
  {
    id: 8,
    content: "Electronics",
    columnId: "inProgress",
  },
  {
    id: 9,
    content: "Graphic Novel",
    columnId: "completed",
  },
  {
    id: 10,
    content: "Yoga",
    columnId: "completed",
  },
  {
    id: 11,
    content: "Music",
    columnId: "completed",
  },
  {
    id: 12,
    content: "Dance",
    columnId: "completed",
  },
  {
    id: 13,
    content: "Guitar",
    columnId: "completed",
  },
];

export default function App() {
  const [columns, setColumns] = useState(defColumns);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const [items, setItems] = useState(defItems);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100vw",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* <h1>Kanban Board</h1> */}
      <DndContext
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
      >
        <div
          style={{
            width: "auto",
            // padding: 20,
            backgroundColor: "#e1f1f5",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflowX: "auto",
            overflowY: "hidden",
            borderRadius: "8px",
          }}
        >
          <div style={{ padding: "10px 14px", backgroundColor: "#0079bf" }}>
            <h2 style={{ color: "white", margin: 0, textAlign: "center" }}>
              Kanban Board
            </h2>
          </div>
          <div
            style={{
              padding: "5px 10px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  column={col}
                  items={items.filter((item) => item.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                id={activeColumn.id}
                title={activeColumn.title}
                column={activeColumn}
                items={items.filter(
                  (item) => item.columnId === activeColumn.id
                )}
              />
            )}
            {activeItem && (
              <ItemCard id={activeItem.id} item={activeItem}>
                {activeItem.content}
              </ItemCard>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Item") {
      setActiveItem(event.active.data.current?.item);
      return;
    }
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
  }

  function onDragOver(event) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAnItem = active.data.current.type === "Item";
    const isOverAnItem = over.data.current.type === "Item";

    if (!isActiveAnItem) return;

    if (isActiveAnItem && isOverAnItem) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === activeId);
        const overIndex = items.findIndex((item) => item.id === overId);

        if (items[activeIndex].columnId != items[overIndex].columnId) {
          items[activeIndex].columnId = items[overIndex].columnId;
          return arrayMove(items, activeIndex, overIndex - 1);
        }

        return arrayMove(items, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveAnItem && isOverAColumn) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === activeId);

        items[activeIndex].columnId = over.id;

        return arrayMove(items, activeIndex, activeIndex);
      });
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveItem(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";

    if (!isActiveAColumn) return;

    if (active.id !== over.id) {
      setColumns((columns) => {
        const oldIndex = columns.findIndex((col) => col.id === active.id);
        const newIndex = columns.findIndex((col) => col.id === over.id);

        return arrayMove(columns, oldIndex, newIndex);
      });
    }
  }
}
