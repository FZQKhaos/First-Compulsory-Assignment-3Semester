import CreatePaper from "./CreatePaper.tsx";
import DiscontinuePaper from "./DiscontinuePaper.tsx";
import ProductStock from "./ProductStock.tsx";
import CreateProperty from "./CreateProperty.tsx";
import AddPropertyToPaper from "./AddPropertyToPaper.tsx";

export default function ProductManager () {

    return (
        <div className="flex flex-col w-5/6 mx-auto justify-center mt-5">
            <div className="flex justify-center">
                <CreatePaper/>
                <div className="divider divider-horizontal"></div>
                <DiscontinuePaper/>
                <div className="divider divider-horizontal"></div>
                <ProductStock/>
            </div>
            <div className="divider divider-vertical my-5"></div>
            <div className="flex justify-center">
                <CreateProperty/>
                <div className="divider divider-horizontal my-5"></div>
                <AddPropertyToPaper/>
            </div>
        </div>
    )
}
