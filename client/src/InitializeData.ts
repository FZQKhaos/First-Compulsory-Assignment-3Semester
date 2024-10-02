import { useEffect } from "react";
import { customerAtom } from "./components/atoms/CustomerAtom.tsx";
import { orderAtom } from "./components/atoms/OrderAtom.tsx";
import { useAtom } from "jotai";
import { http } from "./http.ts";

export function useInitializeData() {

    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useAtom(orderAtom);

  useEffect(() => {
    http
        .customers.customersList()
        .then((response) => {
            setCustomers(response.data);
        }).catch((error) => {
            console.error(error);
        });
  }, []);

    useEffect(() => {
        http
            .orders.ordersList()
            .then((response) => {
                setOrders(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

}