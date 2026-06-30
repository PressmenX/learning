import { mockRepository } from "./mock-repository";
import { ClothingSize, IProduct, stockDatabase } from "./mock-stock-data";

interface IOrder {
  productId: string;
  size: ClothingSize;
  quantity: number;
}

interface IResult {
  status: "success" | "error";
  message: string;
  details: string[];
}

const response = (res: IResult) => ({
  status(value: IResult["status"]) {
    res.status = value;
  },
  message(msg: string) {
    res.message = msg;
  },
  addDetails(msg: string) {
    res.details.push(msg);
  },
  get() {
    return res;
  },
});

const StockRepository = mockRepository<IProduct>(stockDatabase);
async function checkStock(cart: IOrder[]) {
  const res = response({
    status: "success",
    message: "Ready for Checkout!",
    details: [],
  });

  for (const p of cart) {
    const product = await StockRepository.findUnique(p.productId);

    if (!product) {
      res.status("error");
      res.addDetails(`Product with id ${p.productId} not found`);
      continue;
    }

    if (p.quantity > product.availableSizes[p.size]) {
      res.status("error");
      res.addDetails(
        `Insufficient stock for product ${p.productId} in size ${p.size}`,
      );
    }

    res.message("Error: Product does not meet criteria");
  }

  return res.get();
}

const cart: IOrder[] = [
  { productId: "kaos-polos-hitam", size: "M", quantity: 2 },
  { productId: "kemeja-flannel", size: "L", quantity: 1 },
  { productId: "celana-chino", size: "XL", quantity: 1 },
];

checkStock(cart).then((res) => console.log(res));
