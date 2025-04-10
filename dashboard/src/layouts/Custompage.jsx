import React, { Fragment, useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import store from '../common/redux/Store';
import { Outlet } from 'react-router-dom';
import Switcher from './layoutcomponents/Switcher';

const Custompage = () => {

    const [lateLoad, setlateLoad] = useState(false);	

    const Authentication = () => {
        document.body.classList.add("login-img");
        return () => {
            document.body.classList.remove("login-img");
        };
    };

	useEffect(() => {
		setlateLoad(true);
        Authentication();
	});

    return (
        <Fragment>
            <div style={{ display: `${lateLoad ? 'block' : 'none'}` }}>
            <Provider store={store}>
                <Switcher />
                <div className="page">
                    <div className="page login-page ">
                        <Outlet />
                    </div>
                </div>
            </Provider>
            </div>
        </Fragment>
    )
}

export default Custompage;