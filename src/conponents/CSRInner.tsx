import { JSX } from 'react';

const CSRInner = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return <>{children}</>;
};

export default CSRInner;
