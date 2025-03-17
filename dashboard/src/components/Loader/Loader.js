import React from "react";

function Loader() {
    return (
        <>
            {/* Loader 1 */}
            <div className="spinner-parent">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {/* Loader 2 */}
            {/* <div id="global-loader">
                <img
                    src={require("../../assets/images/loader.svg").default}
                    className="loader-img"
                    alt="Loader"
                />
            </div> */}
        </>
    )
}

export default Loader;