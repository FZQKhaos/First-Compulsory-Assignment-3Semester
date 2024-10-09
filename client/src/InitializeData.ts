import { useEffect } from "react";
import { customerAtom } from "./components/atoms/CustomerAtom.tsx";
import { orderAtom } from "./components/atoms/OrderAtom.tsx";
import { paperAtom } from "./components/atoms/PaperAtom.tsx";
import { useAtom } from "jotai";
import { http } from "./http.ts";
import {propertyAtom} from "./components/atoms/PropertyAtom.tsx";

export function useInitializeData() {

    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useAtom(orderAtom);
    const [papers, setPapers] = useAtom(paperAtom);
    const [properties, setProperties] = useAtom(propertyAtom);

  useEffect(() => {
    http
        .api.customersGetCustomers()
        .then((response) => {
            setCustomers(response.data);
        }).catch((error) => {
            console.error(error);
        });
  }, []);

    useEffect(() => {
        http
            .api.ordersGetOrders()
            .then((response) => {
                setOrders(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        http
            .api.paperGetPapers()
            .then((response) => {
                setPapers(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        http
            .api.propertyGetProperties()
            .then((response) => {
                setProperties(response.data);
            }).catch((error) => {
                console.error(error);
        });
    }, []);

}