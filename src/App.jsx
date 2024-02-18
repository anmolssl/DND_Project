import React, { useEffect, useMemo, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import ColumnContainer from "./components/ColumnContainer";
import { createPortal } from "react-dom";
import ItemCard from "./components/ItemCard";
import PriorityContainer from "./components/PriorityContainer";

const defColumns = [
  {
    id: "Core",
    title: "Core",
  },
  {
    id: "Special",
    title: "Special",
  },
  {
    id: "Creative",
    title: "Creative",
  },
];

const defPriorites = [
  {
    id: "SchoolPriority",
    title: "School Priority",
  },
  {
    id: "HomePriority",
    title: "Home Priority",
  },
];

const defItems = [
  {
    id: 1,
    content: "Finance & Entrepreneurship",
    columnId: "Core",
    columnIdColor: "Core",
    priorityId: "none",
  },
  {
    id: 2,
    content: "Maths",
    columnId: "Core",
    columnIdColor: "Core",
    priorityId: "none",
  },
  {
    id: 3,
    content: "Commerce",
    columnId: "Core",
    columnIdColor: "Core",
    priorityId: "none",
  },
  {
    id: 4,
    content: "Science",
    columnId: "Core",
    columnIdColor: "Core",
    priorityId: "none",
  },
  {
    id: 5,
    content: "Language & Communication",
    columnId: "Core",
    columnIdColor: "Core",
    priorityId: "none",
  },
  {
    id: 6,
    content: "Space Tech",
    columnId: "Special",
    columnIdColor: "Special",
    priorityId: "none",
  },
  {
    id: 7,
    content: "Robotics",
    columnId: "Special",
    columnIdColor: "Special",
    priorityId: "none",
  },
  {
    id: 8,
    content: "Electronics",
    columnId: "Special",
    columnIdColor: "Special",
    priorityId: "none",
  },
  {
    id: 9,
    content: "Graphic Novel",
    columnId: "Creative",
    columnIdColor: "Creative",
    priorityId: "none",
  },
  {
    id: 10,
    content: "Yoga",
    columnId: "Creative",
    columnIdColor: "Creative",
    priorityId: "none",
  },
  {
    id: 11,
    content: "Music",
    columnId: "Creative",
    columnIdColor: "Creative",
    priorityId: "none",
  },
  {
    id: 12,
    content: "Dance",
    columnId: "Creative",
    columnIdColor: "Creative",
    priorityId: "none",
  },
  {
    id: 13,
    content: "Guitar",
    columnId: "Creative",
    columnIdColor: "Creative",
    priorityId: "none",
  },
];

export default function App() {
  const [columns, setColumns] = useState(defColumns);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const [priorities, setPriorities] = useState(defPriorites);

  const [items, setItems] = useState(defItems);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  console.log("items", items);

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
            height: 700,
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
          <div style={{ padding: "10px 14px", backgroundColor: "#2232a9" }}>
            <h3 style={{ color: "white", margin: 0 }}>School Level</h3>
          </div>
          <div
            style={{
              padding: "5px 10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#61b742",
                height: "120px",
                width: "240px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                justifyContent: "space-between",
              }}
              onClick={() => {
                console.log("hello");
              }}
            >
              <h2>Level 0</h2>
              <h2> {"-->"} </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            height: 700,
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
          <div style={{ padding: "10px 14px", backgroundColor: "#2232a9" }}>
            <h3 style={{ color: "white", margin: 0 }}>Skills Selected</h3>
          </div>
          <div
            style={{
              padding: "5px 10px",
              display: "flex",
              flexDirection: "column",
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

        <div
          style={{
            height: 700,
            width: "auto",
            // padding: 20,
            backgroundColor: "#e1f1f5",
            display: "flex",
            flexDirection: "column",
            overflowX: "auto",
            overflowY: "hidden",
            borderRadius: "8px",
          }}
        >
          <div style={{ padding: "10px 14px", backgroundColor: "#2232a9" }}>
            <h3 style={{ color: "white", margin: 0 }}>Set Skill Priority</h3>
          </div>
          <div
            style={{
              padding: "10px",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <PriorityContainer
              title={priorities[0].title}
              id={priorities[0].id}
              priority={priorities[0]}
              items={items.filter(
                (item) => item.priorityId === priorities[0].id
              )}
              backToColumn={backToColumn}
            />
            <PriorityContainer
              title={priorities[1].title}
              id={priorities[1].id}
              priority={priorities[1]}
              items={items.filter(
                (item) => item.priorityId === priorities[1].id
              )}
              backToColumn={backToColumn}
            />
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

  function backToColumn(item) {
    setItems((items) => {
      const activeIndex = items.findIndex((i) => i.id === item.id);

      // const newItems = items;
      // newItems[activeIndex].priorityId = null;
      // newItems[activeIndex].columnId = item.columnIdColor;
      items[activeIndex].columnId = item.columnIdColor;
      items[activeIndex].priorityId = "none";
      return items;

      // return arrayMove(newItems, activeIndex, 0);
    });
  }

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
          if (items[activeIndex].priorityId != "none") {
            if (items[activeIndex].columnIdColor == items[overIndex].columnId) {
              items[activeIndex].priorityId = "none";
              items[activeIndex].columnId = items[overIndex].columnId;
            }
          }
          return arrayMove(items, activeIndex, overIndex - 1);
        }

        if (items[activeIndex].priorityId != items[overIndex].priorityId) {
          items[activeIndex].priorityId = items[overIndex].priorityId;
          return arrayMove(items, activeIndex, overIndex - 1);
        }

        return arrayMove(items, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveAnItem && isOverAColumn) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === activeId);

        if (items[activeIndex].columnIdColor == over.id) {
          items[activeIndex].priorityId = "none";
          items[activeIndex].columnId = over.id;
        }
        return arrayMove(items, activeIndex, activeIndex);
      });
    }

    const isOverAPriority = over.data.current?.type === "Priority";

    if (isActiveAnItem && isOverAPriority) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === activeId);

        items[activeIndex].columnId = "none";
        items[activeIndex].priorityId = over.id;
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
      setPriorities((priorities) => {
        const oldIndex = priorities.findIndex(
          (priority) => priority.id === active.id
        );
        const newIndex = priorities.findIndex(
          (priority) => priority.id === over.id
        );

        return arrayMove(priorities, oldIndex, newIndex);
      });
    }
  }
}
