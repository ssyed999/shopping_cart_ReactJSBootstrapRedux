import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const MiniCard = (props) => {
  const { id, name, src, decrementHandler, incrementHandler, price } = props;
  const itemsCount = useSelector((state) => state.itemsCount);
  return (
    itemsCount[0][id] > 0 && (
      <>
        <Card className="mt-2" style={{ height: "22rem", width: "25rem" }}>
          <Card.Img
            variant="top"
            src={src}
            style={{ height: "185px" }}
            alt={name}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "15px", fontFamily: "sans-serif" }}>
              {name} Price-{price}
            </Card.Title>
            <Card.Text>
              <div st>
                <Button variant="outline-secondary" onClick={decrementHandler}>
                  -
                </Button>
                <span className="mt-2" style={{ fontSize: "20px" }}>
                  ({itemsCount[0][id]})
                </span>
                <Button variant="outline-success" onClick={incrementHandler}>
                  +
                </Button>
              </div>
              <div>
                <span className="count"> X {price}</span>
              </div>
              <div style={{ marginTop: "0px" }}>
                Total- Rs.{itemsCount[0][id] * price}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  );
};

export default MiniCard;
