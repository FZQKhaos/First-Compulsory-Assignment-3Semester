import {Api} from "../api/Api.ts";

export const myApi = new Api({

});

export default function PaperItem() {

    function OrderRequest() {

    }

    return (
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-2 p-4">
            <div className="carousel-item">
                <div>
                    <img
                        src="https://www.gstatic.com/webp/gallery/1.webp"
                        className="rounded-box"/>
                    <div>
                        <input type="text" placeholder="Amount" className="input w-3/4 max-w-xs"/>
                        <button className="btn btn-neutral">Order</button>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div>
                    <img
                        src="https://www.gstatic.com/webp/gallery/1.webp"
                        className="rounded-box"/>
                    <div>
                        <input type="text" placeholder="Amount" className="input w-3/4 max-w-xs"/>
                        <button className="btn btn-neutral">Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}