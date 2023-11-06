import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import CategoriesNav from "./CategoriesNav";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  // console.log(currentUser);

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">
              <h1 className={`${redressed.className} font-bold text-2xl`}>
                Tech~Hub
              </h1>
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>
                <CartCount />
              </div>
              <div>
                <UserMenu currentUser={currentUser!} />{" "}
                {/* have included the ! to tell Ts that am certain that current User will not be null to avoid i shouting  :) */}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <CategoriesNav />
    </div>
  );
};

export default Navbar;
