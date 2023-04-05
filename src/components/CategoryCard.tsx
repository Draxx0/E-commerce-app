import { cutString } from "@/functions/cutString";
import { ICategory } from "@/types/category.type";
import { useRouter } from "next/router";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const router = useRouter();
  return (
    <div className="category-card">
      <h2 className="category-card__title">{category.title}</h2>
      <p className="category-card__description">
        {cutString(category.description, 50)}
      </p>
      <button
        className="action-button"
        onClick={() => router.push(`/categories/${category.id}`)}
      >
        Voir plus
      </button>
    </div>
  );
};

export default CategoryCard;
