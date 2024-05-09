import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import IconButton from "./IconButton";

const App = () => {
  const shops = [
    { id: nanoid(), name: "bajaj" },
    { id: nanoid(), name: "motopit" },
    { id: nanoid(), name: "kalyoncu" }
  ];

  const categories = [
    { id: nanoid(), name: "motor" },
    { id: nanoid(), name: "sensör" },
    { id: nanoid(), name: "aksesuar" }
  ];

  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [shopsSelect, setShopsSelect] = useState("");
  const [categoriesSelect, setCategoriesSelect] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      id: nanoid(),
      name: inputValue,
      shops: shopsSelect,
      categories: categoriesSelect
    };
    setProducts([...products, newProduct]);

    setInputValue("");
    setCategoriesSelect("");
    setShopsSelect("");
  };

  const clickBuy = (productId) => {
    const currentProduct = products.map((product) => {
      if(product.id === productId){
        return (
          {
            ...product,
            isBought: true
          }
        )
      }
      return product
    });
    setProducts(currentProduct);
  }

  const deleteShop = (productId) => {
    const filteredProduct = products.filter((product) => product.id !== productId)
    setProducts(filteredProduct)
  }

  return (
    <Container>
      <form onSubmit={submitForm} className="d-flex gap-3 align-items-center">
        <Form.Label htmlFor="hedef">HEDEF</Form.Label>
        <Form.Control
          type="text"
          id="hedef"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Form.Select
          className="shops"
          aria-label="Default select example"
          value={shopsSelect}
          onChange={(e) => setShopsSelect(e.target.value)}
        >
          {shops.map((shop) => (
            <option key={shop.id} value={shop.name}>
              {shop.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="categories"
          aria-label="Default select example"
          value={categoriesSelect}
          onChange={(e) => setCategoriesSelect(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Select>

        <Button variant="primary" type="submit">
          GÖNDER
        </Button>
      </form>

      <Table>
        <thead>
          <tr>
            <th>İD</th>
            <th>PARÇA ADI</th>
            <th>MARKA</th>
            <th>KATEGORİ</th>
            <th>SATIN ALINDI MI?</th>
            <th>SİL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{textDecoration: product.isBought ? "line-through" : "none"}}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.shops}</td>
              <td>{product.categories}</td>
              <td><Button variant="success" onClick={() => clickBuy(product.id)}>Satın Al</Button></td>
              <td><IconButton onClick={() => deleteShop(product.id)} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
