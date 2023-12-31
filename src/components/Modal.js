import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal"; // 이거때문에 function Modal이 중복 오류남
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function Modal1({ onModalClose }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customerType = useRef("");
  const liPk = useRef("");
  const name = useRef("");
  const birth = useRef("");
  const registerDate = useRef("");
  const age = useRef("");
  const address = useRef("");
  const phone = useRef("");
  const memo = useRef("");
  const state = useRef("");
  const navigate = useNavigate();
  // 선택된 고객 유형을 나타내는 state
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [contractYn, setContractYn] = useState(false);

  const customerTypes = ["OD", "AD", "CP", "CD", "JD", "H", "X", "Y", "Z"];

  const handleContractYnChange = () => {
    // 체크박스 상태를 토글
    setContractYn(!contractYn);
  };

  // 고객 유형 버튼 클릭 핸들러
  const handleCustomerTypeClick = (type) => {
    console.log("Clicked button:", type);
    console.log("Selected customer type before:", selectedCustomerType);
    // 이미 선택된 유형을 다시 클릭하면 선택 해제
    if (selectedCustomerType === type) {
      setSelectedCustomerType("");
    } else {
      setSelectedCustomerType(type);
    }

    console.log("Selected customer type after:", selectedCustomerType);
  };

  //만나이 계산 함수
  const calculateKoreanAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();

    // 생일이 아직 지나지 않았다면 1을 빼줍니다.
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age -= 1;
    }

    return age;
  };

  // Ref 객체가 null인 경우 에러 방지

  //전화번호 유효성 검사 추가
  const validatePhoneNumber = (phone) => {
    const pattern = /^\d{3}-\d{4}-\d{4}$/;
    return pattern.test(phone);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    // if (!Number.isSafeInteger(Number(customerTypeName.current.value))) {
    //   alert("고객유형에 올바른 숫자를 입력해주세요.");
    //   return;
    // }
    if (!customerType.current) {
      console.log(selectedCustomerType);
      console.log(selectedCustomerType.current);
      console.log(selectedCustomerType.current.value);
      alert("고객유형을 선택해주세요.");
      return;
    }
    //전화번호 유효성 검사 추가
    if (!validatePhoneNumber(phone.current.value)) {
      alert("전화번호 형태가 올바르지 않습니다.");
      return;
    }
    const birthValue = birth.current.value.replace(/\./g, "-");
    const registerDateValue = registerDate.current.value.replace(/\./g, "-");
    const ageValue = calculateKoreanAge(birthValue);
    customerType.current.value = selectedCustomerType;
    phone.current = phone.current; // phone Ref를 업데이트하지 않음
    const data = {
      customerType: selectedCustomerType, // 선택된 고객 유형으로 설정
      name: name.current.value,
      birth: birthValue,
      registerDate: registerDateValue,
      age: ageValue,
      address: address.current.value,
      phone: phone.current.value,
      contractYn: contractYn,
      memo: memo.current.value,
      state: state.current.value,
    };

    axios
      .post("http://3.38.101.62:8080/v1/customer", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert("신규고객 등록이 완료되었습니다.");
          onModalClose(); // 모달이 닫힐 때 새로고침 상태 변경
          handleClose(); // Modal 창 닫기
        }
      })

      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // accessToken 만료된 경우
          axios
            .post(
              /* refreshToken을 사용하여 새 accessToken 요청 URL */ {
                refreshToken: localStorage.getItem("refreshToken"),
              }
            )
            .then((tokenResponse) => {
              // 새로 받은 accessToken을 저장하고 원래의 요청을 다시 시도
              localStorage.setItem(
                "accessToken",
                tokenResponse.data.accessToken
              );
              handleSubmit(); // 원래의 요청을 다시 시도
            })
            .catch((tokenError) => {
              console.error("토큰 갱신 실패:", tokenError.message);
            });
        } else {
          console.log(data);
          console.error("API 요청 에러:", error.message);
        }
      });
  };
  return (
    <>
      <Button
        variant="primary"
        style={{ boxShadow: "4px 4px 4px 0px rgba(46, 64, 97, 0.30)" }}
        onClick={handleShow}
      >
        + Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onExited={onModalClose}
        style={{ marginTop: "60px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>신규고객 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "-15px 0px" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="name.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control type="text" ref={name} placeholder="이름" />
            </Form.Group>
            <Form.Group controlId="contractYn.ControlCheckbox1">
              <Form.Check
                type="checkbox"
                label="계약 체결 여부"
                checked={contractYn} // 체크박스 상태를 반영
                onChange={handleContractYnChange} // 체크박스 상태 변경 핸들러
                style={{
                  marginLeft: "2px",
                  marginBottom: "10px",
                  marginTop: "-20px",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-0">
              <ButtonGroup>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "9px",
                    paddingLeft: "9px",
                    marginRight: "10px",
                    borderWidth: "1px",
                    borderRadius: "5px",
                    borderStyle: "solid",
                    borderColor: "#DEE2E5", //  테두리 색 적용
                    backgroundColor: "transparent", // 배경을 투명하게 설정
                    color: "#585C5E", // 글자색을 설정
                  }}
                >
                  고객유형
                </div>
                {customerTypes.map((type, idx) => (
                  <ToggleButton
                    key={idx}
                    type="button"
                    variant={
                      selectedCustomerType === type
                        ? "primary"
                        : "outline-primary"
                    }
                    ref={customerType}
                    value={selectedCustomerType}
                    onClick={() => handleCustomerTypeClick(type)}
                    // style={{borderRadius: "5px 0 0 5px",}}
                  >
                    {type}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Form.Group className="mb-0" controlId="example.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="registerDate"
                ref={registerDate}
                placeholder="DB분배일 | 2023.00.00"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-0" controlId="example.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="birth"
                ref={birth}
                placeholder="생년월일 | 1900.00.00"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="phone"
                ref={phone}
                placeholder="연락처 | 010-0000-0000"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="address"
                ref={address}
                placeholder="거주지 | 주소입력"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                type="state"
                ref={state}
                placeholder="인수상태 | 상담중, 전산완료, 가입불가 등"
                as="textarea"
                rows={1}
              />
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                type="memo"
                ref={memo}
                placeholder="특이사항 | 월 보험료 00만원/본인점검/주말상담희망 등"
                as="textarea"
                rows={2}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="primary" type="submit">
                저장
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modal1;
