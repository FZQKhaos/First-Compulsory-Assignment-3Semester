import CreatePaper from "./CreatePaper.tsx";
import DiscontinuePaper from "./DiscontinuePaper.tsx";
import ProductStock from "./ProductStock.tsx";

export default function ProductManager () {

    return (
        <div className="flex w-5/6 mx-auto justify-center mt-5">
            <CreatePaper />
            <div className="divider divider-horizontal"></div>
            <DiscontinuePaper />
            <div className="divider divider-horizontal"></div>
            <ProductStock />
        </div>
    )
}
