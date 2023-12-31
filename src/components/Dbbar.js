import axios from "axios";
import React, { useRef, useState } from "react";
import "../App.css";
import Navbar from "../pages/Navbar";
import Nav from "react-bootstrap/Nav";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "NAV_ITEM";

const DraggableNavItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Nav.Item ref={(node) => ref(drop(node))}>
      <Nav.Link eventKey={item.key}>{item.label}</Nav.Link>
    </Nav.Item>
  );
};

const Dbbar = ({
  onAllCustomersClick,
  onContractCompleteClick,
  children,
  onTypeChange,
}) => {
  const [items, setItems] = useState([
    { key: "link-1", label: "All" },
    { key: "link-2", label: "OD" },
    { key: "link-3", label: "AD" },
    { key: "link-4", label: "CP" },
    { key: "link-5", label: "CD" },
    { key: "link-6", label: "JD" },
    { key: "link-7", label: "H" },
    { key: "link-8", label: "X" },
    { key: "link-9", label: "Y" },
    { key: "link-10", label: "Z" },
  ]);
  const [activeType, setActiveType] = useState("All"); // 초기 선택값을 "All"로 설정
  const [selectedTab, setSelectedTab] = useState("");

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}월`;

  const handleMonthCustomersClick = () => {
    setSelectedTab("월별 고객"); // 계약 완료 여부를 true로 설정
    // fetchData(); // 데이터를 다시 불러옴
  };
  const handleAllCustomersClick = () => {
    setSelectedTab("전체");
  };

  const handleContractCompleteClick = () => {
    setSelectedTab("계약완료고객");
  };
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);

    setItems(updatedItems);
  };

  const handleTypeClick = (type) => {
    setActiveType(type);
    onTypeChange(type); // 선택한 유형을 부모 컴포넌트로 전달
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="navbar-container">
          <Navbar
            onContractCompleteClick={onContractCompleteClick}
            onAllCustomersClick={onAllCustomersClick}
            onMonthCustomersClick={handleMonthCustomersClick}
            ContractedCustomerClcik={handleContractCompleteClick}
            AllCustomersClick={handleAllCustomersClick}
          />
          <div
            className="content"
            style={{
              marginLeft: "300px",
              height: "100vh",
              borderRight: "2px solid #dde1e6",
            }}
          >
            <h1 className="maintitle">
              {" "}
              {selectedTab === "월별 고객" ? formattedDate : activeType}
              {console.log(selectedTab)}
            </h1>
            <Nav
              className="DbbarItem-container"
              variant="underline"
              defaultActiveKey="/home"
            >
              {items.map((item) => (
                <Nav.Link
                  key={item.key}
                  onClick={() => handleTypeClick(item.label)}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
            <hr
              style={{
                marginTop: "-2px",
                marginLeft: "8px",
                height: "15px",
                width: "1030px",
              }}
            />
            {children}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dbbar;
