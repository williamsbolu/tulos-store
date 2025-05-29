import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllCategories } from "@/sanity/helpers/queries";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const categories = await getAllCategories();

  return (
    <Container className="py-10">
      <Title className="font-bold">
        Products by Category{" "}
        <span className="font-bold capitalize text-green-600 tracking-wide">
          {slug && slug}
        </span>
      </Title>

      <CategoryProducts categories={categories} slug={slug} />
    </Container>
  );
};

export default CategoryPage;
