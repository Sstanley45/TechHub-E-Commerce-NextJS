import Container from "./components/Container";
import HomeBunner from "./components/HomeBunner";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/trancate";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div className="p-8"> 
      <Container>
        <div>
          <HomeBunner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product:any) => {
            return <ProductCard data={product} />
          })}
        </div>
        
      </Container>
    </div>
  );
}
