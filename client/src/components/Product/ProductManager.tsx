import CreatePaper from "./CreatePaper.tsx";
import DiscontinuePaper from "./DiscontinuePaper.tsx";

export default function ProductManager () {

    return (
        <div className="flex w-3/4 mx-auto justify-center mt-5">
            <CreatePaper />
            <div className="divider divider-horizontal"></div>
            <DiscontinuePaper />
        </div>
    )
}
