import { cutString } from "@/functions/cutString";
import { IProduct } from "@/types/product.type";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  return (
    <div className="product-card">
      <div className="product-card__image">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
        />
      </div>

      <div className="product-card__content">
        <h2 className="product-card__title">{product.title}</h2>
        <p className="product-card__description">
          {cutString(product.description, 50)}
        </p>
        <p className="product-card__price">{product.price} €</p>

        <button className="action-button" onClick={() => router.push(`/products/${product.id}`)}>Voir plus</button>
      </div>
    </div>
  );
};

export default ProductCard;
