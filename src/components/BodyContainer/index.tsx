import React from "react";

import styles from "./BodyContainer.module.scss";

type Props = {
    className?: String;
    children: React.ReactNode;
}

const BodyContainer = ({ className, children, ...props }: Props) => (
    <div {...props} className={`${styles.body} ${className}`}>
        {children}
    </div>
);

export default BodyContainer;
