import Container from "./components/Container";
import HomeBunner from "./components/HomeBunner";
// import { products } from "@/utils/products";
import { truncateText } from "@/utils/trancate";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  //shuffle products so that they appear in a random order
  //Fisher Yates Algo

  const productsFromDB = await getProducts(searchParams);
  //console.log("DB products>>>>>", productsFromDB);


  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProduct = shuffleArray(productsFromDB);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBunner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProduct.map((product: any) => {
            return <ProductCard data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
