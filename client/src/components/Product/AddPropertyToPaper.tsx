export default function AddPropertyToPaper() {
    return (
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center p-5">
            <h1>Add Property to Paper</h1>
            <div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Paper Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ex: Water Resistant"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-6">
                    <button
                        className="btn btn-primary"
                    >Add Property</button>
                </div>
            </div>
        </div>
    )
}