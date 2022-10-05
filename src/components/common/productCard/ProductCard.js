import React from "react";
import { useWindowSize } from "../../../Hooks";
import { Button, Card } from "react-bootstrap";

const ProductCard = (props) => {
  const { title, src, description, price, buyNowHandler } = props;
  const size = useWindowSize();
  return (
    <>
      <div>
        <Card style={{ width: "30rem", minHeight: "660px" }}>
          <Card.Body>
            <Card.Img
              variant="top"
              src={src}
              alt={title}
              style={{ height: "403px" }}
            />
            <Card.Title style={{ minHeight: "43px" }}>{title}</Card.Title>
            <Card.Text style={{ minHeight: "40px" }}>
              {description.substring(0, 112)}
            </Card.Text>
            <div class="d-flex flex-row">
              <Button variant="secondary" className="mr-4">
                Buy Now
              </Button>
              <Button
                variant="primary"
                className="ml-4"
                onClick={buyNowHandler}
              >
                Add to cart
                {size.width <= 991 && size.width >= 750 && (
                  <span> @ Rs.{price}</span>
                )}
              </Button>{" "}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
