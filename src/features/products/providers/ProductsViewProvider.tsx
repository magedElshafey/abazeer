import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import type { ProductsViewContext as IProductsViewContext } from "../types/product.types";

const ProductsViewContext = createContext<IProductsViewContext>({
  view: "cards",
  setView: () => null,
});

const ProductsViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const [view, setView] = useState<IProductsViewContext["view"]>("cards");

  return (
    <ProductsViewContext.Provider
      value={{
        view,
        setView,
      }}
    >
      {children}
    </ProductsViewContext.Provider>
  );
};

export const useProductsView = () => useContext(ProductsViewContext);

export default ProductsViewProvider;
