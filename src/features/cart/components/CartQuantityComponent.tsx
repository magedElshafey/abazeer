import DialogComponent from "@/common/components/dialog/dialog";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useCart } from "@/store/CartProvider";
import { useQueryClient } from "@tanstack/react-query";
import { type FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { playAddSound } from "@/store/CartProvider";

const CartQuantityComponent: FC = () => {
    const { cartQuery } = useCart();
    const dialogRef = useRef<{open: () => void, close: () => void}>(null);
    const [initialized, setInitialized] = useState(false);
    const missingProducts = (cartQuery?.data?.items || []).filter(item => (cartQuery.data?.out_of_stock_items || []).includes(item.item_id));
    const queryClient = useQueryClient();

    useEffect(() => {
        if(!cartQuery.isLoading && cartQuery.data) {
            if(missingProducts.length && dialogRef.current && !initialized) {
                dialogRef.current.open();
                setInitialized(true);
            } 
        }
    }, [cartQuery, missingProducts, initialized])

    const removeItems = () => {
        if(!cartQuery.isLoading && cartQuery.data && missingProducts.length) {
            Axios.post(apiRoutes.cartRemoveItems, {
                item_ids: cartQuery.data.out_of_stock_items,
                _method: "DELETE"
            }).then(async () => {
                playAddSound("/sounds/remove.mp3");
                await queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] })
                setInitialized(false);
            });
        }
    }

    if(missingProducts.length == 0) return null;
    return (
        <DialogComponent 
            ref={dialogRef}
            header={{
                title: "you-have-missing-products-in-cart",
                description: "all-items-in-the-list-will-be-removed"
            }}
            content={(
                <div className="max-h-[400px] overflow-y-auto flex flex-col gap-4">
                    {missingProducts.map(item => (
                        <div
                          key={item.item_id}
                          className="bg-white border rounded-xl shadow flex gap-4 p-4"
                        >
                          <img
                            src={item.image || ""}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <Link
                            to={`/products/${item.product_id}`}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            {item.name}
                          </Link>
                        </div>
                    ))}
                </div>
            )}
            cancel={{
                text: "ok",
                action: removeItems
            }}
        >

        </DialogComponent>
    )
}

export default CartQuantityComponent;