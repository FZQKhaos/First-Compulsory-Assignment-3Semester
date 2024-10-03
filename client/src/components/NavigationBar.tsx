import React, {useEffect} from "react";
// @ts-ignore
import Shoppingcart from '../assests/images/Shoppingcart.png';
// @ts-ignore
import Profile from '../assests/images/Profile.png';
import {useNavigate} from "react-router-dom";

export default function NavigationBar() {

    const navigate = useNavigate();

    return (
        <div className="border-b-2 border-black">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <button className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
                        Dunder Mifflin - Paper Company
                    </button>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <img src= {Shoppingcart} />
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={Profile}
                                    alt="Profile"/>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between" onClick={() => navigate('/Customer')}>
                                    Placeholder
                                </a>
                            </li>
                            <li>
                                <a className="justify-between" onClick={() => navigate('/Admin')}>
                                    Admin
                                </a>
                            </li>
                            <li>
                                <a onClick={() => navigate('/Orders')}>Order(s)</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}