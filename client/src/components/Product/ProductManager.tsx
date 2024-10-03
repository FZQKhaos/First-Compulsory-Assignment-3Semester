

export default function ProductManager (){

return (
    <>
            <h1>Product Manager</h1>
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                            <span className="label-text">Name</span>
                    </div>
                    <input type="text" placeholder="Example: A4 - 50 Pack" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                            <span className="label-text">Stock</span>
                    </div>
                    <input type="text" placeholder="Example: 100" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                            <span className="label-text">Price</span>
                    </div>
                    <input type="text" placeholder="Example: 250" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label>
            <div className="label">
                    <span className="label-text">Picture</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs"/>
            </label>
    </>
)
}