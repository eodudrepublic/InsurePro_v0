import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const CustomerDetail = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="customer-detail-container">
      <div
        className="backpage"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        <span
          className="navigation"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ marginRight: "16px" }}
          />
          이전 화면으로 돌아가기
        </span>
      </div>
      <div className="customer_tnp">
        <Button
          style={{
            display: "flex",
            width: "34px",
            height: "24px",
            // margin: "12px 0px",
            padding: "4.84px 8.067px",
            justifyContent: "center",
            alignItems: "center",
            gap: "6.454px",
            fontWeight: "bold",
            borderBlockWidth: "2px",
            borderRightWidth: "2px",
            borderLeftWidth: "2px",
            // backgroundColor: "#175CD3",
          }}
          variant="success"
        >
          {data.customerTypeString}
        </Button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="customerName">{data.name}</h2>
          <h2>
            <Form.Check
              aria-label="option 1"
              checked={data.contractYn}
              readOnly
              style={{ paddingTop: "8px", marginLeft: "12px" }}
            />
          </h2>
        </div>

        {/* <img src="edit.png" alt="Edit Icon" className="editIcon" /> */}
        <p className="customerPhone">{data.phone}</p>
      </div>
    </div>
  );
};
export default CustomerDetail;
