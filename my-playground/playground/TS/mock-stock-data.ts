export type ClothingSize = "S" | "M" | "L" | "XL";

export interface IProduct {
  id: string;
  availableSizes: Record<ClothingSize, number>;
}

export const stockDatabase: IProduct[] = [
  {
    id: "kaos-polos-hitam",
    availableSizes: { S: 5, M: 1, L: 0, XL: 3 },
  },
  {
    id: "kemeja-flannel",
    availableSizes: { S: 2, M: 4, L: 5, XL: 1 },
  },
  {
    id: "celana-chino",
    availableSizes: { S: 0, M: 3, L: 2, XL: 0 },
  },
];
