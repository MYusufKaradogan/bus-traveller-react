import React from "react";

const ContentLayout = (props) => (
    <div className="main-layout">
        <React.Suspense fallback={<div>Loading...</div>}>
            {props.children}
        </React.Suspense>
    </div>
)
export default ContentLayout;

