// @ts-check

/**
 * @param {{title:string, price:number, isSoldOut : boolean}} props
 */

export default function Card({ title, price, isSoldOut }) {
  return (
    <div>
      <h1>{title}</h1>
      <span>{price.toFixed(2)}</span>
      {!isSoldOut && <code>Stock : Habis</code>}
    </div>
  );
}
