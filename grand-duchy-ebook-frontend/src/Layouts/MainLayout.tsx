import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import NavToggler from "@/shared/navbar/NavToggler";
import TopNav from "@/shared/navbar/TopNav";
import { IReadList } from "@/types/readListTypes";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ReadListContext = createContext<{
  readList: null | IReadList;
  refetch: any;
} | null>(null);

const MainLayout = ({ children }: { children: ReactElement }) => {
  const storedTheme =
    typeof window !== "undefined" && window.localStorage.getItem("theme");
  const [uiTheme, setUiTheme] = useState<"dark" | "light">(
    storedTheme && storedTheme === "dark" ? "dark" : "light"
  );

  const [isOpen, setIsOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsVisible(false), 5000);
    };

    window.addEventListener("scroll", handleScroll);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 5000); // Initial timeout

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`flex min-h-screen ${
        uiTheme === "light"
          ? "bg-paper text-black"
          : "bg-customBlack text-secondary"
      }`}
    >
      {/* SideNav */}
      <div
        className={`absolute lg:static z-50 ${
          isOpen ? "left-0" : "-left-full"
        } duration-300 shadow`}
      >
        <Navbar uiTheme={uiTheme} />
      </div>

      {/* Main body*/}
      <div className="flex flex-col flex-1 lg:ml-[60px]">
        <main className="container flex-grow py-4 px-4 md:px-8">
          <TopNav setUiTheme={setUiTheme} uiTheme={uiTheme} />
          {children}
        </main>

        <Footer />
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <NavToggler isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default MainLayout;

export const useReadListContext = () => {
  const context = useContext(ReadListContext);
  return context;
};
